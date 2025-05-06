# Card-by-Card Scroll Animation Implementation

## Overview
This document describes the implementation of the 3D card-by-card scroll animation featured in the StatsSection component of the Thrive360 landing page. The animation creates an engaging deck-of-cards effect where statistics are revealed one at a time as the user scrolls through the section.

## Key Features

- **3D Perspective Effect**: Cards appear with a realistic 3D perspective and depth
- **Progressive Card Reveal**: Cards transition smoothly from one to the next as user scrolls
- **Interactive Navigation**: Users can click indicator dots to jump to specific cards
- **Animated Counters**: Statistical values animate up from zero when revealed
- **Accessibility Support**: Includes reduced motion preferences and keyboard navigation
- **Performance Optimized**: Uses GPU acceleration and optimized animation properties

## Implementation Details

### GSAP Animation System
The animation leverages GSAP (GreenSock Animation Platform) with ScrollTrigger to create a scroll-driven sequence of card transitions.

```typescript
// Create the pinned section for the card animations
const masterTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 10%',
    end: `+=${pinDuration * 100}%`,
    pin: true,
    anticipatePin: 1,
    pinSpacing: true,
    scrub: 0.5,
    onUpdate: (self: ScrollTriggerInstance) => {
      // Update active card based on scroll progress
    }
  }
});
```

### CSS 3D Effects
The 3D effects are achieved using CSS transforms and perspective properties. These are scoped in a CSS module to avoid conflicts.

```css
.perspective {
  perspective: 1500px;
  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
```

### Card Transition Sequence
Each card transition involves animating the current card out while bringing the next card in:

```typescript
// Current card exits
cardTimeline.to(card, {
  autoAlpha: 0,
  scale: 0.8,
  rotationX: -10,
  y: -50,
  duration: 0.5,
  ease: 'power2.in'
}, 0);

// Next card enters
cardTimeline.fromTo(nextCard,
  { 
    autoAlpha: 0, 
    scale: 0.8, 
    rotationX: 10,
    y: 50 
  }, 
  { 
    autoAlpha: 1, 
    scale: 1, 
    rotationX: 0,
    y: 0,
    duration: 0.5,
    ease: 'power2.out' 
  }, 
  0.2 // Slight overlap for smoother transition
);
```

### Interactive Navigation
Users can click on indicator dots to jump to a specific card:

```typescript
onClick={() => {
  // Update active index
  setActiveIndex(index);
  
  // If we have a timeline reference, control it directly
  if (scrollTimeline) {
    // Calculate the progress needed for this card
    const cardProgress = index / (WELLNESS_STATS.length - 1);
    // Animate to the position with a smooth transition
    gsap.to(scrollTimeline, {
      progress: cardProgress,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Update progress bar
    gsap.to(progressIndicatorRef.current, {
      width: `${cardProgress * 100}%`,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
}}
```

### Accessibility Considerations

- **Reduced Motion Support**: Animation complexity is reduced for users who prefer reduced motion
- **Keyboard Navigation**: Users can navigate cards with keyboard using Enter/Space keys
- **ARIA Attributes**: Appropriate ARIA labels and roles for screen readers
- **Live Regions**: Content updates announce changes to screen readers

### Performance Optimizations

- **GPU Acceleration**: Uses transform properties that trigger GPU rendering
- **Will-Change Property**: Hints browser about properties that will animate
- **Efficient DOM Updates**: Minimizes layout thrashing by batching DOM operations
- **Debounced Events**: Prevents excessive calculations during rapid scroll events

## Future Enhancements

- Add vertical swipe gestures for mobile users
- Implement additional card transition effects that can be configured
- Create a reusable Card Slider component based on this implementation
- Further optimize for low-end devices with adaptive quality settings
