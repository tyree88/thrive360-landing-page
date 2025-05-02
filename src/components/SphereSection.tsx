<motion.div 
        className="fixed inset-0 w-full h-screen -z-10 bg-gradient-to-b from-thrive-purple-darker via-thrive-purple to-thrive-blue-light opacity-90" 
      />

      <motion.div 
        className="fixed left-0 w-full h-4 bg-gradient-to-r from-thrive-purple-light via-thrive-purple to-thrive-blue rounded-full transform -translate-y-1/2"
        style={{ 
          opacity: 0.5, 
          zIndex: 1,
          y: trackY
        }} 
      />

      <motion.div 
        ref={sphereRef}
        className="fixed top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-white via-thrive-purple-light to-thrive-purple shadow-[0_0_80px_40px_rgba(255,255,255,0.6)] transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          x: sphereXSpring,
          y: sphereYSpring,
          scale: sphereScaleSpring,
          zIndex: 100,
          mixBlendMode: 'plus-lighter'
        }}
      />

      <div className="relative z-10">
        {children}
      </div>