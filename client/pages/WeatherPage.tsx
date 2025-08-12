import { useState, useEffect } from 'react';
import { 
  Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, Eye, RefreshCw, 
  MapPin, Calendar, Clock, TrendingUp, AlertTriangle, Leaf, Umbrella,
  Sun as SunIcon, CloudSnow, Zap
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../components/features/LocationPicker';
import { WeatherResponse } from '@shared/api';

interface ExtendedWeatherData extends WeatherResponse {
  forecast?: Array<{
    date: string;
    temp: { min: number; max: number };
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
  }>;
  alerts?: Array<{
    type: 'warning' | 'advisory';
    title: string;
    description: string;
    validUntil: string;
  }>;
  cropAdvice?: Array<{
    crop: string;
    advice: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const WeatherPage = () => {
  const { t, currentLanguage } = useLanguage();
  const { setCurrentLocation } = useLocation();
  const [weather, setWeather] = useState<ExtendedWeatherData | null>(null);
  const [forecast, setForecast] = useState<ExtendedWeatherData['forecast']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [lastRefresh, setLastRefresh] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('current');
  const [selectedState, setSelectedState] = useState<string>('');
  const [cityInput, setCityInput] = useState<string>('');

  // Indian states and major cities with coordinates
  const statesWithCities = {
    'delhi': {
      name: 'Delhi',
      nameHindi: 'दिल्ली',
      cities: {
        'new-delhi': { name: 'New Delhi', nameHindi: 'नई दिल्ली', lat: 28.6139, lon: 77.2090 },
        'gurgaon': { name: 'Gurgaon', nameHindi: 'गुड़गांव', lat: 28.4595, lon: 77.0266 },
        'faridabad': { name: 'Faridabad', nameHindi: 'फरीदाबाद', lat: 28.4089, lon: 77.3178 }
      }
    },
    'punjab': {
      name: 'Punjab',
      nameHindi: 'पंजाब',
      cities: {
        'ludhiana': { name: 'Ludhiana', nameHindi: 'लुधि��ाना', lat: 30.9010, lon: 75.8573 },
        'amritsar': { name: 'Amritsar', nameHindi: 'अमृतसर', lat: 31.6340, lon: 74.8723 },
        'jalandhar': { name: 'Jalandhar', nameHindi: 'जालंधर', lat: 31.3260, lon: 75.5762 },
        'bathinda': { name: 'Bathinda', nameHindi: 'भटिंडा', lat: 30.2110, lon: 74.9455 },
        'patiala': { name: 'Patiala', nameHindi: 'पटियाला', lat: 30.3398, lon: 76.3869 }
      }
    },
    'haryana': {
      name: 'Haryana',
      nameHindi: 'हरियाणा',
      cities: {
        'karnal': { name: 'Karnal', nameHindi: 'करनाल', lat: 29.6857, lon: 76.9905 },
        'panipat': { name: 'Panipat', nameHindi: 'पानीपत', lat: 29.3909, lon: 76.9635 },
        'hisar': { name: 'Hisar', nameHindi: 'हिसार', lat: 29.1492, lon: 75.7217 },
        'rohtak': { name: 'Rohtak', nameHindi: 'रोहतक', lat: 28.8955, lon: 76.6066 },
        'ambala': { name: 'Ambala', nameHindi: 'अंबाला', lat: 30.3752, lon: 76.7821 }
      }
    },
    'uttarpradesh': {
      name: 'Uttar Pradesh',
      nameHindi: 'उत्तर प्रदेश',
      cities: {
        'lucknow': { name: 'Lucknow', nameHindi: 'लखनऊ', lat: 26.8467, lon: 80.9462 },
        'kanpur': { name: 'Kanpur', nameHindi: 'कानपुर', lat: 26.4499, lon: 80.3319 },
        'agra': { name: 'Agra', nameHindi: 'आगरा', lat: 27.1767, lon: 78.0081 },
        'varanasi': { name: 'Varanasi', nameHindi: 'वाराणसी', lat: 25.3176, lon: 82.9739 },
        'allahabad': { name: 'Allahabad', nameHindi: 'इलाहाबाद', lat: 25.4358, lon: 81.8463 },
        'meerut': { name: 'Meerut', nameHindi: 'मेरठ', lat: 28.9845, lon: 77.7064 }
      }
    },
    'maharashtra': {
      name: 'Maharashtra',
      nameHindi: 'महाराष��ट्र',
      cities: {
        'mumbai': { name: 'Mumbai', nameHindi: 'मुंबई', lat: 19.0760, lon: 72.8777 },
        'pune': { name: 'Pune', nameHindi: 'पुणे', lat: 18.5204, lon: 73.8567 },
        'nashik': { name: 'Nashik', nameHindi: 'नासिक', lat: 19.9975, lon: 73.7898 },
        'aurangabad': { name: 'Aurangabad', nameHindi: 'औरंगाबाद', lat: 19.8762, lon: 75.3433 },
        'solapur': { name: 'Solapur', nameHindi: 'सोलापुर', lat: 17.6599, lon: 75.9064 },
        'nagpur': { name: 'Nagpur', nameHindi: 'नागपुर', lat: 21.1458, lon: 79.0882 }
      }
    },
    'gujarat': {
      name: 'Gujarat',
      nameHindi: 'गुजरात',
      cities: {
        'ahmedabad': { name: 'Ahmedabad', nameHindi: 'अहमदाबाद', lat: 23.0225, lon: 72.5714 },
        'surat': { name: 'Surat', nameHindi: 'सूरत', lat: 21.1702, lon: 72.8311 },
        'rajkot': { name: 'Rajkot', nameHindi: 'राजकोट', lat: 22.3039, lon: 70.8022 },
        'vadodara': { name: 'Vadodara', nameHindi: 'वडोदरा', lat: 22.3072, lon: 73.1812 },
        'bhavnagar': { name: 'Bhavnagar', nameHindi: 'भावनगर', lat: 21.7645, lon: 72.1519 }
      }
    },
    'karnataka': {
      name: 'Karnataka',
      nameHindi: 'कर्नाटक',
      cities: {
        'bangalore': { name: 'Bangalore', nameHindi: 'बेंगलुरु', lat: 12.9716, lon: 77.5946 },
        'mysore': { name: 'Mysore', nameHindi: 'मैसूर', lat: 12.2958, lon: 76.6394 },
        'hubli': { name: 'Hubli', nameHindi: 'हुबली', lat: 15.3647, lon: 75.1240 },
        'mangalore': { name: 'Mangalore', nameHindi: 'मंगलुरु', lat: 12.9141, lon: 74.8560 },
        'belgaum': { name: 'Belgaum', nameHindi: 'बेलगाम', lat: 15.8497, lon: 74.4977 }
      }
    },
    'tamilnadu': {
      name: 'Tamil Nadu',
      nameHindi: 'तमिल नाडु',
      cities: {
        'chennai': { name: 'Chennai', nameHindi: 'चेन्नई', lat: 13.0827, lon: 80.2707 },
        'coimbatore': { name: 'Coimbatore', nameHindi: 'कोयंबटूर', lat: 11.0168, lon: 76.9558 },
        'madurai': { name: 'Madurai', nameHindi: 'मदुरै', lat: 9.9252, lon: 78.1198 },
        'tiruchirappalli': { name: 'Tiruchirappalli', nameHindi: 'तिरुचिरापल्ली', lat: 10.7905, lon: 78.7047 },
        'salem': { name: 'Salem', nameHindi: 'सेलम', lat: 11.6643, lon: 78.1460 }
      }
    },
    'andhrapradesh': {
      name: 'Andhra Pradesh',
      nameHindi: 'आंध्र प्रदेश',
      cities: {
        'visakhapatnam': { name: 'Visakhapatnam', nameHindi: 'विशाखा���त्तनम', lat: 17.6868, lon: 83.2185 },
        'vijayawada': { name: 'Vijayawada', nameHindi: 'विजयवाड़ा', lat: 16.5062, lon: 80.6480 },
        'guntur': { name: 'Guntur', nameHindi: 'गुंटूर', lat: 16.3067, lon: 80.4365 },
        'tirupati': { name: 'Tirupati', nameHindi: 'तिरुपति', lat: 13.6288, lon: 79.4192 }
      }
    },
    'telangana': {
      name: 'Telangana',
      nameHindi: 'तेलंगाना',
      cities: {
        'hyderabad': { name: 'Hyderabad', nameHindi: 'हैदराबाद', lat: 17.3850, lon: 78.4867 },
        'warangal': { name: 'Warangal', nameHindi: 'वारंगल', lat: 17.9689, lon: 79.5941 },
        'nizamabad': { name: 'Nizamabad', nameHindi: 'निजामाबाद', lat: 18.6725, lon: 78.0941 }
      }
    },
    'westbengal': {
      name: 'West Bengal',
      nameHindi: 'पश्चिम बंगाल',
      cities: {
        'kolkata': { name: 'Kolkata', nameHindi: 'कोलकाता', lat: 22.5726, lon: 88.3639 },
        'howrah': { name: 'Howrah', nameHindi: 'हावड़ा', lat: 22.5958, lon: 88.2636 },
        'durgapur': { name: 'Durgapur', nameHindi: 'दुर्गापुर', lat: 23.5204, lon: 87.3119 },
        'siliguri': { name: 'Siliguri', nameHindi: 'सि���ीगुड़ी', lat: 26.7271, lon: 88.3953 }
      }
    },
    'rajasthan': {
      name: 'Rajasthan',
      nameHindi: 'राजस्थान',
      cities: {
        'jaipur': { name: 'Jaipur', nameHindi: 'जयपुर', lat: 26.9124, lon: 75.7873 },
        'jodhpur': { name: 'Jodhpur', nameHindi: 'जोधपुर', lat: 26.2389, lon: 73.0243 },
        'udaipur': { name: 'Udaipur', nameHindi: 'उदयपुर', lat: 24.5854, lon: 73.7125 },
        'kota': { name: 'Kota', nameHindi: 'कोटा', lat: 25.2138, lon: 75.8648 },
        'bikaner': { name: 'Bikaner', nameHindi: 'बीकानेर', lat: 28.0229, lon: 73.3119 }
      }
    },
    'madhyapradesh': {
      name: 'Madhya Pradesh',
      nameHindi: 'मध्य प्रदेश',
      cities: {
        'bhopal': { name: 'Bhopal', nameHindi: 'भोपाल', lat: 23.2599, lon: 77.4126 },
        'indore': { name: 'Indore', nameHindi: 'इंदौर', lat: 22.7196, lon: 75.8577 },
        'gwalior': { name: 'Gwalior', nameHindi: 'ग्वालियर', lat: 26.2183, lon: 78.1828 },
        'jabalpur': { name: 'Jabalpur', nameHindi: 'जबलपुर', lat: 23.1815, lon: 79.9864 },
        'ujjain': { name: 'Ujjain', nameHindi: 'उज्जैन', lat: 23.1765, lon: 75.7885 }
      }
    }
  };

  // Get cities for selected state
  const availableCities = selectedState && statesWithCities[selectedState]
    ? Object.entries(statesWithCities[selectedState].cities)
    : [];

  // Popular farming cities for quick access
  const popularCities = [
    { id: 'current', name: t('weather.current-location'), lat: 0, lon: 0 },
    { id: 'delhi-new-delhi', name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { id: 'punjab-ludhiana', name: 'Ludhiana, Punjab', lat: 30.9010, lon: 75.8573 },
    { id: 'haryana-karnal', name: 'Karnal, Haryana', lat: 29.6857, lon: 76.9905 },
    { id: 'uttarpradesh-lucknow', name: 'Lucknow, UP', lat: 26.8467, lon: 80.9462 },
    { id: 'maharashtra-nashik', name: 'Nashik, Maharashtra', lat: 19.9975, lon: 73.7898 },
    { id: 'gujarat-rajkot', name: 'Rajkot, Gujarat', lat: 22.3039, lon: 70.8022 }
  ];

  // Get user location with enhanced error handling
  useEffect(() => {
    if (navigator.geolocation && selectedCity === 'current') {
      const attemptLocation = (retryCount = 0) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
            console.log('Geolocation success for weather page');
          },
          (error) => {
            // Only log unexpected geolocation errors (Code 2 is common and expected)
            if (error.code !== 2) {
              console.warn('Geolocation unavailable:', `Code ${error.code} - using fallback location`);
            }

            // Retry logic for POSITION_UNAVAILABLE and TIMEOUT
            if ((error.code === 2 || error.code === 3) && retryCount < 2) {
              console.log(`Retrying geolocation... (attempt ${retryCount + 1})`);
              setTimeout(() => {
                attemptLocation(retryCount + 1);
              }, 2000 + (retryCount * 1000));
            } else {
              console.log('Falling back to Delhi coordinates');
              // Final fallback to Delhi
              setUserLocation({ lat: 28.6139, lon: 77.2090 });
            }
          },
          {
            timeout: retryCount === 0 ? 10000 : 20000,
            enableHighAccuracy: retryCount === 0,
            maximumAge: retryCount === 0 ? 5 * 60 * 1000 : 15 * 60 * 1000
          }
        );
      };

      attemptLocation();
    }
  }, [selectedCity]);

  // Fetch weather data
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      setError('');
      
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
      
      // Generate mock forecast and additional data for demonstration
      const mockForecast = generateMockForecast(data);
      const mockAlerts = generateMockAlerts(data);
      const mockCropAdvice = generateMockCropAdvice(data);
      
      setWeather({
        ...data,
        forecast: mockForecast,
        alerts: mockAlerts,
        cropAdvice: mockCropAdvice
      });
      setForecast(mockForecast);
      setLastRefresh(Date.now());

      // Update location context with the weather location
      if (data.city && data.state) {
        setCurrentLocation({
          city: data.city,
          cityHindi: data.cityHindi || data.city,
          state: data.state,
          stateHindi: data.stateHindi || data.state,
          lat: lat,
          lon: lon,
          isCurrentLocation: false
        });
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err instanceof Error ? err.message : 'मौसम की जानकारी प्राप्त करने में त्रुटि');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle city selection
  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    if (cityId === 'current') {
      if (userLocation) {
        fetchWeather(userLocation.lat, userLocation.lon);
      }
    } else {
      const city = popularCities.find(c => c.id === cityId);
      if (city) {
        fetchWeather(city.lat, city.lon);
      }
    }
  };

  // Handle state selection
  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setCityInput('');
    setSelectedCity('');
  };

  // Handle city search within state
  const handleCitySearch = () => {
    if (selectedState && cityInput) {
      const stateData = statesWithCities[selectedState];
      const cityKey = Object.keys(stateData.cities).find(key =>
        stateData.cities[key].name.toLowerCase() === cityInput.toLowerCase() ||
        stateData.cities[key].nameHindi === cityInput
      );

      if (cityKey) {
        const city = stateData.cities[cityKey];
        fetchWeather(city.lat, city.lon);
      } else {
        setError(`City "${cityInput}" not found in ${stateData.name}`);
      }
    }
  };

  // Auto-refresh
  useEffect(() => {
    let coords = userLocation;
    if (selectedCity !== 'current') {
      const city = popularCities.find(c => c.id === selectedCity);
      if (city) coords = { lat: city.lat, lon: city.lon };
    }
    
    if (coords) {
      fetchWeather(coords.lat, coords.lon);
      
      // Auto-refresh every 10 minutes
      const interval = setInterval(() => {
        fetchWeather(coords.lat, coords.lon);
      }, 10 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [userLocation, selectedCity]);

  const getWeatherIcon = (condition: string, size: string = 'w-8 h-8') => {
    const iconClass = `${size} text-yellow-500`;
    switch (condition) {
      case 'sunny':
        return <Sun className={iconClass} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'snowy':
        return <CloudSnow className={`${size} text-blue-300`} />;
      case 'stormy':
        return <Zap className={`${size} text-purple-500`} />;
      default:
        return <Cloud className={`${size} text-gray-500`} />;
    }
  };

  const generateMockForecast = (currentWeather: WeatherResponse) => {
    const forecast = [];
    const baseTemp = currentWeather.temperature;
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        temp: {
          min: Math.round(baseTemp - 5 + Math.random() * 3),
          max: Math.round(baseTemp + 2 + Math.random() * 6)
        },
        condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        description: currentWeather.description,
        humidity: currentWeather.humidity + Math.floor(Math.random() * 20 - 10),
        windSpeed: currentWeather.windSpeed + Math.floor(Math.random() * 10 - 5)
      });
    }
    
    return forecast;
  };

  const generateMockAlerts = (currentWeather: WeatherResponse) => {
    const alerts = [];
    
    if (currentWeather.temperature > 35) {
      alerts.push({
        type: 'warning' as const,
        title: 'Heat Wave Warning',
        description: 'तेज धूप और गर्मी। दोपहर में काम न करें और पानी की व्यवस्था रखें।',
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
    if (currentWeather.condition === 'rainy') {
      alerts.push({
        type: 'advisory' as const,
        title: 'Rain Advisory',
        description: 'बारिश की सं��ावना। कटाई के कार्य स्थगित कर���ं और जल निकासी का ध्यान रखें।',
        validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
      });
    }
    
    return alerts;
  };

  const generateMockCropAdvice = (currentWeather: WeatherResponse) => {
    const advice = [];
    
    if (currentWeather.temperature > 30 && currentWeather.humidity < 60) {
      advice.push({
        crop: 'धान',
        advice: 'सिंचाई की आवृत्ति बढ़ाएं। शाम के समय पानी दें।',
        priority: 'high' as const
      });
    }
    
    if (currentWeather.condition === 'rainy') {
      advice.push({
        crop: 'गेहूं',
        advice: 'फंगल रोगों से बचाव के लिए स्प्रे करें।',
        priority: 'medium' as const
      });
    }
    
    advice.push({
      crop: 'सब्जियां',
      advice: 'मल्चिंग ���रें और नियमित निरीक्षण करते रहें।',
      priority: 'low' as const
    });
    
    return advice;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'आज';
    if (date.toDateString() === tomorrow.toDateString()) return 'कल';
    
    return date.toLocaleDateString('hi-IN', { weekday: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-kisan-bg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-gray-200 rounded-kisan"></div>
                  <div className="h-48 bg-gray-200 rounded-kisan"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-96 bg-gray-200 rounded-kisan"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className={`text-3xl font-bold text-kisan-text-primary mb-2 ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                {t('weather.title')}
              </h1>
              <p className={`text-kisan-text-secondary ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                फसल-विशि��्ट मौसम सलाह और पूर्वानुमान
              </p>
            </div>
            
            {/* Location Selector */}
            <div className="space-y-4">
              {/* Quick City Selector */}
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="px-4 py-2 border border-border rounded-kisan bg-white text-kisan-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">{currentLanguage === 'hi' ? 'लोकप्रिय शहर चुनें' : 'Select Popular City'}</option>
                  {popularCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    const coords = selectedCity === 'current' ? userLocation : popularCities.find(c => c.id === selectedCity);
                    if (coords) fetchWeather(coords.lat, coords.lon);
                  }}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{t('weather.refresh')}</span>
                </button>
              </div>

              {/* State and City Search */}
              <div className="flex items-center space-x-4">
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="px-4 py-2 border border-border rounded-kisan bg-white text-kisan-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">{currentLanguage === 'hi' ? 'राज्य चुनें' : 'Select State'}</option>
                  {Object.entries(statesWithCities).map(([key, state]) => (
                    <option key={key} value={key}>
                      {currentLanguage === 'hi' ? state.nameHindi : state.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder={currentLanguage === 'hi' ? 'शहर का नाम दर्ज करें' : 'Enter city name'}
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="px-4 py-2 border border-border rounded-kisan bg-white text-kisan-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={!selectedState}
                />

                <button
                  onClick={handleCitySearch}
                  disabled={!selectedState || !cityInput || isLoading}
                  className="flex items-center space-x-2 bg-kisan-primary text-white px-4 py-2 rounded-kisan hover:bg-kisan-primary/90 transition-colors disabled:opacity-50"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{currentLanguage === 'hi' ? 'खोजें' : 'Search'}</span>
                </button>
              </div>

              {/* City suggestions for selected state */}
              {selectedState && availableCities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-kisan-text-muted font-devanagari">
                    {currentLanguage === 'hi' ? 'उपलब्ध शहर:' : 'Available cities:'}
                  </span>
                  {availableCities.slice(0, 5).map(([key, city]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setCityInput(city.name);
                        fetchWeather(city.lat, city.lon);
                      }}
                      className="px-2 py-1 text-xs bg-secondary text-kisan-text-primary rounded hover:bg-secondary/80 transition-colors"
                    >
                      {currentLanguage === 'hi' ? city.nameHindi : city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-kisan">
              <p className="text-red-600 font-devanagari">{error}</p>
            </div>
          )}

          {weather && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Weather & Forecast */}
              <div className="lg:col-span-2 space-y-6">
                {/* Current Weather Card */}
                <div className="kisan-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-kisan-text-muted" />
                      <h2 className="text-xl font-semibold text-kisan-text-primary font-devanagari">
                        {weather.location}
                      </h2>
                    </div>
                    {lastRefresh > 0 && (
                      <div className="text-sm text-kisan-text-muted flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>अपडेट: {new Date(lastRefresh).toLocaleTimeString('hi-IN')}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Temperature Display */}
                    <div className="flex items-center space-x-4">
                      {getWeatherIcon(weather.condition, 'w-16 h-16')}
                      <div>
                        <div className="text-4xl font-bold text-kisan-text-primary">
                          {weather.temperature}°C
                        </div>
                        <p className="text-lg text-kisan-text-muted font-devanagari">
                          {weather.description}
                        </p>
                      </div>
                    </div>

                    {/* Weather Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-kisan-text-muted font-devanagari">नमी</p>
                          <p className="font-semibold text-kisan-text-primary">{weather.humidity}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-kisan-text-muted font-devanagari">हवा</p>
                          <p className="font-semibold text-kisan-text-primary">{weather.windSpeed} km/h</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-kisan-text-muted font-devanagari">दृश्यता</p>
                          <p className="font-semibold text-kisan-text-primary">{weather.visibility} km</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-sm text-kisan-text-muted font-devanagari">अनुभव</p>
                          <p className="font-semibold text-kisan-text-primary">{weather.temperature + 2}°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7-Day Forecast */}
                {forecast && forecast.length > 0 && (
                  <div className="kisan-card p-6">
                    <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 font-devanagari">
                      7-दिन ��ा पूर्वानुमान
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                      {forecast.map((day, index) => (
                        <div key={index} className="text-center p-3 bg-secondary/30 rounded-kisan">
                          <p className="text-sm font-medium text-kisan-text-primary mb-2 font-devanagari">
                            {formatDate(day.date)}
                          </p>
                          <div className="flex justify-center mb-2">
                            {getWeatherIcon(day.condition, 'w-6 h-6')}
                          </div>
                          <div className="text-sm">
                            <p className="font-semibold text-kisan-text-primary">{day.temp.max}°</p>
                            <p className="text-kisan-text-muted">{day.temp.min}°</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weather Alerts */}
                {weather.alerts && weather.alerts.length > 0 && (
                  <div className="kisan-card p-6">
                    <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 flex items-center space-x-2 font-devanagari">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span>मौसम चेतावनी</span>
                    </h3>
                    <div className="space-y-3">
                      {weather.alerts.map((alert, index) => (
                        <div key={index} className={`p-4 rounded-kisan border-l-4 ${
                          alert.type === 'warning' 
                            ? 'bg-red-50 border-red-400' 
                            : 'bg-amber-50 border-amber-400'
                        }`}>
                          <h4 className="font-semibold text-kisan-text-primary mb-1">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-kisan-text-secondary font-devanagari">
                            {alert.description}
                          </p>
                          <p className="text-xs text-kisan-text-muted mt-2">
                            वैध: {new Date(alert.validUntil).toLocaleString('hi-IN')} तक
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Crop Advice & Additional Info */}
              <div className="space-y-6">
                {/* Crop-Specific Advice */}
                {weather.cropAdvice && weather.cropAdvice.length > 0 && (
                  <div className="kisan-card p-6">
                    <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 flex items-center space-x-2 font-devanagari">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <span>फसल सलाह</span>
                    </h3>
                    <div className="space-y-3">
                      {weather.cropAdvice.map((advice, index) => (
                        <div key={index} className={`p-3 rounded-kisan border-l-4 ${
                          advice.priority === 'high' 
                            ? 'bg-red-50 border-red-400' 
                            : advice.priority === 'medium'
                            ? 'bg-amber-50 border-amber-400'
                            : 'bg-green-50 border-green-400'
                        }`}>
                          <h4 className="font-semibold text-kisan-text-primary font-devanagari">
                            {advice.crop}
                          </h4>
                          <p className="text-sm text-kisan-text-secondary font-devanagari">
                            {advice.advice}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Today's Farming Activities */}
                <div className="kisan-card p-6">
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 flex items-center space-x-2 font-devanagari">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>आज के कार्य</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-kisan">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-kisan-text-primary font-devanagari">सुबह 6-8 बजे</p>
                        <p className="text-sm text-kisan-text-secondary font-devanagari">खेत का निरीक्षण करें</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-kisan">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-kisan-text-primary font-devanagari">शा��� 5-7 बजे</p>
                        <p className="text-sm text-kisan-text-secondary font-devanagari">सिंचाई का समय</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-kisan">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-kisan-text-primary font-devanagari">रात 8-9 बजे</p>
                        <p className="text-sm text-kisan-text-secondary font-devanagari">कल की योजना बनाएं</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Statistics */}
                <div className="kisan-card p-6">
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 flex items-center space-x-2 font-devanagari">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>मौसम आंकड़े</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-kisan-text-muted font-devanagari">आर्द्रता</span>
                        <span className="text-kisan-text-primary">{weather.humidity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${weather.humidity}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-kisan-text-muted font-devanagari">हवा की गति</span>
                        <span className="text-kisan-text-primary">{weather.windSpeed} km/h</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-500 h-2 rounded-full" 
                          style={{ width: `${Math.min(weather.windSpeed * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-kisan-text-muted font-devanagari">दृश्यता</span>
                        <span className="text-kisan-text-primary">{weather.visibility} km</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${Math.min(weather.visibility * 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WeatherPage;
