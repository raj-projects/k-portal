import { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Leaf,
  Bug,
  Droplets,
  Thermometer,
  Clock,
  Star,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PestDetection = () => {
  const [language, setLanguage] = useState('hi');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = {
    hi: {
      title: 'कीट एवं रोग पहचान',
      subtitle: 'अपनी फसल की फोटो अपलोड करें और तुरंत कीट या रोग की पहचान पाएं',
      uploadImage: 'फोटो अपलोड करें',
      takePhoto: 'फोटो खींचें',
      analyzing: 'विश्लेषण हो रहा है...',
      uploadInstructions: 'अच्छी गुणवत्ता की फोटो अपलोड करें। फोटो में कीट या रोग स्पष्ट रूप से दिखना चाहिए।',
      commonPests: 'आम कीट एवं रोग',
      preventiveTips: 'बचाव के उपाय',
      treatment: 'इलाज',
      severity: 'गंभीरता',
      confidence: 'विश्वसनीयता',
      recommendations: 'सुझाव',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      tryAgain: 'दोबारा कोशिश करें',
      detectionHistory: 'पहचान का इतिहास'
    },
    en: {
      title: 'Pest & Disease Detection',
      subtitle: 'Upload your crop photo and get instant pest or disease identification',
      uploadImage: 'Upload Photo',
      takePhoto: 'Take Photo',
      analyzing: 'Analyzing...',
      uploadInstructions: 'Upload a good quality photo. The pest or disease should be clearly visible in the photo.',
      commonPests: 'Common Pests & Diseases',
      preventiveTips: 'Preventive Measures',
      treatment: 'Treatment',
      severity: 'Severity',
      confidence: 'Confidence',
      recommendations: 'Recommendations',
      downloadReport: 'Download Report',
      tryAgain: 'Try Again',
      detectionHistory: 'Detection History'
    }
  };

  const commonPests = [
    {
      name: { hi: 'पत्ती में छेद करने वाला कीड़ा', en: 'Leaf Borer' },
      description: { hi: 'पत्तियों में छोटे छेद बनाता है', en: 'Creates small holes in leaves' },
      crops: { hi: 'धान, गेहूं, मक्का', en: 'Rice, Wheat, Maize' },
      severity: 'medium',
      icon: Bug
    },
    {
      name: { hi: 'फंगल रोग', en: 'Fungal Disease' },
      description: { hi: 'पत्तियों पर भूरे या काले धब्बे', en: 'Brown or black spots on leaves' },
      crops: { hi: 'टमाटर, आलू, बैंगन', en: 'Tomato, Potato, Brinjal' },
      severity: 'high',
      icon: Leaf
    },
    {
      name: { hi: 'माहू कीट', en: 'Aphids' },
      description: { hi: 'पत्तियों का रस चूसता है', en: 'Sucks sap from leaves' },
      crops: { hi: 'सरसों, गेहूं, जौ', en: 'Mustard, Wheat, Barley' },
      severity: 'low',
      icon: Bug
    },
    {
      name: { hi: 'जड़ सड़न रोग', en: 'Root Rot' },
      description: { hi: 'पौधे की जड़ें सड़ जाती हैं', en: 'Plant roots start rotting' },
      crops: { hi: 'सभी फसलें', en: 'All Crops' },
      severity: 'high',
      icon: AlertTriangle
    }
  ];

  const preventiveTips = [
    { hi: 'नियमित रूप से खेत का निरीक्षण करें', en: 'Regularly inspect your field' },
    { hi: 'संक्रमित पौधों को तुरंत हटाएं', en: 'Remove infected plants immediately' },
    { hi: 'जैविक कीटनाशकों का प्रयोग करें', en: 'Use organic pesticides' },
    { hi: 'फसल चक्र अपनाएं', en: 'Practice crop rotation' },
    { hi: 'पानी क�� उचित व्यवस्था करें', en: 'Maintain proper water management' }
  ];

  const mockAnalysisResult = {
    detected: {
      name: { hi: 'पत्ती में छेद करने वाला कीड़ा (लीफ बोरर)', en: 'Leaf Borer Pest' },
      confidence: 87,
      severity: 'medium',
      description: { 
        hi: 'यह कीट पत्तियों में छोटे छेद बनाता है और फसल की गुणवत्ता को प्रभावित करता है।',
        en: 'This pest creates small holes in leaves and affects crop quality.'
      }
    },
    treatment: {
      immediate: [
        { hi: 'संक्रमित पत्तियों को तुरंत हटाएं', en: 'Remove infected leaves immediately' },
        { hi: 'नीम का तेल या साबुन का पानी छिड़कें', en: 'Spray neem oil or soapy water' },
        { hi: 'खेत की सफाई करें', en: 'Clean the field area' }
      ],
      longTerm: [
        { hi: 'जैविक कीटनाशक का नियमित प्रयोग', en: 'Regular use of biological pesticides' },
        { hi: 'प्राकृतिक शत्रु कीटों को बढ़ावा दें', en: 'Encourage natural predator insects' },
        { hi: 'फसल चक्र अपनाएं', en: 'Practice crop rotation' }
      ]
    },
    prevention: [
      { hi: 'नियमित निरीक्षण करें', en: 'Regular field inspection' },
      { hi: 'उचित दूरी पर बुआई करें', en: 'Maintain proper spacing while sowing' },
      { hi: 'संतुलित उर्वरक का प्रयोग', en: 'Use balanced fertilizers' }
    ]
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisResult(mockAnalysisResult);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityText = (severity: string) => {
    const texts = {
      hi: { high: 'उच्च', medium: 'मध्यम', low: 'कम' },
      en: { high: 'High', medium: 'Medium', low: 'Low' }
    };
    return texts[language as keyof typeof texts][severity as keyof typeof texts.hi];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-farm-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-farm-700 mb-2">
            {content[language as keyof typeof content].title}
          </h1>
          <p className="text-lg text-farm-600 max-w-3xl mx-auto">
            {content[language as keyof typeof content].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Detection Area */}
          <div className="lg:col-span-2">
            {/* Upload Section */}
            <Card className="mb-6 border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700 flex items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  {content[language as keyof typeof content].uploadImage}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-farm-300 rounded-lg p-8 text-center">
                  {!selectedImage ? (
                    <div>
                      <Upload className="h-16 w-16 mx-auto text-farm-400 mb-4" />
                      <p className="text-farm-600 mb-4">
                        {content[language as keyof typeof content].uploadInstructions}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-farm-600 hover:bg-farm-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {content[language as keyof typeof content].uploadImage}
                        </Button>
                        <Button variant="outline" className="border-farm-300 text-farm-700">
                          <Camera className="h-4 w-4 mr-2" />
                          {content[language as keyof typeof content].takePhoto}
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={selectedImage}
                        alt="Uploaded crop"
                        className="max-w-full h-64 object-contain mx-auto rounded-lg mb-4"
                      />
                      {isAnalyzing && (
                        <div className="mb-4">
                          <p className="text-farm-700 mb-2">
                            {content[language as keyof typeof content].analyzing}
                          </p>
                          <Progress value={analysisProgress} className="w-full" />
                          <p className="text-sm text-farm-600 mt-1">{analysisProgress}%</p>
                        </div>
                      )}
                      <Button
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalysisResult(null);
                        }}
                        variant="outline"
                        className="border-farm-300 text-farm-700"
                      >
                        {content[language as keyof typeof content].tryAgain}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResult && (
              <Card className="mb-6 border-farm-200">
                <CardHeader>
                  <CardTitle className="text-farm-700 flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    {language === 'hi' ? 'पहचान परिणाम' : 'Detection Results'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Detection Summary */}
                    <div className="bg-farm-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-farm-700">
                          {analysisResult.detected.name[language as keyof typeof analysisResult.detected.name]}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getSeverityColor(analysisResult.detected.severity)} text-white`}>
                            {content[language as keyof typeof content].severity}: {getSeverityText(analysisResult.detected.severity)}
                          </Badge>
                          <Badge variant="outline" className="border-farm-300">
                            {content[language as keyof typeof content].confidence}: {analysisResult.detected.confidence}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-farm-600">
                        {analysisResult.detected.description[language as keyof typeof analysisResult.detected.description]}
                      </p>
                    </div>

                    {/* Treatment Recommendations */}
                    <div>
                      <h4 className="text-lg font-bold text-farm-700 mb-3 flex items-center">
                        <Droplets className="mr-2 h-5 w-5" />
                        {content[language as keyof typeof content].treatment}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <h5 className="font-semibold text-red-700 mb-2">
                            {language === 'hi' ? 'तत्काल उपचार' : 'Immediate Treatment'}
                          </h5>
                          <ul className="space-y-1">
                            {analysisResult.treatment.immediate.map((step: any, index: number) => (
                              <li key={index} className="text-sm text-red-600 flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                {step[language as keyof typeof step]}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-700 mb-2">
                            {language === 'hi' ? 'दीर्घकालिक उपचार' : 'Long-term Treatment'}
                          </h5>
                          <ul className="space-y-1">
                            {analysisResult.treatment.longTerm.map((step: any, index: number) => (
                              <li key={index} className="text-sm text-blue-600 flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                {step[language as keyof typeof step]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Prevention Tips */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-semibold text-green-700 mb-2 flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        {language === 'hi' ? 'भविष्य में बचाव' : 'Future Prevention'}
                      </h5>
                      <ul className="space-y-1">
                        {analysisResult.prevention.map((tip: any, index: number) => (
                          <li key={index} className="text-sm text-green-600 flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            {tip[language as keyof typeof tip]}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-farm-600 hover:bg-farm-700">
                        <Download className="h-4 w-4 mr-2" />
                        {content[language as keyof typeof content].downloadReport}
                      </Button>
                      <Button variant="outline" className="border-farm-300 text-farm-700">
                        <Star className="h-4 w-4 mr-2" />
                        {language === 'hi' ? 'विशेषज्ञ से सलाह लें' : 'Consult Expert'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Pests */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {content[language as keyof typeof content].commonPests}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonPests.map((pest, index) => (
                    <div key={index} className="p-3 bg-farm-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(pest.severity)}`}>
                          <pest.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-farm-700 text-sm">
                            {pest.name[language as keyof typeof pest.name]}
                          </h4>
                          <p className="text-xs text-farm-600 mt-1">
                            {pest.description[language as keyof typeof pest.description]}
                          </p>
                          <p className="text-xs text-farm-500 mt-1">
                            {pest.crops[language as keyof typeof pest.crops]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preventive Tips */}
            <Card className="border-farm-200">
              <CardHeader>
                <CardTitle className="text-farm-700">
                  {content[language as keyof typeof content].preventiveTips}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {preventiveTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-farm-600">
                        {tip[language as keyof typeof tip]}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Impact */}
            <Card className="border-harvest-300 bg-gradient-to-r from-harvest-50 to-farm-50">
              <CardHeader>
                <CardTitle className="text-farm-700 flex items-center">
                  <Thermometer className="mr-2 h-5 w-5" />
                  {language === 'hi' ? 'मौसम का प्रभाव' : 'Weather Impact'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-farm-600" />
                    <span className="text-farm-700">
                      {language === 'hi' ? 'उच्च नमी: कवक रोगों की संभावना' : 'High humidity: Risk of fungal diseases'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-farm-600" />
                    <span className="text-farm-700">
                      {language === 'hi' ? 'बारिश के बाद: कीट प्रकोप बढ़ सकता है' : 'After rain: Pest outbreak may increase'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-farm-600" />
                    <span className="text-farm-700">
                      {language === 'hi' ? 'त��पमान 25-30°C: कीट गतिविधि चरम पर' : 'Temperature 25-30°C: Peak pest activity'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDetection;
