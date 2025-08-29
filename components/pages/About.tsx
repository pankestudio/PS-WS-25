import React from 'react';
import { AboutInfo } from '../../types';

interface AboutProps {
  aboutInfo: AboutInfo | null;
}

// Helper function to process Sanity's Portable Text blocks into an array of strings.
// This correctly joins spans (e.g., bold, italic) into a single paragraph.
const renderBio = (bio: AboutInfo['bio'] | undefined): string[] => {
  if (!bio) return [];
  return bio
    .filter(block => block._type === 'block' && block.children)
    .map(block => {
      return block.children.map(span => span.text).join('');
    });
};


const About: React.FC<AboutProps> = ({ aboutInfo }) => {
  if (!aboutInfo) return null;

  const bioParagraphs = renderBio(aboutInfo.bio);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 md:pt-32 px-8 md:px-16 pb-16 flex items-center justify-center opacity-0" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-gray-800" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0 }}>
            {aboutInfo.imageUrl && (
              <img src={aboutInfo.imageUrl} alt="About pankestudio" className="w-full h-full object-cover shadow-xl" />
            )}
          </div>
          <div className="text-left">
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-wider mb-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s forwards', opacity: 0 }}>About</h1>
            <div className="space-y-6">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="font-sans text-base md:text-lg text-secondary-light dark:text-secondary-dark leading-relaxed" style={{ animation: `fadeInUp 0.8s ease-out ${0.6 + index * 0.2}s forwards`, opacity: 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
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

export default About;