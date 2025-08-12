import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, CheckCircle, AlertCircle, X, Eye, Lightbulb } from 'lucide-react';
import { CropAnalysisResult } from '@shared/api';

const CropAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CropAnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('क���पया केवल छवि फ़ाइल चुनें (JPG, PNG, WebP)');
        return;
      }

      // Validate file size (8MB limit)
      if (file.size > 8 * 1024 * 1024) {
        setError('फ़ाइल का आकार 8MB से कम होना चाहिए');
        return;
      }

      setSelectedFile(file);
      setError('');
      setResult(null);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Simulate file input change
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleFileSelect({ target: input } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    try {
      setIsAnalyzing(true);
      setError('');
      
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/crop-analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Image analysis failed');
      }

      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'छवि का विश्लेषण करने में त्रुटि');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      crop: 'bg-green-100 text-green-800',
      disease: 'bg-red-100 text-red-800',
      plant_part: 'bg-blue-100 text-blue-800',
      color: 'bg-yellow-100 text-yellow-800',
      general: 'bg-gray-100 text-gray-800',
      other: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crop':
        return '🌱';
      case 'disease':
        return '🦠';
      case 'plant_part':
        return '🍃';
      case 'color':
        return '🎨';
      default:
        return '📋';
    }
  };

  return (
    <div className="kisan-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Camera className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-kisan-text-primary font-devanagari">
          फसल छवि विश्लेषण
        </h3>
      </div>

      {/* File Upload Area */}
      {!selectedFile && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-kisan-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-kisan-text-primary mb-2 font-devanagari">
            फसल की छवि अपलोड करें
          </h4>
          <p className="text-sm text-kisan-text-muted mb-4 font-devanagari">
            छवि को ��हाँ खींचकर छोड़ें या क्लिक करके चुनें
          </p>
          <p className="text-xs text-kisan-text-muted font-latin">
            JPG, PNG, WebP • Max 8MB
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Preview and Analysis */}
      {selectedFile && (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={previewUrl}
              alt="Selected crop"
              className="w-full h-64 object-cover rounded-kisan"
            />
            <button
              onClick={clearSelection}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* File Info */}
          <div className="bg-secondary/30 rounded-kisan p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-kisan-text-primary font-devanagari">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-kisan-text-muted">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-kisan hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="font-devanagari">विश्लेषण कर रहे हैं...</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="font-devanagari">विश्लेषण करें</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-kisan">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-600 font-devanagari">{error}</p>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className="mt-6 space-y-6">
          {/* Labels */}
          <div>
            <h4 className="font-medium text-kisan-text-primary mb-3 font-devanagari">
              पहचान परिणाम:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.labels.slice(0, 6).map((label, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-kisan border border-border">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(label.category)}</span>
                    <div>
                      <p className="font-medium text-kisan-text-primary">
                        {label.description}
                      </p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(label.category)}`}>
                        {label.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {label.confidence}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Text */}
          {result.detectedText && result.detectedText.length > 0 && (
            <div>
              <h4 className="font-medium text-kisan-text-primary mb-3 font-devanagari">
                पहचाना गया पाठ:
              </h4>
              <div className="bg-gray-50 rounded-kisan p-3">
                {result.detectedText.map((text, index) => (
                  <span key={index} className="inline-block bg-white px-2 py-1 rounded text-sm mr-2 mb-2">
                    {text}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h4 className="font-medium text-kisan-text-primary font-devanagari">
                सुझाव और सलाह:
              </h4>
            </div>
            <ul className="space-y-2">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2 p-3 bg-amber-50 rounded-kisan">
                  <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-kisan-text-secondary font-devanagari">
                    {suggestion}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-kisan p-4">
            <p className="text-sm text-blue-800 font-devanagari">
              ⚠️ <strong>महत्वपूर्ण:</strong> यह विश्लेषण केवल संदर्भ के लिए है। 
              सटीक निदान और उपचार के लिए कृपया स्थानीय कृषि विशेषज्ञ से सलाह लें।
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropAnalyzer;
