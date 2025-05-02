import React from 'react';
import { ContainerScroll, BentoGrid, BentoCell, ContainerScale } from "./hero-gallery-animation";
import AnimatedButton from "./animated-button";
import { ROUTES } from "@/lib/constants";

export const ThriveCardsAnimation = () => {
  return (
    <ContainerScroll className="h-[350vh] bg-gray-50">
      {/* BentoGrid with animated feature cards */}
      <BentoGrid 
        variant="fourCells" 
        className="sticky left-0 top-0 h-screen w-full p-4 md:p-8 lg:p-10"
      >
        {/* AI-Driven Card */}
        <BentoCell className="bg-gradient-to-br from-thrive-purple-dark to-thrive-purple text-white p-6 flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-bold mb-2">AI-Driven</h3>
          <p className="text-sm md:text-base text-gray-200">Personalized mental health at scale</p>
        </BentoCell>

        {/* Neuroplastic Card */}
        <BentoCell className="bg-gradient-to-br from-thrive-blue-dark to-thrive-blue text-white p-6 flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Neuroplastic</h3>
          <p className="text-sm md:text-base text-gray-200">Evidence-based techniques</p>
        </BentoCell>

        {/* Engaging Card */}
        <BentoCell className="bg-gradient-to-br from-thrive-blue to-thrive-teal text-white p-6 flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Engaging</h3>
          <p className="text-sm md:text-base text-gray-200">80% completion rates</p>
        </BentoCell>

        {/* Measurable Card */}
        <BentoCell className="bg-gradient-to-br from-thrive-teal to-thrive-purple-light text-white p-6 flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Measurable</h3>
          <p className="text-sm md:text-base text-gray-200">Real impact tracking</p>
        </BentoCell>
      </BentoGrid>

      {/* Centered text that fades out on scroll */}
      <ContainerScale className="text-center px-6 md:px-0">
        <span className="text-thrive-purple text-sm md:text-base uppercase tracking-wider font-medium">The Future of Mental Health</span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mt-3 mb-6">
          Discover how Thrive360 is changing the game
        </h1>
        
        <div className="mt-8 mb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedButton 
            href={ROUTES.DEMO} 
            variant="gradient"
            size="lg"
            icon={<i className="fas fa-arrow-right"></i>}
          >
            Get a Demo
          </AnimatedButton>
          
          <div className="flex items-center justify-center">
            <span className="text-gray-500">See the solution</span>
            <div className="w-10 h-10 flex items-center justify-center mt-2">
              <i className="fas fa-chevron-down text-gray-400 animate-bounce"></i>
            </div>
          </div>
        </div>
      </ContainerScale>
    </ContainerScroll>
  );
};

export default ThriveCardsAnimation;
