import { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
  Filter, 
  Plus,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Star,
  Award,
  MapPin,
  Bookmark,
  Flag,
  Send,
  Image,
  Link,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Community = () => {
  const [language, setLanguage] = useState('hi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const content = {
    hi: {
      title: 'समुदाय फोरम',
      subtitle: 'किसानों का अपना मंच - सवाल पूछें, जवाब दें, और अनुभव साझा करें',
      search: 'फोरम में खोजें',
      filter: 'फिल्टर',
      allCategories: 'सभी श्रेणियां',
      latest: 'नवीनतम',
      popular: 'लोकप्रिय',
      unanswered: 'अनुत्तरित',
      askQuestion: 'सवाल पूछें',
      newPost: 'नई पोस्ट',
      postTitle: 'शीर्षक',
      postContent: 'अपना सवाल या अनुभव लिखें',
      post: 'पोस्ट करें',
      cancel: 'रद्द करें',
      replies: 'जवाब',
      views: 'दृश्य',
      likes: 'पसंद',
      solved: 'हल हो गया',
      helpful: 'उपयोगी',
      reply: 'जवाब दें',
      share: 'साझा करें',
      bookmark: 'बुकमार्क',
      report: 'रिपोर्ट',
      topContributors: 'शीर्ष योगदानकर्ता',
      recentActivity: 'हाल की गतिविधि',
      popularTopics: 'लोकप्रिय विषय',
      writeReply: 'अपना जवाब लिखें...'
    },
    en: {
      title: 'Community Forum',
      subtitle: 'Farmers\' own platform - ask questions, share answers, and exchange experiences',
      search: 'Search Forum',
      filter: 'Filter',
      allCategories: 'All Categories',
      latest: 'Latest',
      popular: 'Popular',
      unanswered: 'Unanswered',
      askQuestion: 'Ask Question',
      newPost: 'New Post',
      postTitle: 'Title',
      postContent: 'Write your question or experience',
      post: 'Post',
      cancel: 'Cancel',
      replies: 'Replies',
      views: 'Views',
      likes: 'Likes',
      solved: 'Solved',
      helpful: 'Helpful',
      reply: 'Reply',
      share: 'Share',
      bookmark: 'Bookmark',
      report: 'Report',
      topContributors: 'Top Contributors',
      recentActivity: 'Recent Activity',
      popularTopics: 'Popular Topics',
      writeReply: 'Write your reply...'
    }
  };

  const categories = [
    { value: 'all', label: { hi: 'सभी श्रेणियां', en: 'All Categories' } },
    { value: 'crop-care', label: { hi: 'फसल देखभाल', en: 'Crop Care' } },
    { value: 'pest-control', label: { hi: 'कीट नियंत्रण', en: 'Pest Control' } },
    { value: 'irrigation', label: { hi: 'सिंचाई', en: 'Irrigation' } },
    { value: 'weather', label: { hi: 'मौसम', en: 'Weather' } },
    { value: 'machinery', label: { hi: 'कृषि यंत्र', en: 'Machinery' } },
    { value: 'market', label: { hi: 'बाजार', en: 'Market' } },
    { value: 'schemes', label: { hi: 'योजनाएं', en: 'Schemes' } },
    { value: 'success-stories', label: { hi: 'सफलता की कहानियां', en: 'Success Stories' } }
  ];

  const sortOptions = [
    { value: 'latest', label: { hi: 'नवीनतम', en: 'Latest' } },
    { value: 'popular', label: { hi: 'लोकप्रिय', en: 'Popular' } },
    { value: 'unanswered', label: { hi: 'अनुत्तरित', en: 'Unanswered' } },
    { value: 'solved', label: { hi: 'हल हो गए', en: 'Solved' } }
  ];

  const forumPosts = [
    {
      id: 1,
      title: { hi: 'गेहूं में पीली पत्ती की समस्या', en: 'Yellow leaf problem in wheat' },
      content: { hi: 'मेरी गेहूं की फसल में पत्तियां पीली हो रही हैं। क्या करना चाहिए?', en: 'My wheat crop leaves are turning yellow. What should I do?' },
      author: { hi: 'राम सिंह', en: 'Ram Singh' },
      location: { hi: 'पंजाब', en: 'Punjab' },
      category: 'crop-care',
      timeAgo: { hi: '2 घंटे पहले', en: '2 hours ago' },
      replies: 8,
      views: 156,
      likes: 12,
      solved: false,
      tags: [
        { hi: 'गेहूं', en: 'wheat' },
        { hi: 'पीली पत्ती', en: 'yellow leaf' },
        { hi: 'रोग', en: 'disease' }
      ],
      urgent: true
    },
    {
      id: 2,
      title: { hi: 'जैविक खाद बनाने की विधि', en: 'Method to make organic fertilizer' },
      content: { hi: 'घर पर जैविक खाद कैसे बनाएं? कौन से कच्चे माल की जरूरत होगी?', en: 'How to make organic fertilizer at home? What raw materials are needed?' },
      author: { hi: 'सुनीत��� देवी', en: 'Sunita Devi' },
      location: { hi: 'हरियाणा', en: 'Haryana' },
      category: 'crop-care',
      timeAgo: { hi: '5 घंटे पहले', en: '5 hours ago' },
      replies: 15,
      views: 289,
      likes: 23,
      solved: true,
      tags: [
        { hi: 'जैविक खाद', en: 'organic fertilizer' },
        { hi: 'कंपोस्ट', en: 'compost' },
        { hi: 'घरेलू', en: 'homemade' }
      ],
      urgent: false
    },
    {
      id: 3,
      title: { hi: 'ड्रिप इरिगेशन का अनुभव', en: 'Experience with drip irrigation' },
      content: { hi: 'मैंने अपने खेत में ड्रिप इरिगेशन लगवाया है। 40% पानी की बचत हुई है। आप भी ट्राई करें।', en: 'I installed drip irrigation in my field. Saved 40% water. You should try it too.' },
      author: { hi: 'विकास पटेल', en: 'Vikas Patel' },
      location: { hi: 'गुजरात', en: 'Gujarat' },
      category: 'irrigation',
      timeAgo: { hi: '1 दिन पहले', en: '1 day ago' },
      replies: 22,
      views: 445,
      likes: 35,
      solved: false,
      tags: [
        { hi: 'ड्रिप इरिगेशन', en: 'drip irrigation' },
        { hi: 'पानी बचत', en: 'water saving' },
        { hi: 'सफलता', en: 'success' }
      ],
      urgent: false,
      featured: true
    },
    {
      id: 4,
      title: { hi: 'टमाटर में बीमारी का इलाज', en: 'Treatment for tomato disease' },
      content: { hi: 'टमाटर के पौधों पर भूरे धब्बे दिख रहे हैं। कौन सा स्प्रे करना चाहिए?', en: 'Brown spots appearing on tomato plants. Which spray should be used?' },
      author: { hi: 'अजय कुमार', en: 'Ajay Kumar' },
      location: { hi: 'बिहार', en: 'Bihar' },
      category: 'pest-control',
      timeAgo: { hi: '3 दिन पहले', en: '3 days ago' },
      replies: 11,
      views: 234,
      likes: 18,
      solved: true,
      tags: [
        { hi: 'टमाटर', en: 'tomato' },
        { hi: 'भूरे धब्बे', en: 'brown spots' },
        { hi: 'बीमारी', en: 'disease' }
      ],
      urgent: false
    }
  ];

  const topContributors = [
    {
      name: { hi: 'डॉ. राजेश शर्मा', en: 'Dr. Rajesh Sharma' },
      title: { hi: 'कृषि विशेषज्ञ', en: 'Agriculture Expert' },
      posts: 156,
      helpfulAnswers: 89,
      reputation: 4.8,
      badge: 'Expert'
    },
    {
      name: { hi: 'प्रीति पटेल', en: 'Preeti Patel' },
      title: { hi: 'जैविक किसान', en: 'Organic Farmer' },
      posts: 87,
      helpfulAnswers: 67,
      reputation: 4.6,
      badge: 'Mentor'
    },
    {
      name: { hi: 'अमित सिंह', en: 'Amit Singh' },
      title: { hi: 'प्रगतिशील किसान', en: 'Progressive Farmer' },
      posts: 124,
      helpfulAnswers: 78,
      reputation: 4.7,
      badge: 'Helper'
    }
  ];

  const recentActivity = [
    { hi: 'डॉ. राजेश ने "गेहूं में पीली पत्ती" का जवाब दिया', en: 'Dr. Rajesh answered "Yellow leaf in wheat"' },
    { hi: 'प्रीति ने नई पोस्ट "बायो-फर्टिलाइजर का उपयोग" लिखी', en: 'Preeti wrote new post "Using bio-fertilizer"' },
    { hi: 'अमित ने "सोयाबीन की किस्में" पर कमेंट किया', en: 'Amit commented on "Soybean varieties"' },
    { hi: '25 नए सदस्य इस सप्ताह जुड़े', en: '25 new members joined this week' }
  ];

  const popularTopics = [
    { topic: { hi: 'जैविक खेती', en: 'Organic Farming' }, posts: 234, icon: '🌱' },
    { topic: { hi: 'कीट नियंत्रण', en: 'Pest Control' }, posts: 189, icon: '🐛' },
    { topic: { hi: 'सिंचाई तकनीक', en: 'Irrigation Techniques' }, posts: 156, icon: '💧' },
    { topic: { hi: 'मिट्टी की सेहत', en: 'Soil Health' }, posts: 123, icon: '🌍' },
    { topic: { hi: 'बाजार की जानकारी', en: 'Market Information' }, posts: 98, icon: '📊' }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.en.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // Add new post logic here
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-farm-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-farm-700 mb-2">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600 max-w-3xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-6 border-farm-200">
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

                  <Button 
                    onClick={() => setShowNewPost(true)}
                    className="bg-farm-600 hover:bg-farm-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {content[language as keyof typeof content].askQuestion}
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <Select value={selectedSort} onValueChange={setSelectedSort}>
                      <SelectTrigger className="w-40 border-farm-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label[language as keyof typeof option.label]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-sm text-farm-600">
                    {filteredPosts.length} posts found
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Post Form */}
            {showNewPost && (
              <Card className="mb-6 border-farm-200 bg-farm-50">
                <CardHeader>
                  <CardTitle className="text-farm-700">
                    {content[language as keyof typeof content].newPost}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder={content[language as keyof typeof content].postTitle}
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="border-farm-300"
                    />
                    <Textarea
                      placeholder={content[language as keyof typeof content].postContent}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={4}
                      className="border-farm-300"
                    />
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={handleNewPost}
                        className="bg-farm-600 hover:bg-farm-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {content[language as keyof typeof content].post}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowNewPost(false)}
                        className="border-farm-300"
                      >
                        {content[language as keyof typeof content].cancel}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-farm-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-farm-500 text-white">
                          {post.author[language as keyof typeof post.author].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {post.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  {language === 'hi' ? 'तत्काल' : 'Urgent'}
                                </Badge>
                              )}
                              {post.featured && (
                                <Badge className="bg-harvest-500 text-xs">
                                  {language === 'hi' ? 'फीचर्ड' : 'Featured'}
                                </Badge>
                              )}
                              {post.solved && (
                                <Badge className="bg-green-500 text-xs">
                                  {content[language as keyof typeof content].solved}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-farm-700 mb-2 hover:text-farm-600 cursor-pointer">
                              {post.title[language as keyof typeof post.title]}
                            </h3>
                            <p className="text-farm-600 mb-3">
                              {post.content[language as keyof typeof post.content]}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-farm-300 text-farm-600">
                                  #{tag[language as keyof typeof tag]}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-4">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-farm-500">
                            <span className="font-medium text-farm-700">
                              {post.author[language as keyof typeof post.author]}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {post.location[language as keyof typeof post.location]}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.timeAgo[language as keyof typeof post.timeAgo]}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-farm-500">
                            <span className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.replies} {content[language as keyof typeof content].replies}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views} {content[language as keyof typeof content].views}
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {post.likes} {content[language as keyof typeof content].likes}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-farm-200">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-50">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {content[language as keyof typeof content].reply}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-farm-600 hover:bg-farm-50">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {content[language as keyof typeof content].helpful}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-farm-600 hover:bg-farm-50">
                              <Share2 className="h-4 w-4 mr-1" />
                              {content[language as keyof typeof content].share}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700 flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  {content[language as keyof typeof content].topContributors}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-farm-500 text-white text-sm">
                          {contributor.name[language as keyof typeof contributor.name].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-farm-700 text-sm">
                            {contributor.name[language as keyof typeof contributor.name]}
                          </h4>
                          <Badge className="text-xs bg-harvest-500">
                            {contributor.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-farm-600">
                          {contributor.title[language as keyof typeof contributor.title]}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-farm-500 mt-1">
                          <span>{contributor.posts} posts</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-harvest-400 fill-current" />
                            {contributor.reputation}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {content[language as keyof typeof content].popularTopics}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-farm-50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{topic.icon}</span>
                        <span className="text-sm font-medium text-farm-700">
                          {topic.topic[language as keyof typeof topic.topic]}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs border-farm-300 text-farm-600">
                        {topic.posts}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {content[language as keyof typeof content].recentActivity}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="text-sm text-farm-600 p-2 bg-farm-50 rounded">
                      {activity[language as keyof typeof activity]}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {language === 'hi' ? 'समुदाय आंकड़े' : 'Community Stats'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-farm-600">{language === 'hi' ? 'कुल सदस्य' : 'Total Members'}:</span>
                    <span className="font-bold text-farm-700">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-farm-600">{language === 'hi' ? 'कुल पोस्ट' : 'Total Posts'}:</span>
                    <span className="font-bold text-farm-700">8,923</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-farm-600">{language === 'hi' ? 'आज के सवाल' : 'Today\'s Questions'}:</span>
                    <span className="font-bold text-farm-700">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-farm-600">{language === 'hi' ? 'हल हुए सवाल' : 'Solved Questions'}:</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
