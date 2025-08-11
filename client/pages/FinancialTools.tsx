import { useState } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  PieChart, 
  FileText,
  Download,
  Info,
  AlertCircle,
  CheckCircle,
  Banknote,
  Percent,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const FinancialTools = () => {
  const [language, setLanguage] = useState('hi');
  const [activeCalculator, setActiveCalculator] = useState('loan');
  
  // Loan Calculator States
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState<any>(null);

  // Crop Cost Calculator States
  const [cropType, setCropType] = useState('');
  const [landArea, setLandArea] = useState('');
  const [seedCost, setSeedCost] = useState('');
  const [fertilizerCost, setFertilizerCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [otherCosts, setOtherCosts] = useState('');
  const [expectedYield, setExpectedYield] = useState('');
  const [marketPrice, setMarketPrice] = useState('');
  const [cropResult, setCropResult] = useState<any>(null);

  // Insurance Calculator States
  const [insuranceCrop, setInsuranceCrop] = useState('');
  const [insuranceArea, setInsuranceArea] = useState('');
  const [cropValue, setCropValue] = useState('');
  const [insuranceResult, setInsuranceResult] = useState<any>(null);

  const content = {
    hi: {
      title: 'वित्तीय उपकरण',
      subtitle: 'कृषि ऋण, फसल लागत और बीमा की गणना करें',
      loanCalculator: 'कृषि ऋण कैलक्यूलेटर',
      cropCostCalculator: 'फसल लागत कैलक्यूलेटर',
      insuranceCalculator: 'फसल बीमा कैलक्यूलेटर',
      profitCalculator: 'मुनाफा कैलक्यूलेटर',
      loanAmount: 'ऋण राशि (₹)',
      interestRate: 'ब्याज दर (%)',
      loanTerm: 'ऋण अवधि (महीने)',
      calculate: 'गणना करें',
      monthlyEMI: 'मासिक EMI',
      totalPayment: 'कुल भुगतान',
      totalInterest: 'कुल ब्याज',
      cropType: 'फसल का प्रकार',
      landArea: 'भूमि क्षेत्र (एकड़)',
      seedCost: 'बीज की लागत (₹)',
      fertilizerCost: 'खाद की लागत (₹)',
      laborCost: 'मजदूरी की लागत (₹)',
      otherCosts: 'अन्य लागत (₹)',
      expectedYield: 'अपेक्षित उत्पादन (क्विंटल)',
      marketPrice: 'बाजार मूल्य (₹/क्विंटल)',
      totalCost: 'कुल लागत',
      totalRevenue: 'कुल आय',
      netProfit: 'शुद्ध लाभ',
      profitMargin: 'लाभ मार्जिन',
      breakEven: 'ब्रेक इवन',
      insurancePremium: 'बीमा प्री���ियम',
      coverageAmount: 'कवरेज राशि',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      reset: 'रीसेट करें'
    },
    en: {
      title: 'Financial Tools',
      subtitle: 'Calculate agricultural loans, crop costs and insurance',
      loanCalculator: 'Farm Loan Calculator',
      cropCostCalculator: 'Crop Cost Calculator',
      insuranceCalculator: 'Crop Insurance Calculator',
      profitCalculator: 'Profit Calculator',
      loanAmount: 'Loan Amount (₹)',
      interestRate: 'Interest Rate (%)',
      loanTerm: 'Loan Term (Months)',
      calculate: 'Calculate',
      monthlyEMI: 'Monthly EMI',
      totalPayment: 'Total Payment',
      totalInterest: 'Total Interest',
      cropType: 'Crop Type',
      landArea: 'Land Area (Acres)',
      seedCost: 'Seed Cost (₹)',
      fertilizerCost: 'Fertilizer Cost (₹)',
      laborCost: 'Labor Cost (₹)',
      otherCosts: 'Other Costs (₹)',
      expectedYield: 'Expected Yield (Quintals)',
      marketPrice: 'Market Price (₹/Quintal)',
      totalCost: 'Total Cost',
      totalRevenue: 'Total Revenue',
      netProfit: 'Net Profit',
      profitMargin: 'Profit Margin',
      breakEven: 'Break Even',
      insurancePremium: 'Insurance Premium',
      coverageAmount: 'Coverage Amount',
      downloadReport: 'Download Report',
      reset: 'Reset'
    }
  };

  const cropTypes = [
    { value: 'wheat', label: { hi: 'गेहूं', en: 'Wheat' } },
    { value: 'rice', label: { hi: 'चावल', en: 'Rice' } },
    { value: 'maize', label: { hi: 'मक्का', en: 'Maize' } },
    { value: 'sugarcane', label: { hi: 'गन्ना', en: 'Sugarcane' } },
    { value: 'cotton', label: { hi: 'कपास', en: 'Cotton' } },
    { value: 'soybean', label: { hi: 'सोयाबीन', en: 'Soybean' } },
    { value: 'tomato', label: { hi: 'टमाटर', en: 'Tomato' } },
    { value: 'potato', label: { hi: 'आलू', en: 'Potato' } }
  ];

  const calculatorTabs = [
    { id: 'loan', label: { hi: 'कृषि ऋण', en: 'Farm Loan' }, icon: Banknote },
    { id: 'crop-cost', label: { hi: 'फसल लागत', en: 'Crop Cost' }, icon: PieChart },
    { id: 'insurance', label: { hi: 'फसल बीमा', en: 'Crop Insurance' }, icon: FileText },
    { id: 'profit', label: { hi: 'मुनाफा', en: 'Profit' }, icon: TrendingUp }
  ];

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm);

    if (P && r && n) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - P;

      setLoanResult({
        emi: Math.round(emi),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest)
      });
    }
  };

  const calculateCropCost = () => {
    const seeds = parseFloat(seedCost) || 0;
    const fertilizer = parseFloat(fertilizerCost) || 0;
    const labor = parseFloat(laborCost) || 0;
    const other = parseFloat(otherCosts) || 0;
    const yield_qty = parseFloat(expectedYield) || 0;
    const price = parseFloat(marketPrice) || 0;
    const area = parseFloat(landArea) || 1;

    const totalCost = seeds + fertilizer + labor + other;
    const totalRevenue = yield_qty * price;
    const netProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const costPerAcre = totalCost / area;
    const revenuePerAcre = totalRevenue / area;

    setCropResult({
      totalCost,
      totalRevenue,
      netProfit,
      profitMargin: Math.round(profitMargin * 100) / 100,
      costPerAcre: Math.round(costPerAcre),
      revenuePerAcre: Math.round(revenuePerAcre),
      breakEvenPrice: yield_qty > 0 ? Math.round(totalCost / yield_qty) : 0
    });
  };

  const calculateInsurance = () => {
    const area = parseFloat(insuranceArea) || 0;
    const value = parseFloat(cropValue) || 0;
    
    // Typical crop insurance premium is 2-5% of crop value
    const premiumRate = 0.03; // 3%
    const premium = value * premiumRate;
    const coverage = value * 0.8; // 80% coverage typically

    setInsuranceResult({
      premium: Math.round(premium),
      coverage: Math.round(coverage),
      premiumPerAcre: area > 0 ? Math.round(premium / area) : 0
    });
  };

  const resetCalculator = () => {
    if (activeCalculator === 'loan') {
      setLoanAmount('');
      setInterestRate('');
      setLoanTerm('');
      setLoanResult(null);
    } else if (activeCalculator === 'crop-cost') {
      setCropType('');
      setLandArea('');
      setSeedCost('');
      setFertilizerCost('');
      setLaborCost('');
      setOtherCosts('');
      setExpectedYield('');
      setMarketPrice('');
      setCropResult(null);
    } else if (activeCalculator === 'insurance') {
      setInsuranceCrop('');
      setInsuranceArea('');
      setCropValue('');
      setInsuranceResult(null);
    }
  };

  const governmentSchemes = [
    {
      name: { hi: 'पीएम किसान सम्मान निधि', en: 'PM-KISAN Scheme' },
      description: { hi: '₹6000 प्रति वर्ष सभी किसानों को', en: '₹6000 per year to all farmers' },
      amount: '₹6,000'
    },
    {
      name: { hi: 'कृषि सिंचाई योजना', en: 'Irrigation Scheme' },
      description: { hi: 'सिंचाई उपकरण पर 90% सब्सिडी', en: '90% subsidy on irrigation equipment' },
      amount: '90% सब्सिडी'
    },
    {
      name: { hi: 'फसल बीमा योजना', en: 'Crop Insurance Scheme' },
      description: { hi: 'प्राकृतिक आपदा से सुरक्षा', en: 'Protection from natural disasters' },
      amount: '2% प्रीमियम'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-farm-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-farm-700 mb-2">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calculator Tabs */}
          <div className="lg:col-span-1">
            <Card className="border-farm-200 mb-6">
              <CardHeader>
                <CardTitle className="text-farm-700 flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  {language === 'hi' ? 'कैलक्यूलेटर चुनें' : 'Choose Calculator'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {calculatorTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeCalculator === tab.id ? 'default' : 'outline'}
                      className={`w-full justify-start ${
                        activeCalculator === tab.id
                          ? 'bg-farm-600 hover:bg-farm-700'
                          : 'border-farm-300 text-farm-700 hover:bg-farm-50'
                      }`}
                      onClick={() => setActiveCalculator(tab.id)}
                    >
                      <tab.icon className="mr-2 h-4 w-4" />
                      {tab.label[language as keyof typeof tab.label]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Government Schemes */}
            <Card className="border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {governmentSchemes.map((scheme, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-farm-200">
                      <h4 className="font-semibold text-farm-700 text-sm mb-1">
                        {scheme.name[language as keyof typeof scheme.name]}
                      </h4>
                      <p className="text-xs text-farm-600 mb-2">
                        {scheme.description[language as keyof typeof scheme.description]}
                      </p>
                      <Badge className="bg-green-500 text-white text-xs">
                        {scheme.amount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Calculator Area */}
          <div className="lg:col-span-3">
            {/* Loan Calculator */}
            {activeCalculator === 'loan' && (
              <Card className="border-farm-200">
                <CardHeader>
                  <CardTitle className="text-farm-700 flex items-center">
                    <Banknote className="mr-2 h-5 w-5" />
                    {content[language as keyof typeof content].loanCalculator}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="loanAmount" className="text-farm-700">
                          {content[language as keyof typeof content].loanAmount}
                        </Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          placeholder="100000"
                          className="mt-1 border-farm-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interestRate" className="text-farm-700">
                          {content[language as keyof typeof content].interestRate}
                        </Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          placeholder="7.5"
                          className="mt-1 border-farm-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="loanTerm" className="text-farm-700">
                          {content[language as keyof typeof content].loanTerm}
                        </Label>
                        <Input
                          id="loanTerm"
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          placeholder="60"
                          className="mt-1 border-farm-300"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={calculateLoan} className="bg-farm-600 hover:bg-farm-700">
                          <Calculator className="mr-2 h-4 w-4" />
                          {content[language as keyof typeof content].calculate}
                        </Button>
                        <Button onClick={resetCalculator} variant="outline" className="border-farm-300">
                          {content[language as keyof typeof content].reset}
                        </Button>
                      </div>
                    </div>

                    {loanResult && (
                      <div className="bg-farm-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-farm-700 mb-4">
                          {language === 'hi' ? 'गणना परिणाम' : 'Calculation Results'}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].monthlyEMI}:</span>
                            <span className="font-bold text-farm-700">₹{loanResult.emi.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].totalPayment}:</span>
                            <span className="font-bold text-farm-700">₹{loanResult.totalPayment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].totalInterest}:</span>
                            <span className="font-bold text-red-600">₹{loanResult.totalInterest.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-farm-600 hover:bg-farm-700">
                          <Download className="mr-2 h-4 w-4" />
                          {content[language as keyof typeof content].downloadReport}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crop Cost Calculator */}
            {activeCalculator === 'crop-cost' && (
              <Card className="border-farm-200">
                <CardHeader>
                  <CardTitle className="text-farm-700 flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    {content[language as keyof typeof content].cropCostCalculator}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].cropType}
                          </Label>
                          <Select value={cropType} onValueChange={setCropType}>
                            <SelectTrigger className="mt-1 border-farm-300">
                              <SelectValue placeholder="फसल चुनें / Select Crop" />
                            </SelectTrigger>
                            <SelectContent>
                              {cropTypes.map((crop) => (
                                <SelectItem key={crop.value} value={crop.value}>
                                  {crop.label[language as keyof typeof crop.label]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].landArea}
                          </Label>
                          <Input
                            type="number"
                            value={landArea}
                            onChange={(e) => setLandArea(e.target.value)}
                            placeholder="5"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].seedCost}
                          </Label>
                          <Input
                            type="number"
                            value={seedCost}
                            onChange={(e) => setSeedCost(e.target.value)}
                            placeholder="5000"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].fertilizerCost}
                          </Label>
                          <Input
                            type="number"
                            value={fertilizerCost}
                            onChange={(e) => setFertilizerCost(e.target.value)}
                            placeholder="10000"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].laborCost}
                          </Label>
                          <Input
                            type="number"
                            value={laborCost}
                            onChange={(e) => setLaborCost(e.target.value)}
                            placeholder="15000"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].otherCosts}
                          </Label>
                          <Input
                            type="number"
                            value={otherCosts}
                            onChange={(e) => setOtherCosts(e.target.value)}
                            placeholder="5000"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].expectedYield}
                          </Label>
                          <Input
                            type="number"
                            value={expectedYield}
                            onChange={(e) => setExpectedYield(e.target.value)}
                            placeholder="50"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                        <div>
                          <Label className="text-farm-700">
                            {content[language as keyof typeof content].marketPrice}
                          </Label>
                          <Input
                            type="number"
                            value={marketPrice}
                            onChange={(e) => setMarketPrice(e.target.value)}
                            placeholder="2000"
                            className="mt-1 border-farm-300"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={calculateCropCost} className="bg-farm-600 hover:bg-farm-700">
                          <Calculator className="mr-2 h-4 w-4" />
                          {content[language as keyof typeof content].calculate}
                        </Button>
                        <Button onClick={resetCalculator} variant="outline" className="border-farm-300">
                          {content[language as keyof typeof content].reset}
                        </Button>
                      </div>
                    </div>

                    {cropResult && (
                      <div className="bg-farm-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-farm-700 mb-4">
                          {language === 'hi' ? 'लाभ-हानि विश्लेषण' : 'Profit-Loss Analysis'}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].totalCost}:</span>
                            <span className="font-bold text-red-600">₹{cropResult.totalCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].totalRevenue}:</span>
                            <span className="font-bold text-green-600">₹{cropResult.totalRevenue.toLocaleString()}</span>
                          </div>
                          <div className={`flex justify-between items-center p-3 bg-white rounded border ${
                            cropResult.netProfit >= 0 ? 'border-green-200' : 'border-red-200'
                          }`}>
                            <span className="text-farm-600">{content[language as keyof typeof content].netProfit}:</span>
                            <span className={`font-bold ${cropResult.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ₹{cropResult.netProfit.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].profitMargin}:</span>
                            <span className="font-bold text-farm-700">{cropResult.profitMargin}%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].breakEven}:</span>
                            <span className="font-bold text-farm-700">₹{cropResult.breakEvenPrice}/क्विंटल</span>
                          </div>
                        </div>
                        
                        {cropResult.netProfit >= 0 ? (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-green-700 text-sm">
                              {language === 'hi' ? 'यह फसल लाभदायक है!' : 'This crop is profitable!'}
                            </span>
                          </div>
                        ) : (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <span className="text-red-700 text-sm">
                              {language === 'hi' ? 'इस फसल में नुकसान हो सकता है। कीमत या लागत की समीक्षा करें।' : 'This crop may result in loss. Review pricing or costs.'}
                            </span>
                          </div>
                        )}
                        
                        <Button className="w-full mt-4 bg-farm-600 hover:bg-farm-700">
                          <Download className="mr-2 h-4 w-4" />
                          {content[language as keyof typeof content].downloadReport}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Insurance Calculator */}
            {activeCalculator === 'insurance' && (
              <Card className="border-farm-200">
                <CardHeader>
                  <CardTitle className="text-farm-700 flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    {content[language as keyof typeof content].insuranceCalculator}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-farm-700">
                          {content[language as keyof typeof content].cropType}
                        </Label>
                        <Select value={insuranceCrop} onValueChange={setInsuranceCrop}>
                          <SelectTrigger className="mt-1 border-farm-300">
                            <SelectValue placeholder="फसल चुनें / Select Crop" />
                          </SelectTrigger>
                          <SelectContent>
                            {cropTypes.map((crop) => (
                              <SelectItem key={crop.value} value={crop.value}>
                                {crop.label[language as keyof typeof crop.label]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-farm-700">
                          {content[language as keyof typeof content].landArea}
                        </Label>
                        <Input
                          type="number"
                          value={insuranceArea}
                          onChange={(e) => setInsuranceArea(e.target.value)}
                          placeholder="5"
                          className="mt-1 border-farm-300"
                        />
                      </div>
                      <div>
                        <Label className="text-farm-700">
                          {language === 'hi' ? 'फसल का मूल्य (₹)' : 'Crop Value (₹)'}
                        </Label>
                        <Input
                          type="number"
                          value={cropValue}
                          onChange={(e) => setCropValue(e.target.value)}
                          placeholder="100000"
                          className="mt-1 border-farm-300"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={calculateInsurance} className="bg-farm-600 hover:bg-farm-700">
                          <Calculator className="mr-2 h-4 w-4" />
                          {content[language as keyof typeof content].calculate}
                        </Button>
                        <Button onClick={resetCalculator} variant="outline" className="border-farm-300">
                          {content[language as keyof typeof content].reset}
                        </Button>
                      </div>
                    </div>

                    {insuranceResult && (
                      <div className="bg-farm-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-farm-700 mb-4">
                          {language === 'hi' ? 'बीमा विवरण' : 'Insurance Details'}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].insurancePremium}:</span>
                            <span className="font-bold text-farm-700">₹{insuranceResult.premium.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">{content[language as keyof typeof content].coverageAmount}:</span>
                            <span className="font-bold text-green-600">₹{insuranceResult.coverage.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white rounded border">
                            <span className="text-farm-600">
                              {language === 'hi' ? 'प्रीमियम प्रति एकड़:' : 'Premium per Acre:'}
                            </span>
                            <span className="font-bold text-farm-700">₹{insuranceResult.premiumPerAcre.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="flex items-center mb-2">
                            <Info className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-blue-700 font-medium text-sm">
                              {language === 'hi' ? 'बीमा लाभ' : 'Insurance Benefits'}
                            </span>
                          </div>
                          <ul className="text-xs text-blue-600 space-y-1">
                            <li>• {language === 'hi' ? 'प्राकृतिक आपदा से सुरक्षा' : 'Protection from natural disasters'}</li>
                            <li>• {language === 'hi' ? 'बीमा राशि का 80% तक कवरेज' : 'Up to 80% coverage of insured amount'}</li>
                            <li>• {language === 'hi' ? 'सरकारी सब्सिडी उपलब्ध' : 'Government subsidy available'}</li>
                          </ul>
                        </div>
                        
                        <Button className="w-full mt-4 bg-farm-600 hover:bg-farm-700">
                          <Download className="mr-2 h-4 w-4" />
                          {content[language as keyof typeof content].downloadReport}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profit Calculator - Combined View */}
            {activeCalculator === 'profit' && (
              <Card className="border-farm-200">
                <CardHeader>
                  <CardTitle className="text-farm-700 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    {content[language as keyof typeof content].profitCalculator}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-16 w-16 mx-auto text-farm-400 mb-4" />
                    <h3 className="text-xl font-bold text-farm-700 mb-2">
                      {language === 'hi' ? 'मुनाफा कैलक्यूलेटर' : 'Profit Calculator'}
                    </h3>
                    <p className="text-farm-600 mb-6">
                      {language === 'hi' 
                        ? 'फसल लागत कैलक्यूलेटर का उपयोग करके अपने मुनाफे की गणना करें'
                        : 'Use the Crop Cost Calculator to calculate your profit'
                      }
                    </p>
                    <Button 
                      onClick={() => setActiveCalculator('crop-cost')}
                      className="bg-farm-600 hover:bg-farm-700"
                    >
                      {language === 'hi' ? 'फसल लागत कैलक्यूलेटर खोलें' : 'Open Crop Cost Calculator'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTools;
