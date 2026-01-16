import React from 'react';
import { Rocket, MessageCircle, Info, Activity, Menu, X, Globe, Map, Settings, Database, User, Gamepad2 } from 'lucide-react';
import { PageView } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { playHover, playClick } = useSound();

  const navItems = [
    { id: PageView.HOME, label: t('nav_home'), icon: <Rocket size={18} /> },
    { id: PageView.GALAXY_MAP, label: t('nav_map'), icon: <Map size={18} /> },
    { id: PageView.DASHBOARD, label: t('nav_deck'), icon: <Activity size={18} /> },
    { id: PageView.SIMULATION, label: t('nav_sim'), icon: <Gamepad2 size={18} /> },
    { id: PageView.ARCHIVES, label: t('nav_archives'), icon: <Database size={18} /> },
    { id: PageView.CHAT, label: t('nav_chat'), icon: <MessageCircle size={18} /> },
  ];

  const handleNavClick = (id: PageView) => {
    playClick();
    onNavigate(id);
    setIsOpen(false);
  };

  const toggleLang = () => {
    playClick();
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 glass-panel-heavy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick(PageView.HOME)} onMouseEnter={playHover}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg animate-pulse-slow blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-black/40 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                <span className="text-cyan-400 font-mono-tech text-xl font-bold">N</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white font-mono-tech group-hover:text-cyan-300 transition-colors">
                NEBULA<span className="text-purple-400">NEXUS</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Quantum Interface v3.0</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={playHover}
                  className={`
                    relative group px-3 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-transparent
                    ${currentPage === item.id
                      ? 'bg-cyan-900/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </div>
                  {/* Active Indicator */}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-cyan-400 shadow-[0_0_8px_cyan]"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Profile Link Icon */}
             <button 
                onClick={() => handleNavClick(PageView.PROFILE)}
                className={`p-2 rounded-lg transition-colors ${currentPage === PageView.PROFILE ? 'text-cyan-400 bg-white/10' : 'text-gray-400 hover:text-white'}`}
             >
                <User size={18} />
             </button>

             {/* Settings Link Icon */}
             <button 
                onClick={() => handleNavClick(PageView.SETTINGS)}
                className={`p-2 rounded-lg transition-colors ${currentPage === PageView.SETTINGS ? 'text-cyan-400 bg-white/10' : 'text-gray-400 hover:text-white'}`}
             >
                <Settings size={18} />
             </button>

             {/* Language Switcher */}
            <button 
              onClick={toggleLang}
              onMouseEnter={playHover}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 hover:border-cyan-500/50 bg-white/5 hover:bg-cyan-900/20 transition-all group"
            >
              <Globe size={16} className="text-gray-400 group-hover:text-cyan-300" />
              <span className="text-xs font-mono font-bold text-gray-300 group-hover:text-cyan-300 w-6 text-center">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <div className="xl:hidden">
              <button 
                onClick={() => {
                  playClick();
                  setIsOpen(!isOpen);
                }}
                className="text-gray-300 hover:text-white p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden glass-panel border-t border-white/10 absolute w-full z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-4 rounded-md text-sm font-medium ${
                  currentPage === item.id ? 'bg-purple-900/30 text-cyan-300' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
              </button>
            ))}
            <button
                onClick={() => handleNavClick(PageView.PROFILE)}
                className={`block w-full text-left px-3 py-4 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5`}
              >
                <div className="flex items-center gap-3">
                  <User size={18} />
                  {t('nav_profile')}
                </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;