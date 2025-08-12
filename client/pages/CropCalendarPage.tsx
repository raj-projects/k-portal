import React from 'react';
import Layout from '../components/layout/Layout';
import CropCalendar from '../components/features/CropCalendar';
import { useLanguage } from '../contexts/LanguageContext';

const CropCalendarPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'फसल कैलेंडर' : 'Crop Calendar'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'फसल-वार बुआई, सिंचाई, उर्वरक और कटाई का समय। अपनी फसल की सही योजना बनाएं।'
                : 'Crop-wise planting, irrigation, fertilizer and harvesting schedule. Plan your crops correctly.'
              }
            </p>
          </div>

          <CropCalendar />
        </div>
      </div>
    </Layout>
  );
};

export default CropCalendarPage;
