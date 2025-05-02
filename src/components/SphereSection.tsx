<motion.div 
        className="fixed inset-0 w-full h-[400vh] -z-10 opacity-90"
        style={{
          background: `linear-gradient(
            0deg,
            #6D5CA7 200vh,
            #6D5CA7 300vh,
            rgb(225 200 254) 100vh,
            rgb(225 200 254) 190vh,
            rgb(252 231 255) 50vh,
            rgb(252 231 255) 90vh,
            #220F26 0vh, 
            #220F26 40vh
          )`
        }}
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
        className="fixed top-1/2 left-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-white via-thrive-purple-light to-thrive-purple shadow-[0_0_100px_60px_rgba(255,255,255,0.7)] transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          x: sphereXSpring,
          y: sphereYSpring,
          scale: sphereScaleSpring,
          zIndex: 100,
          mixBlendMode: 'plus-lighter',
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      <div className="relative z-10">
        {children}
      </div>