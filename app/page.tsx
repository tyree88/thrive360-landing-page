import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import SectionLoading from '@/components/ui/section-loading';
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

// Define size placeholders to prevent CLS
const sectionSizes = {
  hero: 'min-h-screen',
  stats: 'min-h-[50vh]',
  problem: 'min-h-[80vh]',
  solution: 'min-h-[70vh]',
  journey: 'min-h-[90vh]',
  impact: 'min-h-[70vh]',
  caseStudies: 'min-h-[80vh]',
  testimonials: 'min-h-[60vh]',
  cta: 'min-h-[50vh]',
};

// Priority components load immediately 
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });

// Everything else loads on demand with placeholders
const SphereSection = lazy(() => import('@/components/sections/SphereSection'));
const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const StatsSection = lazy(() => import('@/components/sections/StatsSection'));
const ProblemSection = lazy(() => import('@/components/sections/ProblemSection'));
const SolutionSection = lazy(() => import('@/components/sections/SolutionSection'));
const JourneySection = lazy(() => import('@/components/sections/JourneySection'));
const ImpactSection = lazy(() => import('@/components/sections/ImpactSection'));
const CaseStudiesSection = lazy(() => import('@/components/sections/CaseStudiesSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const FloatingCTA = lazy(() => import('@/components/ui/FloatingCTA'));

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
          
          <section className={sectionSizes.hero}>
            <Suspense fallback={<SectionLoading height={sectionSizes.hero} />}>
              <HeroSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.stats}>
            <Suspense fallback={<SectionLoading height={sectionSizes.stats} />}>
              <StatsSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.problem}>
            <Suspense fallback={<SectionLoading height={sectionSizes.problem} />}>
              <ProblemSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.solution}>
            <Suspense fallback={<SectionLoading height={sectionSizes.solution} />}>
              <SolutionSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.journey}>
            <Suspense fallback={<SectionLoading height={sectionSizes.journey} />}>
              <JourneySection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.impact}>
            <Suspense fallback={<SectionLoading height={sectionSizes.impact} />}>
              <ImpactSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.caseStudies}>
            <Suspense fallback={<SectionLoading height={sectionSizes.caseStudies} />}>
              <CaseStudiesSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.testimonials}>
            <Suspense fallback={<SectionLoading height={sectionSizes.testimonials} />}>
              <TestimonialsSection />
            </Suspense>
          </section>
          
          <section className={sectionSizes.cta}>
            <Suspense fallback={<SectionLoading height={sectionSizes.cta} />}>
              <CTASection />
            </Suspense>
          </section>
          
          <Footer />
          <FloatingCTA />
        </SphereSection>
      </Suspense>
    </>
  );
}