import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Sprout, DollarSign, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CropData {
  name: string;
  nameHindi: string;
  seedRate: number; // kg per acre
  fertilizerNPK: { n: number; p: number; k: number }; // kg per acre
  avgCostPerAcre: number;
  avgYieldPerAcre: number; // quintals
  avgMarketPrice: number; // per quintal
}

const cropDatabase: Record<string, CropData> = {
  wheat: {
    name: 'Wheat',
    nameHindi: 'गेहूं',
    seedRate: 50,
    fertilizerNPK: { n: 80, p: 40, k: 40 },
    avgCostPerAcre: 15000,
    avgYieldPerAcre: 20,
    avgMarketPrice: 2000
  },
  rice: {
    name: 'Rice',
    nameHindi: 'धान',
    seedRate: 25,
    fertilizerNPK: { n: 100, p: 50, k: 50 },
    avgCostPerAcre: 18000,
    avgYieldPerAcre: 25,
    avgMarketPrice: 1800
  },
  cotton: {
    name: 'Cotton',
    nameHindi: 'कपास',
    seedRate: 12,
    fertilizerNPK: { n: 120, p: 60, k: 60 },
    avgCostPerAcre: 25000,
    avgYieldPerAcre: 15,
    avgMarketPrice: 5000
  },
  sugarcane: {
    name: 'Sugarcane',
    nameHindi: 'गन्ना',
    seedRate: 100,
    fertilizerNPK: { n: 150, p: 75, k: 75 },
    avgCostPerAcre: 35000,
    avgYieldPerAcre: 400,
    avgMarketPrice: 350
  },
  maize: {
    name: 'Maize',
    nameHindi: 'मक्का',
    seedRate: 20,
    fertilizerNPK: { n: 120, p: 60, k: 40 },
    avgCostPerAcre: 16000,
    avgYieldPerAcre: 30,
    avgMarketPrice: 1600
  },
  soybean: {
    name: 'Soybean',
    nameHindi: 'सोयाबीन',
    seedRate: 30,
    fertilizerNPK: { n: 20, p: 60, k: 40 },
    avgCostPerAcre: 14000,
    avgYieldPerAcre: 12,
    avgMarketPrice: 4000
  }
};

