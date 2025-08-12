import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf, Phone, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocationDisplay } from '../features/LocationPicker';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t, languages } = useLanguage();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.weather', href: '/weather' },
    { key: 'nav.tools', href: '/tools' },
    { key: 'nav.schemes', href: '/schemes' },
    { key: 'nav.market-prices', href: '/market-prices' },
    { key: 'nav.community', href: '/community' },
  ];

  const currentLangData = languages.find(l => l.code === currentLanguage);

  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 touch-target">
            <div className="bg-primary p-2 rounded-kisan">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-kisan-text-primary font-devanagari">
                {t('app.name')}
              </h1>
              <p className="text-xs text-kisan-text-muted font-latin">{t('app.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-kisan-text-secondary hover:text-primary hover:bg-secondary rounded-kisan transition-colors duration-200 touch-target"
              >
                <span className={currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'}>{t(item.key)}</span>
              </Link>
            ))}
          </nav>

          {/* Location, Language & Contact */}
          <div className="hidden lg:flex items-center space-x-3">
            <LocationDisplay showFullAddress />
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-kisan-text-secondary hover:text-primary rounded-kisan transition-colors touch-target"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLangData?.nativeName.slice(0, 3)}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-kisan shadow-lg border border-border z-50 max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                        currentLanguage === lang.code ? 'bg-primary/10 text-primary' : 'text-kisan-text-secondary'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-kisan-text-muted">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/contact"
              className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-kisan hover:bg-primary/90 transition-colors touch-target"
            >
              <Phone className="h-4 w-4" />
              <span className={currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'}>{t('nav.help')}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-kisan text-kisan-text-secondary hover:text-primary hover:bg-secondary transition-colors touch-target"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-3 text-base font-medium text-kisan-text-secondary hover:text-primary hover:bg-secondary rounded-kisan transition-colors touch-target-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'}>{t(item.key)}</span>
              </Link>
            ))}
            
            {/* Mobile Language & Contact */}
            <div className="pt-3 mt-3 border-t border-border space-y-1">
              <div className="px-3 py-3">
                <p className="text-sm font-medium text-kisan-text-primary mb-2 flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className={currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'}>{t('nav.language')}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.slice(0, 6).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-kisan-text-secondary hover:bg-primary/10'
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                to="/contact"
                className="w-full flex items-center justify-center space-x-2 px-3 py-3 bg-primary text-white rounded-kisan hover:bg-primary/90 transition-colors touch-target-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span className={currentLanguage === 'en' ? 'font-latin' : 'font-devanagari'}>{t('nav.help')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
