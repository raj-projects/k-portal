import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'hi' | 'en' | 'pa' | 'gu' | 'ta' | 'te' | 'ml' | 'kn' | 'or' | 'bn' | 'mr';

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  languages: Array<{ code: Language; name: string; nativeName: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages = [
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'pa' as Language, name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'or' as Language, name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'bn' as Language, name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' }
];

// Translation data structure
const translations: Record<Language, Record<string, string>> = {
  hi: {
    // Header
    'nav.home': 'होम',
    'nav.weather': 'मौसम सलाह',
    'nav.news': 'समाचार',
    'nav.market-prices': 'मंडी भाव',
    'nav.schemes': 'सरकारी योजनाएं',
    'nav.tools': 'खेती उपकरण',
    'nav.knowledge': 'ज्ञान',
    'nav.community': 'समुदाय',
    'nav.help': 'सहायता',
    'nav.language': 'भाषा',
    
    // App Name
    'app.name': 'किसानसेतु',
    'app.tagline': 'Your Farming Companion',
    'app.description': 'भारतीय किसानों के लिए निःशुल��क मंच। सभी खेती की जानकारी, उपकरण और वास्तविक समय की डेटा एक ही स्थान पर।',
    
    // Weather
    'weather.title': 'आज का मौसम',
    'weather.refresh': 'Refresh',
    'weather.humidity': 'नमी',
    'weather.wind': 'हवा',
    'weather.visibility': 'दृश्यता',
    'weather.feels-like': '���नुभव',
    'weather.advice': 'फसल सलाह',
    'weather.location-error': 'स्थान प्राप्त करने में त्रुटि',
    'weather.retry': 'पुनः प्रयास',
    
    // Market Prices
    'market.title': 'आज के मंडी भाव',
    'market.view-all': 'सभी देखें',
    'market.per-quintal': 'प्रति क्विंटल',
    'market.suggestion': 'सुझाव',
    
    // Schemes
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.view-all': 'सभी योजनाएं',
    'schemes.amount': 'राशि',
    'schemes.deadline': 'अंतिम तारीख',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.apply': 'आवेदन करें',
    'schemes.active': 'सक्रिय',
    'schemes.new': 'नई योजना',
    'schemes.ending-soon': 'जल्दी करें',
    
    // Tools
    'tools.title': 'खेती के उपकरण',
    'tools.view-all': 'सभी उपकरण',
    'tools.calculator': 'फसल कैलकुलेटर',
    'tools.calendar': 'फसल कैलेंडर',
    'tools.irrigation': 'सिंचाई योजना',
    'tools.pest': 'कीट पहचान',
    'tools.fertilizer': 'उर्वरक गाइड',
    'tools.equipment': 'मशीन किराया',
    
    // News
    'news.title': 'खेती और मौसम की ताज़ा खबरें',
    'news.no-news': 'इस समय कोई समाचार उपलब्ध नहीं है',
    'news.last-update': 'अंतिम अपडेट',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.retry': 'पुनः प्रयास करें',
    'common.view-more': 'अधिक देखें',
    'common.close': 'बंद करें',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.submit': 'जमा करें',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.sort': 'क्रमबद्ध करें',
    
    // Footer
    'footer.about': 'भारतीय किसानों के लिए एक निःशुल्क मंच। सभी खेती की जानकारी और उपकरण एक ही स्थान पर।',
    'footer.quick-links': 'त्वरित लिंक',
    'footer.services': 'सेवाएं',
    'footer.contact': 'संपर्क करें',
    'footer.helpline': 'किसान हेल्पलाइन',
    'footer.email': 'Email',
    'footer.location': 'भारत में सभी राज्य',
    'footer.copyright': '© 2024 किसानसेतु। सभी अधिकार सुरक्षित।',
    'footer.tagline': 'Made with ❤️ for Indian Farmers'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.weather': 'Weather',
    'nav.news': 'News',
    'nav.market-prices': 'Market Prices',
    'nav.schemes': 'Schemes',
    'nav.tools': 'Tools',
    'nav.knowledge': 'Knowledge',
    'nav.community': 'Community',
    'nav.help': 'Help',
    'nav.language': 'Language',
    
    // App Name
    'app.name': 'KisanSetu',
    'app.tagline': 'Your Farming Companion',
    'app.description': 'A free platform for Indian farmers with all farming tools and real-time information in one place.',
    
    // Weather
    'weather.title': "Today's Weather",
    'weather.refresh': 'Refresh',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind',
    'weather.visibility': 'Visibility',
    'weather.feels-like': 'Feels Like',
    'weather.advice': 'Crop Advice',
    'weather.location-error': 'Location access error',
    'weather.retry': 'Retry',
    
    // Market Prices
    'market.title': "Today's Market Rates",
    'market.view-all': 'View All',
    'market.per-quintal': 'per quintal',
    'market.suggestion': 'Suggestion',
    
    // Schemes
    'schemes.title': 'Government Schemes',
    'schemes.view-all': 'All Schemes',
    'schemes.amount': 'Amount',
    'schemes.deadline': 'Deadline',
    'schemes.beneficiaries': 'Beneficiaries',
    'schemes.apply': 'Apply',
    'schemes.active': 'Active',
    'schemes.new': 'New Scheme',
    'schemes.ending-soon': 'Apply Soon',
    
    // Tools
    'tools.title': 'Farming Tools',
    'tools.view-all': 'All Tools',
    'tools.calculator': 'Crop Calculator',
    'tools.calendar': 'Crop Calendar',
    'tools.irrigation': 'Irrigation Planner',
    'tools.pest': 'Pest Identification',
    'tools.fertilizer': 'Fertilizer Guide',
    'tools.equipment': 'Equipment Rental',
    
    // News
    'news.title': 'Latest Farming & Weather News',
    'news.no-news': 'No news available at the moment',
    'news.last-update': 'Last Update',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.view-more': 'View More',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    
    // Footer
    'footer.about': 'A free platform for Indian farmers with all farming tools and real-time information in one place.',
    'footer.quick-links': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact Us',
    'footer.helpline': 'Farmer Helpline',
    'footer.email': 'Email',
    'footer.location': 'All States of India',
    'footer.copyright': '© 2024 KisanSetu. All rights reserved.',
    'footer.tagline': 'Made with ❤️ for Indian Farmers'
  },
  // Simplified versions for other languages (you can expand these)
  pa: {
    'app.name': 'ਕਿਸਾਨਸੇਤੁ',
    'nav.home': 'ਘਰ',
    'nav.weather': 'ਮੌਸਮ',
    'nav.market-prices': 'ਮੰਡੀ ਭਾਅ',
    'nav.schemes': 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ',
    'nav.tools': 'ਔਜ਼ਾਰ',
    'nav.knowledge': 'ਗਿਆਨ',
    'nav.community': 'ਭਾਈਚਾਰਾ',
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
  },
  gu: {
    'app.name': 'કિસાનસેતુ',
    'nav.home': 'હોમ',
    'nav.weather': 'હવામાન',
    'nav.market-prices': 'માર્કેટ ભ��વ',
    'nav.schemes': 'સરકારી યોજનાઓ',
    'nav.tools': 'સાધનો',
    'nav.knowledge': 'જ્ઞાન',
    'nav.community': 'સમુદાય',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
  },
  ta: {
    'app.name': 'கிசான்சேது',
    'nav.home': 'முகப்பு',
    'nav.weather': 'வானிலை',
    'nav.market-prices': 'சந்தை விலை',
    'nav.schemes': 'அரசு திட்டங்கள்',
    'nav.tools': 'கருவிகள்',
    'nav.knowledge': 'அறிவு',
    'nav.community': 'சமூகம்',
    'common.loading': 'ஏற்றுகிறது...',
  },
  te: {
    'app.name': 'కిసాన్‌సేతు',
    'nav.home': 'హోమ్',
    'nav.weather': 'వాతావరణం',
    'nav.market-prices': 'మార్���ెట్ ధరలు',
    'nav.schemes': 'ప్రభుత్వ పథకాలు',
    'nav.tools': 'సాధనాలు',
    'nav.knowledge': 'జ్ఞానం',
    'nav.community': 'సంఘం',
    'common.loading': 'లోడవుతోంది...',
  },
  ml: {
    'app.name': 'കിസാൻസേതു',
    'nav.home': 'ഹോം',
    'nav.weather': 'കാലാവസ്ഥ',
    'nav.market-prices': 'മാർക്കറ്റ് നിരക്കുകൾ',
    'nav.schemes': 'സർക്കാർ പദ്ധതികൾ',
    'nav.tools': 'ഉപകരണങ്ങൾ',
    'nav.knowledge': 'അറിവ്',
    'nav.community': 'കമ്മ്യൂണിറ്റി',
    'common.loading': 'ലോഡ് ചെയ്യുന്നു...',
  },
  kn: {
    'app.name': 'ಕಿಸಾನ್‌ಸೇತು',
    'nav.home': 'ಮುಖಪುಟ',
    'nav.weather': 'ಹವಾಮಾನ',
    'nav.market-prices': 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    'nav.schemes': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    'nav.tools': 'ಸಾಧನಗಳು',
    'nav.knowledge': 'ಜ್ಞಾನ',
    'nav.community': 'ಸಮುದಾಯ',
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  },
  or: {
    'app.name': 'କିସ���ନସେତୁ',
    'nav.home': 'ଘର',
    'nav.weather': 'ପାଗ',
    'nav.market-prices': 'ବଜାର ଦର',
    'nav.schemes': 'ସରକାରୀ ଯୋଜନା',
    'nav.tools': 'ଉପକରଣ',
    'nav.knowledge': 'ଜ୍ଞାନ',
    'nav.community': 'ସମୁଦାୟ',
    'common.loading': 'ଲୋଡ୍ ହେଉଛି...',
  },
  bn: {
    'app.name': 'কিসান���েতু',
    'nav.home': 'হোম',
    'nav.weather': 'আবহাওয়া',
    'nav.market-prices': 'বাজার দর',
    'nav.schemes': 'সরকারি প্রকল্প',
    'nav.tools': 'যন্ত্রপাতি',
    'nav.knowledge': 'জ্ঞান',
    'nav.community': 'সম্প্রদায়',
    'common.loading': 'লোড হচ্ছে...',
  },
  mr: {
    'app.name': 'किसानसेतु',
    'nav.home': 'होम',
    'nav.weather': 'हवामान',
    'nav.market-prices': 'बाजार भाव',
    'nav.schemes': 'सरकारी योजना',
    'nav.tools': 'साधने',
    'nav.knowledge': 'ज्ञान',
    'nav.community': 'समुदाय',
    'common.loading': 'लोड होत आहे...',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('kisansetu-language') as Language;
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      const supportedLang = languages.find(l => l.code === browserLang);
      if (supportedLang) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('kisansetu-language', lang);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const langTranslations = translations[currentLanguage] || translations.hi;
    let translation = langTranslations[key] || translations.en[key] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), value);
      });
    }
    
    return translation;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
