import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleWeather } from "./routes/weather";
import { handleNews } from "./routes/news";
import { handleCropAnalyze, uploadMiddleware } from "./routes/crop-analyze";
import { handleChat } from "./routes/chat";
import schemesRouter from "./routes/schemes";
import knowledgeRouter from "./routes/knowledge";
import communityRouter from "./routes/community";
import agricultureNewsRouter from "./routes/agriculture-news";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // KisanSetu API routes
  app.get("/api/weather", handleWeather);
  app.get("/api/news", handleNews);
  app.post("/api/crop-analyze", uploadMiddleware, handleCropAnalyze);
  app.post("/api/chat", handleChat);
  app.use("/api", schemesRouter);
  app.use("/api", knowledgeRouter);
  app.use("/api", communityRouter);
  app.use("/api", agricultureNewsRouter);

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        weather: !!process.env.OPENWEATHER_API_KEY,
        news: !!process.env.NEWS_API_KEY,
        vision: !!process.env.GOOGLE_APPLICATION_CREDENTIALS || !!process.env.GOOGLE_CLOUD_PROJECT,
        chat: !!process.env.OPENAI_API_KEY,
        schemes: true, // Government schemes API (local data)
        knowledge: true, // Knowledge base API (local data)
        community: true, // Community forum API (local data)
        agricultureNews: true // Agriculture news API (local data)
      }
    });
  });

  return app;
}
