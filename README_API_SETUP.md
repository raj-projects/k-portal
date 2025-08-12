# KisanSetu API Integration Setup Guide

## Overview
This guide covers the setup and deployment of KisanSetu's integrated APIs for weather, news, crop analysis, and AI chat features.

## 🔧 Required API Keys and Setup

### 1. OpenWeather API (Weather Data)
- **Service**: OpenWeatherMap Current Weather Data API
- **Registration**: https://openweathermap.org/api
- **Free Tier**: 1,000 calls/day, 60 calls/minute
- **Environment Variable**: `OPENWEATHER_API_KEY`

```bash
# Example API call format (server-side only)
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&lang=hi&appid={API_KEY}
```

### 2. NewsAPI (Agriculture News)
- **Service**: NewsAPI Top Headlines
- **Registration**: https://newsapi.org/register
- **Free Tier**: 1,000 requests/day
- **Environment Variable**: `NEWS_API_KEY`

```bash
# Example API call format (server-side only)
https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey={API_KEY}
```

### 3. Google Cloud Vision API (Crop Image Analysis)
- **Service**: Google Cloud Vision Label Detection
- **Setup**: https://cloud.google.com/vision/docs/setup
- **Free Tier**: 1,000 units/month
- **Environment Variable**: `GOOGLE_APPLICATION_CREDENTIALS` or `GOOGLE_CLOUD_PROJECT`

```bash
# Service Account Setup
1. Create a Google Cloud Project
2. Enable the Vision API
3. Create a Service Account
4. Download the JSON key file
5. Set GOOGLE_APPLICATION_CREDENTIALS to the file path
```

### 4. OpenAI API (AI Chatbot)
- **Service**: OpenAI GPT-3.5-turbo
- **Registration**: https://platform.openai.com/
- **Pricing**: $0.002/1K tokens (input + output)
- **Environment Variable**: `OPENAI_API_KEY`

## 🚀 Quick Setup

### 1. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your API keys
nano .env
```

### 2. Install Dependencies

```bash
# Install required packages
npm install axios multer @google-cloud/vision @types/multer
```

### 3. API Key Security

**✅ SECURE (Server-side)**
```typescript
// server/routes/weather.ts
const apiKey = process.env.OPENWEATHER_API_KEY;
const response = await axios.get(`https://api.openweathermap.org/...&appid=${apiKey}`);
```

**❌ INSECURE (Never do this)**
```typescript
// client/components/WeatherWidget.tsx - NEVER expose keys
const API_KEY = "your_api_key_here"; // ❌ WRONG
fetch(`https://api.openweathermap.org/...&appid=${API_KEY}`); // ❌ WRONG
```

## 📡 API Endpoints

### Backend Routes (Secured)
- `GET /api/weather?lat={lat}&lon={lon}` - Weather data
- `GET /api/news?category=science&pageSize=10` - Agriculture news  
- `POST /api/crop-analyze` - Crop image analysis (multipart/form-data)
- `POST /api/chat` - AI chatbot responses
- `GET /api/health` - Service health check

### Frontend Integration
```typescript
// Example weather API call from frontend
const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
const weatherData = await response.json();
```

## 🔒 Security Features

### 1. Rate Limiting
- **Weather API**: 10-minute cache, prevents API abuse
- **News API**: 5-minute cache, respects rate limits
- **Chat API**: 10 requests/hour per IP
- **File Upload**: 8MB limit, MIME type validation

### 2. Input Validation
```typescript
// Coordinate validation
if (isNaN(latitude) || isNaN(longitude)) {
  return res.status(400).json({ error: "Invalid coordinates" });
}

// File type validation
if (!file.type.startsWith('image/')) {
  return res.status(400).json({ error: "Invalid file type" });
}
```

### 3. Error Handling
- API failures return fallback data
- Sensitive error details not exposed to clients
- Comprehensive server-side logging

### 4. CORS Configuration
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
```

## 📊 Caching Strategy

### In-Memory Cache Implementation
```typescript
const cache = new Map<string, { data: any; expiry: number }>();

// Cache check
const cached = cache.get(cacheKey);
if (cached && cached.expiry > Date.now()) {
  return res.json(cached.data);
}

// Store in cache
cache.set(cacheKey, {
  data: apiResponse,
  expiry: Date.now() + CACHE_DURATION
});
```

