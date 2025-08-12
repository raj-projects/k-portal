import React from 'react';
import Layout from '../components/layout/Layout';
import CropCalculator from '../components/features/CropCalculator';
import { useLanguage } from '../contexts/LanguageContext';

const CropCalculatorPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'फसल कैलकुलेटर' : 'Crop Calculator'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'बीज, उर्वरक और लागत की गणना के लिए विभिन्न कैलकुलेटर। अपनी फसल की सटीक योजना बनाएं।'
                : 'Various calculators for seed, fertilizer and cost calculation. Make accurate planning for your crops.'
              }
            </p>
          </div>

          <CropCalculator />
        </div>
      </div>
    </Layout>
  );
};

export default CropCalculatorPage;
