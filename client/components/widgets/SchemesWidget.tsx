import { useState, useEffect } from 'react';
import { ExternalLink, Clock, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Scheme {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  amount: string;
  deadline: string;
  beneficiaries: string;
  status: 'active' | 'ending-soon' | 'new';
}

const SchemesWidget = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([
    {
      id: '1',
      title: 'PM Kisan Samman Nidhi',
      titleHindi: 'पीएम किसान सम्मान निधि',
      description: 'छोटे और सीमांत किसानों को ₹6000 वार्षिक सहायता',
      amount: '₹6,000/वर्ष',
      deadline: '31 मार्च 2024',
      beneficiaries: '12 करोड़ किसान',
      status: 'active'
    },
    {
      id: '2',
      title: 'Kisan Credit Card',
      titleHindi: 'किसान क्रेडिट कार्ड',
      description: 'कम ब्याज दर पर कृषि ऋण की सुविधा',
      amount: '₹3 लाख तक',
      deadline: 'कोई समय सीमा नहीं',
      beneficiaries: '7 करोड़ किसान',
      status: 'active'
    },
    {
      id: '3',
      title: 'Soil Health Card',
      titleHindi: 'मृदा स्वास्थ्य कार्ड',
      description: 'मिट्टी की जांच और उर्वरक की सिफारिश',
      amount: 'निःशुल्क',
      deadline: '15 अप्रैल 2024',
      beneficiaries: '14 करोड़ किसान',
      status: 'ending-soon'
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 font-devanagari">
            नई योजना
          </span>
        );
      case 'ending-soon':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 font-devanagari">
            जल्दी करें
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 font-devanagari">
            सक्रिय
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="kisan-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-kisan">
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kisan-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
          सरकारी योजनाएं
        </h3>
        <Link
          to="/schemes"
          className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm transition-colors"
        >
          <span className="font-devanagari">सभी योजनाएं</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-4">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="p-4 bg-secondary/30 rounded-kisan border border-border hover:bg-secondary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-kisan-text-primary font-devanagari">
                    {scheme.titleHindi}
                  </h4>
                  {getStatusBadge(scheme.status)}
                </div>
                <p className="text-sm text-kisan-text-muted font-latin mb-2">
                  {scheme.title}
                </p>
                <p className="text-sm text-kisan-text-secondary font-devanagari leading-relaxed">
                  {scheme.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-kisan-text-muted font-devanagari">राशि</p>
                  <p className="font-medium text-kisan-text-primary">{scheme.amount}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-kisan-text-muted font-devanagari">अंतिम तारीख</p>
                  <p className="font-medium text-kisan-text-primary font-devanagari">{scheme.deadline}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div className="flex items-center space-x-2 text-xs">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-kisan-text-muted font-devanagari">
                  {scheme.beneficiaries} लाभार्थी
                </span>
              </div>
              <Link
                to={`/schemes/${scheme.id}`}
                className="text-primary hover:text-primary/80 text-sm font-devanagari transition-colors"
              >
                आवेदन करें →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-kisan-text-muted font-devanagari">
          💡 सुझाव: नई योजनाओं की जानकारी के लिए नोटिफिकेशन चालू करें।
        </p>
      </div>
    </div>
  );
};

export default SchemesWidget;
