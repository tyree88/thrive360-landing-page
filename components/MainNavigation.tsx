'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import NeuroBadge from './ui/NeuroBadge';

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-brand-gray-900">
              Thrive<span className="text-brand-purple-600">360</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brand-gray-800 hover:text-brand-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/solutions/teletherapy" className="text-brand-gray-800 hover:text-brand-purple-600 transition-colors">
              Teletherapy
            </Link>
            <Link href="#about" className="text-brand-gray-800 hover:text-brand-purple-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-brand-gray-800 hover:text-brand-purple-600 transition-colors">
              Contact
            </Link>
            
            <div className="ml-4">
              <NeuroBadge size="sm" />
            </div>
            
            <Link 
              href="#demo" 
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 text-white text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
            >
              Book Demo
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-brand-gray-800 hover:text-brand-purple-600 focus:outline-none"
            >
              {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg" 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-800 hover:bg-brand-purple-50 hover:text-brand-purple-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/solutions/teletherapy" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-800 hover:bg-brand-purple-50 hover:text-brand-purple-600"
              onClick={() => setIsOpen(false)}
            >
              Teletherapy
            </Link>
            <Link 
              href="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-800 hover:bg-brand-purple-50 hover:text-brand-purple-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-800 hover:bg-brand-purple-50 hover:text-brand-purple-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            <div className="mt-4 px-3 py-2">
              <NeuroBadge />
            </div>
            
            <div className="mt-4 px-3 py-2">
              <Link 
                href="#demo" 
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 text-white text-sm font-medium shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Book Demo
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default MainNavigation;