### Cache Durations
- **Weather**: 10 minutes
- **News**: 5 minutes  
- **Crop Analysis**: No caching (immediate processing)
- **Chat**: No caching (conversation context)

## 🌐 Production Deployment

### Environment Variables for Production
```bash
# Production .env
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
OPENWEATHER_API_KEY=your_production_key
NEWS_API_KEY=your_production_key
OPENAI_API_KEY=your_production_key

# Google Cloud Authentication (choose one)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
# OR
GOOGLE_CLOUD_PROJECT=your-project-id
```

### SSL/HTTPS Requirements
- All API calls must use HTTPS in production
- Secure cookie settings for session management
- CORS properly configured for production domain

### Monitoring and Logging
```typescript
// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      weather: !!process.env.OPENWEATHER_API_KEY,
      news: !!process.env.NEWS_API_KEY,
      vision: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
      chat: !!process.env.OPENAI_API_KEY
    }
  });
});
```

## 🧪 Testing

### API Testing Checklist
- [ ] Weather API returns valid data for coordinates
- [ ] News API filters agricultural content
- [ ] Image upload accepts valid formats (JPG, PNG, WebP)
- [ ] Image upload rejects oversized files (>8MB)
- [ ] Chat API handles agricultural queries appropriately
- [ ] Rate limiting prevents abuse
- [ ] Error states return appropriate fallbacks
- [ ] CORS works with frontend domain

### Test Commands
```bash
# Test weather endpoint
curl "http://localhost:3000/api/weather?lat=28.6139&lon=77.2090"

# Test news endpoint  
curl "http://localhost:3000/api/news?category=science"

# Test health check
curl "http://localhost:3000/api/health"

# Test image upload
curl -X POST -F "image=@test-crop.jpg" "http://localhost:3000/api/crop-analyze"

# Test chat
curl -X POST -H "Content-Type: application/json" \
  -d '{"message":"मेरी गेहूं की फसल में पीले पत्ते आ रहे हैं"}' \
  "http://localhost:3000/api/chat"
```

## 🔍 Troubleshooting

### Common Issues

**1. API Key Not Working**
```bash
# Check environment loading
console.log('Weather API Key:', process.env.OPENWEATHER_API_KEY ? 'Set' : 'Missing');
```

**2. CORS Errors**
```typescript
// Ensure CORS origin matches frontend URL
app.use(cors({
  origin: "http://localhost:5173", // Development
  // origin: "https://yourdomain.com", // Production
}));
```

**3. Google Vision Authentication**
```bash
# Method 1: Service Account JSON
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"

# Method 2: Project ID (if running on Google Cloud)
export GOOGLE_CLOUD_PROJECT="your-project-id"
```

**4. File Upload Issues**
- Ensure `multer` is properly configured
- Check file size limits (8MB default)
- Verify MIME type validation

**5. Rate Limiting Triggered**
- Check cache implementation
- Verify rate limit settings
- Monitor API usage quotas

### Debug Mode
```typescript
// Enable debug logging
if (process.env.NODE_ENV === 'development') {
  console.log('API Request:', { endpoint, params, timestamp: new Date() });
}
```

## 📝 API Documentation

### Response Formats

**Weather API Response**
```json
{
  "location": "दिल्ली",
  "temperature": 28,
  "humidity": 65,
  "windSpeed": 12,
  "visibility": 8,
  "description": "आंशिक बादल",
  "condition": "cloudy",
  "icon": "02d",
  "timestamp": 1703875200000
}
```

**Crop Analysis Response**
```json
{
  "labels": [
    {
      "description": "Plant",
      "confidence": 95,
      "category": "crop"
    }
  ],
  "suggestions": [
    "यह एक स्वस्थ पौधे की तरह दिखता है",
    "नियमित सिंचाई जारी रखें"
  ],
  "timestamp": 1703875200000
}
```

## 📞 Support

For technical issues or questions:
- Check the health endpoint: `/api/health`
- Review server logs for error details
- Verify environment variable setup
- Ensure all API keys are valid and have sufficient quota

## 🚨 Security Reminders

1. **Never commit API keys** to version control
2. **Use server-side proxy routes** for all external API calls
3. **Implement rate limiting** to prevent abuse
4. **Validate all user inputs** before processing
5. **Use HTTPS** in production environments
6. **Monitor API usage** and costs regularly
7. **Set up alerts** for quota limits and errors
