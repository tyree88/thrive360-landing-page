import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { CompanyLogo } from '@/assets/icons';
import useMobile from '@/hooks/use-mobile';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Problem', href: ROUTES.PROBLEM },
  { label: 'Solution', href: ROUTES.SOLUTION },
  { label: 'Impact', href: ROUTES.IMPACT },
  { label: 'Testimonials', href: ROUTES.TESTIMONIALS },
  { label: 'Contact', href: ROUTES.CONTACT },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navbarClass = cn(
    'fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm px-4 transition-all duration-300',
    isScrolled ? 'py-2' : 'py-4'
  );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={ROUTES.HOME} className="flex items-center space-x-2">
          <CompanyLogo />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="text-gray-700 hover:text-thrive-purple-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href={ROUTES.DEMO} 
            className="hidden md:block px-5 py-2 bg-white text-thrive-purple-500 border border-thrive-purple-500 rounded-full text-sm font-medium hover:bg-thrive-purple-50 transition-colors"
          >
            Get Demo
          </a>
          <a 
            href={ROUTES.CONTACT} 
            className="px-5 py-2 bg-thrive-purple-500 text-white rounded-full text-sm font-medium hover:bg-thrive-purple-600 transition-colors shadow-md"
          >
            Contact Us
          </a>
          {isMobile && (
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden text-gray-700 hover:text-thrive-purple-500 transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={cn(
            "md:hidden w-full bg-white mt-4 rounded-lg shadow-lg p-4 absolute left-0 right-0 transition-all duration-300",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-thrive-purple-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <a 
              href={ROUTES.DEMO} 
              className="text-center py-2 px-3 bg-white text-thrive-purple-500 border border-thrive-purple-500 rounded-full font-medium hover:bg-thrive-purple-50 transition-colors"
              onClick={closeMobileMenu}
            >
              Get Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
