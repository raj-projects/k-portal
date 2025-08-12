import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, Search, Filter, RefreshCw,
  MapPin, Calendar, BarChart3, Download, Eye, AlertCircle,
  Wheat, Apple, Carrot, Leaf, DollarSign, Clock
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface MarketPrice {
  id: string;
  crop: string;
  cropHindi: string;
  variety: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
  market: string;
  state: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  minPrice: number;
  maxPrice: number;
  category: 'cereals' | 'pulses' | 'vegetables' | 'fruits' | 'cash-crops';
}

interface MarketSummary {
  totalMarkets: number;
  totalCrops: number;
  topGainer: MarketPrice;
  topLoser: MarketPrice;
  averageChange: number;
}

const MarketPricesPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>([]);
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [lastRefresh, setLastRefresh] = useState<number>(0);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'name'>('change');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = [
    { value: 'all', label: 'सभी फसलें', labelEn: 'All Crops' },
    { value: 'cereals', label: 'अनाज', labelEn: 'Cereals' },
    { value: 'pulses', label: 'दालें', labelEn: 'Pulses' },
    { value: 'vegetables', label: 'सब्जियां', labelEn: 'Vegetables' },
    { value: 'fruits', label: 'फल', labelEn: 'Fruits' },
    { value: 'cash-crops', label: 'न��दी फसलें', labelEn: 'Cash Crops' }
  ];

  const states = [
    { value: 'all', label: 'सभी राज्य', labelEn: 'All States' },
    { value: 'punjab', label: 'पंजाब', labelEn: 'Punjab' },
    { value: 'haryana', label: 'हरियाणा', labelEn: 'Haryana' },
    { value: 'up', label: 'उत्तर प्रदेश', labelEn: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'महाराष्ट्र', labelEn: 'Maharashtra' },
    { value: 'gujarat', label: 'गुजरात', labelEn: 'Gujarat' },
    { value: 'rajasthan', label: 'राजस्थान', labelEn: 'Rajasthan' },
    { value: 'mp', label: 'मध्य प्रदेश', labelEn: 'Madhya Pradesh' },
    { value: 'karnataka', label: 'कर्नाटक', labelEn: 'Karnataka' },
    { value: 'tamilnadu', label: 'तमिलनाडु', labelEn: 'Tamil Nadu' },
    { value: 'andhra', label: 'आंध्र प्रदेश', labelEn: 'Andhra Pradesh' }
  ];

  // Generate comprehensive mock data
  const generateMockPrices = (): MarketPrice[] => {
    const crops = [
      // Cereals
      { crop: 'Rice', cropHindi: 'धान', category: 'cereals' as const, varieties: ['Basmati', 'Common', 'PR-11'] },
      { crop: 'Wheat', cropHindi: 'गेहूं', category: 'cereals' as const, varieties: ['HD-2967', 'PBW-343', 'Common'] },
      { crop: 'Corn', cropHindi: 'मक्का', category: 'cereals' as const, varieties: ['Yellow', 'White', 'Sweet'] },
      { crop: 'Barley', cropHindi: 'जौ', category: 'cereals' as const, varieties: ['Feed', 'Malting'] },
      
      // Pulses
      { crop: 'Gram', cropHindi: 'चना', category: 'pulses' as const, varieties: ['Desi', 'Kabuli'] },
      { crop: 'Arhar', cropHindi: 'अरहर', category: 'pulses' as const, varieties: ['Bold', 'Medium'] },
      { crop: 'Moong', cropHindi: 'मूंग', category: 'pulses' as const, varieties: ['Green', 'Black'] },
      { crop: 'Masoor', cropHindi: 'मसूर', category: 'pulses' as const, varieties: ['Red', 'Large'] },
      
      // Vegetables
      { crop: 'Onion', cropHindi: 'प्याज', category: 'vegetables' as const, varieties: ['Red', 'White', 'Big'] },
      { crop: 'Potato', cropHindi: 'आलू', category: 'vegetables' as const, varieties: ['Round', 'Oval', 'Red'] },
      { crop: 'Tomato', cropHindi: 'टमाटर', category: 'vegetables' as const, varieties: ['Round', 'Hybrid', 'Local'] },
      { crop: 'Cauliflower', cropHindi: 'फूलगोभी', category: 'vegetables' as const, varieties: ['Medium', 'Large'] },
      
      // Fruits
      { crop: 'Apple', cropHindi: 'सेब', category: 'fruits' as const, varieties: ['Red Delicious', 'Green', 'Local'] },
      { crop: 'Orange', cropHindi: 'संतरा', category: 'fruits' as const, varieties: ['Nagpur', 'Local', 'Sweet'] },
      { crop: 'Banana', cropHindi: 'केला', category: 'fruits' as const, varieties: ['Robusta', 'Rasthali', 'Red'] },
      
      // Cash Crops
      { crop: 'Cotton', cropHindi: 'कपास', category: 'cash-crops' as const, varieties: ['Medium Staple', 'Long Staple'] },
      { crop: 'Sugarcane', cropHindi: 'गन्ना', category: 'cash-crops' as const, varieties: ['Early', 'Medium', 'Late'] },
      { crop: 'Groundnut', cropHindi: 'मूंगफली', category: 'cash-crops' as const, varieties: ['Bold', 'Java', 'TJ'] }
    ];

    const markets = [
      { market: 'दिल्ली मंडी', state: 'delhi' },
      { market: 'अमृतसर मंडी', state: 'punjab' },
      { market: 'करनाल मंडी', state: 'haryana' },
      { market: 'आगरा मंडी', state: 'up' },
      { market: 'नासिक मंडी', state: 'maharashtra' },
      { market: 'राजकोट मंडी', state: 'gujarat' },
      { market: 'जयपुर मंडी', state: 'rajasthan' },
      { market: 'इंद���र मंडी', state: 'mp' },
      { market: 'बंगलुरु मंडी', state: 'karnataka' },
      { market: 'कोयंबटूर मंडी', state: 'tamilnadu' }
    ];

    const mockPrices: MarketPrice[] = [];
    let id = 1;

    crops.forEach(crop => {
      crop.varieties.forEach(variety => {
        markets.slice(0, 3 + Math.floor(Math.random() * 3)).forEach(marketInfo => {
          const basePrice = getBasePriceForCrop(crop.crop);
          const variation = (Math.random() - 0.5) * 0.3 * basePrice;
          const price = Math.round(basePrice + variation);
          const change = Math.round((Math.random() - 0.5) * 200);
          const changePercent = Number(((change / price) * 100).toFixed(2));
          
          mockPrices.push({
            id: id.toString(),
            crop: crop.crop,
            cropHindi: crop.cropHindi,
            variety,
            price,
            unit: getUnitForCrop(crop.crop),
            change,
            changePercent,
            market: marketInfo.market,
            state: marketInfo.state,
            date: new Date().toISOString().split('T')[0],
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
            minPrice: Math.round(price * 0.9),
            maxPrice: Math.round(price * 1.1),
            category: crop.category
          });
          id++;
        });
      });
    });

    return mockPrices.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  };

  const getBasePriceForCrop = (crop: string): number => {
    const basePrices: { [key: string]: number } = {
      'Rice': 2100, 'Wheat': 2050, 'Corn': 1800, 'Barley': 1650,
      'Gram': 4800, 'Arhar': 6200, 'Moong': 7800, 'Masoor': 5400,
      'Onion': 25, 'Potato': 18, 'Tomato': 35, 'Cauliflower': 22,
      'Apple': 120, 'Orange': 45, 'Banana': 35,
      'Cotton': 5800, 'Sugarcane': 350, 'Groundnut': 5500
    };
    return basePrices[crop] || 2000;
  };

  const getUnitForCrop = (crop: string): string => {
    const units: { [key: string]: string } = {
      'Rice': 'प्रति क्विंटल', 'Wheat': 'प्रति क्विंटल', 'Corn': 'प्रति क्विंटल', 'Barley': 'प्रति क्विंटल',
      'Gram': 'प्रति क्विंटल', 'Arhar': 'प्रति क्विंटल', 'Moong': 'प्रति क्विंटल', 'Masoor': 'प्रति क्विंटल',
      'Onion': 'प्रति किलो', 'Potato': 'प्रति किलो', 'Tomato': 'प्रति किलो', 'Cauliflower': 'प्���ति किलो',
      'Apple': 'प्रति किलो', 'Orange': 'प्रति किलो', 'Banana': 'प्रति दर्जन',
      'Cotton': 'प्रति क्विंटल', 'Sugarcane': 'प्रति क्विंटल', 'Groundnut': 'प्रति क्विंटल'
    };
    return units[crop] || 'प्रति क्विंटल';
  };

  const generateSummary = (pricesData: MarketPrice[]): MarketSummary => {
    const totalMarkets = new Set(pricesData.map(p => p.market)).size;
    const totalCrops = new Set(pricesData.map(p => p.crop)).size;
    
    const sortedByGain = pricesData.sort((a, b) => b.changePercent - a.changePercent);
    const topGainer = sortedByGain[0];
    const topLoser = sortedByGain[sortedByGain.length - 1];
    
    const averageChange = pricesData.reduce((sum, p) => sum + p.changePercent, 0) / pricesData.length;

    return {
      totalMarkets,
      totalCrops,
      topGainer,
      topLoser,
      averageChange: Number(averageChange.toFixed(2))
    };
  };

  // Fetch market prices (simulated)
  const fetchMarketPrices = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = generateMockPrices();
      setPrices(mockData);
      setFilteredPrices(mockData);
      setSummary(generateSummary(mockData));
      setLastRefresh(Date.now());
    } catch (err) {
      console.error('Market prices fetch error:', err);
      setError('मंडी भाव की जानकारी प्राप्त करने में त्रुटि');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort prices
  useEffect(() => {
    let filtered = prices;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(price => 
        price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.cropHindi.includes(searchTerm) ||
        price.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.market.includes(searchTerm)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(price => price.category === selectedCategory);
    }

    // State filter
    if (selectedState !== 'all') {
      filtered = filtered.filter(price => price.state === selectedState);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'change':
          comparison = a.changePercent - b.changePercent;
          break;
        case 'name':
          comparison = a.crop.localeCompare(b.crop);
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredPrices(filtered);
  }, [prices, searchTerm, selectedCategory, selectedState, sortBy, sortOrder]);

  // Initial load and auto-refresh
  useEffect(() => {
    fetchMarketPrices();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cereals':
        return <Wheat className="h-5 w-5" />;
      case 'fruits':
        return <Apple className="h-5 w-5" />;
      case 'vegetables':
        return <Carrot className="h-5 w-5" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-kisan-bg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-kisan"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-kisan"></div>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className={`text-3xl font-bold text-kisan-text-primary mb-2 ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                मंडी भाव
              </h1>
              <p className={`text-kisan-text-secondary ${
                currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
              }`}>
                वास्तविक समय के मंडी भाव और ट्रेंड विश्लेषण
              </p>
            </div>
            
            <button
              onClick={fetchMarketPrices}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>अपडेट करें</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-kisan">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-red-600 font-devanagari">{error}</p>
              </div>
            </div>
          )}

          {/* Summary Cards */}
          {summary && (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="kisan-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-kisan-text-muted font-devanagari">कुल मंडियां</p>
                    <p className="text-2xl font-bold text-kisan-text-primary">{summary.totalMarkets}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="kisan-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-kisan-text-muted font-devanagari">कुल फसलें</p>
                    <p className="text-2xl font-bold text-kisan-text-primary">{summary.totalCrops}</p>
                  </div>
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="kisan-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-kisan-text-muted font-devanagari">टॉप गेनर</p>
                    <p className="text-lg font-bold text-green-600">
                      {summary.topGainer.cropHindi} +{summary.topGainer.changePercent}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="kisan-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-kisan-text-muted font-devanagari">औसत बदलाव</p>
                    <p className={`text-2xl font-bold ${
                      summary.averageChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {summary.averageChange >= 0 ? '+' : ''}{summary.averageChange}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="kisan-card p-6 mb-8">
            <div className="grid md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-kisan-text-muted" />
                <input
                  type="text"
                  placeholder="फसल खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-kisan focus:outline-none focus:ring-2 focus:ring-primary/20 font-devanagari"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-kisan bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-devanagari"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {currentLanguage === 'en' ? cat.labelEn : cat.label}
                  </option>
                ))}
              </select>

              {/* State Filter */}
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border border-border rounded-kisan bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-devanagari"
              >
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {currentLanguage === 'en' ? state.labelEn : state.label}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'change' | 'name')}
                className="px-4 py-2 border border-border rounded-kisan bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-devanagari"
              >
                <option value="change">बदलाव के अनुसार</option>
                <option value="price">कीमत के अनुसार</option>
                <option value="name">नाम के अनुसार</option>
              </select>

              {/* Sort Order */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="px-4 py-2 border border-border rounded-kisan bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-devanagari"
              >
                <option value="desc">उच्च से निम्न</option>
                <option value="asc">निम्��� से उच्च</option>
              </select>
            </div>
          </div>

          {/* Market Prices Table */}
          <div className="kisan-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-kisan-text-primary font-devanagari">
                  मंडी भाव सूची ({filteredPrices.length} परिणाम)
                </h2>
                {lastRefresh > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-kisan-text-muted">
                    <Clock className="h-4 w-4" />
                    <span>अपडेट: {new Date(lastRefresh).toLocaleTimeString('hi-IN')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-kisan-text-muted uppercase tracking-wider font-devanagari">
                      फसल
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-kisan-text-muted uppercase tracking-wider font-devanagari">
                      किस्म
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-kisan-text-muted uppercase tracking-wider font-devanagari">
                      मंडी
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-kisan-text-muted uppercase tracking-wider font-devanagari">
                      कीमत
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-kisan-text-muted uppercase tracking-wider font-devanagari">
                      बदलाव
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-kisan-text-muted uppercase tracking-wider font-devanagari">
                      ट्रेंड
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  {filteredPrices.map((price) => (
                    <tr key={price.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {getCategoryIcon(price.category)}
                          <div>
                            <div className="text-sm font-medium text-kisan-text-primary font-devanagari">
                              {price.cropHindi}
                            </div>
                            <div className="text-xs text-kisan-text-muted font-latin">
                              {price.crop}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-kisan-text-secondary">
                        {price.variety}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-kisan-text-secondary font-devanagari">
                          {price.market}
                        </div>
                        <div className="text-xs text-kisan-text-muted">
                          {states.find(s => s.value === price.state)?.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-kisan-text-primary">
                          ₹{price.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-kisan-text-muted font-devanagari">
                          {price.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className={`text-sm font-medium ${
                          price.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {price.change >= 0 ? '+' : ''}₹{price.change}
                        </div>
                        <div className={`text-xs ${
                          price.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {price.changePercent >= 0 ? '+' : ''}{price.changePercent}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(price.trend)}`}>
                          {getTrendIcon(price.trend)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPrices.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-kisan-text-muted mx-auto mb-4" />
                <p className="text-kisan-text-muted font-devanagari">
                  कोई परिणाम नहीं मिला। कृपया अपने फिल्टर बदलें।
                </p>
              </div>
            )}
          </div>

          {/* Market Insights */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="kisan-card p-6">
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 font-devanagari">
                आज की मुख्य बातें
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-kisan-text-secondary font-devanagari">
                    सब्जियों की कीमतें मौस���ी मांग के कारण बढ़ी हैं
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-kisan-text-secondary font-devanagari">
                    अनाज की कीमतें स्थिर हैं और अच्छी फसल की उम्मीद है
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <p className="text-sm text-kisan-text-secondary font-devanagari">
                    दालों में मिश्रित रुझान देखा जा रहा है
                  </p>
                </div>
              </div>
            </div>

            <div className="kisan-card p-6">
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-4 font-devanagari">
                बिक्री की सलाह
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-kisan">
                  <p className="text-sm font-medium text-green-800 font-devanagari">
                    अच्छा समय: आलू, प्याज की बिक्री के लिए
                  </p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-kisan">
                  <p className="text-sm font-medium text-amber-800 font-devanagari">
                    प्रतीक्षा करें: गेहूं, चना के लिए बेहतर दाम की उम्मीद
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-kisan">
                  <p className="text-sm font-medium text-blue-800 font-devanagari">
                    सलाह: स्थानीय मंडी की कीमतों की तुलना करें
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketPricesPage;
