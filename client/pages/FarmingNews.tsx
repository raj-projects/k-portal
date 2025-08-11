import { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Eye, 
  Share2, 
  Bookmark,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Tag,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const FarmingNews = () => {
  const [language, setLanguage] = useState('hi');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    hi: {
      title: '���ृषि समाचार',
      subtitle: 'नवीनतम कृषि समाचार, विशेषज्ञ लेख और सफलता की कहानियां',
      search: 'समाचार खोजें',
      allCategories: 'सभी श्रेणियां',
      breaking: 'ब्रेकिंग न्यूज़',
      trending: 'ट्रेंडिंग',
      latest: 'नवीनतम',
      popular: 'लोकप्रिय',
      readMore: 'पूरा पढ़ें',
      share: 'साझा करें',
      bookmark: 'बुकमार्क',
      views: 'दृश्य',
      likes: 'पसंद',
      comments: 'टिप्पणियां',
      postedBy: 'द्वारा पोस्ट किया गया',
      readTime: 'पढ़ने का समय',
      minutes: 'मिनट',
      relatedNews: 'संबंधित समाचार',
      expertArticles: 'विशेषज्ञ लेख',
      successStories: 'सफलता की कहानियां'
    },
    en: {
      title: 'Farming News',
      subtitle: 'Latest agriculture news, expert articles and success stories',
      search: 'Search News',
      allCategories: 'All Categories',
      breaking: 'Breaking News',
      trending: 'Trending',
      latest: 'Latest',
      popular: 'Popular',
      readMore: 'Read More',
      share: 'Share',
      bookmark: 'Bookmark',
      views: 'Views',
      likes: 'Likes',
      comments: 'Comments',
      postedBy: 'Posted By',
      readTime: 'Read Time',
      minutes: 'min',
      relatedNews: 'Related News',
      expertArticles: 'Expert Articles',
      successStories: 'Success Stories'
    }
  };

  const categories = [
    { value: 'all', label: { hi: 'सभी श्रेणियां', en: 'All Categories' } },
    { value: 'government', label: { hi: 'सरकारी नीति', en: 'Government Policy' } },
    { value: 'technology', label: { hi: 'कृषि तकनीक', en: 'Agriculture Technology' } },
    { value: 'market', label: { hi: 'बाजार समाचार', en: 'Market News' } },
    { value: 'weather', label: { hi: 'मौसम अपडेट', en: 'Weather Updates' } },
    { value: 'success', label: { hi: 'सफलता की कहानी', en: 'Success Stories' } },
    { value: 'tips', label: { hi: 'कृषि टिप्स', en: 'Farming Tips' } },
    { value: 'research', label: { hi: 'अनुसंधान', en: 'Research' } }
  ];

  const breakingNews = [
    {
      id: 1,
      title: { 
        hi: 'PM-KISAN योजना की नई किस्त 15 दिसंबर को जारी होगी',
        en: 'New installment of PM-KISAN scheme to be released on December 15'
      },
      summary: {
        hi: 'सभी पात्र किसानों के खाते में ₹2000 की राशि डायरेक्ट ट्रांसफर की जाएगी।',
        en: 'Amount of ₹2000 will be directly transferred to accounts of all eligible farmers.'
      },
      category: 'government',
      urgent: true,
      timeAgo: { hi: '2 घंटे पहले', en: '2 hours ago' }
    },
    {
      id: 2,
      title: {
        hi: 'इस सप्ताह उत्तर भारत में बारिश की संभावना, रबी फसल को फायदा',
        en: 'Rain expected in North India this week, benefit for Rabi crops'
      },
      summary: {
        hi: 'मौसम विभाग ने अगले 5 दिनों में बारिश की भविष्यवाणी की है।',
        en: 'Meteorological department predicts rain in next 5 days.'
      },
      category: 'weather',
      urgent: true,
      timeAgo: { hi: '4 घंटे पहले', en: '4 hours ago' }
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: {
        hi: 'ड्रोन तकनीक से किसानों की आय दोगुनी: एक सफलता की कहानी',
        en: 'Drone technology doubles farmers income: A success story'
      },
      summary: {
        hi: 'हरियाणा के किसान राजेश कुमार ने ड्रोन का उपयोग करके अपनी खेती की लागत 40% कम की और उत्पादन 60% बढ़ाया।',
        en: 'Farmer Rajesh Kumar from Haryana reduced farming costs by 40% and increased production by 60% using drones.'
      },
      content: {
        hi: 'हरियाणा के पानीपत जिले के किसान राजेश कुमार की कहानी आज के समय में एक प्रेरणा है। उन्होंने पारंपरिक खेती छोड़कर आधुनिक ड्रोन तकनीक अपनाई और अपनी आर्थिक स्थिति को पूरी तरह से बदल दिया।',
        en: 'The story of farmer Rajesh Kumar from Panipat district of Haryana is an inspiration in today\'s time. He left traditional farming and adopted modern drone technology, completely changing his economic situation.'
      },
      category: 'technology',
      author: { hi: 'कृषि संवाददाता', en: 'Agriculture Reporter' },
      publishedAt: { hi: '1 दिन पहले', en: '1 day ago' },
      readTime: 5,
      views: 1248,
      likes: 89,
      comments: 23,
      featured: true,
      tags: ['technology', 'success-story', 'drone', 'haryana'],
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: {
        hi: 'जैविक खेती से मिली बंपर फसल, रासायनिक उर्वरक की जरूरत नहीं',
        en: 'Bumper crop from organic farming, no need for chemical fertilizers'
      },
      summary: {
        hi: 'महाराष्ट्र के किसान ने 100% जैविक विधि से खेती करके पारंपरिक खेती से 30% अधिक मुनाफा कमाया।',
        en: 'Maharashtra farmer earned 30% more profit than traditional farming by 100% organic method.'
      },
      content: {
        hi: 'महाराष्ट्र के नासिक जिले के किसान संदीप पाटील ने साबित कर दिया है कि जैविक खेती न केवल पर्यावरण के लिए अच्छी है बल्कि आर्थिक रूप से भी फायदेमंद है।',
        en: 'Farmer Sandeep Patil from Nashik district of Maharashtra has proved that organic farming is not only good for environment but also economically beneficial.'
      },
      category: 'success',
      author: { hi: 'विशेष संवाददाता', en: 'Special Correspondent' },
      publishedAt: { hi: '2 दिन पहले', en: '2 days ago' },
      readTime: 4,
      views: 956,
      likes: 67,
      comments: 18,
      featured: false,
      tags: ['organic', 'success-story', 'maharashtra', 'profit'],
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: {
        hi: 'नई किस्म के धान से प्रति एकड़ 25% अधिक उत्पादन',
        en: '25% more production per acre from new variety of rice'
      },
      summary: {
        hi: 'भारतीय कृषि अनुसंधान संस्थान द्वारा विकसित नई धान की किस्म किसानों के लिए वरदान साबित हो रही है।',
        en: 'New rice variety developed by Indian Agricultural Research Institute proving to be a boon for farmers.'
      },
      content: {
        hi: 'भारतीय कृषि अनुसंधान संस्थान (IARI) के वैज्ञानिकों ने एक नई धान की किस्म विकसित की है जो पारंपरिक किस्मों की तुलना में 25% अधिक उत्पादन देती है।',
        en: 'Scientists at Indian Agricultural Research Institute (IARI) have developed a new rice variety that gives 25% more yield compared to traditional varieties.'
      },
      category: 'research',
      author: { hi: 'कृषि विशेषज्ञ', en: 'Agriculture Expert' },
      publishedAt: { hi: '3 दिन पहले', en: '3 days ago' },
      readTime: 6,
      views: 1456,
      likes: 98,
      comments: 31,
      featured: true,
      tags: ['research', 'rice', 'yield', 'iari'],
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: {
        hi: 'सोयाबीन की कीमतों में तेजी, किसानों को बेहतर दाम की उम्मीद',
        en: 'Rise in soybean prices, farmers expect better rates'
      },
      summary: {
        hi: 'अंतर्राष्ट्रीय बाजार में मांग बढ़ने से सोयाबीन की कीमतें पिछले महीने की तुलना में 15% बढ़ी हैं।',
        en: 'Soybean prices have increased by 15% compared to last month due to increased demand in international market.'
      },
      content: {
        hi: 'अंतर्राष्ट्रीय बाजार में सोयाबीन की बढ़ती मांग का फायदा भारतीय किसानों को मिल रहा है। पिछले महीने की तुलना में कीमतों में 15% की वृद्धि हुई है।',
        en: 'Indian farmers are benefiting from the growing demand for soybeans in the international market. Prices have increased by 15% compared to last month.'
      },
      category: 'market',
      author: { hi: 'बाजार विश्लेषक', en: 'Market Analyst' },
      publishedAt: { hi: '1 दिन पहले', en: '1 day ago' },
      readTime: 3,
      views: 789,
      likes: 45,
      comments: 12,
      featured: false,
      tags: ['market', 'soybean', 'prices', 'export'],
      image: '/api/placeholder/400/250'
    }
  ];

  const expertArticles = [
    {
      title: { hi: 'सर्दियों में फसल की देखभाल के उपाय', en: 'Winter crop care measures' },
      author: { hi: 'डॉ. राजेश शर्मा', en: 'Dr. Rajesh Sharma' },
      readTime: 8,
      category: 'tips'
    },
    {
      title: { hi: 'जल संरक्षण की नई तकनीकें', en: 'New water conservation techniques' },
      author: { hi: 'प्रो. सुनीता गुप्ता', en: 'Prof. Sunita Gupta' },
      readTime: 6,
      category: 'technology'
    },
    {
      title: { hi: 'मिट्टी की गुणवत्ता सुधारने के तरीके', en: 'Ways to improve soil quality' },
      author: { hi: 'डॉ. विकास पटेल', en: 'Dr. Vikas Patel' },
      readTime: 7,
      category: 'tips'
    }
  ];

  const trendingTopics = [
    { topic: { hi: 'PM-KISAN योजना', en: 'PM-KISAN Scheme' }, count: 234 },
    { topic: { hi: 'ड्रोन तकनीक', en: 'Drone Technology' }, count: 189 },
    { topic: { hi: 'जैविक खेती', en: 'Organic Farming' }, count: 156 },
    { topic: { hi: 'फसल बीमा', en: 'Crop Insurance' }, count: 123 },
    { topic: { hi: 'सोयाबीन कीमत', en: 'Soybean Prices' }, count: 98 }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      article.title.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.en.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'government': return 'bg-blue-500';
      case 'technology': return 'bg-purple-500';
      case 'market': return 'bg-green-500';
      case 'weather': return 'bg-cyan-500';
      case 'success': return 'bg-orange-500';
      case 'tips': return 'bg-teal-500';
      case 'research': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryText = (category: string) => {
    const categoryMap = {
      hi: {
        government: 'सरकारी नीति',
        technology: 'कृषि तकनीक',
        market: 'बाजार समाचार',
        weather: 'मौसम अपडेट',
        success: 'सफलता की कहानी',
        tips: 'कृषि टिप्स',
        research: 'अनुसंधान'
      },
      en: {
        government: 'Government Policy',
        technology: 'Agriculture Technology',
        market: 'Market News',
        weather: 'Weather Updates',
        success: 'Success Stories',
        tips: 'Farming Tips',
        research: 'Research'
      }
    };
    return categoryMap[language as keyof typeof categoryMap][category as keyof typeof categoryMap.hi] || category;
  };

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

        {/* Breaking News */}
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 mb-8">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              {content[language as keyof typeof content].breaking}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {breakingNews.map((news) => (
                <div key={news.id} className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-red-700 mb-2">
                        {news.title[language as keyof typeof news.title]}
                      </h3>
                      <p className="text-red-600 text-sm mb-2">
                        {news.summary[language as keyof typeof news.summary]}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(news.category) + ' text-white text-xs'}>
                          {getCategoryText(news.category)}
                        </Badge>
                        <span className="text-xs text-red-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {news.timeAgo[language as keyof typeof news.timeAgo]}
                        </span>
                      </div>
                    </div>
                    {news.urgent && (
                      <Badge className="bg-red-600 text-white animate-pulse">
                        {language === 'hi' ? 'अत्यावश्यक' : 'URGENT'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="border-farm-200 mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-farm-500" />
                    <Input
                      placeholder={content[language as keyof typeof content].search}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-farm-300"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-farm-300">
                      <SelectValue placeholder={content[language as keyof typeof content].allCategories} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label[language as keyof typeof category.label]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* News Articles */}
            <div className="space-y-6">
              {filteredNews.map((article) => (
                <Card key={article.id} className="border-farm-200 hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="bg-gradient-to-r from-blue-400 to-farm-400 h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
                        <Newspaper className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(article.category) + ' text-white text-xs'}>
                            {getCategoryText(article.category)}
                          </Badge>
                          {article.featured && (
                            <Badge className="bg-harvest-500 text-white text-xs">
                              {language === 'hi' ? 'फीचर्ड' : 'Featured'}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-farm-700 mb-3 hover:text-farm-600 cursor-pointer">
                        {article.title[language as keyof typeof article.title]}
                      </h2>

                      <p className="text-farm-600 mb-4 line-clamp-2">
                        {article.summary[language as keyof typeof article.summary]}
                      </p>

                      <div className="flex items-center justify-between text-sm text-farm-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {article.author[language as keyof typeof article.author]}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {article.publishedAt[language as keyof typeof article.publishedAt]}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readTime} {content[language as keyof typeof content].minutes}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-farm-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {article.views} {content[language as keyof typeof content].views}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {article.likes} {content[language as keyof typeof content].likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {article.comments} {content[language as keyof typeof content].comments}
                          </span>
                        </div>
                        
                        <Button className="bg-farm-600 hover:bg-farm-700">
                          {content[language as keyof typeof content].readMore}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  {content[language as keyof typeof content].trending}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-farm-50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 bg-farm-500 text-white text-xs rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-farm-700">
                          {topic.topic[language as keyof typeof topic.topic]}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs border-farm-300 text-farm-600">
                        {topic.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expert Articles */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {content[language as keyof typeof content].expertArticles}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expertArticles.map((article, index) => (
                    <div key={index} className="p-3 bg-farm-50 rounded-lg hover:bg-farm-100 cursor-pointer transition-colors">
                      <h4 className="font-medium text-farm-700 text-sm mb-2">
                        {article.title[language as keyof typeof article.title]}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-farm-600">
                        <span>{article.author[language as keyof typeof article.author]}</span>
                        <div className="flex items-center space-x-2">
                          <span>{article.readTime} {content[language as keyof typeof content].minutes}</span>
                          <Badge className={getCategoryColor(article.category) + ' text-white text-xs'}>
                            {getCategoryText(article.category)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {language === 'hi' ? 'न्यूज़लेटर सब्सक्राइब करें' : 'Subscribe to Newsletter'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-farm-600 mb-4">
                  {language === 'hi' 
                    ? 'रोज़ाना नवीनतम कृषि समाचार अपने ईमेल पर पाएं'
                    : 'Get latest agriculture news in your email daily'
                  }
                </p>
                <div className="space-y-3">
                  <Input 
                    placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'} 
                    className="border-farm-300"
                  />
                  <Button className="w-full bg-farm-600 hover:bg-farm-700">
                    {language === 'hi' ? 'सब्सक्राइब करें' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-farm-500 mt-2">
                  {language === 'hi' 
                    ? 'हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी अनसब्सक्राइब करें।'
                    : 'We respect your privacy. Unsubscribe anytime.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingNews;
