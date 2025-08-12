import { useState, useEffect } from 'react';
import { 
  Newspaper, Calendar, Clock, ExternalLink, Search, 
  Filter, RefreshCw, Share2, Bookmark, TrendingUp,
  MapPin, Eye, ThumbsUp, Tag, ArrowRight, AlertCircle
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface NewsArticle {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  content: string;
  contentHindi: string;
  author: string;
  authorHindi: string;
  source: string;
  sourceHindi: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  category: string;
  categoryHindi: string;
  tags: string[];
  tagsHindi: string[];
  views: number;
  likes: number;
  location: string;
  locationHindi: string;
  featured: boolean;
  trending: boolean;
}

const NewsPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [lastRefresh, setLastRefresh] = useState<number>(0);

  const categories = [
    { id: 'all', name: 'सभी समाचार', nameEn: 'All News' },
    { id: 'agriculture', name: 'कृषि', nameEn: 'Agriculture' },
    { id: 'weather', name: 'मौसम', nameEn: 'Weather' },
    { id: 'market', name: 'बाजार', nameEn: 'Market' },
    { id: 'government', name: 'सरकारी योजनाएं', nameEn: 'Government Schemes' },
    { id: 'technology', name: 'कृषि तकनीक', nameEn: 'AgriTech' },
    { id: 'organic', name: 'जैविक खेती', nameEn: 'Organic Farming' },
    { id: 'exports', name: 'निर्यात', nameEn: 'Exports' },
    { id: 'research', name: 'अनुसंधान', nameEn: 'Research' }
  ];

  // Fetch agriculture news
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/agriculture-news');
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch news';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setNews(data);
      setFilteredNews(data);
      setLastRefresh(Date.now());
    } catch (err) {
      console.error('News fetch error:', err);
      setError(err instanceof Error ? err.message : 'समाचार प्राप्त करने में त्रुटि');
      
      // Set fallback news data
      setNews(fallbackNews);
      setFilteredNews(fallbackNews);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 15 * 60 * 1000); // 15 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Filter news based on search and category
  useEffect(() => {
    let filtered = news;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.titleHindi.includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.descriptionHindi.includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, selectedCategory]);

  const handleRefresh = () => {
    fetchNews();
  };

  const toggleBookmark = (newsId: string) => {
    setBookmarked(prev => 
      prev.includes(newsId) 
        ? prev.filter(id => id !== newsId)
        : [...prev, newsId]
    );
  };

  const shareNews = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.titleHindi,
        text: article.descriptionHindi,
        url: article.url
      });
    } else {
      navigator.clipboard.writeText(article.url);
      alert('समाचार लिंक कॉपी हो गया है!');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'अभी अभी';
    if (diffInHours < 24) return `${diffInHours} घंटे पहले`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} दिन पहले`;
    return date.toLocaleDateString('hi-IN');
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
                  <div key={i} className="kisan-card overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
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
              {currentLanguage === 'en' ? 'Agriculture News' : 'कृषि समाचार'}
            </h1>
            <p className={`text-lg text-kisan-text-secondary max-w-3xl mx-auto ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>
              {currentLanguage === 'en' 
                ? 'Latest news and updates from the world of agriculture and farming'
                : 'कृषि और खेती की दुनिया से नवीनतम समाचार और अपडेट'
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="kisan-card p-6 text-center">
              <Newspaper className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">{news.length}</p>
              <p className="text-sm text-kisan-text-muted font-devanagari">कुल समाचार</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {news.filter(n => n.trending).length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">ट्रेंडिंग</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {news.reduce((sum, n) => sum + n.views, 0).toLocaleString('hi-IN')}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">कुल व्यू</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Bookmark className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {bookmarked.length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">सेव किए गए</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="kisan-card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold text-kisan-text-primary ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                समाचार खोजें
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="font-devanagari">रिफ्रेश</span>
                </button>
                {lastRefresh > 0 && (
                  <span className="text-xs text-kisan-text-muted">
                    अपडेट: {new Date(lastRefresh).toLocaleTimeString('hi-IN')}
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-kisan-text-muted" />
                <input
                  type="text"
                  placeholder="समाचार खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Category Filter */}
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

              {/* Results count */}
              <div className="flex items-center justify-center">
                <span className="text-sm text-kisan-text-muted font-devanagari">
                  {filteredNews.length} समाचार मिले
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-kisan">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700 font-devanagari">{error}</span>
              </div>
            </div>
          )}

          {/* Featured News */}
          {filteredNews.some(news => news.featured) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-kisan-text-primary mb-6 font-devanagari">
                मुख्य समाचार
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredNews.filter(news => news.featured).slice(0, 2).map((article) => (
                  <div key={article.id} className="kisan-card overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={article.urlToImage} 
                        alt={article.titleHindi}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-devanagari">
                          मुख्य समाचार
                        </span>
                      </div>
                      {article.trending && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-devanagari flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>ट्रेंडिंग</span>
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`text-xs px-2 py-1 rounded ${ 
                          categories.find(c => c.id === article.category)?.id === 'agriculture' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                        <span className="text-xs text-kisan-text-muted">
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-kisan-text-primary mb-3 line-clamp-2 font-devanagari">
                        {currentLanguage === 'en' ? article.title : article.titleHindi}
                      </h3>
                      
                      <p className="text-kisan-text-secondary mb-4 line-clamp-3 font-devanagari">
                        {currentLanguage === 'en' ? article.description : article.descriptionHindi}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-kisan-text-muted">
                          <span className="font-devanagari">{article.sourceHindi}</span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views.toLocaleString('hi-IN')}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleBookmark(article.id)}
                            className={`p-2 rounded hover:bg-gray-100 ${
                              bookmarked.includes(article.id) ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${bookmarked.includes(article.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => shareNews(article)}
                            className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setSelectedNews(article)}
                            className="flex items-center space-x-1 bg-primary text-white px-3 py-2 rounded-kisan hover:bg-primary/90 transition-colors"
                          >
                            <span className="font-devanagari">पढ़ें</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All News Grid */}
          <div>
            <h2 className="text-2xl font-bold text-kisan-text-primary mb-6 font-devanagari">
              सभी समाचार
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.filter(news => !news.featured).map((article) => (
                <div key={article.id} className="kisan-card overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={article.urlToImage} 
                      alt={article.titleHindi}
                      className="w-full h-48 object-cover"
                    />
                    {article.trending && (
                      <div className="absolute top-2 right-2">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${ 
                        categories.find(c => c.id === article.category)?.id === 'agriculture' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-xs text-kisan-text-muted">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>

                    <h3 className="font-semibold text-kisan-text-primary mb-2 line-clamp-2 font-devanagari">
                      {currentLanguage === 'en' ? article.title : article.titleHindi}
                    </h3>
                    
                    <p className="text-sm text-kisan-text-secondary mb-3 line-clamp-3 font-devanagari">
                      {currentLanguage === 'en' ? article.description : article.descriptionHindi}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-kisan-text-muted">
                        <span className="font-devanagari">{article.sourceHindi}</span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views.toLocaleString('hi-IN')}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleBookmark(article.id)}
                          className={`p-1 rounded hover:bg-gray-100 ${
                            bookmarked.includes(article.id) ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                        >
                          <Bookmark className={`h-3 w-3 ${bookmarked.includes(article.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => shareNews(article)}
                          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                        >
                          <Share2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setSelectedNews(article)}
                          className="text-primary hover:text-primary/80 text-sm font-devanagari"
                        >
                          पढ़ें
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredNews.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                कोई समाचार नहीं मिला
              </h3>
              <p className="text-kisan-text-muted font-devanagari">
                कृपया अलग खोजशब्द या श्रेणी का उपयोग करें
              </p>
            </div>
          )}
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-kisan-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedNews.urlToImage} 
                alt={selectedNews.titleHindi}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm px-3 py-1 rounded ${ 
                    categories.find(c => c.id === selectedNews.category)?.id === 'agriculture' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {categories.find(c => c.id === selectedNews.category)?.name}
                  </span>
                  {selectedNews.trending && (
                    <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded font-devanagari">
                      ट्रेंडिंग
                    </span>
                  )}
                </div>
                <span className="text-sm text-kisan-text-muted">
                  {formatTimeAgo(selectedNews.publishedAt)}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
                {currentLanguage === 'en' ? selectedNews.title : selectedNews.titleHindi}
              </h1>

              <div className="flex items-center space-x-4 mb-6 text-sm text-kisan-text-muted">
                <span className="font-devanagari">
                  {currentLanguage === 'en' ? selectedNews.source : selectedNews.sourceHindi}
                </span>
                <span>•</span>
                <span className="font-devanagari">
                  {currentLanguage === 'en' ? selectedNews.author : selectedNews.authorHindi}
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{selectedNews.views.toLocaleString('hi-IN')} व्यू</span>
                </span>
              </div>

              <div className="prose max-w-none font-devanagari text-kisan-text-secondary leading-relaxed mb-6">
                {currentLanguage === 'en' ? selectedNews.content : selectedNews.contentHindi}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {(currentLanguage === 'en' ? selectedNews.tags : selectedNews.tagsHindi).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-kisan-text-secondary px-3 py-1 rounded-full text-sm font-devanagari flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>#{tag}</span>
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => shareNews(selectedNews)}
                    className="flex items-center space-x-2 bg-gray-100 text-kisan-text-primary px-4 py-2 rounded-kisan hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="font-devanagari">शेयर करें</span>
                  </button>
                  <a
                    href={selectedNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-devanagari">पूरा लेख पढ़ें</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// Fallback news data
const fallbackNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Government Announces New Crop Insurance Scheme for Farmers',
    titleHindi: 'सरकार ने किसानों के लिए नई फसल बीमा योजना की घोषणा की',
    description: 'The new scheme aims to provide comprehensive coverage for crop losses due to natural calamities with reduced premium rates.',
    descriptionHindi: 'नई योजना का उद्देश्य कम प्रीमियम दरों के साथ प्राकृतिक आपदाओं के कारण फसल नुकसान के ���िए व्यापक कवरेज प्रदान करना है।',
    content: 'In a major announcement today, the Ministry of Agriculture unveiled a new comprehensive crop insurance scheme...',
    contentHindi: 'आज एक महत्वपूर्ण घोषणा में, कृषि मंत्रालय ने एक नई व्यापक फसल बीमा योजना का अनावरण किया...',
    author: 'Agricultural Correspondent',
    authorHindi: 'कृषि संवाददाता',
    source: 'AgriNews India',
    sourceHindi: 'एग्रीन्यूज इंडिया',
    publishedAt: '2024-01-15T08:00:00Z',
    urlToImage: '/api/placeholder/400/300',
    url: 'https://example.com/news/1',
    category: 'government',
    categoryHindi: 'सरकारी योजनाएं',
    tags: ['insurance', 'government', 'policy'],
    tagsHindi: ['बीमा', 'सरकार', 'नीति'],
    views: 15420,
    likes: 89,
    location: 'New Delhi',
    locationHindi: 'नई दिल्ली',
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'Record Wheat Production Expected This Season',
    titleHindi: 'इस सीजन रिकॉर्ड गेहूं उत्पादन की उम्मीद',
    description: 'Favorable weather conditions and improved farming techniques are expected to lead to record wheat production.',
    descriptionHindi: 'अनुकूल मौसम और बेहतर खेती तकनीकों से रिकॉर्ड गेहूं उत्पादन की उम्मीद है।',
    content: 'Agricultural experts predict that this year could see record-breaking wheat production across the country...',
    contentHindi: 'कृषि विशेषज्ञों का अनुमान है कि इस साल देश भर में रिकॉर्ड तोड़ गेहूं उत्पादन हो सकता है...',
    author: 'Farming Reporter',
    authorHindi: 'कृषि रिपोर्टर',
    source: 'Kisan Today',
    sourceHindi: 'किसान टुडे',
    publishedAt: '2024-01-14T12:30:00Z',
    urlToImage: '/api/placeholder/400/300',
    url: 'https://example.com/news/2',
    category: 'agriculture',
    categoryHindi: 'कृषि',
    tags: ['wheat', 'production', 'harvest'],
    tagsHindi: ['गेहूं', 'उत्पादन', 'फसल'],
    views: 8930,
    likes: 67,
    location: 'Punjab',
    locationHindi: 'पंजाब',
    featured: false,
    trending: false
  },
  {
    id: '3',
    title: 'New AgriTech Startup Develops Drone Technology for Crop Monitoring',
    titleHindi: 'नई एग्रीटेक स्टार्टअप ने फसल निगरानी के लिए ड्रोन तकनीक विकसित की',
    description: 'Revolutionary drone technology promises to help farmers monitor crop health and optimize yields through AI-powered analysis.',
    descriptionHindi: 'क्रांतिकारी ड्रोन तकनीक किसानों को AI-संचालित विश्लेषण के माध्यम से फसल स्वास्थ्य की निगरानी और उत्पादन अनुकूलित करने में मदद करने का वादा करती है।',
    content: 'A Bangalore-based startup has developed cutting-edge drone technology that uses artificial intelligence...',
    contentHindi: 'बेंगलुरु स्थित एक स्टार्टअप ने अत्याधुनिक ड्रोन तकनीक विकसित की है जो कृत्रिम बुद्धिमत्ता का उपयोग करती है...',
    author: 'Tech Reporter',
    authorHindi: 'तकनीकी रिपोर्टर',
    source: 'Innovation Times',
    sourceHindi: 'इनोवेशन टाइम्स',
    publishedAt: '2024-01-13T15:45:00Z',
    urlToImage: '/api/placeholder/400/300',
    url: 'https://example.com/news/3',
    category: 'technology',
    categoryHindi: 'कृषि तकनीक',
    tags: ['drone', 'AI', 'technology', 'monitoring'],
    tagsHindi: ['ड्रोन', 'एआई', 'तकनीक', 'निगरानी'],
    views: 12450,
    likes: 156,
    location: 'Bangalore',
    locationHindi: 'बेंगलुरु',
    featured: true,
    trending: true
  }
];

export default NewsPage;
