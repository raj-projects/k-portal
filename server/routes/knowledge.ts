import express from 'express';

const router = express.Router();

// Mock knowledge articles data
const articles = [
  {
    id: 'organic-farming-guide',
    title: 'Complete Guide to Organic Farming',
    titleHindi: 'जैविक खेती की पूर्ण गाइड',
    excerpt: 'Learn everything about transitioning to organic farming practices.',
    excerptHindi: 'जैविक खेती प्रथाओं में संक्रमण के बारे में सब कुछ सीखें।',
    content: 'Organic farming is a holistic production management system...',
    contentHindi: 'जैविक खेती एक समग्र उत्पादन प्रबंधन प्रणाली है...',
    author: 'Dr. Rajesh Kumar',
    authorHindi: 'डॉ. राजेश कुमार',
    authorTitle: 'Agricultural Expert',
    authorTitleHindi: 'कृषि विशेषज्ञ',
    publishDate: '2024-01-15',
    readTime: 15,
    category: 'organic-farming',
    categoryHindi: 'जैविक खेती',
    tags: ['organic', 'sustainable', 'farming'],
    tagsHindi: ['जैविक', 'टिकाऊ', 'खेती'],
    imageUrl: '/api/placeholder/400/300',
    views: 2450,
    likes: 189,
    featured: true,
    difficulty: 'intermediate',
    type: 'article'
  },
  {
    id: 'pest-management',
    title: 'Integrated Pest Management Techniques',
    titleHindi: 'एकीकृत कीट प्रबंधन तकनीक',
    excerpt: 'Effective and sustainable pest control methods for farmers.',
    excerptHindi: 'किसानों के लिए प्रभावी और टिकाऊ कीट नियंत्रण विधियां।',
    content: 'Integrated Pest Management (IPM) is an approach that combines...',
    contentHindi: 'एकीकृत कीट प्रबंधन (IPM) एक दृष्टिकोण है जो संयोजित करता है...',
    author: 'Prof. Sunita Verma',
    authorHindi: 'प्���ो. सुनीता वर्मा',
    authorTitle: 'Entomologist',
    authorTitleHindi: 'कीटविज्ञानी',
    publishDate: '2024-01-12',
    readTime: 12,
    category: 'pest-control',
    categoryHindi: 'कीट नियंत्रण',
    tags: ['pest', 'management', 'ipm'],
    tagsHindi: ['कीट', 'प्रबंधन', 'एकीकृत'],
    imageUrl: '/api/placeholder/400/300',
    views: 1890,
    likes: 156,
    featured: true,
    difficulty: 'intermediate',
    type: 'guide'
  }
];

// Mock video tutorials data
const videos = [
  {
    id: 'drip-irrigation-setup',
    title: 'Setting Up Drip Irrigation System',
    titleHindi: 'ड्रिप सिंचाई प्रणाली की स्थापना',
    description: 'Step-by-step guide to install efficient drip irrigation',
    descriptionHindi: 'कुशल ड्रिप सिंचाई स्थापित करने के लिए चरणबद्ध गाइड',
    duration: '15:30',
    views: 8520,
    likes: 425,
    thumbnailUrl: '/api/placeholder/400/300',
    videoUrl: 'https://example.com/video1',
    category: 'irrigation',
    categoryHindi: 'सिंचाई',
    uploadDate: '2024-01-10',
    featured: true
  },
  {
    id: 'soil-testing-guide',
    title: 'How to Test Soil Health at Home',
    titleHindi: 'घर पर मिट्टी के स्वास्थ्य की जांच कैसे करें',
    description: 'Simple methods to test your soil health without expensive equipment',
    descriptionHindi: 'महंगे उपकरणों के बिना अपनी मिट्टी के स्वास्थ्य की जांच करने के सरल तरीके',
    duration: '12:45',
    views: 6340,
    likes: 298,
    thumbnailUrl: '/api/placeholder/400/300',
    videoUrl: 'https://example.com/video2',
    category: 'soil-health',
    categoryHindi: 'मिट्टी स्वास्थ्य',
    uploadDate: '2024-01-08',
    featured: false
  }
];

// GET /api/knowledge/articles - Get all articles
router.get('/knowledge/articles', (req, res) => {
  try {
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      message: 'Failed to fetch articles',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/knowledge/videos - Get all videos
router.get('/knowledge/videos', (req, res) => {
  try {
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      message: 'Failed to fetch videos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/knowledge/articles/:id - Get specific article
router.get('/knowledge/articles/:id', (req, res) => {
  try {
    const { id } = req.params;
    const article = articles.find(a => a.id === id);
    
    if (!article) {
      return res.status(404).json({
        message: 'Article not found',
        error: 'The requested article does not exist'
      });
    }

    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      message: 'Failed to fetch article',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
