'use client';

import { useState } from 'react';
import {
  Skeleton,
  CardSkeleton,
  TextSkeleton,
  CircleSkeleton,
  NavSkeleton,
  HeroSkeleton,
  ProblemCardSkeleton,
  ProblemSectionSkeleton
} from '@/components/ui/skeleton';
import {
  Shimmer,
  ShimmerCard,
  ShimmerButton,
  ShimmerText,
  ShimmerImage,
  ShimmerAvatar
} from '@/components/ui/shimmer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import ProblemSectionSkeleton from '@/app/components/sections/ProblemSectionSkeleton';

/**
 * Component to showcase and preview all the different loading states and skeleton components
 */
export default function LoadingStates() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Loading States</h1>
          <p className="text-slate-300 mb-4">
            A showcase of different loading state components and skeleton screens for the website.
          </p>
          <ShimmerButton 
            className="mb-8 bg-indigo-600 hover:bg-indigo-700" 
            isLoading={isLoading}
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? 'Loading...' : 'Toggle Loading State'}
          </ShimmerButton>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Components</TabsTrigger>
            <TabsTrigger value="shimmer">Shimmer Effects</TabsTrigger>
            <TabsTrigger value="cards">Card Components</TabsTrigger>
            <TabsTrigger value="sections">Page Sections</TabsTrigger>
          </TabsList>
          
          {/* Basic skeleton components */}
          <TabsContent value="basic" className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Basic Skeleton</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Text Skeleton</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TextSkeleton lines={3} />
                <TextSkeleton lines={5} lastLineWidth="40%" />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Avatar & Navigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center space-x-4">
                  <CircleSkeleton size="3.5rem" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <NavSkeleton />
              </div>
            </div>
          </TabsContent>
          
          {/* Shimmer effect components */}
          <TabsContent value="shimmer" className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Shimmer Effects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ShimmerText width="80%" height="2rem" isLoading={isLoading} />
                  <ShimmerText width="60%" height="1.5rem" isLoading={isLoading} />
                  <ShimmerText width="90%" height="1rem" isLoading={isLoading} />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <ShimmerAvatar size="3rem" isLoading={isLoading} />
                    <div className="space-y-2 flex-1">
                      <ShimmerText height="1.25rem" isLoading={isLoading} />
                      <ShimmerText width="60%" height="0.75rem" isLoading={isLoading} />
                    </div>
                  </div>
                  <ShimmerImage aspectRatio="16/9" isLoading={isLoading} />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Shimmer Buttons & Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ShimmerButton className="w-full" isLoading={isLoading}>
                    Button Text
                  </ShimmerButton>
                  <div className="flex space-x-3">
                    <ShimmerButton className="bg-indigo-600" isLoading={isLoading}>
                      Primary
                    </ShimmerButton>
                    <ShimmerButton className="bg-slate-700" isLoading={isLoading}>
                      Secondary
                    </ShimmerButton>
                  </div>
                </div>
                <ShimmerCard className="p-6" isLoading={isLoading}>
                  <h3 className="text-lg font-medium text-white mb-2">Card Title</h3>
                  <p className="text-slate-300">
                    This is a card with a shimmer loading effect applied to it.
                    The content remains visible but with reduced opacity.
                  </p>
                </ShimmerCard>
              </div>
            </div>
          </TabsContent>
          
          {/* Card skeleton components */}
          <TabsContent value="cards" className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Card Skeletons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CardSkeleton />
                <CardSkeleton footer={true} />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Problem Card Skeletons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProblemCardSkeleton />
                <ProblemCardSkeleton />
              </div>
            </div>
          </TabsContent>
          
          {/* Full section skeletons */}
          <TabsContent value="sections" className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Hero Section Skeleton</h2>
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <HeroSkeleton />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Problem Section Skeleton</h2>
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <div className="max-h-[600px] overflow-auto bg-slate-950">
                  <ProblemSectionSkeleton cardCount={4} />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Custom Problem Section Skeleton</h2>
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <div className="max-h-[600px] overflow-auto bg-slate-950">
                  <ProblemSectionSkeleton />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}