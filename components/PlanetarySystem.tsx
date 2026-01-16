import React, { useState } from 'react';
import { Planet } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Info, X } from 'lucide-react';

const PlanetarySystem: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const planets: Planet[] = [
    { 
      id: 'p1', name: 'Kepler-186f', type: 'Habitable', distance: '582 ly', 
      color: 'bg-green-400', size: 20, orbitSpeed: 20,
      description: language === 'en' ? 'First Earth-size planet found in the habitable zone of another star.' : 'Hành tinh kích thước Trái đất đầu tiên được tìm thấy trong vùng có thể sống được của một ngôi sao khác.'
    },
    { 
      id: 'p2', name: 'Gliese 667 Cc', type: 'Super-Earth', distance: '23.6 ly', 
      color: 'bg-red-500', size: 35, orbitSpeed: 35,
      description: language === 'en' ? 'A super-Earth exoplanet orbiting within the habitable zone of the red dwarf star Gliese 667 C.' : 'Một siêu Trái đất ngoại hành tinh quay quanh vùng có thể sống được của sao lùn đỏ Gliese 667 C.'
    },
    { 
      id: 'p3', name: 'Proxima Centauri b', type: 'Rocky', distance: '4.2 ly', 
      color: 'bg-yellow-200', size: 15, orbitSpeed: 12,
      description: language === 'en' ? 'The closest known exoplanet to the Solar System.' : 'Ngoại hành tinh gần Hệ Mặt Trời nhất được biết đến.'
    },
    { 
      id: 'p4', name: 'TRAPPIST-1e', type: 'Ocean World', distance: '39 ly', 
      color: 'bg-blue-400', size: 18, orbitSpeed: 8,
      description: language === 'en' ? 'One of seven Earth-sized planets in the TRAPPIST-1 system, likely containing significant water.' : 'Một trong bảy hành tinh kích thước Trái đất trong hệ TRAPPIST-1, có khả năng chứa lượng nước đáng kể.'
    },
    { 
      id: 'p5', name: 'HD 40307 g', type: 'Gas Dwarf', distance: '42 ly', 
      color: 'bg-purple-400', size: 50, orbitSpeed: 50,
      description: language === 'en' ? 'A potential Super-Earth or Mini-Neptune orbiting in the habitable zone.' : 'Một Siêu Trái Đất hoặc Sao Hải Vương nhỏ tiềm năng quay trong vùng có thể sống được.'
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-galaxy-950 perspective-[1000px]">
       
       {/* UI Overlay */}
       <div className="absolute top-24 left-8 z-20 pointer-events-none">
          <h2 className="text-4xl font-bold font-mono-tech text-white border-l-4 border-cyan-500 pl-4">
             {t('map_title')}
          </h2>
          <p className="text-cyan-400/60 mt-2 font-mono text-sm animate-pulse">
             >> {t('map_scan')}
          </p>
       </div>

       {/* 3D Scene Container - Tilted */}
       <div 
         className="relative w-[800px] h-[800px] transform-style-3d rotate-x-60 scale-75 md:scale-100 transition-transform duration-700 ease-out"
         style={{ transform: 'rotateX(60deg)' }}
       >
          {/* Central Star */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-100 rounded-full shadow-[0_0_100px_rgba(253,224,71,0.6)] animate-pulse z-10">
             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-spin-slow opacity-80"></div>
          </div>

          {/* Orbits and Planets */}
          {planets.map((planet, idx) => {
             const orbitSize = (idx + 1) * 140 + 100; // concentric rings
             return (
               <div 
                 key={planet.id}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 hover:border-cyan-500/30 transition-colors duration-300 cursor-pointer group"
                 style={{ 
                    width: `${orbitSize}px`, 
                    height: `${orbitSize}px`,
                 }}
               >
                  {/* Rotating Container for Planet */}
                  <div 
                    className="w-full h-full animate-spin linear infinite" 
                    style={{ animationDuration: `${planet.orbitSpeed}s` }}
                  >
                     {/* The Planet Itself - Counter-rotated to face camera essentially */}
                     <div 
                        onClick={() => setSelectedPlanet(planet)}
                        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${planet.color} shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer hover:scale-150 transition-transform duration-300 z-20`}
                        style={{ 
                           width: `${planet.size}px`, 
                           height: `${planet.size}px`,
                           animation: `reverse-spin ${planet.orbitSpeed}s linear infinite` // Keep planet upright relative to view
                        }}
                     >
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 text-white bg-black/50 px-2 rounded pointer-events-none">
                           {planet.name}
                        </div>
                     </div>
                  </div>
               </div>
             )
          })}
       </div>

       {/* Planet Detail Panel - Popup */}
       {selectedPlanet && (
         <div className="absolute right-0 top-20 bottom-0 w-full md:w-96 glass-panel-heavy border-l border-cyan-500/30 p-6 z-30 slide-in-right backdrop-blur-xl">
            <button 
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
               <X size={24} className="text-gray-400 hover:text-white" />
            </button>
            
            <div className="mt-8 flex flex-col items-center">
               <div className={`w-32 h-32 rounded-full ${selectedPlanet.color} shadow-[0_0_50px_rgba(255,255,255,0.2)] mb-6 animate-float`}></div>
               <h3 className="text-3xl font-bold text-white mb-1">{selectedPlanet.name}</h3>
               <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-cyan-300 uppercase mb-6">
                  {selectedPlanet.type}
               </span>
            </div>

            <div className="space-y-6">
               <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Distance from Earth</div>
                  <div className="text-xl font-mono text-white">{selectedPlanet.distance}</div>
               </div>
               
               <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Info size={14}/> Analysis
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                     {selectedPlanet.description}
                  </p>
               </div>

               <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-600/30 uppercase tracking-widest text-sm">
                  {t('hero_btn_link')}
               </button>
            </div>
         </div>
       )}
       
       {!selectedPlanet && (
          <div className="absolute bottom-8 text-center w-full pointer-events-none">
             <span className="text-white/30 text-xs font-mono animate-pulse">{t('map_select')}</span>
          </div>
       )}

    </div>
  );
};

export default PlanetarySystem;