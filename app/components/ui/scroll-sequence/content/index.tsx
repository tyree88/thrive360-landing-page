import React from 'react';

// Content for Personalized Assessment screen
export const PersonalizedAssessmentContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full max-w-[240px] bg-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-semibold text-purple-900">Assessment</h4>
            <p className="text-xs text-purple-700">15 minutes</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-white rounded-full w-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-purple-700">Progress</span>
            <span className="font-medium text-purple-900">75%</span>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[240px]">
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Question 8 of 12</h5>
          <p className="text-sm text-gray-800">How frequently do you experience difficulty concentrating during work?</p>
        </div>
        
        <div className="space-y-2">
          {["Rarely", "Sometimes", "Often", "Very frequently"].map((option, idx) => (
            <div 
              key={idx} 
              className={`p-2 rounded-md border text-sm text-center cursor-pointer transition-colors ${
                idx === 2 ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Content for Treatment Plan screen
export const TreatmentPlanContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full max-w-[240px] bg-blue-50 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Your Personalized Plan</h4>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium text-blue-800">Daily Activities</p>
            </div>
          </div>
          <span className="text-xs text-blue-700">4 tasks</span>
        </div>
        
        <div className="space-y-2 mb-3">
          {["Focus meditation", "Mindfulness break", "Task prioritization"].map((task, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${idx < 2 ? "bg-blue-500 border-blue-500" : "border-blue-300"}`}>
                {idx < 2 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`ml-2 text-xs ${idx < 2 ? "line-through text-blue-500" : "text-blue-900"}`}>{task}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-blue-700">Today's Progress</span>
          <span className="text-xs font-medium text-blue-900">67%</span>
        </div>
        <div className="h-1.5 bg-white rounded-full w-full overflow-hidden mt-1">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '67%' }}></div>
        </div>
      </div>
      
      <div className="w-full max-w-[240px] bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-800">Next Session</h4>
        </div>
        <div className="p-3">
          <div className="flex justify-between mb-2">
            <div>
              <h5 className="text-sm font-medium text-gray-800">Neural Feedback</h5>
              <p className="text-xs text-gray-500">With Dr. Sarah Chen</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Tomorrow, 2:00 PM
          </div>
        </div>
      </div>
    </div>
  );
};

// Content for Support screen
export const SupportContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full max-w-[240px] bg-green-50 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-green-900 mb-3">Support Team</h4>
        
        <div className="flex -space-x-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-green-50 flex items-center justify-center text-xs font-medium text-green-800">DR</div>
          <div className="w-8 h-8 rounded-full bg-green-300 border-2 border-green-50 flex items-center justify-center text-xs font-medium text-green-800">SC</div>
          <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-green-50 flex items-center justify-center text-xs font-medium text-green-800">JT</div>
          <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-50 flex items-center justify-center text-xs font-medium text-green-800">AI</div>
        </div>
        
        <div className="space-y-2 mb-1">
          <div className="flex justify-between text-xs">
            <span className="text-green-800">Response time</span>
            <span className="font-medium text-green-900">~5 min</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-green-800">24/7 availability</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[240px] rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-100 bg-white">
          <h4 className="text-sm font-medium text-gray-800">Chat Support</h4>
        </div>
        <div className="bg-gray-50 p-3 h-[150px] overflow-y-auto">
          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-green-800">
              AI
            </div>
            <div className="ml-2 bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 max-w-[80%]">
              How are you feeling after your meditation session today?
            </div>
          </div>
          
          <div className="flex justify-end mb-3">
            <div className="bg-blue-100 p-2 rounded-lg rounded-tr-none text-xs text-blue-800 max-w-[80%]">
              Much better, I was able to focus for 10 minutes straight!
            </div>
          </div>
          
          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-green-800">
              AI
            </div>
            <div className="ml-2 bg-white p-2 rounded-lg rounded-tl-none text-xs text-gray-700 max-w-[80%]">
              That's excellent progress! Would you like me to adjust tomorrow's exercises to build on this success?
            </div>
          </div>
        </div>
        <div className="p-2 bg-white flex border-t border-gray-100">
          <input type="text" placeholder="Type a message..." className="flex-grow text-xs p-2 border border-gray-200 rounded-l-lg focus:outline-none" />
          <button className="bg-green-500 text-white rounded-r-lg px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Content for Progress Tracker screen
export const ProgressTrackerContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full max-w-[240px] bg-amber-50 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-amber-900 mb-3">Your Progress</h4>
        
        <div className="relative h-28 mb-3">
          {/* Simple chart representation */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-amber-200"></div>
          <div className="absolute left-0 bottom-0 h-full w-px bg-amber-200"></div>
          
          {/* Chart bars */}
          <div className="flex justify-between h-full items-end px-1">
            <div className="w-3 bg-amber-300 rounded-t-sm" style={{ height: '30%' }}></div>
            <div className="w-3 bg-amber-400 rounded-t-sm" style={{ height: '45%' }}></div>
            <div className="w-3 bg-amber-500 rounded-t-sm" style={{ height: '60%' }}></div>
            <div className="w-3 bg-amber-600 rounded-t-sm" style={{ height: '40%' }}></div>
            <div className="w-3 bg-amber-700 rounded-t-sm" style={{ height: '75%' }}></div>
            <div className="w-3 bg-amber-800 rounded-t-sm" style={{ height: '85%' }}></div>
            <div className="w-3 bg-amber-900 rounded-t-sm" style={{ height: '95%' }}></div>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute -bottom-5 left-0 w-full flex justify-between px-1 text-[8px] text-amber-800">
            <div>Week 1</div>
            <div>Week 2</div>
            <div>Week 3</div>
            <div>Week 4</div>
            <div>Week 5</div>
            <div>Week 6</div>
            <div>Week 7</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-amber-800">
          <span>Overall Improvement</span>
          <span className="font-medium">95%</span>
        </div>
      </div>
      
      <div className="w-full max-w-[240px] bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-800">Key Metrics</h4>
        </div>
        <div className="p-3">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Focus Duration</span>
                <span className="font-medium text-gray-800">+132%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Stress Reduction</span>
                <span className="font-medium text-gray-800">-67%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Sleep Quality</span>
                <span className="font-medium text-gray-800">+45%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Team Productivity</span>
                <span className="font-medium text-gray-800">+78%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};