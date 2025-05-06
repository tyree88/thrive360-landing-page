'use client';

import React from 'react';

const TreatmentPlanContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-green-50 rounded-lg p-4 shadow-inner w-full">
        <div className="mb-3 border-b border-green-200 pb-2">
          <div className="h-7 bg-green-100 rounded-md w-2/3 animate-pulse mb-2" />
          <div className="flex space-x-2">
            <div className="h-6 w-20 bg-green-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-green-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-green-200 rounded animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-7 bg-green-100 rounded-md w-1/3 animate-pulse" />
            <div className="h-7 w-7 rounded-full bg-green-300 animate-pulse" />
          </div>
          
          <div className="bg-green-100/50 p-2 rounded-md">
            <div className="h-5 bg-green-100 rounded w-3/4 animate-pulse mb-1" />
            <div className="h-5 bg-green-100 rounded w-2/3 animate-pulse" />
            <div className="flex mt-2 justify-end">
              <div className="h-6 w-16 bg-green-200 rounded-md animate-pulse" />
            </div>
          </div>
          
          <div className="bg-green-100/50 p-2 rounded-md">
            <div className="h-5 bg-green-100 rounded w-3/4 animate-pulse mb-1" />
            <div className="h-5 bg-green-100 rounded w-1/2 animate-pulse" />
            <div className="flex mt-2 justify-end">
              <div className="h-6 w-16 bg-green-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanContent;