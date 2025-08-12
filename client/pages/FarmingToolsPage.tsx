import React, { useState, useEffect } from 'react';
import { 
  Calculator, Droplets, Bug, Tractor, Calendar, Target,
  Ruler, Thermometer, DollarSign, Wheat, Leaf, Zap,
  BarChart3, TrendingUp, Info, Download, RefreshCw,
  ChevronRight, Play, BookOpen, MapPin
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface Tool {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  category: string;
  icon: any;
  featured: boolean;
  interactive: boolean;
}

interface CalculatorResult {
  type: string;
  value: number;
  unit: string;
  recommendations: string[];
}

const FarmingToolsPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState<Record<string, any>>({});
  const [calculatorResults, setCalculatorResults] = useState<CalculatorResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const tools: Tool[] = [
    {
      id: 'crop-calculator',
      name: 'Crop Cost Calculator',
      nameHindi: 'फसल लागत कैलकुलेटर',
      description: 'Calculate farming costs, expected yield, and profitability',
      descriptionHindi: 'खेती की लागत, अपेक्षित उत्पादन और लाभप्रदता की गणना करें',
      category: 'calculator',
      icon: Calculator,
      featured: true,
      interactive: true
    },
    {
      id: 'irrigation-planner',
      name: 'Irrigation Planner',
      nameHindi: 'सिंचाई योजनाकार',
      description: 'Plan irrigation schedule and water requirements',
      descriptionHindi: 'सिंचाई अनुसूची और पानी की आवश्यकताओं की योजना बनाएं',
      category: 'planner',
      icon: Droplets,
      featured: true,
      interactive: true
    },
    {
      id: 'pest-identifier',
      name: 'Pest & Disease Identifier',
      nameHindi: 'कीट और रोग पहचानकर्ता',
      description: 'Identify pests and diseases with treatment suggestions',
      descriptionHindi: 'उपचार सुझावों के साथ कीटों और रोगों की पहचान करें',
      category: 'identifier',
      icon: Bug,
      featured: true,
      interactive: true
    },
    {
      id: 'equipment-rental',
      name: 'Equipment Rental Calculator',
      nameHindi: 'उपकरण किराया कैलकुलेटर',
      description: 'Calculate equipment rental costs and availability',
      descriptionHindi: 'उपकरण किराया ल��गत और उपलब्धता की गणना करें',
      category: 'calculator',
      icon: Tractor,
      featured: false,
      interactive: true
    },
    {
      id: 'crop-calendar',
      name: 'Crop Calendar',
      nameHindi: 'फसल कैलेंडर',
      description: 'Region-specific crop calendar with timing guidance',
      descriptionHindi: 'समय मार्गदर्शन के साथ क्षेत्र-विशिष्ट फसल कैलेंडर',
      category: 'planner',
      icon: Calendar,
      featured: true,
      interactive: true
    },
    {
      id: 'yield-predictor',
      name: 'Yield Predictor',
      nameHindi: 'उत्पादन पूर्वानुमान',
      description: 'Predict crop yield based on various factors',
      descriptionHindi: 'विभिन्न कारकों के आधार पर फसल उत्पादन का पूर्वानुमान लगाएं',
      category: 'predictor',
      icon: Target,
      featured: false,
      interactive: true
    },
    {
      id: 'fertilizer-calculator',
      name: 'Fertilizer Calculator',
      nameHindi: 'उर्वरक कैलकुलेटर',
      description: 'Calculate fertilizer requirements based on soil and crop',
      descriptionHindi: 'मिट्टी और फसल के आधार पर उर्वरक आवश्यकताओं की गणना करें',
      category: 'calculator',
      icon: Leaf,
      featured: true,
      interactive: true
    },
    {
      id: 'weather-advisor',
      name: 'Weather Advisory Tool',
      nameHindi: 'मौसम सलाह उपकरण',
      description: 'Get farming advice based on weather forecasts',
      descriptionHindi: 'मौसम पूर्वानुमान के आधार पर खेती की सलाह प्राप्त करें',
      category: 'advisor',
      icon: Thermometer,
      featured: false,
      interactive: true
    }
  ];

  const categories = [
    { id: 'all', name: 'सभी उपकरण', nameEn: 'All Tools' },
    { id: 'calculator', name: 'कैलकुलेटर', nameEn: 'Calculators' },
    { id: 'planner', name: 'योजनाकार', nameEn: 'Planners' },
    { id: 'identifier', name: 'पहचानकर्ता', nameEn: 'Identifiers' },
    { id: 'predictor', name: 'पूर्वानुमान', nameEn: 'Predictors' },
    { id: 'advisor', name: 'सलाहकार', nameEn: 'Advisors' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  // Crop Cost Calculator Component
  const CropCostCalculator = () => {
    const [inputs, setInputs] = useState({
      cropType: 'wheat',
      landArea: '',
      seedCost: '',
      fertilizerCost: '',
      laborCost: '',
      irrigationCost: '',
      otherCosts: '',
      expectedYield: '',
      marketPrice: ''
    });

    const [results, setResults] = useState<any>(null);

    const calculateCosts = () => {
      setIsCalculating(true);
      
      setTimeout(() => {
        const totalCosts = parseFloat(inputs.seedCost || '0') + 
                          parseFloat(inputs.fertilizerCost || '0') + 
                          parseFloat(inputs.laborCost || '0') + 
                          parseFloat(inputs.irrigationCost || '0') + 
                          parseFloat(inputs.otherCosts || '0');
        
        const expectedRevenue = parseFloat(inputs.expectedYield || '0') * parseFloat(inputs.marketPrice || '0');
        const profit = expectedRevenue - totalCosts;
        const profitPercentage = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

        setResults({
          totalCosts,
          expectedRevenue,
          profit,
          profitPercentage,
          costPerKg: totalCosts / parseFloat(inputs.expectedYield || '1'),
          breakEvenPrice: totalCosts / parseFloat(inputs.expectedYield || '1')
        });
        
        setIsCalculating(false);
      }, 1000);
    };

    const crops = [
      { value: 'wheat', label: 'गेहूं', labelEn: 'Wheat' },
      { value: 'rice', label: 'चावल', labelEn: 'Rice' },
      { value: 'cotton', label: 'कपास', labelEn: 'Cotton' },
      { value: 'sugarcane', label: 'गन्ना', labelEn: 'Sugarcane' },
      { value: 'maize', label: 'मक्का', labelEn: 'Maize' }
    ];

    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
              विवरण दर्ज करें
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                फसल प्रकार
              </label>
              <select
                value={inputs.cropType}
                onChange={(e) => setInputs({...inputs, cropType: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                {crops.map(crop => (
                  <option key={crop.value} value={crop.value}>
                    {currentLanguage === 'en' ? crop.labelEn : crop.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                भूमि का क्षेत्रफल (एकड़)
              </label>
              <input
                type="number"
                value={inputs.landArea}
                onChange={(e) => setInputs({...inputs, landArea: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="उदाहरण: 5"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                  बीज लागत (₹)
                </label>
                <input
                  type="number"
                  value={inputs.seedCost}
                  onChange={(e) => setInputs({...inputs, seedCost: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                  उर्वरक लागत (₹)
                </label>
                <input
                  type="number"
                  value={inputs.fertilizerCost}
                  onChange={(e) => setInputs({...inputs, fertilizerCost: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                  मजदूरी लागत (₹)
                </label>
                <input
                  type="number"
                  value={inputs.laborCost}
                  onChange={(e) => setInputs({...inputs, laborCost: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                  सिंचाई लागत (₹)
                </label>
                <input
                  type="number"
                  value={inputs.irrigationCost}
                  onChange={(e) => setInputs({...inputs, irrigationCost: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                अन्य लागत (₹)
              </label>
              <input
                type="number"
                value={inputs.otherCosts}
                onChange={(e) => setInputs({...inputs, otherCosts: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                  अपेक्षित उत्पादन (क्विंटल)
                </label>
                <input
                  type="number"
                  value={inputs.expectedYield}
                  onChange={(e) => setInputs({...inputs, expectedYield: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                  बाजार दर (₹/क्विंटल)
                </label>
                <input
                  type="number"
                  value={inputs.marketPrice}
                  onChange={(e) => setInputs({...inputs, marketPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <button
              onClick={calculateCosts}
              disabled={isCalculating}
              className="w-full bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors disabled:opacity-50 font-devanagari"
            >
              {isCalculating ? 'गणना कर रहे हैं...' : 'लागत की गणना क���ें'}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
              परिणाम
            </h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-kisan">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">कुल लागत</p>
                      <p className="text-xl font-bold text-red-600">₹{results.totalCosts.toLocaleString('hi-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">अपेक्षित आय</p>
                      <p className="text-xl font-bold text-blue-600">₹{results.expectedRevenue.toLocaleString('hi-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">शुद्ध लाभ</p>
                      <p className={`text-xl font-bold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{results.profit.toLocaleString('hi-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">लाभ प्रतिशत</p>
                      <p className={`text-xl font-bold ${results.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.profitPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-kisan">
                  <h4 className="font-semibold text-kisan-text-primary mb-2 font-devanagari">विश्लेषण</h4>
                  <div className="space-y-2 text-sm text-kisan-text-secondary">
                    <p className="font-devanagari">
                      • प्रति क्विंटल लागत: ₹{results.costPerKg.toFixed(2)}
                    </p>
                    <p className="font-devanagari">
                      • न्यूनतम विक्रय मूल्य: ₹{results.breakEvenPrice.toFixed(2)}/क्विंटल
                    </p>
                    <p className="font-devanagari">
                      • {results.profit > 0 ? 'यह एक लाभदायक फसल है!' : 'लागत कम करने के उपाय खोजें'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-kisan text-center">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-kisan-text-muted font-devanagari">
                  विवरण भरकर गणना करें
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Irrigation Planner Component
  const IrrigationPlanner = () => {
    const [irrigationInputs, setIrrigationInputs] = useState({
      cropType: 'wheat',
      landArea: '',
      soilType: 'loamy',
      season: 'rabi',
      irrigationMethod: 'flood'
    });

    const [irrigationPlan, setIrrigationPlan] = useState<any>(null);

    const createIrrigationPlan = () => {
      // Mock irrigation planning logic
      const waterRequirements = {
        wheat: { daily: 25, total: 3500 },
        rice: { daily: 50, total: 7000 },
        cotton: { daily: 30, total: 4200 }
      };

      const crop = irrigationInputs.cropType as keyof typeof waterRequirements;
      const area = parseFloat(irrigationInputs.landArea || '1');
      const efficiency = irrigationInputs.irrigationMethod === 'drip' ? 0.9 : 
                        irrigationInputs.irrigationMethod === 'sprinkler' ? 0.8 : 0.6;

      const totalWater = waterRequirements[crop].total * area / efficiency;
      const dailyWater = waterRequirements[crop].daily * area / efficiency;

      setIrrigationPlan({
        totalWaterNeeded: totalWater,
        dailyWaterNeeded: dailyWater,
        irrigationFrequency: irrigationInputs.irrigationMethod === 'drip' ? 'दैनिक' : 
                           irrigationInputs.irrigationMethod === 'sprinkler' ? 'वैकल्पिक दिन' : 'साप्ताहिक',
        costEstimate: totalWater * 0.5, // ₹0.5 per liter
        recommendations: [
          'सुबह या शाम के समय सिंचाई करें',
          'मिट्टी की नमी की नियमित जांच करें',
          'बारिश के बाद सिंचाई न करें',
          'ड्रिप सिस्टम से 40% पानी बचा सकते हैं'
        ]
      });
    };

    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
              सिंचाई योज��ा विवरण
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                फसल प्रकार
              </label>
              <select
                value={irrigationInputs.cropType}
                onChange={(e) => setIrrigationInputs({...irrigationInputs, cropType: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                <option value="wheat">गेहूं</option>
                <option value="rice">चावल</option>
                <option value="cotton">कपास</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                भूमि क्षेत्रफल (एकड़)
              </label>
              <input
                type="number"
                value={irrigationInputs.landArea}
                onChange={(e) => setIrrigationInputs({...irrigationInputs, landArea: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                मिट्टी का प्रकार
              </label>
              <select
                value={irrigationInputs.soilType}
                onChange={(e) => setIrrigationInputs({...irrigationInputs, soilType: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                <option value="clay">चिकनी मिट्टी</option>
                <option value="loamy">दोमट मिट्टी</option>
                <option value="sandy">रेतीली मिट्टी</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-kisan-text-secondary mb-1 font-devanagari">
                सिंचाई विधि
              </label>
              <select
                value={irrigationInputs.irrigationMethod}
                onChange={(e) => setIrrigationInputs({...irrigationInputs, irrigationMethod: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-kisan focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
              >
                <option value="flood">पारंपरिक सिंचाई</option>
                <option value="sprinkler">स्प्रिंकलर</option>
                <option value="drip">ड्रिप सिस्टम</option>
              </select>
            </div>

            <button
              onClick={createIrrigationPlan}
              className="w-full bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors font-devanagari"
            >
              स��ंचाई योजना बनाएं
            </button>
          </div>

          <div>
            {irrigationPlan ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
                  सिंचाई योजना
                </h3>
                
                <div className="bg-blue-50 p-4 rounded-kisan">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">कुल पानी आवश्यक</p>
                      <p className="text-lg font-bold text-blue-600">{irrigationPlan.totalWaterNeeded.toFixed(0)} लीटर</p>
                    </div>
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">दैनिक आवश्यकता</p>
                      <p className="text-lg font-bold text-blue-600">{irrigationPlan.dailyWaterNeeded.toFixed(0)} लीटर</p>
                    </div>
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">सिंचाई आवृत्ति</p>
                      <p className="text-lg font-bold text-green-600">{irrigationPlan.irrigationFrequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-kisan-text-muted font-devanagari">अनुमानित लागत</p>
                      <p className="text-lg font-bold text-purple-600">₹{irrigationPlan.costEstimate.toFixed(0)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-kisan">
                  <h4 className="font-semibold text-kisan-text-primary mb-2 font-devanagari">सुझाव</h4>
                  <ul className="space-y-1">
                    {irrigationPlan.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-sm text-kisan-text-secondary font-devanagari">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-kisan text-center">
                <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-kisan-text-muted font-devanagari">
                  विवरण भरकर सिंचाई योजना बनाएं
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'crop-calculator':
        return <CropCostCalculator />;
      case 'irrigation-planner':
        return <IrrigationPlanner />;
      default:
        return (
          <div className="text-center py-12">
            <div className="bg-amber-50 border border-amber-200 rounded-kisan p-8">
              <Calendar className="h-16 w-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                उपकरण विकास में है
              </h3>
              <p className="text-kisan-text-muted font-devanagari">
                यह उपकरण जल्दी ही उपलब्ध होगा। कृपया बाद में फिर से देखें।
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold text-kisan-text-primary mb-4 ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>
              {currentLanguage === 'en' ? 'Farming Tools' : 'खेती के उपकरण'}
            </h1>
            <p className={`text-lg text-kisan-text-secondary max-w-3xl mx-auto ${
              currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'
            }`}>
              {currentLanguage === 'en' 
                ? 'Interactive tools and calculators for modern farming decisions'
                : 'आधुनिक खेती के निर्णयों के लिए इंटरैक्टिव उपकरण और कैलकुलेटर'
              }
            </p>
          </div>

          {selectedTool ? (
            /* Tool Detail View */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedTool(null)}
                  className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  <span className="font-devanagari">सभी उपकरण</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  {tools.find(t => t.id === selectedTool)?.icon && (
                    <div className="p-2 bg-primary/10 rounded-kisan">
                      {React.createElement(tools.find(t => t.id === selectedTool)!.icon, {
                        className: "h-6 w-6 text-primary"
                      })}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-kisan-text-primary font-devanagari">
                    {currentLanguage === 'en' 
                      ? tools.find(t => t.id === selectedTool)?.name 
                      : tools.find(t => t.id === selectedTool)?.nameHindi
                    }
                  </h2>
                </div>
              </div>

              <div className="kisan-card p-6">
                {renderToolContent()}
              </div>
            </div>
          ) : (
            /* Tools Grid View */
            <div className="space-y-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-kisan transition-colors font-devanagari ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-kisan-text-secondary hover:bg-primary/10'
                    }`}
                  >
                    {currentLanguage === 'en' ? category.nameEn : category.name}
                  </button>
                ))}
              </div>

              {/* Featured Tools */}
              <div>
                <h2 className="text-2xl font-bold text-kisan-text-primary mb-6 font-devanagari">
                  विशेष उपकरण
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.filter(tool => tool.featured).map((tool) => (
                    <div key={tool.id} className="kisan-card p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-primary/10 rounded-kisan">
                            <tool.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-kisan-text-primary font-devanagari">
                              {currentLanguage === 'en' ? tool.name : tool.nameHindi}
                            </h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-devanagari">
                              विशेष
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-kisan-text-secondary mb-4 font-devanagari">
                        {currentLanguage === 'en' ? tool.description : tool.descriptionHindi}
                      </p>
                      
                      <button
                        onClick={() => setSelectedTool(tool.id)}
                        className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-kisan hover:bg-primary/90 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        <span className="font-devanagari">उपयोग करें</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Tools */}
              <div>
                <h2 className="text-2xl font-bold text-kisan-text-primary mb-6 font-devanagari">
                  सभी उपकरण
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className="kisan-card p-4 hover:shadow-lg transition-shadow text-left group"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-kisan-text-primary font-devanagari">
                            {currentLanguage === 'en' ? tool.name : tool.nameHindi}
                          </h3>
                        </div>
                        <ChevronRight className="h-4 w-4 text-kisan-text-muted group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xs text-kisan-text-muted font-devanagari">
                        {currentLanguage === 'en' ? tool.description : tool.descriptionHindi}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-blue-50 p-6 rounded-kisan-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
                    उपकरण उपयोग गाइड
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-kisan">
                    <h4 className="font-medium text-kisan-text-primary mb-2 font-devanagari">
                      कैलकुलेटर का उपयोग
                    </h4>
                    <p className="text-sm text-kisan-text-secondary font-devanagari">
                      सभी आवश्यक विवरण भरें और सटीक परिणाम पाएं
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-kisan">
                    <h4 className="font-medium text-kisan-text-primary mb-2 font-devanagari">
                      योजना उपकरण
                    </h4>
                    <p className="text-sm text-kisan-text-secondary font-devanagari">
                      व्यवस्थित खेती के लिए योजना बनाएं और सुझाव पाएं
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-kisan">
                    <h4 className="font-medium text-kisan-text-primary mb-2 font-devanagari">
                      डेटा सुरक्षा
                    </h4>
                    <p className="text-sm text-kisan-text-secondary font-devanagari">
                      आपका डेटा सुरक्षित है और केवल गणना के लिए उपयोग होता है
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FarmingToolsPage;
