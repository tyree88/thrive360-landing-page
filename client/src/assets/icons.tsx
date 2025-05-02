import React from 'react';

type IconProps = {
  className?: string;
};

export const ThriveIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`w-10 h-10 bg-gradient-to-br from-thrive-purple-500 to-thrive-purple-400 rounded-lg flex items-center justify-center shadow-md ${className}`}>
    <span className="text-white font-bold text-xl">T</span>
  </div>
);

export const SpotlightBackground: React.FC<IconProps> = ({ className }) => (
  <div className={`absolute inset-0 bg-gradient-to-br from-thrive-purple-900 via-thrive-purple-700 to-thrive-purple-500 parallax-bg ${className}`}>
    <div className="spotlight"></div>
  </div>
);

export const WavyUnderline: React.FC<IconProps> = ({ className }) => (
  <svg className={`absolute w-full bottom-0 left-0 h-3 text-thrive-purple-300 opacity-50 ${className}`} viewBox="0 0 200 9">
    <path fill="currentColor" d="M0,8.9c49.5-8.4,102.8-7.3,150.9,0.3c24.5,3.9,49.2,7.4,49.2,0.4c0-5.4-24.2-12-48.1-11.9C103.7-2.2,44.1,13.2,0,8.9z"/>
  </svg>
);

export const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={`flex text-amber-500 ${className}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <i key={`star-${i}`} className="fas fa-star"></i>
      ))}
      {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
    </div>
  );
};

export const CompanyLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <ThriveIcon />
    <span className="text-xl font-bold text-gray-900">Thrive<span className="text-thrive-purple-500">360</span></span>
  </div>
);

export const FeatureIcon: React.FC<{ icon: string; color: string; className?: string }> = ({ 
  icon, 
  color, 
  className 
}) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-500',
  };
  
  const bgColor = colorMap[color] || 'bg-gray-100 text-gray-600';
  
  return (
    <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0 ${className}`}>
      <i className={`fas fa-${icon}`}></i>
    </div>
  );
};

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-6 h-6 bg-green-100 rounded-full flex items-center justify-center ${className}`}>
    <i className="fas fa-check text-green-600 text-xs"></i>
  </div>
);

export const SocialIcon: React.FC<{ platform: string; className?: string }> = ({ 
  platform, 
  className 
}) => (
  <a href="#" className={`text-gray-400 hover:text-white transition-colors ${className}`}>
    <i className={`fab fa-${platform} text-xl`}></i>
  </a>
);
