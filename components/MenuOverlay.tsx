import React from 'react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onNavigate: (view: 'home' | 'projects' | 'exhibitions' | 'about' | 'contact') => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, onGoHome, onNavigate }) => {
  const menuItems: { label: string; view: 'projects' | 'exhibitions' | 'about' | 'contact' }[] = [
    { label: 'Projects', view: 'projects' },
    { label: 'Exhibitions', view: 'exhibitions' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' }
  ];

  const handleNavigationClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background-dark/70 dark:bg-black/80 backdrop-blur-lg"></div>
      <nav className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <ul className="text-center">
            <li className="m-4">
                <button
                onClick={(e) => handleNavigationClick(e, onGoHome)}
                className="font-serif text-3xl md:text-5xl tracking-wide hover:text-accent-dark transition-colors duration-300 font-extralight uppercase"
                style={{ animation: isOpen ? `fadeInUp 0.5s 0.2s ease forwards` : 'none', opacity: 0 }}
                >
                Home
                </button>
            </li>
          {menuItems.map((item, index) => (
            <li key={item.view} className="m-4">
              <button
                onClick={(e) => handleNavigationClick(e, () => onNavigate(item.view))}
                className="font-serif text-3xl md:text-5xl tracking-wide hover:text-accent-dark transition-colors duration-300 font-extralight uppercase"
                style={{ animation: isOpen ? `fadeInUp 0.5s ${index * 0.1 + 0.3}s ease forwards` : 'none', opacity: 0 }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MenuOverlay;