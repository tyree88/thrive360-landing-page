import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      let progress = (windowHeight - top) / (windowHeight + height);
      progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
      
      setScrollYProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = scrollYProgress * -20 + 20; // 20 to 0
  const scale = scrollYProgress * (scaleDimensions()[1] - scaleDimensions()[0]) + scaleDimensions()[0]; // 0.7/1.05 to 0.9/1
  const translate = scrollYProgress * -100; // 0 to -100

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

interface HeaderProps {
  translate: number;
  titleComponent: React.ReactNode;
}

export const Header = ({ translate, titleComponent }: HeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: translate }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto text-center mb-8 md:mb-16"
    >
      {titleComponent}
    </motion.div>
  );
};

interface CardProps {
  rotate: number;
  scale: number;
  translate: number;
  children: React.ReactNode;
}

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        rotateX: rotate,
        scale: scale,
        y: translate
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        background: "linear-gradient(to bottom, #F5F2FF, #F5F2FF)"
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#988AD5]/30 p-2 md:p-6 rounded-[30px] shadow-2xl overflow-hidden"
    >
      <div 
        className="h-full w-full overflow-hidden rounded-2xl md:rounded-2xl md:p-4"
        style={{ 
          background: "linear-gradient(to bottom, #ffffff, #f8f5ff)",
          boxShadow: "inset 0 0 20px rgba(152, 138, 213, 0.1)"
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

