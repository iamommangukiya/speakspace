import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import GroqClient from 'groq-sdk';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source for pdfjsLib to a local file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// const cloudinary = new Cloudinary({ cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME });
const groq = new GroqClient({ 
  apiKey: "ygsk_Ym09VU1fGySqeZIglNiDWGdyb3FYKSZZkGIiJcaK3nbdCxwss83m",
  dangerouslyAllowBrowser: true 
});

export default function ResumeUpload() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const readPdf = async (file: File) => {
    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(pdfData).promise;
    const text: any[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      content.items.forEach(item => {
        if ('str' in item) {
          text.push(item.str);
        }
      });
    }

    return text.join(' ');
  };

  const handleAnalysis = async (file: File) => {
    try {
      setIsAnalyzing(true);
      const text = file.type === 'application/pdf' 
        ? await readPdf(file) // Process PDF files
        : 'Unsupported file format';

      const prompt = `Analyze this resume and provide:
      1. Skills assessment
      2. Areas for improvement
      3. Recommended skills to learn
      4. Career path suggestions

      Resume content:
      ${text}`;

      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
      });

      const analysisResult = completion.choices[0]?.message?.content;
      setAnalysis(analysisResult || '');

      await addDoc(collection(db, 'analyses'), {
        resumeUrl: 'cloudinary_image_url_here', 
        analysis: analysisResult,
        timestamp: new Date(),
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze resume',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleAnalysis(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop your resume here...</p>
            ) : (
              <div>
                <p>Drag and drop your resume here, or click to select file</p>
                <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</p>
              </div>
            )}
          </div>
          {file && !isAnalyzing && !analysis && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-700">File selected: {file.name}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isAnalyzing && (
        <div className="text-center">
          <p>Analyzing your resume...</p>
        </div>
      )}

      {analysis && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {analysis.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
