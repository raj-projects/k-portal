import { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  MapPin,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Weather = () => {
  const [language, setLanguage] = useState('hi');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const content = {
    hi: {
      title: 'मौसम की जानकारी',
      subtitle: 'आज का मौसम और 7 दिन का पूर्वानुमान',
      currentWeather: 'वर्तमान मौसम',
      forecast: '7 दिन का पूर्वानुमान',
      details: 'विस्तृत जानकारी',
      location: 'स्थान',
      lastUpdated: 'अंतिम अपडेट',
      refresh: 'रिफ्रेश करें',
      temperature: 'तापमान',
      humidity: 'नमी',
      windSpeed: 'हवा की गति',
      visibility: 'दृश्यता',
      pressure: 'दबाव',
      uvIndex: 'UV इंडेक्स',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त'
    },
    en: {
      title: 'Weather Information',
      subtitle: 'Today\'s weather and 7-day forecast',
      currentWeather: 'Current Weather',
      forecast: '7-Day Forecast',
      details: 'Detailed Information',
      location: 'Location',
      lastUpdated: 'Last Updated',
      refresh: 'Refresh',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      visibility: 'Visibility',
      pressure: 'Pressure',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset'
    }
  };

  const currentWeatherData = {
    location: 'New Delhi, India',
    temperature: 28,
    condition: 'Partly Cloudy',
    conditionHi: 'आंशिक बादल',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    sunrise: '06:15 AM',
    sunset: '06:45 PM'
  };

  const forecastData = [
    { day: 'Today/आज', high: 32, low: 24, condition: 'Sunny/धूप', icon: Sun, rain: 10 },
    { day: 'Tomorrow/कल', high: 30, low: 22, condition: 'Cloudy/बादल', icon: Cloud, rain: 30 },
    { day: 'Day 3/दिन 3', high: 28, low: 20, condition: 'Rain/बारिश', icon: CloudRain, rain: 80 },
    { day: 'Day 4/दिन 4', high: 26, low: 18, condition: 'Rain/बारिश', icon: CloudRain, rain: 90 },
    { day: 'Day 5/दिन 5', high: 29, low: 21, condition: 'Cloudy/बादल', icon: Cloud, rain: 40 },
    { day: 'Day 6/दिन 6', high: 31, low: 23, condition: 'Sunny/धूप', icon: Sun, rain: 5 },
    { day: 'Day 7/दिन 7', high: 33, low: 25, condition: 'Sunny/धूप', icon: Sun, rain: 0 }
  ];

  const weatherDetails = [
    { icon: Thermometer, label: content[language as keyof typeof content].temperature, value: `${currentWeatherData.temperature}°C`, trend: 'up' },
    { icon: Droplets, label: content[language as keyof typeof content].humidity, value: `${currentWeatherData.humidity}%`, trend: 'down' },
    { icon: Wind, label: content[language as keyof typeof content].windSpeed, value: `${currentWeatherData.windSpeed} km/h`, trend: 'up' },
    { icon: Eye, label: content[language as keyof typeof content].visibility, value: `${currentWeatherData.visibility} km`, trend: 'neutral' },
    { icon: Gauge, label: content[language as keyof typeof content].pressure, value: `${currentWeatherData.pressure} mb`, trend: 'down' },
    { icon: Sun, label: content[language as keyof typeof content].uvIndex, value: currentWeatherData.uvIndex.toString(), trend: 'up' }
  ];

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    // Auto-refresh every 10 minutes as specified in requirements
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, this would trigger API calls to update weather data
    }, 600000); // 10 minutes = 600000ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-farm-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-farm-700 mb-2">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        {/* Location and Refresh */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4 sm:mb-0">
            <MapPin className="h-5 w-5 text-farm-600 mr-2" />
            <span className="text-farm-700 font-medium">{currentWeatherData.location}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-farm-600">
              {content[language as keyof typeof content].lastUpdated}: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button
              onClick={handleRefresh}
              disabled={loading}
              size="sm"
              className="bg-farm-600 hover:bg-farm-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {content[language as keyof typeof content].refresh}
            </Button>
          </div>
        </div>

        {/* Current Weather */}
        <Card className="mb-8 border-farm-200 bg-gradient-to-r from-blue-500 to-farm-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              {content[language as keyof typeof content].currentWeather}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Sun className="h-24 w-24 mr-4" />
                  <div>
                    <div className="text-6xl font-bold">{currentWeatherData.temperature}°</div>
                    <div className="text-xl opacity-90">
                      {language === 'hi' ? currentWeatherData.conditionHi : currentWeatherData.condition}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentWeatherData.humidity}%</div>
                  <div className="text-sm opacity-90">{content[language as keyof typeof content].humidity}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentWeatherData.windSpeed} km/h</div>
                  <div className="text-sm opacity-90">{content[language as keyof typeof content].windSpeed}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{currentWeatherData.sunrise}</div>
                  <div className="text-sm opacity-90">{content[language as keyof typeof content].sunrise}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{currentWeatherData.sunset}</div>
                  <div className="text-sm opacity-90">{content[language as keyof typeof content].sunset}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {weatherDetails.map((detail, index) => (
            <Card key={index} className="border-farm-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <detail.icon className="h-8 w-8 mx-auto mb-2 text-farm-600" />
                <div className="text-xl font-bold text-farm-700 flex items-center justify-center">
                  {detail.value}
                  {detail.trend === 'up' && <TrendingUp className="h-4 w-4 ml-1 text-green-500" />}
                  {detail.trend === 'down' && <TrendingDown className="h-4 w-4 ml-1 text-red-500" />}
                </div>
                <div className="text-sm text-farm-600">{detail.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 7-Day Forecast */}
        <Card className="border-farm-200">
          <CardHeader>
            <CardTitle className="text-2xl text-farm-700">
              {content[language as keyof typeof content].forecast}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {forecastData.map((day, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-farm-50 hover:bg-farm-100 transition-colors">
                  <div className="font-medium text-farm-700 mb-2 text-sm">{day.day}</div>
                  <day.icon className="h-12 w-12 mx-auto mb-2 text-farm-600" />
                  <div className="text-sm text-farm-600 mb-2">{day.condition}</div>
                  <div className="font-bold text-farm-700">
                    {day.high}° / {day.low}°
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    💧 {day.rain}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farming Advisory */}
        <Card className="mt-8 border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
          <CardHeader>
            <CardTitle className="text-xl text-farm-700">
              {language === 'hi' ? '🌾 कृषि सलाह' : '🌾 Farming Advisory'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-farm-700">
              <p>• {language === 'hi' ? 'अगले 3 दिनों में बारिश की संभावना है, फ���ल की कटाई में देरी करें' : 'Rain expected in next 3 days, delay harvesting'}</p>
              <p>• {language === 'hi' ? 'उच्च नमी के कारण फंगल रोगों से बचाव के लिए छिड़काव करें' : 'High humidity may cause fungal diseases, spray preventive measures'}</p>
              <p>• {language === 'hi' ? 'तापमान स्थिर है, सिंचाई की नियमित व्यवस्था करें' : 'Stable temperature, maintain regular irrigation schedule'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
