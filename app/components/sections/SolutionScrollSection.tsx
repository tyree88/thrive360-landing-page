'use client';

import React from 'react';
import { MultiStageScrollSection } from './MultiStageScrollSection';

// SVG Illustrations for each stage
const PersonalizedAssessmentIllustration = () => (
  <div className="w-full h-full bg-purple-50 p-6 flex flex-col items-center justify-center">
    <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
    <div className="space-y-4 w-full max-w-[240px]">
      <div className="h-2 bg-white rounded-full w-full overflow-hidden">
        <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <div className="text-center text-purple-900">
        <h4 className="font-semibold">Brain Activity Assessment</h4>
        <p className="text-sm text-purple-700">Neural pattern analysis in progress</p>
      </div>
      <div className="space-y-2">
        {["Cognitive Flexibility", "Attention Recovery", "Stress Response", "Memory Patterns"].map((option, idx) => (
          <div 
            key={idx} 
            className={`p-2 rounded-md border text-sm text-center ${
              idx === 1 ? "border-purple-500 bg-purple-50 text-purple-700" : "border-purple-200"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TreatmentPlanIllustration = () => (
  <div className="w-full h-full bg-blue-50 p-6 flex flex-col items-center justify-center">
    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <div className="space-y-4 w-full max-w-[240px]">
      <div className="text-center text-blue-900 mb-2">
        <h4 className="font-semibold">Your Treatment Plan</h4>
        <p className="text-sm text-blue-700">Personalized for optimal results</p>
      </div>
      <div className="space-y-2">
        {[
          { name: "Daily Meditation", complete: true },
          { name: "Focus Exercise", complete: true },
          { name: "Cognitive Training", complete: false },
          { name: "Stress Reduction", complete: false }
        ].map((task, idx) => (
          <div key={idx} className="flex items-center bg-white p-2 rounded-md shadow-sm">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${task.complete ? "bg-blue-500" : "border border-blue-300"}`}>
              {task.complete && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className={`ml-2 text-sm ${task.complete ? "line-through text-blue-400" : "text-blue-800"}`}>{task.name}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-white rounded-full w-full overflow-hidden mt-2">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
      </div>
    </div>
  </div>
);

const SupportIllustration = () => (
  <div className="w-full h-full bg-green-50 p-6 flex flex-col items-center justify-center">
    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    </div>
    <div className="space-y-4 w-full max-w-[240px]">
      <div className="text-center text-green-900 mb-2">
        <h4 className="font-semibold">24/7 Support</h4>
        <p className="text-sm text-green-700">AI coaching + human specialists</p>
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="p-3 border-b border-gray-100">
          <h5 className="text-sm font-medium text-gray-800">Support Chat</h5>
        </div>
        <div className="p-3 h-[150px] bg-gray-50">
          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-green-800">
              AI
            </div>
            <div className="ml-2 bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 max-w-[80%]">
              How are you feeling today?
            </div>
          </div>
          
          <div className="flex justify-end mb-3">
            <div className="bg-blue-100 p-2 rounded-lg rounded-tr-none text-xs text-blue-800 max-w-[80%]">
              Much better after the last session!
            </div>
          </div>
          
          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-green-800">
              AI
            </div>
            <div className="ml-2 bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 max-w-[80%]">
              That is great progress! Let us adjust your next exercise.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProgressTrackerIllustration = () => (
  <div className="w-full h-full bg-amber-50 p-6 flex flex-col items-center justify-center">
    <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </div>
    <div className="space-y-4 w-full max-w-[240px]">
      <div className="text-center text-amber-900 mb-2">
        <h4 className="font-semibold">Your Progress</h4>
        <p className="text-sm text-amber-700">Real-time improvement tracking</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="h-28 mb-3 relative">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
          <div className="absolute left-0 bottom-0 h-full w-px bg-gray-200"></div>
          
          <div className="flex justify-between h-full items-end px-px">
            <div className="w-3 bg-amber-300 rounded-t-sm" style={{ height: '30%' }}></div>
            <div className="w-3 bg-amber-400 rounded-t-sm" style={{ height: '45%' }}></div>
            <div className="w-3 bg-amber-500 rounded-t-sm" style={{ height: '60%' }}></div>
            <div className="w-3 bg-amber-600 rounded-t-sm" style={{ height: '40%' }}></div>
            <div className="w-3 bg-amber-700 rounded-t-sm" style={{ height: '75%' }}></div>
            <div className="w-3 bg-amber-800 rounded-t-sm" style={{ height: '85%' }}></div>
            <div className="w-3 bg-amber-900 rounded-t-sm" style={{ height: '95%' }}></div>
          </div>
          
          <div className="absolute -bottom-5 left-0 w-full flex justify-between px-px text-[8px] text-amber-800">
            <div>W1</div>
            <div>W2</div>
            <div>W3</div>
            <div>W4</div>
            <div>W5</div>
            <div>W6</div>
            <div>W7</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-amber-800">
          <span>Overall Improvement</span>
          <span className="font-medium">95%</span>
        </div>
      </div>
    </div>
  </div>
);

const SolutionScrollSection = () => {
  // Define the stages to display in the scroll sequence
  const stages = [
    {
      id: 'personalized-assessment',
      title: 'Personalized Assessment',
      description: "AI-driven neuroplasticity assessment creates a detailed map of your brain's current state and potential, identifying specific areas for improvement.",
      image: <PersonalizedAssessmentIllustration />,
      bgColor: '#f8f7ff', // Light purple
      textColor: '#4a3a80'
    },
    {
      id: 'treatment-plan',
      title: 'Tailored Treatment Plan',
      description: "Based on your neural profile, we develop a customized treatment protocol with precise interventions targeting your unique neurological patterns.",
      image: <TreatmentPlanIllustration />,
      bgColor: '#f0f9ff', // Light blue
      textColor: '#1e3a8a'
    },
    {
      id: 'ongoing-support',
      title: 'Ongoing Support',
      description: "24/7 AI-assisted coaching combined with access to human specialists ensures you are never alone on your journey to better mental health.",
      image: <SupportIllustration />,
      bgColor: '#f0fdf4', // Light green
      textColor: '#166534'
    },
    {
      id: 'progress-tracking',
      title: 'Progress Tracking',
      description: "Real-time monitoring of neuroplastic changes allows us to adapt your treatment as your brain evolves, ensuring continuous improvement.",
      image: <ProgressTrackerIllustration />,
      bgColor: '#fffbeb', // Light amber
      textColor: '#92400e'
    },
  ];

  return (
    <MultiStageScrollSection
      id="solution-scroll"
      title="How Thrive360 Works"
      subtitle="Our proven process transforms employee mental health through neuroplastic engagement"
      stages={stages}
      className="min-h-screen"
    />
  );
};

export default SolutionScrollSection;