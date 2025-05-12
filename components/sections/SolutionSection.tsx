"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Layers, Zap, BarChart, Users, Sparkles, Shield, Smartphone, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ShineBorder } from "@/components/ui/shine-border"
import { UnifiedSection } from "../ui/unified-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const solutionCards = [
  {
    id: 1,
    title: "Intuitive Design",
    description: "User-centered interfaces that guide visitors through a seamless journey.",
    icon: <Layers className="h-8 w-8 text-indigo-400" />,
    position: "top-left",
  },
  {
    id: 2,
    title: "Performance Optimization",
    description: "Lightning-fast experiences that keep users engaged and reduce bounce rates.",
    icon: <Zap className="h-8 w-8 text-pink-400" />,
    position: "top-right",
  },
  {
    id: 3,
    title: "Data-Driven Decisions",
    description: "Analytics integration that provides actionable insights for continuous improvement.",
    icon: <BarChart className="h-8 w-8 text-indigo-400" />,
    position: "bottom-left",
  },
  {
    id: 4,
    title: "Personalized Experiences",
    description: "Tailored content and interactions that resonate with your specific audience.",
    icon: <Users className="h-8 w-8 text-pink-400" />,
    position: "bottom-right",
  },
  {
    id: 5,
    title: "AI Integration",
    description: "Cutting-edge artificial intelligence to enhance user interactions and insights.",
    icon: <Sparkles className="h-8 w-8 text-indigo-400" />,
    position: "top-left",
  },
  {
    id: 6,
    title: "Enterprise Security",
    description: "Advanced protection measures to safeguard sensitive data and user privacy.",
    icon: <Shield className="h-8 w-8 text-pink-400" />,
    position: "top-right",
  },
  {
    id: 7,
    title: "Mobile-First Approach",
    description: "Responsive designs that deliver optimal experiences across all devices.",
    icon: <Smartphone className="h-8 w-8 text-indigo-400" />,
    position: "bottom-left",
  },
  {
    id: 8,
    title: "Global Scalability",
    description: "Infrastructure that grows with your business and supports worldwide operations.",
    icon: <Globe className="h-8 w-8 text-pink-400" />,
    position: "bottom-right",
  },
]

// Group cards into sets of 4 for the 2x2 grid
const cardSets = Array.from({ length: Math.ceil(solutionCards.length / 4) }, (_, i) =>
  solutionCards.slice(i * 4, i * 4 + 4),
)

const SolutionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ipadRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const gridSetsRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeSetIndex, setActiveSetIndex] = useState(0)
  const [isScrollTriggered, setIsScrollTriggered] = useState(false)

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === "undefined" || !sectionRef.current || !ipadRef.current || !gridContainerRef.current) return

    // Clear any existing ScrollTrigger instances to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Reset refs array
    gridSetsRefs.current = gridSetsRefs.current.slice(0, cardSets.length)
    while (gridSetsRefs.current.length < cardSets.length) {
      gridSetsRefs.current.push(null)
    }

    // Set initial state - iPad and sphere hidden, first grid visible
    gsap.set(ipadRef.current, { autoAlpha: 0, y: 50 })

    // Set initial state for all grid sets
    gridSetsRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.set(ref, { autoAlpha: index === 0 ? 0 : 0 })
      }
    })

    // Create the scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%", // Start when the top of the section is 20% from the top of the viewport
        end: "+=300%", // Create more scroll distance (3x the viewport height)
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        markers: false, // Set to true for debugging
        onEnter: () => {
          setIsScrollTriggered(true)
        },
        onLeaveBack: () => {
          setIsScrollTriggered(false)
        },
        onUpdate: (self) => {
          // Calculate which set should be active based on scroll progress
          // Use the first 2/3 of the scroll for card transitions
          const progressForCards = Math.min(self.progress * 1.5, 1)
          const newIndex = Math.min(Math.floor(progressForCards * cardSets.length), cardSets.length - 1)
          setActiveSetIndex(newIndex)
        },
      },
    })

    // Animate iPad in
    tl.to(
      ipadRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      0,
    )

    // Animate first grid in
    tl.to(
      gridSetsRefs.current[0],
      {
        autoAlpha: 1,
        duration: 0.5,
      },
      0.3,
    )

    // Animate between grid sets
    cardSets.forEach((_, index) => {
      if (index < cardSets.length - 1) {
        // Fade out current grid
        tl.to(
          gridSetsRefs.current[index],
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          `+=${0.5}`,
        )

        // Fade in next grid
        tl.to(
          gridSetsRefs.current[index + 1],
          {
            autoAlpha: 1,
            duration: 0.3,
          },
          "-=0.1",
        )
      }
    })

    // After all card sets have been shown, add a transition animation
    tl.to(
      ipadRef.current,
      {
        y: -50,
        scale: 0.9,
        autoAlpha: 0.7,
        duration: 0.5,
      },
      "+=0.5",
    )

    // Add a glow effect to signal transition to next section
    tl.to(
      ".section-transition-glow",
      {
        autoAlpha: 1,
        scale: 1.2,
        duration: 0.5,
      },
      "-=0.3",
    )

    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <UnifiedSection
      ref={sectionRef}
      id="solution"
      className="min-h-screen w-full mx-auto"
      customBackground="linear-gradient(180deg, #0f172a 0%, #1a1f35 10%, #1e2243 20%, #2a2356 30%, #2e2a5e 40%, #3a3173 50%, #efe9ff 90%)"
      showTransitionBottom={true}
      transitionBottomColor="#efe9ff"
      width="full"
      fullBleed={true}
      containerClassName="w-full max-w-none px-0 sm:px-0 lg:px-0 flex justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left column: Typography & Copy */}
        <div className="flex flex-col space-y-6">
          {/* Context badge */}
          <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-950 text-indigo-300 rounded-full w-fit">
            The Solution
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Meet{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              Thrive360
            </span>
          </h2>

          {/* Supporting paragraph */}
          <p className="text-xl text-slate-300 max-w-xl">
            Transforming digital experiences through cutting-edge solutions that deliver real results.
          </p>

          {/* Benefit list */}
          <div className="space-y-4 mt-2">
            {solutionCards.slice(0, 3).map((card) => (
              <div key={card.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1.5 bg-gradient-to-br from-indigo-900/30 to-pink-900/30 rounded-full">
                  {card.icon}
                </div>
                <p className="text-slate-200 font-medium pt-1">{card.title}</p>
              </div>
            ))}
          </div>

          {/* Call to action button */}
          <div className="pt-4">
            <button className="px-8 py-3 bg-thrive-purple hover:bg-thrive-purple-dark text-white font-semibold rounded-full transition-all hover:scale-105">
              Discover How →
            </button>
          </div>
        </div>

        {/* Right column: Image Montage */}
        <div className="relative mt-8 md:mt-0">
          {/* Primary screenshot */}
          <div ref={ipadRef} className="relative z-10 w-full max-w-[80%] mx-auto opacity-0">
            <ShineBorder
              borderRadius={24}
              borderWidth={2}
              duration={10}
              color={["rgba(124, 58, 237, 0.5)", "rgba(236, 72, 153, 0.5)"]}
              className="w-full p-0 min-w-0"
            >
              <div className="bg-slate-900 rounded-[24px] border-[12px] border-slate-800 shadow-2xl shadow-indigo-900/20 overflow-hidden">
                {/* iPad Screen */}
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                  {/* iPad Content */}
                  <div ref={gridContainerRef} className="w-full h-full p-4 relative">
                    {cardSets.map((cardSet, setIndex) => (
                      <div
                        key={`set-${setIndex}`}
                        ref={(el) => (gridSetsRefs.current[setIndex] = el)}
                        className="absolute inset-0 grid grid-cols-2 gap-4 p-4 opacity-0"
                      >
                        <AnimatePresence>
                          {setIndex === activeSetIndex &&
                            cardSet.map((card, cardIndex) => (
                              <GridCard
                                key={card.id}
                                card={card}
                                index={cardIndex}
                                isActive={setIndex === activeSetIndex}
                              />
                            ))}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ShineBorder>
          </div>

          {/* Floating call-out 1 */}
          <motion.div
            className="absolute top-[10%] -left-[10%] z-20 w-[40%] rounded-xl shadow-lg bg-white p-3 hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isScrollTriggered ? 1 : 0,
              x: isScrollTriggered ? 0 : -20,
              transition: { delay: 0.5, duration: 0.5 },
            }}
          >
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4">
              <h4 className="font-bold text-indigo-900 text-sm">Intuitive Design</h4>
              <p className="text-xs text-indigo-700 mt-1">User-centered interfaces that guide visitors</p>
            </div>
          </motion.div>

          {/* Floating call-out 2 */}
          <motion.div
            className="absolute bottom-[15%] -right-[5%] z-20 w-[40%] rounded-xl shadow-lg bg-white p-3 hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isScrollTriggered ? 1 : 0,
              x: isScrollTriggered ? 0 : 20,
              transition: { delay: 0.8, duration: 0.5 },
            }}
          >
            <div className="bg-gradient-to-r from-pink-100 to-indigo-100 rounded-lg p-4">
              <h4 className="font-bold text-pink-900 text-sm">AI Integration</h4>
              <p className="text-xs text-pink-700 mt-1">Cutting-edge artificial intelligence</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Transition glow effect */}
      <div className="section-transition-glow absolute inset-0 w-full bg-gradient-to-t from-indigo-500/30 to-transparent opacity-0 pointer-events-none z-0"></div>
    </UnifiedSection>
  )
}

const GridCard = ({ card, index, isActive }: { card: (typeof solutionCards)[0]; index: number; isActive: boolean }) => {
  // Different animation variants for each position
  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      rotateX: 10,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.1,
      },
    },
  }

  // Micro-interactions for icon
  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + index * 0.1,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      rotate: 5,
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  }

  // Micro-interactions for title
  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4 + index * 0.1,
        duration: 0.3,
      },
    },
  }

  // Micro-interactions for description
  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5 + index * 0.1,
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={variants}
      whileHover="hover"
      whileTap="tap"
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 md:p-6 h-full flex flex-col"
    >
      <motion.div
        className="p-3 bg-gradient-to-br from-indigo-900/30 to-pink-900/30 rounded-lg w-fit mb-4"
        variants={iconVariants}
      >
        {card.icon}
      </motion.div>

      <motion.h3 className="text-lg md:text-xl font-bold text-white mb-2" variants={titleVariants}>
        {card.title}
      </motion.h3>

      <motion.p className="text-sm md:text-base text-slate-300" variants={descriptionVariants}>
        {card.description}
      </motion.p>
    </motion.div>
  )
}

export default SolutionSection
