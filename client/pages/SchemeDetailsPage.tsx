import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Calendar, IndianRupee, CheckCircle, AlertCircle, Phone, MapPin, Download, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface SchemeDocument {
  name: string;
  nameHindi: string;
  type: 'required' | 'optional';
  description: string;
  descriptionHindi: string;
}

interface SchemeStep {
  step: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  timeline: string;
  timelineHindi: string;
}

interface SchemeDetails {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  category: string;
  categoryHindi: string;
  status: 'active' | 'coming-soon' | 'closed';
  launchDate: string;
  endDate?: string;
  budget: string;
  beneficiaries: string;
  beneficiariesHindi: string;
  eligibility: string[];
  eligibilityHindi: string[];
  benefits: string[];
  benefitsHindi: string[];
  documents: SchemeDocument[];
  applicationSteps: SchemeStep[];
  contacts: {
    helpline: string;
    email: string;
    website: string;
    offices: {
      name: string;
      nameHindi: string;
      address: string;
      addressHindi: string;
      phone: string;
    }[];
  };
  faq: {
    question: string;
    questionHindi: string;
    answer: string;
    answerHindi: string;
  }[];
}

const schemeDatabase: Record<string, SchemeDetails> = {
  '1': {
    id: '1',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    description: 'Direct income support of ₹6000 per year to farmer families across the country',
    descriptionHindi: 'देश भर के किसान परिवारों को प्रति वर्ष ₹6000 की प्रत्यक्ष आय सहायता',
    category: 'Financial Support',
    categoryHindi: 'वित्तीय सहायता',
    status: 'active',
    launchDate: '2019-02-24',
    budget: '₹75,000 Crores',
    beneficiaries: '11+ Crore Farmers',
    beneficiariesHindi: '11+ करोड़ किसान',
    eligibility: [
      'Small and marginal farmer families',
      'Cultivable land holding up to 2 hectares',
      'Valid Aadhaar card',
      'Bank account linked with Aadhaar'
    ],
    eligibilityHindi: [
      'छोटे और सीमांत किसान परिवार',
      '2 हेक्टेयर तक कृषि भूमि',
      'वैध आधार कार्ड',
      'आधार से जुड़ा बैंक खाता'
    ],
    benefits: [
      '₹6000 per year in 3 installments',
      '₹2000 every 4 months',
      'Direct bank transfer',
      'No intermediary involved'
    ],
    benefitsHindi: [
      'प्रति वर्ष ₹6000 तीन किस्तों में',
      'हर 4 महीने में ₹2000',
      'सीधे बैंक में ट्रांसफर',
      'कोई बिचौलिया नहीं'
    ],
    documents: [
      {
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        type: 'required',
        description: 'Valid Aadhaar card of the farmer',
        descriptionHindi: 'किसान का वैध आधार कार्ड'
      },
      {
        name: 'Bank Account Details',
        nameHindi: 'बैंक खाता विवरण',
        type: 'required',
        description: 'Bank account number and IFSC code',
        descriptionHindi: 'बैंक खाता संख्या और IFSC कोड'
      },
      {
        name: 'Land Documents',
        nameHindi: 'भूमि दस्तावेज',
        type: 'required',
        description: 'Land ownership documents or lease agreement',
        descriptionHindi: 'भूमि स्वामित्व दस्तावेज या पट्टा समझौता'
      },
      {
        name: 'Income Certificate',
        nameHindi: 'आय प्रमाणपत्र',
        type: 'optional',
        description: 'Income certificate for verification',
        descriptionHindi: 'सत्यापन के लिए आय प्रमाणपत्र'
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Registration',
        titleHindi: 'पंजीकरण',
        description: 'Visit PM-KISAN portal and register with Aadhaar',
        descriptionHindi: 'पीएम-किसान पोर्टल पर जाएं और आधार से पंजीकरण करें',
        timeline: '1-2 days',
        timelineHindi: '1-2 दिन'
      },
      {
        step: 2,
        title: 'Document Upload',
        titleHindi: 'दस्तावेज अपलोड',
        description: 'Upload required documents and bank details',
        descriptionHindi: 'आवश्यक दस्तावेज और बैंक विवरण अपलोड करें',
        timeline: '1 day',
        timelineHindi: '1 दिन'
      },
      {
        step: 3,
        title: 'Verification',
        titleHindi: 'सत्यापन',
        description: 'Documents verification by local authorities',
        descriptionHindi: 'स्थानीय अ���िकारियों द्वारा दस्तावेज सत्यापन',
        timeline: '7-15 days',
        timelineHindi: '7-15 दिन'
      },
      {
        step: 4,
        title: 'Approval',
        titleHindi: 'अनुमोदन',
        description: 'Application approval and beneficiary enrollment',
        descriptionHindi: 'आवेदन अनुमोदन और लाभार्थी नामांकन',
        timeline: '3-7 days',
        timelineHindi: '3-7 दिन'
      },
      {
        step: 5,
        title: 'Payment',
        titleHindi: 'भुगतान',
        description: 'First installment credit to bank account',
        descriptionHindi: 'बैंक खाते में पहली किस्त क्रेडिट',
        timeline: '30-45 days',
        timelineHindi: '30-45 दिन'
      }
    ],
    contacts: {
      helpline: '155261',
      email: 'pmkisan-ict@gov.in',
      website: 'https://pmkisan.gov.in',
      offices: [
        {
          name: 'PM-KISAN Help Desk',
          nameHindi: 'पीएम-किसान हेल्प डेस्क',
          address: 'Ministry of Agriculture, Krishi Bhawan, New Delhi - 110001',
          addressHindi: 'कृषि मंत्राल���, कृषि भवन, नई दिल्ली - 110001',
          phone: '011-23381092'
        }
      ]
    },
    faq: [
      {
        question: 'Who is eligible for PM-KISAN?',
        questionHindi: 'पीएम-किसान के लिए कौन पात्र है?',
        answer: 'All landholding farmer families with cultivable land up to 2 hectares are eligible.',
        answerHindi: '2 हेक्टेयर तक कृषि योग्य भूमि वाले सभी भूमिधारी किसान परिवार पात्र हैं।'
      },
      {
        question: 'How much benefit is provided?',
        questionHindi: 'कितना लाभ मिलता है?',
        answer: '₹6000 per year is provided in three equal installments of ₹2000 each.',
        answerHindi: 'प्रति वर्ष ₹6000 तीन समान किस्तों में ₹2000 प्रत्येक दिया जाता है।'
      },
      {
        question: 'How to check application status?',
        questionHindi: 'आवेदन की स्थिति कैसे जांचें?',
        answer: 'Visit pmkisan.gov.in and use "Beneficiary Status" option with Aadhaar or mobile number.',
        answerHindi: 'pmkisan.gov.in पर जाएं और आधार या मोबाइल नंबर के साथ "लाभार्थी स्थिति" विकल्प का उपयोग करें।'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Soil Health Card Scheme',
    nameHindi: 'मृदा स्वास्थ्य कार्ड योजना',
    description: 'Comprehensive scheme to promote soil testing and provide soil health cards to farmers',
    descriptionHindi: 'मिट्टी परीक्षण को बढ़ावा देने और किसानों को मृदा स्वास्थ्य कार्ड प्रदान करने की व्यापक योजना',
    category: 'Soil Health',
    categoryHindi: 'मृदा स्वास्थ्य',
    status: 'active',
    launchDate: '2015-02-19',
    budget: '₹568.54 Crores',
    beneficiaries: '22+ Crore Farmers',
    beneficiariesHindi: '22+ करोड़ किसान',
    eligibility: [
      'All farmers with cultivable land',
      'No land size restriction',
      'Valid land documents required',
      'One card per 2.5 acres'
    ],
    eligibilityHindi: [
      'कृषि योग्य भूमि वाले सभ�� किसान',
      'भूमि के आकार की कोई बाध्यता नहीं',
      'वैध भूमि दस्तावेज आवश्यक',
      'प्रति 2.5 एकड़ एक कार्ड'
    ],
    benefits: [
      'Free soil testing every 3 years',
      'Detailed soil health report',
      'Fertilizer recommendations',
      'Crop-specific nutrient advice',
      'Organic farming guidance'
    ],
    benefitsHindi: [
      'हर 3 साल में मुफ्त मिट्टी परीक्षण',
      'विस्तृत मिट्टी स्वास्थ्य रिपोर्ट',
      'उर्वरक सिफारिशें',
      'फसल-विशिष्ट पोषक तत्व सलाह',
      'जैविक खेती मार्गदर्शन'
    ],
    documents: [
      {
        name: 'Land Documents',
        nameHindi: 'भूमि दस्तावेज',
        type: 'required',
        description: 'Land ownership or lease documents',
        descriptionHindi: 'भूमि स्वामित्व या पट्टा दस्तावेज'
      },
      {
        name: 'Aadhaar Card',
        nameHindi: 'आधार कार्ड',
        type: 'required',
        description: 'Valid Aadhaar card of the farmer',
        descriptionHindi: 'किसान का वैध आधार कार्ड'
      },
      {
        name: 'Mobile Number',
        nameHindi: 'मोबाइल नंबर',
        type: 'required',
        description: 'Active mobile number for SMS updates',
        descriptionHindi: 'SMS अपडेट के लिए सक्रिय मोबाइल नंबर'
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Contact Local Center',
        titleHindi: 'स्थानीय केंद्र से संपर्क',
        description: 'Visit nearest soil testing center or agriculture office',
        descriptionHindi: 'निकटतम मिट्टी परीक्षण केंद्र या कृषि कार्यालय में जाएं',
        timeline: '1 day',
        timelineHindi: '1 दिन'
      },
      {
        step: 2,
        title: 'Soil Sample Collection',
        titleHindi: 'मिट्टी नमूना संग्रह',
        description: 'Collect soil samples from different parts of field',
        descriptionHindi: 'खेत के विभिन्न हिस्सों से मिट्टी के नमूने एकत्र करें',
        timeline: '1 day',
        timelineHindi: '1 दिन'
      },
      {
        step: 3,
        title: 'Lab Testing',
        titleHindi: 'लैब परीक्षण',
        description: 'Soil samples tested in certified laboratories',
        descriptionHindi: 'प्रमाणित प्रयोगशालाओं में मिट्टी के नमूनों का परीक्षण',
        timeline: '15-30 days',
        timelineHindi: '15-30 दिन'
      },
      {
        step: 4,
        title: 'Card Generation',
        titleHindi: 'कार्ड निर्माण',
        description: 'Soil health card generated with recommendations',
        descriptionHindi: 'सिफारिशों के साथ मृदा स्वास्थ्य कार्ड तैयार',
        timeline: '7-15 days',
        timelineHindi: '7-15 दिन'
      },
      {
        step: 5,
        title: 'Card Distribution',
        titleHindi: 'कार्ड वितरण',
        description: 'Soil health card delivered to farmer',
        descriptionHindi: 'किसान को मृदा स्वास्थ्य कार्ड प्रदान',
        timeline: '3-7 days',
        timelineHindi: '3-7 दिन'
      }
    ],
    contacts: {
      helpline: '1800-180-1551',
      email: 'shc-dof@nic.in',
      website: 'https://soilhealth.dac.gov.in',
      offices: [
        {
          name: 'Department of Agriculture & Cooperation',
          nameHindi: 'कृषि एवं सहकारिता विभाग',
          address: 'Krishi Bhawan, New Delhi - 110001',
          addressHindi: 'कृषि भवन, नई दिल्ली - 110001',
          phone: '011-23070271'
        }
      ]
    },
    faq: [
      {
        question: 'How often should I get soil tested?',
        questionHindi: 'मुझे कितनी बार मिट्टी की जांच करानी चाहिए?',
        answer: 'Soil testing should be done every 3 years or before major cropping seasons.',
        answerHindi: 'मिट्टी परीक्षण हर 3 साल में या प्रमुख फसल सीजन से पहले करना चाहिए।'
      },
      {
        question: 'Is soil testing free of cost?',
        questionHindi: 'क्या मिट्टी परीक्षण मुफ्त है?',
        answer: 'Yes, soil testing under this scheme is completely free for all farmers.',
        answerHindi: 'हां, इस योजना के तहत मिट्टी परीक्षण सभी किसानों के लिए पूर्णतः मुफ्त है।'
      }
    ]
  }
};

const SchemeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [scheme, setScheme] = useState<SchemeDetails | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id && schemeDatabase[id]) {
      setScheme(schemeDatabase[id]);
    }
  }, [id]);

  if (!scheme) {
    return (
      <Layout>
        <div className="min-h-screen bg-kisan-bg py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold text-kisan-text-primary mb-2">
                  {language === 'hi' ? 'योजना नहीं मिली' : 'Scheme Not Found'}
                </h2>
                <p className="text-kisan-text-secondary mb-4">
                  {language === 'hi' 
                    ? 'अनुरोधित योजना उपलब्ध नहीं है।'
                    : 'The requested scheme is not available.'
                  }
                </p>
                <Link to="/schemes">
                  <Button variant="outline">
                    {language === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">{language === 'hi' ? 'सक्रिय' : 'Active'}</Badge>;
      case 'coming-soon':
        return <Badge className="bg-blue-100 text-blue-800">{language === 'hi' ? 'आने वाला' : 'Coming Soon'}</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-800">{language === 'hi' ? 'बंद' : 'Closed'}</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/schemes" className="text-kisan-primary hover:underline">
                {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
              </Link>
              <span className="text-kisan-text-secondary">›</span>
              <span className="text-kisan-text-secondary">
                {language === 'hi' ? scheme.nameHindi : scheme.name}
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-kisan-text-primary mb-2">
                  {language === 'hi' ? scheme.nameHindi : scheme.name}
                </h1>
                <p className="text-lg text-kisan-text-secondary">
                  {language === 'hi' ? scheme.descriptionHindi : scheme.description}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {getStatusBadge(scheme.status)}
                <Badge variant="outline">
                  {language === 'hi' ? scheme.categoryHindi : scheme.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <IndianRupee className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-kisan-text-secondary">
                  {language === 'hi' ? 'बजट' : 'Budget'}
                </p>
                <p className="font-semibold text-kisan-text-primary">{scheme.budget}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-kisan-text-secondary">
                  {language === 'hi' ? 'लाभार्थी' : 'Beneficiaries'}
                </p>
                <p className="font-semibold text-kisan-text-primary">
                  {language === 'hi' ? scheme.beneficiariesHindi : scheme.beneficiaries}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-kisan-text-secondary">
                  {language === 'hi' ? 'शुरुआत' : 'Launch Date'}
                </p>
                <p className="font-semibold text-kisan-text-primary">
                  {new Date(scheme.launchDate).toLocaleDateString('hi-IN')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-kisan-text-secondary">
                  {language === 'hi' ? 'स्थिति' : 'Status'}
                </p>
                <p className="font-semibold text-kisan-text-primary">
                  {language === 'hi' ? 'सक्रिय' : 'Active'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">
                {language === 'hi' ? 'अवलोकन' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger value="eligibility">
                {language === 'hi' ? 'पात्रता' : 'Eligibility'}
              </TabsTrigger>
              <TabsTrigger value="application">
                {language === 'hi' ? 'आवेदन' : 'Application'}
              </TabsTrigger>
              <TabsTrigger value="documents">
                {language === 'hi' ? 'दस्तावेज' : 'Documents'}
              </TabsTrigger>
              <TabsTrigger value="contact">
                {language === 'hi' ? 'संपर्क' : 'Contact'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      {language === 'hi' ? 'योजना के लाभ' : 'Scheme Benefits'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(language === 'hi' ? scheme.benefitsHindi : scheme.benefits).map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-kisan-text-secondary">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Users className="h-5 w-5" />
                      {language === 'hi' ? 'मुख्य विशेषताएं' : 'Key Features'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-kisan-text-primary mb-1">
                          {language === 'hi' ? 'श्रेणी:' : 'Category:'}
                        </h4>
                        <p className="text-sm text-kisan-text-secondary">
                          {language === 'hi' ? scheme.categoryHindi : scheme.category}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-kisan-text-primary mb-1">
                          {language === 'hi' ? 'बजट:' : 'Budget:'}
                        </h4>
                        <p className="text-sm text-kisan-text-secondary">{scheme.budget}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-kisan-text-primary mb-1">
                          {language === 'hi' ? 'लक्षित लाभार्थी:' : 'Target Beneficiaries:'}
                        </h4>
                        <p className="text-sm text-kisan-text-secondary">
                          {language === 'hi' ? scheme.beneficiariesHindi : scheme.beneficiaries}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="eligibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-kisan-primary">
                    <Users className="h-5 w-5" />
                    {language === 'hi' ? 'पात्रता मापदंड' : 'Eligibility Criteria'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(language === 'hi' ? scheme.eligibilityHindi : scheme.eligibility).map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-kisan-text-secondary">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="application" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-kisan-primary">
                    <FileText className="h-5 w-5" />
                    {language === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {scheme.applicationSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-kisan-primary text-white rounded-full flex items-center justify-center font-semibold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-kisan-text-primary mb-1">
                            {language === 'hi' ? step.titleHindi : step.title}
                          </h3>
                          <p className="text-kisan-text-secondary text-sm mb-2">
                            {language === 'hi' ? step.descriptionHindi : step.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {language === 'hi' ? step.timelineHindi : step.timeline}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Button className="bg-kisan-primary hover:bg-kisan-primary/90" size="lg">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === 'hi' ? 'ऑनलाइन आवेदन करें' : 'Apply Online'}
                    </Button>
                    <p className="text-sm text-kisan-text-secondary mt-2">
                      {language === 'hi' 
                        ? 'आधिकारिक वेबसाइट पर जाएं'
                        : 'Visit official website'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-kisan-primary">
                    <FileText className="h-5 w-5" />
                    {language === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {scheme.documents.map((doc, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        doc.type === 'required' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-kisan-text-primary mb-1">
                              {language === 'hi' ? doc.nameHindi : doc.name}
                            </h4>
                            <p className="text-sm text-kisan-text-secondary">
                              {language === 'hi' ? doc.descriptionHindi : doc.description}
                            </p>
                          </div>
                          <Badge 
                            variant={doc.type === 'required' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {language === 'hi' 
                              ? (doc.type === 'required' ? 'आवश्यक' : 'वैकल्पिक')
                              : (doc.type === 'required' ? 'Required' : 'Optional')
                            }
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kisan-primary">
                      <Phone className="h-5 w-5" />
                      {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-kisan-text-primary mb-2">
                        {language === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'}
                      </h4>
                      <p className="text-lg font-bold text-green-600">{scheme.contacts.helpline}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-kisan-text-primary mb-2">
                        {language === 'hi' ? 'ईमेल:' : 'Email:'}
                      </h4>
                      <p className="text-kisan-text-secondary">{scheme.contacts.email}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-kisan-text-primary mb-2">
                        {language === 'hi' ? 'वेबसाइट:' : 'Website:'}
                      </h4>
                      <a 
                        href={scheme.contacts.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-kisan-primary hover:underline"
                      >
                        {scheme.contacts.website}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kisan-primary">
                      <MapPin className="h-5 w-5" />
                      {language === 'hi' ? 'कार्यालय पता' : 'Office Address'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {scheme.contacts.offices.map((office, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-semibold text-kisan-text-primary">
                          {language === 'hi' ? office.nameHindi : office.name}
                        </h4>
                        <p className="text-sm text-kisan-text-secondary">
                          {language === 'hi' ? office.addressHindi : office.address}
                        </p>
                        <p className="text-sm font-medium text-kisan-text-primary">
                          {language === 'hi' ? 'फोन:' : 'Phone:'} {office.phone}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-kisan-primary">
                    <FileText className="h-5 w-5" />
                    {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheme.faq.map((item, index) => (
                      <div key={index} className="border-l-4 border-kisan-primary pl-4">
                        <h4 className="font-semibold text-kisan-text-primary mb-2">
                          {language === 'hi' ? item.questionHindi : item.question}
                        </h4>
                        <p className="text-kisan-text-secondary">
                          {language === 'hi' ? item.answerHindi : item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SchemeDetailsPage;
