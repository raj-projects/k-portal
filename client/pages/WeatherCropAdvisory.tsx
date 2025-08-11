import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, AlertTriangle, CheckCircle, TrendingUp, Leaf, Bug, Sprout, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WeatherCropAdvisory = () => {
  const [language, setLanguage] = useState('hi');
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh weather data every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate weather data refresh
      console.log('Refreshing weather data...');
    }, 10 * 60 * 1000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  const content = {
    hi: {
      title: 'मौसम और फसल सलाह',
      subtitle: 'रियल-टाइम मौसम अपडेट और विशेषज्ञ कृषि सलाह',
      currentWeather: 'वर्तमान मौसम',
      forecast: '7 दिनों का पूर्वानुमान',
      cropAdvisory: 'फसल सलाह',
      pestAlerts: 'कीट चेतावनी',
      seasonalTips: 'मौसमी सुझाव',
      sowingTime: 'बुआई का समय',
      harvestTime: 'कटाई का समय',
      irrigationAdvice: 'सिंचाई की सलाह',
      fertilizerRecommendation: 'उर्वरक सिफारिश',
      location: 'स्थान',
      lastUpdated: 'अंतिम अपडेट',
      refreshData: 'डेटा रिफ्रेश करें'
    },
    en: {
      title: 'Weather & Crop Advisory',
      subtitle: 'Real-time Weather Updates and Expert Agricultural Advice',
      currentWeather: 'Current Weather',
      forecast: '7-Day Forecast',
      cropAdvisory: 'Crop Advisory',
      pestAlerts: 'Pest Alerts',
      seasonalTips: 'Seasonal Tips',
      sowingTime: 'Sowing Time',
      harvestTime: 'Harvest Time',
      irrigationAdvice: 'Irrigation Advice',
      fertilizerRecommendation: 'Fertilizer Recommendation',
      location: 'Location',
      lastUpdated: 'Last Updated',
      refreshData: 'Refresh Data'
    }
  };

  const currentWeather = {
    temperature: '28°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h',
    rainfall: '5mm',
    uvIndex: '7 (High)',
    pressure: '1013 hPa',
    visibility: '10 km'
  };

  const weeklyForecast = [
    { day: { hi: 'आज', en: 'Today' }, temp: '28/35°C', condition: 'Sunny', icon: Sun, rain: '10%' },
    { day: { hi: 'कल', en: 'Tomorrow' }, temp: '26/33°C', condition: 'Cloudy', icon: Cloud, rain: '30%' },
    { day: { hi: 'परसों', en: 'Day After' }, temp: '24/30°C', condition: 'Rain', icon: CloudRain, rain: '80%' },
    { day: { hi: 'गुरु', en: 'Thu' }, temp: '25/31°C', condition: 'Partly Cloudy', icon: Cloud, rain: '20%' },
    { day: { hi: 'शुक्र', en: 'Fri' }, temp: '27/34°C', condition: 'Sunny', icon: Sun, rain: '5%' },
    { day: { hi: 'शनि', en: 'Sat' }, temp: '29/36°C', condition: 'Hot', icon: Sun, rain: '0%' },
    { day: { hi: 'रवि', en: 'Sun' }, temp: '28/35°C', condition: 'Partly Cloudy', icon: Cloud, rain: '15%' }
  ];

  const cropAdvisory = [
    {
      crop: { hi: 'गेहूं', en: 'Wheat' },
      stage: { hi: 'बुआई का समय', en: 'Sowing Time' },
      advice: { 
        hi: 'अक्टूबर-नवंबर में बुआई के लिए उत्तम समय। मिट्टी में नमी की जांच करें।', 
        en: 'Optimal sowing time in October-November. Check soil moisture levels.' 
      },
      icon: Sprout,
      priority: 'high'
    },
    {
      crop: { hi: 'धान', en: 'Rice' },
      stage: { hi: 'कटाई का समय', en: 'Harvest Time' },
      advice: { 
        hi: 'अगले 15 दिनों में कटाई करें। मौसम साफ रहने की संभावना।', 
        en: 'Harvest within next 15 days. Clear weather expected.' 
      },
      icon: Calendar,
      priority: 'urgent'
    },
    {
      crop: { hi: 'मक्का', en: 'Maize' },
      stage: { hi: 'सिंचाई आवश्यक', en: 'Irrigation Required' },
      advice: { 
        hi: 'फूल आने के समय अधिक पानी की आवश्यकता। ड्रिप सिंचाई करें।', 
        en: 'High water requirement during flowering. Use drip irrigation.' 
      },
      icon: Droplets,
      priority: 'medium'
    }
  ];

  const pestAlerts = [
    {
      pest: { hi: 'तना छेदक', en: 'Stem Borer' },
      crop: { hi: 'धान', en: 'Rice' },
      severity: 'high',
      solution: { 
        hi: 'कार्बोफ्यूरान 3G @ 1 किग्रा/एकड़ का प्रयोग करें।', 
        en: 'Apply Carbofuran 3G @ 1 kg/acre.' 
      },
      preventive: { 
        hi: 'साफ-सफाई रखें और प्रकाश जाल का उपयोग करें।', 
        en: 'Maintain field hygiene and use light traps.' 
      }
    },
    {
      pest: { hi: 'माहू (एफिड)', en: 'Aphids' },
      crop: { hi: 'सरसों', en: 'Mustard' },
      severity: 'medium',
      solution: { 
        hi: 'इमिडाक्लोप्रिड 17.8% SL का छिड़काव करें।', 
        en: 'Spray Imidacloprid 17.8% SL.' 
      },
      preventive: { 
        hi: 'नीम तेल का छिड़काव करें और लाभकारी कीटों को बचाएं।', 
        en: 'Apply neem oil spray and protect beneficial insects.' 
      }
    }
  ];

  const seasonalTips = [
    {
      title: { hi: 'सर्दी की तैयारी', en: 'Winter Preparation' },
      tips: [
        { hi: 'फसल को पाले से बचाने के लिए धुआं करें', en: 'Create smoke to protect crops from frost' },
        { hi: 'सिंचाई सुबह के समय करें', en: 'Irrigate crops in the morning' },
        { hi: 'मल्चिंग का प्रयोग करें', en: 'Use mulching techniques' }
      ]
    },
    {
      title: { hi: 'मिट्टी की देखभाल', en: 'Soil Care' },
      tips: [
        { hi: 'मिट्टी की जांच कराएं', en: 'Test your soil regularly' },
        { hi: 'जैविक खाद का प्रयोग करें', en: 'Use organic fertilizers' },
        { hi: 'मिट्टी में नमी बनाए रखें', en: 'Maintain soil moisture' }
      ]
    }
  ];

  const locations = ['Delhi', 'Mumbai', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Rajasthan'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-farm-700 mb-4">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600 max-w-2xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
          
          {/* Location Selector and Refresh */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-farm-600 mr-2" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-farm-300 focus:ring-2 focus:ring-farm-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-farm-500 hover:bg-farm-600 text-white"
            >
              {content[language as keyof typeof content].refreshData}
            </Button>
            <div className="text-sm text-farm-600">
              {content[language as keyof typeof content].lastUpdated}: {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Current Weather Card */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-700">
              <Cloud className="mr-3 h-8 w-8" />
              {content[language as keyof typeof content].currentWeather} - {selectedLocation}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Thermometer className="h-12 w-12 mx-auto mb-2 text-red-500" />
                <p className="text-3xl font-bold text-gray-800">{currentWeather.temperature}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'तापमान' : 'Temperature'}</p>
              </div>
              <div className="text-center">
                <Droplets className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold text-gray-800">{currentWeather.humidity}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'नमी' : 'Humidity'}</p>
              </div>
              <div className="text-center">
                <Wind className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                <p className="text-2xl font-bold text-gray-800">{currentWeather.windSpeed}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'हवा' : 'Wind'}</p>
              </div>
              <div className="text-center">
                <CloudRain className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-gray-800">{currentWeather.rainfall}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'बारिश' : 'Rainfall'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-200">
              <div className="text-center">
                <p className="font-semibold text-gray-700">UV {language === 'hi' ? 'सूचकांक' : 'Index'}</p>
                <p className="text-lg text-orange-600">{currentWeather.uvIndex}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">{language === 'hi' ? 'दबाव' : 'Pressure'}</p>
                <p className="text-lg text-gray-600">{currentWeather.pressure}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">{language === 'hi' ? 'दृश्यता' : 'Visibility'}</p>
                <p className="text-lg text-gray-600">{currentWeather.visibility}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">{language === 'hi' ? 'स्थिति' : 'Condition'}</p>
                <p className="text-lg text-blue-600">{currentWeather.condition}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-green-700">
              <Calendar className="mr-3 h-8 w-8" />
              {content[language as keyof typeof content].forecast}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              {weeklyForecast.map((day, index) => (
                <div key={index} className="text-center bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <p className="font-semibold text-green-700 mb-2">
                    {day.day[language as keyof typeof day.day]}
                  </p>
                  <day.icon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-lg font-bold text-gray-800">{day.temp}</p>
                  <p className="text-sm text-blue-600 flex items-center justify-center mt-1">
                    <CloudRain className="h-4 w-4 mr-1" />
                    {day.rain}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Crop Advisory */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-orange-700">
                <Leaf className="mr-3 h-8 w-8" />
                {content[language as keyof typeof content].cropAdvisory}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropAdvisory.map((advisory, index) => (
                  <Alert key={index} className={`${
                    advisory.priority === 'urgent' ? 'border-red-300 bg-red-50' :
                    advisory.priority === 'high' ? 'border-orange-300 bg-orange-50' :
                    'border-yellow-300 bg-yellow-50'
                  }`}>
                    <advisory.icon className="h-5 w-5" />
                    <AlertDescription>
                      <div className="mb-2">
                        <span className="font-bold text-lg">
                          {advisory.crop[language as keyof typeof advisory.crop]}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          advisory.priority === 'urgent' ? 'bg-red-200 text-red-800' :
                          advisory.priority === 'high' ? 'bg-orange-200 text-orange-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {advisory.stage[language as keyof typeof advisory.stage]}
                        </span>
                      </div>
                      <p className="text-sm">
                        {advisory.advice[language as keyof typeof advisory.advice]}
                      </p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pest Alerts */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-red-700">
                <Bug className="mr-3 h-8 w-8" />
                {content[language as keyof typeof content].pestAlerts}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pestAlerts.map((alert, index) => (
                  <Alert key={index} className={`${
                    alert.severity === 'high' ? 'border-red-400 bg-red-50' : 'border-orange-400 bg-orange-50'
                  }`}>
                    <AlertTriangle className="h-5 w-5" />
                    <AlertDescription>
                      <div className="mb-2">
                        <span className="font-bold text-lg">
                          {alert.pest[language as keyof typeof alert.pest]}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          ({alert.crop[language as keyof typeof alert.crop]})
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          alert.severity === 'high' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                        }`}>
                          {alert.severity === 'high' ? (language === 'hi' ? 'गंभीर' : 'High') : (language === 'hi' ? 'मध्यम' : 'Medium')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-sm">{language === 'hi' ? '💊 उपचार:' : '💊 Treatment:'}</p>
                          <p className="text-sm">{alert.solution[language as keyof typeof alert.solution]}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{language === 'hi' ? '🛡️ बचाव:' : '🛡️ Prevention:'}</p>
                          <p className="text-sm">{alert.preventive[language as keyof typeof alert.preventive]}</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seasonal Tips */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-purple-700">
              <TrendingUp className="mr-3 h-8 w-8" />
              {content[language as keyof typeof content].seasonalTips}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasonalTips.map((tipSection, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-purple-100">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">
                    {tipSection.title[language as keyof typeof tipSection.title]}
                  </h3>
                  <div className="space-y-3">
                    {tipSection.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          {tip[language as keyof typeof tip]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Weather Alert */}
        <div className="mt-8">
          <Alert className="border-red-400 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-red-800">
                    ⚠️ {language === 'hi' ? 'मौसम चेतावनी' : 'Weather Alert'}
                  </p>
                  <p className="text-red-700">
                    {language === 'hi' 
                      ? 'अगले 48 घंटों में तेज़ हवा और बारिश की संभावना। फसल की सुरक्षा करें।'
                      : 'Strong winds and rain expected in next 48 hours. Protect your crops.'
                    }
                  </p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  {language === 'hi' ? 'अधिक जानकारी' : 'More Info'}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default WeatherCropAdvisory;
