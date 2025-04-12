"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { extractTextFromPDF } from "@/lib/pdf-utils";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const { user } = useAuth();

  const analyzeResume = async (text: string) => {
    try {
      setError(null);
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || 'Failed to analyze resume');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError('Failed to analyze resume. Please try again.');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return;
    
    const selectedFile = acceptedFiles[0];
    setLoading(true);
    setError(null);
    
    try {
      // First extract text from PDF
      const text = await extractTextFromPDF(selectedFile);
      if (!text || text.trim().length === 0) {
        throw new Error('Could not extract text from resume');
      }
  
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'ml_default');
      
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }
  
      const uploadData = await uploadResponse.json();
  
      // Analyze the resume
      const analysisResponse = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          fileName: selectedFile.name,
          fileUrl: uploadData.secure_url 
        }),
      });
  
      const analysisData = await analysisResponse.json();
      
      if (!analysisResponse.ok) {
        throw new Error(analysisData.error || 'Failed to analyze resume');
      }
  
      setAnalysis(analysisData.analysis);
      setFile(selectedFile);
  
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Failed to process resume');
    } finally {
      setLoading(false);
    }
  }, [user]);

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
    <div className="space-y-6">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
        <input {...getInputProps()} />
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <span>Processing resume...</span>
            <span className="text-sm text-gray-500 mt-1">This may take a few moments</span>
          </div>
        ) : (
          <div>
            <p>Drag and drop your resume here, or click to select file</p>
            <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {analysis && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>Resume Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {analysis.split('\n').map((line, index) => (
                <p key={index} className="text-gray-700">{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}