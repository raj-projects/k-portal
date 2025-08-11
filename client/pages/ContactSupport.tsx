import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, AlertTriangle, CheckCircle, Send, User, FileText, Headphones, Bot, Globe, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ChatBot from '@/components/ChatBot';

const ContactSupport = () => {
  const [language, setLanguage] = useState('hi');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'general',
    priority: 'medium',
    message: ''
  });
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const content = {
    hi: {
      title: 'संपर्क और सहायता',
      subtitle: '24x7 किसान हेल्पल��इन और तुरंत समाधान',
      emergencyHelp: 'आपातकालीन सहायता',
      generalSupport: 'सामान्य सहायता',
      technicalSupport: 'तकनीकी सहायता',
      feedback: 'सुझाव और शिकायत',
      chatBot: 'AI चैटबॉट',
      whatsappSupport: 'व्हाट्सऐप सहायता',
      callSupport: 'फोन सहायता',
      emailSupport: 'ईमेल सहायता',
      contactForm: 'संपर्क फॉर्म',
      name: 'नाम',
      phone: 'मोबाइल नंबर',
      email: 'ईमेल',
      category: 'श्रेणी',
      priority: 'प्राथमिकता',
      message: 'संदेश',
      submit: 'भेजें',
      officeHours: 'कार्यालय समय',
      responseTime: 'जवाब का समय',
      helplineNumbers: 'हेल्पलाइन नंबर',
      regionalOffices: 'क्षेत्रीय कार्यालय',
      faq: 'अकसर पूछे जाने वाले प्रश्न',
      downloadApp: 'ऐप डाउनलोड करें'
    },
    en: {
      title: 'Contact & Support',
      subtitle: '24x7 Farmer Helpline and Instant Solutions',
      emergencyHelp: 'Emergency Help',
      generalSupport: 'General Support',
      technicalSupport: 'Technical Support',
      feedback: 'Feedback & Complaints',
      chatBot: 'AI ChatBot',
      whatsappSupport: 'WhatsApp Support',
      callSupport: 'Phone Support',
      emailSupport: 'Email Support',
      contactForm: 'Contact Form',
      name: 'Name',
      phone: 'Mobile Number',
      email: 'Email',
      category: 'Category',
      priority: 'Priority',
      message: 'Message',
      submit: 'Submit',
      officeHours: 'Office Hours',
      responseTime: 'Response Time',
      helplineNumbers: 'Helpline Numbers',
      regionalOffices: 'Regional Offices',
      faq: 'Frequently Asked Questions',
      downloadApp: 'Download App'
    }
  };

  const helplineNumbers = [
    {
      title: { hi: '🆘 आपातकालीन किसान हेल्पलाइन', en: '🆘 Emergency Farmer Helpline' },
      number: '1800-180-1551',
      description: { hi: 'फसल, मौसम या कीट संबंधी आपातकाल', en: 'Crop, weather or pest emergencies' },
      availability: '24x7',
      type: 'emergency'
    },
    {
      title: { hi: '🌾 फसल सलाह हेल्पलाइन', en: '🌾 Crop Advisory Helpline' },
      number: '1800-180-1552',
      description: { hi: 'बुआई, कटाई और फसल की देखभाल', en: 'Sowing, harvesting and crop care' },
      availability: '6 AM - 10 PM',
      type: 'advisory'
    },
    {
      title: { hi: '💰 वित्तीय सहायता हेल्पलाइन', en: '💰 Financial Aid Helpline' },
      number: '1800-180-1553',
      description: { hi: 'ऋण, बीमा और सरकारी योजनाएं', en: 'Loans, insurance and government schemes' },
      availability: '9 AM - 6 PM',
      type: 'financial'
    },
    {
      title: { hi: '🛒 मंडी भाव हेल्पलाइन', en: '🛒 Market Prices Helpline' },
      number: '1800-180-1554',
      description: { hi: 'फसल की कीमत और बाजार की जानकारी', en: 'Crop prices and market information' },
      availability: '5 AM - 8 PM',
      type: 'market'
    },
    {
      title: { hi: '⚙️ तकनीकी सहायता', en: '⚙️ Technical Support' },
      number: '1800-180-1555',
      description: { hi: 'ऐप और वेबसाइट संबंधी समस्याएं', en: 'App and website related issues' },
      availability: '9 AM - 9 PM',
      type: 'technical'
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: { hi: 'व्हाट्सऐप सहायता', en: 'WhatsApp Support' },
      description: { hi: 'तुरंत जवाब और फोटो शेयर करें', en: 'Instant replies and photo sharing' },
      contact: '+91-9876543210',
      action: { hi: 'मैसेज भेजें', en: 'Send Message' },
      responseTime: { hi: '5 मिनट', en: '5 minutes' },
      color: 'bg-green-500'
    },
    {
      icon: Phone,
      title: { hi: 'फोन सहायता', en: 'Phone Support' },
      description: { hi: 'विशेषज्ञों से सीधी बात', en: 'Direct talk with experts' },
      contact: '1800-180-1551',
      action: { hi: 'कॉल करें', en: 'Call Now' },
      responseTime: { hi: 'तुरंत', en: 'Immediate' },
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: { hi: 'ईमेल सहायता', en: 'Email Support' },
      description: { hi: 'विस्तृत समस्या का समाधान', en: 'Detailed problem solutions' },
      contact: 'help@kisanmitra.in',
      action: { hi: 'ईमेल भेजें', en: 'Send Email' },
      responseTime: { hi: '2 घंटे', en: '2 hours' },
      color: 'bg-purple-500'
    },
    {
      icon: Bot,
      title: { hi: 'AI चैटबॉट', en: 'AI ChatBot' },
      description: { hi: 'तुरंत जवाब पाएं', en: 'Get instant answers' },
      contact: 'किसानमित्र बॉट',
      action: { hi: 'चैट शुरू करें', en: 'Start Chat' },
      responseTime: { hi: 'तुरंत', en: 'Instant' },
      color: 'bg-orange-500'
    }
  ];

  const regionalOffices = [
    {
      region: { hi: 'उत्तर भारत', en: 'North India' },
      states: { hi: 'दिल्ली, पंजाब, हरियाणा, उत्तर प्रदेश', en: 'Delhi, Punjab, Haryana, Uttar Pradesh' },
      address: { hi: 'सेक्टर 18, नोएडा, उत्तर प्रदेश - 201301', en: 'Sector 18, Noida, Uttar Pradesh - 201301' },
      phone: '+91-120-4567890',
      email: 'north@kisanmitra.in',
      timing: '9 AM - 6 PM'
    },
    {
      region: { hi: 'पश्चिम भारत', en: 'West India' },
      states: { hi: 'महाराष्ट्र, गुजरात, राजस्थान, मध्य प्रदेश', en: 'Maharashtra, Gujarat, Rajasthan, Madhya Pradesh' },
      address: { hi: 'बांद्रा कुर्ला कॉम्प्लेक्स, मुंबई - 400051', en: 'Bandra Kurla Complex, Mumbai - 400051' },
      phone: '+91-22-4567890',
      email: 'west@kisanmitra.in',
      timing: '9 AM - 6 PM'
    },
    {
      region: { hi: 'दक्षिण भारत', en: 'South India' },
      states: { hi: 'कर्नाटक, तमिलनाडु, आंध्र प्रदेश, तेलंगाना', en: 'Karnataka, Tamil Nadu, Andhra Pradesh, Telangana' },
      address: { hi: 'इलेक्ट्रॉनिक सिटी, बैंगलोर - 560100', en: 'Electronic City, Bangalore - 560100' },
      phone: '+91-80-4567890',
      email: 'south@kisanmitra.in',
      timing: '9 AM - 6 PM'
    },
    {
      region: { hi: 'पूर्व भारत', en: 'East India' },
      states: { hi: 'पश्चिम बंगाल, बिहार, झारखंड, ओडिशा', en: 'West Bengal, Bihar, Jharkhand, Odisha' },
      address: { hi: 'सॉल्ट लेक सिटी, कोलकाता - 700091', en: 'Salt Lake City, Kolkata - 700091' },
      phone: '+91-33-4567890',
      email: 'east@kisanmitra.in',
      timing: '9 AM - 6 PM'
    }
  ];

  const faqData = [
    {
      question: { 
        hi: 'किसानमित्र की सेवाएं मुफ्त हैं?', 
        en: 'Are KisanMitra services free?' 
      },
      answer: { 
        hi: 'हां, किसानमित्र की सभी बुनियादी सेवाएं बिल्कुल मुफ्त हैं। मौसम, मंडी भाव, सरकारी योजनाएं और विशेषज्ञ सलाह सभी निःशुल्क उपलब्ध हैं।',
        en: 'Yes, all basic KisanMitra services are completely free. Weather, market prices, government schemes and expert advice are all available free of cost.'
      }
    },
    {
      question: { 
        hi: 'हेल्पलाइन कितने बजे उपलब्ध है?', 
        en: 'What are the helpline hours?' 
      },
      answer: { 
        hi: 'आपातकालीन हेल्पलाइन 24x7 उपलब्ध है। अन्य सेवाओं के लिए समय सुबह 6 बजे से रात 10 बजे तक है।',
        en: 'Emergency helpline is available 24x7. For other services, timing is from 6 AM to 10 PM.'
      }
    },
    {
      question: { 
        hi: 'क्��ा मैं अपनी क्षेत्रीय भाषा में सहायता ले सकता हूं?', 
        en: 'Can I get support in my regional language?' 
      },
      answer: { 
        hi: 'हां, हम हिंदी, अंग्रेजी और 15+ क्षेत्रीय भाषाओं में सहायता प्रदान करते हैं। व्हाट्सऐप और फोन पर स्थानीय भाषा में बात कर सकते हैं।',
        en: 'Yes, we provide support in Hindi, English and 15+ regional languages. You can communicate in local language on WhatsApp and phone.'
      }
    },
    {
      question: { 
        hi: 'मेरी शिकायत का जवाब कितने समय में मिलेगा?', 
        en: 'How long will it take to get response to my complaint?' 
      },
      answer: { 
        hi: 'व्हाट्सऐप पर 5 मिनट, फोन पर तुरंत, और ईमेल पर 2 घंटे के अंदर जवाब मिलेगा। आपातकालीन मामलों में तुरंत सहायता मिलती है।',
        en: 'WhatsApp - 5 minutes, Phone - immediate, Email - within 2 hours. Emergency cases get immediate assistance.'
      }
    }
  ];

  const categories = [
    { key: 'general', label: { hi: 'सामान्य प्रश्न', en: 'General Query' } },
    { key: 'technical', label: { hi: 'तकनीकी समस्या', en: 'Technical Issue' } },
    { key: 'financial', label: { hi: 'वित्तीय सहायता', en: 'Financial Help' } },
    { key: 'crop', label: { hi: 'फसल सलाह', en: 'Crop Advice' } },
    { key: 'complaint', label: { hi: 'शिकायत', en: 'Complaint' } }
  ];

  const priorities = [
    { key: 'low', label: { hi: 'कम', en: 'Low' } },
    { key: 'medium', label: { hi: 'मध्यम', en: 'Medium' } },
    { key: 'high', label: { hi: 'उच्च', en: 'High' } },
    { key: 'urgent', label: { hi: 'अत्यधिक जरूरी', en: 'Urgent' } }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(language === 'hi' ? 'आपका संदेश भेज दिया गया है। जल्द ही जवाब मिलेगा।' : 'Your message has been sent. You will get a response soon.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: 'general',
      priority: 'medium',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getHelplineTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'border-red-400 bg-red-50';
      case 'advisory': return 'border-green-400 bg-green-50';
      case 'financial': return 'border-blue-400 bg-blue-50';
      case 'market': return 'border-yellow-400 bg-yellow-50';
      case 'technical': return 'border-purple-400 bg-purple-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-farm-700 mb-4">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600 max-w-3xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="mb-8">
          <Alert className="border-red-400 bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <AlertDescription>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <p className="font-bold text-red-800 text-lg mb-2">
                    🚨 {language === 'hi' ? 'आपातकालीन सहायता - 24x7 उपलब्ध' : 'Emergency Help - Available 24x7'}
                  </p>
                  <p className="text-red-700">
                    {language === 'hi' 
                      ? 'फसल, मौसम या कीट संबंधी आपातकाल में तुरंत कॉल करें। विशेषज्ञ तुरंत सहायता करेंगे।'
                      : 'Call immediately for crop, weather or pest emergencies. Experts will provide immediate assistance.'
                    }
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4">
                    📞 1800-180-1551
                  </Button>
                  <p className="text-xs text-red-600 mt-1">
                    {language === 'hi' ? 'निःशुल्क कॉल' : 'Toll Free'}
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Support Channels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 text-center">
            {language === 'hi' ? 'सहायता के तरीके' : 'Support Channels'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="border-farm-200 hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className={`${channel.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <channel.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-farm-700 mb-2">
                    {channel.title[language as keyof typeof channel.title]}
                  </h3>
                  <p className="text-sm text-farm-600 mb-3">
                    {channel.description[language as keyof typeof channel.description]}
                  </p>
                  <p className="font-semibold text-farm-700 mb-3">{channel.contact}</p>
                  <div className="flex items-center justify-center text-xs text-gray-500 mb-4">
                    <Clock className="h-3 w-3 mr-1" />
                    {channel.responseTime[language as keyof typeof channel.responseTime]}
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (channel.title.en === 'AI ChatBot') {
                        setIsChatBotOpen(true);
                      } else if (channel.title.en === 'WhatsApp Support') {
                        window.open(`https://wa.me/919876543210`, '_blank');
                      } else if (channel.title.en === 'Phone Support') {
                        window.open(`tel:18001801551`, '_blank');
                      } else {
                        window.open(`mailto:${channel.contact}`, '_blank');
                      }
                    }}
                  >
                    {channel.action[language as keyof typeof channel.action]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Helpline Numbers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 text-center">
            {content[language as keyof typeof content].helplineNumbers}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helplineNumbers.map((helpline, index) => (
              <Card key={index} className={`${getHelplineTypeColor(helpline.type)} border-2 hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-farm-700 mb-3">
                    {helpline.title[language as keyof typeof helpline.title]}
                  </h3>
                  <div className="bg-white p-4 rounded-lg mb-4 text-center">
                    <p className="text-2xl font-bold text-farm-700">{helpline.number}</p>
                  </div>
                  <p className="text-sm text-farm-600 mb-3">
                    {helpline.description[language as keyof typeof helpline.description]}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center text-farm-700">
                      <Clock className="h-3 w-3 mr-1" />
                      {helpline.availability}
                    </span>
                    <Button size="sm" onClick={() => window.open(`tel:${helpline.number.replace(/\D/g, '')}`, '_blank')}>
                      <Phone className="h-4 w-4 mr-1" />
                      {language === 'hi' ? 'कॉल करें' : 'Call'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="border-farm-200">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-farm-700">
                <Send className="mr-3 h-6 w-6" />
                {content[language as keyof typeof content].contactForm}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">
                    {content[language as keyof typeof content].name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
                    placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">
                    {content[language as keyof typeof content].phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
                    placeholder={language === 'hi' ? '+91 98765 43210' : '+91 98765 43210'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">
                    {content[language as keyof typeof content].email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
                    placeholder={language === 'hi' ? 'आपका ईमेल' : 'Your email'}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-farm-700 mb-2">
                      {content[language as keyof typeof content].category}
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat.key} value={cat.key}>
                          {cat.label[language as keyof typeof cat.label]}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-farm-700 mb-2">
                      {content[language as keyof typeof content].priority}
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.key} value={priority.key}>
                          {priority.label[language as keyof typeof priority.label]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">
                    {content[language as keyof typeof content].message} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
                    placeholder={language === 'hi' ? 'अपनी समस्या या सवाल विस्तार से लिखें...' : 'Write your problem or question in detail...'}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-farm-500 hover:bg-farm-600 text-white py-3">
                  <Send className="h-5 w-5 mr-2" />
                  {content[language as keyof typeof content].submit}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="border-farm-200">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-farm-700">
                <FileText className="mr-3 h-6 w-6" />
                {content[language as keyof typeof content].faq}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-farm-700 mb-2">
                      ❓ {faq.question[language as keyof typeof faq.question]}
                    </h4>
                    <p className="text-sm text-farm-600">
                      {faq.answer[language as keyof typeof faq.answer]}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-farm-50 rounded-lg">
                <p className="text-sm text-farm-700 font-medium mb-2">
                  💡 {language === 'hi' ? 'और सवाल हैं?' : 'More questions?'}
                </p>
                <p className="text-sm text-farm-600">
                  {language === 'hi' 
                    ? 'हमारे AI चैटबॉट से तुरंत जवाब पाएं या हेल्पलाइन पर कॉल करें।'
                    : 'Get instant answers from our AI chatbot or call the helpline.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Offices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-farm-700 mb-6 text-center">
            {content[language as keyof typeof content].regionalOffices}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalOffices.map((office, index) => (
              <Card key={index} className="border-farm-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-farm-700 mb-2">
                    📍 {office.region[language as keyof typeof office.region]}
                  </h3>
                  <p className="text-sm text-farm-600 mb-4">
                    {office.states[language as keyof typeof office.states]}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-farm-600 mr-2 mt-0.5" />
                      <span>{office.address[language as keyof typeof office.address]}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-farm-600 mr-2" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-farm-600 mr-2" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-farm-600 mr-2" />
                      <span>{office.timing}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="mb-8">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription>
              <div className="text-center">
                <p className="font-bold text-green-800 text-lg mb-2">
                  ⭐ {language === 'hi' ? '5 करोड़+ किसान हमारी सेवाओं से संतुष्ट' : '5 Crore+ farmers satisfied with our services'}
                </p>
                <div className="flex justify-center items-center space-x-6 text-sm text-green-700">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>4.9/5 {language === 'hi' ? 'रेटिंग' : 'Rating'}</span>
                  </div>
                  <div>99% {language === 'hi' ? '���मस्या समाधान दर' : 'Problem Resolution Rate'}</div>
                  <div>{language === 'hi' ? '24x7 उपलब्धता' : '24x7 Availability'}</div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* ChatBot Component */}
        {isChatBotOpen && <ChatBot />}
      </div>
    </div>
  );
};

export default ContactSupport;
