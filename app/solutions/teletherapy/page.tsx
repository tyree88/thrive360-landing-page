'use client';

import {
  SolutionsLayout,
  HeroSection,
  ProblemSection,
  SolutionSection,
  CapabilitiesSection,
  HowItWorksSection,
  StatsDemoSection,
  ProofPointsSection,
  FaqSection,
  ContactFormSection
} from '@/components/solutions';
import NeuroBadge from '@/components/ui/NeuroBadge';
import { 
  TrendingDown, 
  LogOut, 
  UserX, 
  EyeOff,
  Zap,
  ClipboardCheck,
  MessageSquare,
  Library,
  LayoutDashboard,
  Plug,
  PackagePlus,
  TrendingUp,
  BarChart,
  Users
} from 'lucide-react';

export default function TeletherapySolutionPage() {
  // Hero Section content
  const heroProps = {
    title: "Supercharge Your Teletherapy with Habit-Forming Care",
    highlightedWords: ["Supercharge", "Habit-Forming"],
    description: "Embed Thrive360's Neuroplastic Engagement™ into your teletherapy platform to boost adherence, cut no-shows, and deepen outcomes.",
    ctaText: "See the Demo",
    ctaLink: "#contact",
    imageSrc: "https://images.unsplash.com/photo-1549925245-f20a1bac6454", // Replace with actual asset
    imageAlt: "Teletherapy session with Neuroplastic Engagement badge on a tablet screen",
    showBadge: true
  };

  // Problem Section content
  const problemProps = {
    title: "The",
    highlightedTitle: "Teletherapy Problem",
    description: "Traditional telehealth apps struggle to keep people coming back—no engagement means no outcomes.",
    problems: [
      {
        icon: <TrendingDown className="h-8 w-8 text-brand-gray-50/80" />,
        title: "High No-Show Rates",
        description: "20–30% of virtual appointments missed."
      },
      {
        icon: <LogOut className="h-8 w-8 text-brand-gray-50/80" />,
        title: "Drop-off After Session 1",
        description: "70% of users quit after first week."
      },
      {
        icon: <UserX className="h-8 w-8 text-brand-gray-50/80" />,
        title: "Unpersonalized Journeys",
        description: "One-size-fits-all content fails to stick."
      },
      {
        icon: <EyeOff className="h-8 w-8 text-brand-gray-50/80" />,
        title: "Data Silos",
        description: "Clinicians lack visibility into home practice."
      }
    ]
  };

  // Solution Section content
  const solutionProps = {
    title: "Turn Therapy into Transformation: Neuroplastic for Telehealth",
    highlightedText: "Transformation",
    description: "Thrive360 slides seamlessly into your existing teletherapy flow—layering in personalized micro-exercises, in-app nudges, and clinician dashboards. Our Neuroplastic engine turns single sessions into sustained behavior change.",
    imageSrc: "https://images.unsplash.com/photo-1661358791020-b4eb3fbe9e0c", // Replace with actual asset
    imageAlt: "Flow diagram of Thrive360 Neuroplastic Engine",
    badgeElement: <NeuroBadge />
  };

  // Capabilities Section content
  const capabilitiesProps = {
    title: "Core Capabilities",
    highlightedText: "Capabilities",
    features: [
      {
        icon: <Zap className="h-6 w-6 text-brand-purple-600" />,
        title: "Neuroplastic Engagement™",
        benefit: "Daily habit-loops, check-ins & rewards to cement new skills",
        showBadge: true
      },
      {
        icon: <ClipboardCheck className="h-6 w-6 text-brand-purple-600" />,
        title: "Homework Integration",
        benefit: "Assign micro-sessions that auto-unlock after each tele-visit"
      },
      {
        icon: <MessageSquare className="h-6 w-6 text-brand-purple-600" />,
        title: "Adaptive Reminders",
        benefit: "Contextual SMS/email/calendar nudges drive at-home practice"
      },
      {
        icon: <Library className="h-6 w-6 text-brand-purple-600" />,
        title: "Tailored Content Library",
        benefit: "500+ clinically validated modules—CBT, DBT, mindfulness, more"
      },
      {
        icon: <LayoutDashboard className="h-6 w-6 text-brand-purple-600" />,
        title: "Clinician Dashboard",
        benefit: "Real-time engagement metrics, drop-off alerts & risk flags"
      },
      {
        icon: <Plug className="h-6 w-6 text-brand-purple-600" />,
        title: "Seamless Embed",
        benefit: "SDK or iFrame embed—no extra login or sandbox needed"
      }
    ],
    badgeComponent: <NeuroBadge />
  };

  // How It Works content
  const howItWorksProps = {
    title: "How It Works: Three-Step Integration",
    highlightedText: "Three-Step Integration",
    steps: [
      {
        icon: <PackagePlus className="h-10 w-10 text-brand-purple-600" />,
        title: "Drop-In & Brand",
        description: "2-week integration via our SDK/iFrame; full white-labeling",
        color: 'var(--colors-brand-purple-600)'
      },
      {
        icon: <Zap className="h-10 w-10 text-brand-blue-600" />,
        title: "Activate Engagement",
        description: "Neuroplastic micro-learning, quizzes & nudges sync with your care plans",
        color: 'var(--colors-brand-blue-600)'
      },
      {
        icon: <TrendingUp className="h-10 w-10 text-brand-purple-400" />,
        title: "Optimize & Intervene",
        description: "Live dashboards highlight disengaged users; automated re-engagement flows",
        color: 'var(--colors-brand-purple-400)'
      }
    ]
  };

  // Stats Demo content
  const statsDemoProps = {
    title: "Scroll-Triggered Stats Demo",
    highlightedText: "Stats Demo",
    stats: [
      { value: "45%", label: "fewer no-shows", id: "no-shows" },
      { value: "+68%", label: "average session completion", id: "completion" },
      { value: "92%", label: "self-reported skill retention", id: "retention" }
    ],
    demoImageSrc: "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0", // Replace with actual asset
    demoImageAlt: "Tablet showing engagement stats",
    badgeElement: <NeuroBadge />
  };

  // Proof Points content
  const proofPointsProps = {
    title: "Real results from real organizations",
    subtitle: "See how organizations are transforming employee wellbeing",
    highlights: [
      {
        icon: <Zap className="w-8 h-8 text-brand-purple-600" />,
        value: "5x",
        label: "Higher Engagement"
      },
      {
        icon: <BarChart className="w-8 h-8 text-brand-blue-600" />,
        value: "28%",
        label: "No-Show Reduction"
      },
      {
        icon: <Users className="w-8 h-8 text-brand-purple-600" />,
        value: "92%",
        label: "Skill Retention"
      }
    ],
    testimonials: [
      {
        companyName: "UFCU",
        companyLogo: "https://images.unsplash.com/photo-1690721694936-fd4b6f249126", // Replace with actual asset
        testimonialText: "Thrive360 has been a game-changer for our workforce, with engagement rates 5x higher than our previous solution.",
        metrics: [
          { value: "78%", label: "of employees actively engaged" },
          { value: "41%", label: "reduction in reported stress" },
          { value: "3.2x", label: "ROI on healthcare costs" }
        ],
        videos: [
          {
            thumbnail: "https://images.unsplash.com/photo-1685955011452-2d9cf1cb4081", // Replace with actual asset
            title: "Hear from UFCU Leadership"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1538688554366-621d446302aa", // Replace with actual asset
            title: "Hear from UFCU Employees"
          }
        ]
      }
    ],
    badgeElement: <NeuroBadge />
  };

  // FAQ content
  const faqProps = {
    title: "Frequently Asked Questions",
    highlightedText: "Questions",
    faqs: [
      {
        question: "How does homework integration work without extra logins?",
        answer: "Our seamless SDK or iFrame embed options integrate directly into your existing platform, utilizing existing user authentication. This means no extra logins are required for users to access assigned homework or micro-sessions, creating a fluid experience."
      },
      {
        question: "Can therapists customize reminder cadence?",
        answer: "Yes, therapists have granular control over reminder settings. Cadence, timing, and even content of reminders (SMS, email, in-app) can be tailored to individual patient needs and care plans through the clinician dashboard."
      },
      {
        question: "Is all user data HIPAA/GDPR compliant?",
        answer: "Absolutely. We prioritize data security and privacy. Our platform is built with HIPAA and GDPR compliance at its core, employing industry-best practices for data encryption, storage, and access control."
      },
      {
        question: "How quickly can we go live?",
        answer: "Standard integration typically takes about 2 weeks, depending on your existing platform and customization needs. Our dedicated support team works closely with you to ensure a smooth and efficient rollout."
      }
    ]
  };

  // Contact form (defaults are fine)
  const contactProps = {
    title: "Ready to Transform Your Teletherapy?",
    description: "Get in touch to schedule a demo and learn how Thrive360 can help your organization."
  };

  return (
    <SolutionsLayout
      hero={<HeroSection {...heroProps} />}
      problem={<ProblemSection {...problemProps} />}
      solution={<SolutionSection {...solutionProps} />}
      capabilities={<CapabilitiesSection {...capabilitiesProps} />}
      howItWorks={<HowItWorksSection {...howItWorksProps} />}
      statsDemo={<StatsDemoSection {...statsDemoProps} />}
      proofPoints={<ProofPointsSection {...proofPointsProps} />}
      faq={<FaqSection {...faqProps} />}
      contact={<ContactFormSection {...contactProps} />}
    />
  );
}