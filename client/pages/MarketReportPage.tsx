import React from 'react';
import Layout from '../components/layout/Layout';
import MarketReport from '../components/features/MarketReport';
import { useLanguage } from '../contexts/LanguageContext';

const MarketReportPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'बाजार रिपोर्ट' : 'Market Report'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'विस्तृत बाजार विश्लेषण, मूल्य रुझान और व्यापारिक अंतर्दृष्टि। सभी प्रमुख मंडियों के ताजा भाव।'
                : 'Detailed market analysis, price trends and trading insights. Latest prices from all major markets.'
              }
            </p>
          </div>

          <MarketReport />
        </div>
      </div>
    </Layout>
  );
};

export default MarketReportPage;
