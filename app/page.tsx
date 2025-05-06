import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import SEO from '../next-seo.config';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Thrive360',
  'url': 'https://yourdomain.com/',
  'logo': 'https://yourdomain.com/og-image.jpg',
  'sameAs': [
    'https://twitter.com/thrive360',
    // Add other social profiles as needed
  ],
};

// Dynamic imports for client components
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'));
const ProblemSection = dynamic(() => import('@/components/sections/ProblemSection'));
const SolutionSection = dynamic(() => import('@/components/sections/SolutionSection'));
const JourneySection = dynamic(() => import('@/components/sections/JourneySection'));
const ImpactSection = dynamic(() => import('@/components/sections/ImpactSection'));
const CaseStudiesSection = dynamic(() => import('@/components/sections/CaseStudiesSection'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA'));
const SphereSection = dynamic(() => import('@/components/sections/SphereSection'));

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<Loading />}>
        <SphereSection>
          <Navbar />
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <JourneySection />
          <ImpactSection />
          <CaseStudiesSection />
          <TestimonialsSection />
          <CTASection />
          <Footer />
          <FloatingCTA />
        </SphereSection>
      </Suspense>
    </>
  );
}