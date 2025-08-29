import React from 'react';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  projects: ProjectItem[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects) return null;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 md:pt-32 px-8 md:px-16 pb-16 opacity-0" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
      <div className="container mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-wider mb-12 text-center">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project._id} className="group relative overflow-hidden aspect-[4/3] shadow-lg bg-gray-200 dark:bg-gray-800" style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.2}s forwards`, opacity: 0 }}>
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <h2 className="font-serif text-2xl text-white font-light tracking-wider uppercase">{project.title}</h2>
                <p className="text-sm text-white/80">{project.year}</p>
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

export default Projects;