import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('hi');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = {
    hi: {
      greeting: 'नमस्ते! मैं किसानमित्र बॉट हूं। मैं आपकी कृषि संबंधी समस्याओं में मदद कर सकता हूं। आप कैसे हैं?',
      weather: 'मौसम की जानकारी के लिए आप मौसम अपडेट सेक्शन में जा सकते हैं। वहां आपको विस्तृत मौसम की जानकारी मिलेगी।',
      crops: 'फसल की देखभाल के लिए हमारे फसल सलाह सेक्शन में जाएं। वहां आपको मौसम के अनुसार फसल की जानकारी मिलेगी।',
      prices: 'मंडी भाव देखने के लिए मंडी भाव सेक्शन में जाएं। वहां आपको सभी फसलों की ताज़ा कीमतें मिलेंगी।',
      pest: 'कीट की पहचान के लिए कीट पहचान सेक्शन का उपयोग करें। आप फसल की फोटो अपलोड करके तुरंत इलाज पा सकते हैं।',
      loan: 'ऋण क��� जानकारी के लिए वित्तीय उपकरण सेक्शन में जाएं। वहां कैलक्यूलेटर उपलब्ध हैं।',
      default: 'क्षमा करें, मैं इसका उत्तर नहीं दे सकता। कृपया अपना प्रश्न फिर से पूछें या हमारे समुदाय फोरम का उपयोग करें।'
    },
    en: {
      greeting: 'Hello! I am KisanMitra Bot. I can help you with agricultural problems. How are you?',
      weather: 'For weather information, please visit the Weather Updates section. You will get detailed weather information there.',
      crops: 'For crop care, visit our Crop Advice section. You will find seasonal crop information there.',
      prices: 'To check mandi rates, go to the Mandi Rates section. You will find latest prices for all crops there.',
      pest: 'For pest identification, use the Pest Detection section. You can upload crop photos and get instant treatment.',
      loan: 'For loan information, visit the Financial Tools section. Calculators are available there.',
      default: 'Sorry, I cannot answer this. Please ask your question again or use our community forum.'
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add greeting message when chatbot opens for the first time
      const greetingMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        message: botResponses[language as keyof typeof botResponses].greeting,
        timestamp: new Date()
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responses = botResponses[language as keyof typeof botResponses];
    
    if (message.includes('मौसम') || message.includes('weather') || message.includes('बारिश') || message.includes('rain')) {
      return responses.weather;
    } else if (message.includes('फसल') || message.includes('crop') || message.includes('खेती') || message.includes('farming')) {
      return responses.crops;
    } else if (message.includes('भाव') || message.includes('price') || message.includes('मंडी') || message.includes('mandi')) {
      return responses.prices;
    } else if (message.includes('कीट') || message.includes('pest') || message.includes('बीमारी') || message.includes('disease')) {
      return responses.pest;
    } else if (message.includes('ऋण') || message.includes('loan') || message.includes('पैसा') || message.includes('money')) {
      return responses.loan;
    } else {
      return responses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { hi: 'आज का मौसम क्या है?', en: 'What is today\'s weather?' },
    { hi: 'गेहूं का भाव क्या है?', en: 'What is wheat price?' },
    { hi: 'कीट की पहचान कैसे करें?', en: 'How to identify pests?' },
    { hi: 'ऋण कैसे लें?', en: 'How to get loan?' }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-farm-600 hover:bg-farm-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 sm:w-96 sm:h-[500px]">
          <Card className="h-full border-farm-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-farm-600 to-farm-500 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-farm-700 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">किसानमित्र बॉट</CardTitle>
                    <p className="text-xs opacity-90">
                      {language === 'hi' ? 'ऑनलाइन - तुरंत मदद' : 'Online - Instant Help'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                    className="text-white hover:bg-farm-700 h-6 w-6 p-0"
                  >
                    {language === 'hi' ? 'EN' : 'हिं'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-farm-700 h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-farm-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-2 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.type === 'bot' && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-farm-500 text-white">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-farm-600 text-white'
                            : 'bg-white text-farm-700 border border-farm-200'
                        }`}
                      >
                        {message.message}
                        <div className={`text-xs mt-1 opacity-70`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      {message.type === 'user' && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-harvest-500 text-white">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-farm-500 text-white">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white p-3 rounded-lg border border-farm-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-farm-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-farm-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-farm-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-2 bg-white border-t border-farm-200">
                  <p className="text-xs text-farm-600 mb-2">
                    {language === 'hi' ? 'त्वरित प्रश्न:' : 'Quick Questions:'}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {quickQuestions.map((q, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => setInputMessage(q[language as keyof typeof q])}
                        className="text-xs border-farm-300 text-farm-700 hover:bg-farm-50 h-8"
                      >
                        {q[language as keyof typeof q]}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-farm-200">
                <div className="flex items-center space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      language === 'hi' 
                        ? 'अपना सवाल यहां लिखें...' 
                        : 'Type your question here...'
                    }
                    className="flex-1 border-farm-300 text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-farm-600 hover:bg-farm-700 h-8 w-8 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-farm-300 text-farm-700 hover:bg-farm-50 h-8 w-8 p-0"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
