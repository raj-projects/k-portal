import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Sprout, Scissors, Droplets, Bug, CalendarDays, Download, Printer, MapPin, Clock, Star, Sun, Cloud, CloudRain } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CropActivity {
  month: number;
  day?: number;
  activity: string;
  activityHindi: string;
  type: 'planting' | 'irrigation' | 'fertilizer' | 'pestControl' | 'harvesting' | 'other';
  description: string;
  descriptionHindi: string;
  weatherAdvice?: string;
  weatherAdviceHindi?: string;
}

interface CropCalendarData {
  name: string;
  nameHindi: string;
  season: 'kharif' | 'rabi' | 'zaid';
  activities: CropActivity[];
}

interface Festival {
  date: string;
  name: string;
  nameHindi: string;
  significance: string;
  significanceHindi: string;
  auspicious: boolean;
}

const cropCalendarData: Record<string, CropCalendarData> = {
  wheat: {
    name: 'Wheat',
    nameHindi: 'गेहूं',
    season: 'rabi',
    activities: [
      {
        month: 11,
        day: 15,
        activity: 'Land Preparation & Sowing',
        activityHindi: 'भूमि तैयारी और बुआई',
        type: 'planting',
        description: 'Prepare field and sow wheat seeds. Optimal temperature: 18-25°C',
        descriptionHindi: 'खेत तैयार करें और गेहूं के बीज बोएं। उत्तम तापमान: 18-25°C',
        weatherAdvice: 'Avoid sowing during rainy days. Ensure soil moisture is adequate.',
        weatherAdviceHindi: 'बारिश ��े दिनों में बुआई न करें। मिट्टी की नमी पर्याप्त हो।'
      },
      {
        month: 12,
        day: 20,
        activity: 'First Irrigation',
        activityHindi: 'पहली सिंचाई',
        type: 'irrigation',
        description: 'Apply first irrigation 20-25 days after sowing',
        descriptionHindi: 'बुआई के 20-25 दिन बाद पहली सिंचाई करें',
        weatherAdvice: 'Monitor soil moisture. Reduce irrigation if rainfall occurs.',
        weatherAdviceHindi: 'मिट्टी की नमी देखें। बारिश होने पर सिंचाई कम करें।'
      },
      {
        month: 1,
        day: 15,
        activity: 'Fertilizer Application',
        activityHindi: 'उर्वरक प्रयोग',
        type: 'fertilizer',
        description: 'Apply nitrogen fertilizer for better growth',
        descriptionHindi: 'बेहतर वृद्धि के लिए नाइट्रोजन उर्वरक डालें',
        weatherAdvice: 'Apply fertilizer when weather is clear and no rain expected for 24 hours.',
        weatherAdviceHindi: 'मौसम साफ हो और 24 ���ंटे बारिश न होने पर उर्वरक डालें।'
      },
      {
        month: 2,
        day: 10,
        activity: 'Pest Control',
        activityHindi: 'कीट नियंत्रण',
        type: 'pestControl',
        description: 'Monitor and control pests and diseases',
        descriptionHindi: 'कीट और रोगों की निगरानी और नियंत्रण करें',
        weatherAdvice: 'Spray pesticides during calm weather, avoid windy conditions.',
        weatherAdviceHindi: 'शांत मौसम में छिड़काव करें, तेज हवा से बचें।'
      },
      {
        month: 3,
        day: 5,
        activity: 'Second Irrigation',
        activityHindi: 'दूसरी सिंचाई',
        type: 'irrigation',
        description: 'Apply irrigation during grain filling stage',
        descriptionHindi: 'दाना भरने के समय सिंचाई करें',
        weatherAdvice: 'Critical stage - ensure adequate water supply regardless of weather.',
        weatherAdviceHindi: 'महत्वपूर्ण अवस्था - मौसम की परवाह किए बिना पानी दें।'
      },
      {
        month: 4,
        day: 15,
        activity: 'Harvesting',
        activityHindi: 'कटाई',
        type: 'harvesting',
        description: 'Harvest when grains are mature and golden',
        descriptionHindi: 'दाना पकने और सुनहरा होने पर कटाई करें',
        weatherAdvice: 'Harvest during dry weather. Avoid harvesting if rain is expected.',
        weatherAdviceHindi: 'सूखे मौसम में कटाई करें। बारिश की संभावना हो तो कटाई न करें।'
      }
    ]
  },
  rice: {
    name: 'Rice',
    nameHindi: 'धान',
    season: 'kharif',
    activities: [
      {
        month: 6,
        day: 1,
        activity: 'Nursery Preparation',
        activityHindi: 'नर्सरी तैयारी',
        type: 'planting',
        description: 'Prepare nursery beds and sow rice seeds',
        descriptionHindi: 'नर्सरी की क्यारी तैयार करें और धान के बीज बोएं',
        weatherAdvice: 'Wait for monsoon arrival. Ensure adequate water supply.',
        weatherAdviceHindi: 'मानसून आने का इंतजार करें। पानी की ��र्याप्त व्यवस्था सुनिश्चित करें।'
      },
      {
        month: 7,
        day: 1,
        activity: 'Transplanting',
        activityHindi: 'रोपाई',
        type: 'planting',
        description: 'Transplant 25-30 day old seedlings',
        descriptionHindi: '25-30 दिन पुराने पौधों की रोपाई करें',
        weatherAdvice: 'Best done during cloudy weather to reduce transplant shock.',
        weatherAdviceHindi: 'बादल वाले मौसम में करें ताकि पौधों को नुकसान न हो।'
      },
      {
        month: 8,
        day: 15,
        activity: 'First Fertilizer',
        activityHindi: 'पहला उर्वरक',
        type: 'fertilizer',
        description: 'Apply nitrogen fertilizer after transplanting',
        descriptionHindi: 'रोपाई के बाद नाइट्रोजन उर्वरक डालें',
        weatherAdvice: 'Apply during moderate rainfall. Heavy rain may wash away nutrients.',
        weatherAdviceHindi: 'हल्की बारिश में डालें। तेज बारिश पोषक तत्व बहा सकती है।'
      },
      {
        month: 9,
        day: 10,
        activity: 'Pest Management',
        activityHindi: 'कीट प्रबंधन',
        type: 'pestControl',
        description: 'Control stem borer and other pests',
        descriptionHindi: 'तना छेदक और अन्य कीटों का नियंत्रण करें',
        weatherAdvice: 'High humidity increases pest activity. Monitor closely during wet weather.',
        weatherAdviceHindi: 'अधिक नमी से कीट बढ़ते हैं। गीले मौसम में ध्यान से देखें।'
      },
      {
        month: 10,
        day: 1,
        activity: 'Second Fertilizer',
        activityHindi: 'दूसरा उर्वरक',
        type: 'fertilizer',
        description: 'Apply fertilizer during panicle formation',
        descriptionHindi: 'बालियों के निकलने के समय उर्वरक डालें',
        weatherAdvice: 'Apply when fields are not waterlogged from recent rains.',
        weatherAdviceHindi: 'जब खेत में पानी भरा न हो तब डालें।'
      },
      {
        month: 11,
        day: 15,
        activity: 'Harvesting',
        activityHindi: '��टाई',
        type: 'harvesting',
        description: 'Harvest when grains are golden yellow',
        descriptionHindi: 'दाना सुनहरा पीला होने पर कटाई करें',
        weatherAdvice: 'Harvest before winter rains. Clear weather ensures better grain quality.',
        weatherAdviceHindi: 'सर्दी की बारिश से पहले काटें। साफ मौसम में अच्छा अनाज मिलता है।'
      }
    ]
  },
  cotton: {
    name: 'Cotton',
    nameHindi: 'कपास',
    season: 'kharif',
    activities: [
      {
        month: 5,
        day: 15,
        activity: 'Land Preparation',
        activityHindi: 'भूमि तैयारी',
        type: 'other',
        description: 'Deep plowing and field preparation',
        descriptionHindi: 'गहरी जुताई और खेत की तैयारी',
        weatherAdvice: 'Prepare field during dry weather for better soil structure.',
        weatherAdviceHindi: 'सूखे मौसम में तैयारी करें ताकि मिट्टी अच्छी बने।'
      },
      {
        month: 6,
        day: 15,
        activity: 'Sowing',
        activityHindi: 'बुआई',
        type: 'planting',
        description: 'Sow cotton seeds with proper spacing',
        descriptionHindi: 'उचित दूरी पर कपास के बीज बोएं',
        weatherAdvice: 'Sow after first good monsoon shower for better germination.',
        weatherAdviceHindi: 'पहली अच्छी बारिश के बाद बोएं, बेहतर अंकुरण होगा।'
      },
      {
        month: 7,
        day: 20,
        activity: 'First Irrigation',
        activityHindi: 'पहली सिंचाई',
        type: 'irrigation',
        description: 'Apply irrigation if rainfall is insufficient',
        descriptionHindi: 'यदि वर्षा कम हो तो सिंचाई करें',
        weatherAdvice: 'Supplement irrigation only if monsoon is delayed or inadequate.',
        weatherAdviceHindi: 'केवल मानसून देर से आए या कम हो तो सिंचाई करें।'
      },
      {
        month: 8,
        day: 15,
        activity: 'Pest Control',
        activityHindi: 'कीट नियंत्रण',
        type: 'pestControl',
        description: 'Control bollworm and other cotton pests',
        descriptionHindi: 'बॉलवर्म और अन्य कपास के कीटों का नियंत्रण करें',
        weatherAdvice: 'Monitor pest levels closely during humid weather conditions.',
        weatherAdviceHindi: 'नम मौसम में कीटों पर कड़ी नजर रखें।'
      },
      {
        month: 9,
        day: 10,
        activity: 'Fertilizer Application',
        activityHindi: 'उर्वरक प्रयोग',
        type: 'fertilizer',
        description: 'Apply fertilizer during flowering stage',
        descriptionHindi: 'फूल आने के समय उर्वरक डालें',
        weatherAdvice: 'Apply during dry spells between rain showers.',
        weatherAdviceHindi: 'बारिश के बीच सूखे समय में डालें।'
      },
      {
        month: 10,
        day: 15,
        activity: 'First Picking',
        activityHindi: 'पहली तुड़ाई',
        type: 'harvesting',
        description: 'Start picking mature cotton bolls',
        descriptionHindi: 'पके हुए कपास के फल तोड़ना शुरू करें',
        weatherAdvice: 'Pick during dry weather to maintain fiber quality.',
        weatherAdviceHindi: 'सू���े मौसम में तोड़ें ताकि रेशे की गुणवत्ता बनी रहे।'
      },
      {
        month: 11,
        day: 15,
        activity: 'Second Picking',
        activityHindi: 'दूसरी तुड़ाई',
        type: 'harvesting',
        description: 'Continue picking cotton bolls',
        descriptionHindi: 'कपास की तुड़ाई जारी रखें',
        weatherAdvice: 'Complete picking before winter sets in.',
        weatherAdviceHindi: 'सर्दी आने से पहले तुड़ाई पूरी करें।'
      }
    ]
  },
  sugarcane: {
    name: 'Sugarcane',
    nameHindi: 'गन्ना',
    season: 'rabi',
    activities: [
      {
        month: 10,
        day: 1,
        activity: 'Land Preparation',
        activityHindi: 'भूमि तैयारी',
        type: 'other',
        description: 'Deep plowing and furrow preparation',
        descriptionHindi: 'गहरी जुताई और नाली तैयार करना',
        weatherAdvice: 'Prepare land when soil moisture is optimal, not too wet.',
        weatherAdviceHindi: 'जब मिट्टी की नमी उचित हो तब तैयार करें, ���्यादा गीली न हो।'
      },
      {
        month: 2,
        day: 15,
        activity: 'Planting',
        activityHindi: 'रोपाई',
        type: 'planting',
        description: 'Plant sugarcane setts in furrows',
        descriptionHindi: 'नालियों में गन्ने की कलम लगाएं',
        weatherAdvice: 'Plant during cool weather for better establishment.',
        weatherAdviceHindi: 'ठंडे मौसम में लगाएं, बेहतर स्थापना होगी।'
      },
      {
        month: 4,
        day: 1,
        activity: 'First Irrigation',
        activityHindi: 'पहली सिंचाई',
        type: 'irrigation',
        description: 'Apply irrigation after planting',
        descriptionHindi: 'रोपाई के बाद सिंचाई करें',
        weatherAdvice: 'Increase irrigation frequency as temperature rises in summer.',
        weatherAdviceHindi: 'गर्मी बढ़ने पर सिंचाई की मात्रा बढ़ाएं।'
      },
      {
        month: 6,
        day: 15,
        activity: 'Fertilizer Application',
        activityHindi: 'उर्वरक प्रयोग',
        type: 'fertilizer',
        description: 'Apply nitrogen and phosphorus fertilizer',
        descriptionHindi: 'नाइट्रोजन और फास्फोरस उर्वरक डालें',
        weatherAdvice: 'Apply before monsoon for better nutrient absorption.',
        weatherAdviceHindi: 'मानसून से पहले डालें, बेहतर पोषण मिलेगा।'
      },
      {
        month: 8,
        day: 20,
        activity: 'Pest Control',
        activityHindi: 'कीट नियंत्रण',
        type: 'pestControl',
        description: 'Control shoot borer and other pests',
        descriptionHindi: 'शूट बोरर और अन्य कीटों का नियंत्रण करें',
        weatherAdvice: 'Monitor for increased pest activity during monsoon season.',
        weatherAdviceHindi: 'मानसून में कीटों की बढ़ी गतिविधि पर नजर रखें।'
      },
      {
        month: 12,
        day: 1,
        activity: 'Harvesting Begins',
        activityHindi: 'कटाई शुरू',
        type: 'harvesting',
        description: 'Start harvesting mature sugarcane',
        descriptionHindi: 'पके हुए गन्ने की कटाई शुरू करें',
        weatherAdvice: 'Harvest during cool, dry weather for maximum sugar content.',
        weatherAdviceHindi: 'ठंडे, सूखे मौसम में काट��ं, ज्यादा चीनी मिलेगी।'
      }
    ]
  }
};

