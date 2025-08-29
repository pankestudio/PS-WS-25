import React from 'react';
import { ArtistInfo } from '../types';

interface HeroProps {
  artistInfo: ArtistInfo | null;
  onEnter: () => void;
}

const Hero: React.FC<HeroProps> = ({ artistInfo, onEnter }) => {
  if (!artistInfo) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
      <div className="max-w-3xl">
        <h1
          className="font-serif text-4xl md:text-6xl font-extrabold uppercase !leading-tight tracking-wider text-primary-light dark:text-primary-dark mb-4 opacity-0"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards' }}
        >
          {artistInfo.statement}
        </h1>
        <p
          className="font-sans text-sm md:text-base text-secondary-light dark:text-secondary-dark mb-10 max-w-2xl mx-auto uppercase tracking-widest opacity-0"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.4s forwards' }}
        >
          {artistInfo.vision}
        </p>
        <button
          onClick={onEnter}
          className="bg-transparent font-sans text-sm font-bold text-primary-light dark:text-primary-dark tracking-widest uppercase hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300 opacity-0 px-4 py-2"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards' }}
        >
          A RETROSPECTIVE
        </button>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;