import { Link } from 'react-router-dom';
import { ArrowRight, Users, Leaf, TrendingUp, Calendar, Play, BookOpen, MessageSquare } from 'lucide-react';
import Layout from '../components/layout/Layout';
import WeatherWidget from '../components/widgets/WeatherWidget';
import MarketPricesWidget from '../components/widgets/MarketPricesWidget';
import QuickToolsWidget from '../components/widgets/QuickToolsWidget';
import SchemesWidget from '../components/widgets/SchemesWidget';
import NewsWidget from '../components/widgets/NewsWidget';
import { useLocation } from '../components/features/LocationPicker';

const HomePage = () => {
  const { currentLocation } = useLocation();
  const features = [
    {
      icon: Leaf,
      title: 'वास्तविक समय डेटा',
      titleEn: 'Real-time Data',
      description: 'मौसम, मंडी भाव और फसल की जानकारी लाइव अपडेट के साथ',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Users,
      title: 'किसान समुदाय',
      titleEn: 'Farmer Community',
      description: 'अन्य किसानों से जुड़ें और अनुभव सा���ा करें',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'बाजार विश्लेषण',
      titleEn: 'Market Analysis',
      description: 'फसल की कीमतों के ट्रेंड और भविष्यवाणी',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Calendar,
      title: 'फसल कैलेंडर',
      titleEn: 'Crop Calendar',
      description: 'बुआई से कटाई तक का पूरा शेड्यूल',
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  const quickLinks = [
    { icon: BookOpen, title: 'खेती गाइड', href: '/knowledge' },
    { icon: MessageSquare, title: 'समुदाय', href: '/community' },
    { icon: Play, title: 'वीडियो ट्यूटोरियल', href: '/videos' },
    { icon: TrendingUp, title: 'बाजार रिपोर्ट', href: '/market-report' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kisan-bg via-white to-green-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-kisan-text-primary mb-6">
                <span className="font-devanagari block mb-2">किसानसेतु</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-kisan-text-secondary font-latin">
                  Your Farming Companion
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-kisan-text-secondary mb-8 leading-relaxed font-devanagari">
                भारतीय किसानों के लिए एक निःशुल्क मंच। 
                सभी खेती की जानकारी, उपकरण और वास्तविक समय की डेटा एक ही स्थान पर।
              </p>
              <p className="text-base text-kisan-text-muted mb-8 font-latin">
                A free platform for Indian farmers with all farming tools and real-time information in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/weather"
                  className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-kisan-lg hover:bg-primary/90 transition-colors font-medium touch-target-lg"
                >
                  <span className="font-devanagari">शुरू करें</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/tools"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-kisan-lg hover:bg-primary/5 transition-colors font-medium touch-target-lg"
                >
                  <span className="font-devanagari">उपकरण देखें</span>
                </Link>
              </div>
            </div>
            
            {/* Hero Image/Stats */}
            <div className="relative">
              <div className="bg-white rounded-kisan-lg shadow-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">12L+</div>
                    <div className="text-sm text-kisan-text-muted font-devanagari">पंजीकृत किसान</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-kisan-text-muted font-devanagari">फसल प्रकार</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                    <div className="text-sm text-kisan-text-muted font-devanagari">मंडी केंद्र</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-kisan-text-muted font-devanagari">सहायता</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.href}
                  className="group flex flex-col items-center p-4 rounded-kisan hover:bg-secondary transition-colors touch-target"
                >
                  <IconComponent className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-kisan-text-secondary font-devanagari text-center">
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Widgets */}
      <section className="py-12 bg-kisan-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <WeatherWidget />
              <NewsWidget />
              <QuickToolsWidget />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <MarketPricesWidget />
              <SchemesWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-kisan-text-primary mb-4 font-devanagari">
              किसानसेतु की विशेषताएं
            </h2>
            <p className="text-lg text-kisan-text-secondary font-devanagari">
              आधुनिक तकनीक के साथ पारंपरिक खेती को बेहतर बनाएं
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex p-4 rounded-kisan-lg mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-kisan-text-primary mb-2 font-devanagari">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-kisan-text-muted font-devanagari leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-devanagari">
            आज ही जुड़ें किसानसेतु परिवार से
          </h2>
          <p className="text-xl text-green-100 mb-8 font-devanagari">
            लाखों किसान पहले से ही अपनी फसल की उत्पादकता बढ़ा रहे हैं
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-accent text-kisan-text-primary px-8 py-4 rounded-kisan-lg hover:bg-accent/90 transition-colors font-medium text-lg touch-target-lg"
          >
            <span className="font-devanagari">मुफ्त में शुरू करें</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
