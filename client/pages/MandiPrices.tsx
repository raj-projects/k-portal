import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  RefreshCw,
  BarChart3,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MandiPrices = () => {
  const [language, setLanguage] = useState('hi'); // Hindi as default
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const content = {
    hi: {
      title: 'मंडी भाव',
      subtitle: 'देश भर की मंडियों के ताज़ा भाव',
      search: 'फसल खोजें',
      filter: 'फिल्टर',
      allCrops: 'सभी फसलें',
      allStates: 'सभी राज्य',
      crop: 'फसल',
      mandi: 'मंडी',
      state: 'राज्य',
      price: 'भाव (₹/क्विंटल)',
      change: 'बदलाव',
      lastUpdated: 'अंतिम अपडेट',
      viewTrend: 'ट्रेंड देखें',
      refresh: 'रिफ्रेश',
      priceAlert: 'भाव अलर्ट',
      compareMarkets: 'मंडी तुलना'
    },
    en: {
      title: 'Mandi Prices',
      subtitle: 'Latest prices from markets across India',
      search: 'Search Crops',
      filter: 'Filter',
      allCrops: 'All Crops',
      allStates: 'All States',
      crop: 'Crop',
      mandi: 'Market',
      state: 'State',
      price: 'Price (₹/Quintal)',
      change: 'Change',
      lastUpdated: 'Last Updated',
      viewTrend: 'View Trend',
      refresh: 'Refresh',
      priceAlert: 'Price Alert',
      compareMarkets: 'Compare Markets'
    }
  };

  const crops = [
    { value: 'all', label: { hi: 'सभी फसलें', en: 'All Crops' } },
    { value: 'wheat', label: { hi: 'गेहूं', en: 'Wheat' } },
    { value: 'rice', label: { hi: 'चावल', en: 'Rice' } },
    { value: 'maize', label: { hi: 'मक्का', en: 'Maize' } },
    { value: 'sugarcane', label: { hi: 'गन्ना', en: 'Sugarcane' } },
    { value: 'cotton', label: { hi: 'कपास', en: 'Cotton' } },
    { value: 'soybean', label: { hi: 'सोयाबीन', en: 'Soybean' } }
  ];

  const states = [
    { value: 'all', label: { hi: 'सभी राज्य', en: 'All States' } },
    { value: 'punjab', label: { hi: 'पंजाब', en: 'Punjab' } },
    { value: 'haryana', label: { hi: 'हरियाणा', en: 'Haryana' } },
    { value: 'uttar-pradesh', label: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' } },
    { value: 'madhya-pradesh', label: { hi: 'मध्य प्रदेश', en: 'Madhya Pradesh' } },
    { value: 'rajasthan', label: { hi: 'राजस्थान', en: 'Rajasthan' } },
    { value: 'gujarat', label: { hi: 'गुजरात', en: 'Gujarat' } }
  ];

  const mandiData = [
    {
      crop: { hi: 'गेहूं', en: 'Wheat' },
      mandi: { hi: 'दिल्ली', en: 'Delhi' },
      state: { hi: 'दिल्ली', en: 'Delhi' },
      price: 2150,
      change: 50,
      changePercent: 2.4,
      lastUpdated: '2 घंटे पहले / 2 hours ago'
    },
    {
      crop: { hi: 'चावल', en: 'Rice' },
      mandi: { hi: 'अमृतसर', en: 'Amritsar' },
      state: { hi: 'पंजाब', en: 'Punjab' },
      price: 2850,
      change: -25,
      changePercent: -0.9,
      lastUpdated: '1 घंटा पह��े / 1 hour ago'
    },
    {
      crop: { hi: 'मक्का', en: 'Maize' },
      mandi: { hi: 'इंदौर', en: 'Indore' },
      state: { hi: 'मध्य प्रदेश', en: 'Madhya Pradesh' },
      price: 1920,
      change: 75,
      changePercent: 4.1,
      lastUpdated: '3 घंटे पहले / 3 hours ago'
    },
    {
      crop: { hi: 'सोयाबीन', en: 'Soybean' },
      mandi: { hi: 'नागपुर', en: 'Nagpur' },
      state: { hi: 'महाराष्ट्र', en: 'Maharashtra' },
      price: 4250,
      change: 100,
      changePercent: 2.4,
      lastUpdated: '1 घंटा पहले / 1 hour ago'
    },
    {
      crop: { hi: 'कपास', en: 'Cotton' },
      mandi: { hi: 'राजकोट', en: 'Rajkot' },
      state: { hi: 'गुजरात', en: 'Gujarat' },
      price: 5850,
      change: -150,
      changePercent: -2.5,
      lastUpdated: '4 घंटे पहले / 4 hours ago'
    },
    {
      crop: { hi: 'गन्ना', en: 'Sugarcane' },
      mandi: { hi: 'मेरठ', en: 'Meerut' },
      state: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' },
      price: 325,
      change: 10,
      changePercent: 3.2,
      lastUpdated: '2 घंटे पहले / 2 hours ago'
    }
  ];

  const topPerformers = [
    { crop: { hi: 'मक्का', en: 'Maize' }, change: 4.1, price: 1920 },
    { crop: { hi: 'गन्ना', en: 'Sugarcane' }, change: 3.2, price: 325 },
    { crop: { hi: 'गेहूं', en: 'Wheat' }, change: 2.4, price: 2150 }
  ];

  const topLosers = [
    { crop: { hi: 'कपास', en: 'Cotton' }, change: -2.5, price: 5850 },
    { crop: { hi: 'चावल', en: 'Rice' }, change: -0.9, price: 2850 }
  ];

  const filteredData = mandiData.filter(item => {
    const matchesCrop = selectedCrop === 'all' || item.crop.en.toLowerCase().includes(selectedCrop);
    const matchesState = selectedState === 'all' || item.state.en.toLowerCase().includes(selectedState);
    const matchesSearch = searchTerm === '' ||
      item.crop.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.crop.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mandi.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mandi.en.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCrop && matchesState && matchesSearch;
  });

  // Auto-refresh mandi prices for live market data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, this would trigger API calls to update mandi prices
    }, 300000); // 5 minutes = 300000ms for market data (more frequent than weather)
    return () => clearInterval(interval);
  }, []);

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

        {/* Top Performers & Losers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-farm-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <TrendingUp className="mr-2 h-5 w-5" />
                {language === 'hi' ? 'मजबूत फसलें' : 'Top Gainers'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium text-farm-700">
                      {item.crop[language as keyof typeof item.crop]}
                    </span>
                    <div className="text-right">
                      <div className="text-green-600 font-bold">+{item.change}%</div>
                      <div className="text-sm text-farm-600">₹{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <TrendingDown className="mr-2 h-5 w-5" />
                {language === 'hi' ? 'कमजोर फसलें' : 'Top Losers'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topLosers.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="font-medium text-farm-700">
                      {item.crop[language as keyof typeof item.crop]}
                    </span>
                    <div className="text-right">
                      <div className="text-red-600 font-bold">{item.change}%</div>
                      <div className="text-sm text-farm-600">₹{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-farm-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-farm-500" />
                <Input
                  placeholder={content[language as keyof typeof content].search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-farm-300"
                />
              </div>
              
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="border-farm-300">
                  <SelectValue placeholder={content[language as keyof typeof content].allCrops} />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label[language as keyof typeof crop.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="border-farm-300">
                  <SelectValue placeholder={content[language as keyof typeof content].allStates} />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label[language as keyof typeof state.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-farm-600 hover:bg-farm-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                {content[language as keyof typeof content].refresh}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Price Table */}
        <Card className="border-farm-200">
          <CardHeader>
            <CardTitle className="text-2xl text-farm-700">
              {language === 'hi' ? 'मंडी भाव सूची' : 'Market Price List'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-farm-200">
                    <th className="text-left py-3 px-2 font-semibold text-farm-700">
                      {content[language as keyof typeof content].crop}
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-farm-700">
                      {content[language as keyof typeof content].mandi}
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-farm-700">
                      {content[language as keyof typeof content].state}
                    </th>
                    <th className="text-right py-3 px-2 font-semibold text-farm-700">
                      {content[language as keyof typeof content].price}
                    </th>
                    <th className="text-right py-3 px-2 font-semibold text-farm-700">
                      {content[language as keyof typeof content].change}
                    </th>
                    <th className="text-center py-3 px-2 font-semibold text-farm-700">
                      {language === 'hi' ? 'कार्य' : 'Action'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-farm-100 hover:bg-farm-50">
                      <td className="py-4 px-2">
                        <div className="font-medium text-farm-700">
                          {item.crop[language as keyof typeof item.crop]}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center text-farm-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.mandi[language as keyof typeof item.mandi]}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-farm-600">
                        {item.state[language as keyof typeof item.state]}
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className="font-bold text-farm-700 text-lg">₹{item.price.toLocaleString()}</div>
                        <div className="text-xs text-farm-500">{item.lastUpdated}</div>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className={`flex items-center justify-end ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <div className="font-bold">
                            {item.change >= 0 ? '+' : ''}{item.change} ({item.changePercent >= 0 ? '+' : ''}{item.changePercent}%)
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <Button size="sm" variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-50">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          {content[language as keyof typeof content].viewTrend}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="mt-8 border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-700">
              <Info className="mr-2 h-5 w-5" />
              {language === 'hi' ? 'जानकारी' : 'Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-farm-700">
              <p>• {language === 'hi' ? 'भाव हर 2 घंटे में अपडेट होते हैं' : 'Prices are updated every 2 hours'}</p>
              <p>• {language === 'hi' ? 'सभी भाव प्रति क्विंटल के हिसाब से हैं' : 'All prices are per quintal'}</p>
              <p>• {language === 'hi' ? 'वास्तविक भाव में थोड़ा अंतर हो सकता है' : 'Actual prices may vary slightly'}</p>
              <p>• {language === 'hi' ? 'अधिक जानकारी के लिए स्थानीय मंडी से संपर्क करें' : 'Contact local mandi for more information'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MandiPrices;
