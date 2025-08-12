import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageCircle, Clock, MapPin, Headphones, FileText, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SupportTicket {
  name: string;
  email: string;
  phone: string;
  category: string;
  priority: string;
  subject: string;
  message: string;
}

interface FAQ {
  question: string;
  questionHindi: string;
  answer: string;
  answerHindi: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I register on Kisansetu?",
    questionHindi: "किसानसेतु पर पंजीकरण कैसे करें?",
    answer: "Click on the Register button and fill out the 4-step form with your personal, address, farming, and preference details.",
    answerHindi: "रजिस्टर बटन पर क्लिक करें और 4-चरणीय फॉर्म में अपनी व्यक्तिगत, पता, खेती, और पसंद की जानकारी भरें।",
    category: "account"
  },
  {
    question: "Is the pest identification accurate?",
    questionHindi: "क्या कीट पहचान सटीक है?",
    answer: "Our AI-powered pest identification system has 85%+ accuracy. For best results, take clear photos in good lighting.",
    answerHindi: "हमारा AI-संचालित कीट पहचान सिस्टम 85%+ सटीक है। बेहतर परिणामों के लिए, अच्छी रोशनी में स्पष्ट तस्वीरें लें।",
    category: "features"
  },
  {
    question: "How do I book equipment for rent?",
    questionHindi: "उपकरण किराए पर कैसे बुक करें?",
    answer: "Go to Equipment Rental, browse available equipment, select your preferred item, and fill the booking form with dates and duration.",
    answerHindi: "उपकरण किराया पर जाएं, उपलब्ध उपकरण ब्राउज�� करें, अपना पसंदीदा आइटम चुनें, और तारीखों व अवधि के साथ बुकिंग फॉर्म भरें।",
    category: "equipment"
  },
  {
    question: "Are the market prices real-time?",
    questionHindi: "क्या बाजार की कीमतें रीयल-टाइम हैं?",
    answer: "Market prices are updated daily from major mandis across India. We aggregate data from multiple reliable sources.",
    answerHindi: "बाजार की कीमतें भारत भर की प्रमुख मंडियों से दैनिक अपडेट की जाती हैं। हम कई विश्वसनीय स्रोतों से डेटा एकत्र करते हैं।",
    category: "pricing"
  },
  {
    question: "How do I use the fertilizer calculator?",
    questionHindi: "उर्वरक कैलकुलेटर का उपयोग कैसे करें?",
    answer: "Select your crop, enter land area and expected yield. Optionally add soil test data for more accurate recommendations.",
    answerHindi: "अपनी फसल चुनें, भूमि क्षेत्र और अपेक्���ित उत्पादन दर्ज करें। अधिक सटीक सिफारिशों के लिए वैकल्पिक रूप से मिट्टी परीक्षण डेटा जोड़ें।",
    category: "tools"
  }
];

const supportCategories = [
  { value: 'technical', label: 'Technical Support', labelHindi: 'तकनीकी सहायता' },
  { value: 'account', label: 'Account Issues', labelHindi: 'खाता संबंधी समस्याएं' },
  { value: 'equipment', label: 'Equipment Rental', labelHindi: 'उपकरण किराया' },
  { value: 'pricing', label: 'Pricing & Billing', labelHindi: 'मूल्य निर्धारण और बिलिंग' },
  { value: 'features', label: 'Feature Request', labelHindi: 'फीचर अनुरोध' },
  { value: 'other', label: 'Other', labelHindi: 'अन्य' }
];

