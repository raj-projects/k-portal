import React from 'react';
import Layout from '../components/layout/Layout';
import Registration from '../components/features/Registration';
import { useLanguage } from '../contexts/LanguageContext';

const RegistrationPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'किसानसेतु में पंजीकरण' : 'Register with Kisansetu'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'किसानमित्र में निःशुल्क पंजीकरण करें और सभी सुविधाओं का लाभ उठाएं। व्यक्तिगत डैशबोर्ड और कस्टमाइज्ड सलाह।'
                : 'Register for free with Kisansetu and access all features. Get personalized dashboard and customized advice.'
              }
            </p>
          </div>

          <Registration />
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
