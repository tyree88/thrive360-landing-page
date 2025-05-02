import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollGridItemProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  row: number;
  col: number;
  totalColumns: number;
  fadeIn?: boolean;
}

/**
 * Individual grid item that moves diagonally based on scroll position
 */
const ScrollGridItem: React.FC<ScrollGridItemProps> = ({ 
  children, 
  className = '',
  index,
  row,
  col,
  totalColumns,
  fadeIn = true
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Calculate the direction and distance of the diagonal movement based on position
  const getTransformProperties = () => {
    // Determine if the item moves up-right or down-left based on position in grid
    const isOddRow = row % 2 === 1;
    
    // Calculate X direction - alternate between columns
    const xDirection = col % 2 === 0 ? -1 : 1;
    
    // Calculate Y direction - alternate between rows
    const yDirection = isOddRow ? -1 : 1;
    
    // Calculate the movement amount based on position (edges move more)
    const edgeFactor = col === 0 || col === totalColumns - 1 ? 1.5 : 1;
    
    return {
      x: xDirection * 60 * edgeFactor, // pixels to move horizontally
      y: yDirection * 40 * edgeFactor, // pixels to move vertically
      delay: index * 0.05 // staggered delay
    };
  };
  
  return (
    <div 
      ref={itemRef} 
      className={`scroll-grid-item ${className}`}
      data-transform={JSON.stringify(getTransformProperties())}
    >
      {children}
    </div>
  );
};

interface ScrollGridMotionProps {
  children: React.ReactNode[];
  className?: string;
  columnsSmall?: number;
  columnsLarge?: number;
  gridClassName?: string;
  itemClassName?: string;
  fadeItems?: boolean;
}

/**
 * Grid component that creates a diagonally moving grid tied to scroll position
 */
const ScrollGridMotion: React.FC<ScrollGridMotionProps> = ({
  children,
  className = '',
  columnsSmall = 2,
  columnsLarge = 4,
  gridClassName = '',
  itemClassName = '',
  fadeItems = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [totalColumns, setTotalColumns] = useState(columnsLarge);
  
  // Handle responsive column count
  useEffect(() => {
    const handleResize = () => {
      setTotalColumns(window.innerWidth >= 768 ? columnsLarge : columnsSmall);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [columnsLarge, columnsSmall]);
  
  // Set up the scroll-tied animations
  useEffect(() => {
    if (!gridRef.current) return;
    
    const gridItems = gridRef.current.querySelectorAll('.scroll-grid-item');
    
    // Create a timeline for the grid items
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
    
    // Animate each grid item based on its data attributes
    gridItems.forEach((item) => {
      const el = item as HTMLElement;
      const transformProps = el.dataset.transform ? JSON.parse(el.dataset.transform) : { x: 0, y: 0, delay: 0 };
      
      if (fadeItems) {
        tl.fromTo(el, 
          { opacity: 0, x: 0, y: 0 },
          { opacity: 1, duration: 0.5 },
          transformProps.delay
        );
      }
      
      tl.fromTo(el,
        { x: 0, y: 0 },
        { x: transformProps.x, y: transformProps.y, duration: 1 },
        `<${fadeItems ? 0.2 : 0}`
      );
    });
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [fadeItems, totalColumns]);
  
  // Prepare the grid items with proper row/column information
  const prepareGridItems = () => {
    return React.Children.toArray(children).map((child, index) => {
      const row = Math.floor(index / totalColumns);
      const col = index % totalColumns;
      
      return (
        <ScrollGridItem
          key={index}
          index={index}
          row={row}
          col={col}
          totalColumns={totalColumns}
          fadeIn={fadeItems}
          className={itemClassName}
        >
          {child}
        </ScrollGridItem>
      );
    });
  };
  
  return (
    <div ref={gridRef} className={`scroll-grid-motion ${className}`}>
      <div 
        className={`grid grid-cols-${columnsSmall} md:grid-cols-${columnsLarge} gap-4 md:gap-6 ${gridClassName}`}
      >
        {prepareGridItems()}
      </div>
    </div>
  );
};

export default ScrollGridMotion;