const stateCalendars: Record<string, { name: string; nameHindi: string; adjustments: Record<string, { monthShift: number; notes: string; notesHindi: string }> }> = {
  punjab: {
    name: 'Punjab',
    nameHindi: 'पंजाब',
    adjustments: {
      wheat: { monthShift: 0, notes: 'Optimal conditions', notesHindi: 'उत्तम परिस्थितियां' },
      rice: { monthShift: 0, notes: 'Major rice producing state', notesHindi: 'मुख्य धान उत्पादक राज्य' }
    }
  },
  haryana: {
    name: 'Haryana',
    nameHindi: 'हरियाणा',
    adjustments: {
      wheat: { monthShift: 0, notes: 'Similar to Punjab conditions', notesHindi: 'पंजाब जैसी परिस्थितियां' },
      rice: { monthShift: 0, notes: 'Good irrigation facilities', notesHindi: 'अच्छी सिंचाई सुविधा' }
    }
  },
  up: {
    name: 'Uttar Pradesh',
    nameHindi: 'उत्तर प्रदेश',
    adjustments: {
      wheat: { monthShift: 0, notes: 'Eastern UP may delay by 2 weeks', notesHindi: 'पूर्वी यूपी में 2 सप्ताह देरी हो सकती है' },
      sugarcane: { monthShift: 0, notes: 'Largest sugarcane producer', notesHindi: 'सबसे बड़ा गन्ना उत्पादक' }
    }
  },
  maharashtra: {
    name: 'Maharashtra',
    nameHindi: 'महाराष्ट्र',
    adjustments: {
      cotton: { monthShift: 0, notes: 'Major cotton producing state', notesHindi: 'मुख्य कपास उत्पादक राज्य' },
      sugarcane: { monthShift: 1, notes: 'Later planting due to climate', notesHindi: 'जलवायु के कारण देर से रोपाई' }
    }
  },
  gujarat: {
    name: 'Gujarat',
    nameHindi: 'गुजरात',
    adjustments: {
      cotton: { monthShift: -1, notes: 'Earlier sowing possible', notesHindi: 'जल्दी बुआई संभव' },
      wheat: { monthShift: 1, notes: 'Later sowing due to heat', notesHindi: 'गर्मी के कारण देर से बुआई' }
    }
  }
};

