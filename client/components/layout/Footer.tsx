import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kisan-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-2 rounded-kisan">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-devanagari">किसानसेतु</h3>
                <p className="text-xs text-gray-300 font-latin">KisanSetu</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-devanagari">
              भारतीय किसानों के लिए एक निःशुल्क मंच। सभी खेती की जानकारी और उपकरण एक ही स्थान पर।
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mt-2 font-latin">
              A free platform for Indian farmers with all farming tools and real-time information in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-devanagari">त्वरित लिंक</h4>
            <ul className="space-y-2">
              <li><Link to="/weather" className="text-gray-300 hover:text-accent transition-colors font-devanagari">मौसम सलाह</Link></li>
              <li><Link to="/market-prices" className="text-gray-300 hover:text-accent transition-colors font-devanagari">मंडी भाव</Link></li>
              <li><Link to="/schemes" className="text-gray-300 hover:text-accent transition-colors font-devanagari">सरकारी योजनाएं</Link></li>
              <li><Link to="/tools" className="text-gray-300 hover:text-accent transition-colors font-devanagari">खेती उपकरण</Link></li>
              <li><Link to="/knowledge" className="text-gray-300 hover:text-accent transition-colors font-devanagari">खेती ज्ञान</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-devanagari">सेवाएं</h4>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-gray-300 hover:text-accent transition-colors font-devanagari">किसान समुदाय</Link></li>
              <li><Link to="/crop-calendar" className="text-gray-300 hover:text-accent transition-colors font-devanagari">फसल कैलेंडर</Link></li>
              <li><Link to="/fertilizer-guide" className="text-gray-300 hover:text-accent transition-colors font-devanagari">उर्वरक गाइड</Link></li>
              <li><Link to="/irrigation-planner" className="text-gray-300 hover:text-accent transition-colors font-devanagari">सिंचाई योजना</Link></li>
              <li><Link to="/pest-management" className="text-gray-300 hover:text-accent transition-colors font-devanagari">कीट प्रबंधन</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-devanagari">संपर्क करें</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-devanagari">किसान हेल्पलाइन</p>
                  <p className="text-white font-semibold">1800-180-1551</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <p className="text-white">support@kisansetu.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-devanagari">भारत में सभी राज्य</p>
                  <p className="text-gray-300 text-sm">All States of India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-gray-300 text-sm font-devanagari">
                © 2024 किसानसेतु। सभी अधिकार सुरक्षित।
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Made with ❤️ for Indian Farmers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
