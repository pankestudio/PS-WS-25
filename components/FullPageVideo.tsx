import React from 'react';
import { VideoProject } from '../types';

interface FullPageVideoProps {
  project: VideoProject | null;
}

const FullPageVideo: React.FC<FullPageVideoProps> = ({ project }) => {
  if (!project) return null;

  return (
    <section className="h-screen w-full relative overflow-hidden bg-background-dark">
      <video
        key={project.videoUrl}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={project.posterUrl || ''}
      >
        {project.videoUrl && <source src={project.videoUrl} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default FullPageVideo;