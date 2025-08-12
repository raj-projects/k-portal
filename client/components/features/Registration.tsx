import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, User, Mail, Phone, MapPin, Users, Tractor, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  farmSize: string;
  farmType: string;
  crops: string[];
  experience: string;
  hasEquipment: boolean;
  equipment: string;
  interests: string[];
  termsAccepted: boolean;
  marketingConsent: boolean;
}

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
];

const crops = [
  { value: 'wheat', label: 'Wheat', labelHindi: 'गेहूं' },
  { value: 'rice', label: 'Rice', labelHindi: 'चावल' },
  { value: 'cotton', label: 'Cotton', labelHindi: 'कपास' },
  { value: 'sugarcane', label: 'Sugarcane', labelHindi: 'गन्ना' },
  { value: 'maize', label: 'Maize', labelHindi: 'मक्का' },
  { value: 'soybean', label: 'Soybean', labelHindi: 'सोयाबीन' },
  { value: 'mustard', label: 'Mustard', labelHindi: 'सरसों' },
  { value: 'barley', label: 'Barley', labelHindi: 'जौ' },
  { value: 'tea', label: 'Tea', labelHindi: 'चाय' },
  { value: 'coffee', label: 'Coffee', labelHindi: 'कॉफी' }
];

const interests = [
  { value: 'modern-farming', label: 'Modern Farming Techniques', labelHindi: 'आधुनिक खेती तकनीक' },
  { value: 'organic-farming', label: 'Organic Farming', labelHindi: 'जैविक खेती' },
  { value: 'equipment-rental', label: 'Equipment Rental', labelHindi: 'उपकरण किराया' },
  { value: 'market-prices', label: 'Market Prices', labelHindi: 'बाजार भाव' },
  { value: 'weather-updates', label: 'Weather Updates', labelHindi: 'मौसम अपडेट' },
  { value: 'government-schemes', label: 'Government Schemes', labelHindi: 'सरकारी योजनाएं' },
  { value: 'crop-insurance', label: 'Crop Insurance', labelHindi: 'फसल बीमा' },
  { value: 'community-support', label: 'Community Support', labelHindi: 'समुदायिक सहायता' }
];

