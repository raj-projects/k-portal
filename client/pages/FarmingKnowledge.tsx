import { useState } from 'react';
import { BookOpen, Play, Award, TrendingUp, Users, Star, Calendar, Clock, Eye, ThumbsUp, Download, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FarmingKnowledge = () => {
  const [language, setLanguage] = useState('hi');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    hi: {
      title: 'कृषि ज्ञान केंद्र',
      subtitle: 'आधुनिक खेती की तकनीकें, जैविक खेती की जानकारी और सफलता की कहानियां',
      search: 'विषय खोजें...',
      organicFarming: 'जैविक खेती गाइड',
      modernTechniques: 'आधुनिक तकनीकें',
      videoTutorials: 'वीडियो ट्यूटोरियल',
      successStories: 'सफलता की कहानियां',
      expertArticles: 'विशेषज्ञ लेख',
      watchVideo: 'वीडियो देखें',
      readMore: 'अधिक पढ़ें',
      downloadGuide: 'गाइड डाउनलोड करें',
      views: 'बार देखा गया',
      likes: 'पसंद',
      duration: 'अवधि',
      level: 'स्तर',
      category: 'श्रेणी',
      allTopics: 'सभी विषय',
      featured: 'विशेष लेख',
      trending: 'ट्रेंडिंग'
    },
    en: {
      title: 'Farming Knowledge Center',
      subtitle: 'Modern farming techniques, organic farming guide, and success stories',
      search: 'Search topics...',
      organicFarming: 'Organic Farming Guide',
      modernTechniques: 'Modern Techniques',
      videoTutorials: 'Video Tutorials',
      successStories: 'Success Stories',
      expertArticles: 'Expert Articles',
      watchVideo: 'Watch Video',
      readMore: 'Read More',
      downloadGuide: 'Download Guide',
      views: 'views',
      likes: 'likes',
      duration: 'Duration',
      level: 'Level',
      category: 'Category',
      allTopics: 'All Topics',
      featured: 'Featured',
      trending: 'Trending'
    }
  };

  const categories = [
    { key: 'all', label: { hi: 'सभी विषय', en: 'All Topics' } },
    { key: 'organic', label: { hi: 'जैविक खेती', en: 'Organic Farming' } },
    { key: 'modern', label: { hi: 'आधुनिक तकनीक', en: 'Modern Tech' } },
    { key: 'success', label: { hi: 'सफलता की कहानी', en: 'Success Stories' } },
    { key: 'tutorials', label: { hi: 'ट्यूटोरियल', en: 'Tutorials' } }
  ];

  const articles = [
    {
      id: 1,
      title: { 
        hi: 'जैविक खेती की संपूर्ण गाइड - रसायन मुक्त खेती कैसे करें', 
        en: 'Complete Organic Farming Guide - How to Farm Without Chemicals' 
      },
      description: { 
        hi: 'जैविक खेती की तकनीकों, फायदों और चुनौतियों की विस्तृत जानकारी। कम लागत में अधिक उत्पादन के तरीके��',
        en: 'Detailed information about organic farming techniques, benefits and challenges. Methods for higher production at lower cost.'
      },
      category: 'organic',
      type: 'article',
      readTime: '15 मिनट',
      views: 25420,
      likes: 1850,
      level: 'beginner',
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 2,
      title: { 
        hi: 'स्मार्ट सिंचाई तकनीक - ड्रिप इरिगेशन सेटअप', 
        en: 'Smart Irrigation Technology - Drip Irrigation Setup' 
      },
      description: { 
        hi: 'पानी की बचत के साथ बेहतर उत्पादन के लिए आधुनिक सिंचाई तकनीकों का उपयोग। DIY गाइड।',
        en: 'Using modern irrigation techniques for better production with water conservation. DIY guide.'
      },
      category: 'modern',
      type: 'video',
      duration: '18 मिनट',
      views: 18750,
      likes: 1420,
      level: 'intermediate',
      image: '/placeholder.svg',
      trending: true
    },
    {
      id: 3,
      title: { 
        hi: 'सफल किसान की कहानी - राम सिंह का जैविक खेती का सफर', 
        en: 'Success Story - Ram Singh\'s Organic Farming Journey' 
      },
      description: { 
        hi: 'पंजाब के राम सिंह ने कैसे रसायनिक खेती छोड़कर जैविक खेती से दोगुनी आय प्राप्त की।',
        en: 'How Ram Singh from Punjab doubled his income by switching from chemical to organic farming.'
      },
      category: 'success',
      type: 'story',
      readTime: '8 मिनट',
      views: 12300,
      likes: 980,
      level: 'all',
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 4,
      title: { 
        hi: 'वर्मी कम्पोस्ट बनाने की विधि - घर पर खाद तैयार करें', 
        en: 'Vermicompost Making Method - Prepare Fertilizer at Home' 
      },
      description: { 
        hi: 'केंचुआ खाद बनाने की आसान विधि। कम लागत में उत्तम गुणवत्ता की जैविक खाद तैयार करें।',
        en: 'Easy method to make earthworm compost. Prepare high-quality organic fertilizer at low cost.'
      },
      category: 'organic',
      type: 'tutorial',
      duration: '12 मिनट',
      views: 31200,
      likes: 2150,
      level: 'beginner',
      image: '/placeholder.svg',
      trending: true
    },
    {
      id: 5,
      title: { 
        hi: 'हाइड्रोपोनिक्स - मिट्टी के बिना खेती की तकनीक', 
        en: 'Hydroponics - Soilless Farming Technique' 
      },
      description: { 
        hi: 'आधुनिक हाइड्रोपोनिक्स तकनीक से कम जगह में अधिक उत्पादन। शहरी खेती के लिए आदर्श।',
        en: 'Higher production in less space with modern hydroponics technology. Ideal for urban farming.'
      },
      category: 'modern',
      type: 'video',
      duration: '25 मिनट',
      views: 22800,
      likes: 1750,
      level: 'advanced',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 6,
      title: { 
        hi: 'फसल चक्र का महत्व - मिट्टी की उर्वरता बनाए रखें', 
        en: 'Importance of Crop Rotation - Maintain Soil Fertility' 
      },
      description: { 
        hi: 'सह�� फसल चक्र से मिट्टी की उर्वरता बनाए रखने और कीड़ों से बचाव के तरीके।',
        en: 'Methods to maintain soil fertility and protect from pests through proper crop rotation.'
      },
      category: 'organic',
      type: 'article',
      readTime: '10 मिनट',
      views: 16750,
      likes: 1200,
      level: 'intermediate',
      image: '/placeholder.svg',
      featured: false
    }
  ];

  const successStories = [
    {
      id: 1,
      farmer: { hi: 'सुनीता देवी', en: 'Sunita Devi' },
      location: { hi: 'हरियाणा', en: 'Haryana' },
      title: { hi: 'महिला किसान की सफलता', en: 'Success of a Woman Farmer' },
      description: { 
        hi: 'सुनीता देवी ने मल्टी-क्रॉपिंग तकनीक अपनाकर 2 एकड़ में 5 लाख रुपए की आय प्राप्त की।',
        en: 'Sunita Devi earned 5 lakh rupees from 2 acres by adopting multi-cropping technique.'
      },
      income: '₹5,00,000',
      area: '2 एकड़',
      technique: { hi: 'मल्टी-क्रॉपिंग', en: 'Multi-cropping' },
      image: '/placeholder.svg'
    },
    {
      id: 2,
      farmer: { hi: 'मोहन पटेल', en: 'Mohan Patel' },
      location: { hi: 'गुजरात', en: 'Gujarat' },
      title: { hi: 'जैविक सब्जी उत्पादन', en: 'Organic Vegetable Production' },
      description: { 
        hi: 'जैविक सब्जी उत्पादन से मोहन पटेल ने अपनी आय तीन गुना बढ़ाई और प्रीमियम मार्केट तक पहुंच बनाई।',
        en: 'Mohan Patel tripled his income through organic vegetable production and reached premium markets.'
      },
      income: '₹8,50,000',
      area: '3 एकड़',
      technique: { hi: 'जैविक सब्जी', en: 'Organic Vegetables' },
      image: '/placeholder.svg'
    },
    {
      id: 3,
      farmer: { hi: 'विकास सिंह', en: 'Vikas Singh' },
      location: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' },
      title: { hi: 'स्मार्ट खेती का इस्तेमाल', en: 'Smart Farming Implementation' },
      description: { 
        hi: 'IoT सेंसर और स्मार्ट सिंचाई से विकास सिं�� ने पानी की 40% बचत और 25% अधिक उत्पादन प्राप्त किया।',
        en: 'Vikas Singh achieved 40% water savings and 25% higher production using IoT sensors and smart irrigation.'
      },
      income: '₹6,20,000',
      area: '4 एकड़',
      technique: { hi: 'स्मार्ट फार्मिंग', en: 'Smart Farming' },
      image: '/placeholder.svg'
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: { hi: 'ड्रिप इरिगेशन सिस्टम सेटअप', en: 'Drip Irrigation System Setup' },
      instructor: { hi: 'डॉ. राजेश कुमार', en: 'Dr. Rajesh Kumar' },
      duration: '22 मिनट',
      views: 45200,
      rating: 4.8,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: { hi: 'जैविक कीट नियंत्रण के तरीके', en: 'Organic Pest Control Methods' },
      instructor: { hi: 'प्रो. अनिता शर्मा', en: 'Prof. Anita Sharma' },
      duration: '18 मिनट',
      views: 38750,
      rating: 4.7,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: { hi: 'मिट्टी की जांच और सुधा��', en: 'Soil Testing and Improvement' },
      instructor: { hi: 'डॉ. विनोद गुप्ता', en: 'Dr. Vinod Gupta' },
      duration: '15 मिनट',
      views: 29400,
      rating: 4.9,
      thumbnail: '/placeholder.svg'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title[language as keyof typeof article.title].toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description[language as keyof typeof article.description].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'tutorial': return BookOpen;
      case 'story': return Award;
      default: return BookOpen;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-farm-700 mb-4">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600 max-w-3xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content[language as keyof typeof content].search}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={selectedCategory === category.key ? "bg-farm-500 hover:bg-farm-600" : ""}
                >
                  {category.label[language as keyof typeof category.label]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Content Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 flex items-center">
            <Star className="mr-3 h-6 w-6 text-yellow-500" />
            {content[language as keyof typeof content].featured}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.filter(article => article.featured).map((article) => {
              const TypeIcon = getTypeIcon(article.type);
              return (
                <Card key={article.id} className="border-farm-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title[language as keyof typeof article.title]}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-yellow-500 text-white">
                        {content[language as keyof typeof content].featured}
                      </Badge>
                      <Badge className={getLevelColor(article.level)}>
                        {article.level}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <TypeIcon className="h-5 w-5 text-farm-600 mr-2" />
                      <span className="text-sm text-farm-600 capitalize">{article.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-farm-700 mb-3 line-clamp-2">
                      {article.title[language as keyof typeof article.title]}
                    </h3>
                    <p className="text-farm-600 mb-4 line-clamp-3">
                      {article.description[language as keyof typeof article.description]}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views.toLocaleString()} {content[language as keyof typeof content].views}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {article.likes} {content[language as keyof typeof content].likes}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime || article.duration}
                      </span>
                    </div>
                    <Button className="w-full bg-farm-500 hover:bg-farm-600 text-white">
                      {article.type === 'video' ? content[language as keyof typeof content].watchVideo : content[language as keyof typeof content].readMore}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 flex items-center">
            <Play className="mr-3 h-6 w-6 text-red-500" />
            {content[language as keyof typeof content].videoTutorials}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="border-farm-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title[language as keyof typeof video.title]}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-farm-700 mb-2">
                    {video.title[language as keyof typeof video.title]}
                  </h3>
                  <p className="text-sm text-farm-600 mb-3">
                    {video.instructor[language as keyof typeof video.instructor]}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{video.views.toLocaleString()} {content[language as keyof typeof content].views}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      {video.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 flex items-center">
            <Award className="mr-3 h-6 w-6 text-gold-500" />
            {content[language as keyof typeof content].successStories}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <Card key={story.id} className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={story.image} 
                      alt={story.farmer[language as keyof typeof story.farmer]}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-green-700 text-lg">
                        {story.farmer[language as keyof typeof story.farmer]}
                      </h3>
                      <p className="text-sm text-green-600">
                        {story.location[language as keyof typeof story.location]}
                      </p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-green-700 mb-3">
                    {story.title[language as keyof typeof story.title]}
                  </h4>
                  <p className="text-green-600 mb-4 text-sm">
                    {story.description[language as keyof typeof story.description]}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-green-600">{content[language as keyof typeof content].level}</p>
                      <p className="font-bold text-green-700">{story.income}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-green-600">Area</p>
                      <p className="font-bold text-green-700">{story.area}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-200 text-green-800">
                      {story.technique[language as keyof typeof story.technique]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 flex items-center">
            <BookOpen className="mr-3 h-6 w-6 text-blue-500" />
            {content[language as keyof typeof content].allTopics}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.filter(article => !article.featured).map((article) => {
              const TypeIcon = getTypeIcon(article.type);
              return (
                <Card key={article.id} className="border-farm-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex">
                      <img 
                        src={article.image} 
                        alt={article.title[language as keyof typeof article.title]}
                        className="w-24 h-24 object-cover rounded-lg mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <TypeIcon className="h-4 w-4 text-farm-600 mr-2" />
                          <Badge className={getLevelColor(article.level)}>
                            {article.level}
                          </Badge>
                          {article.trending && (
                            <Badge className="ml-2 bg-orange-100 text-orange-800">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {content[language as keyof typeof content].trending}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-bold text-farm-700 mb-2 line-clamp-2">
                          {article.title[language as keyof typeof article.title]}
                        </h3>
                        <p className="text-sm text-farm-600 mb-3 line-clamp-2">
                          {article.description[language as keyof typeof article.description]}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {article.views.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {article.likes}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readTime || article.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1 bg-farm-500 hover:bg-farm-600 text-white">
                        {article.type === 'video' ? content[language as keyof typeof content].watchVideo : content[language as keyof typeof content].readMore}
                      </Button>
                      <Button size="sm" variant="outline" className="border-farm-300 text-farm-700">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Expert Contact Section */}
        <div className="mt-12">
          <Alert className="border-green-200 bg-green-50">
            <Users className="h-5 w-5 text-green-600" />
            <AlertDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-green-800 mb-2">
                    🌾 {language === 'hi' ? 'विशेषज्ञों से सलाह चाहिए?' : 'Need expert advice?'}
                  </p>
                  <p className="text-green-700">
                    {language === 'hi' 
                      ? 'हमारे कृषि विशेषज्ञों से निःशुल्क सलाह लें। व्हाट्सऐप या फोन पर तुरंत जवाब।'
                      : 'Get free advice from our agriculture experts. Instant answers on WhatsApp or phone.'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <Button className="bg-green-600 hover:bg-green-700 text-white mb-2">
                    💬 WhatsApp सहायता
                  </Button>
                  <p className="text-xs text-green-600">
                    {language === 'hi' ? '9 AM - 9 PM' : '9 AM - 9 PM'}
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'hi' ? 'कोई लेख नहीं मिला' : 'No articles found'}
            </h3>
            <p className="text-gray-500">
              {language === 'hi' 
                ? 'कृपया अपना खोज शब्द या श्रेणी बदलें'
                : 'Please try changing your search terms or category'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingKnowledge;
