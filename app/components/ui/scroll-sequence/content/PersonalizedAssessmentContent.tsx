'use client';

import React from 'react';

const PersonalizedAssessmentContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-blue-50 rounded-lg p-4 shadow-inner w-full">
        <div className="space-y-2 mb-3">
          <div className="h-8 bg-blue-100 rounded-md animate-pulse" />
          <div className="h-6 bg-blue-100 rounded-md w-4/5 animate-pulse" />
          <div className="h-6 bg-blue-100 rounded-md w-3/5 animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-200" />
            <div className="h-6 bg-blue-100 rounded-md w-3/4 animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-200" />
            <div className="h-6 bg-blue-100 rounded-md w-2/3 animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-200" />
            <div className="h-6 bg-blue-100 rounded-md w-3/4 animate-pulse" />
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-blue-200">
          <div className="h-10 bg-blue-300 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PersonalizedAssessmentContent;