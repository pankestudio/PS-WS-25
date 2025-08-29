import React from 'react';
import { FooterInfo } from '../../types';

interface ContactProps {
  contactInfo: FooterInfo | null;
}

const Contact: React.FC<ContactProps> = ({ contactInfo }) => {
  if (!contactInfo) return null;
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 md:pt-32 px-8 md:px-16 pb-16 flex items-center justify-center text-center opacity-0" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
      <div className="max-w-md">
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-wider mb-6" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0 }}>
          Contact
        </h1>
        <p className="font-sans text-base md:text-lg text-secondary-light dark:text-secondary-dark mb-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s forwards', opacity: 0 }}>
          For inquiries, collaborations, or commissions, please get in touch.
        </p>
        {contactInfo.email && (
           <a href={`mailto:${contactInfo.email}`} className="font-sans text-lg md:text-xl text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300 inline-block" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards', opacity: 0 }}>
            {contactInfo.email}
          </a>
        )}
        <div className="flex justify-center space-x-6 mt-12" style={{ animation: 'fadeInUp 0.8s ease-out 0.8s forwards', opacity: 0 }}>
          {contactInfo.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="text-sm font-sans uppercase tracking-widest hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Contact;