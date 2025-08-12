import React from 'react';
import Layout from '../components/layout/Layout';
import EquipmentRental from '../components/features/EquipmentRental';
import { useLanguage } from '../contexts/LanguageContext';

const EquipmentRentalPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'कृषि उपकरण किराया' : 'Equipment Rental'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'कृषि यंत्र और मशीनों का किराया और उपलब्धता। आसान बुकिंग और किफायती दरें।'
                : 'Rent agricultural machinery and equipment. Easy booking with affordable rates and local availability.'
              }
            </p>
          </div>

          <EquipmentRental />
        </div>
      </div>
    </Layout>
  );
};

export default EquipmentRentalPage;
