const HeroSection = ({ scrollYProgress }) => {
   // Constants for responsive calculations
   const sphereSize = 128;
   const screenWidthEstimate = typeof window !== 'undefined' ? window.innerWidth : 1000;
   const screenHeightEstimate = typeof window !== 'undefined' ? window.innerHeight : 800;
   const sphereXOffset = screenWidthEstimate * 0.3; // Reduced for smoother movement

   // Position calculations
   const sphereYInitial = -screenHeightEstimate; // Start above viewport
   const sphereYOnTrack = screenHeightEstimate * 0.25; // Land at 25vh
   const sphereYEnd = screenHeightEstimate * 2; // End position

  // Animation stages timing
  const scrollPoints = {
    start: 0,
    entranceEnd: 0.25,
    trackStart: 0.25,
    trackMid: 0.45,
    trackEnd: 0.65,
    exitStart: 0.65,
    exitEnd: 0.85,
    end: 1
  };

  // Horizontal movement along track
  const sphereX = useTransform(
    scrollYProgress,
    [
      scrollPoints.start, 
      scrollPoints.entranceEnd,
      scrollPoints.trackStart,
      scrollPoints.trackMid,
      scrollPoints.trackEnd,
      scrollPoints.exitEnd,
      scrollPoints.end
    ],
    [
      0, // Start centered
      0, // Stay centered during entrance
      -sphereXOffset, // Move left
      sphereXOffset, // Swing right
      -sphereXOffset * 0.5, // Reduced swing left
      0, // Return to center
      0 // Stay centered
    ]
  );

  // Vertical movement
  const sphereY = useTransform(
    scrollYProgress,
    [
      scrollPoints.start,
      scrollPoints.entranceEnd,
      scrollPoints.trackStart,
      scrollPoints.trackEnd,
      scrollPoints.exitEnd,
      scrollPoints.end
    ],
    [
      sphereYInitial,
      sphereYOnTrack,
      sphereYOnTrack,
      sphereYOnTrack,
      sphereYOnTrack * 2,
      sphereYEnd
    ]
  );

  // Scale animations
  const sphereScale = useTransform(
    scrollYProgress,
    [
      scrollPoints.start,
      scrollPoints.entranceEnd * 0.5,
      scrollPoints.entranceEnd,
      scrollPoints.exitStart,
      scrollPoints.exitEnd,
      scrollPoints.end
    ],
    [
      1,
      1.2, // Scale up during entrance
      1, // Return to normal
      1, // Maintain during track following
      0.8, // Scale down during exit
      0.8 // Maintain reduced scale
    ]
  );

  // Enhanced spring configuration for natural movement
  const springConfig = {
    stiffness: 50,
    damping: 35,
    restDelta: 0.001,
    mass: 1.5
  };

  const sphereXSpring = useSpring(sphereX, springConfig);
  const sphereYSpring = useSpring(sphereY, springConfig);
  const sphereScaleSpring = useSpring(sphereScale, springConfig);

  // Track opacity animation
  const trackOpacity = useTransform(
    scrollYProgress,
    [
      scrollPoints.trackStart,
      scrollPoints.trackStart + 0.05,
      scrollPoints.exitStart - 0.05,
      scrollPoints.exitStart
    ],
    [0, 1, 1, 0]
  );

      <motion.div 
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-gradient-to-br from-white via-thrive-purple-light to-thrive-purple shadow-[0_0_80px_40px_rgba(255,255,255,0.6)]"
        style={{ 
          x: sphereXSpring,
          y: sphereYSpring,
          scale: sphereScaleSpring,
          zIndex: 100,
          translateX: '-50%',
          translateY: '-50%',
          left: '50%',
          top: '50%'
        }}
      />
      
      {/* Track Element */}
      <motion.div
        className="fixed left-0 w-full h-1 bg-gradient-to-r from-thrive-purple-light via-thrive-purple to-thrive-blue"
        style={{
          opacity: trackOpacity,
          y: sphereYSpring,
          zIndex: 90
        }}
      />
}