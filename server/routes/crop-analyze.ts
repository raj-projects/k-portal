import { RequestHandler } from "express";
import multer from "multer";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import fs from "fs";
import path from "path";

interface CropAnalysisResult {
  labels: Array<{
    description: string;
    confidence: number;
    category: string;
  }>;
  detectedText?: string[];
  suggestions: string[];
  timestamp: number;
}

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  }
});

// Initialize Google Vision client
let visionClient: ImageAnnotatorClient | null = null;

try {
  // Initialize with service account key if available
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_CLOUD_PROJECT) {
    visionClient = new ImageAnnotatorClient();
  }
} catch (error) {
  console.error("Google Vision API initialization failed:", error);
}

export const uploadMiddleware = upload.single('image');

export const handleCropAnalyze: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image file provided",
        message: "कृपया एक छवि फ़ाइल चुनें"
      });
    }

    const imagePath = req.file.path;
    
    try {
      let analysisResult: CropAnalysisResult;

      if (visionClient) {
        // Use Google Vision API
        analysisResult = await analyzeWithVisionAPI(imagePath);
      } else {
        // Fallback to mock analysis
        analysisResult = await getMockAnalysis(req.file.originalname || '');
      }

      res.json(analysisResult);

    } finally {
      // Clean up uploaded file
      try {
        fs.unlinkSync(imagePath);
      } catch (cleanupError) {
        console.error("Failed to cleanup uploaded file:", cleanupError);
      }
    }

  } catch (error) {
    console.error("Crop analysis error:", error);
    
    // Clean up file if it exists
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Failed to cleanup file after error:", cleanupError);
      }
    }

    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: "File too large",
          message: "फ़ाइल का आकार 8MB से कम होना चाहिए"
        });
      }
    }

    res.status(500).json({
      error: "Failed to analyze image",
      message: "छवि का विश्लेषण करने में त्रुटि"
    });
  }
};

async function analyzeWithVisionAPI(imagePath: string): Promise<CropAnalysisResult> {
  try {
    if (!visionClient) {
      throw new Error("Vision client not initialized");
    }

    // Perform label detection
    const [labelResult] = await visionClient.labelDetection(imagePath);
    const labels = labelResult.labelAnnotations || [];

    // Perform text detection (optional)
    const [textResult] = await visionClient.textDetection(imagePath);
    const detectedText = textResult.textAnnotations?.map(text => text.description || '') || [];

    // Process and categorize labels
    const processedLabels = labels
      .filter(label => (label.score || 0) > 0.5)
      .slice(0, 10)
      .map(label => ({
        description: label.description || '',
        confidence: Math.round((label.score || 0) * 100),
        category: categorizeLabel(label.description || '')
      }));

    // Generate suggestions based on detected labels
    const suggestions = generateSuggestions(processedLabels);

    return {
      labels: processedLabels,
      detectedText: detectedText.slice(0, 5),
      suggestions,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("Vision API error:", error);
    throw error;
  }
}

async function getMockAnalysis(filename: string): Promise<CropAnalysisResult> {
  // Mock analysis for when Vision API is not available
  const mockLabels = [
    { description: "Plant", confidence: 95, category: "crop" },
    { description: "Leaf", confidence: 90, category: "plant_part" },
    { description: "Green", confidence: 85, category: "color" },
    { description: "Agriculture", confidence: 80, category: "general" }
  ];

  const suggestions = [
    "यह एक स्वस्थ पौधे की तरह दिखता है",
    "पत्तियों का रंग अच्���ा है",
    "नियमित सिंचाई जारी रखें",
    "विशेषज्ञ से सलाह के लिए संपर्क करें"
  ];

  return {
    labels: mockLabels,
    suggestions,
    timestamp: Date.now()
  };
}

function categorizeLabel(description: string): string {
  const categories = {
    crop: ['plant', 'crop', 'wheat', 'rice', 'corn', 'tomato', 'potato'],
    disease: ['disease', 'pest', 'blight', 'rust', 'mold', 'fungus'],
    plant_part: ['leaf', 'stem', 'root', 'flower', 'fruit'],
    color: ['green', 'yellow', 'brown', 'red'],
    general: ['agriculture', 'farm', 'field']
  };

  const lowerDesc = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return category;
    }
  }
  
  return 'other';
}

function generateSuggestions(labels: Array<{ description: string; confidence: number; category: string }>): string[] {
  const suggestions = [];
  
  const hasDisease = labels.some(label => label.category === 'disease');
  const hasHealthyPlant = labels.some(label => 
    label.category === 'crop' && label.confidence > 80
  );
  
  if (hasDisease) {
    suggestions.push("संभावित ��ोग का संकेत मिला है - विशेषज्ञ से सलाह लें");
    suggestions.push("उचित कीटनाशक का उपयोग करें");
  } else if (hasHealthyPlant) {
    suggestions.push("पौधा स्वस्थ दिखाई दे रहा है");
    suggestions.push("वर्तमान देखभाल जारी रखें");
  }
  
  suggestions.push("नियमित निगरानी करते रहें");
  suggestions.push("मिट्टी की नमी का ध्यान रखें");
  suggestions.push("अधिक सटीक सलाह के लिए कृषि विशेषज्ञ से संपर्क करें");
  
  return suggestions.slice(0, 4);
}
