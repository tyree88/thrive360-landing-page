@@ .. @@
-    <BackgroundWrapper
-      id="problem"
-      variant="default"
-      className="section flex items-center justify-center"
-      showPatterns={true}
-      showTransitionTop={true}
-      showTransitionBottom={true}
-    >
+    <section id="problem" className="section flex items-center justify-center relative">
       <div ref={sectionRef} className="min-h-screen">
         <div ref={containerRef} className="h-full">
           <ContainerScroll
@@ .. @@
           </ContainerScroll>
         </div>
       </div>
-    </BackgroundWrapper>
+    </section>