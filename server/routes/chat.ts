import { RequestHandler } from "express";
import axios from "axios";

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  conversation?: ChatMessage[];
}

interface ChatResponse {
  response: string;
  conversationId: string;
  timestamp: number;
}

// Rate limiting storage (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { message, conversation = [] }: ChatRequest = req.body;
    const userIP = req.ip || req.connection.remoteAddress || 'unknown';

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: "Message is required",
        message: "कृपया अपना प्रश्न लिखें"
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: "Message too long",
        message: "संदेश 1000 अक्षरों से कम होना चाहिए"
      });
    }

    // Rate limiting
    const now = Date.now();
    const userLimit = rateLimitMap.get(userIP);
    
    if (userLimit) {
      if (userLimit.resetTime > now) {
        if (userLimit.count >= RATE_LIMIT) {
          return res.status(429).json({
            error: "Rate limit exceeded",
            message: "कृपया कुछ समय बाद प्रयास करें"
          });
        }
        userLimit.count += 1;
      } else {
        rateLimitMap.set(userIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }
    } else {
      rateLimitMap.set(userIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // Get OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OpenAI API key not configured");
      return res.status(500).json({
        error: "Chat service temporarily unavailable",
        message: "चैट सेवा अस्थायी रूप से अनुपलब्ध है"
      });
    }

    // Prepare conversation with system prompt
    const systemPrompt = `आप एक कृषि विशेषज्ञ हैं जो भारतीय किसानों की मदद करते हैं। आपका नाम "किसान मित्र AI" है।

निर्देश:
1. केवल कृषि, मौसम, फसल, पशुपालन, और खेती से संबंधित प्रश्नों का उत्तर दें
2. हिंदी और अंग्रेजी दोनों भाषाओं में जवाब दे सकते हैं
3. व्यावहारिक और सरल सलाह दें
4. हमेशा कहें कि "यह केवल सूचनात्मक सलाह है, स्थानीय कृषि विशेषज्ञ से भी सलाह लें"
5. व्यक्तिगत, वित्तीय, या स्वास्थ्य संबंधी सलाह न दें
6. अगर प्रश्न कृषि से संबंधित नहीं है तो विनम्रता से मना करें

कृषि विषय: फ���ल, बीज, उर्वरक, कीट प्रबंधन, सिंचाई, मौसम, मिट्टी, पशुपालन, बागवानी, जैविक खेती`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversation.slice(-5), // Keep last 5 messages for context
      { role: 'user', content: message.trim() }
    ];

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const aiResponse = response.data.choices?.[0]?.message?.content || '';
    
    if (!aiResponse) {
      throw new Error("No response from AI service");
    }

    const chatResponse: ChatResponse = {
      response: aiResponse.trim(),
      conversationId: generateConversationId(),
      timestamp: Date.now()
    };

    res.json(chatResponse);

  } catch (error) {
    console.error("Chat API error:", error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return res.status(500).json({
          error: "Chat service authentication failed",
          message: "चैट सेवा में प्रमाणीकरण त्रुटि"
        });
      }
      if (error.response?.status === 429) {
        return res.status(429).json({
          error: "AI service rate limit exceeded",
          message: "AI सेवा की सीमा पार हो गई, कृपया बाद में प्रयास करें"
        });
      }
    }

    // Fallback response
    const fallbackResponses = [
      "मुझे खुशी होगी आपकी कृषि संबंधी समस्या में मदद करने में। कृपया अपना प्रश्न फिर से पूछें।",
      "कृषि संबंधी सलाह के लिए आप स्थानीय कृषि विशेषज्ञ से भी संपर्क कर सकते हैं।",
      "इस समय तकनीकी समस्या के कारण मैं आपकी पूरी मदद नहीं कर पा रहा। कृपया ब��द में प्रयास करें।"
    ];

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    res.json({
      response: randomResponse,
      conversationId: generateConversationId(),
      timestamp: Date.now()
    });
  }
};

function generateConversationId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Cleanup rate limit map periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (data.resetTime <= now) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour
