import { Calculator, Calendar, Droplet, Bug, Leaf, Tractor } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickToolsWidget = () => {
  const tools = [
    {
      icon: Calculator,
      title: 'फसल कैलकुलेटर',
      titleEn: 'Crop Calculator',
      description: 'बीज, उर्वरक व लागत की गणना',
      href: '/tools/calculator',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Calendar,
      title: 'फसल कैलेंडर',
      titleEn: 'Crop Calendar',
      description: 'बुआई और कटाई का समय',
      href: '/tools/calendar',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Droplet,
      title: 'सिंचाई योजना',
      titleEn: 'Irrigation Planner',
      description: 'पानी की आवश्यकता',
      href: '/tools/irrigation',
      color: 'text-cyan-600 bg-cyan-50'
    },
    {
      icon: Bug,
      title: 'कीट पहचान',
      titleEn: 'Pest Identification',
      description: 'कीट व रोग की पहचान',
      href: '/tools/pest-identification',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Leaf,
      title: 'उर्वरक गाइड',
      titleEn: 'Fertilizer Guide',
      description: 'सही उर्वरक का चुनाव',
      href: '/tools/fertilizer',
      color: 'text-amber-600 bg-amber-50'
    },
    {
      icon: Tractor,
      title: 'मशीन किराया',
      titleEn: 'Equipment Rental',
      description: 'कृषि यंत्र किराए पर',
      href: '/tools/equipment',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="kisan-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
          खेती के उपकरण
        </h3>
        <Link
          to="/tools"
          className="text-primary hover:text-primary/80 text-sm font-devanagari transition-colors"
        >
          सभ��� उपकरण
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <Link
              key={index}
              to={tool.href}
              className="group p-4 bg-white border border-border rounded-kisan hover:shadow-md transition-all duration-200 touch-target"
            >
              <div className="text-center">
                <div className={`inline-flex p-3 rounded-kisan mb-3 ${tool.color} group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-kisan-text-primary font-devanagari text-sm mb-1">
                  {tool.title}
                </h4>
                <p className="text-xs text-kisan-text-muted font-devanagari">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-kisan border border-primary/20">
        <div className="flex items-start space-x-3">
          <div className="bg-primary p-2 rounded-kisan flex-shrink-0">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-kisan-text-primary font-devanagari mb-1">
              नई सुविधा: AI कृषि सलाहकार
            </h4>
            <p className="text-sm text-kisan-text-muted font-devanagari leading-relaxed">
              अब आप अपनी फसल की तस्वीर भेजकर तुरंत सलाह पा सकते हैं।
            </p>
            <Link
              to="/ai-advisor"
              className="inline-block mt-2 text-primary hover:text-primary/80 text-sm font-devanagari transition-colors"
            >
              अभी आजमाएं →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickToolsWidget;
