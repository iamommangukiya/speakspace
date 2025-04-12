"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
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
        {file && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">File selected: {file.name}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}