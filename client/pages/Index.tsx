import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  TrendingUp,
  Gift,
  BookOpen,
  Calculator,
  Users,
  MessageCircle,
  Smartphone,
  ArrowRight,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Search,
  Play,
  Wrench,
  Award,
  Heart,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [language, setLanguage] = useState('hi');
  const [currentNews, setCurrentNews] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    hi: {
      title: 'किसानमित्र',
      subtitle: 'KisanMitra',
      tagline: 'किसानों के लिए निःशुल्क डिजिटल सहायता - Free Digital Help for Farmers',
      welcome: 'भारत के किसानों के लिए एक मुफ्त डिजिटल प्लेटफॉर्म',
      quickAccess: 'त्वरित पहुंच',
      latestNews: 'नवीनतम कृषि समाचार',
      features: 'सुविधाएं',
      downloadApp: 'मोबाइल ऐप डाउनलोड कर��ं',
      searchPlaceholder: '��सल, कीमत या योजना खोजें...',
      searchButton: 'खोजें',
      popularSearches: 'लोकप्रिय खोजें',
      testimonials: 'किसान समीक्षाएं',
      successStories: 'सफलता की कहानियां'
    },
    en: {
      title: 'KisanMitra',
      subtitle: 'किसानमित्र',
      tagline: 'Free Digital Help for Farmers - किसानों के लिए निःशुल्क डिजिटल सहायता',
      welcome: 'A free digital platform for farmers across India',
      quickAccess: 'Quick Access',
      latestNews: 'Latest Agriculture News',
      features: 'Features',
      downloadApp: 'Download Mobile App',
      searchPlaceholder: 'Search crops, prices, or schemes...',
      searchButton: 'Search',
      popularSearches: 'Popular Searches',
      testimonials: 'Farmer Reviews',
      successStories: 'Success Stories'
    }
  };

  const quickAccessItems = [
    {
      icon: Cloud,
      title: { hi: 'मौसम', en: 'Weather' },
      description: { hi: 'लाइव मौसम और बारिश की भविष्यवाणी', en: 'Live weather and rainfall predictions' },
      href: '/weather',
      color: 'bg-blue-500'
    },
    {
      icon: TrendingUp,
      title: { hi: 'फसल की कीमतें', en: 'Crop Prices' },
      description: { hi: 'सभी मंडियों के ताज़ा भाव', en: 'Latest prices from all markets' },
      href: '/mandi-prices',
      color: 'bg-green-500'
    },
    {
      icon: Gift,
      title: { hi: 'सरकारी योजनाएं', en: 'Government Schemes' },
      description: { hi: 'केंद्र और राज्य सरकार की योजनाएं', en: 'Central and state government schemes' },
      href: '/government-schemes',
      color: 'bg-purple-500'
    },
    {
      icon: BookOpen,
      title: { hi: 'विशेषज्ञ सलाह', en: 'Expert Advice' },
      description: { hi: 'कृषि विशेषज्ञों की सलाह और तकनीकें', en: 'Expert farming advice and techniques' },
      href: '/farming-tips',
      color: 'bg-orange-500'
    }
  ];

  const additionalFeatures = [
    {
      icon: Calculator,
      title: { hi: 'लोन कैलक्यूलेटर', en: 'Loan Calculator' },
      href: '/calculators'
    },
    {
      icon: Users,
      title: { hi: 'समुदाय फोरम', en: 'Community Forum' },
      href: '/community'
    },
    {
      icon: MessageCircle,
      title: { hi: 'AI चैटबॉट', en: 'AI Chatbot' },
      href: '/chatbot'
    }
  ];

  const popularSearches = [
    { hi: 'गेहूं की कीमत', en: 'Wheat prices' },
    { hi: 'PM-KISAN योजना', en: 'PM-KISAN scheme' },
    { hi: 'मौसम पूर्वानुमान', en: 'Weather forecast' },
    { hi: 'जैविक खेती', en: 'Organic farming' },
    { hi: 'ट्रैक्टर सब्सिडी', en: 'Tractor subsidy' }
  ];

  const testimonials = [
    {
      name: { hi: 'राम सिंह', en: 'Ram Singh' },
      location: { hi: 'पंजाब', en: 'Punjab' },
      text: { hi: 'किसानमित्र ने मेरी फसल की उत्पादकता 30% बढ़ाई है।', en: 'KisanMitra increased my crop productivity by 30%.' },
      rating: 5
    },
    {
      name: { hi: 'सुनीता देवी', en: 'Sunita Devi' },
      location: { hi: '���रियाणा', en: 'Haryana' },
      text: { hi: 'मौसम की सही जानकारी से बारिश का नुकसान बचा।', en: 'Accurate weather info saved my crops from rain damage.' },
      rating: 5
    },
    {
      name: { hi: 'विकास पटेल', en: 'Vikas Patel' },
      location: { hi: 'गुजरात', en: 'Gujarat' },
      text: { hi: 'सरकारी योजनाओं की जानकारी आसानी से मिल गई।', en: 'Got government scheme information easily.' },
      rating: 4
    }
  ];

  const successStories = [
    {
      title: { hi: 'जैविक खेती से सफलता', en: 'Success with Organic Farming' },
      farmer: { hi: 'अजय कुमार, बिहार', en: 'Ajay Kumar, Bihar' },
      description: { hi: 'किसानमित्र की सलाह से जैविक खेती अपनाकर आय दोगुनी की', en: 'Doubled income by adopting organic farming with KisanMitra advice' }
    },
    {
      title: { hi: 'स्मार्ट सिंचाई से बचत', en: 'Savings with Smart Irrigation' },
      farmer: { hi: 'प्रीति शर्मा, राजस्थान', en: 'Preeti Sharma, Rajasthan' },
      description: { hi: 'पानी की 40% बचत और बेहतर उत्पादन', en: '40% water savings and better production' }
    }
  ];

  const newsItems = [
    { hi: '🌾 नई ��िस्म के धान ��ी खेती से 40% तक बढ़ सकता है उत्पादन', en: '🌾 New rice varieties can increase production by 40%' },
    { hi: '☀️ इस सप्ताह मौसम साफ रहने की संभावना, सिंचाई की तैयारी करें', en: '☀️ Clear weather expected this week, prepare for irrigation' },
    { hi: '💰 PM-KISAN योजना की अगली किस्त 15 तारीख को जारी होगी', en: '💰 Next installment of PM-KISAN scheme to be released on 15th' },
    { hi: '🚜 कृषि उपकरण पर 50% सब्सिडी का नया ऐलान', en: '🚜 New announcement of 50% subsidy on agricultural equipment' }
  ];

  const weatherData = {
    temperature: '28°C',
    condition: 'Sunny',
    humidity: '65%',
    windSpeed: '12 km/h'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to appropriate page based on search term
      const query = searchQuery.toLowerCase();
      if (query.includes('weather') || query.includes('मौसम')) {
        window.location.href = '/weather';
      } else if (query.includes('price') || query.includes('भाव') || query.includes('मंडी')) {
        window.location.href = '/mandi-prices';
      } else if (query.includes('scheme') || query.includes('योजना')) {
        window.location.href = '/government-schemes';
      } else {
        // Default to farming tips for crop-related searches
        window.location.href = '/farming-tips';
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-farm-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-farm-600 via-farm-500 to-harvest-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full shadow-2xl">
                <span className="text-8xl">🌾</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {content[language as keyof typeof content].title}
            </h1>
            <p className="text-2xl md:text-3xl mb-4 opacity-95 font-medium">
              {content[language as keyof typeof content].subtitle}
            </p>
            <p className="text-lg md:text-xl mb-8 font-medium max-w-4xl mx-auto leading-relaxed">
              {content[language as keyof typeof content].tagline}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={content[language as keyof typeof content].searchPlaceholder}
                    className="w-full px-6 py-4 text-lg text-farm-700 bg-white rounded-l-full border-0 focus:ring-4 focus:ring-white/30 focus:outline-none placeholder-farm-500"
                  />
                  <Button
                    type="submit"
                    className="px-8 py-4 bg-harvest-500 hover:bg-harvest-600 text-white rounded-r-full border-0 font-semibold text-lg"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    {content[language as keyof typeof content].searchButton}
                  </Button>
                </div>
              </form>

              {/* Popular Searches */}
              <div className="mt-4">
                <p className="text-sm opacity-80 mb-2">{content[language as keyof typeof content].popularSearches}:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search[language as keyof typeof search])}
                      className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
                    >
                      {search[language as keyof typeof search]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-harvest-400 text-soil-800 py-4 overflow-hidden shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center">
            <div className="flex items-center mr-6 bg-soil-800 text-harvest-100 px-4 py-2 rounded-full font-bold text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              {content[language as keyof typeof content].latestNews}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                <span className="text-lg font-semibold">
                  {newsItems[currentNews]?.[language as keyof typeof newsItems[0]]}
                </span>
                <span className="mx-8">•</span>
                <span className="text-lg">
                  {newsItems[(currentNews + 1) % newsItems.length]?.[language as keyof typeof newsItems[0]]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Weather Card */}
        <Card className="mb-12 border-farm-200 bg-gradient-to-r from-blue-50 to-farm-50">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-700">
              <Cloud className="mr-2 h-6 w-6" />
              {language === 'hi' ? 'आज का मौसम' : 'Today\'s Weather'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold text-gray-800">{weatherData.temperature}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'तापमान' : 'Temperature'}</p>
              </div>
              <div className="text-center">
                <CloudRain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-xl font-bold text-gray-800">{weatherData.humidity}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'नमी' : 'Humidity'}</p>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <p className="text-xl font-bold text-gray-800">{weatherData.windSpeed}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'हवा' : 'Wind'}</p>
              </div>
              <div className="text-center">
                <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <p className="text-xl font-bold text-gray-800">{weatherData.condition}</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'स्थिति' : 'Condition'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-700 mb-4 text-center">
            {content[language as keyof typeof content].quickAccess}
          </h2>
          <p className="text-lg text-farm-600 text-center mb-8 max-w-2xl mx-auto">
            {language === 'hi'
              ? 'आपकी जरूरत के सभी कृषि उपकरण एक ही जगह - बड़े बटन, आसान उपयोग'
              : 'All your farming tools in one place - large buttons, easy to use'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <Link key={index} to={item.href} className="group">
                <Card className="h-full border-farm-200 hover:border-farm-400 transition-all duration-300 hover:shadow-xl group-hover:scale-105 bg-gradient-to-br from-white to-farm-50">
                  <CardContent className="p-8 text-center">
                    <div className={`${item.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <item.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-farm-700 mb-3 leading-tight">
                      {item.title[language as keyof typeof item.title]}
                    </h3>
                    <p className="text-farm-600 text-base leading-relaxed mb-4">
                      {item.description[language as keyof typeof item.description]}
                    </p>
                    <div className="flex items-center justify-center text-farm-500 group-hover:text-farm-700 transition-colors">
                      <span className="text-sm font-medium mr-2">
                        {language === 'hi' ? 'अभी देखें' : 'View Now'}
                      </span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Additional Note for Elderly Users */}
          <div className="mt-8 text-center">
            <div className="bg-harvest-100 border border-harvest-300 rounded-xl p-4 max-w-lg mx-auto">
              <p className="text-sm text-farm-700 font-medium">
                💡 {language === 'hi'
                  ? 'बड़े बटन और सरल डिज़ाइन - बुजुर्ग किसानों के लिए विशेष रूप से बनाया गया'
                  : 'Large buttons and simple design - specially made for elderly farmers'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-farm-700 mb-8 text-center">
            {content[language as keyof typeof content].features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Link key={index} to={feature.href} className="group">
                <Card className="border-farm-200 hover:border-farm-400 transition-all duration-300 hover:shadow-md group-hover:scale-102">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-farm-100 p-3 rounded-lg group-hover:bg-farm-200 transition-colors">
                      <feature.icon className="h-6 w-6 text-farm-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-farm-700">
                        {feature.title[language as keyof typeof feature.title]}
                      </h3>
                    </div>
                    <ArrowRight className="h-5 w-5 text-farm-500 group-hover:text-farm-700 transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-farm-700 mb-8 text-center">
            {content[language as keyof typeof content].testimonials}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-farm-200 bg-gradient-to-br from-farm-50 to-harvest-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-farm-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name[language as keyof typeof testimonial.name].charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-farm-700">
                        {testimonial.name[language as keyof typeof testimonial.name]}
                      </h4>
                      <p className="text-sm text-farm-600">
                        {testimonial.location[language as keyof typeof testimonial.location]}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-harvest-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-farm-700 italic">
                    "{testimonial.text[language as keyof typeof testimonial.text]}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-farm-700 mb-8 text-center">
            {content[language as keyof typeof content].successStories}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-harvest-500 mr-3" />
                    <h3 className="text-xl font-bold text-farm-700">
                      {story.title[language as keyof typeof story.title]}
                    </h3>
                  </div>
                  <p className="text-farm-600 font-medium mb-3">
                    {story.farmer[language as keyof typeof story.farmer]}
                  </p>
                  <p className="text-farm-700">
                    {story.description[language as keyof typeof story.description]}
                  </p>
                  <div className="flex items-center mt-4">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm text-farm-600">
                      {language === 'hi' ? 'प्रेरणादायक कहानी' : 'Inspiring Story'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Support Section */}
        <section className="mb-16">
          <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center">
                    <AlertCircle className="mr-3 h-8 w-8" />
                    {language === 'hi' ? '🆘 आपातकालीन सहायता' : '🆘 Emergency Support'}
                  </h2>
                  <p className="text-red-600 text-lg mb-6">
                    {language === 'hi'
                      ? 'फसल, मौसम या कीट संबंधी आपातकाल में तुरंत सहायता पाएं। 24x7 उपलब्ध।'
                      : 'Get immediate help for crop, weather or pest emergencies. Available 24x7.'
                    }
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4">
                      📞 1800-180-1551 {language === 'hi' ? 'पर कॉल करें' : 'Call Now'}
                    </Button>
                    <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50 font-semibold">
                      💬 {language === 'hi' ? 'WhatsApp पर संदेश भेजें' : 'Send WhatsApp Message'}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                    <div className="text-3xl mb-2">🌾</div>
                    <p className="font-semibold text-red-700">{language === 'hi' ? 'फसल आपातकाल' : 'Crop Emergency'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                    <div className="text-3xl mb-2">🌧️</div>
                    <p className="font-semibold text-red-700">{language === 'hi' ? 'मौसम चेतावनी' : 'Weather Alert'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                    <div className="text-3xl mb-2">🐛</div>
                    <p className="font-semibold text-red-700">{language === 'hi' ? 'कीट प्रकोप' : 'Pest Outbreak'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <p className="font-semibold text-red-700">{language === 'hi' ? 'वित्तीय सहायता' : 'Financial Aid'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mobile App Download Section */}
        <section className="text-center bg-gradient-to-r from-farm-500 to-harvest-400 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Smartphone className="h-20 w-20 mx-auto text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content[language as keyof typeof content].downloadApp}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            {language === 'hi'
              ? 'अपने फोन पर किसानमित्र ऐप इंस्टॉल करें और कभी भी, कहीं भी मदद पाएं। ऑफलाइन भी काम करता है!'
              : 'Install KisanMitra app on your phone and get help anytime, anywhere. Works offline too!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" variant="secondary" className="bg-white text-farm-700 hover:bg-gray-100 shadow-lg font-semibold px-8 py-4">
              <span className="text-2xl mr-3">📱</span>
              <div className="text-left">
                <div className="text-xs opacity-70">{language === 'hi' ? 'डाउनलोड करें' : 'Download on'}</div>
                <div className="font-bold">Google Play</div>
              </div>
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-farm-700 hover:bg-gray-100 shadow-lg font-semibold px-8 py-4">
              <span className="text-2xl mr-3">🍎</span>
              <div className="text-left">
                <div className="text-xs opacity-70">{language === 'hi' ? 'डाउनलोड करें' : 'Download on'}</div>
                <div className="font-bold">App Store</div>
              </div>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm opacity-90">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'ऑफलाइन काम' : 'Works Offline'}
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'मुफ्त ऐप' : 'Free App'}
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'नो एड्स' : 'No Ads'}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
