# Thrive360 Style System

This document outlines the standardized style system for the Thrive360 application. The goal is to ensure visual consistency across all components and pages.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Utilities](#utilities)
7. [Migration Guide](#migration-guide)

## Getting Started

The Thrive360 style system is built on top of Tailwind CSS and shadcn/ui components. It provides a set of standardized design tokens and components to ensure visual consistency.

### Key Files

- `styles/theme.ts`: Contains all design tokens and styling guidelines
- `app/globals.css`: Global CSS styles and utility classes
- `tailwind.config.ts`: Tailwind configuration with theme extensions
- `hooks/use-theme.tsx`: Hook to access theme values in components
- `styles/migration-helpers.ts`: Utilities to help migrate from old styles

### Viewing the Style Guide

You can view the complete style guide at `/style-guide` in the application.

## Color System

The color system is built around three main color palettes:

1. **Primary (Purple)**: Used for primary actions, key UI elements, and brand identity
2. **Secondary (Teal)**: Used for secondary actions, accents, and visual variety
3. **Neutral (Gray)**: Used for text, backgrounds, and UI elements

Each color palette includes 10 shades (50-900) for flexibility.

### Usage

\`\`\`tsx
// In Tailwind classes
<div className="bg-thrive-purple-600 text-white">Primary Button</div>

// In CSS variables
.my-element {
  background-color: var(--thrive-purple-600);
  color: white;
}

// Using the theme hook
import useTheme from '@/hooks/use-theme';

function MyComponent() {
  const { colors } = useTheme();
  return (
    <div style={{ backgroundColor: colors.primary[600] }}>
      Primary Button
    </div>
  );
}
\`\`\`

## Typography

The typography system defines standard text styles for headings, paragraphs, and other text elements.

### Font Sizes

- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
- `4xl`: 2.25rem (36px)
- `5xl`: 3rem (48px)
- `6xl`: 3.75rem (60px)
- `7xl`: 4.5rem (72px)

### Font Weights

- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700
- `extrabold`: 800

### Standard Text Elements

\`\`\`tsx
<h1>Heading 1</h1> // text-4xl md:text-5xl lg:text-6xl font-bold text-thrive-purple-900
<h2>Heading 2</h2> // text-3xl md:text-4xl font-bold text-thrive-purple-800
<h3>Heading 3</h3> // text-2xl md:text-3xl font-semibold text-thrive-purple-800
<h4>Heading 4</h4> // text-xl md:text-2xl font-semibold text-thrive-purple-700
<h5>Heading 5</h5> // text-lg md:text-xl font-medium text-thrive-purple-700
<h6>Heading 6</h6> // text-base md:text-lg font-medium text-thrive-purple-700
<p>Paragraph</p>   // text-base text-thrive-purple-700
<a>Link</a>        // text-thrive-purple-600 hover:text-thrive-purple-700
\`\`\`

## Spacing

The spacing system uses a consistent scale for margins, padding, and layout spacing.

- `px`: 1px
- `0.5`: 0.125rem (2px)
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- `5`: 1.25rem (20px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `10`: 2.5rem (40px)
- `12`: 3rem (48px)
- `16`: 4rem (64px)
- `20`: 5rem (80px)
- `24`: 6rem (96px)
- ... and more

## Components

The style system includes standardized components with consistent styling:

### Button

\`\`\`tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="gradient">Gradient</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Rounded
<Button rounded="default">Default Rounded</Button>
<Button rounded="full">Full Rounded</Button>
\`\`\`

### Card

\`\`\`tsx
import { Card } from '@/components/ui/card';

// Variants
<Card variant="default">Default Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="filled">Filled Card</Card>
<Card variant="gradient">Gradient Card</Card>

// Padding
<Card padding="none">No Padding</Card>
<Card padding="sm">Small Padding</Card>
<Card padding="default">Default Padding</Card>
<Card padding="lg">Large Padding</Card>
\`\`\`

### Section

\`\`\`tsx
import { Section } from '@/components/ui/section';

// Variants
<Section variant="default">Default Section</Section>
<Section variant="light">Light Section</Section>
<Section variant="dark">Dark Section</Section>
<Section variant="gradient">Gradient Section</Section>

// Spacing
<Section spacing="sm">Small Spacing</Section>
<Section spacing="default">Default Spacing</Section>
<Section spacing="lg">Large Spacing</Section>
<Section spacing="xl">Extra Large Spacing</Section>

// Container
<Section container={true}>With Container</Section>
<Section container={false}>Without Container</Section>
\`\`\`

### Badge

\`\`\`tsx
import { Badge } from '@/components/ui/badge';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="tag">Tag</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>
\`\`\`

### Input

\`\`\`tsx
import { Input } from '@/components/ui/input';

// Variants
<Input variant="default" placeholder="Default input" />
<Input variant="filled" placeholder="Filled input" />
<Input variant="dark" placeholder="Dark input" />
\`\`\`

## Utilities

The style system includes utility classes for common styling patterns:

### Gradient Text

\`\`\`tsx
<span className="gradient-text">Gradient Text</span>
\`\`\`

### Animated Gradient Bar

\`\`\`tsx
<div className="animated-gradient-bar h-1"></div>
\`\`\`

### Glassmorphic Effect

\`\`\`tsx
<div className="glassmorphic p-4">Glassmorphic Content</div>
\`\`\`

### Radial Gradient Background

\`\`\`tsx
<div className="radial-gradient-purple min-h-screen"></div>
\`\`\`

## Migration Guide

To migrate from the old styling approach to the new standardized system:

1. Replace direct color values with theme variables
2. Use the standardized components (Button, Card, Section, etc.)
3. Use the migration helpers for legacy class names

\`\`\`tsx
import { mapLegacyClasses } from '@/styles/migration-helpers';

// Before
<div className="bg-light-purple-100 text-purple-800">Content</div>

// After
<div className={mapLegacyClasses("bg-light-purple-100 text-purple-800")}>Content</div>
// Or directly use the new classes
<div className="bg-thrive-purple-100 text-thrive-purple-800">Content</div>
\`\`\`

For components, replace custom styling with the standardized components:

\`\`\`tsx
// Before
<div className="bg-white rounded-lg shadow-md p-6 border border-light-purple-100">
  Card content
</div>

// After
<Card variant="default" padding="default">
  Card content
</Card>
\`\`\`

For sections, use the standardized Section component:

\`\`\`tsx
// Before
<section className="py-12 md:py-20 bg-light-purple-50">
  <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
    Section content
  </div>
</section>

// After
<Section variant="light" spacing="default">
  Section content
</Section>
