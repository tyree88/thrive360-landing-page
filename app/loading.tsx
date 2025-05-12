'use client';

import { HeroSkeleton, ProblemSectionSkeleton } from "@/components/ui/skeleton";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function Loading() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero Section Skeleton */}
      <BackgroundWrapper variant="dark" className="section">
        <HeroSkeleton className="py-24" />
      </BackgroundWrapper>
      
      {/* Problem Section Skeleton */}
      <BackgroundWrapper variant="dark" className="section">
        <ProblemSectionSkeleton />
      </BackgroundWrapper>
    </main>
  );
}