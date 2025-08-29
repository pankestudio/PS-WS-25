import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Flipbook from './components/Flipbook';
import MenuOverlay from './components/MenuOverlay';
import ProjectShowcase from './components/ProjectShowcase';
import FullPageVideo from './components/FullPageVideo';
import FullPageImage from './components/FullPageImage';
import Footer from './components/Footer';
import Projects from './components/pages/Projects';
import Exhibitions from './components/pages/Exhibitions';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import { fetchAllData } from './services/sanity-client';
import type { SiteData } from './types';

type View = 'home' | 'projects' | 'exhibitions' | 'about' | 'contact';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<View>('home');
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const flipbookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllData();
        setSiteData(data);
      } catch (err: any) {
        console.error("Failed to fetch site data:", err);
        let errorMessage = "Failed to load content. Please check your internet connection.";
        // Provide a specific, actionable error message for the most common issue.
        if (err.message && err.message.includes('CORS')) {
          errorMessage = "Error: Your Sanity project is not configured to allow requests from this website. Please add 'http://localhost:3333' to your project's CORS origins list in the API settings on manage.sanity.io.";
        } else if (err.message) {
          errorMessage = `Failed to load content: ${err.message}`;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleToggleSound = useCallback(() => {
    setIsSoundOn(prev => !prev);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  const handleScrollToFlipbook = useCallback(() => {
    flipbookRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleGoHome = useCallback(() => {
    handleNavigate('home');
  }, [handleNavigate]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <p className="text-primary-light dark:text-primary-dark font-serif">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
     <div className="w-screen h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-8">
       <div className="text-center max-w-2xl">
           <p className="text-red-500 font-serif text-lg font-bold">Application Error</p>
           <p className="text-primary-light dark:text-primary-dark mt-2">{error}</p>
       </div>
     </div>
   );
 }

  if (!siteData) {
     return (
      <div className="w-screen h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-center p-8">
        <p className="text-red-500 font-serif">Failed to load content. Please ensure you have published your documents in the Sanity Studio.</p>
      </div>
    );
  }

  const { artistInfo, bookPages, nextProject, videoProject, finalImage, footerInfo, projectsData, exhibitionsData, aboutInfo } = siteData;

  const renderView = () => {
    switch (currentView) {
      case 'projects':
        return <Projects projects={projectsData} />;
      case 'exhibitions':
        return <Exhibitions exhibitions={exhibitionsData} />;
      case 'about':
        return <About aboutInfo={aboutInfo} />;
      case 'contact':
        return <Contact contactInfo={footerInfo} />;
      case 'home':
      default:
        return (
          <>
            <div className="h-screen">
              <Hero artistInfo={artistInfo} onEnter={handleScrollToFlipbook} />
            </div>
            <div ref={flipbookRef}>
              <Flipbook pages={bookPages} isSoundOn={isSoundOn} />
            </div>
            <ProjectShowcase project={nextProject} />
            <FullPageVideo project={videoProject} />
            <FullPageImage image={finalImage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen text-primary-light dark:text-primary-dark font-sans transition-colors duration-500">
      <Header
        artistName={artistInfo?.name || 'pankestudio'}
        isDarkMode={isDarkMode}
        isSoundOn={isSoundOn}
        isMenuOpen={isMenuOpen}
        onToggleTheme={handleToggleTheme}
        onToggleSound={handleToggleSound}
        onToggleMenu={handleToggleMenu}
        onGoHome={handleGoHome}
      />
      <main>{renderView()}</main>
      {currentView === 'home' && <Footer info={footerInfo} />}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleToggleMenu}
        onGoHome={handleGoHome}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;
