import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import CropAnalyzer from "./components/features/CropAnalyzer";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LocationProvider, LocationPicker } from "./components/features/LocationPicker";
import WeatherPage from "./pages/WeatherPage";
import MarketPricesPage from "./pages/MarketPricesPage";
import GovernmentSchemesPage from "./pages/GovernmentSchemesPage";
import FarmingToolsPage from "./pages/FarmingToolsPage";
import KnowledgePage from "./pages/KnowledgePage";
import CommunityPage from "./pages/CommunityPage";
import NewsPage from "./pages/NewsPage";
import CropCalculatorPage from "./pages/CropCalculatorPage";
import CropCalendarPage from "./pages/CropCalendarPage";
import IrrigationPlannerPage from "./pages/IrrigationPlannerPage";
import MarketReportPage from "./pages/MarketReportPage";
import PestIdentificationPage from "./pages/PestIdentificationPage";
import FertilizerGuidePage from "./pages/FertilizerGuidePage";
import EquipmentRentalPage from "./pages/EquipmentRentalPage";
import RegistrationPage from "./pages/RegistrationPage";
import ContactSupportPage from "./pages/ContactSupportPage";
import SchemeDetailsPage from "./pages/SchemeDetailsPage";
import CalendarPage from "./pages/CalendarPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <LocationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LocationPicker />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Weather & Crop Advisory */}
          <Route path="/weather" element={<WeatherPage />} />

          {/* Agriculture News */}
          <Route path="/news" element={<NewsPage />} />

          {/* Market Prices */}
          <Route path="/market-prices" element={<MarketPricesPage />} />

          {/* Government Schemes */}
          <Route path="/schemes" element={<GovernmentSchemesPage />} />

          {/* Individual Scheme Details */}
          <Route path="/schemes/:id" element={<SchemeDetailsPage />} />

          {/* Farming Tools */}
          <Route path="/tools" element={<FarmingToolsPage />} />

          {/* Tool Sub-routes */}
          <Route path="/tools/calculator" element={<CropCalculatorPage />} />

          <Route path="/tools/calendar" element={<CropCalendarPage />} />
          <Route path="/tools/calendar-old" element={
            <PlaceholderPage
              title="Crop Calendar"
              titleHindi="फसल कैलेंडर"
              description="फसल-वार बुआई, सिंचाई, उर्वरक और कटाई का समय।"
              features={[
                "फसल-वार कैलेंड���",
                "मासिक कृषि कार��य",
                "बुआई का उचित समय",
                "कटाई की तारीख",
                "क्ष��त्रीय कैलेंडर"
              ]}
            />
          } />

          <Route path="/tools/irrigation" element={<IrrigationPlannerPage />} />
          <Route path="/tools/irrigation-old" element={
            <PlaceholderPage
              title="Irrigation Planner"
              titleHindi="सिंचाई योजना"
              description="फसल की पानी क��� आवश्यकता और सिंचाई की योजना।"
              features={[
                "पानी की आवश्यकता गणन��",
                "सिंचाई का समय",
                "ड्रिप सिस्टम डिजाइन",
                "पानी ���ी बचत तकनीक",
                "मौसम आधारित सिंचाई"
              ]}
            />
          } />

          <Route path="/tools/pest-identification" element={<PestIdentificationPage />} />
          <Route path="/tools/pest-old" element={
            <PlaceholderPage
              title="Pest Identification"
              titleHindi="कीट पहचान"
              description="फसल के कीट और रोगों की पहचान और उपचार���"
              features={[
                "कीट पहचान गाइड",
                "रोग के लक्षण",
                "जैविक उपचार",
                "रासायनिक नियंत्रण",
                "रोकथाम के उपाय"
              ]}
            />
          } />

          <Route path="/tools/fertilizer" element={<FertilizerGuidePage />} />
          <Route path="/tools/fertilizer-old" element={
            <PlaceholderPage
              title="Fertilizer Guide"
              titleHindi="उर्वरक गाइड"
              description="मिट्टी के अनुसार सही उर्वरक क�� च�����ाव और मात्रा।"
              features={[
                "मिट्टी परीक्षण गाइड",
                "NPK की आवश्यकता",
                "जैविक उर्वरक",
                "उर्वर�� का समय",
                "लागत प्रभावी विकल्प"
              ]}
            />
          } />

          <Route path="/tools/equipment" element={<EquipmentRentalPage />} />
          <Route path="/tools/equipment-old" element={
            <PlaceholderPage
              title="Equipment Rental"
              titleHindi="मशीन किराया"
              description="कृषि यंत्र और मशीनों का किराया और उपलब्धता।"
              features={[
                "मशीन की उपलब्धता",
                "क��राया दरें",
                "ऑनलाइन बुकिंग",
                "मशीन का रखरखाव",
                "स्थ��नीय सप्लायर"
              ]}
            />
          } />

          {/* Knowledge Center */}
          <Route path="/knowledge" element={<KnowledgePage />} />

          {/* Community Forum */}
          <Route path="/community" element={<CommunityPage />} />

          {/* Contact & Support */}
          <Route path="/contact" element={<ContactSupportPage />} />
          <Route path="/contact-old" element={
            <PlaceholderPage
              title="Contact & Support"
              titleHindi="संपर��क और सहायता"
              description="हमसे संपर्क करें या हेल्पलाइन से तुरंत सहायता पाएं।"
              features={[
                "24/7 किसान हेल्पलाइन",
                "ऑनलाइन चैट सहायता",
                "विशेषज्ञ से ���लाह",
                "तकनीकी सहायता",
                "फ���डबैक और सुझाव"
              ]}
            />
          } />

          <Route path="/calendar" element={<CalendarPage />} />

          {/* AI Advisor */}
          <Route path="/ai-advisor" element={
            <Layout>
              <div className="min-h-screen bg-kisan-bg py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
                      AI कृषि सलाहकार
                    </h1>
                    <p className="text-lg text-kisan-text-secondary font-devanagari">
                      अपनी फसल की तस्वीर अपलोड करें और तुरंत AI से विशे��ज्ञ सलाह पाएं
                    </p>
                  </div>
                  <CropAnalyzer />
                </div>
              </div>
            </Layout>
          } />

          {/* Crop Calendar (Footer Link) */}
          <Route path="/crop-calendar" element={
            <PlaceholderPage
              title="Crop Calendar"
              titleHindi="फसल कैल���ंडर"
              description="सभी प्रमुख फसलों ���े लिए बुआई से कटाई तक का व��स्तृत कैलेंडर।"
              features={[
                "धान, गेहूं, कपास, गन्ना कैलेंड���",
                "राज्य-वार कृषि कैलेंडर",
                "मासिक कृषि कार्य सूची",
                "मौसम आधारित सलाह",
                "त्यौहार ���र शुभ मुहूर्त",
                "कैले���डर डाउनलोड व प्रिंट"
              ]}
            />
          } />

          {/* Market Report (Homepage Quick Link) */}
          <Route path="/market-report" element={<MarketReportPage />} />

          {/* Crop Calendar (Footer Link) */}
          <Route path="/crop-calendar" element={<CropCalendarPage />} />

          {/* Irrigation Planner (Footer Link) */}
          <Route path="/irrigation-planner" element={<IrrigationPlannerPage />} />

          {/* Fertilizer Guide (Footer Link) */}
          <Route path="/fertilizer-guide" element={<FertilizerGuidePage />} />

          {/* Pest Management (Footer Link) */}
          <Route path="/pest-management" element={<PestIdentificationPage />} />

          {/* Video Tutorials (Homepage Quick Link) */}
          <Route path="/videos" element={
            <PlaceholderPage
              title="Video Tutorials"
              titleHindi="वी���ियो ट्यूट��रियल"
              description="ख���ती की त��नीकों के लिए विशेषज्ञों ���्वारा बनाए गए वीडियो ट्यूटोरियल।"
              features={[
                "फसल उ��ाने क�� विधि",
                "आधुनिक कृषि तकनीक",
                "कीट नियंत्रण वीडियो",
                "मशीन संचालन गाइड",
                "जैविक खेती विधि",
                "सफल किसानों के ��नुभव"
              ]}
            />
          } />

          {/* Registration Page (Homepage CTA) */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/register-old" element={
            <PlaceholderPage
              title="Registration"
              titleHindi="पंजीकरण"
              description="किसानमित्र में निःशुल्क पंजीकरण करें और सभी सुविधाओं का लाभ उठाएं।"
              features={[
                "निःशु��्क खाता बनाएं",
                "व्यक्त���गत डैशबोर्ड",
                "फसल ट्रैकिंग",
                "कस्टमाइज्ड सलाह",
                "समुदाय में भागीदारी",
                "प्रीमियम सुविधाएं"
              ]}
            />
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </LocationProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
