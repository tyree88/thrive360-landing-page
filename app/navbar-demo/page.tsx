import CustomNavbar from "@/components/ui/CustomNavbar"

export default function NavbarDemoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <CustomNavbar />
      <div className="container mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold mb-6">Navbar Demo</h1>
        <p className="text-lg mb-8">This page demonstrates the new navbar with dropdown menus.</p>
        <div className="grid gap-8">
          <section id="section1" className="p-8 bg-slate-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Section 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc
              nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>
          </section>
          <section id="section2" className="p-8 bg-slate-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Section 2</h2>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
