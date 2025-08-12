import express from 'express';

const router = express.Router();

// Mock community posts data
const posts = [
  {
    id: '1',
    title: 'White spots on wheat leaves - need urgent help',
    titleHindi: 'गेहूं की पत्तियों पर सफेद दाग - तुरंत मदद चाहिए',
    content: 'I have noticed white powdery spots appearing on my wheat crop leaves over the past week. The spots are spreading rapidly across the field. The weather has been humid lately. I am concerned this might be a fungal infection. Has anyone faced similar issues? What treatment would you recommend? I have about 10 acres of wheat that are affected.',
    contentHindi: 'पिछले सप्ताह से मैंने अपनी गेहूं की फसल की पत्तियों पर सफेद पाउडर जैसे दाग देखे हैं। ���े दाग पूरे खेत में तेजी से फैल रहे हैं। हाल ही में मौसम नम रहा है। मुझे चिंता है कि यह फंगल संक्रमण हो सकता है। क्या किसी ने ऐसी समस्याओं का सामना किया है? आप कौन सा उपचार सुझाएंगे? मेरे पास लगभग 10 एकड़ गेहूं प्रभावित है।',
    author: {
      name: 'Rajesh Kumar',
      nameHindi: 'राजेश कुमार',
      avatar: '/api/placeholder/40/40',
      reputation: 245,
      location: 'Ludhiana, Punjab',
      locationHindi: 'लुधियाना, पंजाब',
      verified: true,
      joinDate: '2023-08-15',
      totalPosts: 15,
      badges: ['सक्रिय सदस्य']
    },
    category: 'crop-problems',
    categoryHindi: 'फसल समस्याएं',
    tags: ['wheat', 'disease', 'fungal', 'urgent'],
    tagsHindi: ['गेहूं', 'रोग', 'फंगल', 'तत्काल'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    views: 256,
    likes: 18,
    dislikes: 0,
    replies: 7,
    featured: false,
    solved: false,
    urgent: true
  },
  {
    id: '2',
    title: 'My successful transition to organic farming - 3 year journey',
    titleHindi: 'जैविक खेती में मेरा सफल संक्रमण - 3 साल की यात्रा',
    content: 'Three years ago, I made the decision to transition my 20-acre farm from conventional to organic farming. It was challenging initially, but the results have been incredibly rewarding. My input costs have reduced by 30%, and I\'m getting a 40% premium for organic produce. Here\'s my complete journey, challenges faced, and practical tips for fellow farmers considering this transition.',
    contentHindi: 'तीन साल पहले, मैंने अपने 20 एकड़ खेत को पारंपरिक से जैविक खेती में बदलने का फैसला किया था। शुरुआत में यह चुनौतीपूर्ण था, लेकिन परिणाम अविश्वसनीय रूप से फायदेमंद रहे हैं। मेरी इनपुट लागत 30% कम हो गई है, और मुझे जैविक उत्पादन के लिए 40% प्रीमि��म मिल रहा है। यहाँ मेरी पूरी यात्रा, सामना की गई चुनौतियां, और इस संक्रमण पर विचार कर रहे साथी किसानों के लिए व्यावहारिक सुझाव हैं।',
    author: {
      name: 'Priya Sharma',
      nameHindi: 'प्रिया शर्मा',
      avatar: '/api/placeholder/40/40',
      reputation: 890,
      location: 'Nashik, Maharashtra',
      locationHindi: 'नाशिक, महाराष्ट्र',
      verified: true,
      joinDate: '2023-03-20',
      totalPosts: 35,
      badges: ['अनुभवी सदस्य', 'जैविक विशेषज्ञ']
    },
    category: 'success-stories',
    categoryHindi: 'सफलता की कहानियां',
    tags: ['organic', 'success', 'profit', 'transition'],
    tagsHindi: ['जैविक', 'सफलता', 'मुनाफा', 'संक्रमण'],
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    views: 542,
    likes: 68,
    dislikes: 2,
    replies: 23,
    featured: true,
    solved: false,
    urgent: false
  },
  {
    id: '3',
    title: 'Best drip irrigation system under ₹50,000?',
    titleHindi: '₹50,000 के अंतर्गत सबसे अच्छा ड्रिप सिंचाई सिस्टम?',
    content: 'I want to install a drip irrigation system for my 5-acre tomato farm. My budget is around ₹50,000. Can someone recommend good brands and suppliers? Also, what are the key features I should look for? Any government subsidies available for this?',
    contentHindi: 'मैं अपने 5 एकड़ टमाटर के खेत के लिए ड्रिप सिंचाई प्रणाली लगवाना चाहता हूं। मेरा बजट लगभग ₹50,000 है। कोई अच्छे ब्रांड और सप्लायर की सिफारिश कर सकता है? साथ ही मुझे किन मुख्य विशेषताओं की तलाश करनी चाहिए? इसके लिए कोई सरकारी सब्सिडी उपलब्ध है?',
    author: {
      name: 'Vikram Singh',
      nameHindi: 'विक्रम सिंह',
      avatar: '/api/placeholder/40/40',
      reputation: 156,
      location: 'Jaipur, Rajasthan',
      locationHindi: 'जयपुर, राजस्थान',
      verified: false,
      joinDate: '2023-11-10',
      totalPosts: 8,
      badges: ['नए सदस्य']
    },
    category: 'irrigation',
    categoryHindi: 'सिंचाई',
    tags: ['drip-irrigation', 'equipment', 'budget', 'subsidy'],
    tagsHindi: ['ड्रिप-सिंचाई', 'उपकरण', 'बजट', 'सब्सिडी'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    views: 189,
    likes: 12,
    dislikes: 0,
    replies: 5,
    featured: false,
    solved: false,
    urgent: false
  },
  {
    id: '4',
    title: 'Government schemes for women farmers - please share information',
    titleHindi: 'महिला किसानों के लिए सरकारी योजनाएं - कृपया जानकारी साझा करें',
    content: 'I am a woman farmer from Bihar managing 3 acres of paddy fields. I want to know about specific government schemes and benefits available for women in agriculture. Also looking for information about women farmer groups and cooperatives in my area.',
    contentHindi: 'मैं बिहार की एक महिला किसान हूं जो 3 एकड़ धान के खेत का प्रबंधन करती हूं। मैं कृष�� में महिलाओं के लिए उपलब्ध विशिष्ट सरकारी योजनाओं और लाभों के बारे में जानना चाहती हूं। अपने क्षेत्र में महिला किसान समूहों और सहकारी समितियों की जानकारी भी चाहिए।',
    author: {
      name: 'Sunita Devi',
      nameHindi: 'सुनीता देवी',
      avatar: '/api/placeholder/40/40',
      reputation: 78,
      location: 'Patna, Bihar',
      locationHindi: 'पटना, बिहार',
      verified: true,
      joinDate: '2023-12-05',
      totalPosts: 3,
      badges: ['नए सदस्य', 'महिला किसान']
    },
    category: 'government-schemes',
    categoryHindi: 'सरकारी योजनाएं',
    tags: ['women-farmers', 'government', 'schemes', 'cooperatives'],
    tagsHindi: ['महिला-किसान', 'सरकार', 'योजनाएं', 'सहकारी'],
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    views: 134,
    likes: 15,
    dislikes: 0,
    replies: 4,
    featured: false,
    solved: false,
    urgent: false
  }
];

// Mock replies data
const replies = [
  {
    id: '1',
    postId: '1',
    content: 'This definitely looks like powdery mildew, a common fungal disease in wheat during humid conditions. I recommend immediate spraying with a fungicide like Propiconazole or you can try organic solutions like neem oil mixed with baking soda. Apply early morning or evening to avoid leaf burn.',
    contentHindi: 'यह निश्चित रूप से चूर्णी फफूंदी लग रहा है, जो नम परिस्थितियों में गेहूं में एक आम फंगल रोग है। मैं प्रोपिकॉनाज़ोल जैसे कवकनाशी के तत्काल छिड़काव की सिफारिश करता हूं या आप बेकिंग सोडा के साथ मिश्रित नीम के तेल जैसे जैविक समाधान आज़मा सकते हैं। पत्ती जलने से बचने के लिए सुबह जल्दी या शाम को लगाएं।',
    author: {
      name: 'Dr. Amit Singh',
      nameHindi: 'डॉ. अमित सिंह',
      avatar: '/api/placeholder/40/40',
      reputation: 1250,
      verified: true
    },
    createdAt: '2024-01-15T11:15:00Z',
    likes: 12,
    dislikes: 0,
    isSolution: true
  },
  {
    id: '2',
    postId: '1',
    content: 'I faced the same issue last season. Apart from fungicide, improve air circulation by removing weeds and ensure proper spacing between plants. Also, avoid overhead irrigation - use drip or furrow irrigation instead.',
    contentHindi: 'मैंने पिछले सीजन में भी यही समस्या का सामना किया था। कवकनाशी के अलावा, खरपतवार हटाकर हवा के संचालन में सुधार करें और पौधों के बीच उचित दूरी सुनिश्चित करें। साथ ही, ऊपरी सिंचाई से बचें - इसके बजाय ड्रिप या फरो सिंचाई का उपयोग करें।',
    author: {
      name: 'Harpreet Singh',
      nameHindi: 'हरप्रीत सिंह',
      avatar: '/api/placeholder/40/40',
      reputation: 456,
      verified: false
    },
    createdAt: '2024-01-15T12:30:00Z',
    likes: 8,
    dislikes: 0,
    isSolution: false
  },
  {
    id: '3',
    postId: '2',
    content: 'Congratulations on your success! I\'m planning to transition to organic farming. Could you share more details about the certification process and which crops gave you the best returns?',
    contentHindi: 'आपकी सफलता पर बधाई! मैं जैविक खेती में संक्रमण की योजना बना रहा हूं। क्या आप प्रमाणन प्रक्रिया और कौन सी फसलों ने आपको सबसे अच्छा रिटर्न दिया, इसके बारे में और विवरण साझा कर सकते हैं?',
    author: {
      name: 'Ravi Kumar',
      nameHindi: 'रवि कुमार',
      avatar: '/api/placeholder/40/40',
      reputation: 234,
      verified: false
    },
    createdAt: '2024-01-14T16:45:00Z',
    likes: 5,
    dislikes: 0,
    isSolution: false
  }
];

// GET /api/community/posts - Get all community posts
router.get('/community/posts', (req, res) => {
  try {
    // Simulate real-time updates by adding slight variations
    const updatedPosts = posts.map(post => ({
      ...post,
      views: post.views + Math.floor(Math.random() * 10),
      likes: post.likes + Math.floor(Math.random() * 3)
    }));

    res.json(updatedPosts);
  } catch (error) {
    console.error('Error fetching community posts:', error);
    res.status(500).json({
      message: 'Failed to fetch community posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/community/replies - Get all replies
router.get('/community/replies', (req, res) => {
  try {
    res.json(replies);
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).json({
      message: 'Failed to fetch replies',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/community/posts/:id - Get specific post
router.get('/community/posts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    
    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        error: 'The requested post does not exist'
      });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({
      message: 'Failed to fetch post',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/community/posts - Create new post
router.post('/community/posts', (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    if (!title || !content || !category) {
      return res.status(400).json({
        message: 'Missing required fields',
        error: 'Title, content, and category are required'
      });
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      titleHindi: title, // In real app, would handle translation
      content,
      contentHindi: content,
      author: {
        name: 'Current User',
        nameHindi: 'वर्तमान उपयोगकर्ता',
        avatar: '/api/placeholder/40/40',
        reputation: 150,
        location: 'India',
        locationHindi: 'भारत',
        verified: false,
        joinDate: new Date().toISOString().split('T')[0],
        totalPosts: 1,
        badges: ['नए सदस्य']
      },
      category,
      categoryHindi: category,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      tagsHindi: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      dislikes: 0,
      replies: 0,
      featured: false,
      solved: false,
      urgent: false
    };

    posts.unshift(newPost as any);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      message: 'Failed to create post',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/community/replies - Create new reply
router.post('/community/replies', (req, res) => {
  try {
    const { postId, content } = req.body;
    
    if (!postId || !content) {
      return res.status(400).json({
        message: 'Missing required fields',
        error: 'PostId and content are required'
      });
    }

    const newReply = {
      id: Date.now().toString(),
      postId,
      content,
      contentHindi: content,
      author: {
        name: 'Current User',
        nameHindi: 'वर्तमान उपयोगकर्ता',
        avatar: '/api/placeholder/40/40',
        reputation: 150,
        verified: false
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      isSolution: false
    };

    replies.push(newReply as any);
    
    // Update post reply count
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].replies += 1;
    }

    res.status(201).json(newReply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({
      message: 'Failed to create reply',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
