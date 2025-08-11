import { useState } from 'react';
import { 
  Store, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Phone,
  IndianRupee,
  Star,
  Clock,
  Package,
  Truck,
  Heart,
  Share2,
  ShoppingCart,
  Tag,
  TrendingUp,
  Users,
  Verified
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Marketplace = () => {
  const [language, setLanguage] = useState('hi');
  const [activeTab, setActiveTab] = useState('buy');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showPostForm, setShowPostForm] = useState(false);

  const content = {
    hi: {
      title: 'किसान बाजार',
      subtitle: 'फसल, बीज, खाद और कृषि उपकरण खरीदें-बेचें',
      buy: 'खरीदें',
      sell: 'बेचें',
      search: 'खोजें',
      filter: 'फिल्टर',
      allCategories: 'सभी श्रेणियां',
      allLocations: 'सभी स्थान',
      postAd: 'विज्ञापन पोस्ट करें',
      price: 'कीमत',
      location: 'स्थान',
      postedBy: 'पोस्ट किया गया',
      verified: 'सत्यापित',
      contact: 'संपर्क करें',
      addToCart: 'कार्ट में जोड़ें',
      negotiable: 'मोल-भाव',
      featured: 'विशेष',
      fresh: 'ताज़ा',
      organic: 'जैविक',
      wholesale: 'थोक',
      retail: 'खुदरा',
      quantity: 'मात्रा',
      quality: 'गुणवत्ता',
      delivery: 'डिलीवरी उपलब्ध',
      myAds: 'मेरे विज्ञापन',
      favorites: 'पसंदीदा',
      recentlyViewed: 'हाल में देखे गए'
    },
    en: {
      title: 'Farmers Marketplace',
      subtitle: 'Buy and sell crops, seeds, fertilizers and farm equipment',
      buy: 'Buy',
      sell: 'Sell',
      search: 'Search',
      filter: 'Filter',
      allCategories: 'All Categories',
      allLocations: 'All Locations',
      postAd: 'Post Ad',
      price: 'Price',
      location: 'Location',
      postedBy: 'Posted By',
      verified: 'Verified',
      contact: 'Contact',
      addToCart: 'Add to Cart',
      negotiable: 'Negotiable',
      featured: 'Featured',
      fresh: 'Fresh',
      organic: 'Organic',
      wholesale: 'Wholesale',
      retail: 'Retail',
      quantity: 'Quantity',
      quality: 'Quality',
      delivery: 'Delivery Available',
      myAds: 'My Ads',
      favorites: 'Favorites',
      recentlyViewed: 'Recently Viewed'
    }
  };

  const categories = [
    { value: 'all', label: { hi: 'सभी श्रेणियां', en: 'All Categories' }, icon: '🌾' },
    { value: 'crops', label: { hi: 'फसल', en: 'Crops' }, icon: '🌾' },
    { value: 'seeds', label: { hi: 'बीज', en: 'Seeds' }, icon: '🌱' },
    { value: 'fertilizers', label: { hi: 'खाद', en: 'Fertilizers' }, icon: '🧪' },
    { value: 'equipment', label: { hi: 'उपकरण', en: 'Equipment' }, icon: '🚜' },
    { value: 'pesticides', label: { hi: 'कीटनाशक', en: 'Pesticides' }, icon: '💊' },
    { value: 'tools', label: { hi: 'औजार', en: 'Tools' }, icon: '🔧' }
  ];

  const locations = [
    { value: 'all', label: { hi: 'सभी स्थान', en: 'All Locations' } },
    { value: 'punjab', label: { hi: 'पंजाब', en: 'Punjab' } },
    { value: 'haryana', label: { hi: 'हरियाणा', en: 'Haryana' } },
    { value: 'uttar-pradesh', label: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' } },
    { value: 'rajasthan', label: { hi: 'राजस्थान', en: 'Rajasthan' } },
    { value: 'gujarat', label: { hi: 'गुजरात', en: 'Gujarat' } },
    { value: 'maharashtra', label: { hi: 'महाराष्ट्र', en: 'Maharashtra' } }
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: { hi: 'A1 गुणवत्ता गेहूं - 100 क्विंटल', en: 'A1 Quality Wheat - 100 Quintal' },
      category: 'crops',
      price: 220000,
      priceUnit: { hi: 'प्रति क्विंटल', en: 'per quintal' },
      location: { hi: 'अमृतसर, पंजाब', en: 'Amritsar, Punjab' },
      seller: { hi: 'राम सिंह', en: 'Ram Singh' },
      rating: 4.8,
      reviews: 45,
      postedDate: { hi: '2 दिन पहले', en: '2 days ago' },
      verified: true,
      featured: true,
      tags: ['fresh', 'organic', 'wholesale'],
      description: { 
        hi: 'उच्च गुणवत्ता का गेहूं। कोई मिलावट नहीं। तुरंत डिलीवरी उपलब्ध।',
        en: 'High quality wheat. No adulteration. Immediate delivery available.'
      },
      images: ['/api/placeholder/300/200'],
      delivery: true,
      negotiable: true,
      phone: '+91-9876543210'
    },
    {
      id: 2,
      title: { hi: 'हाइब्रिड मक्का के बीज - 50kg', en: 'Hybrid Maize Seeds - 50kg' },
      category: 'seeds',
      price: 15000,
      priceUnit: { hi: '50kg बैग', en: 'per 50kg bag' },
      location: { hi: 'लुधियाना, पंजाब', en: 'Ludhiana, Punjab' },
      seller: { hi: 'सुखदेव कृषि केंद्र', en: 'Sukhdev Agri Center' },
      rating: 4.6,
      reviews: 28,
      postedDate: { hi: '1 दिन पहले', en: '1 day ago' },
      verified: true,
      featured: false,
      tags: ['certified', 'high-yield'],
      description: { 
        hi: 'प्रमाणित हाइब्रिड बीज। 95% अंकुरण दर। उच्च उत्पादन गारंटी।',
        en: 'Certified hybrid seeds. 95% germination rate. High yield guarantee.'
      },
      images: ['/api/placeholder/300/200'],
      delivery: true,
      negotiable: false,
      phone: '+91-9876543211'
    },
    {
      id: 3,
      title: { hi: 'जैविक गोबर खाद - 1000kg', en: 'Organic Cow Dung Manure - 1000kg' },
      category: 'fertilizers',
      price: 8000,
      priceUnit: { hi: 'प्रति टन', en: 'per ton' },
      location: { hi: 'मेरठ, उत्तर प्रदेश', en: 'Meerut, Uttar Pradesh' },
      seller: { hi: 'गोविंद डेयरी फार्म', en: 'Govind Dairy Farm' },
      rating: 4.9,
      reviews: 67,
      postedDate: { hi: '3 दिन पहले', en: '3 days ago' },
      verified: true,
      featured: false,
      tags: ['organic', 'natural'],
      description: { 
        hi: '100% प्राकृतिक गोबर खाद। मिट्टी की उर्व��ता बढ़ाता है।',
        en: '100% natural cow dung manure. Improves soil fertility.'
      },
      images: ['/api/placeholder/300/200'],
      delivery: true,
      negotiable: true,
      phone: '+91-9876543212'
    },
    {
      id: 4,
      title: { hi: 'ताज़ा आलू - 200 क्विंटल', en: 'Fresh Potatoes - 200 Quintal' },
      category: 'crops',
      price: 180000,
      priceUnit: { hi: 'प्रति क्विंटल', en: 'per quintal' },
      location: { hi: 'आगरा, उत्तर प्रदेश', en: 'Agra, Uttar Pradesh' },
      seller: { hi: 'विजय कुमार', en: 'Vijay Kumar' },
      rating: 4.7,
      reviews: 33,
      postedDate: { hi: '1 दिन पहले', en: '1 day ago' },
      verified: false,
      featured: false,
      tags: ['fresh', 'grade-a'],
      description: { 
        hi: 'ताज़ा आलू सीधे खेत से। A ग्रेड गुणवत्ता। थोक में उपलब्ध।',
        en: 'Fresh potatoes directly from farm. Grade A quality. Available in bulk.'
      },
      images: ['/api/placeholder/300/200'],
      delivery: false,
      negotiable: true,
      phone: '+91-9876543213'
    }
  ];

  const featuredSellers = [
    {
      name: { hi: 'राम सिंह', en: 'Ram Singh' },
      location: { hi: 'अमृतसर, पंजाब', en: 'Amritsar, Punjab' },
      rating: 4.8,
      totalSales: 245,
      verified: true,
      speciality: { hi: 'गेहूं और चावल', en: 'Wheat & Rice' }
    },
    {
      name: { hi: 'सुखदेव कृषि केंद्र', en: 'Sukhdev Agri Center' },
      location: { hi: 'लुधियाना, पंजाब', en: 'Ludhiana, Punjab' },
      rating: 4.6,
      totalSales: 189,
      verified: true,
      speciality: { hi: 'बीज और खाद', en: 'Seeds & Fertilizers' }
    },
    {
      name: { hi: 'गोविंद डेयरी फार्म', en: 'Govind Dairy Farm' },
      location: { hi: 'मेरठ, उत्तर प्रदेश', en: 'Meerut, UP' },
      rating: 4.9,
      totalSales: 156,
      verified: true,
      speciality: { hi: 'जैविक खाद', en: 'Organic Manure' }
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
      item.location.en.toLowerCase().includes(selectedLocation.replace('-', ' '));
    const matchesSearch = searchTerm === '' ||
      item.title.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.en.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'fresh': return 'bg-green-500';
      case 'organic': return 'bg-emerald-500';
      case 'wholesale': return 'bg-blue-500';
      case 'certified': return 'bg-purple-500';
      case 'high-yield': return 'bg-orange-500';
      case 'natural': return 'bg-teal-500';
      case 'grade-a': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTagText = (tag: string) => {
    const tags = {
      hi: {
        fresh: 'ताज़ा',
        organic: 'जैविक',
        wholesale: 'थोक',
        certified: 'प्रमाणित',
        'high-yield': 'उच्च उत्पादन',
        natural: 'प्राकृतिक',
        'grade-a': 'A ग्रेड'
      },
      en: {
        fresh: 'Fresh',
        organic: 'Organic',
        wholesale: 'Wholesale',
        certified: 'Certified',
        'high-yield': 'High Yield',
        natural: 'Natural',
        'grade-a': 'Grade A'
      }
    };
    return tags[language as keyof typeof tags][tag as keyof typeof tags.hi] || tag;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-farm-50 py-8">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-farm-200 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-farm-700">500+</div>
              <div className="text-sm text-farm-600">
                {language === 'hi' ? 'सक्रिय विक्रेता' : 'Active Sellers'}
              </div>
            </CardContent>
          </Card>
          <Card className="border-farm-200 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-farm-700">1,200+</div>
              <div className="text-sm text-farm-600">
                {language === 'hi' ? 'उत्पाद उपलब्ध' : 'Products Available'}
              </div>
            </CardContent>
          </Card>
          <Card className="border-farm-200 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-farm-700">25+</div>
              <div className="text-sm text-farm-600">
                {language === 'hi' ? 'राज्य' : 'States'}
              </div>
            </CardContent>
          </Card>
          <Card className="border-farm-200 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-farm-700">₹2.5Cr+</div>
              <div className="text-sm text-farm-600">
                {language === 'hi' ? 'कुल व्यापार' : 'Total Trade'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Category Filter */}
            <Card className="border-farm-200 mb-6">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {content[language as keyof typeof content].allCategories}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-2 ${
                        selectedCategory === category.value
                          ? 'bg-farm-600 text-white'
                          : 'hover:bg-farm-50 text-farm-700'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm">
                        {category.label[language as keyof typeof category.label]}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Sellers */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700 flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  {language === 'hi' ? 'टॉप विक्रेता' : 'Top Sellers'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredSellers.map((seller, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-farm-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-farm-500 text-white">
                          {seller.name[language as keyof typeof seller.name].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <h4 className="font-medium text-farm-700 text-sm truncate">
                            {seller.name[language as keyof typeof seller.name]}
                          </h4>
                          {seller.verified && (
                            <Verified className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-farm-600 truncate">
                          {seller.location[language as keyof typeof seller.location]}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-farm-600 ml-1">{seller.rating}</span>
                          </div>
                          <span className="text-xs text-farm-500">•</span>
                          <span className="text-xs text-farm-500">{seller.totalSales} sales</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="border-farm-200 mb-6">
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

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-farm-300">
                      <SelectValue placeholder={content[language as keyof typeof content].allLocations} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label[language as keyof typeof location.label]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    onClick={() => setShowPostForm(true)}
                    className="bg-farm-600 hover:bg-farm-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {content[language as keyof typeof content].postAd}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Marketplace Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="border-farm-200 hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-green-400 to-farm-400 h-48 rounded-t-lg flex items-center justify-center">
                      <Package className="h-16 w-16 text-white" />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                      {item.featured && (
                        <Badge className="bg-orange-500 text-white text-xs">
                          {content[language as keyof typeof content].featured}
                        </Badge>
                      )}
                      {item.verified && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          {content[language as keyof typeof content].verified}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} className={`${getTagColor(tag)} text-white text-xs`}>
                          {getTagText(tag)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-farm-700 mb-2 line-clamp-2">
                      {item.title[language as keyof typeof item.title]}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-bold text-farm-700">
                          ₹{item.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-farm-600">
                          {item.priceUnit[language as keyof typeof item.priceUnit]}
                        </div>
                      </div>
                      {item.negotiable && (
                        <Badge variant="outline" className="border-farm-300 text-farm-600 text-xs">
                          {content[language as keyof typeof content].negotiable}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-farm-600 mb-3 line-clamp-2">
                      {item.description[language as keyof typeof item.description]}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-farm-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location[language as keyof typeof item.location]}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-farm-600">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.postedDate[language as keyof typeof item.postedDate]}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                          {item.rating} ({item.reviews})
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-farm-700 font-medium">
                          {item.seller[language as keyof typeof item.seller]}
                        </span>
                        {item.delivery && (
                          <div className="flex items-center text-green-600">
                            <Truck className="h-3 w-3 mr-1" />
                            <span>{content[language as keyof typeof content].delivery}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-farm-600 hover:bg-farm-700">
                        <Phone className="h-4 w-4 mr-1" />
                        {content[language as keyof typeof content].contact}
                      </Button>
                      <Button size="sm" variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-50">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-50">
                {language === 'hi' ? 'और देखें' : 'Load More'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
