import { ThriveLogo } from "./thrive-logo"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export function ThriveFooter() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <ThriveLogo variant="white" type="full" size="medium" className="mb-4" />
            <p className="text-slate-300 mt-4 max-w-md">
              Thrive360 delivers comprehensive mental health solutions for organizations and individuals, creating
              healthier, more productive workplaces.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="text-slate-300 hover:text-white transition-colors">
                  Businesses
                </Link>
              </li>
              <li>
                <Link href="/eap-solutions" className="text-slate-300 hover:text-white transition-colors">
                  EAP Solutions
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-slate-300 hover:text-white transition-colors">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="text-slate-300 hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-slate-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-slate-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@thrive360.com" className="hover:text-white transition-colors">
                  info@thrive360.com
                </a>
              </li>
              <li className="flex items-center text-slate-300">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Thrive360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
