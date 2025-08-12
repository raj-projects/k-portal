import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { ChatMessage, ChatResponse } from '@shared/api';

interface ChatBotProps {
  className?: string;
}

const ChatBot = ({ className = '' }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'नमस्कार! मैं किसान मित्र AI हूँ। मैं आपकी खेती, फसल, मौसम, और कृषि संबंधी समस्याओं में मदद कर सकता हूँ। आप अपना प्रश्न हिंद�� या अंग्रेजी में पूछ सकते हैं।'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError('');

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation: newMessages.slice(-10) // Send last 10 messages for context
        }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.response || 'Failed to get response');
      }

      // Add AI response
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);

    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'चैट सेवा में त्रुटि');
      
      // Add fallback response
      const fallbackResponse = 'क्षमा करें, मुझे आपका उत्तर देने में समस्या हो रही है। कृपया बाद में प्रयास करें या स्थानीय कृषि विशेषज्ञ से संपर्क करें।';
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'नमस्कार! मैं किसान मित्र AI हूँ। ��ैं आपकी खेती, फसल, मौसम, और कृषि संबंधी समस्याओं में मदद कर सकता हूँ। आप अपना प्रश्न हिंदी या अंग्रेजी में पूछ सकते हैं।'
      }
    ]);
    setError('');
  };

  const formatMessage = (content: string) => {
    // Simple formatting for better readability
    return content.split('\n').map((line, index) => (
      <p key={index} className={index > 0 ? 'mt-2' : ''}>
        {line}
      </p>
    ));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110 z-50 ${className}`}
        style={{ minHeight: '56px', minWidth: '56px' }}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className={`bg-white rounded-kisan-lg shadow-xl border border-border transition-all duration-200 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-white rounded-t-kisan-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-medium font-devanagari">किसान मित्र AI</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-primary/80 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary/80 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-primary' : 'bg-green-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-kisan ${
                      message.role === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary/50 text-kisan-text-secondary'
                    }`}>
                      <div className={`text-sm ${message.role === 'user' ? '' : 'font-devanagari'}`}>
                        {formatMessage(message.content)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-2 max-w-[85%]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="p-3 rounded-kisan bg-secondary/50">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-devanagari">जवाब तैयार कर रहे हैं...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Error Display */}
            {error && (
              <div className="px-4 pb-2">
                <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs font-devanagari">{error}</span>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="अपना प्रश्न यहाँ लिखें..."
                  className="flex-1 p-2 border border-border rounded-kisan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-devanagari"
                  disabled={isLoading}
                  maxLength={1000}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-primary text-white p-2 rounded-kisan hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => setInput('मेरी गेहूं की फसल में पीले पत्ते आ रहे हैं, क्या करूं?')}
                  className="text-xs bg-secondary/50 text-kisan-text-muted px-2 py-1 rounded hover:bg-secondary transition-colors font-devanagari"
                >
                  फसल की समस्या
                </button>
                <button
                  onClick={() => setInput('आज बारिश हो रही है, खेत में क्या काम कर सकते हैं?')}
                  className="text-xs bg-secondary/50 text-kisan-text-muted px-2 py-1 rounded hover:bg-secondary transition-colors font-devanagari"
                >
                  मौसम सलाह
                </button>
                <button
                  onClick={clearChat}
                  className="text-xs bg-secondary/50 text-kisan-text-muted px-2 py-1 rounded hover:bg-secondary transition-colors font-devanagari"
                >
                  चैट साफ़ करें
                </button>
              </div>
              
              <p className="text-xs text-kisan-text-muted mt-2 font-devanagari">
                💡 सुझाव: स्थान, फसल का नाम, और समस्या का विवरण लिखें
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
