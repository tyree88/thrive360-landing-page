// Centralized route constants for site navigation
// Update this file as you add or change routes in your Next.js app

export const ROUTES = {
  HOME: '/',
  SOLUTION: '/solution',
  ABOUT: '/about',
  RESOURCES: '/resources',
  CONTACT: '/contact',
  DEMO: '/demo', // Add or remove as needed
};

export const FORM_VALIDATION_MESSAGES = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  // Add more validation messages as needed.
};

export const CASE_STUDIES = [
  {
    id: 1,
    title: 'Case Study 1',
    subtitle: 'Metro Health Network',
    description: 'This is a brief description of Case Study 1.',
    bgColor: 'from-thrive-purple-400 to-thrive-purple-600',
    iconName: 'hospital',
    results: [
      { metric: '30%', label: 'Increase in engagement' },
      { metric: '15%', label: 'Reduction in absenteeism' },
      { metric: '2x', label: 'ROI in 6 months' },
    ],
    quote: {
      text: 'Thrive360 transformed our approach to employee well-being. The results speak for themselves.',
      author: 'Dr. Jane Smith',
      role: 'Chief Wellness Officer',
    },
  },
  {
    id: 2,
    title: 'Case Study 2',
    subtitle: 'Acme Corp',
    description: 'This is a brief description of Case Study 2.',
    bgColor: 'from-thrive-blue-400 to-thrive-blue-600',
    iconName: 'building',
    results: [
      { metric: '25%', label: 'Boost in productivity' },
      { metric: '10%', label: 'Decrease in turnover' },
      { metric: '4.8/5', label: 'Employee satisfaction' },
    ],
    quote: {
      text: 'Our team is happier and more productive thanks to Thrive360.',
      author: 'John Doe',
      role: 'HR Director',
    },
  },
];

export const IMPACT_STATS = [
  {
    percentage: '85%',
    description: 'Completion rate vs. industry avg of 23%',
  },
  {
    percentage: '42%',
    description: 'Stress reduction after 30 days of use',
  },
  {
    percentage: '3,000+',
    description: 'Employees impacted at Metro Health Network',
  },
];

export const PROBLEM_STATS = [
  {
    id: 'productivity-loss',
    icon: 'fa-brain',
    color: '#6D3CA7',
    value: 67,
    unit: '%',
    description: 'Of employees report decreased productivity due to mental health challenges'
  },
  {
    id: 'program-engagement',
    icon: 'fa-chart-line',
    color: '#3462AE',
    value: 23,
    unit: '%',
    description: 'Average engagement rate with traditional wellness programs'
  },
  {
    id: 'burnout-rate',
    icon: 'fa-heart',
    color: '#E57373',
    value: 76,
    unit: '%',
    description: 'Of professionals experienced burnout symptoms in the past year'
  },
  {
    id: 'business-impact',
    icon: 'fa-dollar-sign',
    color: '#10B981',
    value: 300,
    unit: 'B',
    description: 'Annual cost of employee wellness issues to businesses globally (USD)'
  },
];

export const JOURNEY_STAGES = [
  {
    number: 1,
    stage: 'Awareness',
    title: 'Awareness',
    description: 'Recognizing the need for mental health support.',
    tagline: 'Start your journey',
  },
  {
    number: 2,
    stage: 'Engagement',
    title: 'Engagement',
    description: 'Actively participating in wellness programs.',
    tagline: 'Take action',
  },
  {
    number: 3,
    stage: 'Transformation',
    title: 'Transformation',
    description: 'Achieving lasting positive change.',
    tagline: 'See results',
  },
];

export const SOLUTION_FEATURES = [
  {
    icon: 'fa-brain',
    color: '#6D3CA7',
    title: 'Neuro-based',
    description: 'Using brain science to create lasting change.'
  },
  {
    icon: 'fa-robot',
    color: '#3B82F6',
    title: 'AI-powered',
    description: 'Smart personalization for every user.'
  },
];

export const TESTIMONIALS = [
  {
    rating: 4.8,
    quote: 'Thrive360 made a real difference for our team.',
    author: 'Jane Doe',
    role: 'CEO, Acme Corp'
  },
  {
    rating: 5.0,
    quote: 'The best wellness platform we have used.',
    author: 'John Smith',
    role: 'HR Director, Metro Health'
  },
];

export const COMPANY = {
  TAGLINE: 'Transforming mental health for modern organizations.',
  COPYRIGHT: '© 2024 Thrive360. All rights reserved.'
}; 