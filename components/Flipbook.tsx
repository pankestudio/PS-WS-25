import React, { useState, useMemo, useCallback } from 'react';
import type { Howl } from 'howler';
import { BookPage } from '../types';
import usePreloadImages from '../hooks/usePreloadImages';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface FlipbookProps {
  pages: BookPage[];
  isSoundOn: boolean;
}

const Flipbook: React.FC<FlipbookProps> = ({ pages, isSoundOn }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Index of the left page of the current spread
  const [flippingState, setFlippingState] = useState<{ pageIndex: number | null; direction: 'next' | 'prev' | null }>({ pageIndex: null, direction: null });
  const pageTurnSound = useMemo<Howl | null>(() => {
    if (typeof window !== 'undefined' && (window as any).Howl) {
        return new (window as any).Howl({
            src: ['https://cdn.pixabay.com/audio/2022/02/22/audio_01281a8b66.mp3'],
            volume: 0.5,
        });
    }
    return null;
  }, []);

  usePreloadImages(pages, currentPageIndex);

  const handleNextPage = useCallback(() => {
    if (!pages || flippingState.pageIndex !== null || currentPageIndex >= pages.length - 2) return;
    if (isSoundOn && pageTurnSound) {
        pageTurnSound.play();
    }
    setFlippingState({ pageIndex: currentPageIndex, direction: 'next' });
    setTimeout(() => {
      setCurrentPageIndex((prev) => prev + 2);
      setFlippingState({ pageIndex: null, direction: null });
    }, 1200);
  }, [flippingState.pageIndex, currentPageIndex, pages, isSoundOn, pageTurnSound]);

  const handlePrevPage = useCallback(() => {
    if (flippingState.pageIndex !== null || currentPageIndex === 0) return;
    if (isSoundOn && pageTurnSound) {
        pageTurnSound.play();
    }
    const pageToFlip = currentPageIndex - 2;
    setFlippingState({ pageIndex: pageToFlip, direction: 'prev' });
    setCurrentPageIndex(pageToFlip);
    setTimeout(() => {
        setFlippingState({ pageIndex: null, direction: null });
    }, 1200);
  }, [flippingState.pageIndex, currentPageIndex, isSoundOn, pageTurnSound]);

  const getPageZIndex = (index: number) => {
    if (!pages) return 0;
    const isBeingFlipped = flippingState.pageIndex !== null && (index === flippingState.pageIndex || index === flippingState.pageIndex + 1);
    if (isBeingFlipped) {
      return 100;
    }
    const isCurrentSpread = index >= currentPageIndex && index <= currentPageIndex + 1;
    if (isCurrentSpread) {
      return pages.length - index + 1;
    }
    return pages.length - index;
  };

  if (!pages || pages.length === 0) {
    return <div className="relative w-full min-h-screen flex flex-col items-center justify-center"><p>Loading book...</p></div>
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 perspective-[2500px]">
      <div className="relative w-full max-w-5xl aspect-[2/1.4] transform-style-preserve-3d">
         {pages.map((page, index) => {
            const isLeftPage = index % 2 === 0;
            const isTurned = index < currentPageIndex;

            let animationClass = '';
            if (flippingState.pageIndex === index) {
              if (flippingState.direction === 'next') {
                animationClass = 'flipping-forward';
              } else if (flippingState.direction === 'prev') {
                animationClass = 'flipping-backward';
              }
            }
            
            const initialTransform = isLeftPage && isTurned ? 'rotateY(-180deg)' : 'rotateY(0deg)';

            return (
                 <div
                    key={page._id}
                    className={`absolute w-1/2 h-full page ${animationClass}`}
                    style={{
                        left: isLeftPage ? '0' : '50%',
                        transformOrigin: isLeftPage ? 'right' : 'left',
                        zIndex: getPageZIndex(index),
                        transform: animationClass ? undefined : initialTransform,
                    }}
                 >
                    <div className="page-inner">
                        {/* Front */}
                        <div className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-lg" style={{ backfaceVisibility: 'hidden' }}>
                            {page.imageUrl && <img src={page.imageUrl} alt={page.title} className="w-full h-full object-cover" />}
                            <div className="shadow-overlay"></div>
                             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="font-serif text-lg font-extralight uppercase tracking-widest mb-1">{page.title}</h3>
                                <p className="text-sm font-sans font-light opacity-80 leading-snug">{page.description}</p>
                            </div>
                            <span className="absolute bottom-2 right-4 text-xs text-white/50">{page.pageNumber}</span>
                        </div>
                        {/* Back */}
                         <div className="absolute w-full h-full bg-gray-100 dark:bg-gray-900" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                           <div className={`w-full h-full flex items-center justify-center p-4 ${!isLeftPage ? 'border-r-2' : 'border-l-2'} border-gray-200 dark:border-gray-700`}>
                                {/* Back page content can go here */}
                           </div>
                        </div>
                    </div>
                </div>
            )
         })}
      </div>
      
      <button
        onClick={handlePrevPage}
        disabled={currentPageIndex === 0 || flippingState.pageIndex !== null}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 z-[101] p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-glow-light dark:hover:shadow-glow-dark disabled:opacity-0 disabled:scale-100 disabled:pointer-events-none"
        aria-label="Previous Page"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
     
      <button
        onClick={handleNextPage}
        disabled={currentPageIndex >= pages.length - 2 || flippingState.pageIndex !== null}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 z-[101] p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-glow-light dark:hover:shadow-glow-dark disabled:opacity-0 disabled:scale-100 disabled:pointer-events-none"
        aria-label="Next Page"
      >
        <ArrowRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Flipbook;