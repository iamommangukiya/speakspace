import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoogleLogin } from 'react-google-login';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [googleDriveFiles, setGoogleDriveFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
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

  const handleGoogleSuccess = async (response) => {
    const { accessToken } = response;
    try {
      const result = await fetch('https://www.googleapis.com/drive/v3/files', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await result.json();
      setGoogleDriveFiles(data.files);
    } catch (error) {
      console.error('Error fetching Google Drive files:', error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign In Error:', error);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-8 rounded-lg text-center cursor-pointer
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
          <div className="mt-4">
            <p>Selected file: {file.name}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Or Import from Google Drive</h3>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Connect Google Drive"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          cookiePolicy={'single_host_origin'}
          scope="https://www.googleapis.com/auth/drive.readonly"
        />
        
        {googleDriveFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Your Google Drive Files:</h4>
            <ul className="space-y-2">
              {googleDriveFiles.map((file) => (
                <li key={file.id} className="flex items-center">
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;