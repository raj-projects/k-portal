import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  Calendar, 
  Calculator, 
  TrendingDown, 
  Thermometer, 
  CloudRain, 
  Clock,
  MapPin,
  Target,
  DollarSign,
  Sprout,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface IrrigationInputs {
  cropType: string;
  landArea: string;
  soilType: string;
  season: string;
  irrigationMethod: string;
  waterSource: string;
  location: string;
}

interface IrrigationPlan {
  totalWaterNeeded: number;
  dailyWaterNeeded: number;
  weeklySchedule: Array<{
    day: string;
    amount: number;
    time: string;
    duration: number;
  }>;
  irrigationFrequency: string;
  costEstimate: number;
  waterEfficiency: number;
  savings: number;
  recommendations: string[];
  monthlyPlan: Array<{
    month: string;
    frequency: string;
    amount: number;
    cost: number;
  }>;
}

const cropWaterRequirements = {
  wheat: { 
    dailyMm: 4.5, 
    totalMm: 450, 
    growthStages: [
      { stage: 'Germination', days: 10, dailyMm: 3 },
      { stage: 'Tillering', days: 35, dailyMm: 4 },
      { stage: 'Jointing', days: 30, dailyMm: 5.5 },
      { stage: 'Flowering', days: 25, dailyMm: 6 },
      { stage: 'Grain filling', days: 30, dailyMm: 4.5 },
      { stage: 'Maturity', days: 20, dailyMm: 2 }
    ]
  },
  rice: { 
    dailyMm: 8, 
    totalMm: 1200, 
    growthStages: [
      { stage: 'Nursery', days: 25, dailyMm: 6 },
      { stage: 'Transplanting', days: 10, dailyMm: 10 },
      { stage: 'Tillering', days: 45, dailyMm: 8 },
      { stage: 'Panicle initiation', days: 25, dailyMm: 9 },
      { stage: 'Flowering', days: 20, dailyMm: 10 },
      { stage: 'Grain filling', days: 30, dailyMm: 8 },
      { stage: 'Maturity', days: 15, dailyMm: 4 }
    ]
  },
  cotton: { 
    dailyMm: 5.5, 
    totalMm: 700, 
    growthStages: [
      { stage: 'Emergence', days: 15, dailyMm: 3 },
      { stage: 'Squaring', days: 45, dailyMm: 5 },
      { stage: 'Flowering', days: 45, dailyMm: 7 },
      { stage: 'Boll development', days: 45, dailyMm: 6 },
      { stage: 'Boll opening', days: 30, dailyMm: 3 }
    ]
  },
  sugarcane: { 
    dailyMm: 6, 
    totalMm: 1800, 
    growthStages: [
      { stage: 'Germination', days: 30, dailyMm: 4 },
      { stage: 'Tillering', days: 60, dailyMm: 6 },
      { stage: 'Grand growth', days: 180, dailyMm: 7 },
      { stage: 'Maturity', days: 90, dailyMm: 4 }
    ]
  },
  maize: { 
    dailyMm: 5, 
    totalMm: 500, 
    growthStages: [
      { stage: 'Emergence', days: 10, dailyMm: 3 },
      { stage: 'Vegetative', days: 40, dailyMm: 4 },
      { stage: 'Tasseling', days: 20, dailyMm: 7 },
      { stage: 'Grain filling', days: 40, dailyMm: 6 },
      { stage: 'Maturity', days: 20, dailyMm: 3 }
    ]
  }
};

const soilWaterHolding = {
  clay: { capacity: 200, infiltration: 0.5 },
  loamy: { capacity: 150, infiltration: 1.0 },
  sandy: { capacity: 100, infiltration: 2.0 }
};

const irrigationEfficiency = {
  flood: { efficiency: 0.6, cost: 0.3 },
  sprinkler: { efficiency: 0.8, cost: 0.8 },
  drip: { efficiency: 0.95, cost: 1.2 },
  micro: { efficiency: 0.9, cost: 1.0 }
};

const months = [
  { num: 1, name: 'January', nameHindi: 'जनवरी' },
  { num: 2, name: 'February', nameHindi: 'फरवरी' },
  { num: 3, name: 'March', nameHindi: 'मार्च' },
  { num: 4, name: 'April', nameHindi: 'अप्रैल' },
  { num: 5, name: 'May', nameHindi: 'मई' },
  { num: 6, name: 'June', nameHindi: 'जून' },
  { num: 7, name: 'July', nameHindi: 'जुलाई' },
  { num: 8, name: 'August', nameHindi: 'अगस्त' },
  { num: 9, name: 'September', nameHindi: 'सितंबर' },
  { num: 10, name: 'October', nameHindi: 'अक्टूबर' },
  { num: 11, name: 'November', nameHindi: 'नवंबर' },
  { num: 12, name: 'December', nameHindi: 'दिसंबर' }
];

