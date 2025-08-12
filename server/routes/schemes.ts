import express from 'express';

const router = express.Router();

interface GovernmentScheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  ministry: string;
  ministryHindi: string;
  category: string;
  categoryHindi: string;
  benefits: string[];
  benefitsHindi: string[];
  eligibility: string[];
  eligibilityHindi: string[];
  documents: string[];
  documentsHindi: string[];
  applicationProcess: string[];
  applicationProcessHindi: string[];
  amount: number;
  currency: string;
  deadline: string;
  status: 'active' | 'upcoming' | 'expired';
  beneficiaries: number;
  applicationLink: string;
  helplineNumber: string;
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
  featured: boolean;
  tags: string[];
  states: string[];
}

// Mock government schemes data (in real app, this would come from government APIs)
const governmentSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
    description: 'A Central Sector Scheme providing income support to farmers families across the country to supplement their financial needs for procuring various inputs to ensure proper crop health and appropriate yields.',
    descriptionHindi: 'देश भर के किसान परिवारों को उचित फसल स्वास्थ्य और उपयुक्त उत्पादन सुनिश्चित करने के लिए विभिन्न आदानों की खरीद के लिए उनकी वित्तीय आवश्यकताओं को पूरा करने हेतु आय सहायता प्रदान करने वाली एक केंद्रीय क्षेत्र योजना।',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'subsidy',
    categoryHindi: 'सब्सिडी',
    benefits: [
      'Financial assistance of ₹6000 per year in three equal installments',
      'Direct benefit transfer to farmers bank accounts',
      'Coverage of all landholding farmers families',
      'No limit on family size, age or gender'
    ],
    benefitsHindi: [
      'तीन समान किश्तों में प्रति वर्ष ₹6000 की वित्तीय सहायता',
      'किसानों के बैंक खातों में प्रत्यक्ष लाभ हस्तांतरण',
      'सभी भूमिधारी किसान परिवारों का कवरेज',
      'पारिवारिक आकार, आयु या लिंग की कोई सीमा नहीं'
    ],
    eligibility: [
      'Small and marginal farmers with cultivable landholding',
      'Farmers families owning cultivable land',
      'Land records in farmers name',
      'Valid Aadhaar number is mandatory'
    ],
    eligibilityHindi: [
      'खेती योग्य भूमि वाले छोटे और सीमांत किसान',
      'खेती योग्य भूमि के मालिक किसान परिवार',
      'किस���न के नाम पर भूमि रिकॉर्ड',
      'वैध आधार संख्या अनिवार्य'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details (Account Number, IFSC)',
      'Land ownership documents',
      'Mobile number linked to Aadhaar'
    ],
    documentsHindi: [
      'आधार कार्ड',
      'बैंक खाता विवरण (खाता संख्या, IFSC)',
      'भूमि स्वामित्व दस्तावेज',
      'आधार से जुड़ा मोबाइल नंबर'
    ],
    applicationProcess: [
      'Visit official PM-KISAN website',
      'Click on Farmers Corner and select New Farmer Registration',
      'Fill the registration form with required details',
      'Upload necessary documents',
      'Submit application and note down registration number'
    ],
    applicationProcessHindi: [
      'आधिकारिक PM-KISAN वेबसाइट पर जाएं',
      'किसान कॉर्नर पर क्लिक करें और नया किसान पंजीकरण चुनें',
      'आवश्यक विवरण के साथ पंजीकरण फॉर्म भरें',
      'आवश्यक दस्तावेज अपलोड करें',
      'आवेदन जमा करें और पंजीकरण संख्या नोट करें'
    ],
    amount: 6000,
    currency: 'INR',
    deadline: '2024-12-31',
    status: 'active',
    beneficiaries: 12000000,
    applicationLink: 'https://pmkisan.gov.in/',
    helplineNumber: '011-24300606',
    lastUpdated: '2024-01-15',
    priority: 'high',
    featured: true,
    tags: ['income support', 'direct transfer', 'farmer welfare', 'central scheme'],
    states: ['All India']
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
    description: 'Crop insurance scheme that provides insurance coverage and financial support to farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.',
    descriptionHindi: 'फसल बीमा योजना जो प्राकृतिक आपदाओं, कीटों और बीमारियों के परिणामस्वरूप अधिसूचित फसलों में से किसी भी फसल की विफलता की स्थिति में क���सानों को बीमा कवरेज और वित्तीय सहायता प्रदान करती है।',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'insurance',
    categoryHindi: 'बीमा',
    benefits: [
      'Low premium rates - 2% for Kharif, 1.5% for Rabi crops',
      'Coverage for entire crop cycle from pre-sowing to post-harvest',
      'Use of technology for quick assessment and settlement',
      'Voluntary for non-loanee farmers'
    ],
    benefitsHindi: [
      'कम प्रीमियम दरें - खरीफ के लिए 2%, रबी फसलों के लिए 1.5%',
      'बुआई पूर्व से कटाई के बाद तक पूरे फसल चक्र का कवरेज',
      'त्वरित मूल्यांकन और निपटान के लिए तकनीक का उपयोग',
      'गैर-ऋणी किसानों के लिए स्वैच्छिक'
    ],
    eligibility: [
      'All farmers growing notified crops in notified areas',
      'Both loanee and non-loanee farmers',
      'Sharecroppers and tenant farmers',
      'Farmers should have insurable interest in the crop'
    ],
    eligibilityHindi: [
      'अधिसूचित क्षेत्रों में अधिसूचित फसल उगाने वाले सभी किसान',
      'ऋणी और गैर-ऋणी दोनों किसान',
      'बटाईदार और किरायेदार किसान',
      'किसानों का फसल में बीमा योग्य हित होना चाहिए'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Land records (Khata/Khatauni/Khasra)',
      'Sowing certificate (for sharecroppers)',
      'Identity proof and address proof'
    ],
    documentsHindi: [
      'आधार कार्ड',
      'बैंक खाता विवरण',
      'भूमि रिकॉर्ड (खाता/खतौनी/खसरा)',
      'बुआई प्रमाणपत्र (बटाईदारों के लिए)',
      'पहचान प्रमाण और पता प्रमाण'
    ],
    applicationProcess: [
      'Contact nearest bank branch or Common Service Centre',
      'Fill crop insurance application form',
      'Submit required documents and premium amount',
      'Receive policy document and premium receipt',
      'Keep premium receipt safe for claim purposes'
    ],
    applicationProcessHindi: [
      'निकटतम बैंक शाखा या कॉमन सर्विस सेंटर से संपर्क करें',
      'फसल बीमा आवेदन फॉर्म भरें',
      'आवश्यक दस्तावेज और प्रीमियम राशि जमा करें',
      'पॉलिसी दस्तावेज और प्रीमियम रसीद प्राप्त करें',
      'दावा प्रयोजनों के लिए प्रीमियम रसीद को सुरक्षित रखें'
    ],
    amount: 200000,
    currency: 'INR',
    deadline: '2024-03-31',
    status: 'active',
    beneficiaries: 5500000,
    applicationLink: 'https://pmfby.gov.in/',
    helplineNumber: '14447',
    lastUpdated: '2024-01-10',
    priority: 'high',
    featured: true,
    tags: ['crop insurance', 'risk management', 'premium subsidy', 'natural calamities'],
    states: ['All India']
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Card Scheme',
    nameHindi: 'मृदा स्वास्थ्य ��ार्ड योजना',
    description: 'Promotes soil testing and provides soil health cards to farmers with recommendations on nutrients and fertilizers required for individual farms.',
    descriptionHindi: 'मिट्टी परीक्षण को बढ़ावा देती है और व्यक्तिगत खेतों के लिए आवश्यक पोषक तत्वों और उर्वरकों की सिफारिशों के साथ किसानों को मृदा स्वास्थ्य कार्ड प्रदान करती है।',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'training',
    categoryHindi: 'प्रशिक्षण',
    benefits: [
      'Free soil testing for farmers',
      'Customized fertilizer recommendations',
      'Reduction in fertilizer costs',
      'Improved soil health and crop yield'
    ],
    benefitsHindi: [
      'किसानों के लिए मुफ्त मिट्टी परीक्षण',
      'कस्टमाइज़्ड उर्वरक सिफारिशें',
      'उर्वरक लागत में कमी',
      'बेहतर मिट्टी स्वास्थ्य और फसल उत्पादन'
    ],
    eligibility: [
      'All farmers irrespective of size of landholding',
      'Priority to small and marginal farmers',
      'One card per 2.5 hectare of land',
      'Valid for 3 years from date of issue'
    ],
    eligibilityHindi: [
      'भूमि जोत के आकार की परवाह किए बिना सभी किसान',
      'छोटे और सीमांत किसानों को प्राथमिकता',
      '2.5 हेक्टेयर भूमि के लिए एक कार्ड',
      'जारी करने की तारीख से 3 साल के लिए वैध'
    ],
    documents: [
      'Land ownership documents',
      'Aadhaar Card',
      'Bank Account Details',
      'Previous soil health card (if any)'
    ],
    documentsHindi: [
      'भूमि स्वामित्व दस्तावेज',
      'आधार कार्ड',
      'बैंक खाता विवरण',
      'पिछला मृदा स्वास्थ्य कार्ड (यदि कोई हो)'
    ],
    applicationProcess: [
      'Contact village-level worker or agriculture extension officer',
      'Provide soil sample from your field',
      'Fill application form with land details',
      'Soil sample will be tested in laboratory',
      'Receive soil health card with recommendations'
    ],
    applicationProcessHindi: [
      'ग्राम स्तरीय कार्यकर्ता या कृषि विस्तार अधिकारी से संपर्क करें',
      'अपने खेत से मिट्टी का नमूना प्रदान करें',
      'भूमि विवरण के साथ आवेदन फॉर्म भरें',
      'मिट्टी के नमूने का प्रयोगशाला में परीक्षण होगा',
      'सिफारिशों के साथ मृदा स्वास्थ्य कार्ड प्राप्त करें'
    ],
    amount: 0,
    currency: 'INR',
    deadline: '2024-12-31',
    status: 'active',
    beneficiaries: 8000000,
    applicationLink: 'https://soilhealth.dac.gov.in/',
    helplineNumber: '011-23382651',
    lastUpdated: '2024-01-08',
    priority: 'medium',
    featured: false,
    tags: ['soil testing', 'fertilizer management', 'sustainable agriculture', 'free service'],
    states: ['All India']
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card',
    nameHindi: 'किसान क्रेडिट कार्ड',
    description: 'Provides adequate and timely credit support from the banking system to farmers for their cultivation and other needs.',
    descriptionHindi: 'किसानों को उनकी खेती और अन्य आवश्यकताओं के लिए बैंकिंग प्रणाली से पर्याप्त और समय पर ऋण सहायता प्रदान करता है।',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'loan',
    categoryHindi: 'ऋण',
    benefits: [
      'Flexible credit limit based on farming area',
      'Low interest rates with government subsidy',
      'Coverage for cultivation and post-harvest expenses',
      'Insurance coverage for crop loan and farmer'
    ],
    benefitsHindi: [
      'खेती के क्षेत्र के आधार पर लचीली ऋण सीमा',
      'सरकारी सब्सिडी के साथ कम ब्याज दरें',
      'ख���ती और कटाई के बाद के खर्चों का कवरेज',
      'फसल ऋण और किसान के लिए बीमा कवरेज'
    ],
    eligibility: [
      'All farmers including tenant farmers',
      'Self Help Group members engaged in farming',
      'Valid land records or land lease documents',
      'Good credit history preferred'
    ],
    eligibilityHindi: [
      'किरायेदार किसानों सहित सभी किसान',
      'खेती में लगे स्वयं सहायता समूह के सदस्य',
      'वैध भूमि रिकॉर्ड या भूमि पट्टा दस्तावेज',
      'अच्छा क्रेडिट इतिहास वांछनीय'
    ],
    documents: [
      'Filled application form',
      'Identity and address proof',
      'Land documents (ownership/lease/cultivation rights)',
      'Income proof and bank statements',
      'Passport size photographs'
    ],
    documentsHindi: [
      'भरा हुआ आवेदन फॉर्म',
      'पहचान और पता प्रमाण',
      'भूमि दस्तावेज (स्वामित्व/पट्टा/खेती अधिकार)',
      'आय प्रमाण और बैंक स्टेटमेंट',
      'पासपोर्ट साइज फोटो'
    ],
    applicationProcess: [
      'Visit nearest bank branch with documents',
      'Fill KCC application form',
      'Submit documents for verification',
      'Bank will assess credit limit based on land holding',
      'Receive KCC after approval'
    ],
    applicationProcessHindi: [
      'दस्तावेजों के साथ निकटतम बैंक शाखा जाएं',
      'KCC आवेदन फॉर्म भरें',
      'सत्यापन के लिए दस्तावेज जमा करें',
      'बैंक भूमि जोत के आधार पर क्रेडिट सीमा का आकलन करेगा',
      'अनुमोदन के बाद KCC प्राप्त करें'
    ],
    amount: 300000,
    currency: 'INR',
    deadline: '2024-12-31',
    status: 'active',
    beneficiaries: 7000000,
    applicationLink: 'https://www.india.gov.in/spotlight/kisan-credit-card-kcc',
    helplineNumber: '1800-180-1551',
    lastUpdated: '2024-01-05',
    priority: 'high',
    featured: true,
    tags: ['credit card', 'agricultural loan', 'subsidized interest', 'working capital'],
    states: ['All India']
  },
  {
    id: 'organic-farming',
    name: 'Paramparagat Krishi Vikas Yojana',
    nameHindi: 'परम्परागत कृषि विकास योजना',
    description: 'Promotes organic farming through cluster approach and organic certification of farmers.',
    descriptionHindi: 'क्लस्टर दृष्टिकोण और किसानों के जैविक प्रमाणीकरण के माध्यम से जैविक खेती को बढ़ावा देती है।',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'organic',
    categoryHindi: 'जैविक खेती',
    benefits: [
      'Financial assistance of ₹50,000 per hectare for 3 years',
      'Organic certification support',
      'Training on organic farming practices',
      'Market linkage for organic produce'
    ],
    benefitsHindi: [
      '3 साल के लिए प्रति हेक्टेयर ₹50,000 की वित्तीय सहायता',
      'जैविक प्रमाणीकरण सहायता',
      'जैविक खेती प्रथाओं पर प्रशिक्षण',
      'जैविक उत्पादों के लिए बाजार संपर्क'
    ],
    eligibility: [
      'Farmers willing to adopt organic farming',
      'Cluster formation of minimum 50 farmers',
      'Total area of cluster should be 50 hectares',
      'Farmers should be ready for 3-year commitment'
    ],
    eligibilityHindi: [
      'जैविक खेती अपनाने के इच्छुक किसान',
      'न्यूनतम 50 किसानों का क्लस्टर गठन',
      'क्लस्टर का कुल क्षेत्रफल 50 हेक्टेयर होना चाहिए',
      'किसान 3 साल की प्रतिबद्धता के लिए तैयार होना चाहिए'
    ],
    documents: [
      'Land records',
      'Aadhaar Card',
      'Bank Account Details',
      'Group formation certificate',
      'Consent letter for organic farming'
    ],
    documentsHindi: [
      'भूमि रिकॉर्ड',
      'आधार कार्ड',
      'बैंक खाता विवरण',
      'समूह गठन प्रमाणपत्र',
      'जैविक खेती के लिए सहमति पत्र'
    ],
    applicationProcess: [
      'Form cluster of minimum 50 farmers',
      'Submit group application to agriculture department',
      'Get cluster registered and approved',
      'Participate in training programs',
      'Start organic farming with technical support'
    ],
    applicationProcessHindi: [
      'न्यूनतम 50 किसानों का क्लस्टर बनाएं',
      'कृषि विभाग में समूह आवेदन जमा करें',
      'क्लस्टर पंजीकृत और अनुमोदित कराएं',
      'प्रशिक्षण कार्यक्रमों में भाग लें',
      'तकनीकी सहायता के साथ जैविक खेती शुरू करें'
    ],
    amount: 50000,
    currency: 'INR',
    deadline: '2024-06-30',
    status: 'active',
    beneficiaries: 200000,
    applicationLink: 'https://pgsindia-ncof.gov.in/',
    helplineNumber: '011-23384618',
    lastUpdated: '2024-01-12',
    priority: 'medium',
    featured: false,
    tags: ['organic farming', 'cluster approach', 'certification', 'sustainable agriculture'],
    states: ['All India']
  }
];

