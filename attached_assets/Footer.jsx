
import React from 'react';
import NeuroBadge from '@/components/ui/NeuroBadge.jsx';

const Footer = () => {
  return (
    <footer className="py-8 bg-brand-gray-50 border-t border-brand-purple-400/20">
      <div className="container mx-auto px-4 text-center text-brand-purple-800 text-sm">
        <p>&copy; {new Date().getFullYear()} Thrive360. All rights reserved.</p>
        <p className="mt-1">Empowering Teletherapy with <NeuroBadge /></p>
      </div>
    </footer>
  );
}

export default Footer;
