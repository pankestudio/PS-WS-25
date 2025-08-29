import React from 'react';
import { FooterInfo } from '../types';

interface FooterProps {
  info: FooterInfo | null;
}

const Footer: React.FC<FooterProps> = ({ info }) => {
  if (!info) return null;
  
  return (
    <footer className="w-full bg-background-light dark:bg-background-dark text-secondary-light dark:text-secondary-dark p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-xs font-sans mb-4 md:mb-0">{info.copyright}</p>
        <div className="flex space-x-6">
          {info.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="text-xs font-sans uppercase tracking-widest hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;