import express from 'express';

const router = express.Router();

interface NewsArticle {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  content: string;
  contentHindi: string;
  author: string;
  authorHindi: string;
  source: string;
  sourceHindi: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  category: string;
  categoryHindi: string;
  tags: string[];
  tagsHindi: string[];
  views: number;
  likes: number;
  location: string;
  locationHindi: string;
  featured: boolean;
  trending: boolean;
}

// Mock agriculture news data (in real app, this would come from news APIs)
const agricultureNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Government Announces ₹10,000 Crore Package for Organic Farming',
    titleHindi: 'सरकार ने जैविक खेती के लिए ₹10,000 करोड़ के पैकेज की घोषणा की',
    description: 'The comprehensive package includes subsidies for organic certification, equipment, and marketing support to boost organic farming across India.',
    descriptionHindi: 'व्यापक पैकेज में भारत भर में जैविक खेती को बढ़ावा देने के लिए जैविक प्रमाणन, उपकरण और मार्केटिंग सहायता के लिए सब्सिडी शामिल है।',
    content: 'In a landmark decision, the Ministry of Agriculture has announced a massive ₹10,000 crore package to promote organic farming across the country. The package includes subsidies for organic certification, modern equipment, training programs for farmers, and marketing support to help farmers sell their organic produce at premium prices. The initiative aims to increase organic farming area from current 2.78 million hectares to 5 million hectares by 2025. The scheme will benefit over 1 million farmers and create employment opportunities in rural areas. Special focus will be given to tribal and hill areas where chemical-free farming has traditional roots.',
    contentHindi: 'एक ऐतिहासिक निर्णय में, कृषि मंत्रालय ने देश भर में जैविक खेती को बढ़ावा देने के लिए ₹10,000 करोड़ के विशाल पैकेज की घोषणा की है। पैकेज में जैविक प्रमाणन के लिए सब्सिडी, आधुनिक उपकरण, किसानों के लिए प्रशिक्षण कार्यक्रम, और किसानों को अपने जैविक उत्पादों को प्रीमियम कीमतों पर बेचने में मदद करने के लिए मार्केटिंग सहायता शामिल है। इस पहल का उद्देश्य 2025 तक जैविक खेती क्षेत्र को वर्तमान 2.78 मिलियन हेक्टेयर से बढ़ाकर 5 मिलियन हेक्टेयर करना है। यह योजना 10 लाख से अधिक किसानों को लाभान्वित करेगी और ग्राम��ण क्षेत्रों में रोजगार के अवसर पैदा करेगी। आदिवासी और पहाड़ी क्षेत्रों पर विशेष ध्यान दिया जाएगा जहां रसायन मुक्त खेती की पारंपरिक जड़ें हैं।',
    author: 'Rajesh Sharma',
    authorHindi: 'राजेश शर्मा',
    source: 'AgriNews India',
    sourceHindi: 'एग्रीन्यूज इंडिया',
    publishedAt: '2024-01-15T08:00:00Z',
    urlToImage: '/api/placeholder/600/400',
    url: 'https://example.com/news/organic-farming-package',
    category: 'government',
    categoryHindi: 'सरकारी योजनाएं',
    tags: ['organic farming', 'government scheme', 'subsidy', 'agriculture policy'],
    tagsHindi: ['जैविक खेती', 'सरकारी योजना', 'सब्सिडी', 'कृषि नीति'],
    views: 18420,
    likes: 234,
    location: 'New Delhi',
    locationHindi: 'नई दिल्ली',
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'Record Wheat Production of 112 Million Tonnes Expected This Season',
    titleHindi: 'इस सीजन 112 मिलियन टन का रिकॉर्ड गेहूं उत्पादन अपेक्षित',
    description: 'Favorable weather conditions, increased area under cultivation, and improved seed varieties contribute to bumper wheat harvest.',
    descriptionHindi: 'अनुकूल मौसम, खेती के तहत बढ़ा हुआ क्षेत्र, और बेहतर बीज किस्मों ने रिकॉर्ड गेहूं की फसल में योगदान दिया है।',
    content: 'Agricultural experts and government agencies are predicting a record wheat production of 112 million tonnes for the current rabi season, surpassing last year\'s production of 109.59 million tonnes. The increase is attributed to favorable weather conditions during the growing season, expansion of wheat cultivation area by 2.5 lakh hectares, and adoption of high-yielding variety seeds by farmers. Major wheat-producing states including Punjab, Haryana, Uttar Pradesh, and Madhya Pradesh have reported excellent crop conditions. The bumper harvest is expected to strengthen India\'s position as the world\'s second-largest wheat producer and may lead to increased exports, benefiting farmers with better prices.',
    contentHindi: 'कृषि विशेष��्ञ और सरकारी एजेंसियां वर्तमान रबी सीजन के लिए 112 मिलियन टन के रिकॉर्ड गेहूं उत्पादन की भविष्यवाणी कर रही हैं, जो पिछले साल के 109.59 मिलियन टन के उत्पादन को पार कर जाएगा। यह वृद्धि बढ़ते मौसम के दौरान अनुकूल मौसम, 2.5 लाख हेक्टेयर से गेहूं की खेती के क्षेत्र के विस्तार, और किसानों द्वारा उच्च उत्पादन वाली किस्म के बीजों को अपनाने के कारण है। पंजाब, हरियाणा, उत्तर प्रदेश, और मध्य प्रदेश सहित प्रमुख गेहूं उत्पादक राज्यों ने उत्कृष्ट फसल की स्थिति की रिपोर्ट दी है। रिकॉर्ड फसल से दुनिया के दूसरे सबसे बड़े गेहूं उत्पादक क�� रूप में भारत की स्थिति मजबूत होने की उम्मीद है और निर्यात में वृद्धि हो सकती है, जिससे किसानों को बेहतर कीमतों का लाभ मिलेगा।',
    author: 'Priya Verma',
    authorHindi: 'प्रिया वर्मा',
    source: 'Kisan Today',
    sourceHindi: 'किसान टुडे',
    publishedAt: '2024-01-14T10:30:00Z',
    urlToImage: '/api/placeholder/600/400',
    url: 'https://example.com/news/wheat-production-record',
    category: 'agriculture',
    categoryHindi: 'कृषि',
    tags: ['wheat', 'production', 'harvest', 'rabi crops'],
    tagsHindi: ['गेहूं', 'उत्पादन', 'फसल', 'रबी फसल'],
    views: 12350,
    likes: 189,
    location: 'Punjab',
    locationHindi: 'पंजाब',
    featured: true,
    trending: false
  },
  {
    id: '3',
    title: 'Drone Technology Revolutionizes Crop Monitoring in Maharashtra',
    titleHindi: 'ड्रोन तकनीक ने महाराष्ट्र में फसल निगरानी में क्रांति ला दी',
    description: 'AI-powered drones help farmers detect crop diseases early, optimize irrigation, and increase yields by up to 20%.',
    descriptionHindi: 'AI-संचालित ड्रोन किसानों को फसल रोगों का जल्दी पता लगाने, सिंचाई का अनुकूलन करने और उत्पादन 20% तक बढ़ाने में मदद करते हैं।',
    content: 'A revolutionary drone-based crop monitoring system has been successfully implemented across 50,000 hectares in Maharashtra, showing remarkable results in early disease detection and yield optimization. The AI-powered drones, equipped with multispectral cameras and sensors, can identify crop stress, nutrient deficiencies, and pest infestations before they become visible to the naked eye. Farmers participating in the pilot program have reported an average yield increase of 18-20% and a 30% reduction in pesticide use. The technology has been particularly effective in sugarcane and cotton crops. The state government plans to expand the program to cover 2 lakh hectares by next year, making Maharashtra a pioneer in precision agriculture.',
    contentHindi: 'महाराष्ट्र में 50,000 हेक्टेयर में एक क्रांतिकारी ड्रोन-आधा��ित फसल निगरानी प्रणाली सफलतापूर्वक लागू की गई है, जो रोग का जल्दी पता लगाने और उत्पादन अनुकूलन में उल्लेखनीय परिणाम दिखा रही है। मल्टीस्पेक्ट्रल कैमरे और सेंसर से लैस AI-संचालित ड्रोन फसल तनाव, पोषक तत्वों की कमी, और कीट संक्रमण की पहचान कर सकते हैं इससे पहले कि वे नंगी आंखों से दिखाई दें। पायलट कार्यक्रम में भाग लेने वाले किसानों ने औसतन 18-20% उत्पादन वृद्धि और कीटनाशकों के उपयोग में 30% कमी की रिपोर्ट दी है। यह तकनीक गन्ना और कपास की फसलों में विशेष रूप से प्रभावी रही है। राज्य सरकार अगले साल तक कार्यक्रम को 2 लाख हेक���टेयर तक विस्तारित करने की योजना बना रही है, जिससे महाराष्ट्र सटीक कृषि में अग्रणी बनेगा।',
    author: 'Amit Kumar',
    authorHindi: 'अमित कुमार',
    source: 'AgriTech Weekly',
    sourceHindi: 'एग्रीटेक वीकली',
    publishedAt: '2024-01-13T14:20:00Z',
    urlToImage: '/api/placeholder/600/400',
    url: 'https://example.com/news/drone-technology-crops',
    category: 'technology',
    categoryHindi: 'कृषि तकनीक',
    tags: ['drone', 'AI', 'crop monitoring', 'precision agriculture'],
    tagsHindi: ['ड्रोन', 'एआई', 'फसल निगरानी', 'सटीक कृषि'],
    views: 15680,
    likes: 298,
    location: 'Mumbai',
    locationHindi: 'मुंबई',
    featured: false,
    trending: true
  },
  {
    id: '4',
    title: 'Mandi Prices Surge for Onions as Export Demand Increases',
    titleHindi: 'निर्यात मांग बढ़ने से प्याज की मंडी कीमतें बढ़ीं',
    description: 'Onion prices in major mandis have increased by 40% in the past month due to strong export demand from neighboring countries.',
    descriptionHindi: 'पड़ोसी देशों से मजबूत निर्यात मांग के कारण प्रमुख मंडियों में प्याज की कीमतें पिछले महीने में 40% बढ़ गई हैं।',
    content: 'Onion prices across major agricultural markets have witnessed a sharp surge of 35-40% over the past month, with wholesale rates touching ₹40-45 per kg in key producing regions. The price rise is primarily driven by increased export demand from Bangladesh, Sri Lanka, and Middle Eastern countries, coupled with reduced production in some states due to unseasonal rains. Maharashtra, Karnataka, and Gujarat, the major onion-producing states, are experiencing heavy demand from exporters. Market analysts predict that prices may remain elevated for the next 2-3 months until fresh arrivals from the late kharif crop stabilize the market. Farmers are benefiting from the price surge, but consumers in urban areas are feeling the pinch.',
    contentHindi: 'प्रमुख कृषि बाजारों में प्याज की कीमतों में पिछले महीने में 35-40% की तेज वृद्धि देखी गई है, मुख्य उत्��ादक क्षेत्रों में थोक दरें ₹40-45 प्रति किलो तक पहुंच गई हैं। कीमतों में वृद्धि मुख्य रूप से बांग्लादेश, श्रीलंका और मध्य पूर्वी देशों से बढ़ती निर्यात मांग के कारण है, साथ ही बेमौसम बारिश के कारण कुछ राज्यों में उत्पादन में कमी भी है। महाराष्ट्र, कर्नाटक और गुजरात, प्रमुख प्याज उत्पादक राज्य, निर्यातकों से भारी मांग का अनुभव कर रहे हैं। बाजार विश्लेषकों का अनुमान है कि देर से खरीफ फसल से ताजा आपूर्ति बाजार को स्थिर करने तक कीमतें अगले 2-3 महीनों तक ऊंची रह सकती हैं। किसानों को कीमतों की वृद्धि से फायदा हो रहा है, लेक��न शहरी क्षेत्रों के उपभोक्ता परेशानी महसूस कर रहे हैं।',
    author: 'Sunita Singh',
    authorHindi: 'सुनी���ा सिंह',
    source: 'Market Reporter',
    sourceHindi: 'मार्केट रिपोर्टर',
    publishedAt: '2024-01-12T16:45:00Z',
    urlToImage: '/api/placeholder/600/400',
    url: 'https://example.com/news/onion-prices-surge',
    category: 'market',
    categoryHindi: 'बाजार',
    tags: ['onion', 'prices', 'export', 'mandi'],
    tagsHindi: ['प्याज', 'कीमतें', 'निर्यात', 'मंडी'],
    views: 9870,
    likes: 127,
    location: 'Nashik',
    locationHindi: 'नाशिक',
    featured: false,
    trending: false
  },
  {
    id: '5',
    title: 'Climate-Resilient Crop Varieties Show Promise in Drought-Prone Areas',
    titleHindi: 'सूखा प्रवण क्षेत्रों में जलवायु प्रतिरोधी फसल किस्मों ने आशा दिखाई',
    description: 'New drought-tolerant varieties of millets and pulses developed by ICRISAT show 30% higher yields in water-stressed conditions.',
    descriptionHindi: 'ICRISAT द्वारा विकसित बाजरा और दालों की नई सूखा सहनशील किस्में पानी की कमी वाली परिस्थितियों म��ं 30% अधिक उत्पादन दिखाती हैं।',
    content: 'Research trials conducted by the International Crops Research Institute for the Semi-Arid Tropics (ICRISAT) have demonstrated remarkable success with new climate-resilient crop varieties in drought-prone regions of Rajasthan, Karnataka, and Andhra Pradesh. The newly developed varieties of pearl millet, finger millet, and chickpea can withstand water stress and extreme temperatures while maintaining 25-30% higher yields compared to traditional varieties. Over 10,000 farmers across 200 villages participated in the trials, reporting not only higher yields but also improved soil health and reduced input costs. The varieties are now being fast-tracked for release through the National Seed Corporation, and could be a game-changer for farmers in semi-arid regions.',
    contentHindi: 'अर्ध-शुष्क उष्णकटिबंधीय के लिए अंतर्राष्ट्रीय फसल अनुसंधान संस्थान (ICRISAT) द्वारा आयोजित अनुसंधान परीक्षणों ने राजस्थान, कर्नाटक और आंध्र प्रदेश के सूखा प्रवण क्षेत्रों में नई ���लवायु प्रतिरोधी फसल किस्मों के साथ उल्लेखनीय सफलता का प्रदर्शन किया है। बाजरा, रागी और चने की नई विकसित किस्में पानी के तनाव और अत्यधिक तापमान का सामना कर सकती हैं जबकि पारंपरिक किस्मों की तुलना में 25-30% अधिक उत्पादन बनाए रख सकती हैं। 200 गांवों के 10,000 से अधिक किसानों ने परीक्षणों में भाग लिया, न केवल अधिक उत्पादन बल्कि मिट्टी के स्वास्थ्य में सुधार और इनपुट लागत में कमी की रिपोर्ट दी। राष्ट्रीय बीज निगम के माध्यम से इन किस्मों को रिलीज के लिए तेजी से आगे बढ़ाया जा रहा है, और यह अर्ध-शुष्क क्षेत्रों के किसानों के लिए गेम चेंजर हो सकता है।',
    author: 'Dr. Ramesh Chand',
    authorHindi: 'डॉ. रमेश चंद',
    source: 'Agricultural Research Today',
    sourceHindi: 'कृषि अनुसंधान टुडे',
    publishedAt: '2024-01-11T11:15:00Z',
    urlToImage: '/api/placeholder/600/400',
    url: 'https://example.com/news/climate-resilient-crops',
    category: 'research',
    categoryHindi: 'अनुसंधान',
    tags: ['climate change', 'drought', 'crop varieties', 'research'],
    tagsHindi: ['जलवायु परिवर्तन', 'सूखा', 'फसल किस्में', 'अनुसंधान'],
    views: 7420,
    likes: 95,
    location: 'Hyderabad',
    locationHindi: 'हैदराबाद',
    featured: false,
    trending: false
  }
];

// GET /api/agriculture-news - Get all agriculture news
router.get('/agriculture-news', async (req, res) => {
  try {
    // In a real application, you might fetch from:
    // - News APIs (NewsAPI, Google News API)
    // - Agriculture-specific news sources
    // - Government agriculture portals
    // - RSS feeds from agricultural websites

    // Add some randomization to simulate live updates
    const updatedNews = agricultureNews.map(article => ({
      ...article,
      views: article.views + Math.floor(Math.random() * 50),
      likes: article.likes + Math.floor(Math.random() * 10),
      publishedAt: article.id === '1' ? new Date().toISOString() : article.publishedAt // Make latest news more recent
    }));

    // Sort by published date (newest first)
    updatedNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    res.json(updatedNews);
  } catch (error) {
    console.error('Error fetching agriculture news:', error);
    res.status(500).json({
      message: 'Failed to fetch agriculture news',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/agriculture-news/:id - Get specific news article
router.get('/agriculture-news/:id', (req, res) => {
  try {
    const { id } = req.params;
    const article = agricultureNews.find(a => a.id === id);
    
    if (!article) {
      return res.status(404).json({
        message: 'News article not found',
        error: 'The requested news article does not exist'
      });
    }

    // Increment view count
    article.views += 1;

    res.json(article);
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).json({
      message: 'Failed to fetch news article',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/agriculture-news/category/:category - Get news by category
router.get('/agriculture-news/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const filteredNews = agricultureNews.filter(article => 
      article.category === category
    );
    
    res.json(filteredNews);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({
      message: 'Failed to fetch news by category',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/agriculture-news/trending - Get trending news
router.get('/agriculture-news/trending', (req, res) => {
  try {
    const trendingNews = agricultureNews
      .filter(article => article.trending)
      .sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
    
    res.json(trendingNews);
  } catch (error) {
    console.error('Error fetching trending news:', error);
    res.status(500).json({
      message: 'Failed to fetch trending news',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
