import { useState } from 'react';
import { Bot, MessageCircle } from 'lucide-react';
import AIAssistant from './AIAssistant';
import { useLanguage } from '../../contexts/LanguageContext';

const FloatingAIButton = () => {
  const { currentLanguage } = useLanguage();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsAIOpen(!isAIOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <div className="relative">
            {isAIOpen ? (
              <MessageCircle className="h-6 w-6" />
            ) : (
              <Bot className="h-6 w-6" />
            )}
            
            {/* Notification dot (optional) */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </button>

        {/* Tooltip */}
        {isHovered && !isAIOpen && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black bg-opacity-80 text-white text-sm rounded-lg whitespace-nowrap font-devanagari">
            {currentLanguage === 'en' ? 'AI Farm Assistant' : 'AI कृषि सहायक'}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black border-opacity-80"></div>
          </div>
        )}
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
      />
    </>
  );
};

export default FloatingAIButton;
