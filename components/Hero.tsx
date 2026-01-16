import React from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';
import { PageView } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onNavigate: (page: PageView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="text-center z-10 max-w-5xl mx-auto relative">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 mb-8 animate-float hover:bg-cyan-900/10 transition-colors cursor-default select-none">
          <Sparkles size={14} className="animate-spin-slow" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase font-mono-tech">{t('hero_badge')}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-glow select-none">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 animate-pulse-slow">
            {t('hero_title_1')}
          </span>
          <span className="relative inline-block mt-2">
             <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 blur-sm">{t('hero_title_2')}</span>
             <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
               {t('hero_title_2')}
             </span>
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed font-light">
          {t('hero_desc')}
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 items-center">
          <button
            onClick={() => onNavigate(PageView.DASHBOARD)}
            className="group relative w-64 h-16 rounded-xl bg-transparent overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-cyan-600/20 group-hover:bg-cyan-600/30 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              <Activity size={20} className="text-cyan-300" />
              <span className="text-white font-bold text-lg tracking-widest uppercase font-mono-tech">{t('hero_btn_deck')}</span>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
          </button>
          
          <button
            onClick={() => onNavigate(PageView.CHAT)}
            className="group w-64 h-16 rounded-xl glass-panel hover:bg-white/10 transition-all border border-purple-500/30 flex items-center justify-center gap-3 hover:scale-105"
          >
            <span className="text-white font-semibold text-lg tracking-wide">{t('hero_btn_link')}</span>
            <ArrowRight size={20} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Stat Chips */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/5 pt-8">
            {[
                { label: t('hero_stat_status'), value: 'ONLINE', color: 'text-green-400' },
                { label: t('hero_stat_latency'), value: '12ms', color: 'text-cyan-400' },
                { label: t('hero_stat_enc'), value: 'AES-256', color: 'text-purple-400' },
                { label: t('hero_stat_users'), value: '8,421', color: 'text-pink-400' }
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className={`font-mono-tech font-bold text-lg ${stat.color}`}>{stat.value}</div>
                </div>
            ))}
        </div>

        {/* Decorative Floor Grid */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[300px] opacity-20 transform perspective-[1000px] rotate-x-60 pointer-events-none origin-bottom"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.4) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)'
          }}
        />
      </div>
    </div>
  );
};

export default Hero;