const CropCalculator = () => {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [landArea, setLandArea] = useState('');
  const [customSeedRate, setCustomSeedRate] = useState('');
  const [customCost, setCustomCost] = useState('');

  const calculations = useMemo(() => {
    if (!selectedCrop || !landArea || landArea === '0') {
      return null;
    }

    const crop = cropDatabase[selectedCrop];
    const area = parseFloat(landArea);
    const seedRate = customSeedRate ? parseFloat(customSeedRate) : crop.seedRate;
    const costPerAcre = customCost ? parseFloat(customCost) : crop.avgCostPerAcre;

    const totalSeedRequired = seedRate * area;
    const totalFertilizerN = crop.fertilizerNPK.n * area;
    const totalFertilizerP = crop.fertilizerNPK.p * area;
    const totalFertilizerK = crop.fertilizerNPK.k * area;
    const totalCost = costPerAcre * area;
    const expectedYield = crop.avgYieldPerAcre * area;
    const expectedRevenue = expectedYield * crop.avgMarketPrice;
    const expectedProfit = expectedRevenue - totalCost;
    const profitPercentage = totalCost > 0 ? (expectedProfit / totalCost) * 100 : 0;

    return {
      seedRequired: totalSeedRequired,
      fertilizer: {
        nitrogen: totalFertilizerN,
        phosphorus: totalFertilizerP,
        potassium: totalFertilizerK
      },
      totalCost,
      expectedYield,
      expectedRevenue,
      expectedProfit,
      profitPercentage
    };
  }, [selectedCrop, landArea, customSeedRate, customCost]);

  const resetForm = () => {
    setSelectedCrop('');
    setLandArea('');
    setCustomSeedRate('');
    setCustomCost('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Calculator className="h-6 w-6" />
            {language === 'hi' ? 'फसल गणना' : 'Crop Calculation'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{language === 'hi' ? 'फसल चुनें' : 'Select Crop'}</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'फसल चुनें' : 'Choose crop'} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cropDatabase).map(([key, crop]) => (
                    <SelectItem key={key} value={key}>
                      {language === 'hi' ? crop.nameHindi : crop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'hi' ? 'भूमि का क्षेत्रफल (एकड़)' : 'Land Area (Acres)'}</Label>
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
              <Label>{language === 'hi' ? 'बीज दर (किग्रा/एकड़) - वैकल्पिक' : 'Seed Rate (kg/acre) - Optional'}</Label>
              <Input
                type="number"
                placeholder={language === 'hi' ? 'कस्टम बीज दर' : 'Custom seed rate'}
                value={customSeedRate}
                onChange={(e) => setCustomSeedRate(e.target.value)}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'hi' ? 'लागत प्रति एकड़ - वैकल्पिक' : 'Cost per Acre - Optional'}</Label>
              <Input
                type="number"
                placeholder={language === 'hi' ? 'कस्टम लागत' : 'Custom cost'}
                value={customCost}
                onChange={(e) => setCustomCost(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={resetForm} variant="outline">
              {language === 'hi' ? 'रीसेट करें' : 'Reset'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {calculations && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-600 text-lg">
                <Sprout className="h-5 w-5" />
                {language === 'hi' ? 'बीज की आवश्यकता' : 'Seed Requirement'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-kisan-text-primary">
                {calculations.seedRequired.toFixed(1)} {language === 'hi' ? 'किग्रा' : 'kg'}
              </div>
              <p className="text-sm text-kisan-text-secondary mt-1">
                {language === 'hi' ? 'कुल बीज की मात्रा' : 'Total seed quantity required'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-600 text-lg">
                <Calculator className="h-5 w-5" />
                {language === 'hi' ? 'उर्वरक (NPK)' : 'Fertilizer (NPK)'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'hi' ? 'नाइट्रोजन:' : 'Nitrogen:'}</span>
                  <span className="font-semibold">{calculations.fertilizer.nitrogen} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'hi' ? 'फास्फोरस:' : 'Phosphorus:'}</span>
                  <span className="font-semibold">{calculations.fertilizer.phosphorus} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{language === 'hi' ? 'पोटाश:' : 'Potassium:'}</span>
                  <span className="font-semibold">{calculations.fertilizer.potassium} kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-600 text-lg">
                <DollarSign className="h-5 w-5" />
                {language === 'hi' ? 'कुल लागत' : 'Total Cost'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-kisan-text-primary">
                ₹{calculations.totalCost.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-kisan-text-secondary mt-1">
                {language === 'hi' ? 'अनुमानित कुल खर्च' : 'Estimated total expense'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-600 text-lg">
                <TrendingUp className="h-5 w-5" />
                {language === 'hi' ? 'अपेक्षित उत्पादन' : 'Expected Yield'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-kisan-text-primary">
                {calculations.expectedYield} {language === 'hi' ? 'क्विंटल' : 'quintals'}
              </div>
              <p className="text-sm text-kisan-text-secondary mt-1">
                {language === 'hi' ? 'कुल अपेक्षित फस���' : 'Total expected harvest'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-600 text-lg">
                <DollarSign className="h-5 w-5" />
                {language === 'hi' ? 'अपेक्षित आय' : 'Expected Revenue'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-kisan-text-primary">
                ₹{calculations.expectedRevenue.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-kisan-text-secondary mt-1">
                {language === 'hi' ? 'कुल बिक्री आय' : 'Total sales income'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 text-lg ${calculations.expectedProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="h-5 w-5" />
                {language === 'hi' ? 'लाभ-हानि' : 'Profit/Loss'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${calculations.expectedProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{calculations.expectedProfit.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-kisan-text-secondary mt-1">
                {calculations.profitPercentage >= 0 ? '+' : ''}{calculations.profitPercentage.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedCrop && (
        <Card>
          <CardHeader>
            <CardTitle className="text-kisan-primary">
              {language === 'hi' ? 'फसल की जानकारी' : 'Crop Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">{language === 'hi' ? 'मानक दरें:' : 'Standard Rates:'}</h4>
                <ul className="space-y-1 text-kisan-text-secondary">
                  <li>{language === 'hi' ? 'बीज दर:' : 'Seed Rate:'} {cropDatabase[selectedCrop].seedRate} kg/acre</li>
                  <li>{language === 'hi' ? 'औसत लागत:' : 'Avg Cost:'} ₹{cropDatabase[selectedCrop].avgCostPerAcre.toLocaleString('en-IN')}/acre</li>
                  <li>{language === 'hi' ? 'औसत उत्पादन:' : 'Avg Yield:'} {cropDatabase[selectedCrop].avgYieldPerAcre} quintals/acre</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{language === 'hi' ? 'उर्वरक दर (प्रति एकड़):' : 'Fertilizer Rate (per acre):'}</h4>
                <ul className="space-y-1 text-kisan-text-secondary">
                  <li>{language === 'hi' ? 'नाइट्रोजन:' : 'Nitrogen:'} {cropDatabase[selectedCrop].fertilizerNPK.n} kg</li>
                  <li>{language === 'hi' ? 'फास्फोरस:' : 'Phosphorus:'} {cropDatabase[selectedCrop].fertilizerNPK.p} kg</li>
                  <li>{language === 'hi' ? 'पोटाश:' : 'Potassium:'} {cropDatabase[selectedCrop].fertilizerNPK.k} kg</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropCalculator;
