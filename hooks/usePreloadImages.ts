
import { useEffect, useRef } from 'react';
import { BookPage } from '../types';

const usePreloadImages = (pages: BookPage[], currentPageIndex: number) => {
  const preloadedImages = useRef<Map<number, HTMLImageElement>>(new Map());

  useEffect(() => {
    const pagesToLoadIndices = [
      currentPageIndex, 
      currentPageIndex + 1, 
      currentPageIndex + 2
    ];

    pagesToLoadIndices.forEach(index => {
      const page = pages[index];
      if (page && page.imageUrl && !preloadedImages.current.has(index)) {
        const img = new Image();
        img.src = page.imageUrl;
        preloadedImages.current.set(index, img);
      }
    });
  }, [currentPageIndex, pages]);
};

export default usePreloadImages;