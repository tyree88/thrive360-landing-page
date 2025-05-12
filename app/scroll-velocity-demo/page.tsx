import { ScrollVelocityDemo } from "@/components/ui/scroll-velocity-demo"

export default function ScrollVelocityDemoPage() {
  return (
    <div className="container mx-auto py-20">
      <h1 className="mb-10 text-center text-4xl font-bold">Scroll Velocity Demo</h1>
      <p className="mb-10 text-center text-lg">Scroll down to see the effect in action</p>
      <ScrollVelocityDemo />

      {/* Add some extra content to enable scrolling */}
      <div className="mt-[100vh]"></div>
    </div>
  )
}
