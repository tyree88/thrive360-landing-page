import React from 'react';

interface SideContainersProps {
  leftRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
}

const SideContainers: React.FC<SideContainersProps> = ({ leftRef, rightRef }) => {
  return (
    <>
      {/* Left container with decorative elements */}
      <div 
        ref={leftRef} 
        className="hidden md:flex flex-col items-center justify-center w-1/4 h-full"
      >
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-40 blur-lg"></div>
          <div className="w-64 h-64 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 transform -rotate-3">
            <h3 className="text-lg font-semibold mb-2">AI-Powered Assessment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our advanced algorithms analyze neural patterns to create personalized treatment protocols
            </p>
            <div className="mt-4 h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right container with decorative elements */}
      <div 
        ref={rightRef} 
        className="hidden md:flex flex-col items-center justify-center w-1/4 h-full"
      >
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full opacity-40 blur-lg"></div>
          <div className="w-64 h-64 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 transform rotate-3">
            <h3 className="text-lg font-semibold mb-2">Real-time Adaptation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Thrive360 continuously adapts to your progress, optimizing neuroplastic engagement
            </p>
            <div className="mt-4 h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-blue-50 dark:bg-blue-900/30"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-100 dark:bg-blue-800/40"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-blue-200 dark:bg-blue-700/50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-blue-300 dark:bg-blue-600/60"></div>
                <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideContainers;