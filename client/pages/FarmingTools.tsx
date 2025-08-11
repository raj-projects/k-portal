import { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Phone, 
  Calendar,
  IndianRupee,
  Truck,
  Shield,
  Clock,
  Users,
  Heart,
  Share2,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const FarmingTools = () => {
  const [language, setLanguage] = useState('hi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const content = {
    hi: {
      title: 'कृषि उपकरण',
      subtitle: 'आधुनिक कृषि यंत्रों की जानकारी, खरीदारी और किराया',
      search: 'उपकरण खोजें',
      filter: 'फिल्टर',
      allCategories: 'सभी श्रेणियां',
      allLocations: 'सभी स्थान',
      allPrices: 'सभी कीमतें',
      rent: 'किराया',
      buy: 'खरीदें',
      rating: 'रेटिंग',
      reviews: 'समीक्षाएं',
      available: 'उपलब्ध',
      contact: 'संपर्क करें',
      bookNow: 'अभी बुक करें',
      specifications: 'विशेषताएं',
      features: 'फीचर्स',
      popular: 'लोकप्रिय उपकरण',
      latest: 'नए उपकरण',
      recommended: 'सुझाए गए',
      compare: 'तुलना करें',
      addToWishlist: 'पसंदीदा में जोड़ें',
      share: 'साझा करें',
      perDay: 'प्रति दिन',
      perHour: 'प्रति घंटा',
      delivery: 'डिलीवरी',
      warranty: 'वारंटी'
    },
    en: {
      title: 'Farming Tools',
      subtitle: 'Information, buying and rental options for modern farm equipment',
      search: 'Search Equipment',
      filter: 'Filter',
      allCategories: 'All Categories',
      allLocations: 'All Locations',
      allPrices: 'All Prices',
      rent: 'Rent',
      buy: 'Buy',
      rating: 'Rating',
      reviews: 'Reviews',
      available: 'Available',
      contact: 'Contact',
      bookNow: 'Book Now',
      specifications: 'Specifications',
      features: 'Features',
      popular: 'Popular Equipment',
      latest: 'New Equipment',
      recommended: 'Recommended',
      compare: 'Compare',
      addToWishlist: 'Add to Wishlist',
      share: 'Share',
      perDay: 'per day',
      perHour: 'per hour',
      delivery: 'Delivery',
      warranty: 'Warranty'
    }
  };

  const categories = [
    { value: 'all', label: { hi: 'सभी श्रेणियां', en: 'All Categories' } },
    { value: 'tractors', label: { hi: 'ट्रैक्टर', en: 'Tractors' } },
    { value: 'harvesters', label: { hi: 'हार्वेस्टर', en: 'Harvesters' } },
    { value: 'tillers', label: { hi: 'टिलर', en: 'Tillers' } },
    { value: 'plows', label: { hi: 'हल', en: 'Plows' } },
    { value: 'sprayers', label: { hi: 'स्प्रेयर', en: 'Sprayers' } },
    { value: 'seeders', label: { hi: 'बीज बोने वाले', en: 'Seeders' } },
    { value: 'irrigation', label: { hi: 'सिंचाई उपकरण', en: 'Irrigation Equipment' } }
  ];

  const locations = [
    { value: 'all', label: { hi: 'सभी स्थान', en: 'All Locations' } },
    { value: 'punjab', label: { hi: 'पंजाब', en: 'Punjab' } },
    { value: 'haryana', label: { hi: 'हरियाणा', en: 'Haryana' } },
    { value: 'uttar-pradesh', label: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' } },
    { value: 'rajasthan', label: { hi: 'राजस्थान', en: 'Rajasthan' } },
    { value: 'gujarat', label: { hi: 'गुजरात', en: 'Gujarat' } }
  ];

  const priceRanges = [
    { value: 'all', label: { hi: 'सभी कीमतें', en: 'All Prices' } },
    { value: 'low', label: { hi: '₹0 - ₹500', en: '₹0 - ₹500' } },
    { value: 'medium', label: { hi: '₹500 - ₹2000', en: '₹500 - ₹2000' } },
    { value: 'high', label: { hi: '₹2000+', en: '₹2000+' } }
  ];

  const popularEquipment = [
    {
      id: 1,
      name: { hi: 'महिंद्रा 575 DI ट���रैक्टर', en: 'Mahindra 575 DI Tractor' },
      category: 'tractors',
      image: '/api/placeholder/300/200',
      buyPrice: 850000,
      rentPrice: 1500,
      rentType: 'day',
      rating: 4.8,
      reviews: 156,
      location: { hi: 'पंजाब', en: 'Punjab' },
      available: true,
      delivery: true,
      warranty: { hi: '2 साल', en: '2 years' },
      features: [
        { hi: '57 HP इंजन', en: '57 HP Engine' },
        { hi: 'पावर स्टीयरिंग', en: 'Power Steering' },
        { hi: 'डुअल क्लच', en: 'Dual Clutch' }
      ],
      owner: { hi: 'राम किसान रेंटल्स', en: 'Ram Kisan Rentals' },
      phone: '+91-9876543210'
    },
    {
      id: 2,
      name: { hi: 'जॉन डीयर कंबाइन हार्वेस्टर', en: 'John Deere Combine Harvester' },
      category: 'harvesters',
      image: '/api/placeholder/300/200',
      buyPrice: 2500000,
      rentPrice: 5000,
      rentType: 'day',
      rating: 4.9,
      reviews: 89,
      location: { hi: 'हरियाणा', en: 'Haryana' },
      available: true,
      delivery: true,
      warranty: { hi: '3 साल', en: '3 years' },
      features: [
        { hi: 'ऑटो कटिंग', en: 'Auto Cutting' },
        { hi: 'GPS ट्रैकिंग', en: 'GPS Tracking' },
        { hi: '20 फीट कटर', en: '20 ft Cutter' }
      ],
      owner: { hi: 'सिंह एग्री सर्विसेज', en: 'Singh Agri Services' },
      phone: '+91-9876543211'
    },
    {
      id: 3,
      name: { hi: 'होंडा पावर टिलर', en: 'Honda Power Tiller' },
      category: 'tillers',
      image: '/api/placeholder/300/200',
      buyPrice: 125000,
      rentPrice: 800,
      rentType: 'day',
      rating: 4.6,
      reviews: 234,
      location: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' },
      available: true,
      delivery: false,
      warranty: { hi: '1 साल', en: '1 year' },
      features: [
        { hi: '8 HP इंजन', en: '8 HP Engine' },
        { hi: 'रिवर्स गियर', en: 'Reverse Gear' },
        { hi: 'एडजस्टेबल हैंडल', en: 'Adjustable Handle' }
      ],
      owner: { hi: 'पटेल मशीनरी', en: 'Patel Machinery' },
      phone: '+91-9876543212'
    },
    {
      id: 4,
      name: { hi: 'स्वराज 855 FE ट्रैक्टर', en: 'Swaraj 855 FE Tractor' },
      category: 'tractors',
      image: '/api/placeholder/300/200',
      buyPrice: 950000,
      rentPrice: 1800,
      rentType: 'day',
      rating: 4.7,
      reviews: 198,
      location: { hi: 'पंजाब', en: 'Punjab' },
      available: true,
      delivery: true,
      warranty: { hi: '2 साल', en: '2 years' },
      features: [
        { hi: '55 HP इंजन', en: '55 HP Engine' },
        { hi: 'हाइड्रोलिक लिफ्ट', en: 'Hydraulic Lift' },
        { hi: 'कंफर्ट सीट', en: 'Comfort Seat' }
      ],
      owner: { hi: 'गुर्जर फार्म सप्लाई', en: 'Gurjar Farm Supply' },
      phone: '+91-9876543213'
    }
  ];

  const categoryStats = [
    { category: { hi: 'ट्रैक्टर', en: 'Tractors' }, count: 145, icon: '🚜', available: 89 },
    { category: { hi: 'हार्वेस्टर', en: 'Harvesters' }, count: 67, icon: '🌾', available: 34 },
    { category: { hi: 'टिलर', en: 'Tillers' }, count: 89, icon: '⚙️', available: 67 },
    { category: { hi: 'स्प्रेयर', en: 'Sprayers' }, count: 123, icon: '💨', available: 98 },
    { category: { hi: 'बीज बोने वाले', en: 'Seeders' }, count: 76, icon: '🌱', available: 45 },
    { category: { hi: 'सिंचाई उपकरण', en: 'Irrigation' }, count: 234, icon: '💧', available: 189 }
  ];

  const featuredDeals = [
    {
      title: { hi: 'सब्सिडी ऑफर', en: 'Subsidy Offer' },
      description: { hi: 'सरकारी सब्सिडी के साथ 40% तक बचत', en: 'Save up to 40% with government subsidy' },
      color: 'bg-green-500'
    },
    {
      title: { hi: 'मुफ्त डिलीवरी', en: 'Free Delivery' },
      description: { hi: '50km तक मुफ्त डिलीवरी', en: 'Free delivery up to 50km' },
      color: 'bg-blue-500'
    },
    {
      title: { hi: 'EMI विकल्प', en: 'EMI Options' },
      description: { hi: '0% ब्याज पर EMI उपलब्ध', en: '0% interest EMI available' },
      color: 'bg-purple-500'
    }
  ];

  const filteredEquipment = popularEquipment.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.location.en.toLowerCase().includes(selectedLocation);
    const matchesSearch = searchTerm === '' || 
      item.name.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.en.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-farm-50 py-8">
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

        {/* Featured Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {featuredDeals.map((deal, index) => (
            <div key={index} className={`${deal.color} text-white p-4 rounded-lg text-center`}>
              <h3 className="font-bold text-lg mb-1">
                {deal.title[language as keyof typeof deal.title]}
              </h3>
              <p className="text-sm opacity-90">
                {deal.description[language as keyof typeof deal.description]}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-farm-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="border-farm-300">
                  <SelectValue placeholder={content[language as keyof typeof content].allPrices} />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label[language as keyof typeof range.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Category Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6">
            {content[language as keyof typeof content].allCategories}
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
                  <p className="text-xs text-farm-600">{stat.count} total</p>
                  <p className="text-xs text-green-600">{stat.available} available</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Equipment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6">
            {content[language as keyof typeof content].popular}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEquipment.map((equipment) => (
              <Card key={equipment.id} className="border-farm-200 hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="bg-gradient-to-r from-orange-400 to-farm-400 h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
                      <Wrench className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-farm-700 mb-1">
                          {equipment.name[language as keyof typeof equipment.name]}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-harvest-400 fill-current mr-1" />
                            <span className="text-sm font-medium">{equipment.rating}</span>
                          </div>
                          <span className="text-sm text-farm-600">({equipment.reviews} {content[language as keyof typeof content].reviews})</span>
                        </div>
                        <div className="flex items-center text-sm text-farm-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {equipment.location[language as keyof typeof equipment.location]}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-farm-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-farm-700">₹{equipment.rentPrice.toLocaleString()}</div>
                        <div className="text-sm text-farm-600">{content[language as keyof typeof content].perDay}</div>
                        <Button size="sm" className="w-full mt-2 bg-farm-600 hover:bg-farm-700">
                          {content[language as keyof typeof content].rent}
                        </Button>
                      </div>
                      <div className="bg-harvest-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-farm-700">₹{(equipment.buyPrice / 100000).toFixed(1)}L</div>
                        <div className="text-sm text-farm-600">{content[language as keyof typeof content].buy}</div>
                        <Button size="sm" variant="outline" className="w-full mt-2 border-farm-300 text-farm-700">
                          {content[language as keyof typeof content].contact}
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-farm-700 mb-2">{content[language as keyof typeof content].features}:</h4>
                      <div className="flex flex-wrap gap-1">
                        {equipment.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature[language as keyof typeof feature]}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        {equipment.available && (
                          <span className="flex items-center text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            {content[language as keyof typeof content].available}
                          </span>
                        )}
                        {equipment.delivery && (
                          <span className="flex items-center text-blue-600">
                            <Truck className="h-3 w-3 mr-1" />
                            {content[language as keyof typeof content].delivery}
                          </span>
                        )}
                        <span className="flex items-center text-farm-600">
                          <Shield className="h-3 w-3 mr-1" />
                          {equipment.warranty[language as keyof typeof equipment.warranty]}
                        </span>
                      </div>
                      <div className="flex items-center text-farm-600">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="text-xs">{equipment.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-farm-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-farm-600">
                          {equipment.owner[language as keyof typeof equipment.owner]}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-harvest-500 hover:bg-harvest-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {content[language as keyof typeof content].bookNow}
                          </Button>
                          <Button size="sm" variant="outline" className="border-farm-300 text-farm-700">
                            {content[language as keyof typeof content].compare}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Information Section */}
        <Card className="border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-700">
              <AlertCircle className="mr-2 h-5 w-5" />
              {language === 'hi' ? 'महत्वपूर��ण जानकारी' : 'Important Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-farm-700 mb-2">
                  {language === 'hi' ? 'किराये की शर्तें' : 'Rental Terms'}
                </h4>
                <ul className="space-y-1 text-farm-600 text-sm">
                  <li>• {language === 'hi' ? 'एडवांस पेमेंट आवश्यक' : 'Advance payment required'}</li>
                  <li>• {language === 'hi' ? 'पहचान प्रमाण की आवश्यकता' : 'ID proof required'}</li>
                  <li>• {language === 'hi' ? 'न्यूनतम किराया अवधि: 1 दिन' : 'Minimum rental period: 1 day'}</li>
                  <li>• {language === 'hi' ? 'ईंधन अलग से देना होगा' : 'Fuel to be provided separately'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-farm-700 mb-2">
                  {language === 'hi' ? 'सरकारी सब्सिडी' : 'Government Subsidy'}
                </h4>
                <ul className="space-y-1 text-farm-600 text-sm">
                  <li>• {language === 'hi' ? 'ट्रैक्टर पर 25% तक सब्सिडी' : 'Up to 25% subsidy on tractors'}</li>
                  <li>• {language === 'hi' ? 'कृषि यंत्रों पर 40% सब्सिडी' : '40% subsidy on farm equipment'}</li>
                  <li>• {language === 'hi' ? 'महिला किसानों को अतिरिक्त 5%' : 'Additional 5% for women farmers'}</li>
                  <li>• {language === 'hi' ? 'SC/ST को अतिरिक्त लाभ' : 'Additional benefits for SC/ST'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmingTools;
