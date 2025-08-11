import { useState } from 'react';
import { 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Search, 
  Filter, 
  Grid, 
  List,
  BookOpen,
  Users,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Videos = () => {
  const [language, setLanguage] = useState('hi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const content = {
    hi: {
      title: 'वीडियो लर्निंग हब',
      subtitle: 'कृषि ट्यूटोरियल और सफलता की कहानियां',
      search: 'वीडियो खोजें',
      filter: 'फिल्टर',
      allCategories: 'सभी श्रेणियां',
      featured: 'फीचर्ड वीडियो',
      latest: 'नवीनतम वीडियो',
      popular: 'लोकप्रिय वीडियो',
      categories: 'श्रेणियां',
      duration: 'अवधि',
      views: 'दृश्य',
      likes: 'पसंद',
      watchNow: 'अभी देखें',
      learningPaths: 'लर्निंग पाथ',
      successStories: 'सफलता की कहानियां'
    },
    en: {
      title: 'Video Learning Hub',
      subtitle: 'Agricultural tutorials and success stories',
      search: 'Search Videos',
      filter: 'Filter',
      allCategories: 'All Categories',
      featured: 'Featured Videos',
      latest: 'Latest Videos',
      popular: 'Popular Videos',
      categories: 'Categories',
      duration: 'Duration',
      views: 'Views',
      likes: 'Likes',
      watchNow: 'Watch Now',
      learningPaths: 'Learning Paths',
      successStories: 'Success Stories'
    }
  };

  const categories = [
    { value: 'all', label: { hi: 'सभी श्र���णियां', en: 'All Categories' } },
    { value: 'organic', label: { hi: 'जैविक खेती', en: 'Organic Farming' } },
    { value: 'irrigation', label: { hi: 'सिंचाई विधि', en: 'Irrigation Methods' } },
    { value: 'pest-control', label: { hi: 'कीट नियंत्रण', en: 'Pest Control' } },
    { value: 'crop-care', label: { hi: 'फसल देखभाल', en: 'Crop Care' } },
    { value: 'machinery', label: { hi: 'कृषि यंत्र', en: 'Farm Machinery' } },
    { value: 'success-stories', label: { hi: 'सफलता की कहानियां', en: 'Success Stories' } }
  ];

  const featuredVideos = [
    {
      id: 1,
      title: { hi: 'जैविक खेती: एक संपूर्ण गाइड', en: 'Organic Farming: Complete Guide' },
      description: { hi: 'जैविक खेती की संपूर्ण जानकारी', en: 'Complete guide to organic farming' },
      category: 'organic',
      duration: '25:30',
      views: '125K',
      likes: '4.2K',
      thumbnail: '/api/placeholder/400/225',
      instructor: { hi: 'डॉ. राजेश शर्मा', en: 'Dr. Rajesh Sharma' },
      rating: 4.8
    },
    {
      id: 2,
      title: { hi: 'ड्रिप इरिगेशन सिस्टम', en: 'Drip Irrigation System Setup' },
      description: { hi: 'पानी की बचत के लिए ड्रिप सिस्टम', en: 'Water-saving drip irrigation system' },
      category: 'irrigation',
      duration: '18:45',
      views: '89K',
      likes: '3.1K',
      thumbnail: '/api/placeholder/400/225',
      instructor: { hi: 'इंजी. सुमित्रा पटेल', en: 'Eng. Sumitra Patel' },
      rating: 4.6
    },
    {
      id: 3,
      title: { hi: 'प्राकृतिक कीट नियंत्रण', en: 'Natural Pest Control Methods' },
      description: { hi: 'रासायनिक मुक्त कीट नियंत्रण', en: 'Chemical-free pest control solutions' },
      category: 'pest-control',
      duration: '22:15',
      views: '156K',
      likes: '5.7K',
      thumbnail: '/api/placeholder/400/225',
      instructor: { hi: 'प्रो. अनिता गुप्ता', en: 'Prof. Anita Gupta' },
      rating: 4.9
    }
  ];

  const latestVideos = [
    {
      id: 4,
      title: { hi: 'स्मार्ट फार्मिंग तकनीक', en: 'Smart Farming Techniques' },
      description: { hi: 'आधुनिक तकनीक का उपयोग', en: 'Modern technology in farming' },
      category: 'machinery',
      duration: '31:20',
      views: '67K',
      likes: '2.8K',
      thumbnail: '/api/placeholder/400/225',
      uploadDate: '2 दिन पहले / 2 days ago'
    },
    {
      id: 5,
      title: { hi: 'मिट्टी की जांच और सुधार', en: 'Soil Testing and Improvement' },
      description: { hi: 'मिट्टी की गुणवत्ता बढ़ाने के तरीके', en: 'Ways to improve soil quality' },
      category: 'crop-care',
      duration: '19:55',
      views: '43K',
      likes: '1.9K',
      thumbnail: '/api/placeholder/400/225',
      uploadDate: '5 दिन पहले / 5 days ago'
    },
    {
      id: 6,
      title: { hi: 'सफल किसान की कहानी - राम सिंह', en: 'Success Story - Ram Singh' },
      description: { hi: 'गेहूं की उत्पादकता दोगुनी करने की कहानी', en: 'Story of doubling wheat productivity' },
      category: 'success-stories',
      duration: '15:40',
      views: '92K',
      likes: '6.2K',
      thumbnail: '/api/placeholder/400/225',
      uploadDate: '1 सप्ताह पहले / 1 week ago'
    }
  ];

  const learningPaths = [
    {
      title: { hi: 'नए किसान के लिए बेसिक कोर्स', en: 'Beginner Farmer Course' },
      description: { hi: '10 वीडियो में संपूर्ण कृषि की जानकारी', en: 'Complete farming knowledge in 10 videos' },
      videos: 10,
      duration: '4 घंटे / 4 hours',
      level: { hi: 'शुरुआती', en: 'Beginner' },
      icon: BookOpen
    },
    {
      title: { hi: 'जैविक खेती मास्टरक्लास', en: 'Organic Farming Masterclass' },
      description: { hi: 'जैविक खेती की उन्नत तकनीकें', en: 'Advanced organic farming techniques' },
      videos: 15,
      duration: '6 घंटे / 6 hours',
      level: { hi: 'मध्यम', en: 'Intermediate' },
      icon: Award
    },
    {
      title: { hi: 'स्मार्ट फार्मिंग प्रो', en: 'Smart Farming Pro' },
      description: { hi: 'आधुनिक तकनीक और डिजिटल खेती', en: 'Modern tech and digital farming' },
      videos: 12,
      duration: '5 घंटे / 5 hours',
      level: { hi: 'उन्नत', en: 'Advanced' },
      icon: TrendingUp
    }
  ];

  const categoryStats = [
    { category: { hi: 'जैविक खेती', en: 'Organic Farming' }, videos: 45, icon: '🌱' },
    { category: { hi: 'सिंचाई विधि', en: 'Irrigation' }, videos: 32, icon: '💧' },
    { category: { hi: 'कीट नियंत्रण', en: 'Pest Control' }, videos: 28, icon: '🐛' },
    { category: { hi: 'फसल देखभाल', en: 'Crop Care' }, videos: 38, icon: '🌾' },
    { category: { hi: 'कृषि यंत्र', en: 'Machinery' }, videos: 22, icon: '🚜' },
    { category: { hi: 'सफलता की कहानियां', en: 'Success Stories' }, videos: 15, icon: '🏆' }
  ];

  const filteredVideos = [...featuredVideos, ...latestVideos].filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      video.title.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.title.en.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-farm-50 py-8">
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

        {/* Search and Filters */}
        <Card className="mb-8 border-farm-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Videos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6">
            {content[language as keyof typeof content].featured}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Card key={video.id} className="border-farm-200 hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="bg-gradient-to-r from-purple-400 to-farm-400 h-48 rounded-t-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                    Featured
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-farm-700 mb-2 line-clamp-2">
                    {video.title[language as keyof typeof video.title]}
                  </h3>
                  <p className="text-sm text-farm-600 mb-3">
                    {video.description[language as keyof typeof video.description]}
                  </p>
                  <div className="flex items-center justify-between text-xs text-farm-500 mb-3">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {video.views}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {video.likes}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-harvest-400 fill-current" />
                      {video.rating}
                    </div>
                  </div>
                  <p className="text-xs text-farm-600 mb-3">
                    {video.instructor[language as keyof typeof video.instructor]}
                  </p>
                  <Button className="w-full bg-farm-600 hover:bg-farm-700">
                    <Play className="h-4 w-4 mr-2" />
                    {content[language as keyof typeof content].watchNow}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6">
            {content[language as keyof typeof content].learningPaths}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="border-harvest-300 bg-gradient-to-br from-harvest-50 to-farm-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-harvest-500 p-3 rounded-lg mr-4">
                      <path.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-farm-700">
                        {path.title[language as keyof typeof path.title]}
                      </h3>
                      <span className="text-sm bg-farm-200 text-farm-700 px-2 py-1 rounded">
                        {path.level[language as keyof typeof path.level]}
                      </span>
                    </div>
                  </div>
                  <p className="text-farm-600 mb-4">
                    {path.description[language as keyof typeof path.description]}
                  </p>
                  <div className="flex justify-between text-sm text-farm-600 mb-4">
                    <span>{path.videos} videos</span>
                    <span>{path.duration}</span>
                  </div>
                  <Button variant="outline" className="w-full border-farm-300 text-farm-700 hover:bg-farm-50">
                    {language === 'hi' ? '��ोर्स शुरू करें' : 'Start Course'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6">
            {content[language as keyof typeof content].categories}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryStats.map((stat, index) => (
              <Card key={index} className="border-farm-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCategory(categories[index + 1]?.value || 'all')}>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <h4 className="font-semibold text-farm-700 text-sm mb-1">
                    {stat.category[language as keyof typeof stat.category]}
                  </h4>
                  <p className="text-xs text-farm-600">{stat.videos} videos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Videos */}
        <section>
          <h2 className="text-2xl font-bold text-farm-700 mb-6">
            {content[language as keyof typeof content].latest}
          </h2>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredVideos.map((video) => (
              <Card key={video.id} className="border-farm-200 hover:shadow-lg transition-shadow group">
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-400 to-farm-400 h-40 rounded-t-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-farm-700 mb-2">
                        {video.title[language as keyof typeof video.title]}
                      </h3>
                      <p className="text-sm text-farm-600 mb-3">
                        {video.description[language as keyof typeof video.description]}
                      </p>
                      <div className="flex items-center justify-between text-xs text-farm-500 mb-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {video.views}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {video.likes}
                        </span>
                      </div>
                      <Button size="sm" className="w-full bg-farm-600 hover:bg-farm-700">
                        <Play className="h-4 w-4 mr-2" />
                        {content[language as keyof typeof content].watchNow}
                      </Button>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-400 to-farm-400 w-32 h-20 rounded flex items-center justify-center flex-shrink-0">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-farm-700 mb-1">
                        {video.title[language as keyof typeof video.title]}
                      </h3>
                      <p className="text-sm text-farm-600 mb-2">
                        {video.description[language as keyof typeof video.description]}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-farm-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {video.views}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {video.likes}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-farm-600 hover:bg-farm-700">
                      <Play className="h-4 w-4" />
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Videos;
