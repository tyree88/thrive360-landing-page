/**
 * SECTION UPDATE GUIDE
 *
 * To update your existing section components to work with the full-bleed approach:
 *
 * 1. Remove any container divs from the root of your section components
 * 2. Remove any background styling from the section components (it will be applied by the SectionContainer)
 * 3. Make sure your section components don't have fixed heights that might conflict with the min-h-screen
 *
 * BEFORE:
 *
 * export function ExampleSection() {
 *   return (
 *     <section className="bg-purple-900 py-20">
 *       <div className="container mx-auto px-4">
 *         <h2>Section Title</h2>
 *         <p>Section content...</p>
 *       </div>
 *     </section>
 *   )
 * }
 *
 * AFTER:
 *
 * export function ExampleSection() {
 *   return (
 *     <div className="py-20 w-full">
 *       <h2>Section Title</h2>
 *       <p>Section content...</p>
 *     </div>
 *   )
 * }
 *
 * Then in your page:
 *
 * <SectionContainer fullBleed={true} background="bg-purple-900" className="min-h-screen">
 *   <ExampleSection />
 * </SectionContainer>
 */

export default function SectionUpdateGuide() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Section Update Guide</h1>
      <p>Please see the comments in the code for guidance on updating your section components.</p>
    </div>
  )
}
