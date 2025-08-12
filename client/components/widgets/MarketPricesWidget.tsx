import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketPrice {
  crop: string;
  cropHindi: string;
  price: number;
  unit: string;
  change: number;
  market: string;
  trend: 'up' | 'down' | 'stable';
}

const MarketPricesWidget = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([
    {
      crop: 'Rice',
      cropHindi: 'धान',
      price: 2100,
      unit: 'प्रति क्विंटल',
      change: 5.2,
      market: 'दिल्ली मंडी',
      trend: 'up'
    },
    {
      crop: 'Wheat',
      cropHindi: 'गेहूं',
      price: 2050,
      unit: 'प्रति क्विंटल',
      change: -2.1,
      market: 'पंजाब मंडी',
      trend: 'down'
    },
    {
      crop: 'Cotton',
      cropHindi: 'कपास',
      price: 5800,
      unit: 'प्रति क्विंटल',
      change: 0,
      market: 'महाराष्ट्र मंडी',
      trend: 'stable'
    },
    {
      crop: 'Sugarcane',
      cropHindi: 'गन्ना',
      price: 350,
      unit: 'प्रति क्विंटल',
      change: 8.5,
      market: 'उत्तर प्रदेश मंडी',
      trend: 'up'
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="kisan-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kisan-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
          आज के मंडी भाव
        </h3>
        <Link
          to="/market-prices"
          className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm transition-colors"
        >
          <span className="font-devanagari">सभी देखें</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {prices.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-kisan hover:bg-secondary transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-kisan-text-primary font-devanagari">
                  {item.cropHindi}
                </h4>
                <span className="text-xs text-kisan-text-muted font-latin">
                  ({item.crop})
                </span>
              </div>
              <p className="text-xs text-kisan-text-muted font-devanagari mt-1">
                {item.market}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="font-semibold text-kisan-text-primary">
                    ₹{item.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-kisan-text-muted font-devanagari">
                    {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(item.trend)}
                  {item.change !== 0 && (
                    <span className={`text-xs font-medium ${getTrendColor(item.trend)}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-kisan-text-muted font-devanagari">
          💡 सुझाव: धान की बिक्री के लिए अच्छा समय है। कपास की कीमतें स्थिर हैं।
        </p>
      </div>
    </div>
  );
};

export default MarketPricesWidget;
