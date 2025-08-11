import { useState } from 'react';
import { Gift, ExternalLink, CheckCircle, Clock, FileText, Users, DollarSign, Calendar, Search, Filter, Download, Phone, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const GovernmentSchemes = () => {
  const [language, setLanguage] = useState('hi');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    hi: {
      title: 'सरकारी योजनाएं',
      subtitle: 'किसानों के लिए केंद्र और राज्य सरकार की कल्याणकारी योजनाएं',
      search: 'योजना खोजें...',
      filter: 'फिल्टर',
      allSchemes: 'सभी योजनाएं',
      financial: 'वित्तीय सहायता',
      subsidies: 'सब्सिडी',
      insurance: 'बीमा योजनाएं',
      training: 'प्रशिक्षण कार्यक्रम',
      apply: 'आवेदन करें',
      moreInfo: 'अधिक जानकारी',
      eligibility: 'पात्रता',
      documents: 'आवश्यक दस्तावेज',
      howToApply: 'आवेदन कैसे करें',
      deadline: 'अंतिम तिथि',
      amount: 'राशि',
      status: 'स्थिति',
      downloadForm: 'फॉर्म डाउनलोड करें',
      contactInfo: 'संपर्क जानकारी',
      steps: 'आवेदन के चरण'
    },
    en: {
      title: 'Government Schemes',
      subtitle: 'Central and State Government Welfare Schemes for Farmers',
      search: 'Search schemes...',
      filter: 'Filter',
      allSchemes: 'All Schemes',
      financial: 'Financial Aid',
      subsidies: 'Subsidies',
      insurance: 'Insurance Schemes',
      training: 'Training Programs',
      apply: 'Apply Now',
      moreInfo: 'More Info',
      eligibility: 'Eligibility',
      documents: 'Required Documents',
      howToApply: 'How to Apply',
      deadline: 'Deadline',
      amount: 'Amount',
      status: 'Status',
      downloadForm: 'Download Form',
      contactInfo: 'Contact Info',
      steps: 'Application Steps'
    }
  };

  const schemes = [
    {
      id: 1,
      name: { hi: 'PM-KISAN योजना', en: 'PM-KISAN Scheme' },
      description: { 
        hi: 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की आर्थिक सहायता',
        en: 'Financial assistance of ₹6,000 per year to all landholding farmer families'
      },
      category: 'financial',
      amount: '₹6,000/वर्ष',
      deadline: { hi: 'कोई समय सीमा नहीं', en: 'No deadline' },
      status: 'active',
      eligibility: {
        hi: ['2 हेक्टेयर तक की कृषि भूमि के मालिक', 'आधार कार्ड अनिवार्य', 'बैंक खाता होना चाहिए'],
        en: ['Own up to 2 hectares of cultivable land', 'Aadhaar card mandatory', 'Must have bank account']
      },
      documents: {
        hi: ['आधार कार्ड', 'भू��ि का रिकॉर्ड', 'बैंक पासबुक', 'पासपोर्ट साइज़ फोटो'],
        en: ['Aadhaar Card', 'Land Records', 'Bank Passbook', 'Passport Size Photo']
      },
      applicationSteps: {
        hi: [
          'pmkisan.gov.in पर जाएं',
          'नया पंजीकरण पर क्लिक करें',
          'आधार नंबर दर्ज करें',
          'व्यक्तिगत और भूमि की जानकारी भरें',
          'दस्तावेज अपलोड करें',
          'आवेदन सबमिट करें'
        ],
        en: [
          'Visit pmkisan.gov.in',
          'Click on New Registration',
          'Enter Aadhaar number',
          'Fill personal and land details',
          'Upload documents',
          'Submit application'
        ]
      },
      officialLink: 'https://pmkisan.gov.in',
      helpline: '155261'
    },
    {
      id: 2,
      name: { hi: 'प्रधानमंत्री फसल बीमा योजना', en: 'PM Fasal Bima Yojana' },
      description: { 
        hi: 'प्राकृतिक आपदाओं से फसल के नुकसान पर बीमा कवरेज',
        en: 'Insurance coverage for crop loss due to natural calamities'
      },
      category: 'insurance',
      amount: '2% प्रीमियम',
      deadline: { hi: 'बुआई के 10 दिन बाद तक', en: 'Up to 10 days after sowing' },
      status: 'active',
      eligibility: {
        hi: ['सभी किसान पात्र हैं', 'अधिसूचित फसलों के लिए', 'नामांकित क्षेत्र में स्थित भूमि'],
        en: ['All farmers eligible', 'For notified crops', 'Land in notified area']
      },
      documents: {
        hi: ['आधार कार्ड', 'भूमि दस्तावेज', 'बैंक खाता विवरण', 'बुआई प्रमाण पत्र'],
        en: ['Aadhaar Card', 'Land documents', 'Bank account details', 'Sowing certificate']
      },
      applicationSteps: {
        hi: [
          'pmfby.gov.in पर जाएं',
          'गेस्ट फार्मर पर क्लिक करें',
          'मोबाइल नंबर से लॉगिन करें',
          'फसल और क्षेत्र का चयन करें',
          'बीमा राशि की गणना ���रें',
          'प्रीमियम का भुगतान करें'
        ],
        en: [
          'Visit pmfby.gov.in',
          'Click on Guest Farmer',
          'Login with mobile number',
          'Select crop and area',
          'Calculate insurance amount',
          'Pay premium'
        ]
      },
      officialLink: 'https://pmfby.gov.in',
      helpline: '14447'
    },
    {
      id: 3,
      name: { hi: 'कृषि यंत्र अनुदान योजना', en: 'Agricultural Equipment Subsidy Scheme' },
      description: { 
        hi: 'कृषि उपकरणों की खरीद पर 50% तक की सब्सिडी',
        en: 'Up to 50% subsidy on purchase of agricultural equipment'
      },
      category: 'subsidies',
      amount: '50% तक सब्सिडी',
      deadline: { hi: '31 मार्च 2024', en: '31st March 2024' },
      status: 'active',
      eligibility: {
        hi: ['छोटे और सीमांत किसान', 'पहले से सब्सिडी नहीं ली हो', 'आय प्रमाण पत्र आवश्यक'],
        en: ['Small and marginal farmers', 'Not availed subsidy before', 'Income certificate required']
      },
      documents: {
        hi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'भूमि दस्तावेज', 'बैंक पासबुक', 'जाति प्रमाण पत्र'],
        en: ['Aadhaar Card', 'Income Certificate', 'Land documents', 'Bank Passbook', 'Caste Certificate']
      },
      applicationSteps: {
        hi: [
          'जिला कृषि कार्यालय में जाएं',
          'आवेदन फॉर्म भरें',
          'आवश्यक दस्तावेज जमा करें',
          'उपकरण का चयन करें',
          'डीलर से कोटेशन लें',
          'अनुमोदन की प्रतीक्षा करें'
        ],
        en: [
          'Visit District Agriculture Office',
          'Fill application form',
          'Submit required documents',
          'Select equipment',
          'Get quotation from dealer',
          'Wait for approval'
        ]
      },
      officialLink: 'https://agrimachinery.nic.in',
      helpline: '1800-180-1551'
    },
    {
      id: 4,
      name: { hi: 'किसान क्रेडिट कार्ड योजना', en: 'Kisan Credit Card Scheme' },
      description: { 
        hi: 'कम ब्याज दर पर कृषि ऋण उपलब्ध कराना',
        en: 'Providing agricultural loans at low interest rates'
      },
      category: 'financial',
      amount: '3 लाख तक',
      deadline: { hi: 'कोई समय सीमा नहीं', en: 'No deadline' },
      status: 'active',
      eligibility: {
        hi: ['सभी किसान पात्र', 'कृषि भूमि का मालिक', 'अच्छा क्रेडिट स्कोर'],
        en: ['All farmers eligible', 'Owner of agricultural land', 'Good credit score']
      },
      documents: {
        hi: ['आधार कार्ड', 'पैन कार्ड', 'भूमि दस्तावेज', 'आय प्रमाण', 'फोटो'],
        en: ['Aadhaar Card', 'PAN Card', 'Land documents', 'Income proof', 'Photograph']
      },
      applicationSteps: {
        hi: [
          'नजदीकी बैंक शाखा में जाएं',
          'KCC आवेदन फॉर्म भरें',
          'दस्तावेज जमा करें',
          'भूमि वेरिफिकेशन कराएं',
          'बैंक की अप्रूवल प्रक्रिया',
          'कार्ड प्राप्त करें'
        ],
        en: [
          'Visit nearest bank branch',
          'Fill KCC application form',
          'Submit documents',
          'Land verification',
          'Bank approval process',
          'Receive card'
        ]
      },
      officialLink: 'https://www.nabard.org',
      helpline: '1800-180-1551'
    },
    {
      id: 5,
      name: { hi: 'ऑर्गेनिक खेती प्रोत्साहन योजना', en: 'Organic Farming Promotion Scheme' },
      description: { 
        hi: 'जैविक खेती अपनाने के लिए वित्तीय सहायता और प्रशिक्षण',
        en: 'Financial assistance and training for adopting organic farming'
      },
      category: 'training',
      amount: '₹25,000/हेक्टेयर',
      deadline: { hi: '30 अप्रैल 2024', en: '30th April 2024' },
      status: 'active',
      eligibility: {
        hi: ['कम से कम 1 हेक्टेयर भूमि', '3 साल की प्रतिबद्धता', 'प्रशिक्षण में भाग लेना'],
        en: ['Minimum 1 hectare land', '3 years commitment', 'Participate in training']
      },
      documents: {
        hi: ['आधार कार्ड', 'भूमि रिकॉर्ड', 'मिट्टी परीक्षण रिपोर्ट', 'बैंक विवरण'],
        en: ['Aadhaar Card', 'Land records', 'Soil test report', 'Bank details']
      },
      applicationSteps: {
        hi: [
          'कृषि विभाग में संपर्क करें',
          'जैविक खेती का प्रशिक्षण लें',
          'आवेदन फॉर्म भरें',
          'भूमि का सर्वेक्षण कराएं',
          'ऑर्गेनिक प्लान तैयार करें',
          'अनुदान प्राप्त करें'
        ],
        en: [
          'Contact Agriculture Department',
          'Take organic farming training',
          'Fill application form',
          'Land survey',
          'Prepare organic plan',
          'Receive subsidy'
        ]
      },
      officialLink: 'https://pgsindia-ncof.gov.in',
      helpline: '011-23382012'
    }
  ];

  const categories = [
    { key: 'all', label: { hi: 'सभी योजनाएं', en: 'All Schemes' } },
    { key: 'financial', label: { hi: 'वित्तीय सह���यता', en: 'Financial Aid' } },
    { key: 'subsidies', label: { hi: 'सब्सिडी', en: 'Subsidies' } },
    { key: 'insurance', label: { hi: 'बीमा योजनाएं', en: 'Insurance' } },
    { key: 'training', label: { hi: 'प्रशिक्षण', en: 'Training' } }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      scheme.name[language as keyof typeof scheme.name].toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description[language as keyof typeof scheme.description].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'ending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial': return DollarSign;
      case 'subsidies': return Gift;
      case 'insurance': return FileText;
      case 'training': return Users;
      default: return Gift;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
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

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content[language as keyof typeof content].search}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={selectedCategory === category.key ? "bg-farm-500 hover:bg-farm-600" : ""}
                >
                  {category.label[language as keyof typeof category.label]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{schemes.length}</p>
              <p className="text-sm opacity-90">{language === 'hi' ? 'कुल योजनाएं' : 'Total Schemes'}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{schemes.filter(s => s.status === 'active').length}</p>
              <p className="text-sm opacity-90">{language === 'hi' ? 'सक्रिय योजनाएं' : 'Active Schemes'}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">50L+</p>
              <p className="text-sm opacity-90">{language === 'hi' ? 'लाभार्थी' : 'Beneficiaries'}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">24x7</p>
              <p className="text-sm opacity-90">{language === 'hi' ? 'सहायता' : 'Support'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSchemes.map((scheme) => {
            const CategoryIcon = getCategoryIcon(scheme.category);
            return (
              <Card key={scheme.id} className="border-farm-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="bg-farm-100 p-3 rounded-lg mr-4">
                        <CategoryIcon className="h-6 w-6 text-farm-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-farm-700 mb-2">
                          {scheme.name[language as keyof typeof scheme.name]}
                        </CardTitle>
                        <Badge className={getStatusColor(scheme.status)}>
                          {scheme.status === 'active' ? (language === 'hi' ? 'सक्रिय' : 'Active') : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-farm-600 mt-3">
                    {scheme.description[language as keyof typeof scheme.description]}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-700">
                        {content[language as keyof typeof content].amount}
                      </p>
                      <p className="text-lg font-bold text-green-800">{scheme.amount}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-700">
                        {content[language as keyof typeof content].deadline}
                      </p>
                      <p className="text-sm font-bold text-blue-800">
                        {scheme.deadline[language as keyof typeof scheme.deadline]}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-farm-700 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {content[language as keyof typeof content].eligibility}
                    </h4>
                    <ul className="space-y-1">
                      {scheme.eligibility[language as keyof typeof scheme.eligibility].slice(0, 2).map((item, index) => (
                        <li key={index} className="text-sm text-farm-600 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-farm-700 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {content[language as keyof typeof content].documents}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {scheme.documents[language as keyof typeof scheme.documents].slice(0, 3).map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                      {scheme.documents[language as keyof typeof scheme.documents].length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{scheme.documents[language as keyof typeof scheme.documents].length - 3} {language === 'hi' ? 'अधिक' : 'more'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-farm-500 hover:bg-farm-600 text-white"
                      onClick={() => window.open(scheme.officialLink, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {content[language as keyof typeof content].apply}
                    </Button>
                    <Button variant="outline" className="border-farm-300 text-farm-700">
                      <Download className="h-4 w-4 mr-2" />
                      {content[language as keyof typeof content].downloadForm}
                    </Button>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 p-3 bg-farm-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-farm-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {language === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'} {scheme.helpline}
                      </div>
                      <div className="flex items-center text-farm-600">
                        <Globe className="h-4 w-4 mr-2" />
                        <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer" 
                           className="hover:text-farm-800 underline">
                          {language === 'hi' ? 'आधिकारिक साइट' : 'Official Site'}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-12">
          <Alert className="border-blue-200 bg-blue-50">
            <FileText className="h-5 w-5 text-blue-600" />
            <AlertDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-blue-800 mb-2">
                    📋 {language === 'hi' ? 'आवेदन में सहायता चाहिए?' : 'Need help with application?'}
                  </p>
                  <p className="text-blue-700">
                    {language === 'hi' 
                      ? 'हमारे विशेषज्ञ आपकी आवेदन प्रक्र���या में मदद करेंगे। निःशुल्क सहायता के लिए कॉल करें।'
                      : 'Our experts will help you with the application process. Call for free assistance.'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    📞 1800-180-1551
                  </Button>
                  <p className="text-xs text-blue-600 mt-1">
                    {language === 'hi' ? '24x7 उपलब्ध' : '24x7 Available'}
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* No Results Message */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes found'}
            </h3>
            <p className="text-gray-500">
              {language === 'hi' 
                ? 'कृपया अपना खोज शब्द या फिल्टर बदलें'
                : 'Please try changing your search terms or filters'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
