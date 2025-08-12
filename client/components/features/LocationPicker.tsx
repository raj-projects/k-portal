import React, { useState, useEffect, createContext, useContext } from 'react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '../../contexts/LanguageContext';

interface LocationData {
  city: string;
  cityHindi: string;
  state: string;
  stateHindi: string;
  lat: number;
  lon: number;
  district?: string;
  districtHindi?: string;
  isCurrentLocation: boolean;
}

interface LocationContextType {
  currentLocation: LocationData | null;
  setCurrentLocation: (location: LocationData | null) => void;
  isLocationPickerOpen: boolean;
  setIsLocationPickerOpen: (open: boolean) => void;
}

// Location Context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

// Location Provider Component
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  // Initialize with Delhi as default
  useEffect(() => {
    if (!currentLocation) {
      setCurrentLocation({
        city: 'New Delhi',
        cityHindi: 'नई दिल्ली',
        state: 'Delhi',
        stateHindi: 'दिल्ली',
        lat: 28.6139,
        lon: 77.2090,
        isCurrentLocation: false
      });
    }
  }, [currentLocation]);

  return (
    <LocationContext.Provider value={{
      currentLocation,
      setCurrentLocation,
      isLocationPickerOpen,
      setIsLocationPickerOpen
    }}>
      {children}
    </LocationContext.Provider>
  );
};

// Location Display Component (for header/navbar)
export const LocationDisplay: React.FC<{ showFullAddress?: boolean }> = ({ showFullAddress = false }) => {
  const { currentLocation, setIsLocationPickerOpen } = useLocation();
  const { language } = useLanguage();

  if (!currentLocation) return null;

  return (
    <button
      onClick={() => setIsLocationPickerOpen(true)}
      className="flex items-center gap-2 text-kisan-text-secondary hover:text-kisan-primary transition-colors"
    >
      <MapPin className="h-4 w-4" />
      <span className="text-sm">
        {showFullAddress 
          ? `${language === 'hi' ? currentLocation.cityHindi : currentLocation.city}, ${language === 'hi' ? currentLocation.stateHindi : currentLocation.state}`
          : (language === 'hi' ? currentLocation.cityHindi : currentLocation.city)
        }
      </span>
    </button>
  );
};

