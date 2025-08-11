import { useState } from 'react';
import { Construction, ArrowLeft, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
}

const PlaceholderPage = ({ title, subtitle }: PlaceholderPageProps) => {
  const [language, setLanguage] = useState('hi');

  const content = {
    hi: {
      comingSoon: 'जल्द आ रहा है',
      developing: 'हम इस सुविधा पर काम कर रहे हैं',
      description: 'यह सुविधा जल्द ही उपलब्ध होगी। हम लगातार ��िसानमित्र को बेहतर बनाने के लिए काम कर रहे हैं।',
      backHome: 'होम पेज पर वापस जाएं',
      notify: 'मुझे सूचित करें',
      contact: 'संपर्क करें',
      features: 'आने वाली सुविधाएं',
      helpText: 'इस बीच, आप हमारी अन्य सुविधाओं का उपयोग कर सकते हैं:',
      weatherLink: 'मौसम की जानकारी देखें',
      mandiLink: 'मंडी भाव देखें'
    },
    en: {
      comingSoon: 'Coming Soon',
      developing: 'We are working on this feature',
      description: 'This feature will be available soon. We are continuously working to improve KisanMitra.',
      backHome: 'Back to Homepage',
      notify: 'Notify Me',
      contact: 'Contact Us',
      features: 'Upcoming Features',
      helpText: 'Meanwhile, you can use our other features:',
      weatherLink: 'Check Weather Information',
      mandiLink: 'Check Market Prices'
    }
  };

  const upcomingFeatures = [
    {
      title: { hi: 'AI चैटबॉट', en: 'AI Chatbot' },
      description: { hi: '24/7 कृषि सला��� और समस्या समाधान', en: '24/7 farming advice and problem solving' }
    },
    {
      title: { hi: 'सरकारी योजनाएं', en: 'Government Schemes' },
      description: { hi: 'केंद्र और राज्य सरकार की योजनाओं की जानकारी', en: 'Information about central and state government schemes' }
    },
    {
      title: { hi: 'कृषि सलाह', en: 'Farming Tips' },
      description: { hi: 'विशेषज्ञों की सलाह और नई तकनीकें', en: 'Expert advice and new techniques' }
    },
    {
      title: { hi: 'लोन कैलक्यूलेटर', en: 'Loan Calculator' },
      description: { hi: 'कृषि ऋण और बीमा की गणना', en: 'Calculate farm loans and insurance' }
    },
    {
      title: { hi: 'समुदाय फोरम', en: 'Community Forum' },
      description: { hi: 'किसानों के साथ चर्चा और अनुभव साझा करें', en: 'Discuss and share experiences with farmers' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-farm-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-harvest-400 to-farm-500 p-6 rounded-full">
              <Construction className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-farm-700 mb-2">
            {title}
          </h1>
          <p className="text-xl text-farm-600 mb-4">
            {subtitle}
          </p>
          <div className="bg-harvest-100 border border-harvest-300 rounded-lg p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-farm-700 mb-2">
              {content[language as keyof typeof content].comingSoon}
            </h2>
            <p className="text-farm-600">
              {content[language as keyof typeof content].developing}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="mb-8 border-farm-200">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-farm-600 mb-6">
              {content[language as keyof typeof content].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/">
                <Button size="lg" className="bg-farm-600 hover:bg-farm-700">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  {content[language as keyof typeof content].backHome}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                {content[language as keyof typeof content].notify}
              </Button>
              <Button size="lg" variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-50">
                <Mail className="mr-2 h-5 w-5" />
                {content[language as keyof typeof content].contact}
              </Button>
            </div>

            <div className="bg-farm-50 rounded-lg p-6">
              <p className="text-farm-700 mb-4">
                {content[language as keyof typeof content].helpText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/weather">
                  <Button variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-100">
                    {content[language as keyof typeof content].weatherLink}
                  </Button>
                </Link>
                <Link to="/mandi-prices">
                  <Button variant="outline" className="border-farm-300 text-farm-700 hover:bg-farm-100">
                    {content[language as keyof typeof content].mandiLink}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Features */}
        <Card className="border-farm-200">
          <CardHeader>
            <CardTitle className="text-2xl text-farm-700 text-center">
              {content[language as keyof typeof content].features}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingFeatures.map((feature, index) => (
                <div key={index} className="bg-farm-50 p-4 rounded-lg border border-farm-200">
                  <h3 className="font-semibold text-farm-700 mb-2">
                    {feature.title[language as keyof typeof feature.title]}
                  </h3>
                  <p className="text-sm text-farm-600">
                    {feature.description[language as keyof typeof feature.description]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-farm-700 mb-4">
              {language === 'hi' ? 'कोई सुझाव या सवाल?' : 'Any Suggestions or Questions?'}
            </h3>
            <p className="text-farm-600 mb-4">
              {language === 'hi' 
                ? 'हमें बताएं कि आप क्या चाहते हैं। आपकी प्रतिक्रिया हमारे लिए महत्वपूर्ण है।'
                : 'Tell us what you want. Your feedback is important to us.'
              }
            </p>
            <div className="space-y-2 text-farm-700">
              <p>📞 हेल्पलाइन / Helpline: 1800-180-1551</p>
              <p>📧 Email: help@kisanmitra.in</p>
              <p>💬 WhatsApp: +91-9876543210</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlaceholderPage;
