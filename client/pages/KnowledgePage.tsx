import { useState, useEffect } from 'react';
import { 
  BookOpen, Video, Users, Trophy, Search, Filter,
  Play, Clock, Star, Eye, Download, Share2,
  ChevronRight, Tag, Calendar, User, TrendingUp,
  Bookmark, Heart, MessageCircle, Award,
  FileText, Youtube, ExternalLink, RefreshCw
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface Article {
  id: string;
  title: string;
  titleHindi: string;
  excerpt: string;
  excerptHindi: string;
  content: string;
  contentHindi: string;
  author: string;
  authorHindi: string;
  authorTitle: string;
  authorTitleHindi: string;
  publishDate: string;
  readTime: number;
  category: string;
  categoryHindi: string;
  tags: string[];
  tagsHindi: string[];
  imageUrl: string;
  views: number;
  likes: number;
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'article' | 'video' | 'guide' | 'success-story';
}

interface Video {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  duration: string;
  views: number;
  likes: number;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  categoryHindi: string;
  uploadDate: string;
  featured: boolean;
}

const KnowledgePage = () => {
  const { t, currentLanguage } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'articles' | 'videos' | 'guides' | 'success'>('articles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'सभी विषय', nameEn: 'All Topics' },
    { id: 'crop-management', name: 'फसल प्रबंधन', nameEn: 'Crop Management' },
    { id: 'soil-health', name: 'मिट्टी स्वास्थ्य', nameEn: 'Soil Health' },
    { id: 'pest-control', name: 'कीट नियंत्रण', nameEn: 'Pest Control' },
    { id: 'irrigation', name: 'सिंचाई', nameEn: 'Irrigation' },
    { id: 'organic-farming', name: 'जैविक खेती', nameEn: 'Organic Farming' },
    { id: 'technology', name: 'तकनीकी', nameEn: 'Technology' },
    { id: 'marketing', name: 'मार्केटिंग', nameEn: 'Marketing' },
    { id: 'finance', name: 'वित्त', nameEn: 'Finance' }
  ];

  const tabs = [
    { id: 'articles', name: 'लेख', nameEn: 'Articles', icon: FileText },
    { id: 'videos', name: 'वीडियो', nameEn: 'Videos', icon: Video },
    { id: 'guides', name: 'गाइड', nameEn: 'Guides', icon: BookOpen },
    { id: 'success', name: 'सफलता की कहानियां', nameEn: 'Success Stories', icon: Trophy }
  ];

  // Fetch knowledge content
  const fetchKnowledgeContent = async () => {
    try {
      setIsLoading(true);
      setError('');

      // In a real app, these would be separate API calls
      const [articlesResponse, videosResponse] = await Promise.all([
        fetch('/api/knowledge/articles'),
        fetch('/api/knowledge/videos')
      ]);

      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();
        setArticles(articlesData);
      }

      if (videosResponse.ok) {
        const videosData = await videosResponse.json();
        setVideos(videosData);
      }

    } catch (err) {
      console.error('Knowledge content fetch error:', err);
      setError('ज्ञान सामग्री प्राप्त करने में त्रुटि');
      
      // Set fallback content
      setArticles(fallbackArticles);
      setVideos(fallbackVideos);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledgeContent();
  }, []);

  const filteredContent = () => {
    let content: Article[] = [];
    
    switch (activeTab) {
      case 'articles':
        content = articles.filter(a => a.type === 'article');
        break;
      case 'videos':
        return videos.filter(v => 
          selectedCategory === 'all' || v.category === selectedCategory
        );
      case 'guides':
        content = articles.filter(a => a.type === 'guide');
        break;
      case 'success':
        content = articles.filter(a => a.type === 'success-story');
        break;
    }

    if (selectedCategory !== 'all') {
      content = content.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      content = content.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.titleHindi.includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return content;
  };

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: string) => {
    setLiked(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'शुरुआती';
      case 'intermediate': return 'मध्यम';
      case 'advanced': return 'उन्नत';
      default: return 'सामान्य';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-kisan-bg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="kisan-card p-6">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
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
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold text-kisan-text-primary mb-4 ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>
              {currentLanguage === 'en' ? 'Knowledge Center' : 'ज्ञान केंद्र'}
            </h1>
            <p className={`text-lg text-kisan-text-secondary max-w-3xl mx-auto ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>
              {currentLanguage === 'en' 
                ? 'Expert farming knowledge, tutorials, and success stories from experienced farmers'
                : 'विशेषज्ञ खेती ज्ञान, ट्यूटोरियल और अनुभवी किसानों की सफलता की कहानियां'
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="kisan-card p-6 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {articles.filter(a => a.type === 'article').length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">विशेषज्ञ ल���ख</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Video className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {videos.length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">वीडियो ट्यूटोरियल</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {articles.filter(a => a.type === 'guide').length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">व्यावहारिक गाइड</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {articles.filter(a => a.type === 'success-story').length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">सफलता की कहानियां</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="kisan-card p-6 mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-kisan transition-colors font-devanagari ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-kisan-text-secondary hover:bg-primary/10'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{currentLanguage === 'en' ? tab.nameEn : tab.name}</span>
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-kisan-text-muted" />
                <input
                  type="text"
                  placeholder="ज्ञान खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {currentLanguage === 'en' ? cat.nameEn : cat.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between">
                <span className="text-sm text-kisan-text-muted font-devanagari">
                  {Array.isArray(filteredContent()) ? filteredContent().length : 0} परिणाम
                </span>
                <button
                  onClick={fetchKnowledgeContent}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="font-devanagari">रिफ्रेश</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          {activeTab === 'videos' ? (
            /* Videos Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredContent() as Video[]).map((video) => (
                <div key={video.id} className="kisan-card overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.titleHindi}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-colors">
                        <Play className="h-6 w-6 text-kisan-text-primary ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-kisan-text-primary mb-2 line-clamp-2 font-devanagari">
                      {currentLanguage === 'en' ? video.title : video.titleHindi}
                    </h3>
                    
                    <p className="text-sm text-kisan-text-secondary mb-3 line-clamp-2 font-devanagari">
                      {currentLanguage === 'en' ? video.description : video.descriptionHindi}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-kisan-text-muted">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views.toLocaleString('hi-IN')}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{video.likes.toLocaleString('hi-IN')}</span>
                        </span>
                      </div>
                      <span>{new Date(video.uploadDate).toLocaleDateString('hi-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredContent() as Article[]).map((article) => (
                <div key={article.id} className="kisan-card overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={article.imageUrl} 
                    alt={article.titleHindi}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(article.difficulty)}`}>
                        {getDifficultyText(article.difficulty)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleBookmark(article.id)}
                          className={`p-1 rounded hover:bg-gray-100 ${
                            bookmarked.includes(article.id) ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked.includes(article.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => toggleLike(article.id)}
                          className={`p-1 rounded hover:bg-gray-100 ${
                            liked.includes(article.id) ? 'text-red-500' : 'text-gray-400'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${liked.includes(article.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-kisan-text-primary mb-2 line-clamp-2 font-devanagari">
                      {currentLanguage === 'en' ? article.title : article.titleHindi}
                    </h3>
                    
                    <p className="text-sm text-kisan-text-secondary mb-3 line-clamp-3 font-devanagari">
                      {currentLanguage === 'en' ? article.excerpt : article.excerptHindi}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-kisan-text-muted mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span className="font-devanagari">
                          {currentLanguage === 'en' ? article.author : article.authorHindi}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime} मिनट</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-kisan-text-muted">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views.toLocaleString('hi-IN')}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{article.likes.toLocaleString('hi-IN')}</span>
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-primary hover:text-primary/80 text-sm font-devanagari"
                      >
                        पढ़ें
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {Array.isArray(filteredContent()) && filteredContent().length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                कोई सामग्री नहीं मिली
              </h3>
              <p className="text-kisan-text-muted font-devanagari">
                कृपया अलग खोजशब्द या श्रेणी का चयन करें
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-kisan-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.titleHindi}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm px-3 py-1 rounded ${getDifficultyColor(selectedArticle.difficulty)}`}>
                  {getDifficultyText(selectedArticle.difficulty)}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-kisan-text-muted">
                    {new Date(selectedArticle.publishDate).toLocaleDateString('hi-IN')}
                  </span>
                  <span className="text-sm text-kisan-text-muted">•</span>
                  <span className="text-sm text-kisan-text-muted">
                    {selectedArticle.readTime} मिनट पढ़ने का समय
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
                {currentLanguage === 'en' ? selectedArticle.title : selectedArticle.titleHindi}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-kisan-text-muted" />
                  <div>
                    <p className="font-medium text-kisan-text-primary font-devanagari">
                      {currentLanguage === 'en' ? selectedArticle.author : selectedArticle.authorHindi}
                    </p>
                    <p className="text-sm text-kisan-text-muted font-devanagari">
                      {currentLanguage === 'en' ? selectedArticle.authorTitle : selectedArticle.authorTitleHindi}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none font-devanagari text-kisan-text-secondary leading-relaxed">
                {currentLanguage === 'en' ? selectedArticle.content : selectedArticle.contentHindi}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {(currentLanguage === 'en' ? selectedArticle.tags : selectedArticle.tagsHindi).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-kisan-text-secondary px-3 py-1 rounded-full text-sm font-devanagari">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// Fallback content data
const fallbackArticles: Article[] = [
  {
    id: 'organic-farming-basics',
    title: 'Organic Farming: A Beginner\'s Guide',
    titleHindi: 'जैविक खेती: एक शुरुआती गाइड',
    excerpt: 'Learn the fundamentals of organic farming and sustainable agriculture practices.',
    excerptHindi: 'जैविक खेती और टिकाऊ कृषि प्रथाओं की बुनियादी बातें सीखें।',
    content: 'Organic farming is a method of crop and livestock production that involves much more than choosing not to use pesticides, fertilizers, genetically modified organisms, antibiotics and growth hormones...',
    contentHindi: 'जैविक खेती फसल और पशुधन उत्पादन की एक पद्धति है जिसमें क��वल कीटनाशकों, उर्वरकों, आनुवंशिक रूप से संशोधित जीवों, एंटीबायोटिक्स और वृद्धि हार्मोन का उपयोग न करने से कहीं अधिक शामिल है...',
    author: 'Dr. Rajesh Kumar',
    authorHindi: 'डॉ. राजेश कुमार',
    authorTitle: 'Agricultural Expert',
    authorTitleHindi: 'कृषि विशेषज्ञ',
    publishDate: '2024-01-15',
    readTime: 8,
    category: 'organic-farming',
    categoryHindi: 'जैविक खेती',
    tags: ['organic', 'sustainable', 'beginner'],
    tagsHindi: ['जैविक', 'टिकाऊ', 'शुरुआती'],
    imageUrl: '/api/placeholder/400/300',
    views: 1520,
    likes: 89,
    featured: true,
    difficulty: 'beginner',
    type: 'article'
  },
  {
    id: 'success-story-punjab',
    title: 'From Debt to Prosperity: A Punjab Farmer\'s Journey',
    titleHindi: 'कर्ज से समृद्धि तक: एक पंजाबी किसान की यात्रा',
    excerpt: 'How Harpreet Singh transformed his farming practices and achieved financial success.',
    excerptHindi: 'हरप्रीत स���ंह ने कैसे अपनी खेती की प्रथाओं को बदला और वित्तीय सफलता प्राप्त की।',
    content: 'Five years ago, Harpreet Singh was drowning in debt. His traditional farming methods were not yielding enough profit to sustain his family. Today, he is one of the most successful farmers in his district...',
    contentHindi: 'पांच साल पहले, हरप्रीत सिंह कर्ज में डूब रहे थे। उनकी पारंपरिक खेती के तरीके उनके परिवार का भरण-पोषण करने के लिए पर्याप्त लाभ नहीं दे रहे थे। आज, वे अपने जिले के सबसे सफल किसानों में से एक हैं...',
    author: 'Priya Sharma',
    authorHindi: 'प्रिया शर्मा',
    authorTitle: 'Rural Journalist',
    authorTitleHindi: 'ग्रामीण पत्रकार',
    publishDate: '2024-01-12',
    readTime: 12,
    category: 'marketing',
    categoryHindi: 'मार्केटिंग',
    tags: ['success', 'transformation', 'financial'],
    tagsHindi: ['सफलता', 'परिवर्तन', 'वित्तीय'],
    imageUrl: '/api/placeholder/400/300',
    views: 2340,
    likes: 156,
    featured: true,
    difficulty: 'intermediate',
    type: 'success-story'
  }
];

const fallbackVideos: Video[] = [
  {
    id: 'drip-irrigation-setup',
    title: 'Setting Up Drip Irrigation System',
    titleHindi: 'ड्रिप सिंचाई सिस्टम की स्थापना',
    description: 'Step-by-step guide to install an efficient drip irrigation system',
    descriptionHindi: 'एक कुशल ड्रिप सिंचाई सिस्टम स्थापित करने के लिए चरणबद्ध गाइड',
    duration: '15:30',
    views: 5420,
    likes: 320,
    thumbnailUrl: '/api/placeholder/400/300',
    videoUrl: 'https://example.com/video1',
    category: 'irrigation',
    categoryHindi: 'सिंचाई',
    uploadDate: '2024-01-10',
    featured: true
  }
];

export default KnowledgePage;