const festivals: Festival[] = [
  {
    date: '2024-03-08',
    name: 'Holi',
    nameHindi: 'होली',
    significance: 'Good time for spring crops',
    significanceHindi: 'वसंती फसलों के लिए शुभ समय',
    auspicious: true
  },
  {
    date: '2024-04-14',
    name: 'Baisakhi',
    nameHindi: '���ैसाखी',
    significance: 'Harvest festival - Wheat harvesting time',
    significanceHindi: 'फसल त्योहार - गेहूं की कटाई का समय',
    auspicious: true
  },
  {
    date: '2024-06-21',
    name: 'Summer Solstice',
    nameHindi: 'ग्रीष्म संक्रांति',
    significance: 'Monsoon crops planning',
    significanceHindi: 'मानसूनी फसलों की योजना',
    auspicious: true
  },
  {
    date: '2024-09-17',
    name: 'Ganesh Chaturthi',
    nameHindi: 'गणेश चतुर्थी',
    significance: 'Auspicious for new agricultural ventures',
    significanceHindi: 'नए कृषि कार्यों के लिए शुभ',
    auspicious: true
  },
  {
    date: '2024-10-02',
    name: 'Gandhi Jayanti',
    nameHindi: 'गांधी जयंती',
    significance: 'Focus on organic farming',
    significanceHindi: 'जैविक खेती पर ध्यान',
    auspicious: true
  },
  {
    date: '2024-11-15',
    name: 'Kartik Purnima',
    nameHindi: 'कार्तिक पूर्णिमा',
    significance: 'Auspicious for wheat sowing',
    significanceHindi: 'गेहूं की बुआई के लिए शुभ',
    auspicious: true
  }
];

