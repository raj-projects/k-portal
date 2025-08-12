import React from 'react';
import Layout from '../components/layout/Layout';
import FertilizerGuide from '../components/features/FertilizerGuide';
import { useLanguage } from '../contexts/LanguageContext';

const FertilizerGuidePage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'उर्वरक गाइड' : 'Fertilizer Guide'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'मिट्टी के अनुसार सही उर्वरक का चुनाव और मात्रा। मिट्टी परीक्षण के आधार पर सटीक सिफारिश।'
                : 'Choose the right fertilizer and quantity based on soil. Accurate recommendations based on soil testing.'
              }
            </p>
          </div>

          <FertilizerGuide />
        </div>
      </div>
    </Layout>
  );
};

export default FertilizerGuidePage;
