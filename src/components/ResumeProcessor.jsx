import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ResumeProcessor = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: async (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      await processResume(selectedFile);
    }
  });

  const processResume = async (file) => {
    try {
      setLoading(true);
      
      // 1. Upload to Cloudflare
      const storageRef = ref(storage, `resumes/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      // 2. Extract text from PDF
      const formData = new FormData();
      formData.append('file', file);
      const extractResponse = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData
      });
      const { text } = await extractResponse.json();
      setExtractedText(text);

      // 3. Get suggestions from Gemini
      const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const suggestionPrompt = `Analyze this resume and provide improvement suggestions: ${text}`;
      const suggestionResult = await model.generateContent(suggestionPrompt);
      setSuggestions(suggestionResult.response.text());

      // 4. Generate interview questions
      const questionPrompt = `Generate 5 technical interview questions based on these skills: ${text}`;
      const questionResult = await model.generateContent(questionPrompt);
      setQuestions(questionResult.response.text().split('\n'));

      // 5. Store in Firebase
      // Add your Firebase storage logic here

    } catch (error) {
      console.error('Error processing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your resume here...</p>
        ) : (
          <p>Drag and drop your resume, or click to select</p>
        )}
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Processing your resume...</p>
        </div>
      )}

      {suggestions && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Improvement Suggestions</h3>
          <div className="bg-gray-50 p-4 rounded-lg">{suggestions}</div>
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Practice Questions</h3>
          <ul className="space-y-2">
            {questions.map((question, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg">{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeProcessor;