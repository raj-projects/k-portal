import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import Layout from '../components/layout/Layout';

interface PlaceholderPageProps {
  title: string;
  titleHindi: string;
  description: string;
  features?: string[];
}

const PlaceholderPage = ({ title, titleHindi, description, features = [] }: PlaceholderPageProps) => {
  return (
    <Layout>
      <div className="min-h-screen bg-kisan-bg py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-devanagari">वापस होम पेज पर</span>
            </Link>
            
            <div className="bg-amber-50 border border-amber-200 rounded-kisan-lg p-8 mb-8">
              <Construction className="h-16 w-16 text-amber-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-kisan-text-primary mb-2 font-devanagari">
                {titleHindi}
              </h1>
              <p className="text-lg text-kisan-text-secondary mb-4 font-latin">
                {title}
              </p>
              <p className="text-kisan-text-muted font-devanagari">
                {description}
              </p>
            </div>
          </div>

          {features.length > 0 && (
            <div className="kisan-card p-8 mb-8">
              <h2 className="text-xl font-semibold text-kisan-text-primary mb-6 font-devanagari">
                आने वाली सुविधाएं:
              </h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-kisan-text-secondary font-devanagari">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center">
            <p className="text-kisan-text-muted mb-6 font-devanagari">
              इस पेज को पूरा करने के लिए कृपया डेवलपर को बताएं।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-kisan hover:bg-primary/90 transition-colors touch-target"
              >
                <span className="font-devanagari">होम पेज पर जाएं</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white text-primary border border-primary px-6 py-3 rounded-kisan hover:bg-primary/5 transition-colors touch-target"
              >
                <span className="font-devanagari">संपर्क करें</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;
