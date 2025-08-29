
import React from 'react';
import { MenuIcon, CloseIcon, SunIcon, MoonIcon, SpeakerOnIcon, SpeakerOffIcon } from './icons';

interface HeaderProps {
  artistName: string;
  isDarkMode: boolean;
  isSoundOn: boolean;
  isMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onToggleMenu: () => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({
  artistName,
  isDarkMode,
  isSoundOn,
  isMenuOpen,
  onToggleTheme,
  onToggleSound,
  onToggleMenu,
  onGoHome,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 text-primary-light dark:text-primary-dark">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={onGoHome} className="font-serif text-xl md:text-2xl font-extralight uppercase tracking-wider hover:opacity-75 transition-opacity">
          {artistName}
        </button>
        <div className="flex items-center space-x-3 md:space-x-4">
          <button onClick={onToggleSound} aria-label="Toggle Sound" className="p-2 transition-opacity hover:opacity-75">
            {isSoundOn ? <SpeakerOnIcon className="w-5 h-5 md:w-6 md:h-6" /> : <SpeakerOffIcon className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          <button onClick={onToggleTheme} aria-label="Toggle Theme" className="p-2 transition-opacity hover:opacity-75">
            {isDarkMode ? <SunIcon className="w-5 h-5 md:w-6 md:h-6" /> : <MoonIcon className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          <button onClick={onToggleMenu} aria-label="Toggle Menu" className="p-2 transition-opacity hover:opacity-75">
            {isMenuOpen ? <CloseIcon className="w-5 h-5 md:w-6 md:h-6" /> : <MenuIcon className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;