import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Mic, MicOff, Send, Volume2, VolumeX,
  Bot, User, Loader, X, Minimize2, Maximize2,
  Camera, Image, FileText, Phone, Video, Settings,
  RefreshCw, Download, Copy, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  isTyping?: boolean;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const { t, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout>();

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: Message = {
        id: '1',
        type: 'bot',
        content: currentLanguage === 'en' 
          ? "Hello! I'm your AI farming assistant. I can help you with crop problems, farming techniques, weather advice, and much more. You can type your questions or use voice input. How can I help you today?"
          : "नमस्कार! मैं आपका AI कृषि सहायक हूं। मैं फसल की समस्याओं, खेती की तकनीकों, मौसम की सलाह, और बहुत कुछ में आपकी मदद कर सकता हूं। आप अपने प्रश्न टाइप कर सकते हैं या आवाज का उपयोग कर सकते हैं। आज मैं आपकी कैसे मदद कर सकता हूं?",
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [currentLanguage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition and audio
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Speech recognition available
    }
  }, []);

  const sendMessage = async (content: string, audioUrl?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      audioUrl
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Send to AI chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          language: currentLanguage,
          context: 'agriculture'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response || 'मुझे खुशी होगी आपकी मदद करने में। कृपया अपना प्रश्न फिर से पूछें।',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Text-to-speech for bot response
      if (audioEnabled && data.response) {
        speakText(data.response);
      }
    } catch (error) {
      console.error('AI Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'मुझे खुशी होगी आपकी मदद करने में। कृपया अपना प्रश्न फिर से पूछें।',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        processRecording();
      };

      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('माइक्रोफोन एक्सेस की अनुमति आवश्यक है।');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const processRecording = async () => {
    if (audioChunks.length === 0) return;

    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);

    // In a real app, you would send the audio to a speech-to-text service
    // For now, we'll simulate the process
    const simulatedText = 'मेरी गेहूं की फसल में पीले पत्ते दिखाई दे रहे हैं। क्या करना चाहिए?';
    
    sendMessage(simulatedText, audioUrl);
    setAudioChunks([]);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'en' ? 'en-US' : 'hi-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('क्लिपबोर्ड में कॉपी हो गया!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-kisan-lg shadow-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold font-devanagari">
                {currentLanguage === 'en' ? 'AI Farm Assistant' : 'AI कृषि सहायक'}
              </h3>
              <p className="text-xs opacity-90 font-devanagari">
                {isTyping ? 'टाइप कर रहा है...' : 'ऑनलाइन'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-kisan-text-primary border border-border'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="h-4 w-4 mt-1 text-primary" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-devanagari">{message.content}</p>
                        {message.audioUrl && (
                          <div className="mt-2">
                            <audio controls className="w-full h-8">
                              <source src={message.audioUrl} type="audio/wav" />
                            </audio>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString('hi-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => copyToClipboard(message.content)}
                                className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => speakText(message.content)}
                                className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                              >
                                <Volume2 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-kisan-text-primary border border-border px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-white">
              {isRecording && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-kisan">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-700 font-devanagari">
                        रिकॉर्डिंग... {formatTime(recordingTime)}
                      </span>
                    </div>
                    <button
                      onClick={stopRecording}
                      className="text-red-600 hover:text-red-800 font-devanagari text-sm"
                    >
                      रोकें
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                    placeholder={currentLanguage === 'en' ? 'Type your farming question...' : 'अपना कृषि प्रश्न टाइप करें...'}
                    className="w-full px-4 py-2 border border-border rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={isRecording}
                  />
                </div>
                
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={() => sendMessage(inputText)}
                  disabled={!inputText.trim() || isRecording}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => sendMessage('मेरी फसल में कीट लग गए हैं, क्या करूं?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors font-devanagari"
                >
                  कीट समस्या
                </button>
                <button
                  onClick={() => sendMessage('मिट्टी की जांच कैसे करें?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors font-devanagari"
                >
                  मिट्टी जांच
                </button>
                <button
                  onClick={() => sendMessage('आज मौसम कैसा रहेगा?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors font-devanagari"
                >
                  मौसम जानकारी
                </button>
                <button
                  onClick={() => sendMessage('आज के मंडी भाव क्या हैं?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors font-devanagari"
                >
                  मंडी भाव
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