const months = [
  { num: 1, name: 'January', nameHindi: 'जनवरी', season: 'winter' },
  { num: 2, name: 'February', nameHindi: 'फरवरी', season: 'winter' },
  { num: 3, name: 'March', nameHindi: 'मार्च', season: 'spring' },
  { num: 4, name: 'April', nameHindi: 'अप्रैल', season: 'spring' },
  { num: 5, name: 'May', nameHindi: 'मई', season: 'summer' },
  { num: 6, name: 'June', nameHindi: 'जून', season: 'monsoon' },
  { num: 7, name: 'July', nameHindi: 'जुलाई', season: 'monsoon' },
  { num: 8, name: 'August', nameHindi: 'अगस्त', season: 'monsoon' },
  { num: 9, name: 'September', nameHindi: 'सितंबर', season: 'monsoon' },
  { num: 10, name: 'October', nameHindi: 'अक्टूबर', season: 'autumn' },
  { num: 11, name: 'November', nameHindi: 'नवंबर', season: 'winter' },
  { num: 12, name: 'December', nameHindi: 'दिसंबर', season: 'winter' }
];

const activityIcons = {
  planting: Sprout,
  irrigation: Droplets,
  fertilizer: Calendar,
  pestControl: Bug,
  harvesting: Scissors,
  other: CalendarDays
};

