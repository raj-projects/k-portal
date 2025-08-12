import { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, ExternalLink, Calendar, 
  Users, DollarSign, AlertCircle, CheckCircle, Clock,
  FileText, Phone, MapPin, RefreshCw, Eye, Star,
  Bookmark, Share2, ArrowRight, Info, Wheat
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface GovernmentScheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  ministry: string;
  ministryHindi: string;
  category: string;
  categoryHindi: string;
  benefits: string[];
  benefitsHindi: string[];
  eligibility: string[];
  eligibilityHindi: string[];
  documents: string[];
  documentsHindi: string[];
  applicationProcess: string[];
  applicationProcessHindi: string[];
  amount: number;
  currency: string;
  deadline: string;
  status: 'active' | 'upcoming' | 'expired';
  beneficiaries: number;
  applicationLink: string;
  helplineNumber: string;
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
  featured: boolean;
  tags: string[];
  states: string[];
}

const GovernmentSchemesPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<GovernmentScheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [lastRefresh, setLastRefresh] = useState<number>(0);

  const categories = [
    { value: 'all', label: 'सभी श्रेणियां', labelEn: 'All Categories' },
    { value: 'subsidy', label: 'सब्सिडी योजनाएं', labelEn: 'Subsidy Schemes' },
    { value: 'loan', label: 'ऋण योजनाएं', labelEn: 'Loan Schemes' },
    { value: 'insurance', label: 'बीमा योजनाएं', labelEn: 'Insurance Schemes' },
    { value: 'equipment', label: 'उपकरण योजनाएं', labelEn: 'Equipment Schemes' },
    { value: 'training', label: 'प्रशिक्षण योजनाएं', labelEn: 'Training Schemes' },
    { value: 'organic', label: 'जैविक खेती', labelEn: 'Organic Farming' },
    { value: 'irrigation', label: 'सिंचाई योजनाएं', labelEn: 'Irrigation Schemes' }
  ];

  const statusOptions = [
    { value: 'all', label: 'सभी स्थिति', labelEn: 'All Status' },
    { value: 'active', label: 'सक्रिय', labelEn: 'Active' },
    { value: 'upcoming', label: 'आने वाली', labelEn: 'Upcoming' },
    { value: 'expired', label: 'समाप्त', labelEn: 'Expired' }
  ];

  // Fetch government schemes data
  const fetchSchemes = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/schemes');
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch schemes';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setSchemes(data);
      setFilteredSchemes(data);
      setLastRefresh(Date.now());
    } catch (err) {
      console.error('Schemes fetch error:', err);
      setError(err instanceof Error ? err.message : 'योजनाओं की जानकारी प्राप्त करने में त्रुटि');
      
      // Set fallback schemes data
      setSchemes(fallbackSchemes);
      setFilteredSchemes(fallbackSchemes);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSchemes();
  }, []);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSchemes();
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Filter schemes based on search and filters
  useEffect(() => {
    let filtered = schemes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.nameHindi.includes(searchTerm) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.descriptionHindi.includes(searchTerm) ||
        scheme.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(scheme => scheme.status === selectedStatus);
    }

    setFilteredSchemes(filtered);
  }, [schemes, searchTerm, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'medium': return <Info className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} करोड़`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} लाख`;
    } else {
      return `₹${amount.toLocaleString('hi-IN')}`;
    }
  };

  const toggleBookmark = (schemeId: string) => {
    setBookmarked(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const shareScheme = (scheme: GovernmentScheme) => {
    if (navigator.share) {
      navigator.share({
        title: scheme.nameHindi,
        text: scheme.descriptionHindi,
        url: window.location.href + '/' + scheme.id
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + '/' + scheme.id);
      alert('योजना का लिंक कॉपी हो गया है!');
    }
  };

  const handleRefresh = () => {
    fetchSchemes();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-kisan-bg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="kisan-card p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
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
              {currentLanguage === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
            </h1>
            <p className={`text-lg text-kisan-text-secondary max-w-3xl mx-auto ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>
              {currentLanguage === 'en' 
                ? 'Comprehensive information about all government schemes for farmers with live updates'
                : 'किसानों के लिए सभी सरकारी योजनाओं की विस्तृत जानकारी और लाइव अपडेट'
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="kisan-card p-6 text-center">
              <Wheat className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {schemes.filter(s => s.status === 'active').length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">सक्रिय योजनाएं</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                ₹{(schemes.reduce((sum, s) => sum + s.amount, 0) / 10000000).toFixed(1)}Cr
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">कुल सहायता राशि</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {(schemes.reduce((sum, s) => sum + s.beneficiaries, 0) / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">लाभार्थी</p>
            </div>
            <div className="kisan-card p-6 text-center">
              <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-kisan-text-primary">
                {schemes.filter(s => s.status === 'upcoming').length}
              </p>
              <p className="text-sm text-kisan-text-muted font-devanagari">आने वाली योजनाएं</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="kisan-card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold text-kisan-text-primary ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                योजनाएं खोजें
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-kisan-text-muted" />
                <input
                  type="text"
                  placeholder="योजना खोजें..."
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
                  <option key={cat.value} value={cat.value}>
                    {currentLanguage === 'en' ? cat.labelEn : cat.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {currentLanguage === 'en' ? status.labelEn : status.label}
                  </option>
                ))}
              </select>

              {/* Results count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-kisan-text-muted font-devanagari">
                  {filteredSchemes.length} योजनाएं मिलीं
                </span>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm"
                >
                  <Filter className="h-4 w-4" />
                  <span className="font-devanagari">फिल्टर</span>
                </button>
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

          {/* Schemes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="kisan-card p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(scheme.priority)}
                    {scheme.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(scheme.status)}`}>
                      {scheme.status === 'active' ? 'सक्रिय' : 
                       scheme.status === 'upcoming' ? 'आने वाली' : 'समाप्त'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleBookmark(scheme.id)}
                      className={`p-1 rounded hover:bg-gray-100 ${
                        bookmarked.includes(scheme.id) ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarked.includes(scheme.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => shareScheme(scheme)}
                      className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                  {currentLanguage === 'en' ? scheme.name : scheme.nameHindi}
                </h3>
                <p className="text-sm text-kisan-text-secondary mb-4 line-clamp-3 font-devanagari">
                  {currentLanguage === 'en' ? scheme.description : scheme.descriptionHindi}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-kisan-text-muted font-devanagari">सहायता राशि</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      {formatAmount(scheme.amount, scheme.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-kisan-text-muted font-devanagari">अंतिम तारीख</span>
                    </div>
                    <span className="text-sm text-kisan-text-secondary">
                      {new Date(scheme.deadline).toLocaleDateString('hi-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-kisan-text-muted font-devanagari">लाभार्थी</span>
                    </div>
                    <span className="text-sm text-kisan-text-secondary">
                      {scheme.beneficiaries.toLocaleString('hi-IN')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 text-kisan-text-primary px-3 py-2 rounded-kisan hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="font-devanagari">विवरण</span>
                  </button>
                  <a
                    href={scheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-1 bg-primary text-white px-3 py-2 rounded-kisan hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-devanagari">आवेदन करें</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredSchemes.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Wheat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                कोई योजना नहीं मिली
              </h3>
              <p className="text-kisan-text-muted font-devanagari">
                कृपया अलग खोजशब्द या फिल्टर का उपयोग करें
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-kisan-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-kisan-text-primary mb-2 font-devanagari">
                    {currentLanguage === 'en' ? selectedScheme.name : selectedScheme.nameHindi}
                  </h2>
                  <p className="text-kisan-text-secondary font-devanagari">
                    {currentLanguage === 'en' ? selectedScheme.ministry : selectedScheme.ministryHindi}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="p-2 hover:bg-gray-100 rounded-kisan"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    योजना विवरण
                  </h3>
                  <p className="text-kisan-text-secondary font-devanagari">
                    {currentLanguage === 'en' ? selectedScheme.description : selectedScheme.descriptionHindi}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    लाभ
                  </h3>
                  <ul className="space-y-2">
                    {(currentLanguage === 'en' ? selectedScheme.benefits : selectedScheme.benefitsHindi).map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-kisan-text-secondary font-devanagari">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    पात्रता
                  </h3>
                  <ul className="space-y-2">
                    {(currentLanguage === 'en' ? selectedScheme.eligibility : selectedScheme.eligibilityHindi).map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-kisan-text-secondary font-devanagari">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    आवश्यक दस्तावेज
                  </h3>
                  <ul className="space-y-2">
                    {(currentLanguage === 'en' ? selectedScheme.documents : selectedScheme.documentsHindi).map((doc, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <FileText className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-kisan-text-secondary font-devanagari">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    आवेदन प्रक्रिया
                  </h3>
                  <ol className="space-y-2">
                    {(currentLanguage === 'en' ? selectedScheme.applicationProcess : selectedScheme.applicationProcessHindi).map((step, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-kisan-text-secondary font-devanagari">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 p-4 rounded-kisan">
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    संपर्क जानकारी
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span className="text-kisan-text-secondary font-devanagari">
                      हेल्पलाइन: {selectedScheme.helplineNumber}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedScheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-kisan hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="font-devanagari">ऑनलाइन आवेदन करें</span>
                  </a>
                  <button
                    onClick={() => shareScheme(selectedScheme)}
                    className="flex items-center justify-center space-x-2 bg-gray-100 text-kisan-text-primary px-6 py-3 rounded-kisan hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="font-devanagari">शेयर करें</span>
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

// Fallback schemes data
const fallbackSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
    description: 'Income support scheme for farmers providing ₹6000 per year',
    descriptionHindi: 'किसानों के लिए वार्षिक ₹6000 की आय सहायता योजना',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'subsidy',
    categoryHindi: 'सब्सिडी',
    benefits: ['₹6000 per year', 'Direct bank transfer', 'No paperwork required'],
    benefitsHindi: ['वार्षिक ₹6000', 'सीधे बैंक खाते में', 'कागजी कार्रवाई नहीं'],
    eligibility: ['Small and marginal farmers', 'Land ownership required', 'Valid Aadhaar card'],
    eligibilityHindi: ['छोटे और सीमांत किसान', 'भूमि स्वामित्व आवश्यक', 'वैध आधार कार्ड'],
    documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records'],
    documentsHindi: ['आधार कार्ड', 'बैंक खाता विवरण', 'भूमि रिकॉर्ड'],
    applicationProcess: ['Visit PM-KISAN portal', 'Fill registration form', 'Upload documents', 'Submit application'],
    applicationProcessHindi: ['PM-KISAN पोर्टल पर जाएं', 'पंजीकरण फॉर्म भरें', 'दस्तावेज अपलोड करें', 'आवेदन जमा करें'],
    amount: 6000,
    currency: 'INR',
    deadline: '2024-12-31',
    status: 'active',
    beneficiaries: 12000000,
    applicationLink: 'https://pmkisan.gov.in',
    helplineNumber: '011-24300606',
    lastUpdated: '2024-01-15',
    priority: 'high',
    featured: true,
    tags: ['income support', 'direct transfer', 'farmer welfare'],
    states: ['All India']
  },
  {
    id: 'crop-insurance',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
    description: 'Crop insurance scheme for farmers against natural calamities',
    descriptionHindi: 'प्राकृतिक आपदाओं के विरुद्ध किसानों के लिए फसल बीमा योजना',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'insurance',
    categoryHindi: 'बीमा',
    benefits: ['Crop loss coverage', 'Low premium rates', 'Quick settlement'],
    benefitsHindi: ['फसल नुकसान कवरेज', 'कम प्रीमियम दरें', 'त्वरित निपटान'],
    eligibility: ['All farmers', 'Sharecroppers included', 'Tenant farmers eligible'],
    eligibilityHindi: ['सभी किसान', 'बटाईदार शामिल', 'किरायेदार किसान पात्र'],
    documents: ['Aadhaar Card', 'Bank Account', 'Land Documents', 'Sowing Certificate'],
    documentsHindi: ['आधार कार्ड', 'बैंक खाता', 'भूमि दस्तावेज', 'बुआई प्रमाणपत्र'],
    applicationProcess: ['Contact local agriculture officer', 'Fill application form', 'Pay premium', 'Get policy document'],
    applicationProcessHindi: ['स्थानीय कृषि अधिकारी से संपर्क करें', 'आवेदन फॉर्म भरें', 'प्रीमियम भुगतान करें', 'पॉलिसी दस्तावेज प्राप्त करें'],
    amount: 200000,
    currency: 'INR',
    deadline: '2024-03-31',
    status: 'active',
    beneficiaries: 5500000,
    applicationLink: 'https://pmfby.gov.in',
    helplineNumber: '14447',
    lastUpdated: '2024-01-10',
    priority: 'high',
    featured: true,
    tags: ['crop insurance', 'risk management', 'premium subsidy'],
    states: ['All India']
  }
];

export default GovernmentSchemesPage;
