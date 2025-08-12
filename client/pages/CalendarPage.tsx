import React, { useState, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sprout, 
  Sun, 
  CloudRain,
  Star,
  Clock,
  MapPin,
  Droplets,
  Bug,
  Scissors,
  Target
} from 'lucide-react';

const CalendarPage = () => {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Agricultural events and important dates
  const agriculturalEvents = {
    '2024-01-15': {
      title: language === 'hi' ? 'गेहूं में पहली सिंचाई' : 'First Wheat Irrigation',
      type: 'irrigation',
      crop: 'wheat',
      priority: 'high'
    },
    '2024-01-26': {
      title: language === 'hi' ? 'गणतंत्र दिवस' : 'Republic Day',
      type: 'holiday',
      priority: 'medium'
    },
    '2024-02-10': {
      title: language === 'hi' ? 'गेहूं में कीट नियंत्रण' : 'Wheat Pest Control',
      type: 'pest-control',
      crop: 'wheat',
      priority: 'high'
    },
    '2024-02-14': {
      title: language === 'hi' ? 'वसंत पंचमी - नई फसल की बुआई' : 'Vasant Panchami - New Crop Sowing',
      type: 'auspicious',
      priority: 'medium'
    },
    '2024-03-08': {
      title: language === 'hi' ? 'होली - वसंती फसलों का समय' : 'Holi - Spring Crops Time',
      type: 'festival',
      priority: 'medium'
    },
    '2024-03-21': {
      title: language === 'hi' ? 'वसंत विषुव - गर्मी की फसल तैयारी' : 'Spring Equinox - Summer Crop Preparation',
      type: 'seasonal',
      priority: 'high'
    },
    '2024-04-14': {
      title: language === 'hi' ? 'बैसाखी - गेहूं की कटाई' : 'Baisakhi - Wheat Harvesting',
      type: 'harvest',
      crop: 'wheat',
      priority: 'high'
    },
    '2024-04-30': {
      title: language === 'hi' ? 'गर्मी की फसल बुआई शुरू' : 'Summer Crop Sowing Begins',
      type: 'sowing',
      priority: 'high'
    },
    '2024-06-15': {
      title: language === 'hi' ? 'मानसून आगमन - धान की रोपाई' : 'Monsoon Arrival - Rice Transplanting',
      type: 'sowing',
      crop: 'rice',
      priority: 'high'
    },
    '2024-07-01': {
      title: language === 'hi' ? 'खरीफ फसल बुआई' : 'Kharif Crop Sowing',
      type: 'sowing',
      priority: 'high'
    },
    '2024-08-15': {
      title: language === 'hi' ? 'स्वतंत्रता दिवस' : 'Independence Day',
      type: 'holiday',
      priority: 'medium'
    },
    '2024-09-17': {
      title: language === 'hi' ? 'गणेश चतुर्थी - नए कार्यों का शुभारंभ' : 'Ganesh Chaturthi - New Ventures',
      type: 'auspicious',
      priority: 'medium'
    },
    '2024-10-02': {
      title: language === 'hi' ? 'गांधी जयंती - जैविक खेती दिवस' : 'Gandhi Jayanti - Organic Farming Day',
      type: 'holiday',
      priority: 'medium'
    },
    '2024-10-15': {
      title: language === 'hi' ? 'खरीफ फसल कटाई शुरू' : 'Kharif Harvest Begins',
      type: 'harvest',
      priority: 'high'
    },
    '2024-11-14': {
      title: language === 'hi' ? 'बाल दिवस - कृषि शिक्षा दिवस' : "Children's Day - Agricultural Education Day",
      type: 'education',
      priority: 'medium'
    },
    '2024-11-15': {
      title: language === 'hi' ? 'कार्तिक पूर्णिमा - गेहूं बुआई' : 'Kartik Purnima - Wheat Sowing',
      type: 'auspicious',
      crop: 'wheat',
      priority: 'high'
    },
    '2024-12-25': {
      title: language === 'hi' ? 'क्रिसमस' : 'Christmas',
      type: 'holiday',
      priority: 'medium'
    }
  };

  // Weather patterns for each month
  const monthlyWeatherPattern = {
    0: { icon: CloudRain, temp: '10-20°C', rainfall: 'Low', advice: language === 'hi' ? 'सर्दी की फसल की देखभाल' : 'Winter crop care' },
    1: { icon: Sun, temp: '15-25°C', rainfall: 'Low', advice: language === 'hi' ? 'फसल की सिंचाई करें' : 'Irrigate crops' },
    2: { icon: Sun, temp: '20-30°C', rainfall: 'Low', advice: language === 'hi' ? 'गर्मी की तैयारी करें' : 'Prepare for summer' },
    3: { icon: Sun, temp: '25-35°C', rainfall: 'Low', advice: language === 'hi' ? 'कटाई का समय' : 'Harvesting time' },
    4: { icon: Sun, temp: '30-40°C', rainfall: 'Very Low', advice: language === 'hi' ? 'पानी की बचत करें' : 'Conserve water' },
    5: { icon: Sun, temp: '35-45°C', rainfall: 'Low', advice: language === 'hi' ? 'मानसून की तैयारी' : 'Monsoon preparation' },
    6: { icon: CloudRain, temp: '28-35°C', rainfall: 'High', advice: language === 'hi' ? 'धान की रोपाई' : 'Rice transplanting' },
    7: { icon: CloudRain, temp: '26-32°C', rainfall: 'Very High', advice: language === 'hi' ? 'जल निकासी व्यवस्था' : 'Drainage management' },
    8: { icon: CloudRain, temp: '25-30°C', rainfall: 'High', advice: language === 'hi' ? 'कीट रोग नियंत्रण' : 'Pest disease control' },
    9: { icon: Sun, temp: '22-28°C', rainfall: 'Medium', advice: language === 'hi' ? 'फसल की देखभाल' : 'Crop monitoring' },
    10: { icon: Sun, temp: '18-26°C', rainfall: 'Low', advice: language === 'hi' ? 'कटाई की तैयारी' : 'Harvest preparation' },
    11: { icon: CloudRain, temp: '12-22°C', rainfall: 'Low', advice: language === 'hi' ? 'रबी फसल बुआई' : 'Rabi crop sowing' }
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNamesHindi = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDaysHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'irrigation': return Droplets;
      case 'sowing': return Sprout;
      case 'harvest': return Scissors;
      case 'pest-control': return Bug;
      case 'auspicious': return Star;
      case 'festival': return Star;
      case 'seasonal': return Sun;
      default: return Target;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'irrigation': return 'bg-blue-100 text-blue-800';
      case 'sowing': return 'bg-green-100 text-green-800';
      case 'harvest': return 'bg-orange-100 text-orange-800';
      case 'pest-control': return 'bg-red-100 text-red-800';
      case 'auspicious': return 'bg-yellow-100 text-yellow-800';
      case 'festival': return 'bg-purple-100 text-purple-800';
      case 'seasonal': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    } else {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    }
  };

  const getEventsForDate = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return agriculturalEvents[dateKey as keyof typeof agriculturalEvents];
  };

  const currentWeatherPattern = monthlyWeatherPattern[currentMonth as keyof typeof monthlyWeatherPattern];
  const WeatherIcon = currentWeatherPattern.icon;

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'कृषि कैलेंडर' : 'Agricultural Calendar'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'महत्वपूर्ण कृषि तिथियां, त्योहार और मौसमी सलाह। अपनी खेती की योजना बेहतर बनाएं।'
                : 'Important agricultural dates, festivals and seasonal advice. Plan your farming better.'
              }
            </p>
          </div>

          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar">
                {language === 'hi' ? 'कैलेंडर' : 'Calendar'}
              </TabsTrigger>
              <TabsTrigger value="events">
                {language === 'hi' ? 'घटनाएं' : 'Events'}
              </TabsTrigger>
              <TabsTrigger value="weather">
                {language === 'hi' ? 'मौसमी पैटर्न' : 'Weather Pattern'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Calendar */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6" />
                        {language === 'hi' ? monthNamesHindi[currentMonth] : monthNames[currentMonth]} {currentYear}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateMonth('prev')}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentDate(new Date())}
                        >
                          {language === 'hi' ? 'आज' : 'Today'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateMonth('next')}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {(language === 'hi' ? weekDaysHindi : weekDays).map((day) => (
                        <div key={day} className="p-2 text-center font-medium text-kisan-text-secondary text-sm">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => {
                        if (!day) {
                          return <div key={index} className="p-2 h-20"></div>;
                        }

                        const isToday = day.toDateString() === today.toDateString();
                        const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                        const event = getEventsForDate(day);
                        const EventIcon = event ? getEventTypeIcon(event.type) : null;

                        return (
                          <div
                            key={index}
                            onClick={() => setSelectedDate(day)}
                            className={`p-2 h-20 border rounded cursor-pointer transition-colors ${
                              isToday ? 'bg-kisan-primary text-white' :
                              isSelected ? 'bg-kisan-primary/20 border-kisan-primary' :
                              'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="text-sm font-medium">{day.getDate()}</div>
                            {event && (
                              <div className="mt-1">
                                {EventIcon && (
                                  <div className={`inline-flex items-center gap-1 px-1 py-0.5 rounded text-xs ${getEventTypeColor(event.type)}`}>
                                    <EventIcon className="h-3 w-3" />
                                    <span className="truncate max-w-16">{event.title.substring(0, 8)}...</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Event Details Sidebar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      {language === 'hi' ? 'विवरण' : 'Details'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-kisan-text-primary">
                            {selectedDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h3>
                        </div>

                        {getEventsForDate(selectedDate) ? (
                          <div className="space-y-3">
                            {(() => {
                              const event = getEventsForDate(selectedDate)!;
                              const EventIcon = getEventTypeIcon(event.type);
                              return (
                                <div className={`p-3 rounded-kisan ${getEventTypeColor(event.type)}`}>
                                  <div className="flex items-start gap-2">
                                    <EventIcon className="h-5 w-5 mt-0.5" />
                                    <div>
                                      <h4 className="font-medium">{event.title}</h4>
                                      {event.crop && (
                                        <p className="text-sm mt-1">
                                          {language === 'hi' ? 'फसल:' : 'Crop:'} {event.crop}
                                        </p>
                                      )}
                                      <Badge variant="outline" className="mt-2">
                                        {event.priority === 'high' ? (language === 'hi' ? 'उच्च प्राथमिकता' : 'High Priority') :
                                         event.priority === 'medium' ? (language === 'hi' ? 'मध्यम प्राथमिकता' : 'Medium Priority') :
                                         (language === 'hi' ? 'कम प्राथमिकता' : 'Low Priority')}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <p className="text-kisan-text-secondary text-sm">
                            {language === 'hi' ? 'इस दिन कोई विशेष घटना नहीं है।' : 'No special events on this day.'}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-kisan-text-secondary">
                          {language === 'hi' ? 'विवरण देखने के लिए कोई दिनांक चुनें' : 'Select a date to view details'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-6 w-6" />
                    {language === 'hi' ? 'आगामी कृषि घटनाएं' : 'Upcoming Agricultural Events'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(agriculturalEvents)
                      .filter(([date]) => new Date(date) >= today)
                      .slice(0, 10)
                      .map(([date, event]) => {
                        const EventIcon = getEventTypeIcon(event.type);
                        const eventDate = new Date(date);
                        
                        return (
                          <div key={date} className="flex items-center gap-4 p-4 border rounded-kisan hover:bg-gray-50">
                            <div className={`p-2 rounded-kisan ${getEventTypeColor(event.type)}`}>
                              <EventIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-kisan-text-primary">{event.title}</h3>
                              <p className="text-sm text-kisan-text-secondary">
                                {eventDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              {event.crop && (
                                <p className="text-xs text-kisan-text-muted mt-1">
                                  {language === 'hi' ? 'फसल:' : 'Crop:'} {event.crop}
                                </p>
                              )}
                            </div>
                            <Badge variant={event.priority === 'high' ? 'destructive' : 'outline'}>
                              {event.priority === 'high' ? (language === 'hi' ? 'उच्च' : 'High') :
                               event.priority === 'medium' ? (language === 'hi' ? 'मध्यम' : 'Medium') :
                               (language === 'hi' ? 'कम' : 'Low')}
                            </Badge>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weather">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Current Month Weather */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <WeatherIcon className="h-6 w-6" />
                      {language === 'hi' ? `${monthNamesHindi[currentMonth]} मौसम पैटर्न` : `${monthNames[currentMonth]} Weather Pattern`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-kisan">
                          <h4 className="font-medium text-blue-800">
                            {language === 'hi' ? 'तापमान' : 'Temperature'}
                          </h4>
                          <p className="text-2xl font-bold text-blue-600">{currentWeatherPattern.temp}</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-kisan">
                          <h4 className="font-medium text-green-800">
                            {language === 'hi' ? 'वर्षा' : 'Rainfall'}
                          </h4>
                          <p className="text-2xl font-bold text-green-600">{currentWeatherPattern.rainfall}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-kisan">
                        <h4 className="font-medium text-yellow-800 mb-2">
                          {language === 'hi' ? 'कृषि सलाह' : 'Agricultural Advice'}
                        </h4>
                        <p className="text-yellow-700">{currentWeatherPattern.advice}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Weather Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-6 w-6" />
                      {language === 'hi' ? 'वार्षिक मौसम पैटर्न' : 'Yearly Weather Pattern'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(monthlyWeatherPattern).map(([month, pattern]) => {
                        const monthIndex = parseInt(month);
                        const PatternIcon = pattern.icon;
                        const isCurrentMonth = monthIndex === currentMonth;
                        
                        return (
                          <div 
                            key={month} 
                            className={`flex items-center gap-3 p-2 rounded ${isCurrentMonth ? 'bg-kisan-primary/10 border border-kisan-primary' : ''}`}
                          >
                            <PatternIcon className="h-5 w-5 text-kisan-primary" />
                            <div className="flex-1">
                              <span className="font-medium">
                                {language === 'hi' ? monthNamesHindi[monthIndex] : monthNames[monthIndex]}
                              </span>
                              <p className="text-xs text-kisan-text-secondary">{pattern.advice}</p>
                            </div>
                            <span className="text-sm text-kisan-text-secondary">{pattern.temp}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
