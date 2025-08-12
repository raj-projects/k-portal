import React from 'react';
import Layout from '../components/layout/Layout';
import PestIdentification from '../components/features/PestIdentification';
import { useLanguage } from '../contexts/LanguageContext';

const PestIdentificationPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'कीट और रोग पहचान' : 'Pest & Disease Identification'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'फसल के कीट और रोगों की पहचान और उपचार। AI तकनीक से तुरंत पहचान करें।'
                : 'Identify and treat crop pests and diseases. Instant identification with AI technology.'
              }
            </p>
          </div>

          <PestIdentification />
        </div>
      </div>
    </Layout>
  );
};

export default PestIdentificationPage;
