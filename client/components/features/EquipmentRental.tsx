import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tractor, MapPin, Clock, DollarSign, Calendar, Star, Phone, Filter, Search, Truck, Wrench } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Equipment {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  categoryHindi: string;
  description: string;
  descriptionHindi: string;
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
  availability: 'available' | 'rented' | 'maintenance';
  location: string;
  locationHindi: string;
  distance: number; // km from user
  owner: {
    name: string;
    phone: string;
    rating: number;
    totalRentals: number;
  };
  specifications: { [key: string]: string };
  specificationsHindi: { [key: string]: string };
  images: string[];
  features: string[];
  featuresHindi: string[];
}

interface RentalBooking {
  equipmentId: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalCost: number;
  purpose: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
}

const equipmentDatabase: Equipment[] = [
  {
    id: 'tractor-1',
    name: 'Mahindra 575 DI Tractor',
    nameHindi: 'महिंद्रा 575 डीआई ट्रैक्टर',
    category: 'tractors',
    categoryHindi: 'ट्रैक्टर',
    description: '55 HP powerful tractor suitable for all farming operations',
    descriptionHindi: '55 एचपी शक्तिशाली ट्रैक्टर सभी कृषि कार्यों के लिए उपयुक्त',
    hourlyRate: 800,
    dailyRate: 4500,
    monthlyRate: 90000,
    availability: 'available',
    location: 'Ludhiana, Punjab',
    locationHindi: 'लुधियाना, पंजाब',
    distance: 5.2,
    owner: {
      name: 'Jaswinder Singh',
      phone: '+91 98765 43210',
      rating: 4.8,
      totalRentals: 156
    },
    specifications: {
      'Engine Power': '55 HP',
      'Fuel Type': 'Diesel',
      'Gears': '12 Forward + 3 Reverse',
      'Weight': '2200 kg'
    },
    specificationsHindi: {
      'इंजन पावर': '55 एचपी',
      'ईंधन प्रकार': 'डीजल',
      'गियर': '12 फॉ��वर्ड + 3 रिवर्स',
      'वजन': '2200 किग्रा'
    },
    images: [],
    features: ['Power Steering', 'Hydraulic Lifting', 'PTO Available'],
    featuresHindi: ['पावर स्टीयरिंग', 'हाइड्रोलिक लिफ्टिंग', 'पीटीओ उपलब्ध']
  },
  {
    id: 'harvester-1',
    name: 'John Deere W70 Combine Harvester',
    nameHindi: 'जॉन डियर W70 कंबाइन हार्वेस्टर',
    category: 'harvesters',
    categoryHindi: 'हार्वेस्टर',
    description: 'Efficient combine harvester for wheat and rice',
    descriptionHindi: 'गेहूं और चावल के लिए कुशल कंबाइन हार्वेस्टर',
    hourlyRate: 2500,
    dailyRate: 15000,
    monthlyRate: 300000,
    availability: 'available',
    location: 'Karnal, Haryana',
    locationHindi: 'करनाल, हरियाणा',
    distance: 12.8,
    owner: {
      name: 'Ramesh Kumar',
      phone: '+91 87654 32109',
      rating: 4.6,
      totalRentals: 89
    },
    specifications: {
      'Cutting Width': '3.5 meters',
      'Tank Capacity': '3500 liters',
      'Engine': '130 HP',
      'Cleaning': 'Twin rotary screens'
    },
    specificationsHindi: {
      'कटाई चौड़ाई': '3.5 मीटर',
      'टैंक क्षमता': '3500 लीटर',
      'इंजन': '130 एचपी',
      'सफाई': 'ट्विन रोटरी स्क्रीन'
    },
    images: [],
    features: ['GPS Navigation', 'Auto Height Control', 'Grain Loss Monitor'],
    featuresHindi: ['जीपीएस नेवीगेशन', 'ऑटो हाइट कंट्रोल', 'ग्रेन लॉस मॉनिटर']
  },
  {
    id: 'planter-1',
    name: 'Seed Drill Planter',
    nameHindi: 'सीड ड्रिल प्लांटर',
    category: 'planters',
    categoryHindi: 'बुआई मशीन',
    description: 'Precision seed planter for accurate sowing',
    descriptionHindi: 'सटीक बुआई के लिए प्रिसिजन सीड प्लांटर',
    hourlyRate: 600,
    dailyRate: 3500,
    monthlyRate: 70000,
    availability: 'rented',
    location: 'Amritsar, Punjab',
    locationHindi: 'अमृतसर, पंजाब',
    distance: 8.5,
    owner: {
      name: 'Gurpreet Singh',
      phone: '+91 76543 21098',
      rating: 4.7,
      totalRentals: 203
    },
    specifications: {
      'Working Width': '2.5 meters',
      'Rows': '11 rows',
      'Seed Box': '150 kg capacity',
      'Depth Control': 'Hydraulic'
    },
    specificationsHindi: {
      'कार्य चौड़ाई': '2.5 मीटर',
      'पंक्तियां': '11 पंक्तियां',
      'बीज बॉक्स': '150 किग्रा क्षमता',
      'गहराई नियंत्रण': 'हाइड्रोलिक'
    },
    images: [],
    features: ['Uniform Depth', 'Row to Row Spacing', 'Fertilizer Box'],
    featuresHindi: ['समान गहराई', 'पंक्ति दूरी', 'उर्वरक बॉक्स']
  },
  {
    id: 'sprayer-1',
    name: 'Boom Sprayer 500L',
    nameHindi: 'बूम स्प्रेयर 500L',
    category: 'sprayers',
    categoryHindi: 'छिड़काव मशीन',
    description: 'High capacity boom sprayer for pesticide application',
    descriptionHindi: 'कीटनाशक छिड़काव के लिए उच्च क्षमता बूम स्प्रेयर',
    hourlyRate: 400,
    dailyRate: 2500,
    monthlyRate: 50000,
    availability: 'available',
    location: 'Bathinda, Punjab',
    locationHindi: 'भटिंडा, पंजाब',
    distance: 15.3,
    owner: {
      name: 'Harinder Kaur',
      phone: '+91 65432 10987',
      rating: 4.9,
      totalRentals: 167
    },
    specifications: {
      'Tank Capacity': '500 liters',
      'Boom Width': '12 meters',
      'Pump Type': 'Diaphragm',
      'Nozzles': '24 nos'
    },
    specificationsHindi: {
      'टैंक क्षमता': '500 लीटर',
      'बूम चौड़ाई': '12 मीटर',
      'पंप प्रकार': 'डायफ्राम',
      'नोजल': '24 नंबर'
    },
    images: [],
    features: ['Pressure Control', 'Anti-drip System', 'Easy Fill'],
    featuresHindi: ['प्रेशर कंट्रोल', 'एंटी-ड्रिप सिस्टम', 'आसान भराई']
  },
  {
    id: 'thresher-1',
    name: 'Paddy Thresher Machine',
    nameHindi: 'धान थ्रेशर मशीन',
    category: 'threshers',
    categoryHindi: 'थ्रेशर',
    description: 'Efficient paddy threshing machine',
    descriptionHindi: 'कुशल धान थ्रेशिंग मशीन',
    hourlyRate: 500,
    dailyRate: 3000,
    monthlyRate: 60000,
    availability: 'maintenance',
    location: 'Patiala, Punjab',
    locationHindi: 'पटियाला, पंजाब',
    distance: 18.7,
    owner: {
      name: 'Balwinder Singh',
      phone: '+91 54321 09876',
      rating: 4.5,
      totalRentals: 134
    },
    specifications: {
      'Capacity': '8-10 quintals/hour',
      'Power Required': '15 HP',
      'Cleaning': '3 stage cleaning',
      'Moisture': 'Up to 25%'
    },
    specificationsHindi: {
      'क्षमता': '8-10 क्विंटल/घंटा',
      'पावर आवश्यक': '15 एचपी',
      'सफाई': '3 चरण सफाई',
      'नमी': '25% तक'
    },
    images: [],
    features: ['Clean Grain Output', 'Low Grain Damage', 'Portable'],
    featuresHindi: ['साफ अनाज उत्पादन', 'कम अनाज नुकसान', 'पोर्टेबल']
  }
];

