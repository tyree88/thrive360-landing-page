export interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  tags: string[]
  summary: string
  challenge: string
  solution: string
  results: {
    title: string
    value: string
  }[]
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  imageUrl: string
  logoUrl?: string
  featured: boolean
  date: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "global-tech-corp",
    title: "Reducing Burnout and Improving Retention at Global Tech Corp",
    client: "Global Tech Corp",
    industry: "Technology",
    tags: ["Employee Wellness", "Retention", "Tech Industry"],
    summary:
      "How a leading technology company reduced employee burnout by 42% and improved retention rates using Thrive360's personalized mental health platform.",
    challenge:
      "Global Tech Corp was experiencing high turnover rates due to employee burnout, with exit interviews revealing that 68% of departing employees cited mental health challenges as a primary reason for leaving. Traditional wellness programs weren't addressing individual needs effectively.",
    solution:
      "We implemented Thrive360's comprehensive mental health platform, providing personalized assessments, AI-driven recommendations, and on-demand support for all 5,000+ employees. The solution included custom integration with their existing HR systems and tailored content for tech industry-specific stressors.",
    results: [
      {
        title: "Reduction in Burnout",
        value: "42%",
      },
      {
        title: "Improvement in Retention",
        value: "37%",
      },
      {
        title: "Program Engagement",
        value: "89%",
      },
      {
        title: "ROI",
        value: "3.5x",
      },
    ],
    testimonial: {
      quote:
        "Thrive360 transformed our approach to employee wellbeing. The personalized nature of the platform means each team member gets exactly what they need, when they need it.",
      author: "Sarah Chen",
      position: "Chief People Officer, Global Tech Corp",
    },
    imageUrl: "/placeholder.svg?key=wlem0",
    logoUrl: "/abstract-tech-logo.png",
    featured: true,
    date: "2023-06-15",
  },
  {
    id: "healthcare-partners",
    title: "Supporting Healthcare Workers Through Pandemic Stress",
    client: "Healthcare Partners",
    industry: "Healthcare",
    tags: ["Healthcare", "Crisis Response", "Frontline Workers"],
    summary:
      "How Healthcare Partners supported 10,000+ frontline workers through pandemic-related stress and trauma with targeted mental health interventions.",
    challenge:
      "Healthcare Partners' workforce was experiencing unprecedented levels of stress, anxiety, and trauma symptoms during the COVID-19 pandemic. Existing support systems were overwhelmed, and staff burnout was threatening both employee wellbeing and patient care quality.",
    solution:
      "We deployed Thrive360's rapid-response mental health platform with specialized content for healthcare workers. The solution included trauma-informed assessments, peer support networks, and 24/7 crisis intervention tools, all accessible via mobile devices for busy healthcare professionals.",
    results: [
      {
        title: "Reduction in Stress Levels",
        value: "38%",
      },
      {
        title: "Decrease in Sick Days",
        value: "26%",
      },
      {
        title: "Staff Retention Improvement",
        value: "31%",
      },
      {
        title: "User Satisfaction",
        value: "4.8/5",
      },
    ],
    testimonial: {
      quote:
        "In our most challenging times, Thrive360 provided a lifeline for our staff. The platform's ability to scale support while maintaining a personal touch was exactly what we needed.",
      author: "Dr. Michael Rivera",
      position: "Chief Medical Officer, Healthcare Partners",
    },
    imageUrl: "/placeholder.svg?key=xt26w",
    logoUrl: "/healthcare-logo.png",
    featured: true,
    date: "2022-11-30",
  },
  {
    id: "financial-services-group",
    title: "Building Resilience in High-Pressure Financial Services",
    client: "Financial Services Group",
    industry: "Finance",
    tags: ["Finance", "Stress Management", "Performance"],
    summary:
      "How a global financial services firm improved employee performance and wellbeing by implementing proactive mental health support.",
    challenge:
      "Financial Services Group's high-pressure environment was leading to stress-related performance issues, with 72% of employees reporting symptoms of anxiety and 45% showing signs of burnout. Traditional wellness benefits had low engagement rates of just 23%.",
    solution:
      "We customized Thrive360's platform for the financial sector, focusing on stress resilience, performance psychology, and work-life integration. The solution included executive coaching, team-based challenges, and anonymous support pathways to address stigma concerns in the industry.",
    results: [
      {
        title: "Increase in Productivity",
        value: "28%",
      },
      {
        title: "Reduction in Stress Levels",
        value: "47%",
      },
      {
        title: "Program Engagement",
        value: "76%",
      },
      {
        title: "Estimated Annual Savings",
        value: "$4.2M",
      },
    ],
    testimonial: {
      quote:
        "The ROI speaks for itself, but what's most impressive is how Thrive360 changed our culture. Mental fitness is now seen as essential to peak performance, not a sign of weakness.",
      author: "James Wilson",
      position: "Head of Talent Strategy, Financial Services Group",
    },
    imageUrl: "/placeholder.svg?key=0o2no",
    logoUrl: "/finance-company-logo.png",
    featured: false,
    date: "2023-03-22",
  },
  {
    id: "retail-chain",
    title: "Supporting Retail Workers Through Digital Transformation",
    client: "National Retail Chain",
    industry: "Retail",
    tags: ["Retail", "Digital Transformation", "Frontline Support"],
    summary:
      "How a national retail chain supported employees through a major digital transformation while improving mental health outcomes.",
    challenge:
      "National Retail Chain was undergoing a significant digital transformation that was creating anxiety and resistance among their 25,000+ workforce. Employee satisfaction scores had dropped by 31%, and turnover had increased by 28% in six months.",
    solution:
      "We implemented Thrive360's change management mental health program, combining digital literacy training with personalized wellbeing support. The solution included manager enablement tools, peer champions, and targeted interventions for different roles within the organization.",
    results: [
      {
        title: "Improvement in Change Readiness",
        value: "56%",
      },
      {
        title: "Reduction in Turnover",
        value: "23%",
      },
      {
        title: "Increase in Employee Satisfaction",
        value: "34%",
      },
      {
        title: "Digital Adoption Rate",
        value: "92%",
      },
    ],
    testimonial: {
      quote:
        "Thrive360 helped us recognize that digital transformation is as much about people as it is about technology. By supporting our team's mental wellbeing, we achieved our business goals while strengthening our culture.",
      author: "Lisa Johnson",
      position: "VP of Retail Operations, National Retail Chain",
    },
    imageUrl: "/modern-retail-tech.png",
    logoUrl: "/generic-retail-logo.png",
    featured: false,
    date: "2023-01-18",
  },
  {
    id: "manufacturing-solutions",
    title: "Improving Safety and Wellbeing in Manufacturing",
    client: "Manufacturing Solutions Inc.",
    industry: "Manufacturing",
    tags: ["Manufacturing", "Safety", "Blue-collar Workforce"],
    summary:
      "How a manufacturing company reduced workplace incidents by 64% by addressing mental health factors affecting safety and performance.",
    challenge:
      "Manufacturing Solutions Inc. was experiencing an increase in workplace safety incidents, with analysis revealing that mental health factors like stress, fatigue, and attention issues were contributing to 73% of cases. Traditional safety programs weren't addressing these underlying factors.",
    solution:
      "We developed a specialized version of Thrive360's platform for industrial settings, focusing on the connection between mental wellbeing and workplace safety. The solution included shift-friendly access options, sleep improvement programs, and stress management tools designed for manufacturing environments.",
    results: [
      {
        title: "Reduction in Safety Incidents",
        value: "64%",
      },
      {
        title: "Decrease in Absenteeism",
        value: "41%",
      },
      {
        title: "Workers' Comp Savings",
        value: "$1.8M",
      },
      {
        title: "Program Participation",
        value: "82%",
      },
    ],
    testimonial: {
      quote:
        "By recognizing the human factors in safety, Thrive360 helped us create a truly comprehensive approach to worker wellbeing. The results have exceeded our expectations in every metric that matters.",
      author: "Robert Martinez",
      position: "Director of Operations, Manufacturing Solutions Inc.",
    },
    imageUrl: "/modern-manufacturing-facility.png",
    logoUrl: "/manufacturing-company-logo.png",
    featured: false,
    date: "2022-09-05",
  },
  {
    id: "education-district",
    title: "Supporting Teacher Wellbeing in Urban Education",
    client: "Metropolitan Education District",
    industry: "Education",
    tags: ["Education", "Teacher Support", "Public Sector"],
    summary:
      "How an urban school district improved teacher retention and student outcomes by prioritizing educator mental health.",
    challenge:
      "Metropolitan Education District was facing a teacher retention crisis, losing 24% of staff annually, with exit surveys indicating burnout and mental health challenges as primary factors. Student outcomes were suffering as a result of the constant turnover and teacher stress.",
    solution:
      "We implemented Thrive360's education-focused mental health platform across all 43 schools in the district. The solution included trauma-informed practices, classroom stress management tools, and specialized support for the unique challenges faced by urban educators.",
    results: [
      {
        title: "Improvement in Teacher Retention",
        value: "58%",
      },
      {
        title: "Reduction in Reported Burnout",
        value: "47%",
      },
      {
        title: "Improvement in Student Engagement",
        value: "29%",
      },
      {
        title: "Program Satisfaction",
        value: "4.7/5",
      },
    ],
    testimonial: {
      quote:
        "Thrive360 recognized that teacher wellbeing and student success are inseparable. By supporting our educators' mental health, we've created a more positive learning environment for everyone.",
      author: "Dr. Alicia Washington",
      position: "Superintendent, Metropolitan Education District",
    },
    imageUrl: "/diverse-classroom-teacher.png",
    logoUrl: "/placeholder.svg?height=100&width=100&query=education%20district%20logo",
    featured: false,
    date: "2023-08-10",
  },
]

export const INDUSTRIES = Array.from(new Set(CASE_STUDIES.map((study) => study.industry)))

export const TAGS = Array.from(new Set(CASE_STUDIES.flatMap((study) => study.tags))).sort()
