import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, Eye, RefreshCw, MapPin } from 'lucide-react';
import { WeatherResponse } from '@shared/api';
import { useLanguage } from '../../contexts/LanguageContext';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location: string;
  timestamp?: number;
}

const WeatherWidget = () => {
  const { t, currentLanguage } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Safe error setter that ensures only strings are set
  const setSafeError = (errorInput: any) => {
    if (typeof errorInput === 'string') {
      setError(errorInput);
    } else if (errorInput && typeof errorInput === 'object') {
      console.error('Attempted to set error object:', errorInput);
      setError('अज्ञात त्रुटि घटित हुई');
    } else {
      setError(String(errorInput || 'अज्ञात त्रुटि'));
    }
  };
  const [lastRefresh, setLastRefresh] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Get user location with enhanced error handling
  const attemptGeolocation = (retryCount = 0) => {
    console.log(`Attempting to get user location... (attempt ${retryCount + 1})`);
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation success:', {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setIsGettingLocation(false);
          setSafeError(''); // Clear any previous errors
        },
        (error) => {
          // Only log unexpected geolocation errors (Code 2 is common and expected)
          if (error.code !== 2) {
            console.warn('Geolocation unavailable:', `Code ${error.code} - falling back to default location`);
          }
          let errorMessage = 'स्थान पहुंच अनुमति आवश्यक है';
          let shouldRetry = false;

          // Enhanced error handling with retry logic
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage = 'स्थान पहुंच की अनुमति नह���ं दी गई। डिफ़ॉल्ट स्थान (दिल्ली) का उपयोग कर रहे हैं।';
              break;
            case 2: // POSITION_UNAVAILABLE
              if (retryCount < 2) {
                console.log('Position unavailable, attempting retry with different settings...');
                shouldRetry = true;
                errorMessage = 'स्थान प्राप्त करने का प्रयास... पुनः कोशिश कर रहे हैं।';
              } else {
                errorMessage = 'स्थान की जानकारी उपलब्ध नहीं है। नेटवर्क कनेक्शन या GPS सेटिंग्स जांचें। ���िफ़ॉल्ट स्थान का उपयोग कर रहे हैं।';
              }
              break;
            case 3: // TIMEOUT
              if (retryCount < 1) {
                console.log('Geolocation timeout, retrying with longer timeout...');
                shouldRetry = true;
                errorMessage = 'स्थान प्राप्त करने में समय लग रहा है। पुनः प्रयास कर रहे हैं...';
              } else {
                errorMessage = 'स्थान प्राप्त करने में समय सीमा समाप्त। डिफ़ॉल्ट स्थान का उपयोग कर रहे हैं।';
              }
              break;
            default:
              errorMessage = 'स्थान प्राप्त करने में त्रुटि। डिफ़ॉल्ट स्थान का उपयोग कर रहे हैं।';
          }

          console.warn(`Geolocation error (code ${error.code}): ${errorMessage}`);
          setSafeError(errorMessage);

          if (shouldRetry) {
            // Retry with progressively more relaxed settings
            setTimeout(() => {
              attemptGeolocation(retryCount + 1);
            }, 1000 + (retryCount * 1000)); // Increasing delay
          } else {
            // Final fallback to Delhi coordinates
            setIsGettingLocation(false);
            setUserLocation({ lat: 28.6139, lon: 77.2090 });
          }
        },
        {
          timeout: retryCount === 0 ? 10000 : (retryCount === 1 ? 20000 : 30000), // Progressive timeout
          enableHighAccuracy: retryCount === 0, // Try high accuracy first, then fall back
          maximumAge: retryCount === 0 ? 5 * 60 * 1000 : 15 * 60 * 1000 // More permissive cache on retries
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser');
      setSafeError('आपका ब्राउज़र जियोलोकेशन सपोर्ट नहीं करता। डिफ़ॉल्ट स्थान का उपयोग कर रहे हैं।');
      // Fallback to Delhi coordinates
      setUserLocation({ lat: 28.6139, lon: 77.2090 });
    }
  };

  useEffect(() => {
    attemptGeolocation();
  }, []);

  // Fetch weather data
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      setSafeError('');

      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        let errorMessage = 'Failed to fetch weather';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setWeather(data);
      setLastRefresh(Date.now());
    } catch (err) {
      console.error('Weather fetch error:', err);
      setSafeError(err instanceof Error ? err.message : 'मौसम की जानकारी प्राप्त करने में त्रुटि');
      
      // Set fallback data
      setWeather({
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        visibility: 8,
        description: 'जानकारी उपलब्ध नहीं',
        condition: 'cloudy',
        location: 'आपका स्थान'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when location is available
  useEffect(() => {
    if (userLocation) {
      fetchWeather(userLocation.lat, userLocation.lon);
    }
  }, [userLocation]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    if (userLocation) {
      const interval = setInterval(() => {
        fetchWeather(userLocation.lat, userLocation.lon);
      }, 10 * 60 * 1000); // 10 minutes
      
      return () => clearInterval(interval);
    }
  }, [userLocation]);

  const handleRefresh = () => {
    if (userLocation) {
      fetchWeather(userLocation.lat, userLocation.lon);
    }
  };

  const retryGeolocation = () => {
    setSafeError('पुनः प्रयास कर रहे हैं...');
    attemptGeolocation(); // Use the enhanced geolocation function
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const getWeatherAdvice = (condition: string, temperature: number) => {
    if (condition === 'rainy') {
      return "🌧️ फसल सलाह: बारिश के कारण खेत में काम न करें। जल निकासी का ध्यान रखें।";
    }
    if (condition === 'sunny' && temperature > 35) {
      return "☀️ फसल सलाह: तेज धूप है। पानी की उचित व्यवस्था करें और दोपहर में काम न करें।";
    }
    if (temperature < 15) {
      return "🌡️ फसल सलाह: ठंड है। फसलों को पाले से बचाने के उपाय करें।";
    }
    return "🌱 फसल सलाह: मौसम उपयुक्त है। नियमित देखभाल जारी रखें।";
  };

  if (isLoading) {
    return (
      <div className="kisan-card p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kisan-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold text-kisan-text-primary ${
          currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
        }`}>
          {t('weather.title')}
        </h3>
        <button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm font-latin transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{t('weather.refresh')}</span>
        </button>
      </div>
      
      {error && error.includes('स्थान') && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-kisan">
          <div className="flex items-start space-x-2">
            <div className="flex-1">
              <p className="text-sm text-amber-700 font-devanagari">{error}</p>
              <p className="text-xs text-amber-600 mt-1 font-devanagari">
                मौसम की जानकारी दिल्ली के लिए दिखाई जा रही है
              </p>
            </div>
            <button
              onClick={retryGeolocation}
              className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1 rounded transition-colors font-devanagari whitespace-nowrap"
            >
              पुनः प्रयास
            </button>
          </div>
        </div>
      )}

      {weather && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3">
                {getWeatherIcon(weather.condition)}
                <div>
                  <p className="text-3xl font-bold text-kisan-text-primary">
                    {weather.temperature}°C
                  </p>
                  <p className="text-sm text-kisan-text-muted font-devanagari">
                    {weather.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <MapPin className="h-4 w-4 text-kisan-text-muted" />
                <p className="text-sm text-kisan-text-secondary font-devanagari">
                  {weather.location}
                </p>
                {weather.location.includes('आपका स्���ान') && (
                  <span className="text-xs text-kisan-text-muted font-devanagari">
                    (डिफ़ॉल्ट)
                  </span>
                )}
              </div>
              {lastRefresh > 0 && (
                <p className="text-xs text-kisan-text-muted mt-1">
                  अपडेट: {new Date(lastRefresh).toLocaleTimeString('hi-IN')}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className={`text-sm text-kisan-text-muted ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>{t('weather.humidity')}</p>
                <p className="font-semibold text-kisan-text-primary">{weather.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <div>
                <p className={`text-sm text-kisan-text-muted ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>{t('weather.wind')}</p>
                <p className="font-semibold text-kisan-text-primary">{weather.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-500" />
              <div>
                <p className={`text-sm text-kisan-text-muted ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>{t('weather.visibility')}</p>
                <p className="font-semibold text-kisan-text-primary">{weather.visibility} km</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <div>
                <p className={`text-sm text-kisan-text-muted ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>{t('weather.feels-like')}</p>
                <p className="font-semibold text-kisan-text-primary">{weather.temperature + 2}°C</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-kisan-text-muted font-devanagari">
              {getWeatherAdvice(weather.condition, weather.temperature)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