const ContactSupport = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('contact');
  const [selectedFAQCategory, setSelectedFAQCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ticketData, setTicketData] = useState<SupportTicket>({
    name: '',
    email: '',
    phone: '',
    category: '',
    priority: 'medium',
    subject: '',
    message: ''
  });

  const updateTicketData = (field: keyof SupportTicket, value: string) => {
    setTicketData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const filteredFAQs = selectedFAQCategory && selectedFAQCategory !== 'all'
    ? faqs.filter(faq => faq.category === selectedFAQCategory)
    : faqs;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-kisan-text-primary mb-4">
              {language === 'hi' ? 'सहायता टिकट बना!' : 'Support Ticket Created!'}
            </h2>
            <p className="text-kisan-text-secondary mb-6">
              {language === 'hi' 
                ? 'आपका सहायता अनुरोध सफलतापूर्वक जमा हो गया है। हम 24 घंटे क��� भीतर आपसे संपर्क करेंगे।'
                : 'Your support request has been submitted successfully. We will contact you within 24 hours.'
              }
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>{language === 'hi' ? 'टिकट ID:' : 'Ticket ID:'}</strong> #KM{Math.random().toString(36).substr(2, 8).toUpperCase()}
              </p>
            </div>
            <Button 
              onClick={() => { setIsSubmitted(false); setTicketData({ name: '', email: '', phone: '', category: '', priority: 'medium', subject: '', message: '' }); }}
              variant="outline"
            >
              {language === 'hi' ? 'नया टिकट बनाएं' : 'Create New Ticket'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Headphones className="h-6 w-6" />
            {language === 'hi' ? 'संपर्क और सहायता' : 'Contact & Support'}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Quick Contact Options */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-kisan-text-primary mb-2">
              {language === 'hi' ? '24/7 हेल्पलाइन' : '24/7 Helpline'}
            </h3>
            <p className="text-kisan-text-secondary mb-4">
              {language === 'hi' ? 'तुरंत सहायता के लिए कॉल करें' : 'Call for immediate assistance'}
            </p>
            <div className="space-y-1">
              <p className="font-bold text-lg">1800-123-KISAN</p>
              <p className="text-sm text-kisan-text-secondary">
                {language === 'hi' ? 'निःशुल्क टोल-फ्री नंबर' : 'Free toll-free number'}
              </p>
            </div>
            <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
              <Phone className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-kisan-text-primary mb-2">
              {language === 'hi' ? 'लाइव चैट' : 'Live Chat'}
            </h3>
            <p className="text-kisan-text-secondary mb-4">
              {language === 'hi' ? 'विशेषज्ञों से तुरंत बात करें' : 'Chat instantly with experts'}
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">
                {language === 'hi' ? 'ऑनलाइन' : 'Online'}
              </span>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'चैट शुरू करें' : 'Start Chat'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-kisan-text-primary mb-2">
              {language === 'hi' ? 'ईमेल सहायता' : 'Email Support'}
            </h3>
            <p className="text-kisan-text-secondary mb-4">
              {language === 'hi' ? 'विस्तृत सहायता के लिए ईमेल करें' : 'Email for detailed support'}
            </p>
            <div className="space-y-1 mb-4">
              <p className="font-bold">support@kisansetu.com</p>
              <p className="text-sm text-kisan-text-secondary">
                {language === 'hi' ? '24 घंटे के भीतर जवाब' : 'Response within 24 hours'}
              </p>
            </div>
            <Button 
              onClick={() => setActiveTab('ticket')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              {language === 'hi' ? 'टिकट बनाएं' : 'Create Ticket'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Clock className="h-5 w-5" />
            {language === 'hi' ? 'सहायता समय' : 'Support Hours'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">
                {language === 'hi' ? 'फोन सहायता:' : 'Phone Support:'}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'सोमवार - शुक्रवार:' : 'Monday - Friday:'}</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'शनिवार - रविवार:' : 'Saturday - Sunday:'}</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'आपातकाल:' : 'Emergency:'}</span>
                  <span className="font-medium text-green-600">
                    {language === 'hi' ? 'हमेशा उपलब्ध' : 'Always Available'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">
                {language === 'hi' ? 'चैट और ईमेल:' : 'Chat & Email:'}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'चैट सहायता:' : 'Chat Support:'}</span>
                  <span className="font-medium">6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'ईमेल जवाब:' : 'Email Response:'}</span>
                  <span className="font-medium">24 {language === 'hi' ? 'घंटे' : 'hours'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'भाषा सहायता:' : 'Language Support:'}</span>
                  <span className="font-medium">
                    {language === 'hi' ? 'हिंदी, अंग्रेजी' : 'Hindi, English'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <FileText className="h-5 w-5" />
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedFAQCategory} onValueChange={setSelectedFAQCategory}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder={language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}
                </SelectItem>
                {supportCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {language === 'hi' ? category.labelHindi : category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <Card key={index} className="border-l-4 border-l-kisan-primary">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-kisan-text-primary mb-2">
                    {language === 'hi' ? faq.questionHindi : faq.question}
                  </h4>
                  <p className="text-kisan-text-secondary">
                    {language === 'hi' ? faq.answerHindi : faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <FileText className="h-5 w-5" />
            {language === 'hi' ? 'सहायता टिकट बनाएं' : 'Create Support Ticket'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{language === 'hi' ? 'पूरा नाम' : 'Full Name'} *</Label>
              <Input
                value={ticketData.name}
                onChange={(e) => updateTicketData('name', e.target.value)}
                placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'hi' ? 'ईमेल पता' : 'Email Address'} *</Label>
              <Input
                type="email"
                value={ticketData.email}
                onChange={(e) => updateTicketData('email', e.target.value)}
                placeholder={language === 'hi' ? 'example@email.com' : 'example@email.com'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}</Label>
              <Input
                type="tel"
                value={ticketData.phone}
                onChange={(e) => updateTicketData('phone', e.target.value)}
                placeholder={language === 'hi' ? '9876543210' : '9876543210'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'hi' ? 'समस्या श्रेणी' : 'Issue Category'} *</Label>
              <Select value={ticketData.category} onValueChange={(value) => updateTicketData('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'श्रेणी चुनें' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  {supportCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {language === 'hi' ? category.labelHindi : category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'hi' ? 'प्राथमिकता' : 'Priority'}</Label>
              <Select value={ticketData.priority} onValueChange={(value) => updateTicketData('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{language === 'hi' ? 'कम' : 'Low'}</SelectItem>
                  <SelectItem value="medium">{language === 'hi' ? 'मध्यम' : 'Medium'}</SelectItem>
                  <SelectItem value="high">{language === 'hi' ? 'उच्च' : 'High'}</SelectItem>
                  <SelectItem value="urgent">{language === 'hi' ? 'तुरंत' : 'Urgent'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{language === 'hi' ? 'विषय' : 'Subject'} *</Label>
              <Input
                value={ticketData.subject}
                onChange={(e) => updateTicketData('subject', e.target.value)}
                placeholder={language === 'hi' ? 'समस्या का संक्षिप्त विवरण' : 'Brief description of the issue'}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{language === 'hi' ? 'विस्तृत विवरण' : 'Detailed Description'} *</Label>
              <Textarea
                value={ticketData.message}
                onChange={(e) => updateTicketData('message', e.target.value)}
                placeholder={language === 'hi' 
                  ? 'कृपया समस्या का विस्तृत विवरण दें। क्या हुआ था, आपने क्या कोशिश की, और आप क्या उम्मीद कर रहे थे।'
                  : 'Please provide a detailed description of the issue. What happened, what you tried, and what you expected.'
                }
                rows={5}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !ticketData.name || !ticketData.email || !ticketData.category || !ticketData.subject || !ticketData.message}
              className="bg-kisan-primary hover:bg-kisan-primary/90"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {language === 'hi' ? 'जमा हो रहा है...' : 'Submitting...'}
                </div>
              ) : (
                language === 'hi' ? 'टिकट जमा करें' : 'Submit Ticket'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Office Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <MapPin className="h-5 w-5" />
            {language === 'hi' ? 'हमारे कार्यालय' : 'Our Offices'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-kisan-text-primary mb-2">
                {language === 'hi' ? 'मुख्य कार्यालय' : 'Head Office'}
              </h4>
              <div className="space-y-1 text-sm text-kisan-text-secondary">
                <p>Kisansetu Technologies Pvt. Ltd.</p>
                <p>Sector 18, Gurugram, Haryana - 122015</p>
                <p>{language === 'hi' ? 'फोन:' : 'Phone:'} +91-124-4567890</p>
                <p>{language === 'hi' ? 'ईमेल:' : 'Email:'} info@kisansetu.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-kisan-text-primary mb-2">
                {language === 'hi' ? 'क्षेत्रीय कार्यालय' : 'Regional Office'}
              </h4>
              <div className="space-y-1 text-sm text-kisan-text-secondary">
                <p>Kisansetu Regional Center</p>
                <p>Krishi Bhawan, Ludhiana, Punjab - 141001</p>
                <p>{language === 'hi' ? 'फोन:' : 'Phone:'} +91-161-2345678</p>
                <p>{language === 'hi' ? 'ईमेल:' : 'Email:'} punjab@kisansetu.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSupport;
