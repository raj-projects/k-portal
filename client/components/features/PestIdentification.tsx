import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, Camera, Upload, Search, AlertTriangle, Shield, Leaf, Droplets, Sprout, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface PestData {
  id: string;
  name: string;
  nameHindi: string;
  type: 'insect' | 'disease' | 'weed';
  severity: 'low' | 'medium' | 'high';
  affectedCrops: string[];
  affectedCropsHindi: string[];
  symptoms: string[];
  symptomsHindi: string[];
  organicTreatment: string[];
  organicTreatmentHindi: string[];
  chemicalTreatment: string[];
  chemicalTreatmentHindi: string[];
  prevention: string[];
  preventionHindi: string[];
  imageUrl?: string;
  season: string;
  seasonHindi: string;
}

const pestDatabase: Record<string, PestData> = {
  'bollworm': {
    id: 'bollworm',
    name: 'Bollworm',
    nameHindi: 'बॉलवर्म',
    type: 'insect',
    severity: 'high',
    affectedCrops: ['Cotton', 'Tomato', 'Chili'],
    affectedCropsHindi: ['कपास', 'टमाटर', 'मिर्च'],
    symptoms: ['Holes in leaves', 'Damaged fruits', 'Boring in stems'],
    symptomsHindi: ['पत्तियों में छेद', 'फलों में नुकसान', 'तने में छेद'],
    organicTreatment: ['Neem oil spray', 'Bt spray', 'Pheromone traps'],
    organicTreatmentHindi: ['नीम तेल छिड़काव', 'बीटी स्प्रे', 'फेरोमोन ट्रैप'],
    chemicalTreatment: ['Cypermethrin', 'Chlorpyrifos', 'Emamectin benzoate'],
    chemicalTreatmentHindi: ['साइपरमेथ्रिन', 'क्लोरपायरिफॉस', 'इमामेक्टिन बेंजोएट'],
    prevention: ['Regular monitoring', 'Crop rotation', 'Remove infected plants'],
    preventionHindi: ['नियमित निगरानी', 'फसल चक्र', 'संक्रमित पौधों को हटाना'],
    season: 'Monsoon to Post-monsoon',
    seasonHindi: 'मानसून से मानसून के बाद'
  },
  'aphids': {
    id: 'aphids',
    name: 'Aphids',
    nameHindi: 'माहू',
    type: 'insect',
    severity: 'medium',
    affectedCrops: ['Wheat', 'Mustard', 'Pea', 'Potato'],
    affectedCropsHindi: ['गेहूं', 'सरसों', 'मटर', 'आलू'],
    symptoms: ['Curled leaves', 'Sticky honeydew', 'Yellowing of leaves'],
    symptomsHindi: ['मुड़ी हुई पत्तियां', 'चिपचिपा रस', 'पत्तियों का पीला होना'],
    organicTreatment: ['Neem oil', 'Soap solution', 'Ladybird beetles'],
    organicTreatmentHindi: ['नीम तेल', 'साबुन का घोल', 'लेडीबर्ड बीटल'],
    chemicalTreatment: ['Imidacloprid', 'Thiamethoxam', 'Acetamiprid'],
    chemicalTreatmentHindi: ['इमिडाक्लोप्रिड', 'थायामेथोक्साम', 'एसिटामिप्रिड'],
    prevention: ['Yellow sticky traps', 'Remove weeds', 'Balanced fertilization'],
    preventionHindi: ['पीले चिपचिपे जाल', 'खरपतवार हटाना', 'संतुलित उर्वरीकरण'],
    season: 'Winter to Spring',
    seasonHindi: 'सर्दी से वसंत'
  },
  'stemBorer': {
    id: 'stemBorer',
    name: 'Stem Borer',
    nameHindi: 'तना छेदक',
    type: 'insect',
    severity: 'high',
    affectedCrops: ['Rice', 'Sugarcane', 'Maize'],
    affectedCropsHindi: ['धान', 'गन्ना', 'मक्का'],
    symptoms: ['Dead heart', 'White ear head', 'Holes in stem'],
    symptomsHindi: ['मृत हृदय', 'सफेद बाली', 'तने में छेद'],
    organicTreatment: ['Trichogramma release', 'Light traps', 'Neem cake'],
    organicTreatmentHindi: ['ट्राइकोग्रामा छोड़ना', 'प्रकाश जाल', 'नीम खली'],
    chemicalTreatment: ['Cartap hydrochloride', 'Fipronil', 'Chlorantraniliprole'],
    chemicalTreatmentHindi: ['कार्टाप हाइड्रोक्लोराइड', 'फिप्रोनिल', 'क्लोरैंट्रानिलिप्रोल'],
    prevention: ['Avoid staggered planting', 'Use resistant varieties', 'Proper water management'],
    preventionHindi: ['असमान रोपाई से बचें', 'प्रतिरोधी किस्मों का उपयोग', 'उचित जल प्रबंधन'],
    season: 'Monsoon',
    seasonHindi: 'मानसून'
  },
  'blastDisease': {
    id: 'blastDisease',
    name: 'Blast Disease',
    nameHindi: 'ब्लास्ट रोग',
    type: 'disease',
    severity: 'high',
    affectedCrops: ['Rice'],
    affectedCropsHindi: ['धान'],
    symptoms: ['Diamond-shaped spots', 'Neck breaking', 'Panicle infection'],
    symptomsHindi: ['हीरे के आकार के धब्बे', 'गर्दन टूटना', 'बाली में संक्रमण'],
    organicTreatment: ['Neem extract', 'Trichoderma', 'Proper spacing'],
    organicTreatmentHindi: ['नीम अर्क', 'ट्राइकोडर्मा', 'उचित दूरी'],
    chemicalTreatment: ['Tricyclazole', 'Propiconazole', 'Azoxystrobin'],
    chemicalTreatmentHindi: ['ट्राइसाइक्लाजोल', 'प्रोपिकोनाजोल', 'अजोक्सीस्ट्रोबिन'],
    prevention: ['Use resistant varieties', 'Balanced fertilization', 'Avoid excess nitrogen'],
    preventionHindi: ['प्रतिरोधी किस्मों का उपयोग', 'संतुलित उर्वरीकरण', 'अधिक नाइट्रोजन से बचें'],
    season: 'Monsoon',
    seasonHindi: 'मानसून'
  },
  'whitefly': {
    id: 'whitefly',
    name: 'Whitefly',
    nameHindi: 'सफेद मक्खी',
    type: 'insect',
    severity: 'medium',
    affectedCrops: ['Cotton', 'Tomato', 'Brinjal', 'Chili'],
    affectedCropsHindi: ['कपास', 'टमाटर', 'बैंगन', 'मिर्च'],
    symptoms: ['Yellow spots on leaves', 'Honeydew secretion', 'Sooty mold'],
    symptomsHindi: ['पत्तियों पर पीले धब्बे', 'मधुरस स्राव', 'काली फफूंदी'],
    organicTreatment: ['Yellow sticky traps', 'Neem oil', 'Reflective mulch'],
    organicTreatmentHindi: ['पीले चिपचिपे जाल', 'नीम तेल', 'परावर्तक मल्च'],
    chemicalTreatment: ['Imidacloprid', 'Spiromesifen', 'Pyriproxyfen'],
    chemicalTreatmentHindi: ['इमिडाक्लोप्रिड', 'स्पिरोमेसिफेन', 'पायरिप्रोक्सीफेन'],
    prevention: ['Remove infected plants', 'Use resistant varieties', 'Proper sanitation'],
    preventionHindi: ['संक्रमित पौधे हटाना', 'प्रतिरोधी किस्में', 'उचित सफाई'],
    season: 'Summer to Monsoon',
    seasonHindi: 'गर्मी से मानसून'
  }
};

