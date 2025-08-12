import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, FlaskConical, TestTube, Calculator, Zap, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SoilTestData {
  ph: number;
  organicCarbon: number; // percentage
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  sulfur: number; // kg/ha
  zinc: number; // ppm
  iron: number; // ppm
  manganese: number; // ppm
  copper: number; // ppm
  boron: number; // ppm
}

interface FertilizerRecommendation {
  nutrient: string;
  nutrientHindi: string;
  required: number;
  organicSources: { name: string; nameHindi: string; quantity: number; npk: string }[];
  chemicalSources: { name: string; nameHindi: string; quantity: number; npk: string }[];
  applicationTiming: string[];
  applicationTimingHindi: string[];
}

interface CropNutrientData {
  name: string;
  nameHindi: string;
  npkRequirement: { n: number; p: number; k: number }; // kg/ha
  secondaryNutrients: { s: number; ca: number; mg: number }; // kg/ha
  microNutrients: { zn: number; fe: number; mn: number; cu: number; b: number }; // g/ha
  criticalStages: string[];
  criticalStagesHindi: string[];
}

const cropNutrientDatabase: Record<string, CropNutrientData> = {
  wheat: {
    name: 'Wheat',
    nameHindi: 'गेहूं',
    npkRequirement: { n: 120, p: 60, k: 40 },
    secondaryNutrients: { s: 20, ca: 10, mg: 8 },
    microNutrients: { zn: 25, fe: 5, mn: 10, cu: 4, b: 2 },
    criticalStages: ['Tillering', 'Jointing', 'Booting', 'Grain filling'],
    criticalStagesHindi: ['कल्ले निकलना', 'गांठ', 'बूटिंग', 'दाना भरना']
  },
  rice: {
    name: 'Rice',
    nameHindi: 'धान',
    npkRequirement: { n: 100, p: 50, k: 50 },
    secondaryNutrients: { s: 20, ca: 12, mg: 10 },
    microNutrients: { zn: 30, fe: 10, mn: 20, cu: 5, b: 3 },
    criticalStages: ['Transplanting', 'Tillering', 'Panicle initiation', 'Flowering'],
    criticalStagesHindi: ['रोपाई', 'कल्ले निकलना', 'बाली प्रारंभ', 'फूल आना']
  },
  cotton: {
    name: 'Cotton',
    nameHindi: 'कपास',
    npkRequirement: { n: 150, p: 75, k: 75 },
    secondaryNutrients: { s: 25, ca: 15, mg: 12 },
    microNutrients: { zn: 15, fe: 8, mn: 15, cu: 6, b: 10 },
    criticalStages: ['Squaring', 'Flowering', 'Boll formation', 'Boll filling'],
    criticalStagesHindi: ['स्क्वेयरिंग', 'फूल आना', 'फल बनना', 'फल भरना']
  },
  sugarcane: {
    name: 'Sugarcane',
    nameHindi: 'गन्ना',
    npkRequirement: { n: 280, p: 90, k: 90 },
    secondaryNutrients: { s: 40, ca: 20, mg: 15 },
    microNutrients: { zn: 20, fe: 12, mn: 25, cu: 8, b: 5 },
    criticalStages: ['Germination', 'Tillering', 'Grand growth', 'Maturation'],
    criticalStagesHindi: ['अंकुरण', 'कल्ले निकलना', 'तेज वृद्धि', 'पकना']
  },
  maize: {
    name: 'Maize',
    nameHindi: 'मक्का',
    npkRequirement: { n: 120, p: 60, k: 40 },
    secondaryNutrients: { s: 20, ca: 10, mg: 8 },
    microNutrients: { zn: 25, fe: 5, mn: 10, cu: 4, b: 2 },
    criticalStages: ['6-leaf stage', 'Knee-high', 'Tasseling', 'Grain filling'],
    criticalStagesHindi: ['6-पत्ती अवस्था', 'घुटने तक', 'झालर', 'दाना भरना']
  }
};

const organicFertilizers = [
  { name: 'Farmyard Manure', nameHindi: 'गोबर की खाद', npk: '0.5-0.2-0.5', quantity: 10000 },
  { name: 'Compost', nameHindi: 'कंपोस्ट', npk: '1.5-0.5-1.0', quantity: 5000 },
  { name: 'Vermicompost', nameHindi: 'केंचुआ खाद', npk: '1.5-1.0-1.0', quantity: 2500 },
  { name: 'Poultry Manure', nameHindi: 'मुर्गी की खाद', npk: '3.0-2.5-1.5', quantity: 2000 },
  { name: 'Neem Cake', nameHindi: 'नीम खली', npk: '5.0-1.0-1.0', quantity: 250 },
  { name: 'Mustard Cake', nameHindi: 'सरसों खली', npk: '4.0-1.5-1.0', quantity: 300 }
];

const chemicalFertilizers = [
  { name: 'Urea', nameHindi: 'यूरिया', npk: '46-0-0', quantity: 100 },
  { name: 'DAP', nameHindi: 'डीएपी', npk: '18-46-0', quantity: 100 },
  { name: 'NPK 10:26:26', nameHindi: 'एनपीके 10:26:26', npk: '10-26-26', quantity: 100 },
  { name: 'MOP', nameHindi: 'एमओपी', npk: '0-0-60', quantity: 100 },
  { name: 'SSP', nameHindi: 'एसएसपी', npk: '0-16-0', quantity: 100 },
  { name: 'NPK 12:32:16', nameHindi: 'एनपीके 12:32:16', npk: '12-32-16', quantity: 100 }
];

const FertilizerGuide = () => {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [landArea, setLandArea] = useState('');
  const [expectedYield, setExpectedYield] = useState('');
  const [soilTest, setSoilTest] = useState<Partial<SoilTestData>>({});
  const [activeTab, setActiveTab] = useState('calculator');

  const updateSoilTest = (field: keyof SoilTestData, value: string) => {
    setSoilTest(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const fertilizerRecommendations = useMemo(() => {
    if (!selectedCrop || !landArea) return null;

    const crop = cropNutrientDatabase[selectedCrop];
    const area = parseFloat(landArea);
    const yieldFactor = expectedYield ? parseFloat(expectedYield) / 30 : 1; // Assuming 30 quintal/ha as base

    if (!crop) return null;

    // Calculate total nutrient requirements
    const totalN = crop.npkRequirement.n * area * yieldFactor;
    const totalP = crop.npkRequirement.p * area * yieldFactor;
    const totalK = crop.npkRequirement.k * area * yieldFactor;

    // Adjust for soil test values (if available)
    const soilN = soilTest.nitrogen || 0;
    const soilP = soilTest.phosphorus || 0;
    const soilK = soilTest.potassium || 0;

    const requiredN = Math.max(0, totalN - (soilN * area));
    const requiredP = Math.max(0, totalP - (soilP * area));
    const requiredK = Math.max(0, totalK - (soilK * area));

    const recommendations: FertilizerRecommendation[] = [
      {
        nutrient: 'Nitrogen',
        nutrientHindi: 'नाइट्रोजन',
        required: requiredN,
        organicSources: [
          { name: 'Urea', nameHindi: 'यूरिया', quantity: Math.ceil(requiredN / 0.46), npk: '46-0-0' },
          { name: 'Neem Cake', nameHindi: 'नीम खली', quantity: Math.ceil(requiredN / 0.05), npk: '5-1-1' }
        ],
        chemicalSources: [
          { name: 'Urea', nameHindi: 'यूरिया', quantity: Math.ceil(requiredN / 0.46), npk: '46-0-0' },
          { name: 'Ammonium Sulfate', nameHindi: 'अमोनियम सल्फेट', quantity: Math.ceil(requiredN / 0.21), npk: '21-0-0' }
        ],
        applicationTiming: ['Basal', '30 DAS', '60 DAS'],
        applicationTimingHindi: ['बेसल', '30 दिन बाद', '60 दिन बाद']
      },
      {
        nutrient: 'Phosphorus',
        nutrientHindi: 'फास्फोरस',
        required: requiredP,
        organicSources: [
          { name: 'DAP', nameHindi: 'डीएपी', quantity: Math.ceil(requiredP / 0.46), npk: '18-46-0' },
          { name: 'Bone Meal', nameHindi: 'हड्डी का चूर्ण', quantity: Math.ceil(requiredP / 0.15), npk: '3-15-0' }
        ],
        chemicalSources: [
          { name: 'DAP', nameHindi: 'डीएपी', quantity: Math.ceil(requiredP / 0.46), npk: '18-46-0' },
          { name: 'SSP', nameHindi: 'एसएसपी', quantity: Math.ceil(requiredP / 0.16), npk: '0-16-0' }
        ],
        applicationTiming: ['Basal', 'At planting'],
        applicationTimingHindi: ['बेसल', 'बुआई के समय']
      },
      {
        nutrient: 'Potassium',
        nutrientHindi: 'पोटैशियम',
        required: requiredK,
        organicSources: [
          { name: 'MOP', nameHindi: 'एमओपी', quantity: Math.ceil(requiredK / 0.60), npk: '0-0-60' },
          { name: 'Wood Ash', nameHindi: 'लकड़ी की राख', quantity: Math.ceil(requiredK / 0.05), npk: '0-2-5' }
        ],
        chemicalSources: [
          { name: 'MOP', nameHindi: 'एमओपी', quantity: Math.ceil(requiredK / 0.60), npk: '0-0-60' },
          { name: 'SOP', nameHindi: 'एसओपी', quantity: Math.ceil(requiredK / 0.50), npk: '0-0-50' }
        ],
        applicationTiming: ['Basal', '45 DAS'],
        applicationTimingHindi: ['बेसल', '45 दिन बाद']
      }
    ];

    return recommendations;
  }, [selectedCrop, landArea, expectedYield, soilTest]);

  const getSoilPhStatus = (ph: number) => {
    if (ph < 6.0) return { status: 'Acidic', statusHindi: 'अम्लीय', color: 'text-red-600' };
    if (ph > 8.0) return { status: 'Alkaline', statusHindi: 'क्षारीय', color: 'text-blue-600' };
    return { status: 'Neutral', statusHindi: 'उदासीन', color: 'text-green-600' };
  };

  const getNutrientStatus = (value: number, ranges: { low: number; medium: number; high: number }) => {
    if (value < ranges.low) return { status: 'Low', statusHindi: 'कम', color: 'bg-red-100 text-red-800' };
    if (value < ranges.medium) return { status: 'Medium', statusHindi: 'मध्यम', color: 'bg-yellow-100 text-yellow-800' };
    if (value < ranges.high) return { status: 'Good', statusHindi: 'अच्छा', color: 'bg-green-100 text-green-800' };
    return { status: 'High', statusHindi: 'उच्च', color: 'bg-blue-100 text-blue-800' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Leaf className="h-6 w-6" />
            {language === 'hi' ? 'उर्वरक गाइड' : 'Fertilizer Guide'}
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">
            {language === 'hi' ? 'कैलकुलेटर' : 'Calculator'}
          </TabsTrigger>
          <TabsTrigger value="soiltest">
            {language === 'hi' ? 'मिट्टी परीक्षण' : 'Soil Test'}
          </TabsTrigger>
          <TabsTrigger value="guide">
            {language === 'hi' ? 'गाइड' : 'Guide'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-kisan-primary">
                {language === 'hi' ? 'उर्वरक आवश्यकता कैलकुलेटर' : 'Fertilizer Requirement Calculator'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'फसल चुनें' : 'Select Crop'}</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'hi' ? 'फसल चुनें' : 'Choose crop'} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(cropNutrientDatabase).map(([key, crop]) => (
                        <SelectItem key={key} value={key}>
                          {language === 'hi' ? crop.nameHindi : crop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'क्षेत्रफल (एकड़)' : 'Area (Acres)'}</Label>
                  <Input
                    type="number"
                    placeholder={language === 'hi' ? 'एकड़ में दर्ज करें' : 'Enter in acres'}
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'अपेक्षित उत्पादन (क्विंटल/एकड़)' : 'Expected Yield (Quintal/Acre)'}</Label>
                  <Input
                    type="number"
                    placeholder={language === 'hi' ? 'उत्पादन दर्ज करें' : 'Enter yield'}
                    value={expectedYield}
                    onChange={(e) => setExpectedYield(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              {selectedCrop && landArea && (
                <Button onClick={() => setActiveTab('soiltest')} className="bg-kisan-primary hover:bg-kisan-primary/90">
                  {language === 'hi' ? 'मिट्टी परीक्षण जोड़ें (वैकल्पिक)' : 'Add Soil Test (Optional)'}
                </Button>
              )}
            </CardContent>
          </Card>

          {fertilizerRecommendations && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-kisan-primary">
                    {language === 'hi' ? 'उर्वरक सिफारिश' : 'Fertilizer Recommendations'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {fertilizerRecommendations.map((rec, index) => (
                      <Card key={index} className="border-l-4 border-l-kisan-primary">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <FlaskConical className="h-5 w-5" />
                            {language === 'hi' ? rec.nutrientHindi : rec.nutrient}
                            <Badge variant="outline">
                              {rec.required.toFixed(1)} kg
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-green-600">
                                {language === 'hi' ? 'जैविक स्रोत:' : 'Organic Sources:'}
                              </h4>
                              <div className="space-y-2">
                                {rec.organicSources.slice(0, 2).map((source, idx) => (
                                  <div key={idx} className="flex justify-between items-center p-2 bg-green-50 rounded">
                                    <span className="text-sm">
                                      {language === 'hi' ? source.nameHindi : source.name}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {source.quantity} kg/ha
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-blue-600">
                                {language === 'hi' ? 'रासायनिक स्रोत:' : 'Chemical Sources:'}
                              </h4>
                              <div className="space-y-2">
                                {rec.chemicalSources.slice(0, 2).map((source, idx) => (
                                  <div key={idx} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                    <span className="text-sm">
                                      {language === 'hi' ? source.nameHindi : source.name}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {source.quantity} kg/ha
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-semibold mb-2 text-orange-600">
                              {language === 'hi' ? 'प्रयोग का समय:' : 'Application Timing:'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(language === 'hi' ? rec.applicationTimingHindi : rec.applicationTiming).map((timing, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {timing}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="soiltest" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kisan-primary">
                <TestTube className="h-6 w-6" />
                {language === 'hi' ? 'मिट्टी परीक्षण डेटा' : 'Soil Test Data'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'pH मान' : 'pH Value'}</Label>
                  <Input
                    type="number"
                    placeholder="6.5 - 7.5"
                    value={soilTest.ph || ''}
                    onChange={(e) => updateSoilTest('ph', e.target.value)}
                    min="3"
                    max="11"
                    step="0.1"
                  />
                  {soilTest.ph && (
                    <p className={`text-xs ${getSoilPhStatus(soilTest.ph).color}`}>
                      {language === 'hi' ? getSoilPhStatus(soilTest.ph).statusHindi : getSoilPhStatus(soilTest.ph).status}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'जैविक कार्बन (%)' : 'Organic Carbon (%)'}</Label>
                  <Input
                    type="number"
                    placeholder="0.5 - 1.5"
                    value={soilTest.organicCarbon || ''}
                    onChange={(e) => updateSoilTest('organicCarbon', e.target.value)}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'नाइट्रोजन (kg/ha)' : 'Nitrogen (kg/ha)'}</Label>
                  <Input
                    type="number"
                    placeholder="200 - 300"
                    value={soilTest.nitrogen || ''}
                    onChange={(e) => updateSoilTest('nitrogen', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'फास्फोरस (kg/ha)' : 'Phosphorus (kg/ha)'}</Label>
                  <Input
                    type="number"
                    placeholder="10 - 25"
                    value={soilTest.phosphorus || ''}
                    onChange={(e) => updateSoilTest('phosphorus', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'पोटैशियम (kg/ha)' : 'Potassium (kg/ha)'}</Label>
                  <Input
                    type="number"
                    placeholder="120 - 280"
                    value={soilTest.potassium || ''}
                    onChange={(e) => updateSoilTest('potassium', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'जिंक (ppm)' : 'Zinc (ppm)'}</Label>
                  <Input
                    type="number"
                    placeholder="0.6 - 1.2"
                    value={soilTest.zinc || ''}
                    onChange={(e) => updateSoilTest('zinc', e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setActiveTab('calculator')} variant="outline">
                  {language === 'hi' ? 'वापस कैलकुलेटर' : 'Back to Calculator'}
                </Button>
                <Button onClick={() => setActiveTab('guide')} variant="outline">
                  {language === 'hi' ? 'गाइड देखें' : 'View Guide'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Leaf className="h-5 w-5" />
                  {language === 'hi' ? 'जैविक उर्वरक' : 'Organic Fertilizers'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {organicFertilizers.map((fertilizer, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-green-800">
                            {language === 'hi' ? fertilizer.nameHindi : fertilizer.name}
                          </h4>
                          <p className="text-xs text-green-600">NPK: {fertilizer.npk}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {fertilizer.quantity} kg/ha
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <FlaskConical className="h-5 w-5" />
                  {language === 'hi' ? 'रासायनिक उर्वरक' : 'Chemical Fertilizers'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chemicalFertilizers.map((fertilizer, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-blue-800">
                            {language === 'hi' ? fertilizer.nameHindi : fertilizer.name}
                          </h4>
                          <p className="text-xs text-blue-600">NPK: {fertilizer.npk}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {fertilizer.quantity} kg/ha
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                  {language === 'hi' ? 'उर्वरक उपयोग की सलाह' : 'Fertilizer Usage Tips'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-kisan-text-primary">
                      {language === 'hi' ? 'सामान्य सलाह:' : 'General Tips:'}
                    </h4>
                    <ul className="space-y-1 text-kisan-text-secondary">
                      <li>• {language === 'hi' ? 'मिट्टी परीक्षण के आधार पर उर्वरक दें' : 'Apply fertilizer based on soil test'}</li>
                      <li>• {language === 'hi' ? 'सही समय पर प्रयोग करें' : 'Apply at the right time'}</li>
                      <li>• {language === 'hi' ? 'जैविक और रासायनिक उर्वरक का मिश्रण उपयोग करें' : 'Use combination of organic and chemical fertilizers'}</li>
                      <li>• {language === 'hi' ? 'नाइट्रोजन को भागों में दें' : 'Split nitrogen application'}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-kisan-text-primary">
                      {language === 'hi' ? 'सावधानियां:' : 'Precautions:'}
                    </h4>
                    <ul className="space-y-1 text-kisan-text-secondary">
                      <li>• {language === 'hi' ? 'अधिक उर्वरक न दें' : 'Avoid over-fertilization'}</li>
                      <li>• {language === 'hi' ? 'नम मिट्टी में प्रयोग करें' : 'Apply in moist soil'}</li>
                      <li>• {language === 'hi' ? 'हवा रहित दिन में छिड़काव करें' : 'Spray on windless days'}</li>
                      <li>• {language === 'hi' ? 'सुरक्षा उपकरण का उपयोग करें' : 'Use safety equipment'}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FertilizerGuide;
