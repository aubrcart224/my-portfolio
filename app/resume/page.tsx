// src/pages/ResumePage.tsx

import React from 'react';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 pt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Resume</h1>
        <a href="/resume.pdf" download>
          <Button variant="default">
            Download PDF
          </Button>
        </a>
      </div>
      
      {/* Embed the PDF using iframe */}
      <div className="h-[calc(100vh-14rem)]">
        <iframe
          src="/Aubrey_Carter_Resume.pdf"
          title="Resume"
          width="100%"
          //height="100%"
          height="95%"
          style={{ border: '', borderRadius: '8px' }}
        >
          This browser does not support PDFs. Please download the resume to view it:
          <a href="/resume.pdf">Download Resume</a>
        </iframe>
      </div>
    </div>
  );
}
