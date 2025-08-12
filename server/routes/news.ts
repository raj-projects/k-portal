import { RequestHandler } from "express";
import axios from "axios";

interface NewsArticle {
  source: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  timestamp: number;
}

// Cache for news data
const newsCache = new Map<string, { data: NewsResponse; expiry: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const handleNews: RequestHandler = async (req, res) => {
  try {
    const { category = "science", country = "in", pageSize = "10" } = req.query;

    // Validate inputs
    const validCategories = ["science", "general", "technology"];
    const validCountries = ["in"];
    
    if (!validCategories.includes(category as string)) {
      return res.status(400).json({ 
        error: "Invalid category",
        message: "अमान्य समाचार श्रेणी" 
      });
    }

    // Check cache
    const cacheKey = `${category}-${country}-${pageSize}`;
    const cached = newsCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return res.json(cached.data);
    }

    // Get API key from environment
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.warn("News API key not configured - returning fallback news");

      // Return fallback news instead of error
      const fallbackNews: NewsResponse = {
        articles: [
          {
            source: "KisanSetu",
            title: "मौसम अपडेट: कृषि सलाह",
            description: "आज के मौसम के अनुसार फसल की देखभाल की सलाह।",
            url: "/weather",
            urlToImage: "",
            publishedAt: new Date().toISOString(),
            content: ""
          },
          {
            source: "KisanSetu",
            title: "सरकारी योजनाएं: नई अपडेट",
            description: "किसानों के लिए नई सरकारी योजनाओं की जानकारी।",
            url: "/schemes",
            urlToImage: "",
            publishedAt: new Date().toISOString(),
            content: ""
          },
          {
            source: "कृषि मंत्रालय",
            title: "फसल बीमा योजना की जानकारी",
            description: "प्रधानमंत्री फसल बीमा योजना के तहत किसानों को मिलने वाले लाभ।",
            url: "/schemes",
            urlToImage: "",
            publishedAt: new Date().toISOString(),
            content: ""
          }
        ],
        totalResults: 3,
        timestamp: Date.now()
      };

      return res.json(fallbackNews);
    }

    // Call NewsAPI
    const apiUrl = `https://newsapi.org/v2/top-headlines`;
    const params = {
      country: country as string,
      category: category as string,
      pageSize: Math.min(parseInt(pageSize as string) || 10, 20),
      apiKey
    };

    const response = await axios.get(apiUrl, {
      params,
      timeout: 10000,
      headers: {
        'User-Agent': 'KisanSetu/1.0'
      }
    });

    const data = response.data;
    
    // Filter and sanitize articles for agricultural relevance
    const agriculturalKeywords = [
      'कृषि', 'किसान', 'फसल', 'खेती', 'मौसम', 'बारिश', 'सिंचाई',
      'agriculture', 'farmer', 'crop', 'farming', 'weather', 'rain', 'irrigation',
      'rural', 'village', 'harvest', 'seed', 'fertilizer'
    ];

    const filteredArticles = (data.articles || [])
      .filter((article: any) => {
        if (!article.title || !article.source?.name) return false;
        
        const searchText = `${article.title} ${article.description || ''}`.toLowerCase();
        return agriculturalKeywords.some(keyword => 
          searchText.includes(keyword.toLowerCase())
        );
      })
      .slice(0, 10)
      .map((article: any) => ({
        source: article.source?.name || "Unknown Source",
        title: article.title || "",
        description: article.description || "",
        url: article.url || "",
        urlToImage: article.urlToImage || "",
        publishedAt: article.publishedAt || "",
        content: article.content || ""
      }));

    const newsData: NewsResponse = {
      articles: filteredArticles,
      totalResults: filteredArticles.length,
      timestamp: Date.now()
    };

    // Cache the result
    newsCache.set(cacheKey, {
      data: newsData,
      expiry: Date.now() + CACHE_DURATION
    });

    res.json(newsData);

  } catch (error) {
    console.error("News API error:", error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return res.status(500).json({ 
          error: "News service authentication failed",
          message: "समाचार सेवा में प्रमाणीकरण त्रुटि" 
        });
      }
      if (error.response?.status === 429) {
        return res.status(429).json({ 
          error: "News service rate limit exceeded",
          message: "समाचार सेवा की सीमा पार हो गई" 
        });
      }
    }

    // Return fallback news if API fails
    const fallbackNews: NewsResponse = {
      articles: [
        {
          source: "KisanMitra",
          title: "मौसम अपडेट: कृषि सलाह",
          description: "आज के मौसम के अनुसार फसल की देखभाल की सलाह।",
          url: "/weather",
          urlToImage: "",
          publishedAt: new Date().toISOString(),
          content: ""
        },
        {
          source: "KisanMitra",
          title: "सरकारी योजनाएं: नई अपडेट",
          description: "किसानों के लिए नई सरकारी योजनाओं की जानकारी।",
          url: "/schemes",
          urlToImage: "",
          publishedAt: new Date().toISOString(),
          content: ""
        }
      ],
      totalResults: 2,
      timestamp: Date.now()
    };

    res.json(fallbackNews);
  }
};