// GET /api/schemes - Get all government schemes
router.get('/schemes', (req, res) => {
  try {
    // In a real application, you might want to fetch this data from:
    // - Government APIs (MyGov, data.gov.in)
    // - Database with regularly updated scheme information
    // - Third-party agricultural data providers

    // For now, return mock data with some randomization for "live" feel
    const updatedSchemes = governmentSchemes.map(scheme => ({
      ...scheme,
      beneficiaries: scheme.beneficiaries + Math.floor(Math.random() * 1000),
      lastUpdated: new Date().toISOString().split('T')[0]
    }));

    res.json(updatedSchemes);
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({
      message: 'Failed to fetch government schemes',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/schemes/:id - Get specific scheme details
router.get('/schemes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const scheme = governmentSchemes.find(s => s.id === id);
    
    if (!scheme) {
      return res.status(404).json({
        message: 'Scheme not found',
        error: 'The requested scheme does not exist'
      });
    }

    res.json(scheme);
  } catch (error) {
    console.error('Error fetching scheme details:', error);
    res.status(500).json({
      message: 'Failed to fetch scheme details',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/schemes/category/:category - Get schemes by category
router.get('/schemes/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const filteredSchemes = governmentSchemes.filter(scheme => 
      scheme.category === category
    );
    
    res.json(filteredSchemes);
  } catch (error) {
    console.error('Error fetching schemes by category:', error);
    res.status(500).json({
      message: 'Failed to fetch schemes by category',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/schemes/status/:status - Get schemes by status
router.get('/schemes/status/:status', (req, res) => {
  try {
    const { status } = req.params;
    const filteredSchemes = governmentSchemes.filter(scheme => 
      scheme.status === status
    );
    
    res.json(filteredSchemes);
  } catch (error) {
    console.error('Error fetching schemes by status:', error);
    res.status(500).json({
      message: 'Failed to fetch schemes by status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
