import React from 'react';
import Layout from '../components/layout/Layout';
import IrrigationPlanner from '../components/features/IrrigationPlanner';
import { useLanguage } from '../contexts/LanguageContext';

const IrrigationPlannerPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'सिंचाई योजनाकार' : 'Irrigation Planner'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'अपनी फसल के लिए स्मार्ट सिंचाई योजना बनाएं। पानी की बचत करें और उत्पादकता बढ़ाएं।'
                : 'Create smart irrigation plans for your crops. Save water and increase productivity.'
              }
            </p>
          </div>

          <IrrigationPlanner />
        </div>
      </div>
    </Layout>
  );
};

export default IrrigationPlannerPage;
