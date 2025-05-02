import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import useMobile from '@/hooks/use-mobile';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Solutions', href: ROUTES.SOLUTION },
  { label: 'Company', href: ROUTES.ABOUT },
  { label: 'Resources', href: ROUTES.RESOURCES },
];

// Simple logo component matching the style in the screenshot
const Logo = () => (
  <div className="flex items-center font-bold text-white">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 mr-2 flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-full"></div>
    </div>
    <span>Healthy<br />Together</span>
  </div>
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navbarClass = cn(
    'fixed top-0 w-full z-50 px-4 py-4 transition-all duration-300',
    isScrolled ? 'bg-[#101219]/90 backdrop-blur-sm' : 'bg-transparent'
  );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={ROUTES.HOME} className="flex items-center">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center">
          <a 
            href={ROUTES.CONTACT} 
            className="px-5 py-3 bg-[#5D5FEF] bg-opacity-90 text-white rounded-full text-sm font-medium hover:bg-opacity-100 transition-colors shadow-md"
          >
            Talk to Our Team
          </a>
          {isMobile && (
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden ml-4 text-white transition-colors"
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
            "md:hidden w-full bg-[#101219] mt-4 rounded-lg shadow-lg p-4 absolute left-0 right-0 transition-all duration-300",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-white hover:text-white/80 transition-colors py-2 px-3 rounded-md hover:bg-white/10"
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <a 
              href={ROUTES.CONTACT} 
              className="text-center py-2 px-3 bg-[#5D5FEF] text-white rounded-full font-medium hover:bg-opacity-90 transition-colors"
              onClick={closeMobileMenu}
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
