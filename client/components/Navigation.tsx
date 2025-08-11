import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Cloud, TrendingUp, BookOpen, Calculator, Users, Phone, Gift, Play, Wrench, Moon, Sun, MessageCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('hi'); // Hindi as default
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'hi' ? 'en' : 'hi');
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const navItems = [
    {
      href: '/mausam',
      icon: Cloud,
      label: { hi: 'मौसम', en: 'Weather' }
    },
    {
      href: '/mandi-bhav',
      icon: TrendingUp,
      label: { hi: 'मंडी भाव', en: 'Mandi Bhav' }
    },
    {
      href: '/fasal-salah',
      icon: Wrench,
      label: { hi: 'फसल सलाह', en: 'Fasal Salah' }
    },
    {
      href: '/sarkari-yojana',
      icon: Gift,
      label: { hi: 'सरकारी योजना', en: 'Sarkari Yojana' }
    },
    {
      href: '/krishi-samachar',
      icon: BookOpen,
      label: { hi: 'कृषि समाचार', en: 'Krishi Samachar' }
    },
    {
      href: '/beemari-pehchan',
      icon: Users,
      label: { hi: 'बीमारी पहचान', en: 'Beemari Pehchan' }
    },
    {
      href: '/krishi-calendar',
      icon: Calendar,
      label: { hi: 'कृषि कैलेंडर', en: 'Krishi Calendar' }
    },
    {
      href: '/samuday',
      icon: MessageCircle,
      label: { hi: 'समुदाय', en: 'Samuday' }
    }
  ];

  return (
    <nav className="bg-white shadow-md border-b-2 border-farm-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-farm-500 to-harvest-400 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">🌾</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-farm-700">किसानमित्र</span>
              <div className="text-xs text-farm-600">KisanMitra</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-farm-700 hover:bg-farm-50 hover:text-farm-900 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label[language as keyof typeof item.label]}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="hidden sm:flex items-center space-x-1 border-farm-300 text-farm-700 hover:bg-farm-50 dark:text-farm-300 dark:border-farm-600 dark:hover:bg-farm-800"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1 border-farm-300 text-farm-700 hover:bg-farm-50 dark:text-farm-300 dark:border-farm-600 dark:hover:bg-farm-800"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'hi' ? 'EN' : 'हिं'}</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden text-farm-700 hover:bg-farm-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-farm-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-farm-700 hover:bg-farm-50 hover:text-farm-900 transition-colors border-b border-farm-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label[language as keyof typeof item.label]}</span>
                </Link>
              ))}
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex-1 border-farm-300 text-farm-700 hover:bg-farm-50 dark:text-farm-300 dark:border-farm-600 dark:hover:bg-farm-800"
                >
                  {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {isDarkMode ? (language === 'hi' ? 'लाइट' : 'Light') : (language === 'hi' ? 'डार्क' : 'Dark')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex-1 border-farm-300 text-farm-700 hover:bg-farm-50 dark:text-farm-300 dark:border-farm-600 dark:hover:bg-farm-800"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'hi' ? 'English' : 'हिंदी'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
