"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

const data = [
  {
    id: "shadcn-ui",
    title: "shadcn/ui: Building a Modern Component Library",
    description:
      "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
    href: "https://ui.shadcn.com",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS: The Utility-First Revolution",
    description:
      "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
    href: "https://tailwindcss.com",
    image:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "astro",
    title: "Astro: The All-in-One Web Framework",
    description:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    href: "https://astro.build",
    image:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "react",
    title: "React: Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
    href: "https://react.dev",
    image:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "nextjs",
    title: "Next.js: The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
    href: "https://nextjs.org",
    image:
      "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
]

const Gallery4Card = ({ item }: { item: Gallery4Item }) => {
  return (
    <a href={item.href} className="group block rounded-[24px] overflow-hidden" aria-label={item.title}>
      <div className="relative w-[280px] h-[504px] md:w-[300px] md:h-[540px] lg:w-[260px] lg:h-[468px] overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt=""
          className="absolute h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
          aria-hidden="true"
        />
        <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white">
          <div className="mb-2 text-lg font-semibold">{item.title}</div>
          <div className="mb-4 text-sm line-clamp-2">{item.description}</div>
          <div className="flex items-center text-sm font-medium">
            Read more{" "}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  )
}

const InfiniteCarouselRow = ({
  items,
  direction = "left",
  speed = 30,
}: {
  items: Gallery4Item[]
  direction?: "left" | "right"
  speed?: number
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const duplicatedItems = [...items, ...items] // Duplicate items for seamless loop

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label={`Scrolling carousel moving ${direction}`}
    >
      <div
        className={`inline-flex gap-4 md:gap-4 lg:gap-[16px] ${isPaused ? "animate-pause" : ""}`}
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite ${isPaused ? "paused" : "running"}`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0">
            <Gallery4Card item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  items = data,
}: Gallery4Props) => {
  return (
    <section className="py-[10px]">
      <div className="w-full px-4">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{title}</h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden space-y-8 lg:space-y-[32px]">
        {/* Top row - scrolling left */}
        <InfiniteCarouselRow items={items} direction="left" speed={30} />

        {/* Bottom row - scrolling right */}
        <InfiniteCarouselRow items={items} direction="right" speed={25} />
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export { Gallery4 }
