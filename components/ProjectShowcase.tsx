import React from 'react';
import { Project } from '../types';

interface ProjectShowcaseProps {
  project: Project | null;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project }) => {
  if (!project) return null;

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-8 md:p-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Text Content */}
        <div className="flex flex-col justify-center text-left">
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-primary-light dark:text-primary-dark mb-4 md:mb-6 !leading-tight uppercase">
            {project.title}
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary-light dark:text-secondary-dark max-w-md uppercase tracking-widest mb-10">
            {project.description}
          </p>
          <button
            className="bg-transparent font-sans text-sm font-bold text-primary-light dark:text-primary-dark tracking-widest uppercase hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300 px-4 py-2 self-start"
          >
            see project
          </button>
        </div>
        {/* Image Content */}
        <div className="w-full h-auto aspect-[4/3]">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover shadow-xl"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;