const Registration = () => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    village: '',
    farmSize: '',
    farmType: '',
    crops: [],
    experience: '',
    hasEquipment: false,
    equipment: '',
    interests: [],
    termsAccepted: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'Required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone';
        break;
      
      case 2:
        if (!formData.state) newErrors.state = 'Required';
        if (!formData.district.trim()) newErrors.district = 'Required';
        if (!formData.village.trim()) newErrors.village = 'Required';
        break;
      
      case 3:
        if (!formData.farmSize) newErrors.farmSize = 'Required';
        if (!formData.farmType) newErrors.farmType = 'Required';
        if (formData.crops.length === 0) newErrors.crops = ['At least one crop required'] as any;
        if (!formData.experience) newErrors.experience = 'Required';
        break;
      
      case 4:
        if (!formData.termsAccepted) newErrors.termsAccepted = true;
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
    }, 2000);
  };

  const toggleCrop = (crop: string) => {
    const newCrops = formData.crops.includes(crop)
      ? formData.crops.filter(c => c !== crop)
      : [...formData.crops, crop];
    updateFormData('crops', newCrops);
  };

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    updateFormData('interests', newInterests);
  };

  if (isRegistered) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-kisan-text-primary mb-4">
              {language === 'hi' ? 'पंजीकरण सफल!' : 'Registration Successful!'}
            </h2>
            <p className="text-kisan-text-secondary mb-6">
              {language === 'hi' 
                ? 'आपका खाता सफलतापूर्वक बन गया है। आप अब सभी सुविधाओं का लाभ उठा सकते हैं।'
                : 'Your account has been created successfully. You can now access all features.'
              }
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-kisan-primary hover:bg-kisan-primary/90">
                {language === 'hi' ? 'डैशबोर्ड पर जाएं' : 'Go to Dashboard'}
              </Button>
              <Button variant="outline" className="w-full">
                {language === 'hi' ? 'प्रोफ़ाइल पूर्ण करें' : 'Complete Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${currentStep >= step 
                  ? 'bg-kisan-primary text-white' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {step}
              </div>
              {step < 4 && (
                <div className={`
                  h-1 w-16 md:w-24 mx-2
                  ${currentStep > step ? 'bg-kisan-primary' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={currentStep >= 1 ? 'text-kisan-primary font-medium' : 'text-gray-500'}>
            {language === 'hi' ? 'व्यक्तिगत' : 'Personal'}
          </span>
          <span className={currentStep >= 2 ? 'text-kisan-primary font-medium' : 'text-gray-500'}>
            {language === 'hi' ? 'पता' : 'Address'}
          </span>
          <span className={currentStep >= 3 ? 'text-kisan-primary font-medium' : 'text-gray-500'}>
            {language === 'hi' ? 'खेती' : 'Farming'}
          </span>
          <span className={currentStep >= 4 ? 'text-kisan-primary font-medium' : 'text-gray-500'}>
            {language === 'hi' ? 'सुविधाएं' : 'Preferences'}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <UserPlus className="h-6 w-6" />
            {language === 'hi' ? 'किसानसेतु में पंजीकरण' : 'Register with Kisansetu'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-kisan-text-primary">
                {language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'पहला नाम' : 'First Name'} *</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder={language === 'hi' ? 'अपना पहला नाम दर्ज करें' : 'Enter your first name'}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'अंतिम नाम' : 'Last Name'} *</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder={language === 'hi' ? 'अपना अंतिम नाम दर्ज करें' : 'Enter your last name'}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'ईमेल पता' : 'Email Address'} *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder={language === 'hi' ? 'example@email.com' : 'example@email.com'}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">
                    {language === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Enter valid email'}
                  </p>}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder={language === 'hi' ? '9876543210' : '9876543210'}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-sm text-red-500">
                    {language === 'hi' ? 'वैध मोबाइल नंबर दर्ज करें' : 'Enter valid mobile number'}
                  </p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-kisan-text-primary">
                {language === 'hi' ? 'पता की जानकारी' : 'Address Information'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'राज्य' : 'State'} *</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                    <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                      <SelectValue placeholder={language === 'hi' ? 'राज्य चुनें' : 'Select state'} />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'जिला' : 'District'} *</Label>
                  <Input
                    value={formData.district}
                    onChange={(e) => updateFormData('district', e.target.value)}
                    placeholder={language === 'hi' ? 'अपना जिला दर्ज करें' : 'Enter your district'}
                    className={errors.district ? 'border-red-500' : ''}
                  />
                  {errors.district && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>{language === 'hi' ? 'गांव/शहर' : 'Village/City'} *</Label>
                  <Input
                    value={formData.village}
                    onChange={(e) => updateFormData('village', e.target.value)}
                    placeholder={language === 'hi' ? 'अपना गांव या शहर दर्ज करें' : 'Enter your village or city'}
                    className={errors.village ? 'border-red-500' : ''}
                  />
                  {errors.village && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Farming Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-kisan-text-primary">
                {language === 'hi' ? 'खेती की जानकारी' : 'Farming Information'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'खेत का आकार' : 'Farm Size'} *</Label>
                  <Select value={formData.farmSize} onValueChange={(value) => updateFormData('farmSize', value)}>
                    <SelectTrigger className={errors.farmSize ? 'border-red-500' : ''}>
                      <SelectValue placeholder={language === 'hi' ? 'आकार चुनें' : 'Select size'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">{language === 'hi' ? '1-5 एकड़' : '1-5 Acres'}</SelectItem>
                      <SelectItem value="medium">{language === 'hi' ? '5-20 एकड़' : '5-20 Acres'}</SelectItem>
                      <SelectItem value="large">{language === 'hi' ? '20+ एकड़' : '20+ Acres'}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.farmSize && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'खेती का प्रकार' : 'Farm Type'} *</Label>
                  <Select value={formData.farmType} onValueChange={(value) => updateFormData('farmType', value)}>
                    <SelectTrigger className={errors.farmType ? 'border-red-500' : ''}>
                      <SelectValue placeholder={language === 'hi' ? 'प्रकार चुनें' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">{language === 'hi' ? 'पारंपरिक' : 'Traditional'}</SelectItem>
                      <SelectItem value="organic">{language === 'hi' ? 'जैविक' : 'Organic'}</SelectItem>
                      <SelectItem value="modern">{language === 'hi' ? 'आधुनिक' : 'Modern'}</SelectItem>
                      <SelectItem value="mixed">{language === 'hi' ? 'मिश्रित' : 'Mixed'}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.farmType && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'खेती का अनुभव' : 'Farming Experience'} *</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                    <SelectTrigger className={errors.experience ? 'border-red-500' : ''}>
                      <SelectValue placeholder={language === 'hi' ? 'अनुभव चुनें' : 'Select experience'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{language === 'hi' ? '1-2 साल' : '1-2 Years'}</SelectItem>
                      <SelectItem value="intermediate">{language === 'hi' ? '3-10 साल' : '3-10 Years'}</SelectItem>
                      <SelectItem value="experienced">{language === 'hi' ? '10+ साल' : '10+ Years'}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-sm text-red-500">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === 'hi' ? 'आपकी फसलें' : 'Your Crops'} *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {crops.map((crop) => (
                    <div key={crop.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop.value}
                        checked={formData.crops.includes(crop.value)}
                        onCheckedChange={() => toggleCrop(crop.value)}
                      />
                      <label htmlFor={crop.value} className="text-sm cursor-pointer">
                        {language === 'hi' ? crop.labelHindi : crop.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.crops && <p className="text-sm text-red-500">{language === 'hi' ? 'कम से कम एक फसल चुनें' : 'Select at least one crop'}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasEquipment"
                    checked={formData.hasEquipment}
                    onCheckedChange={(checked) => updateFormData('hasEquipment', checked)}
                  />
                  <label htmlFor="hasEquipment" className="text-sm cursor-pointer">
                    {language === 'hi' ? 'क्या आपके पास कृषि उपकरण हैं?' : 'Do you have farming equipment?'}
                  </label>
                </div>
                
                {formData.hasEquipment && (
                  <Textarea
                    value={formData.equipment}
                    onChange={(e) => updateFormData('equipment', e.target.value)}
                    placeholder={language === 'hi' ? 'अपने उपकरणों की सूची दें' : 'List your equipment'}
                    rows={3}
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-kisan-text-primary">
                {language === 'hi' ? 'सुविधाएं और रुचियां' : 'Preferences & Interests'}
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? 'आपकी रुचियां' : 'Your Interests'}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <div key={interest.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest.value}
                          checked={formData.interests.includes(interest.value)}
                          onCheckedChange={() => toggleInterest(interest.value)}
                        />
                        <label htmlFor={interest.value} className="text-sm cursor-pointer">
                          {language === 'hi' ? interest.labelHindi : interest.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                      className={errors.termsAccepted ? 'border-red-500' : ''}
                    />
                    <label htmlFor="terms" className="text-sm cursor-pointer">
                      {language === 'hi' 
                        ? 'मैं नियम और शर्तों से सहमत हूं और गोपनीयता नीति को स्वीकार करता हूं।'
                        : 'I agree to the Terms & Conditions and accept the Privacy Policy.'
                      } *
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="text-sm text-red-500 ml-6">{language === 'hi' ? 'आवश्यक' : 'Required'}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => updateFormData('marketingConsent', checked)}
                    />
                    <label htmlFor="marketing" className="text-sm cursor-pointer">
                      {language === 'hi' 
                        ? 'मुझे कृषि संबंधी जानकारी और अपडेट प्राप्त करना है।'
                        : 'I want to receive farming related information and updates.'
                      }
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              onClick={prevStep}
              variant="outline"
              disabled={currentStep === 1}
            >
              {language === 'hi' ? 'पिछला' : 'Previous'}
            </Button>
            
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-kisan-primary hover:bg-kisan-primary/90">
                {language === 'hi' ? 'अगला' : 'Next'}
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !formData.termsAccepted}
                className="bg-kisan-primary hover:bg-kisan-primary/90"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {language === 'hi' ? 'पंजीकरण हो रहा है...' : 'Registering...'}
                  </div>
                ) : (
                  language === 'hi' ? 'पंजीकरण पूरा करें' : 'Complete Registration'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