const activityColors = {
  planting: 'bg-green-100 text-green-800',
  irrigation: 'bg-blue-100 text-blue-800',
  fertilizer: 'bg-yellow-100 text-yellow-800',
  pestControl: 'bg-red-100 text-red-800',
  harvesting: 'bg-orange-100 text-orange-800',
  other: 'bg-gray-100 text-gray-800'
};

const weatherIcons = {
  winter: Cloud,
  spring: Sun,
  summer: Sun,
  monsoon: CloudRain,
  autumn: Cloud
};

const CropCalendar = () => {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [activeTab, setActiveTab] = useState('calendar');

  const filteredActivities = useMemo(() => {
    if (!selectedCrop) return [];
    
    const crop = cropCalendarData[selectedCrop];
    if (!crop) return [];

    let activities = [...crop.activities];

    // Apply state-specific adjustments
    if (selectedState && stateCalendars[selectedState] && stateCalendars[selectedState].adjustments[selectedCrop]) {
      const adjustment = stateCalendars[selectedState].adjustments[selectedCrop];
      activities = activities.map(activity => ({
        ...activity,
        month: Math.max(1, Math.min(12, activity.month + adjustment.monthShift))
      }));
    }

    if (selectedMonth && selectedMonth !== 'all') {
      return activities.filter(activity => activity.month === parseInt(selectedMonth));
    }
    
    return activities.sort((a, b) => a.month - b.month);
  }, [selectedCrop, selectedMonth, selectedState]);

  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().toISOString().split('T')[0];

  const upcomingFestivals = festivals.filter(festival => 
    new Date(festival.date) >= new Date()
  ).slice(0, 5);

  const monthlyTasks = useMemo(() => {
    const tasks: Record<number, CropActivity[]> = {};
    
    Object.values(cropCalendarData).forEach(crop => {
      crop.activities.forEach(activity => {
        if (!tasks[activity.month]) {
          tasks[activity.month] = [];
        }
        tasks[activity.month].push({
          ...activity,
          cropName: crop.name,
          cropNameHindi: crop.nameHindi
        } as CropActivity & { cropName: string; cropNameHindi: string });
      });
    });
    
    return tasks;
  }, []);

  const handleDownloadCalendar = () => {
    if (!selectedCrop) return;
    
    const crop = cropCalendarData[selectedCrop];
    const csvContent = [
      ['Month', 'Activity', 'Type', 'Description', 'Weather Advice'],
      ...filteredActivities.map(activity => [
        months[activity.month - 1].name,
        activity.activity,
        activity.type,
        activity.description,
        activity.weatherAdvice || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${crop.name}_calendar.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrintCalendar = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-kisan-primary">
            <Calendar className="h-6 w-6" />
            {language === 'hi' ? 'फसल कैलेंडर' : 'Crop Calendar'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'राज्य चुनें' : 'Select State'}
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'राज्य चुनें' : 'Choose state'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'hi' ? 'सभी राज्य' : 'All States'}
                  </SelectItem>
                  {Object.entries(stateCalendars).map(([key, state]) => (
                    <SelectItem key={key} value={key}>
                      {language === 'hi' ? state.nameHindi : state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'फसल चुनें' : 'Select Crop'}
              </label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'फसल चुनें' : 'Choose crop'} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cropCalendarData).map(([key, crop]) => (
                    <SelectItem key={key} value={key}>
                      {language === 'hi' ? crop.nameHindi : crop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'hi' ? 'महीना चुनें (वैकल्पिक)' : 'Select Month (Optional)'}
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'सभी महीने' : 'All months'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'hi' ? 'सभी महीने' : 'All months'}
                  </SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month.num} value={month.num.toString()}>
                      {language === 'hi' ? month.nameHindi : month.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCrop && (
            <div className="flex gap-2">
              <Button onClick={() => { setSelectedCrop(''); setSelectedMonth(''); setSelectedState(''); }} variant="outline">
                {language === 'hi' ? 'री��ेट करें' : 'Reset'}
              </Button>
              <Button onClick={handleDownloadCalendar} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {language === 'hi' ? 'डाउनलोड' : 'Download'}
              </Button>
              <Button onClick={handlePrintCalendar} variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                {language === 'hi' ? 'प्रिंट' : 'Print'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">
            {language === 'hi' ? 'कैलेंडर' : 'Calendar'}
          </TabsTrigger>
          <TabsTrigger value="monthly">
            {language === 'hi' ? 'मासिक कार्य' : 'Monthly Tasks'}
          </TabsTrigger>
          <TabsTrigger value="weather">
            {language === 'hi' ? 'मौसम सलाह' : 'Weather Advice'}
          </TabsTrigger>
          <TabsTrigger value="festivals">
            {language === 'hi' ? 'त्योहार' : 'Festivals'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {selectedCrop && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kisan-primary">
                  <Sprout className="h-5 w-5" />
                  {language === 'hi' 
                    ? `${cropCalendarData[selectedCrop].nameHindi} - ${cropCalendarData[selectedCrop].season === 'kharif' ? 'खरीफ' : cropCalendarData[selectedCrop].season === 'rabi' ? 'रबी' : 'जैद'} सीजन`
                    : `${cropCalendarData[selectedCrop].name} - ${cropCalendarData[selectedCrop].season.charAt(0).toUpperCase() + cropCalendarData[selectedCrop].season.slice(1)} Season`
                  }
                  {selectedState && stateCalendars[selectedState] && (
                    <Badge variant="outline" className="ml-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {language === 'hi' ? stateCalendars[selectedState].nameHindi : stateCalendars[selectedState].name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredActivities.length === 0 && selectedMonth ? (
                    <div className="text-center py-8 text-kisan-text-secondary">
                      {language === 'hi' 
                        ? 'इस महीने कोई ���तिविधि नहीं है'
                        : 'No activities for this month'
                      }
                    </div>
                  ) : (
                    filteredActivities.map((activity, index) => {
                      const Icon = activityIcons[activity.type];
                      const WeatherIcon = weatherIcons[months[activity.month - 1].season as keyof typeof weatherIcons];
                      const isCurrentMonth = activity.month === currentMonth;
                      
                      return (
                        <Card key={index} className={`${isCurrentMonth ? 'ring-2 ring-kisan-primary' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 rounded-lg ${activityColors[activity.type]}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-kisan-text-primary">
                                      {language === 'hi' ? activity.activityHindi : activity.activity}
                                    </h3>
                                    {isCurrentMonth && (
                                      <Badge variant="default" className="bg-kisan-primary">
                                        {language === 'hi' ? 'इस महीने' : 'This Month'}
                                      </Badge>
                                    )}
                                    {activity.day && (
                                      <Badge variant="outline">
                                        {activity.day} {language === 'hi' ? months[activity.month - 1].nameHindi : months[activity.month - 1].name}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-kisan-text-secondary text-sm mb-2">
                                    {language === 'hi' ? activity.descriptionHindi : activity.description}
                                  </p>
                                  {activity.weatherAdvice && (
                                    <div className="flex items-start gap-2 p-2 bg-blue-50 rounded text-sm mb-2">
                                      <WeatherIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-blue-800">
                                        <strong>{language === 'hi' ? 'मौसम सलाह:' : 'Weather Advice:'}</strong>{' '}
                                        {language === 'hi' ? activity.weatherAdviceHindi : activity.weatherAdvice}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="outline">
                                      {language === 'hi' 
                                        ? months[activity.month - 1].nameHindi
                                        : months[activity.month - 1].name
                                      }
                                    </Badge>
                                    <Badge variant="outline" className={activityColors[activity.type]}>
                                      {language === 'hi' ? (
                                        activity.type === 'planting' ? 'बुआई/रोपाई' :
                                        activity.type === 'irrigation' ? '��िंचाई' :
                                        activity.type === 'fertilizer' ? 'उर्वरक' :
                                        activity.type === 'pestControl' ? 'कीट नियंत्रण' :
                                        activity.type === 'harvesting' ? 'कटाई' : 'अन्य'
                                      ) : (
                                        activity.type === 'planting' ? 'Planting' :
                                        activity.type === 'irrigation' ? 'Irrigation' :
                                        activity.type === 'fertilizer' ? 'Fertilizer' :
                                        activity.type === 'pestControl' ? 'Pest Control' :
                                        activity.type === 'harvesting' ? 'Harvesting' : 'Other'
                                      )}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kisan-primary">
                <CalendarDays className="h-5 w-5" />
                {language === 'hi' ? 'मासिक कृषि कार्य सूची' : 'Monthly Agricultural Task List'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {months.map(month => {
                  const tasks = monthlyTasks[month.num] || [];
                  const WeatherIcon = weatherIcons[month.season as keyof typeof weatherIcons];
                  
                  return (
                    <Card key={month.num} className={month.num === currentMonth ? 'ring-2 ring-kisan-primary' : ''}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <WeatherIcon className="h-5 w-5 text-kisan-primary" />
                          {language === 'hi' ? month.nameHindi : month.name}
                          {month.num === currentMonth && (
                            <Badge className="bg-kisan-primary">
                              {language === 'hi' ? 'वर्तमान' : 'Current'}
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {tasks.length > 0 ? (
                          <div className="space-y-2">
                            {tasks.map((task, idx) => {
                              const Icon = activityIcons[task.type];
                              return (
                                <div key={idx} className="flex items-center gap-3 p-2 rounded bg-gray-50">
                                  <div className={`p-1.5 rounded ${activityColors[task.type]}`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-medium text-sm">
                                      {language === 'hi' ? (task as any).cropNameHindi : (task as any).cropName}:
                                    </span>{' '}
                                    <span className="text-sm text-kisan-text-secondary">
                                      {language === 'hi' ? task.activityHindi : task.activity}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-kisan-text-secondary text-sm">
                            {language === 'hi' ? 'कोई विशेष कार्य नहीं' : 'No specific tasks'}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kisan-primary">
                <Cloud className="h-5 w-5" />
                {language === 'hi' ? 'मौसम आधारित सलाह' : 'Weather-Based Advice'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(months.reduce((acc, month) => {
                  if (!acc[month.season]) acc[month.season] = [];
                  acc[month.season].push(month);
                  return acc;
                }, {} as Record<string, typeof months>)).map(([season, seasonMonths]) => {
                  const WeatherIcon = weatherIcons[season as keyof typeof weatherIcons];
                  
                  return (
                    <Card key={season}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <WeatherIcon className="h-5 w-5 text-kisan-primary" />
                          {language === 'hi' ? (
                            season === 'winter' ? 'सर्दी' :
                            season === 'spring' ? 'वसंत' :
                            season === 'summer' ? 'गर्मी' :
                            season === 'monsoon' ? 'मानसून' : 'शरद'
                          ) : (
                            season.charAt(0).toUpperCase() + season.slice(1)
                          )}
                          <span className="text-sm font-normal text-kisan-text-secondary">
                            ({seasonMonths.map(m => language === 'hi' ? m.nameHindi : m.name).join(', ')})
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          {season === 'winter' && (
                            <div>
                              <p className="font-medium text-kisan-text-primary">
                                {language === 'hi' ? 'सर्दी की सलाह:' : 'Winter Advice:'}
                              </p>
                              <ul className="text-kisan-text-secondary space-y-1 ml-4">
                                <li>• {language === 'hi' ? 'रबी फसलों की बुआई का उत्तम समय' : 'Optimal time for rabi crop sowing'}</li>
                                <li>• {language === 'hi' ? 'ठंड से फसलों की सुरक्षा करें' : 'Protect crops from cold'}</li>
                                <li>• {language === 'hi' ? 'सिंचाई की आवृत्ति कम करें' : 'Reduce irrigation frequency'}</li>
                              </ul>
                            </div>
                          )}
                          {season === 'monsoon' && (
                            <div>
                              <p className="font-medium text-kisan-text-primary">
                                {language === 'hi' ? 'मानसून की सलाह:' : 'Monsoon Advice:'}
                              </p>
                              <ul className="text-kisan-text-secondary space-y-1 ml-4">
                                <li>• {language === 'hi' ? 'खरीफ फसलों की बुआई करें' : 'Sow kharif crops'}</li>
                                <li>• {language === 'hi' ? 'जल निकासी की व्यवस्था करें' : 'Ensure proper drainage'}</li>
                                <li>• {language === 'hi' ? 'कीट-रोग की निगरानी बढ़ाएं' : 'Increase pest-disease monitoring'}</li>
                              </ul>
                            </div>
                          )}
                          {season === 'summer' && (
                            <div>
                              <p className="font-medium text-kisan-text-primary">
                                {language === 'hi' ? 'गर्मी की सलाह:' : 'Summer Advice:'}
                              </p>
                              <ul className="text-kisan-text-secondary space-y-1 ml-4">
                                <li>• {language === 'hi' ? 'जैद फसलों की देखभाल करें' : 'Take care of zaid crops'}</li>
                                <li>• {language === 'hi' ? 'नियमित सिंचाई सुनिश्चित करें' : 'Ensure regular irrigation'}</li>
                                <li>• {language === 'hi' ? 'मल्चिंग का प्रयोग करें' : 'Use mulching'}</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="festivals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kisan-primary">
                <Star className="h-5 w-5" />
                {language === 'hi' ? 'त्योहार और शुभ मुहूर्त' : 'Festivals and Auspicious Times'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {upcomingFestivals.map((festival, index) => (
                  <Card key={index} className={festival.auspicious ? 'border-yellow-200 bg-yellow-50' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {festival.auspicious && (
                            <div className="p-2 rounded-lg bg-yellow-100 text-yellow-800">
                              <Star className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-kisan-text-primary">
                              {language === 'hi' ? festival.nameHindi : festival.name}
                            </h3>
                            <p className="text-sm text-kisan-text-secondary mb-2">
                              {language === 'hi' ? festival.significanceHindi : festival.significance}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(festival.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                              </Badge>
                              {festival.auspicious && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  {language === 'hi' ? 'शुभ' : 'Auspicious'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {!selectedCrop && activeTab === 'calendar' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-kisan-primary">
              {language === 'hi' ? 'आने वाली सुविधाएं' : 'Upcoming Features'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-kisan-text-primary">
                  {language === 'hi' ? 'फसल कैलेंडर की सुविधाएं:' : 'Crop Calendar Features:'}
                </h4>
                <ul className="space-y-2 text-sm text-kisan-text-secondary">
                  <li>✅ {language === 'hi' ? 'धान, गेहूं, कपास, गन्ना कैलेंडर' : 'Rice, wheat, cotton, sugarcane calendar'}</li>
                  <li>✅ {language === 'hi' ? 'राज्य-वार कृषि कैलेंडर' : 'State-wise agriculture calendar'}</li>
                  <li>✅ {language === 'hi' ? 'मासिक कृषि कार्य सूची' : 'Monthly agriculture task list'}</li>
                  <li>✅ {language === 'hi' ? 'मौसम आधारित सलाह' : 'Weather-based advice'}</li>
                  <li>✅ {language === 'hi' ? 'त्योहार और शुभ मुहूर्त' : 'Festivals and auspicious times'}</li>
                  <li>✅ {language === 'hi' ? 'कैलेंडर डाउनलोड व प्रिंट' : 'Calendar download and print'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-kisan-text-primary">
                  {language === 'hi' ? 'कैसे उपयोग करें:' : 'How to Use:'}
                </h4>
                <ul className="space-y-2 text-sm text-kisan-text-secondary">
                  <li>1. {language === 'hi' ? 'अपना राज्य चुनें' : 'Select your state'}</li>
                  <li>2. {language === 'hi' ? 'फसल का प्रकार चुनें' : 'Choose crop type'}</li>
                  <li>3. {language === 'hi' ? 'महीन���-वार गतिविधियां देखें' : 'View month-wise activities'}</li>
                  <li>4. {language === 'hi' ? 'मौसम की सलाह पढ़ें' : 'Read weather advice'}</li>
                  <li>5. {language === 'hi' ? 'कैलेंडर डाउनलोड करें' : 'Download calendar'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropCalendar;