const PestIdentification = () => {
  const { language } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPest, setSelectedPest] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('identify');
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.click();
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setSelectedPest('bollworm'); // Mock result
      setActiveTab('details');
    }, 3000);
  };

  const filteredPests = Object.values(pestDatabase).filter(pest => {
    const matchesCrop = !selectedCrop || selectedCrop === 'all' || pest.affectedCrops.some(crop =>
      crop.toLowerCase().includes(selectedCrop.toLowerCase())
    );
    const matchesSearch = !searchTerm || 
      pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.nameHindi.includes(searchTerm) ||
      pest.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCrop && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'insect': return Bug;
      case 'disease': return AlertTriangle;
      case 'weed': return Leaf;
      default: return Bug;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Bug className="h-6 w-6" />
            {language === 'hi' ? 'कीट और रोग पहचान' : 'Pest & Disease Identification'}
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="identify">
            {language === 'hi' ? 'पहचान करें' : 'Identify'}
          </TabsTrigger>
          <TabsTrigger value="browse">
            {language === 'hi' ? 'ब्राउज़ करें' : 'Browse'}
          </TabsTrigger>
          <TabsTrigger value="details">
            {language === 'hi' ? 'विवरण' : 'Details'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identify" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-kisan-primary">
                {language === 'hi' ? 'AI-संचालित पहचान' : 'AI-Powered Identification'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    {language === 'hi' ? 'फोटो अपलोड करें' : 'Upload Photo'}
                  </Label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={handleImageCapture}
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                    >
                      <Camera className="h-6 w-6" />
                      <span className="text-sm">
                        {language === 'hi' ? 'कैमरा' : 'Camera'}
                      </span>
                    </Button>
                    
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">
                        {language === 'hi' ? 'अपलोड' : 'Upload'}
                      </span>
                    </Button>
                  </div>

                  {selectedFile && (
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">
                          {language === 'hi' ? 'फाइल चुनी गई:' : 'File selected:'} {selectedFile.name}
                        </p>
                      </div>
                      
                      <Button 
                        onClick={analyzeImage}
                        disabled={analyzing}
                        className="w-full bg-kisan-primary hover:bg-kisan-primary/90"
                      >
                        {analyzing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {language === 'hi' ? 'विश्लेषण हो रहा है...' : 'Analyzing...'}
                          </div>
                        ) : (
                          language === 'hi' ? 'AI से पहचान करें' : 'Identify with AI'
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    {language === 'hi' ? 'मैन्युअल खोज' : 'Manual Search'}
                  </Label>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>{language === 'hi' ? 'फसल चुनें' : 'Select Crop'}</Label>
                      <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'hi' ? 'फसल चुनें' : 'Choose crop'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            {language === 'hi' ? 'सभी फसलें' : 'All Crops'}
                          </SelectItem>
                          <SelectItem value="cotton">{language === 'hi' ? 'कपास' : 'Cotton'}</SelectItem>
                          <SelectItem value="rice">{language === 'hi' ? 'धान' : 'Rice'}</SelectItem>
                          <SelectItem value="wheat">{language === 'hi' ? 'गेहूं' : 'Wheat'}</SelectItem>
                          <SelectItem value="tomato">{language === 'hi' ? 'टमाटर' : 'Tomato'}</SelectItem>
                          <SelectItem value="sugarcane">{language === 'hi' ? 'गन्ना' : 'Sugarcane'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{language === 'hi' ? 'लक्षण खोजें' : 'Search Symptoms'}</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder={language === 'hi' ? 'लक्षण या कीट का नाम' : 'Symptoms or pest name'}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={() => setActiveTab('browse')}
                      variant="outline"
                      className="w-full"
                    >
                      {language === 'hi' ? 'परिणाम देखें' : 'View Results'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid gap-4">
            {filteredPests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-kisan-text-secondary">
                    {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredPests.map((pest) => {
                const TypeIcon = getTypeIcon(pest.type);
                return (
                  <Card key={pest.id} className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => { setSelectedPest(pest.id); setActiveTab('details'); }}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            pest.type === 'insect' ? 'bg-orange-100 text-orange-600' :
                            pest.type === 'disease' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                          }`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-kisan-text-primary text-lg">
                              {language === 'hi' ? pest.nameHindi : pest.name}
                            </h3>
                            <p className="text-sm text-kisan-text-secondary mb-2">
                              {language === 'hi' ? 'प्रभावित फसलें:' : 'Affected Crops:'} {
                                (language === 'hi' ? pest.affectedCropsHindi : pest.affectedCrops).join(', ')
                              }
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <Badge className={getSeverityColor(pest.severity)}>
                                {language === 'hi' ? (
                                  pest.severity === 'high' ? 'उच्च' :
                                  pest.severity === 'medium' ? 'मध्यम' : 'निम्न'
                                ) : pest.severity}
                              </Badge>
                              <Badge variant="outline">
                                {language === 'hi' ? pest.seasonHindi : pest.season}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {selectedPest && pestDatabase[selectedPest] ? (
            (() => {
              const pest = pestDatabase[selectedPest];
              const TypeIcon = getTypeIcon(pest.type);
              return (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${
                            pest.type === 'insect' ? 'bg-orange-100 text-orange-600' :
                            pest.type === 'disease' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                          }`}>
                            <TypeIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-kisan-text-primary">
                              {language === 'hi' ? pest.nameHindi : pest.name}
                            </CardTitle>
                            <p className="text-kisan-text-secondary">
                              {language === 'hi' ? (
                                pest.type === 'insect' ? 'कीट' :
                                pest.type === 'disease' ? 'रोग' : 'खरपतवार'
                              ) : pest.type}
                            </p>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(pest.severity)}>
                          {language === 'hi' ? (
                            pest.severity === 'high' ? 'उच्च खतरा' :
                            pest.severity === 'medium' ? 'मध्यम खतरा' : 'कम खतरा'
                          ) : `${pest.severity} threat`}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-kisan-text-primary">
                            {language === 'hi' ? 'प्रभावित फसलें:' : 'Affected Crops:'}
                          </h4>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {(language === 'hi' ? pest.affectedCropsHindi : pest.affectedCrops).map((crop, index) => (
                              <Badge key={index} variant="outline">{crop}</Badge>
                            ))}
                          </div>
                          
                          <h4 className="font-semibold mb-2 text-kisan-text-primary">
                            {language === 'hi' ? 'सक्रिय मौसम:' : 'Active Season:'}
                          </h4>
                          <Badge variant="outline" className="mb-4">
                            {language === 'hi' ? pest.seasonHindi : pest.season}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          {language === 'hi' ? 'लक्षण' : 'Symptoms'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {(language === 'hi' ? pest.symptomsHindi : pest.symptoms).map((symptom, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                              <span className="text-sm text-kisan-text-secondary">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                          <Shield className="h-5 w-5" />
                          {language === 'hi' ? 'रोकथाम' : 'Prevention'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {(language === 'hi' ? pest.preventionHindi : pest.prevention).map((method, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                              <span className="text-sm text-kisan-text-secondary">{method}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <Leaf className="h-5 w-5" />
                          {language === 'hi' ? 'जैविक उपचार' : 'Organic Treatment'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {(language === 'hi' ? pest.organicTreatmentHindi : pest.organicTreatment).map((treatment, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                              <span className="text-sm text-kisan-text-secondary">{treatment}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                          <Sprout className="h-5 w-5" />
                          {language === 'hi' ? 'रासायनिक उपचार' : 'Chemical Treatment'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {(language === 'hi' ? pest.chemicalTreatmentHindi : pest.chemicalTreatment).map((treatment, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                              <span className="text-sm text-kisan-text-secondary">{treatment}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-xs text-yellow-800">
                            {language === 'hi' 
                              ? '⚠️ रासायनिक उपचार का उपयोग करते समय सुरक्षा निर्देशों का पालन करें'
                              : '⚠�� Follow safety instructions when using chemical treatments'
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })()
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Bug className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-kisan-text-secondary">
                  {language === 'hi' ? 'कोई कीट या रोग चुना नहीं गया' : 'No pest or disease selected'}
                </p>
                <Button 
                  onClick={() => setActiveTab('browse')}
                  variant="outline" 
                  className="mt-4"
                >
                  {language === 'hi' ? 'ब्राउज़ करें' : 'Browse Pests'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PestIdentification;
