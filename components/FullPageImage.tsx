import React from 'react';
import { FinalImage } from '../types';

interface FullPageImageProps {
  image: FinalImage | null;
}

const FullPageImage: React.FC<FullPageImageProps> = ({ image }) => {
  if (!image) return null;

  return (
    <section className="h-screen w-full bg-background-light dark:bg-background-dark flex items-center justify-center p-8 md:p-16">
      {image.imageUrl && (
        <img
          src={image.imageUrl}
          alt="Final showcase"
          className="max-w-full max-h-[70vh] w-auto h-auto object-contain shadow-2xl"
        />
      )}
    </section>
  );
};

export default FullPageImage;