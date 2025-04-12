import React from 'react';
import ResumeUpload from '../components/ResumeUpload';

const ResumePage = () => {
  return (
    <div className="resume-page">
      <div className="container">
        <h2 className="text-center my-4">Upload Your Resume</h2>
        <ResumeUpload />
      </div>
    </div>
  );
};

export default ResumePage;