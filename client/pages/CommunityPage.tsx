import { useState, useEffect } from 'react';
import { 
  Users, MessageCircle, ThumbsUp, ThumbsDown, Share2,
  Search, Filter, Plus, Reply, Flag, Award,
  Clock, Eye, Star, Bookmark, Send, Image,
  ChevronUp, ChevronDown, MoreHorizontal, MapPin,
  Calendar, Trophy, CheckCircle, AlertCircle
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface ForumPost {
  id: string;
  title: string;
  titleHindi: string;
  content: string;
  contentHindi: string;
  author: {
    name: string;
    nameHindi: string;
    avatar: string;
    reputation: number;
    location: string;
    locationHindi: string;
    verified: boolean;
    joinDate: string;
    totalPosts: number;
    badges: string[];
  };
  category: string;
  categoryHindi: string;
  tags: string[];
  tagsHindi: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  dislikes: number;
  replies: number;
  featured: boolean;
  solved: boolean;
  urgent: boolean;
  images?: string[];
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  contentHindi: string;
  author: {
    name: string;
    nameHindi: string;
    avatar: string;
    reputation: number;
    verified: boolean;
  };
  createdAt: string;
  likes: number;
  dislikes: number;
  isSolution: boolean;
}

const CommunityPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'questions' | 'discussions' | 'success' | 'my-posts'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'unanswered'>('latest');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: '',
    images: [] as string[]
  });
  const [newReply, setNewReply] = useState('');

  const categories = [
    { id: 'all', name: 'सभी श्रेणियां', nameEn: 'All Categories' },
    { id: 'general', name: 'सामान्य', nameEn: 'General' },
    { id: 'crop-problems', name: 'फसल समस्याएं', nameEn: 'Crop Problems' },
    { id: 'pest-disease', name: 'कीट और रोग', nameEn: 'Pest & Disease' },
    { id: 'irrigation', name: 'सिंचाई', nameEn: 'Irrigation' },
    { id: 'soil-health', name: 'मिट्टी स्वास्थ्य', nameEn: 'Soil Health' },
    { id: 'equipment', name: 'उपकरण', nameEn: 'Equipment' },
    { id: 'marketing', name: 'मार्केटिंग', nameEn: 'Marketing' },
    { id: 'success-stories', name: 'सफलता की कहानियां', nameEn: 'Success Stories' },
    { id: 'government-schemes', name: 'सरकारी योजनाएं', nameEn: 'Government Schemes' }
  ];

  const tabs = [
    { id: 'all', name: 'सभी पोस्ट', nameEn: 'All Posts' },
    { id: 'questions', name: 'प्रश्न', nameEn: 'Questions' },
    { id: 'discussions', name: 'चर्चा', nameEn: 'Discussions' },
    { id: 'success', name: 'सफलता', nameEn: 'Success Stories' },
    { id: 'my-posts', name: 'मेरी पोस्ट', nameEn: 'My Posts' }
  ];

  // Fetch community posts
  const fetchCommunityData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const [postsResponse, repliesResponse] = await Promise.all([
        fetch('/api/community/posts'),
        fetch('/api/community/replies')
      ]);

      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData);
      }

      if (repliesResponse.ok) {
        const repliesData = await repliesResponse.json();
        setReplies(repliesData);
      }

    } catch (err) {
      console.error('Community data fetch error:', err);
      setError('समुदाय डेटा प्राप्त करने में त्रुटि');
      
      // Set fallback data
      setPosts(fallbackPosts);
      setReplies(fallbackReplies);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const filteredPosts = () => {
    let filtered = posts;

    // Filter by tab
    switch (activeTab) {
      case 'questions':
        filtered = filtered.filter(post => post.category === 'crop-problems' || post.category === 'pest-disease');
        break;
      case 'discussions':
        filtered = filtered.filter(post => post.category === 'general' || post.category === 'equipment');
        break;
      case 'success':
        filtered = filtered.filter(post => post.category === 'success-stories');
        break;
      case 'my-posts':
        // In a real app, filter by current user
        filtered = filtered.slice(0, 2);
        break;
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.titleHindi.includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.contentHindi.includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort posts
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.likes + b.views) - (a.likes + a.views));
        break;
      case 'unanswered':
        filtered.sort((a, b) => a.replies - b.replies);
        break;
      default: // latest
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  };

  const getPostReplies = (postId: string) => {
    return replies.filter(reply => reply.postId === postId)
                 .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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

  const getReputationBadge = (reputation: number) => {
    if (reputation >= 1000) return { text: 'विशेषज्ञ', color: 'bg-purple-100 text-purple-800' };
    if (reputation >= 500) return { text: 'अनुभवी', color: 'bg-blue-100 text-blue-800' };
    if (reputation >= 100) return { text: 'सक्��िय', color: 'bg-green-100 text-green-800' };
    return { text: 'नए सदस्य', color: 'bg-gray-100 text-gray-800' };
  };

  const handleCreatePost = () => {
    // In a real app, this would send data to the server
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      titleHindi: newPost.title,
      content: newPost.content,
      contentHindi: newPost.content,
      author: {
        name: 'Current User',
        nameHindi: 'वर्तमान उपयोगकर्ता',
        avatar: '/api/placeholder/40/40',
        reputation: 150,
        location: 'Delhi',
        locationHindi: 'दिल्ली',
        verified: false,
        joinDate: '2024-01-01',
        totalPosts: 5,
        badges: ['नए सदस्य']
      },
      category: newPost.category,
      categoryHindi: categories.find(c => c.id === newPost.category)?.name || '',
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      tagsHindi: newPost.tags.split(',').map(tag => tag.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      dislikes: 0,
      replies: 0,
      featured: false,
      solved: false,
      urgent: false,
      images: newPost.images
    };

    setPosts([post, ...posts]);
    setShowCreatePost(false);
    setNewPost({ title: '', content: '', category: 'general', tags: '', images: [] });
  };

  const handleReply = (postId: string) => {
    if (!newReply.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      postId: postId,
      content: newReply,
      contentHindi: newReply,
      author: {
        name: 'Current User',
        nameHindi: 'वर्तमान उपयोगकर्ता',
        avatar: '/api/placeholder/40/40',
        reputation: 150,
        verified: false
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      isSolution: false
    };

    setReplies([...replies, reply]);
    setNewReply('');
    
    // Update post reply count
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, replies: post.replies + 1 }
        : post
    ));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-kisan-bg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="kisan-card p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-4xl font-bold text-kisan-text-primary mb-4 ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                {currentLanguage === 'en' ? 'Community Forum' : 'किसान समुदाय'}
              </h1>
              <p className={`text-lg text-kisan-text-secondary ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                {currentLanguage === 'en' 
                  ? 'Connect with fellow farmers, ask questions, and share experiences'
                  : 'साथी किसानों से जुड़ें, प्रश्न पूछें और अनुभव साझा करें'
                }
              </p>
            </div>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-kisan hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="font-devanagari">नई पोस्ट</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="kisan-card p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">12,500</p>
              <p className="text-sm text-kisan-text-muted font-devanagari">सक्रिय सदस्य</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">{posts.length}</p>
              <p className="text-sm text-kisan-text-muted font-devanagari">कुल पोस्ट</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {posts.filter(p => p.solved).length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">हल की गई समस्याएं</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">850</p>
              <p className="text-sm text-kisan-text-muted font-devanagari">सफल समाधान</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="kisan-card p-6 mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-kisan transition-colors font-devanagari ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-kisan-text-secondary hover:bg-primary/10'
                  }`}
                >
                  {currentLanguage === 'en' ? tab.nameEn : tab.name}
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-kisan-text-muted" />
                <input
                  type="text"
                  placeholder="समुदाय में खोजें..."
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                <option value="latest">नवीनतम</option>
                <option value="popular">लोकप्रिय</option>
                <option value="unanswered">अनुत्तरित</option>
              </select>

              <div className="text-sm text-kisan-text-muted flex items-center justify-center font-devanagari">
                {filteredPosts().length} पोस्ट मिली
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts().map((post) => (
              <div key={post.id} className="kisan-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  {/* Author Avatar */}
                  <img
                    src={post.author.avatar}
                    alt={post.author.nameHindi}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  
                  {/* Post Content */}
                  <div className="flex-1">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-kisan-text-primary font-devanagari">
                            {post.author.nameHindi}
                          </h3>
                          {post.author.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded ${getReputationBadge(post.author.reputation).color}`}>
                            {getReputationBadge(post.author.reputation).text}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-kisan-text-muted">
                          <MapPin className="h-3 w-3" />
                          <span className="font-devanagari">{post.author.locationHindi}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {post.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        {post.solved && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {post.urgent && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal className="h-4 w-4 text-kisan-text-muted" />
                        </button>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari cursor-pointer hover:text-primary"
                        onClick={() => setSelectedPost(post)}>
                      {currentLanguage === 'en' ? post.title : post.titleHindi}
                    </h2>

                    {/* Post Excerpt */}
                    <p className="text-kisan-text-secondary mb-3 line-clamp-2 font-devanagari">
                      {currentLanguage === 'en' 
                        ? post.content.substring(0, 200) + '...'
                        : post.contentHindi.substring(0, 200) + '...'
                      }
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${ 
                        categories.find(c => c.id === post.category)?.id === 'success-stories' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                      {(currentLanguage === 'en' ? post.tags : post.tagsHindi).slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-devanagari">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-kisan-text-muted">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded text-kisan-text-muted hover:text-primary">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded text-kisan-text-muted hover:text-primary">
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded text-kisan-text-muted hover:text-primary">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts().length === 0 && !isLoading && (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                कोई पोस्ट नहीं मिली
              </h3>
              <p className="text-kisan-text-muted font-devanagari">
                नई पोस्ट बनाकर चर्चा शुरू करें
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-kisan-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-kisan-text-primary font-devanagari">
                  नई पोस्ट बनाएं
                </h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                    शीर्षक
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="अपनी समस्या या प्रश्न का शीर्षक लिखें..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                    श्रेणी
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
                  >
                    {categories.filter(cat => cat.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                    विवरण
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="अपनी समस्या का विस्तृत विवरण दें..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                    टैग (कॉमा से अलग करें)
                  </label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="गेहूं, कीट, रोग"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreatePost}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors font-devanagari"
                  >
                    पोस्ट करें
                  </button>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 border border-border rounded-kisan hover:bg-gray-50 transition-colors font-devanagari"
                  >
                    रद्द करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-kisan-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-kisan-text-primary mb-2 font-devanagari">
                    {currentLanguage === 'en' ? selectedPost.title : selectedPost.titleHindi}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-kisan-text-muted">
                    <div className="flex items-center space-x-2">
                      <img
                        src={selectedPost.author.avatar}
                        alt={selectedPost.author.nameHindi}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-devanagari">{selectedPost.author.nameHindi}</span>
                    </div>
                    <span>{formatTimeAgo(selectedPost.createdAt)}</span>
                    <span>{selectedPost.views} व्यू</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="prose max-w-none mb-6 font-devanagari">
                {currentLanguage === 'en' ? selectedPost.content : selectedPost.contentHindi}
              </div>

              {/* Replies */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 font-devanagari">
                  उत्तर ({getPostReplies(selectedPost.id).length})
                </h3>
                
                <div className="space-y-4 mb-6">
                  {getPostReplies(selectedPost.id).map((reply) => (
                    <div key={reply.id} className="bg-gray-50 p-4 rounded-kisan">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.nameHindi}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="font-medium text-kisan-text-primary font-devanagari">
                            {reply.author.nameHindi}
                          </span>
                          {reply.isSolution && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-devanagari">
                              समाधान
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-kisan-text-muted">
                          {formatTimeAgo(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-kisan-text-secondary font-devanagari">
                        {currentLanguage === 'en' ? reply.content : reply.contentHindi}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <div className="bg-gray-50 p-4 rounded-kisan">
                  <label className="block text-sm font-medium text-kisan-text-secondary mb-2 font-devanagari">
                    अपना उत्तर दें
                  </label>
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary mb-3"
                    placeholder="अपना उत्तर लिखें..."
                  />
                  <button
                    onClick={() => handleReply(selectedPost.id)}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span className="font-devanagari">उत्तर भेजें</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// Fallback community data
const fallbackPosts: ForumPost[] = [
  {
    id: '1',
    title: 'White spots on wheat leaves - need help',
    titleHindi: 'गेहूं की पत्तियों पर सफेद दाग - मदद चाहिए',
    content: 'I have noticed white spots appearing on my wheat crop leaves. The spots are spreading rapidly. What could be the cause and how can I treat this?',
    contentHindi: 'मैंने अपनी गेहूं की फसल की पत्तियों पर सफेद दाग देखे हैं। ये दाग तेजी से फैल रहे हैं। इसका कारण क्या हो सकता है और मैं इसका इलाज कैसे कर सकता हूं?',
    author: {
      name: 'Rajesh Kumar',
      nameHindi: 'राजेश कुमार',
      avatar: '/api/placeholder/40/40',
      reputation: 245,
      location: 'Punjab',
      locationHindi: 'पंजाब',
      verified: true,
      joinDate: '2023-08-15',
      totalPosts: 15,
      badges: ['सक्रिय सदस्य']
    },
    category: 'crop-problems',
    categoryHindi: 'फसल समस्याएं',
    tags: ['wheat', 'disease', 'white-spots'],
    tagsHindi: ['गेहूं', 'रोग', 'सफेद-दाग'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    views: 156,
    likes: 12,
    dislikes: 0,
    replies: 5,
    featured: false,
    solved: false,
    urgent: true
  },
  {
    id: '2',
    title: 'Successful organic farming transition',
    titleHindi: 'सफल जैविक खेती संक्रमण',
    content: 'After 3 years of organic farming, I have increased my profit by 40%. Here\'s my complete journey and tips for fellow farmers.',
    contentHindi: '3 साल की जैविक खेती के बाद, मैंने अपना मुनाफा 40% बढ़ाया है। यहाँ मेरी पूरी यात्रा और साथी किसानों के लिए सुझाव हैं।',
    author: {
      name: 'Priya Sharma',
      nameHindi: 'प्रिया शर्मा',
      avatar: '/api/placeholder/40/40',
      reputation: 890,
      location: 'Maharashtra',
      locationHindi: 'महाराष्ट्र',
      verified: true,
      joinDate: '2023-03-20',
      totalPosts: 35,
      badges: ['अनुभवी सदस्य', 'जैविक विशेषज्ञ']
    },
    category: 'success-stories',
    categoryHindi: 'सफलता की कहानियां',
    tags: ['organic', 'success', 'profit'],
    tagsHindi: ['जैविक', 'सफलता', 'मुनाफा'],
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    views: 342,
    likes: 45,
    dislikes: 1,
    replies: 12,
    featured: true,
    solved: false,
    urgent: false
  }
];

const fallbackReplies: Reply[] = [
  {
    id: '1',
    postId: '1',
    content: 'This looks like powdery mildew. Try spraying with neem oil solution early morning.',
    contentHindi: 'यह चूर्णी फफूंदी लग रहा है। सुबह जल्दी नीम के तेल के घोल का छिड़काव करें।',
    author: {
      name: 'Dr. Amit Singh',
      nameHindi: 'डॉ. अमित सिंह',
      avatar: '/api/placeholder/40/40',
      reputation: 1250,
      verified: true
    },
    createdAt: '2024-01-15T11:15:00Z',
    likes: 8,
    dislikes: 0,
    isSolution: true
  }
];

export default CommunityPage;
