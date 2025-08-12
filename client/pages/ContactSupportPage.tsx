import React from 'react';
import Layout from '../components/layout/Layout';
import ContactSupport from '../components/features/ContactSupport';
import { useLanguage } from '../contexts/LanguageContext';

const ContactSupportPage = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              {language === 'hi' ? 'संपर्क और सहायता' : 'Contact & Support'}
            </h1>
            <p className="text-lg text-kisan-text-secondary font-devanagari max-w-3xl mx-auto">
              {language === 'hi' 
                ? 'हमसे संपर्क करें या हेल्पलाइन से तुरंत सहायता पाएं। 24/7 किसान सहायता सेवा उपलब्ध।'
                : 'Contact us or get instant help from our helpline. 24/7 farmer support service available.'
              }
            </p>
          </div>

          <ContactSupport />
        </div>
      </div>
    </Layout>
  );
};

export default ContactSupportPage;
