/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Weather API response type
 */
export interface WeatherResponse {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  condition: string;
  icon: string;
  timestamp: number;
}

/**
 * News API response types
 */
export interface NewsArticle {
  source: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  timestamp: number;
}

/**
 * Crop Analysis API response types
 */
export interface CropLabel {
  description: string;
  confidence: number;
  category: string;
}

export interface CropAnalysisResult {
  labels: CropLabel[];
  detectedText?: string[];
  suggestions: string[];
  timestamp: number;
}

/**
 * Chat API types
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  conversationId: string;
  timestamp: number;
}

/**
 * API Error response type
 */
export interface ApiError {
  error: string;
  message: string;
}