// Indian states and cities data (simplified for location picker)
const statesWithCities = {
  'delhi': {
    name: 'Delhi',
    nameHindi: 'दिल्ली',
    cities: [
      { name: 'New Delhi', nameHindi: 'नई दिल्ली', lat: 28.6139, lon: 77.2090 },
      { name: 'Gurgaon', nameHindi: 'गुड़गांव', lat: 28.4595, lon: 77.0266 },
      { name: 'Faridabad', nameHindi: 'फरीदाबाद', lat: 28.4089, lon: 77.3178 },
      { name: 'Noida', nameHindi: 'नोएडा', lat: 28.5355, lon: 77.3910 }
    ]
  },
  'punjab': {
    name: 'Punjab',
    nameHindi: 'पंजाब',
    cities: [
      { name: 'Ludhiana', nameHindi: 'लुधियाना', lat: 30.9010, lon: 75.8573 },
      { name: 'Amritsar', nameHindi: 'अमृतसर', lat: 31.6340, lon: 74.8723 },
      { name: 'Jalandhar', nameHindi: 'जालंधर', lat: 31.3260, lon: 75.5762 },
      { name: 'Bathinda', nameHindi: 'भटिंडा', lat: 30.2110, lon: 74.9455 },
      { name: 'Patiala', nameHindi: 'पटियाला', lat: 30.3398, lon: 76.3869 },
      { name: 'Mohali', nameHindi: 'मोहाली', lat: 30.7046, lon: 76.7179 }
    ]
  },
  'haryana': {
    name: 'Haryana',
    nameHindi: 'हरियाणा',
    cities: [
      { name: 'Karnal', nameHindi: 'करनाल', lat: 29.6857, lon: 76.9905 },
      { name: 'Panipat', nameHindi: 'पानीपत', lat: 29.3909, lon: 76.9635 },
      { name: 'Hisar', nameHindi: 'हिसार', lat: 29.1492, lon: 75.7217 },
      { name: 'Rohtak', nameHindi: 'रोहतक', lat: 28.8955, lon: 76.6066 },
      { name: 'Ambala', nameHindi: 'अंबाला', lat: 30.3752, lon: 76.7821 },
      { name: 'Kurukshetra', nameHindi: 'कुरुक्षेत्र', lat: 29.9647, lon: 76.8781 }
    ]
  },
  'uttarpradesh': {
    name: 'Uttar Pradesh',
    nameHindi: 'उत्तर प्रदेश',
    cities: [
      { name: 'Lucknow', nameHindi: 'लखनऊ', lat: 26.8467, lon: 80.9462 },
      { name: 'Kanpur', nameHindi: 'कानपुर', lat: 26.4499, lon: 80.3319 },
      { name: 'Agra', nameHindi: 'आगरा', lat: 27.1767, lon: 78.0081 },
      { name: 'Varanasi', nameHindi: 'वाराणसी', lat: 25.3176, lon: 82.9739 },
      { name: 'Allahabad', nameHindi: 'इलाहाबाद', lat: 25.4358, lon: 81.8463 },
      { name: 'Meerut', nameHindi: 'मेरठ', lat: 28.9845, lon: 77.7064 },
      { name: 'Bareilly', nameHindi: 'बरेली', lat: 28.3670, lon: 79.4304 },
      { name: 'Moradabad', nameHindi: 'मुरादाबाद', lat: 28.8386, lon: 78.7733 }
    ]
  },
  'maharashtra': {
    name: 'Maharashtra',
    nameHindi: 'महाराष्ट्र',
    cities: [
      { name: 'Mumbai', nameHindi: 'मुंबई', lat: 19.0760, lon: 72.8777 },
      { name: 'Pune', nameHindi: 'पुणे', lat: 18.5204, lon: 73.8567 },
      { name: 'Nashik', nameHindi: 'नासिक', lat: 19.9975, lon: 73.7898 },
      { name: 'Aurangabad', nameHindi: 'औरंगाबाद', lat: 19.8762, lon: 75.3433 },
      { name: 'Solapur', nameHindi: 'सोलापुर', lat: 17.6599, lon: 75.9064 },
      { name: 'Nagpur', nameHindi: 'नागपुर', lat: 21.1458, lon: 79.0882 }
    ]
  },
  'gujarat': {
    name: 'Gujarat',
    nameHindi: 'गुजरात',
    cities: [
      { name: 'Ahmedabad', nameHindi: 'अहमदाबाद', lat: 23.0225, lon: 72.5714 },
      { name: 'Surat', nameHindi: 'सूरत', lat: 21.1702, lon: 72.8311 },
      { name: 'Rajkot', nameHindi: 'राजकोट', lat: 22.3039, lon: 70.8022 },
      { name: 'Vadodara', nameHindi: 'वडोदरा', lat: 22.3072, lon: 73.1812 },
      { name: 'Bhavnagar', nameHindi: 'भावनगर', lat: 21.7645, lon: 72.1519 }
    ]
  },
  'karnataka': {
    name: 'Karnataka',
    nameHindi: 'कर्नाटक',
    cities: [
      { name: 'Bangalore', nameHindi: 'बेंगलुरु', lat: 12.9716, lon: 77.5946 },
      { name: 'Mysore', nameHindi: 'मैसूर', lat: 12.2958, lon: 76.6394 },
      { name: 'Hubli', nameHindi: 'हुबली', lat: 15.3647, lon: 75.1240 },
      { name: 'Mangalore', nameHindi: 'मंगलुरु', lat: 12.9141, lon: 74.8560 },
      { name: 'Belgaum', nameHindi: 'बेलगाम', lat: 15.8497, lon: 74.4977 }
    ]
  },
  'tamilnadu': {
    name: 'Tamil Nadu',
    nameHindi: 'तमिल नाडु',
    cities: [
      { name: 'Chennai', nameHindi: 'चेन्नई', lat: 13.0827, lon: 80.2707 },
      { name: 'Coimbatore', nameHindi: 'कोयंबटूर', lat: 11.0168, lon: 76.9558 },
      { name: 'Madurai', nameHindi: 'मदुरै', lat: 9.9252, lon: 78.1198 },
      { name: 'Tiruchirappalli', nameHindi: 'तिरुचिरापल्ली', lat: 10.7905, lon: 78.7047 },
      { name: 'Salem', nameHindi: 'सेलम', lat: 11.6643, lon: 78.1460 }
    ]
  },
  'rajasthan': {
    name: 'Rajasthan',
    nameHindi: 'राजस्थान',
    cities: [
      { name: 'Jaipur', nameHindi: 'जयपुर', lat: 26.9124, lon: 75.7873 },
      { name: 'Jodhpur', nameHindi: 'जोधपुर', lat: 26.2389, lon: 73.0243 },
      { name: 'Udaipur', nameHindi: 'उदयपुर', lat: 24.5854, lon: 73.7125 },
      { name: 'Kota', nameHindi: 'कोटा', lat: 25.2138, lon: 75.8648 },
      { name: 'Bikaner', nameHindi: 'बीकानेर', lat: 28.0229, lon: 73.3119 },
      { name: 'Ajmer', nameHindi: 'अजमेर', lat: 26.4499, lon: 74.6399 }
    ]
  },
  'madhyapradesh': {
    name: 'Madhya Pradesh',
    nameHindi: 'मध्य प्रदेश',
    cities: [
      { name: 'Bhopal', nameHindi: 'भोपाल', lat: 23.2599, lon: 77.4126 },
      { name: 'Indore', nameHindi: 'इंदौर', lat: 22.7196, lon: 75.8577 },
      { name: 'Gwalior', nameHindi: 'ग्वालियर', lat: 26.2183, lon: 78.1828 },
      { name: 'Jabalpur', nameHindi: 'जबलपुर', lat: 23.1815, lon: 79.9864 },
      { name: 'Ujjain', nameHindi: 'उज्जैन', lat: 23.1765, lon: 75.7885 }
    ]
  }
};

// Main Location Picker Component
export const LocationPicker: React.FC = () => {
  const { isLocationPickerOpen, setIsLocationPickerOpen, setCurrentLocation } = useLocation();
  const { language } = useLanguage();
  
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const filteredCities = selectedState && statesWithCities[selectedState as keyof typeof statesWithCities]
    ? statesWithCities[selectedState as keyof typeof statesWithCities].cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.nameHindi.includes(searchTerm)
      )
    : [];

  const detectCurrentLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Try to reverse geocode or use fallback
            const locationData: LocationData = {
              city: 'Current Location',
              cityHindi: 'वर्तमान स्थान',
              state: 'Detected',
              stateHindi: 'पहचाना गया',
              lat: latitude,
              lon: longitude,
              isCurrentLocation: true
            };
            
            setCurrentLocation(locationData);
            setIsLocationPickerOpen(false);
          } catch (error) {
            console.error('Reverse geocoding failed:', error);
            // Use coordinates with fallback names
            setCurrentLocation({
              city: 'Current Location',
              cityHindi: 'वर्तमान स्थान',
              state: 'Detected',
              stateHindi: 'पहचाना गया',
              lat: latitude,
              lon: longitude,
              isCurrentLocation: true
            });
            setIsLocationPickerOpen(false);
          } finally {
            setIsDetecting(false);
          }
        },
        (error) => {
          let errorMessage = 'Unknown error';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = language === 'hi'
                ? 'स्थान की अनुमति नहीं दी गई। कृपया ब्राउज़र सेटिंग्स में स्थान की अनुमति दें।'
                : 'Location permission denied. Please enable location access in browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = language === 'hi'
                ? 'स्थान की जानकारी उपलब्ध नहीं है।'
                : 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = language === 'hi'
                ? 'स्थान खोजने में समय लग रहा है। कृपया फिर से कोशिश करें।'
                : 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage = language === 'hi'
                ? 'स्थान प्राप्त करने में त्रुटि हुई।'
                : 'An error occurred while getting location.';
          }

          console.error('Geolocation error:', errorMessage, error);

          // Show error message to user
          if (typeof window !== 'undefined' && window.alert) {
            alert(errorMessage + ' ' + (language === 'hi'
              ? 'डिफ़ॉल्ट स्थान (नई दिल्ली) का उपयोग कर रहे हैं।'
              : 'Using default location (New Delhi).'));
          }

          setIsDetecting(false);
          // Fallback to Delhi
          setCurrentLocation({
            city: 'New Delhi',
            cityHindi: 'नई दिल्ली',
            state: 'Delhi',
            stateHindi: 'दिल्ली',
            lat: 28.6139,
            lon: 77.2090,
            isCurrentLocation: false
          });
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 5 * 60 * 1000
        }
      );
    } else {
      setIsDetecting(false);
      alert(language === 'hi' 
        ? 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता'
        : 'Your browser does not support geolocation'
      );
    }
  };

  const selectCity = (city: any, state: any) => {
    const locationData: LocationData = {
      city: city.name,
      cityHindi: city.nameHindi,
      state: state.name,
      stateHindi: state.nameHindi,
      lat: city.lat,
      lon: city.lon,
      isCurrentLocation: false
    };
    
    setCurrentLocation(locationData);
    setIsLocationPickerOpen(false);
  };

  if (!isLocationPickerOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-kisan-text-primary">
              {language === 'hi' ? 'अपना स्थान चुनें' : 'Select Your Location'}
            </h2>
            <button
              onClick={() => setIsLocationPickerOpen(false)}
              className="text-kisan-text-secondary hover:text-kisan-text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Current Location Detection */}
          <Button
            onClick={detectCurrentLocation}
            disabled={isDetecting}
            className="w-full mb-6 bg-kisan-primary hover:bg-kisan-primary/90"
          >
            <Navigation className="h-4 w-4 mr-2" />
            {isDetecting 
              ? (language === 'hi' ? 'पहचान रहे हैं...' : 'Detecting...')
              : (language === 'hi' ? 'वर्तमान स्थान का उपयोग करें' : 'Use Current Location')
            }
          </Button>

          <div className="text-center text-sm text-kisan-text-secondary mb-6">
            {language === 'hi' ? 'या मैन्युअल रूप से चुनें' : 'Or select manually'}
          </div>

          {/* State Selection */}
          <div className="space-y-4">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'hi' ? 'राज्य चुनें' : 'Select State'} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statesWithCities).map(([key, state]) => (
                  <SelectItem key={key} value={key}>
                    {language === 'hi' ? state.nameHindi : state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Search */}
            {selectedState && (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={language === 'hi' ? 'शहर खोजें' : 'Search city'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* City List */}
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredCities.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => selectCity(city, statesWithCities[selectedState as keyof typeof statesWithCities])}
                      className="w-full text-left p-3 rounded-md border hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-kisan-text-primary">
                        {language === 'hi' ? city.nameHindi : city.name}
                      </div>
                      <div className="text-sm text-kisan-text-secondary">
                        {language === 'hi' 
                          ? statesWithCities[selectedState as keyof typeof statesWithCities].nameHindi
                          : statesWithCities[selectedState as keyof typeof statesWithCities].name
                        }
                      </div>
                    </button>
                  ))}
                </div>

                {filteredCities.length === 0 && searchTerm && (
                  <div className="text-center py-4 text-kisan-text-secondary">
                    {language === 'hi' ? 'कोई शहर नहीं मिला' : 'No cities found'}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationPicker;
