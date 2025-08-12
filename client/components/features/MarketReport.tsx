import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, BarChart3, Calendar, MapPin, Search, RefreshCw, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MarketPrice {
  id: string;
  commodity: string;
  commodityHindi: string;
  market: string;
  marketHindi: string;
  state: string;
  stateHindi: string;
  variety: string;
  varietyHindi: string;
  grade: string;
  arrivalQuantity: number; // in quintals
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  lastUpdated: string;
  priceChange: number; // percentage change from previous day
  trend: 'up' | 'down' | 'stable';
}

interface MarketTrend {
  commodity: string;
  commodityHindi: string;
  weeklyChange: number;
  monthlyChange: number;
  yearlyChange: number;
  avgPrice: number;
  volume: number;
}

const MarketReport = () => {
  const { language } = useLanguage();
  const [selectedState, setSelectedState] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [marketData, setMarketData] = useState<MarketPrice[]>([]);
  const [trendData, setTrendData] = useState<MarketTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for demonstration
  const mockMarketData: MarketPrice[] = [
    {
      id: '1',
      commodity: 'Wheat',
      commodityHindi: 'गेहूं',
      market: 'Delhi',
      marketHindi: 'दिल्ली',
      state: 'Delhi',
      stateHindi: 'दिल्ली',
      variety: 'HD-2967',
      varietyHindi: 'एचडी-2967',
      grade: 'FAQ',
      arrivalQuantity: 250,
      minPrice: 1950,
      maxPrice: 2100,
      modalPrice: 2025,
      lastUpdated: '2024-01-15',
      priceChange: 2.5,
      trend: 'up'
    },
    {
      id: '2',
      commodity: 'Rice',
      commodityHindi: 'चावल',
      market: 'Karnal',
      marketHindi: 'करनाल',
      state: 'Haryana',
      stateHindi: 'हरियाणा',
      variety: 'Basmati',
      varietyHindi: 'बासमती',
      grade: 'Super',
      arrivalQuantity: 180,
      minPrice: 3800,
      maxPrice: 4200,
      modalPrice: 4000,
      lastUpdated: '2024-01-15',
      priceChange: -1.2,
      trend: 'down'
    },
    {
      id: '3',
      commodity: 'Cotton',
      commodityHindi: 'कपास',
      market: 'Rajkot',
      marketHindi: 'राजकोट',
      state: 'Gujarat',
      stateHindi: 'गुजरात',
      variety: 'Shankar-6',
      varietyHindi: 'शंकर-6',
      grade: 'S-6',
      arrivalQuantity: 120,
      minPrice: 6800,
      maxPrice: 7200,
      modalPrice: 7050,
      lastUpdated: '2024-01-15',
      priceChange: 3.8,
      trend: 'up'
    },
    {
      id: '4',
      commodity: 'Sugarcane',
      commodityHindi: 'गन्ना',
      market: 'Muzaffarnagar',
      marketHindi: 'मुजफ्फरनगर',
      state: 'Uttar Pradesh',
      stateHindi: 'उत्तर प्रदेश',
      variety: 'Co-238',
      varietyHindi: 'को-238',
      grade: 'Common',
      arrivalQuantity: 500,
      minPrice: 320,
      maxPrice: 350,
      modalPrice: 335,
      lastUpdated: '2024-01-15',
      priceChange: 0.8,
      trend: 'stable'
    },
    {
      id: '5',
      commodity: 'Soybean',
      commodityHindi: 'सोयाबीन',
      market: 'Indore',
      marketHindi: 'इंदौर',
      state: 'Madhya Pradesh',
      stateHindi: 'मध्य प्रदेश',
      variety: 'Yellow',
      varietyHindi: 'पीला',
      grade: 'FAQ',
      arrivalQuantity: 300,
      minPrice: 4200,
      maxPrice: 4500,
      modalPrice: 4350,
      lastUpdated: '2024-01-15',
      priceChange: 1.5,
      trend: 'up'
    }
  ];

  const mockTrendData: MarketTrend[] = [
    {
      commodity: 'Wheat',
      commodityHindi: 'गेहूं',
      weeklyChange: 2.1,
      monthlyChange: 5.8,
      yearlyChange: 12.3,
      avgPrice: 2025,
      volume: 15000
    },
    {
      commodity: 'Rice',
      commodityHindi: 'चावल',
      weeklyChange: -0.8,
      monthlyChange: 3.2,
      yearlyChange: 8.7,
      avgPrice: 4000,
      volume: 12000
    },
    {
      commodity: 'Cotton',
      commodityHindi: 'कपास',
      weeklyChange: 4.2,
      monthlyChange: 8.1,
      yearlyChange: 15.6,
      avgPrice: 7050,
      volume: 8000
    }
  ];

  const states = [
    { value: 'punjab', label: 'Punjab', labelHindi: 'पंजाब' },
    { value: 'haryana', label: 'Haryana', labelHindi: 'हरियाणा' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh', labelHindi: 'उत्तर प्रदेश' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh', labelHindi: 'मध्य प्रदेश' },
    { value: 'gujarat', label: 'Gujarat', labelHindi: 'गुजरात' },
    { value: 'maharashtra', label: 'Maharashtra', labelHindi: 'महाराष्ट्र' },
    { value: 'rajasthan', label: 'Rajasthan', labelHindi: 'राजस्थान' }
  ];

  const commodities = [
    { value: 'wheat', label: 'Wheat', labelHindi: 'गेहूं' },
    { value: 'rice', label: 'Rice', labelHindi: 'चावल' },
    { value: 'cotton', label: 'Cotton', labelHindi: 'कपास' },
    { value: 'sugarcane', label: 'Sugarcane', labelHindi: 'गन्ना' },
    { value: 'soybean', label: 'Soybean', labelHindi: 'सोयाबीन' },
    { value: 'maize', label: 'Maize', labelHindi: 'मक्का' }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setMarketData(mockMarketData);
      setTrendData(mockTrendData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredData = marketData.filter(item => {
    const matchesState = !selectedState || selectedState === 'all' || item.state.toLowerCase().includes(selectedState);
    const matchesCommodity = !selectedCommodity || selectedCommodity === 'all' || item.commodity.toLowerCase().includes(selectedCommodity);
    const matchesMarket = !selectedMarket || item.market.toLowerCase().includes(selectedMarket);
    const matchesSearch = !searchTerm || 
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodityHindi.includes(searchTerm) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marketHindi.includes(searchTerm);
    
    return matchesState && matchesCommodity && matchesMarket && matchesSearch;
  });

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Commodity,Market,State,Variety,Min Price,Max Price,Modal Price,Arrival Quantity,Price Change\n" +
      filteredData.map(item => 
        `${item.commodity},${item.market},${item.state},${item.variety},${item.minPrice},${item.maxPrice},${item.modalPrice},${item.arrivalQuantity},${item.priceChange}%`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "market_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-kisan-primary">
              <BarChart3 className="h-6 w-6" />
              {language === 'hi' ? 'बाजार रिपोर्ट' : 'Market Report'}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={refreshData} variant="outline" size="sm" disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {language === 'hi' ? 'रिफ्रेश' : 'Refresh'}
              </Button>
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="h-4 w-4" />
                {language === 'hi' ? 'डाउनलोड' : 'Export'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-kisan-text-secondary">
            <span>
              {language === 'hi' ? 'अंतिम अपडेट:' : 'Last Updated:'} {lastUpdated.toLocaleTimeString()}
            </span>
            <span>
              {language === 'hi' ? 'कुल रिकॉर्ड:' : 'Total Records:'} {filteredData.length}
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'राज्य चुनें' : 'Select State'}
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'सभी राज्य' : 'All States'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'hi' ? 'सभी राज्य' : 'All States'}
                  </SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {language === 'hi' ? state.labelHindi : state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'फसल चुनें' : 'Select Commodity'}
              </label>
              <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'सभी फसलें' : 'All Commodities'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'hi' ? 'सभी फसलें' : 'All Commodities'}
                  </SelectItem>
                  {commodities.map((commodity) => (
                    <SelectItem key={commodity.value} value={commodity.value}>
                      {language === 'hi' ? commodity.labelHindi : commodity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'मंडी खोजें' : 'Search Market'}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={language === 'hi' ? 'मंडी या फसल खोजें' : 'Search market or commodity'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'फिल्टर रीसेट' : 'Reset Filters'}
              </label>
              <Button 
                onClick={() => {
                  setSelectedState('');
                  setSelectedCommodity('');
                  setSelectedMarket('');
                  setSearchTerm('');
                }} 
                variant="outline" 
                className="w-full"
              >
                {language === 'hi' ? 'सभी साफ करें' : 'Clear All'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {trendData.map((trend, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {language === 'hi' ? trend.commodityHindi : trend.commodity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kisan-text-secondary">
                    {language === 'hi' ? 'औसत मूल्य:' : 'Avg Price:'}
                  </span>
                  <span className="font-semibold">₹{trend.avgPrice}/quintal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kisan-text-secondary">
                    {language === 'hi' ? 'साप्ताहिक:' : 'Weekly:'}
                  </span>
                  <Badge variant={trend.weeklyChange >= 0 ? "default" : "destructive"} className="text-xs">
                    {trend.weeklyChange >= 0 ? '+' : ''}{trend.weeklyChange}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kisan-text-secondary">
                    {language === 'hi' ? 'मासिक:' : 'Monthly:'}
                  </span>
                  <Badge variant={trend.monthlyChange >= 0 ? "default" : "destructive"} className="text-xs">
                    {trend.monthlyChange >= 0 ? '+' : ''}{trend.monthlyChange}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-kisan-text-secondary">
                    {language === 'hi' ? 'वार्षिक:' : 'Yearly:'}
                  </span>
                  <Badge variant={trend.yearlyChange >= 0 ? "default" : "destructive"} className="text-xs">
                    {trend.yearlyChange >= 0 ? '+' : ''}{trend.yearlyChange}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-kisan-primary">
            {language === 'hi' ? 'आज के मंडी भाव' : "Today's Market Prices"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-kisan-primary" />
              <p className="text-kisan-text-secondary">
                {language === 'hi' ? 'डेटा लोड हो रहा है...' : 'Loading market data...'}
              </p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-8 text-kisan-text-secondary">
              {language === 'hi' ? 'कोई डेटा नहीं मिला' : 'No data found'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-kisan-text-primary text-lg">
                          {language === 'hi' ? item.commodityHindi : item.commodity}
                        </h3>
                        <p className="text-sm text-kisan-text-secondary">
                          {language === 'hi' ? item.varietyHindi : item.variety} ({item.grade})
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-kisan-text-secondary">
                            {language === 'hi' ? item.marketHindi : item.market}, {language === 'hi' ? item.stateHindi : item.state}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-kisan-text-secondary mb-1">
                          {language === 'hi' ? 'मूल्य रेंज' : 'Price Range'}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs">{language === 'hi' ? 'न्यूनतम:' : 'Min:'}</span>
                            <span className="text-xs font-medium">₹{item.minPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs">{language === 'hi' ? 'अधिकतम:' : 'Max:'}</span>
                            <span className="text-xs font-medium">₹{item.maxPrice}</span>
                          </div>
                          <div className="flex justify-between border-t pt-1">
                            <span className="text-xs font-medium">{language === 'hi' ? 'मोडल:' : 'Modal:'}</span>
                            <span className="text-sm font-bold text-kisan-primary">₹{item.modalPrice}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-kisan-text-secondary mb-1">
                          {language === 'hi' ? 'आगमन & रुझान' : 'Arrival & Trend'}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs">{language === 'hi' ? 'आगमन:' : 'Arrival:'}</span>
                            <span className="text-xs font-medium">{item.arrivalQuantity} Qt</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs">{language === 'hi' ? 'परिवर्तन:' : 'Change:'}</span>
                            <div className="flex items-center gap-1">
                              {item.trend === 'up' ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : item.trend === 'down' ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : (
                                <Calendar className="h-3 w-3 text-gray-500" />
                              )}
                              <span className={`text-xs font-medium ${
                                item.trend === 'up' ? 'text-green-600' :
                                item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {item.priceChange >= 0 ? '+' : ''}{item.priceChange}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge 
                          variant={item.trend === 'up' ? "default" : item.trend === 'down' ? "destructive" : "secondary"}
                          className="mb-2"
                        >
                          {language === 'hi' ? (
                            item.trend === 'up' ? 'तेजी' : 
                            item.trend === 'down' ? 'मंदी' : 'स्थिर'
                          ) : (
                            item.trend === 'up' ? 'Bullish' : 
                            item.trend === 'down' ? 'Bearish' : 'Stable'
                          )}
                        </Badge>
                        <div className="text-xs text-kisan-text-secondary">
                          {language === 'hi' ? 'अपडेट:' : 'Updated:'} {item.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketReport;
