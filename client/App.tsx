import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ChatBot from "./components/ChatBot";
import Index from "./pages/Index";
import Weather from "./pages/Weather";
import MandiPrices from "./pages/MandiPrices";
import Videos from "./pages/Videos";
import FarmingTools from "./pages/FarmingTools";
import FarmingToolsEnhanced from "./pages/FarmingToolsEnhanced";
import Community from "./pages/Community";
import PestDetection from "./pages/PestDetection";
import FinancialTools from "./pages/FinancialTools";
import Marketplace from "./pages/Marketplace";
import FarmingNews from "./pages/FarmingNews";
import WeatherCropAdvisory from "./pages/WeatherCropAdvisory";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import FarmingKnowledge from "./pages/FarmingKnowledge";
import ContactSupport from "./pages/ContactSupport";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-farm-50">
    <Navigation />
    {children}
    <ChatBot />
    <footer className="bg-farm-700 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">किसानमित्र</h3>
                <p className="text-sm text-farm-200">KisanMitra</p>
              </div>
            </div>
            <p className="text-farm-200 mb-4">
              भारत के किसानों के लिए निःशुल्क डिजिटल सहायता प्लेटफॉर्म
            </p>
            <p className="text-sm text-farm-300">
              Free digital platform for Indian farmers
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">🆘 आपातकालीन हेल्पलाइन</h4>
            <div className="space-y-3 text-farm-200">
              <div className="bg-red-600/20 p-3 rounded-lg">
                <p className="font-bold text-red-200">📞 24x7 किसान हेल्पलाइन</p>
                <p className="text-xl font-bold">1800-180-1551</p>
              </div>
              <p>📞 मौसम आपातकाल: 1800-180-1552</p>
              <p>🚨 फसल बीमा: 1800-180-1553</p>
              <p>💰 ऋण सहायता: 1800-180-1554</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">📞 संपर्क विवरण</h4>
            <div className="space-y-2 text-farm-200">
              <p>📧 help@kisanmitra.in</p>
              <p>📧 support@kisanmitra.in</p>
              <p>📱 WhatsApp: +91-9876543210</p>
              <p>📱 SMS सेवा: +91-9876543211</p>
              <p>🏢 मुख्यालय: नई दिल्ली, भारत</p>
              <p>⏰ सेवा समय: 24x7 उपलब्ध</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">🌐 सोशल मीडिया</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-2 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-colors">
                <span className="text-xl mr-3">📘</span>
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-sm text-farm-300">/KisanMitraIndia</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-2 bg-blue-400/20 rounded-lg hover:bg-blue-400/30 transition-colors">
                <span className="text-xl mr-3">🐦</span>
                <div>
                  <p className="font-medium">Twitter</p>
                  <p className="text-sm text-farm-300">@KisanMitra</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-2 bg-green-600/20 rounded-lg hover:bg-green-600/30 transition-colors">
                <span className="text-xl mr-3">📱</span>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-farm-300">+91-9876543210</p>
                </div>
              </a>
              <a href="#" className="flex items-center p-2 bg-red-600/20 rounded-lg hover:bg-red-600/30 transition-colors">
                <span className="text-xl mr-3">📺</span>
                <div>
                  <p className="font-medium">YouTube</p>
                  <p className="text-sm text-farm-300">KisanMitra Official</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-farm-600 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div>
              <p className="text-farm-200">&copy; 2024 किसानमित्र (KisanMitra)</p>
              <p className="text-sm text-farm-300">सभी अधिकार सुरक्षित / All rights reserved</p>
            </div>
            <div className="text-farm-300 text-sm">
              <p>🔒 आप���ी गोपनीयता सुरक्षित है</p>
              <p>✅ सरकार द्वारा अनुमोदित</p>
            </div>
            <div className="text-farm-300 text-sm">
              <p>🏆 5 करोड़+ किसान भरोसा करते हैं</p>
              <p>🎯 99.9% अपटाइम गारंटी</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/weather-crop-advisory" element={<WeatherCropAdvisory />} />
            <Route path="/farming-tips" element={<PlaceholderPage title="फसल सलाह" subtitle="Crop Advice" />} />
            <Route path="/mandi-prices" element={<MandiPrices />} />
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/farming-tools" element={<FarmingToolsEnhanced />} />
            <Route path="/farming-knowledge" element={<FarmingKnowledge />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/farming-news" element={<FarmingNews />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/pest-detection" element={<PestDetection />} />
            <Route path="/financial-tools" element={<FinancialTools />} />
            <Route path="/community" element={<Community />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<ContactSupport />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
