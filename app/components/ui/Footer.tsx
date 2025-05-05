import React from 'react';
import { CompanyLogo, SocialIcon } from '../../../assets/icons';
import { COMPANY } from '@/lib/constants';

interface FooterLinkGroupProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a 
            href={link.href} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const solutionLinks = [
    { label: 'For Enterprises', href: '#' },
    { label: 'For Healthcare', href: '#' },
    { label: 'For Universities', href: '#' },
    { label: 'For Government', href: '#' },
  ];
  
  const companyLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ];
  
  const resourceLinks = [
    { label: 'Research', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];
  
  const socialPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
  
  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-thrive-purple-400 to-thrive-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-white">Thrive<span className="text-thrive-purple-400">360</span></span>
            </div>
            
            <p className="text-gray-400 mb-6">
              {COMPANY.TAGLINE}
            </p>
            
            <div className="flex space-x-4">
              {socialPlatforms.map((platform) => (
                <SocialIcon key={platform} platform={platform} />
              ))}
            </div>
          </div>
          
          <FooterLinkGroup title="Solutions" links={solutionLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Resources" links={resourceLinks} />
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">{COMPANY.COPYRIGHT}</p>
          <div className="mt-4 md:mt-0">
            <select className="bg-gray-800 text-gray-400 px-3 py-1 rounded border border-gray-700 text-sm">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-thrive-purple-900/20 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-thrive-purple-900/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>
    </footer>
  );
};

export default Footer;
