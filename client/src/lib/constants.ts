export const ROUTES = {
  HOME: '/',
  PROBLEM: '#problem',
  SOLUTION: '#solution',
  JOURNEY: '#journey',
  IMPACT: '#impact',
  TESTIMONIALS: '#testimonials',
  CONTACT: '#contact',
  DEMO: '#demo',
};

export const COMPANY = {
  NAME: 'Thrive360',
  TAGLINE: 'AI-powered mental health and wellness solutions',
  COPYRIGHT: '© 2025 Thrive360. All rights reserved.',
};

export const ANIMATION_SETTINGS = {
  DEFAULT_DURATION: 0.6,
  DEFAULT_EASE: 'power2.out',
  STAGGER_DELAY: 0.15,
  SCROLL_TRIGGER_START: 'top 80%',
};

export const PROBLEM_STATS = [
  {
    percentage: '60%',
    description: 'of U.S. counties have no psychiatrists available',
    icon: 'user-md',
    color: 'red',
    delay: 0,
  },
  {
    percentage: '74%',
    description: 'of wellness app users drop off within 2 weeks',
    icon: 'mobile-alt',
    color: 'amber',
    delay: 0.2,
  },
  {
    percentage: '40%',
    description: 'no-show rate for teletherapy appointments',
    icon: 'video',
    color: 'blue',
    delay: 0.4,
  },
  {
    percentage: '68%',
    description: 'cite stigma as the reason for avoiding care',
    icon: 'comments',
    color: 'purple',
    delay: 0.6,
  },
];

export const SOLUTION_FEATURES = [
  {
    title: 'Evidence-based Support',
    description: 'Grounded in neuroscience and designed to create lasting change through neuroplasticity.',
    icon: 'brain',
    color: 'green',
  },
  {
    title: '24/7 Availability',
    description: 'Support when and where it\'s needed, without scheduling or waitlists.',
    icon: 'clock',
    color: 'blue',
  },
  {
    title: 'Personalized Care',
    description: 'Adaptive AI creates unique experiences based on individual needs and preferences.',
    icon: 'fingerprint',
    color: 'purple',
  },
  {
    title: 'Progress Tracking',
    description: 'Measurable outcomes for individuals and aggregated insights for organizations.',
    icon: 'chart-line',
    color: 'amber',
  },
];

export const JOURNEY_STAGES = [
  {
    number: 1,
    title: 'Personalized Assessment',
    description: 'AI-powered intake process identifies needs, preferences, and goals to create a custom care plan.',
    tagline: '5-minute assessment',
  },
  {
    number: 2,
    title: 'Custom Treatment Plan',
    description: 'Evidence-based neuroplasticity exercises matched to individual needs and delivered through engaging stories.',
    tagline: 'Adaptive learning',
  },
  {
    number: 3,
    title: '24/7 Support',
    description: 'Continuous access to tools, exercises, and resources with real-time guidance when needed most.',
    tagline: 'Always available',
  },
];

export const IMPACT_STATS = [
  {
    percentage: '340%',
    description: 'Increase in wellness program engagement',
  },
  {
    percentage: '85%',
    description: 'Reduction in administrative overhead',
  },
  {
    percentage: '27%',
    description: 'Improvement in health outcomes',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Thrive360 has been transformative for our company culture. Our team is more engaged, productive, and emotionally resilient. The ROI has been tremendous.',
    author: 'James Wilson',
    role: 'Chief People Officer, TechInnovate',
    rating: 5,
  },
  {
    quote: 'As a healthcare provider, we needed a solution that could scale without sacrificing quality. Thrive360 delivers personalized care that our employees actually use consistently.',
    author: 'Elena Rodriguez',
    role: 'HR Director, CityMed Hospital',
    rating: 5,
  },
  {
    quote: 'Implementation was seamless, and the data insights have been invaluable. We\'ve seen measurable improvements in employee retention and satisfaction scores.',
    author: 'Melissa Thompson',
    role: 'VP of Employee Experience, GlobalFinance',
    rating: 4.8,
  },
];

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  TERMS: 'You must agree to the terms and conditions',
};
