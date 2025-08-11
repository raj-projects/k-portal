import { useState } from 'react';
import { Calculator, Droplets, Sprout, TrendingUp, Zap, BarChart3, PieChart, Target, Settings, RefreshCw, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FarmingToolsEnhanced = () => {
  const [language, setLanguage] = useState('hi');
  const [activeCalculator, setActiveCalculator] = useState('crop-yield');
  
  // Crop Yield Calculator State
  const [cropData, setCropData] = useState({
    cropType: 'wheat',
    area: '',
    seedVariety: 'HD-2967',
    soilType: 'loamy',
    irrigation: 'canal',
    fertilizer: 'balanced'
  });

  // Irrigation Calculator State
  const [irrigationData, setIrrigationData] = useState({
    cropType: 'wheat',
    area: '',
    soilType: 'loamy',
    season: 'rabi',
    method: 'flood',
    temperature: '25',
    humidity: '60'
  });

  // Fertilizer Calculator State
  const [fertilizerData, setFertilizerData] = useState({
    cropType: 'wheat',
    area: '',
    soilNitrogen: '',
    soilPhosphorus: '',
    soilPotassium: '',
    targetYield: ''
  });

  // Cost Calculator State
  const [costData, setCostData] = useState({
    cropType: 'wheat',
    area: '',
    seedCost: '',
    fertilizerCost: '',
    pesticideCost: '',
    irrigationCost: '',
    laborCost: ''
  });

  const content = {
    hi: {
      title: 'कृषि उपकरण और कैलकुलेटर',
      subtitle: 'आधुनिक खेती के लिए डिजिटल उपकरण और कैलकुलेटर',
      cropYieldCalculator: 'फसल उत्पादन कैलकुलेटर',
      irrigationPlanner: 'सिंचाई योजना कैलकुलेटर',
      fertilizerCalculator: 'उर्वरक कैलकुलेटर',
      costCalculator: 'लागत कैलकुलेटर',
      profitCalculator: 'लाभ कैलकुलेटर',
      soilCalculator: 'मिट्टी परीक्षण कैलकुलेटर',
      calculate: 'गणना करें',
      reset: 'रीसेट करें',
      download: 'रिपोर्ट डाउनलोड करें',
      area: 'क्षेत्रफल (एकड़)',
      cropType: 'फसल का प्रकार',
      soilType: 'मिट्टी का प्रकार',
      seedVariety: 'बीज की किस्म',
      irrigation: 'सिंचाई का तरीका',
      fertilizer: 'उर्वरक प्रकार',
      expectedYield: 'अपेक्षित उत्पादन',
      waterRequirement: 'पानी की आवश्यकता',
      fertilizerRecommendation: 'उर्वरक सिफारिश',
      totalCost: 'कुल लागत',
      projectedProfit: 'अनुमानित लाभ',
      profitMargin: 'लाभ प्रतिशत'
    },
    en: {
      title: 'Farming Tools & Calculators',
      subtitle: 'Digital tools and calculators for modern farming',
      cropYieldCalculator: 'Crop Yield Calculator',
      irrigationPlanner: 'Irrigation Planner',
      fertilizerCalculator: 'Fertilizer Calculator',
      costCalculator: 'Cost Calculator',
      profitCalculator: 'Profit Calculator',
      soilCalculator: 'Soil Test Calculator',
      calculate: 'Calculate',
      reset: 'Reset',
      download: 'Download Report',
      area: 'Area (Acres)',
      cropType: 'Crop Type',
      soilType: 'Soil Type',
      seedVariety: 'Seed Variety',
      irrigation: 'Irrigation Method',
      fertilizer: 'Fertilizer Type',
      expectedYield: 'Expected Yield',
      waterRequirement: 'Water Requirement',
      fertilizerRecommendation: 'Fertilizer Recommendation',
      totalCost: 'Total Cost',
      projectedProfit: 'Projected Profit',
      profitMargin: 'Profit Margin'
    }
  };

  const calculatorTools = [
    {
      id: 'crop-yield',
      icon: Sprout,
      title: { hi: 'फसल उत्पादन कैलकुलेटर', en: 'Crop Yield Calculator' },
      description: { hi: 'फसल के अनुमानित उत्पादन की गणना', en: 'Calculate estimated crop production' },
      color: 'bg-green-500'
    },
    {
      id: 'irrigation-planner',
      icon: Droplets,
      title: { hi: 'सिंचाई योजना', en: 'Irrigation Planner' },
      description: { hi: 'पानी की आवश्यकता और सिंचाई शेड्यूल', en: 'Water requirement and irrigation schedule' },
      color: 'bg-blue-500'
    },
    {
      id: 'fertilizer-calculator',
      icon: Zap,
      title: { hi: 'उर्वरक कैलकुलेटर', en: 'Fertilizer Calculator' },
      description: { hi: 'उर्वरक की मात्रा और प्रकार', en: 'Fertilizer quantity and type' },
      color: 'bg-yellow-500'
    },
    {
      id: 'cost-calculator',
      icon: Calculator,
      title: { hi: 'लागत कैलकुलेटर', en: 'Cost Calculator' },
      description: { hi: 'खेती की कुल लागत की गणना', en: 'Calculate total farming cost' },
      color: 'bg-purple-500'
    },
    {
      id: 'profit-calculator',
      icon: TrendingUp,
      title: { hi: 'लाभ कैलकुलेटर', en: 'Profit Calculator' },
      description: { hi: 'अनुमानित लाभ और ROI', en: 'Estimated profit and ROI' },
      color: 'bg-orange-500'
    },
    {
      id: 'soil-calculator',
      icon: Target,
      title: { hi: 'मिट्टी परीक्षण', en: 'Soil Test Calculator' },
      description: { hi: 'मिट्टी की गुणवत्ता विश्लेषण', en: 'Soil quality analysis' },
      color: 'bg-brown-500'
    }
  ];

  const cropOptions = [
    { value: 'wheat', label: { hi: 'गेहूं', en: 'Wheat' } },
    { value: 'rice', label: { hi: 'धान', en: 'Rice' } },
    { value: 'maize', label: { hi: 'मक्का', en: 'Maize' } },
    { value: 'sugarcane', label: { hi: 'गन्ना', en: 'Sugarcane' } },
    { value: 'cotton', label: { hi: 'कपास', en: 'Cotton' } },
    { value: 'soybean', label: { hi: 'सोयाबीन', en: 'Soybean' } },
    { value: 'mustard', label: { hi: 'सरसों', en: 'Mustard' } },
    { value: 'potato', label: { hi: 'आलू', en: 'Potato' } }
  ];

  const soilOptions = [
    { value: 'clay', label: { hi: 'चिकनी मिट्टी', en: 'Clay Soil' } },
    { value: 'loamy', label: { hi: 'दोमट मिट्टी', en: 'Loamy Soil' } },
    { value: 'sandy', label: { hi: 'बलुई मिट्टी', en: 'Sandy Soil' } },
    { value: 'black', label: { hi: 'काली मिट्टी', en: 'Black Soil' } },
    { value: 'red', label: { hi: 'लाल मिट्टी', en: 'Red Soil' } }
  ];

  const irrigationOptions = [
    { value: 'flood', label: { hi: 'बाढ़ सिंचाई', en: 'Flood Irrigation' } },
    { value: 'drip', label: { hi: 'ड्रिप सिंचाई', en: 'Drip Irrigation' } },
    { value: 'sprinkler', label: { hi: 'स्प्रिंकलर', en: 'Sprinkler' } },
    { value: 'canal', label: { hi: 'नहर', en: 'Canal' } },
    { value: 'tubewell', label: { hi: 'ट्यूबवेल', en: 'Tubewell' } }
  ];

  // Calculation functions
  const calculateCropYield = () => {
    const area = parseFloat(cropData.area) || 0;
    let baseYield = 0;
    
    // Base yield per acre for different crops (in quintals)
    const baseYields = {
      wheat: 20, rice: 25, maize: 30, sugarcane: 350,
      cotton: 10, soybean: 12, mustard: 8, potato: 150
    };
    
    baseYield = baseYields[cropData.cropType as keyof typeof baseYields] || 20;
    
    // Adjust based on soil type
    const soilMultiplier = {
      clay: 0.9, loamy: 1.1, sandy: 0.8, black: 1.2, red: 1.0
    };
    
    // Adjust based on irrigation
    const irrigationMultiplier = {
      flood: 1.0, drip: 1.3, sprinkler: 1.2, canal: 1.1, tubewell: 1.15
    };
    
    const adjustedYield = baseYield * 
      (soilMultiplier[cropData.soilType as keyof typeof soilMultiplier] || 1) *
      (irrigationMultiplier[cropData.irrigation as keyof typeof irrigationMultiplier] || 1);
    
    const totalYield = adjustedYield * area;
    
    return {
      yieldPerAcre: adjustedYield.toFixed(1),
      totalYield: totalYield.toFixed(1),
      unit: cropData.cropType === 'sugarcane' || cropData.cropType === 'potato' ? 
        (language === 'hi' ? 'क्विंटल' : 'Quintals') : 
        (language === 'hi' ? 'क्विंटल' : 'Quintals')
    };
  };

  const calculateIrrigation = () => {
    const area = parseFloat(irrigationData.area) || 0;
    
    // Base water requirement per acre per day (in liters)
    const waterRequirements = {
      wheat: 4000, rice: 8000, maize: 5000, sugarcane: 12000,
      cotton: 6000, soybean: 4500, mustard: 3000, potato: 3500
    };
    
    const baseWater = waterRequirements[irrigationData.cropType as keyof typeof waterRequirements] || 4000;
    
    // Adjust based on irrigation method efficiency
    const methodEfficiency = {
      flood: 0.6, drip: 0.9, sprinkler: 0.8, canal: 0.7, tubewell: 0.75
    };
    
    const adjustedWater = baseWater / (methodEfficiency[irrigationData.method as keyof typeof methodEfficiency] || 0.7);
    const totalWaterPerDay = adjustedWater * area;
    
    return {
      waterPerAcrePerDay: adjustedWater.toFixed(0),
      totalWaterPerDay: totalWaterPerDay.toFixed(0),
      waterPerMonth: (totalWaterPerDay * 30).toFixed(0),
      efficiency: ((methodEfficiency[irrigationData.method as keyof typeof methodEfficiency] || 0.7) * 100).toFixed(0)
    };
  };

  const calculateFertilizer = () => {
    const area = parseFloat(fertilizerData.area) || 0;
    
    // NPK recommendations per acre for different crops (in kg)
    const npkRecommendations = {
      wheat: { n: 120, p: 60, k: 40 },
      rice: { n: 100, p: 50, k: 50 },
      maize: { n: 150, p: 75, k: 60 },
      sugarcane: { n: 250, p: 115, k: 115 },
      cotton: { n: 160, p: 80, k: 80 },
      soybean: { n: 30, p: 75, k: 35 },
      mustard: { n: 80, p: 40, k: 40 },
      potato: { n: 180, p: 90, k: 150 }
    };
    
    const recommendation = npkRecommendations[fertilizerData.cropType as keyof typeof npkRecommendations] || 
      { n: 120, p: 60, k: 40 };
    
    return {
      nitrogenPerAcre: recommendation.n,
      phosphorusPerAcre: recommendation.p,
      potassiumPerAcre: recommendation.k,
      totalNitrogen: (recommendation.n * area).toFixed(0),
      totalPhosphorus: (recommendation.p * area).toFixed(0),
      totalPotassium: (recommendation.k * area).toFixed(0),
      ureaNeeded: ((recommendation.n * area) / 0.46).toFixed(0), // Urea is 46% N
      dapNeeded: ((recommendation.p * area) / 0.46).toFixed(0),  // DAP is 46% P2O5
      mopNeeded: ((recommendation.k * area) / 0.6).toFixed(0)    // MOP is 60% K2O
    };
  };

  const calculateCost = () => {
    const area = parseFloat(costData.area) || 0;
    const seed = parseFloat(costData.seedCost) || 0;
    const fertilizer = parseFloat(costData.fertilizerCost) || 0;
    const pesticide = parseFloat(costData.pesticideCost) || 0;
    const irrigation = parseFloat(costData.irrigationCost) || 0;
    const labor = parseFloat(costData.laborCost) || 0;
    
    const totalCost = seed + fertilizer + pesticide + irrigation + labor;
    const costPerAcre = area > 0 ? totalCost / area : 0;
    
    // Estimated revenue based on crop type and current market prices
    const marketPrices = {
      wheat: 2000, rice: 2100, maize: 1800, sugarcane: 350,
      cotton: 5500, soybean: 4500, mustard: 5000, potato: 1200
    };
    
    const price = marketPrices[costData.cropType as keyof typeof marketPrices] || 2000;
    const yieldData = calculateCropYield();
    const estimatedRevenue = parseFloat(yieldData.totalYield) * price;
    const profit = estimatedRevenue - totalCost;
    const profitMargin = totalCost > 0 ? (profit / estimatedRevenue) * 100 : 0;
    
    return {
      totalCost: totalCost.toFixed(0),
      costPerAcre: costPerAcre.toFixed(0),
      estimatedRevenue: estimatedRevenue.toFixed(0),
      profit: profit.toFixed(0),
      profitMargin: profitMargin.toFixed(1),
      roi: totalCost > 0 ? ((profit / totalCost) * 100).toFixed(1) : '0'
    };
  };

  const renderCropYieldCalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].cropType}
          </label>
          <select
            value={cropData.cropType}
            onChange={(e) => setCropData({...cropData, cropType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {cropOptions.map(crop => (
              <option key={crop.value} value={crop.value}>
                {crop.label[language as keyof typeof crop.label]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].area}
          </label>
          <input
            type="number"
            value={cropData.area}
            onChange={(e) => setCropData({...cropData, area: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].soilType}
          </label>
          <select
            value={cropData.soilType}
            onChange={(e) => setCropData({...cropData, soilType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {soilOptions.map(soil => (
              <option key={soil.value} value={soil.value}>
                {soil.label[language as keyof typeof soil.label]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].irrigation}
          </label>
          <select
            value={cropData.irrigation}
            onChange={(e) => setCropData({...cropData, irrigation: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {irrigationOptions.map(method => (
              <option key={method.value} value={method.value}>
                {method.label[language as keyof typeof method.label]}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => {
            const result = calculateCropYield();
            alert(`${content[language as keyof typeof content].expectedYield}: ${result.totalYield} ${result.unit}`);
          }}
          className="bg-farm-500 hover:bg-farm-600 text-white"
        >
          {content[language as keyof typeof content].calculate}
        </Button>
        <Button 
          variant="outline"
          onClick={() => setCropData({cropType: 'wheat', area: '', seedVariety: 'HD-2967', soilType: 'loamy', irrigation: 'canal', fertilizer: 'balanced'})}
        >
          {content[language as keyof typeof content].reset}
        </Button>
      </div>
      
      <div className="bg-farm-50 p-6 rounded-lg">
        <h4 className="font-bold text-farm-700 mb-4">{content[language as keyof typeof content].expectedYield}</h4>
        {cropData.area && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-farm-700">{calculateCropYield().yieldPerAcre}</p>
              <p className="text-sm text-farm-600">{language === 'hi' ? 'क्विंटल प्रति एकड़' : 'Quintals per Acre'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-farm-700">{calculateCropYield().totalYield}</p>
              <p className="text-sm text-farm-600">{language === 'hi' ? 'कुल उत्पादन (क्विंटल)' : 'Total Production (Quintals)'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderIrrigationPlanner = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].cropType}
          </label>
          <select
            value={irrigationData.cropType}
            onChange={(e) => setIrrigationData({...irrigationData, cropType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {cropOptions.map(crop => (
              <option key={crop.value} value={crop.value}>
                {crop.label[language as keyof typeof crop.label]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].area}
          </label>
          <input
            type="number"
            value={irrigationData.area}
            onChange={(e) => setIrrigationData({...irrigationData, area: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {language === 'hi' ? 'सिंचाई का तरीका' : 'Irrigation Method'}
          </label>
          <select
            value={irrigationData.method}
            onChange={(e) => setIrrigationData({...irrigationData, method: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {irrigationOptions.map(method => (
              <option key={method.value} value={method.value}>
                {method.label[language as keyof typeof method.label]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {language === 'hi' ? 'तापमान (°C)' : 'Temperature (°C)'}
          </label>
          <input
            type="number"
            value={irrigationData.temperature}
            onChange={(e) => setIrrigationData({...irrigationData, temperature: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="25"
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => {
            const result = calculateIrrigation();
            alert(`${content[language as keyof typeof content].waterRequirement}: ${result.totalWaterPerDay} ${language === 'hi' ? 'लीटर प्रति दिन' : 'liters per day'}`);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {content[language as keyof typeof content].calculate}
        </Button>
        <Button 
          variant="outline"
          onClick={() => setIrrigationData({cropType: 'wheat', area: '', soilType: 'loamy', season: 'rabi', method: 'flood', temperature: '25', humidity: '60'})}
        >
          {content[language as keyof typeof content].reset}
        </Button>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-bold text-blue-700 mb-4">{content[language as keyof typeof content].waterRequirement}</h4>
        {irrigationData.area && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-blue-700">{calculateIrrigation().totalWaterPerDay}</p>
              <p className="text-sm text-blue-600">{language === 'hi' ? 'लीटर प्रति दिन' : 'Liters per day'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-blue-700">{calculateIrrigation().waterPerMonth}</p>
              <p className="text-sm text-blue-600">{language === 'hi' ? 'लीटर प्रति माह' : 'Liters per month'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-blue-700">{calculateIrrigation().efficiency}%</p>
              <p className="text-sm text-blue-600">{language === 'hi' ? 'दक्षता' : 'Efficiency'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFertilizerCalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].cropType}
          </label>
          <select
            value={fertilizerData.cropType}
            onChange={(e) => setFertilizerData({...fertilizerData, cropType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {cropOptions.map(crop => (
              <option key={crop.value} value={crop.value}>
                {crop.label[language as keyof typeof crop.label]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].area}
          </label>
          <input
            type="number"
            value={fertilizerData.area}
            onChange={(e) => setFertilizerData({...fertilizerData, area: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => {
            const result = calculateFertilizer();
            alert(`${content[language as keyof typeof content].fertilizerRecommendation}: N-${result.totalNitrogen}kg, P-${result.totalPhosphorus}kg, K-${result.totalPotassium}kg`);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          {content[language as keyof typeof content].calculate}
        </Button>
        <Button 
          variant="outline"
          onClick={() => setFertilizerData({cropType: 'wheat', area: '', soilNitrogen: '', soilPhosphorus: '', soilPotassium: '', targetYield: ''})}
        >
          {content[language as keyof typeof content].reset}
        </Button>
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h4 className="font-bold text-yellow-700 mb-4">{content[language as keyof typeof content].fertilizerRecommendation}</h4>
        {fertilizerData.area && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-yellow-700">{calculateFertilizer().ureaNeeded} kg</p>
              <p className="text-sm text-yellow-600">{language === 'hi' ? 'यूरिया' : 'Urea'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-yellow-700">{calculateFertilizer().dapNeeded} kg</p>
              <p className="text-sm text-yellow-600">{language === 'hi' ? 'डीएपी' : 'DAP'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-yellow-700">{calculateFertilizer().mopNeeded} kg</p>
              <p className="text-sm text-yellow-600">{language === 'hi' ? 'एमओपी' : 'MOP'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCostCalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].cropType}
          </label>
          <select
            value={costData.cropType}
            onChange={(e) => setCostData({...costData, cropType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
          >
            {cropOptions.map(crop => (
              <option key={crop.value} value={crop.value}>
                {crop.label[language as keyof typeof crop.label]}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {content[language as keyof typeof content].area}
          </label>
          <input
            type="number"
            value={costData.area}
            onChange={(e) => setCostData({...costData, area: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {language === 'hi' ? 'बीज की लागत (₹)' : 'Seed Cost (₹)'}
          </label>
          <input
            type="number"
            value={costData.seedCost}
            onChange={(e) => setCostData({...costData, seedCost: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {language === 'hi' ? 'उर्वरक की लागत (₹)' : 'Fertilizer Cost (₹)'}
          </label>
          <input
            type="number"
            value={costData.fertilizerCost}
            onChange={(e) => setCostData({...costData, fertilizerCost: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {language === 'hi' ? 'कीटनाशक की लागत (₹)' : 'Pesticide Cost (₹)'}
          </label>
          <input
            type="number"
            value={costData.pesticideCost}
            onChange={(e) => setCostData({...costData, pesticideCost: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {language === 'hi' ? 'मजदूरी की लागत (₹)' : 'Labor Cost (₹)'}
          </label>
          <input
            type="number"
            value={costData.laborCost}
            onChange={(e) => setCostData({...costData, laborCost: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500"
            placeholder="0"
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => {
            const result = calculateCost();
            alert(`${content[language as keyof typeof content].totalCost}: ₹${result.totalCost}\n${content[language as keyof typeof content].projectedProfit}: ₹${result.profit}`);
          }}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          {content[language as keyof typeof content].calculate}
        </Button>
        <Button 
          variant="outline"
          onClick={() => setCostData({cropType: 'wheat', area: '', seedCost: '', fertilizerCost: '', pesticideCost: '', irrigationCost: '', laborCost: ''})}
        >
          {content[language as keyof typeof content].reset}
        </Button>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg">
        <h4 className="font-bold text-purple-700 mb-4">{language === 'hi' ? 'लागत विश्लेषण' : 'Cost Analysis'}</h4>
        {costData.area && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-purple-700">₹{calculateCost().totalCost}</p>
              <p className="text-sm text-purple-600">{content[language as keyof typeof content].totalCost}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-green-700">₹{calculateCost().estimatedRevenue}</p>
              <p className="text-sm text-green-600">{language === 'hi' ? 'अनुमानित आय' : 'Estimated Revenue'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-orange-700">₹{calculateCost().profit}</p>
              <p className="text-sm text-orange-600">{content[language as keyof typeof content].projectedProfit}</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold text-blue-700">{calculateCost().profitMargin}%</p>
              <p className="text-sm text-blue-600">{content[language as keyof typeof content].profitMargin}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-farm-700 mb-4">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600 max-w-3xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        {/* Calculator Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {calculatorTools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeCalculator === tool.id ? "default" : "outline"}
              onClick={() => setActiveCalculator(tool.id)}
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                activeCalculator === tool.id ? "bg-farm-500 hover:bg-farm-600 text-white" : ""
              }`}
            >
              <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center ${
                activeCalculator === tool.id ? "bg-white bg-opacity-20" : ""
              }`}>
                <tool.icon className={`h-6 w-6 ${activeCalculator === tool.id ? "text-white" : "text-white"}`} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-xs">
                  {tool.title[language as keyof typeof tool.title]}
                </p>
              </div>
            </Button>
          ))}
        </div>

        {/* Active Calculator */}
        <Card className="border-farm-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-farm-700">
              {calculatorTools.find(t => t.id === activeCalculator)?.icon && (
                <div className={`${calculatorTools.find(t => t.id === activeCalculator)?.color} w-8 h-8 rounded-lg flex items-center justify-center mr-3`}>
                  {(() => {
                    const Tool = calculatorTools.find(t => t.id === activeCalculator)?.icon;
                    return Tool ? <Tool className="h-5 w-5 text-white" /> : null;
                  })()}
                </div>
              )}
              {calculatorTools.find(t => t.id === activeCalculator)?.title[language as keyof typeof calculatorTools[0]['title']]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeCalculator === 'crop-yield' && renderCropYieldCalculator()}
            {activeCalculator === 'irrigation-planner' && renderIrrigationPlanner()}
            {activeCalculator === 'fertilizer-calculator' && renderFertilizerCalculator()}
            {activeCalculator === 'cost-calculator' && renderCostCalculator()}
            {(activeCalculator === 'profit-calculator' || activeCalculator === 'soil-calculator') && (
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {language === 'hi' ? 'जल्द ही आ रहा है' : 'Coming Soon'}
                </h3>
                <p className="text-gray-500">
                  {language === 'hi' 
                    ? 'यह कैलकुलेटर जल्द ही उपलब्ध होगा। अभी के लिए अन्य कैलकुलेटर का उपयोग करें।'
                    : 'This calculator will be available soon. Please use other calculators for now.'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription>
              <p className="font-bold text-green-800 mb-2">
                💡 {language === 'hi' ? 'उपयोगी टिप्स' : 'Helpful Tips'}
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• {language === 'hi' ? 'सटीक परिणाम के लिए सही जानकारी दें' : 'Provide accurate information for precise results'}</li>
                <li>• {language === 'hi' ? 'मिट्टी परीक्षण कराकर उर्वरक की मात्रा तय करें' : 'Determine fertilizer quantity based on soil testing'}</li>
                <li>• {language === 'hi' ? 'स्थानीय मौसम के अनुसार सिंचाई योजना बनाएं' : 'Plan irrigation according to local weather'}</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription>
              <p className="font-bold text-blue-800 mb-2">
                📞 {language === 'hi' ? 'विशेषज्ञ सहायता' : 'Expert Help'}
              </p>
              <p className="text-sm text-blue-700">
                {language === 'hi' 
                  ? 'कैलकुलेटर का उपयोग करने में समस्या? हमारे कृषि विशेषज्ञों से बात करें।'
                  : 'Having trouble using the calculator? Talk to our agriculture experts.'
                }
              </p>
              <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                📞 1800-180-1551
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        {/* Download Report Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-farm-500 hover:bg-farm-600 text-white px-8 py-4"
            onClick={() => alert(language === 'hi' ? 'रिपोर्ट डाउनलोड शुरू हो रही है...' : 'Report download starting...')}
          >
            <Download className="h-5 w-5 mr-2" />
            {content[language as keyof typeof content].download}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FarmingToolsEnhanced;
