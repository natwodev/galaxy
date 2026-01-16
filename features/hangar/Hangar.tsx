import React, { useState } from 'react';
import { Plane, Wrench, Shield, Zap, Crosshair } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import TechBadge from '../../components/ui/TechBadge';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSound } from '../../contexts/SoundContext';

const Hangar: React.FC = () => {
  const { t } = useLanguage();
  const { playHover, playClick } = useSound();
  const [rotation, setRotation] = useState(0);

  const rotateShip = (dir: 'left' | 'right') => {
      playClick();
      setRotation(prev => dir === 'left' ? prev - 45 : prev + 45);
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center pb-12 font-mono-tech overflow-hidden">
        
        {/* Header */}
        <div className="w-full max-w-7xl mb-8 flex justify-between items-end border-b border-white/10 pb-4">
            <div>
                <h2 className="text-3xl text-white font-bold tracking-widest uppercase flex items-center gap-3">
                    <Plane className="text-cyan-400 rotate-[-45deg]" /> {t('hangar_title')}
                </h2>
                <div className="text-cyan-500/60 text-sm mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    BAY 01 // PRESSURIZED
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl h-[600px]">
            
            {/* 3D Viewport */}
            <div className="flex-1 relative perspective-[1200px] flex items-center justify-center bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none transform rotate-x-60 translate-y-20 scale-150 opacity-30"></div>

                {/* The Ship (CSS 3D Construction) */}
                <div 
                    className="relative w-64 h-64 transform-style-3d transition-transform duration-700 ease-out"
                    style={{ transform: `rotateY(${rotation}deg) rotateX(10deg)` }}
                >
                    {/* Core Body */}
                    <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/50 transform translate-z-10 shadow-[0_0_30px_cyan]"></div>
                    <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/50 transform -translate-z-10"></div>
                    <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/50 transform rotate-y-90 translate-z-32 w-10 left-28"></div>
                    <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/50 transform rotate-x-90 translate-z-32 h-10 top-28"></div>

                    {/* Wings (Triangles via CSS clip-path) */}
                    <div className="absolute top-1/2 -left-32 w-40 h-20 bg-purple-900/60 border border-purple-500/50 transform -translate-y-1/2 rotate-y-12 origin-right" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
                    <div className="absolute top-1/2 -right-32 w-40 h-20 bg-purple-900/60 border border-purple-500/50 transform -translate-y-1/2 rotate-y-[-12deg] origin-left" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>

                    {/* Engine Glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-z-[-12px] w-20 h-20 bg-cyan-400 blur-xl animate-pulse opacity-80"></div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-8 flex gap-4">
                    <button onClick={() => rotateShip('left')} className="p-3 bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500 rounded-full transition-all text-white"><Wrench size={20}/></button>
                    <button onClick={() => rotateShip('right')} className="p-3 bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500 rounded-full transition-all text-white"><Wrench size={20}/></button>
                </div>
            </div>

            {/* Stats Panel */}
            <GlassCard variant="heavy" className="w-full lg:w-96 p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{t('hangar_ship_name')}</h3>
                    <div className="flex gap-2 mb-4">
                        <TechBadge label="MK-IV" color="purple" />
                        <TechBadge label="FTL-READY" color="green" />
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                        <p>{t('hangar_class')}</p>
                        <p className="text-green-400">{t('hangar_status')}</p>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Stat Bars */}
                    <div>
                        <div className="flex justify-between text-xs uppercase mb-2">
                            <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-400"/> {t('hangar_engine')}</span>
                            <span>98%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[98%]"></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs uppercase mb-2">
                            <span className="flex items-center gap-2"><Shield size={14} className="text-cyan-400"/> {t('hangar_shield')}</span>
                            <span>100%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[100%]"></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs uppercase mb-2">
                            <span className="flex items-center gap-2"><Crosshair size={14} className="text-red-400"/> {t('hangar_weapon')}</span>
                            <span>87%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[87%]"></div></div>
                    </div>
                </div>

                <button className="w-full py-4 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-600/40 text-cyan-300 font-bold tracking-widest uppercase transition-all rounded-lg flex items-center justify-center gap-2 group">
                    <Wrench size={18} className="group-hover:rotate-45 transition-transform"/> Customize Loadout
                </button>
            </GlassCard>

        </div>
    </div>
  );
};

export default Hangar;