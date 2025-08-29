import React from 'react';
import { ExhibitionItem } from '../../types';

interface ExhibitionsProps {
  exhibitions: ExhibitionItem[];
}

const Exhibitions: React.FC<ExhibitionsProps> = ({ exhibitions }) => {
  if (!exhibitions) return null;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 md:pt-32 px-8 md:px-16 pb-16 opacity-0" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-wider mb-12 text-center">Exhibitions</h1>
        <div className="space-y-8">
          {exhibitions.map((exhibition, index) => (
            <div
              key={exhibition._id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-gray-200 dark:border-gray-800"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.2}s forwards`, opacity: 0 }}
            >
              <div className="md:col-span-2">
                <h2 className="font-serif text-2xl font-semibold text-primary-light dark:text-primary-dark tracking-wide">{exhibition.title}</h2>
                <p className="font-sans text-base text-secondary-light dark:text-secondary-dark">{exhibition.venue}</p>
              </div>
              <div className="md:text-right">
                <p className="font-sans text-base text-primary-light dark:text-primary-dark">{exhibition.date}</p>
                <p className="font-sans text-sm text-secondary-light dark:text-secondary-dark">{exhibition.type} Exhibition</p>
              </div>
            </div>
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

export default Exhibitions;