const categories = [
  { value: 'tractors', label: 'Tractors', labelHindi: 'ट्रैक्टर' },
  { value: 'harvesters', label: 'Harvesters', labelHindi: 'हार्वेस्टर' },
  { value: 'planters', label: 'Planters', labelHindi: 'बुआई मशीन' },
  { value: 'sprayers', label: 'Sprayers', labelHindi: 'छिड़काव मशीन' },
  { value: 'threshers', label: 'Threshers', labelHindi: 'थ्रेशर' },
  { value: 'tillers', label: 'Tillers', labelHindi: 'टिलर' }
];

const EquipmentRental = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    purpose: '',
    duration: '',
    rentalType: 'daily'
  });

  const filteredEquipment = equipmentDatabase.filter(equipment => {
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || equipment.category === selectedCategory;
    const matchesLocation = !selectedLocation || equipment.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSearch = !searchTerm || 
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.nameHindi.includes(searchTerm) ||
      equipment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.dailyRate - b.dailyRate;
      case 'rating':
        return b.owner.rating - a.owner.rating;
      case 'distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">{language === 'hi' ? 'उपलब्ध' : 'Available'}</Badge>;
      case 'rented':
        return <Badge className="bg-red-100 text-red-800">{language === 'hi' ? 'किराए पर' : 'Rented'}</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">{language === 'hi' ? 'मरम्मत' : 'Maintenance'}</Badge>;
      default:
        return null;
    }
  };

  const calculateTotalCost = () => {
    if (!selectedEquipment || !bookingData.duration) return 0;
    
    const duration = parseInt(bookingData.duration);
    switch (bookingData.rentalType) {
      case 'hourly':
        return selectedEquipment.hourlyRate * duration;
      case 'daily':
        return selectedEquipment.dailyRate * duration;
      case 'monthly':
        return selectedEquipment.monthlyRate * duration;
      default:
        return 0;
    }
  };

  const handleBooking = () => {
    if (!selectedEquipment) return;
    
    const totalCost = calculateTotalCost();
    // Here you would typically make an API call to book the equipment
    alert(language === 'hi' 
      ? `बुकिंग सफल! कुल लागत: ₹${totalCost.toLocaleString('en-IN')}`
      : `Booking successful! Total cost: ₹${totalCost.toLocaleString('en-IN')}`
    );
    setActiveTab('browse');
    setSelectedEquipment(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Tractor className="h-6 w-6" />
            {language === 'hi' ? 'कृषि उपकरण किराया' : 'Equipment Rental'}
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">
            {language === 'hi' ? 'ब्राउज़ करें' : 'Browse'}
          </TabsTrigger>
          <TabsTrigger value="details">
            {language === 'hi' ? 'विवरण' : 'Details'}
          </TabsTrigger>
          <TabsTrigger value="booking">
            {language === 'hi' ? 'बुकिंग' : 'Booking'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-kisan-primary">
                {language === 'hi' ? 'उपकरण खोजें' : 'Find Equipment'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'श्रेणी' : 'Category'}</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {language === 'hi' ? category.labelHindi : category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'स्थान' : 'Location'}</Label>
                  <Input
                    placeholder={language === 'hi' ? 'शहर या क्षेत्र' : 'City or area'}
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'खोजें' : 'Search'}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={language === 'hi' ? 'उपकरण का नाम' : 'Equipment name'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'क्रमबद्ध करें' : 'Sort By'}</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">{language === 'hi' ? 'दूरी' : 'Distance'}</SelectItem>
                      <SelectItem value="price">{language === 'hi' ? 'कीमत' : 'Price'}</SelectItem>
                      <SelectItem value="rating">{language === 'hi' ? 'रेटिंग' : 'Rating'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedLocation('');
                    setSearchTerm('');
                    setSortBy('distance');
                  }}
                  variant="outline"
                >
                  {language === 'hi' ? 'फिल्टर साफ करें' : 'Clear Filters'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredEquipment.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Tractor className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-kisan-text-secondary">
                    {language === 'hi' ? 'कोई उपकरण नहीं मिला' : 'No equipment found'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredEquipment.map((equipment) => (
                <Card key={equipment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-kisan-text-primary">
                            {language === 'hi' ? equipment.nameHindi : equipment.name}
                          </h3>
                          {getAvailabilityBadge(equipment.availability)}
                        </div>
                        <p className="text-kisan-text-secondary mb-3">
                          {language === 'hi' ? equipment.descriptionHindi : equipment.description}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? equipment.locationHindi : equipment.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-kisan-text-secondary">
                              {equipment.distance.toFixed(1)} km away
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {(language === 'hi' ? equipment.featuresHindi : equipment.features).slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'प्रति घंटा:' : 'Per Hour:'}
                            </span>
                            <span className="font-semibold">₹{equipment.hourlyRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'प्रति दिन:' : 'Per Day:'}
                            </span>
                            <span className="font-semibold">₹{equipment.dailyRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'प्रति माह:' : 'Per Month:'}
                            </span>
                            <span className="font-semibold">₹{equipment.monthlyRate.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{equipment.owner.rating}</span>
                            <span className="text-sm text-kisan-text-secondary">
                              ({equipment.owner.totalRentals} {language === 'hi' ? 'किराया' : 'rentals'})
                            </span>
                          </div>
                          <p className="text-sm text-kisan-text-secondary">{equipment.owner.name}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={() => { setSelectedEquipment(equipment); setActiveTab('details'); }}
                          variant="outline"
                          className="w-full"
                        >
                          {language === 'hi' ? 'विवरण देखें' : 'View Details'}
                        </Button>
                        <Button 
                          onClick={() => { setSelectedEquipment(equipment); setActiveTab('booking'); }}
                          disabled={equipment.availability !== 'available'}
                          className="w-full bg-kisan-primary hover:bg-kisan-primary/90"
                        >
                          {language === 'hi' ? 'बुक करें' : 'Book Now'}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          {language === 'hi' ? 'संपर्क' : 'Contact'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {selectedEquipment ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-kisan-text-primary">
                        {language === 'hi' ? selectedEquipment.nameHindi : selectedEquipment.name}
                      </CardTitle>
                      <p className="text-kisan-text-secondary mt-1">
                        {language === 'hi' ? selectedEquipment.categoryHindi : selectedEquipment.category}
                      </p>
                    </div>
                    {getAvailabilityBadge(selectedEquipment.availability)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-kisan-text-secondary mb-6">
                    {language === 'hi' ? selectedEquipment.descriptionHindi : selectedEquipment.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Wrench className="h-5 w-5" />
                          {language === 'hi' ? 'तकनीकी विवरण' : 'Specifications'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(language === 'hi' ? selectedEquipment.specificationsHindi : selectedEquipment.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm text-kisan-text-secondary">{key}:</span>
                              <span className="text-sm font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          {language === 'hi' ? 'किराया दरें' : 'Rental Rates'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm">{language === 'hi' ? 'प्रति घंटा' : 'Hourly Rate'}</span>
                            <span className="font-bold text-lg">₹{selectedEquipment.hourlyRate}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-sm">{language === 'hi' ? 'प्रति दिन' : 'Daily Rate'}</span>
                            <span className="font-bold text-lg">₹{selectedEquipment.dailyRate}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="text-sm">{language === 'hi' ? 'प्रति माह' : 'Monthly Rate'}</span>
                            <span className="font-bold text-lg">₹{selectedEquipment.monthlyRate.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        {language === 'hi' ? 'मालिक की जानकारी' : 'Owner Information'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-kisan-text-primary">{selectedEquipment.owner.name}</p>
                          <p className="text-sm text-kisan-text-secondary">{selectedEquipment.owner.phone}</p>
                          <p className="text-sm text-kisan-text-secondary">
                            {language === 'hi' ? selectedEquipment.locationHindi : selectedEquipment.location}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{selectedEquipment.owner.rating}/5</span>
                          </div>
                          <p className="text-sm text-kisan-text-secondary">
                            {selectedEquipment.owner.totalRentals} {language === 'hi' ? 'सफल किराया' : 'successful rentals'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      onClick={() => setActiveTab('booking')}
                      disabled={selectedEquipment.availability !== 'available'}
                      className="bg-kisan-primary hover:bg-kisan-primary/90"
                    >
                      {language === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                    </Button>
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      {language === 'hi' ? 'मालिक से संपर्क करें' : 'Contact Owner'}
                    </Button>
                    <Button onClick={() => setActiveTab('browse')} variant="outline">
                      {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Tractor className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-kisan-text-secondary">
                  {language === 'hi' ? 'कोई उपकरण चुना नहीं गया' : 'No equipment selected'}
                </p>
                <Button onClick={() => setActiveTab('browse')} variant="outline" className="mt-4">
                  {language === 'hi' ? 'उपकरण ब्राउज़ करें' : 'Browse Equipment'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="booking" className="space-y-6">
          {selectedEquipment ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-kisan-primary">
                  {language === 'hi' ? 'बुकिंग फॉर्म' : 'Booking Form'}
                </CardTitle>
                <p className="text-kisan-text-secondary">
                  {language === 'hi' ? selectedEquipment.nameHindi : selectedEquipment.name}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'hi' ? 'किराया प्रकार' : 'Rental Type'}</Label>
                    <Select value={bookingData.rentalType} onValueChange={(value) => setBookingData(prev => ({ ...prev, rentalType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">{language === 'hi' ? 'प्रति घंटा' : 'Hourly'}</SelectItem>
                        <SelectItem value="daily">{language === 'hi' ? 'प्रति दिन' : 'Daily'}</SelectItem>
                        <SelectItem value="monthly">{language === 'hi' ? 'प्रति माह' : 'Monthly'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'hi' ? 'अवधि' : 'Duration'}</Label>
                    <Input
                      type="number"
                      placeholder={language === 'hi' ? 'अवधि दर्ज करें' : 'Enter duration'}
                      value={bookingData.duration}
                      onChange={(e) => setBookingData(prev => ({ ...prev, duration: e.target.value }))}
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'hi' ? 'शुरुआती तारीख' : 'Start Date'}</Label>
                    <Input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'hi' ? 'समाप्ति तारीख' : 'End Date'}</Label>
                    <Input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, endDate: e.target.value }))}
                      min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'उपयोग का उद्देश्य' : 'Purpose of Use'}</Label>
                  <Textarea
                    placeholder={language === 'hi' ? 'उपयोग का विवरण दें' : 'Describe the purpose of use'}
                    value={bookingData.purpose}
                    onChange={(e) => setBookingData(prev => ({ ...prev, purpose: e.target.value }))}
                    rows={3}
                  />
                </div>

                {bookingData.duration && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">
                          {language === 'hi' ? 'कुल लागत:' : 'Total Cost:'}
                        </span>
                        <span className="text-2xl font-bold text-kisan-primary">
                          ₹{calculateTotalCost().toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-sm text-kisan-text-secondary mt-1">
                        {bookingData.duration} {bookingData.rentalType === 'hourly' ? (language === 'hi' ? 'घंटे' : 'hours') : 
                         bookingData.rentalType === 'daily' ? (language === 'hi' ? 'दिन' : 'days') : 
                         (language === 'hi' ? 'महीने' : 'months')} × ₹{
                          bookingData.rentalType === 'hourly' ? selectedEquipment.hourlyRate :
                          bookingData.rentalType === 'daily' ? selectedEquipment.dailyRate :
                          selectedEquipment.monthlyRate
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={handleBooking}
                    disabled={!bookingData.startDate || !bookingData.endDate || !bookingData.duration || !bookingData.purpose}
                    className="bg-kisan-primary hover:bg-kisan-primary/90"
                  >
                    {language === 'hi' ? 'बुकिंग कन्फर्म करें' : 'Confirm Booking'}
                  </Button>
                  <Button onClick={() => setActiveTab('details')} variant="outline">
                    {language === 'hi' ? 'वापस विवरण' : 'Back to Details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-kisan-text-secondary">
                  {language === 'hi' ? 'पहले उपकरण चुनें' : 'Please select equipment first'}
                </p>
                <Button onClick={() => setActiveTab('browse')} variant="outline" className="mt-4">
                  {language === 'hi' ? 'उपकरण चुनें' : 'Select Equipment'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentRental;
