'use client';

import React from 'react';

const SupportContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-purple-50 rounded-lg p-4 shadow-inner w-full">
        <div className="mb-3 flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-purple-200 animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-purple-100 rounded-md w-1/3 animate-pulse mb-1" />
            <div className="h-4 bg-purple-100 rounded-md w-1/4 animate-pulse" />
          </div>
          <div className="h-8 w-8 rounded-full bg-purple-300 animate-pulse" />
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex">
            <div className="bg-purple-100 p-2 rounded-lg rounded-tr-none max-w-3/4">
              <div className="h-4 bg-purple-200 rounded w-32 animate-pulse mb-1" />
              <div className="h-4 bg-purple-200 rounded w-36 animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-purple-200 p-2 rounded-lg rounded-tl-none max-w-3/4">
              <div className="h-4 bg-purple-300 rounded w-24 animate-pulse mb-1" />
              <div className="h-4 bg-purple-300 rounded w-32 animate-pulse" />
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-purple-100 p-2 rounded-lg rounded-tr-none max-w-3/4">
              <div className="h-4 bg-purple-200 rounded w-40 animate-pulse mb-1" />
              <div className="h-4 bg-purple-200 rounded w-28 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-2 border-t border-purple-200">
          <div className="h-8 bg-purple-100 rounded-full flex-1 animate-pulse" />
          <div className="h-8 w-8 bg-purple-300 rounded-full ml-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SupportContent;