const IrrigationPlanner = () => {
  const { language } = useLanguage();
  
  const [inputs, setInputs] = useState<IrrigationInputs>({
    cropType: '',
    landArea: '',
    soilType: '',
    season: '',
    irrigationMethod: '',
    waterSource: '',
    location: ''
  });

  const [plan, setPlan] = useState<IrrigationPlan | null>(null);
  const [activeTab, setActiveTab] = useState('planner');

  const calculateIrrigationPlan = () => {
    if (!inputs.cropType || !inputs.landArea || !inputs.soilType || !inputs.irrigationMethod) {
      return;
    }

    const cropData = cropWaterRequirements[inputs.cropType as keyof typeof cropWaterRequirements];
    const soilData = soilWaterHolding[inputs.soilType as keyof typeof soilWaterHolding];
    const irrigationData = irrigationEfficiency[inputs.irrigationMethod as keyof typeof irrigationEfficiency];
    
    const area = parseFloat(inputs.landArea) * 4047; // Convert acres to m²
    
    // Calculate water requirements
    const dailyWaterMm = cropData.dailyMm;
    const totalWaterMm = cropData.totalMm;
    
    // Adjust for irrigation efficiency
    const actualDailyWater = (dailyWaterMm * area) / irrigationData.efficiency; // liters
    const actualTotalWater = (totalWaterMm * area) / irrigationData.efficiency; // liters
    
    // Calculate cost
    const waterCostPerLiter = 0.5; // ₹0.5 per liter
    const totalCost = actualTotalWater * waterCostPerLiter;
    
    // Calculate savings compared to flood irrigation
    const floodWater = (totalWaterMm * area) / irrigationEfficiency.flood.efficiency;
    const savings = floodWater - actualTotalWater;
    
    // Generate weekly schedule
    const irrigationFrequency = inputs.irrigationMethod === 'drip' ? 1 : 
                               inputs.irrigationMethod === 'sprinkler' ? 2 : 7;
    
    const weeklySchedule = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i += irrigationFrequency) {
      if (irrigationFrequency === 1 || (i % irrigationFrequency === 0)) {
        weeklySchedule.push({
          day: days[i],
          amount: Math.round(actualDailyWater * irrigationFrequency),
          time: inputs.irrigationMethod === 'drip' ? '06:00' : '05:30',
          duration: inputs.irrigationMethod === 'drip' ? 240 : 120
        });
      }
    }

    // Generate monthly plan
    const monthlyPlan = months.map(month => ({
      month: language === 'hi' ? month.nameHindi : month.name,
      frequency: inputs.irrigationMethod === 'drip' ? 'Daily' : 
                inputs.irrigationMethod === 'sprinkler' ? 'Alternate days' : 'Weekly',
      amount: Math.round(actualDailyWater * 30),
      cost: Math.round(actualDailyWater * 30 * waterCostPerLiter)
    }));

    // Generate recommendations
    const recommendations = [
      language === 'hi' ? 'सुबह 5-7 बजे या शाम 5-7 बजे सिंचाई करें' : 'Irrigate early morning (5-7 AM) or evening (5-7 PM)',
      language === 'hi' ? 'मिट्टी की नमी की ��ियमित जांच करें' : 'Monitor soil moisture regularly',
      language === 'hi' ? 'बारिश के बाद सिंचाई न करें' : 'Skip irrigation after rainfall',
      language === 'hi' ? 'मल्चिंग से पानी की बचत करें' : 'Use mulching to conserve water',
    ];

    if (inputs.irrigationMethod === 'drip') {
      recommendations.push(
        language === 'hi' ? 'ड्रिप सिस्टम से 40% पानी बचा सकते हैं' : 'Drip system can save 40% water',
        language === 'hi' ? 'फिल्टर की नियमित सफाई करें' : 'Clean filters regularly'
      );
    }

    setPlan({
      totalWaterNeeded: Math.round(actualTotalWater),
      dailyWaterNeeded: Math.round(actualDailyWater),
      weeklySchedule,
      irrigationFrequency: inputs.irrigationMethod === 'drip' ? 
        (language === 'hi' ? 'दैनिक' : 'Daily') : 
        inputs.irrigationMethod === 'sprinkler' ? 
        (language === 'hi' ? 'वैकल्पिक दिन' : 'Alternate days') : 
        (language === 'hi' ? 'साप्ताहिक' : 'Weekly'),
      costEstimate: Math.round(totalCost),
      waterEfficiency: Math.round(irrigationData.efficiency * 100),
      savings: Math.round(savings),
      recommendations,
      monthlyPlan
    });
  };

  const resetForm = () => {
    setInputs({
      cropType: '',
      landArea: '',
      soilType: '',
      season: '',
      irrigationMethod: '',
      waterSource: '',
      location: ''
    });
    setPlan(null);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planner">
            {language === 'hi' ? 'योजनाकार' : 'Planner'}
          </TabsTrigger>
          <TabsTrigger value="schedule">
            {language === 'hi' ? 'अनुसूची' : 'Schedule'}
          </TabsTrigger>
          <TabsTrigger value="analysis">
            {language === 'hi' ? 'विश्लेषण' : 'Analysis'}
          </TabsTrigger>
          <TabsTrigger value="guide">
            {language === 'hi' ? 'गाइड' : 'Guide'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kisan-primary">
                <Calculator className="h-6 w-6" />
                {language === 'hi' ? 'सिंचाई योजना कैलकुलेटर' : 'Irrigation Plan Calculator'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-kisan-text-primary">
                    {language === 'hi' ? 'फसल और भूमि की जानकारी' : 'Crop and Land Information'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-kisan-text-secondary mb-1">
                      {language === 'hi' ? 'फसल प्रकार' : 'Crop Type'}
                    </label>
                    <Select value={inputs.cropType} onValueChange={(value) => setInputs({...inputs, cropType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'hi' ? 'फसल चुनें' : 'Select crop'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">{language === 'hi' ? 'गेहूं' : 'Wheat'}</SelectItem>
                        <SelectItem value="rice">{language === 'hi' ? 'धान' : 'Rice'}</SelectItem>
                        <SelectItem value="cotton">{language === 'hi' ? 'कपास' : 'Cotton'}</SelectItem>
                        <SelectItem value="sugarcane">{language === 'hi' ? 'गन्ना' : 'Sugarcane'}</SelectItem>
                        <SelectItem value="maize">{language === 'hi' ? 'मक्का' : 'Maize'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-kisan-text-secondary mb-1">
                      {language === 'hi' ? 'भूमि क्षेत्रफल (एकड़)' : 'Land Area (Acres)'}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.landArea}
                      onChange={(e) => setInputs({...inputs, landArea: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder={language === 'hi' ? 'उदाहरण: 2.5' : 'Example: 2.5'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-kisan-text-secondary mb-1">
                      {language === 'hi' ? 'मिट्टी का प्रकार' : 'Soil Type'}
                    </label>
                    <Select value={inputs.soilType} onValueChange={(value) => setInputs({...inputs, soilType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'hi' ? 'मिट्टी चुनें' : 'Select soil type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">{language === 'hi' ? 'चिकनी मिट्टी' : 'Clay Soil'}</SelectItem>
                        <SelectItem value="loamy">{language === 'hi' ? 'दोमट मिट्टी' : 'Loamy Soil'}</SelectItem>
                        <SelectItem value="sandy">{language === 'hi' ? 'रेतीली मिट्टी' : 'Sandy Soil'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-kisan-text-secondary mb-1">
                      {language === 'hi' ? 'सिं���ाई विधि' : 'Irrigation Method'}
                    </label>
                    <Select value={inputs.irrigationMethod} onValueChange={(value) => setInputs({...inputs, irrigationMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'hi' ? 'सिंचाई विधि चुनें' : 'Select irrigation method'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flood">{language === 'hi' ? 'पारंपरिक सिंचाई' : 'Flood Irrigation'}</SelectItem>
                        <SelectItem value="sprinkler">{language === 'hi' ? 'स्प्रिंकलर सिस्टम' : 'Sprinkler System'}</SelectItem>
                        <SelectItem value="drip">{language === 'hi' ? 'ड्रिप सिस्टम' : 'Drip System'}</SelectItem>
                        <SelectItem value="micro">{language === 'hi' ? 'माइक्रो स्प्रिंकलर' : 'Micro Sprinkler'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-kisan-text-secondary mb-1">
                      {language === 'hi' ? 'पानी का स्रोत' : 'Water Source'}
                    </label>
                    <Select value={inputs.waterSource} onValueChange={(value) => setInputs({...inputs, waterSource: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'hi' ? 'पानी का स्रोत चुनें' : 'Select water source'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tubewell">{language === 'hi' ? 'ट्यूबवेल' : 'Tubewell'}</SelectItem>
                        <SelectItem value="canal">{language === 'hi' ? 'नहर' : 'Canal'}</SelectItem>
                        <SelectItem value="river">{language === 'hi' ? 'नदी' : 'River'}</SelectItem>
                        <SelectItem value="rainwater">{language === 'hi' ? 'वर्षा जल' : 'Rainwater'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={calculateIrrigationPlan} className="flex-1">
                      <Calculator className="h-4 w-4 mr-2" />
                      {language === 'hi' ? 'योजना बनाएं' : 'Create Plan'}
                    </Button>
                    <Button onClick={resetForm} variant="outline">
                      {language === 'hi' ? 'रीसे���' : 'Reset'}
                    </Button>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-kisan-text-primary">
                    {language === 'hi' ? 'सिंचाई योजना परिणाम' : 'Irrigation Plan Results'}
                  </h3>
                  
                  {plan ? (
                    <div className="space-y-4">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'दैनिक पानी' : 'Daily Water'}
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              {plan.dailyWaterNeeded.toLocaleString()} L
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 text-center">
                            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'अनुमानित लागत' : 'Estimated Cost'}
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              ₹{plan.costEstimate.toLocaleString()}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 text-center">
                            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'दक्षता' : 'Efficiency'}
                            </p>
                            <p className="text-lg font-bold text-purple-600">
                              {plan.waterEfficiency}%
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 text-center">
                            <TrendingDown className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? 'पानी की बचत' : 'Water Saved'}
                            </p>
                            <p className="text-lg font-bold text-orange-600">
                              {plan.savings.toLocaleString()} L
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Recommendations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {language === 'hi' ? 'सुझाव' : 'Recommendations'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-green-600 mt-1">•</span>
                                <span className="text-kisan-text-secondary">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-kisan text-center">
                      <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-kisan-text-secondary">
                        {language === 'hi' 
                          ? 'विवरण भरकर अपनी सिंचाई योजना बनाएं'
                          : 'Fill in the details to create your irrigation plan'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          {plan ? (
            <div className="grid gap-6">
              {/* Weekly Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {language === 'hi' ? 'साप्ताहिक सिंचाई अनुसूची' : 'Weekly Irrigation Schedule'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {plan.weeklySchedule.map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-kisan">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{schedule.day}</p>
                            <p className="text-sm text-kisan-text-secondary">
                              {schedule.time} - {schedule.duration} {language === 'hi' ? 'मिनट' : 'minutes'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {schedule.amount.toLocaleString()} L
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5" />
                    {language === 'hi' ? 'मासिक योजना' : 'Monthly Plan'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">{language === 'hi' ? 'महीना' : 'Month'}</th>
                          <th className="text-left p-2">{language === 'hi' ? 'आवृत्ति' : 'Frequency'}</th>
                          <th className="text-left p-2">{language === 'hi' ? 'मात्रा (L)' : 'Amount (L)'}</th>
                          <th className="text-left p-2">{language === 'hi' ? 'लागत (₹)' : 'Cost (₹)'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plan.monthlyPlan.slice(0, 6).map((month, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{month.month}</td>
                            <td className="p-2">{month.frequency}</td>
                            <td className="p-2">{month.amount.toLocaleString()}</td>
                            <td className="p-2">₹{month.cost.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-kisan-text-secondary">
                  {language === 'hi' 
                    ? 'पहले योजनाकार टैब में अपनी सिंचाई योजना बनाएं'
                    : 'Create your irrigation plan in the Planner tab first'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {plan ? (
            <div className="grid gap-6">
              {/* Water Efficiency Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    {language === 'hi' ? 'जल दक्षता विश्लेषण' : 'Water Efficiency Analysis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-kisan">
                      <Droplets className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-kisan-text-secondary">
                        {language === 'hi' ? 'वर्तमान दक्षता' : 'Current Efficiency'}
                      </p>
                      <p className="text-2xl font-bold text-green-600">{plan.waterEfficiency}%</p>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-kisan">
                      <TrendingDown className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-kisan-text-secondary">
                        {language === 'hi' ? 'पानी की बचत' : 'Water Savings'}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {((plan.savings / (plan.totalWaterNeeded + plan.savings)) * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-kisan">
                      <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-kisan-text-secondary">
                        {language === 'hi' ? 'लागत बचत' : 'Cost Savings'}
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₹{Math.round(plan.savings * 0.5).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Stage Water Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5" />
                    {language === 'hi' ? 'फसल वृद्धि चरण' : 'Crop Growth Stages'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {inputs.cropType && cropWaterRequirements[inputs.cropType as keyof typeof cropWaterRequirements] && (
                    <div className="space-y-3">
                      {cropWaterRequirements[inputs.cropType as keyof typeof cropWaterRequirements].growthStages.map((stage, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-kisan">
                          <div>
                            <p className="font-medium">{stage.stage}</p>
                            <p className="text-sm text-kisan-text-secondary">
                              {stage.days} {language === 'hi' ? 'दिन' : 'days'}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {stage.dailyMm} mm/day
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-kisan-text-secondary">
                  {language === 'hi' 
                    ? 'विश्लेषण देखने के लिए पहले योजना बनाएं'
                    : 'Create a plan first to view analysis'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            {/* Irrigation Method Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  {language === 'hi' ? 'सिंचाई विधियों की तुलना' : 'Irrigation Methods Comparison'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(irrigationEfficiency).map(([method, data]) => (
                    <div key={method} className="p-4 border rounded-kisan">
                      <h4 className="font-medium mb-2">
                        {method === 'flood' ? (language === 'hi' ? 'पारंपरिक' : 'Flood') :
                         method === 'sprinkler' ? (language === 'hi' ? 'स्प्रिंकलर' : 'Sprinkler') :
                         method === 'drip' ? (language === 'hi' ? 'ड्रिप' : 'Drip') :
                         (language === 'hi' ? 'माइक्रो' : 'Micro')}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{language === 'hi' ? 'दक्षता:' : 'Efficiency:'}</span>
                          <span className="font-medium">{Math.round(data.efficiency * 100)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === 'hi' ? 'लागत:' : 'Cost:'}</span>
                          <Badge variant={data.cost < 0.5 ? 'default' : data.cost < 1 ? 'secondary' : 'destructive'}>
                            {data.cost < 0.5 ? (language === 'hi' ? 'कम' : 'Low') :
                             data.cost < 1 ? (language === 'hi' ? 'मध्यम' : 'Medium') :
                             (language === 'hi' ? 'उच्च' : 'High')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {language === 'hi' ? 'सिंचाई की सर्वोत्तम प्रथाएं' : 'Irrigation Best Practices'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">
                      {language === 'hi' ? 'करें:' : 'Do:'}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'सुबह या शाम सिंचाई करें' : 'Irrigate early morning or evening'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'मिट्टी की नमी ��ांचें' : 'Check soil moisture regularly'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'मल्चिंग का प्रयोग करें' : 'Use mulching to retain moisture'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'जल संरक्षण तकनीक अपनाएं' : 'Adopt water conservation techniques'}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-red-600">
                      {language === 'hi' ? 'न करें:' : "Don't:"}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'दोपहर में सिंचाई न करें' : 'Avoid irrigation during hot noon'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'अधिक पानी न दें' : 'Avoid overwatering'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'बारिश के बाद सिंचाई न करें' : 'Skip irrigation after rainfall'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{language === 'hi' ? 'पानी बर्बाद न करें' : 'Avoid water wastage'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  {language === 'hi' ? 'मौसमी सुझाव' : 'Seasonal Tips'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-kisan">
                    <CloudRain className="h-8 w-8 text-blue-600 mb-2" />
                    <h4 className="font-medium text-blue-800 mb-2">
                      {language === 'hi' ? 'मानसून' : 'Monsoon'}
                    </h4>
                    <p className="text-sm text-blue-700">
                      {language === 'hi' 
                        ? 'बारिश के बाद सिंचाई कम करें। जल निकासी का ध्यान रखें।'
                        : 'Reduce irrigation after rainfall. Ensure proper drainage.'
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-kisan">
                    <Thermometer className="h-8 w-8 text-orange-600 mb-2" />
                    <h4 className="font-medium text-orange-800 mb-2">
                      {language === 'hi' ? 'गर्मी' : 'Summer'}
                    </h4>
                    <p className="text-sm text-orange-700">
                      {language === 'hi' 
                        ? 'पानी की मात्रा बढ़ाएं। वाष्पीकरण कम करने के उपाय करें।'
                        : 'Increase water quantity. Use measures to reduce evaporation.'
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-kisan">
                    <Cloud className="h-8 w-8 text-gray-600 mb-2" />
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'hi' ? 'सर्दी' : 'Winter'}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {language === 'hi' 
                        ? 'कम पानी दें। ठंड से बचाव के लिए सुबह सिंचाई करें।'
                        : 'Reduce water quantity. Irrigate in morning to protect from cold.'
                      }
                    </p>
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

export default IrrigationPlanner;
