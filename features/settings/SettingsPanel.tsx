import React from 'react';
import { Settings, Volume2, Monitor, Bell, Globe } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSound } from '../../contexts/SoundContext';

const SettingsPanel: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isEnabled, toggleSound, playClick } = useSound();

  const handleToggleSound = () => {
    playClick();
    toggleSound();
  };

  const handleLangChange = (lang: 'en' | 'vi') => {
    playClick();
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center font-mono-tech">
        <GlassCard variant="heavy" className="w-full max-w-2xl p-8 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
                    <Settings className="text-cyan-400 animate-spin-slow" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
                    {t('set_title')}
                </h2>
            </div>

            <div className="space-y-6">
                
                {/* Sound Setting */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <Volume2 className={isEnabled ? "text-cyan-400" : "text-gray-600"} />
                        <div>
                            <div className="text-sm font-bold text-gray-200 uppercase tracking-wide">{t('set_sound')}</div>
                            <div className="text-xs text-gray-500">Enable haptic audio feedback</div>
                        </div>
                    </div>
                    <button 
                        onClick={handleToggleSound}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isEnabled ? 'bg-cyan-600' : 'bg-gray-700'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isEnabled ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>

                {/* Language Setting */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                     <div className="flex items-center gap-4">
                        <Globe className="text-purple-400" />
                        <div>
                            <div className="text-sm font-bold text-gray-200 uppercase tracking-wide">{t('set_lang')}</div>
                            <div className="text-xs text-gray-500">System translation module</div>
                        </div>
                    </div>
                    <div className="flex bg-black/40 rounded-lg p-1">
                        <button 
                            onClick={() => handleLangChange('en')}
                            className={`px-3 py-1 text-xs rounded font-bold transition-all ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            EN
                        </button>
                        <button 
                            onClick={() => handleLangChange('vi')}
                            className={`px-3 py-1 text-xs rounded font-bold transition-all ${language === 'vi' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            VN
                        </button>
                    </div>
                </div>

                 {/* Graphics Setting (Mock) */}
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors opacity-80">
                    <div className="flex items-center gap-4">
                        <Monitor className="text-green-400" />
                        <div>
                            <div className="text-sm font-bold text-gray-200 uppercase tracking-wide">{t('set_perf')}</div>
                            <div className="text-xs text-gray-500">Particle effects & 3D rendering</div>
                        </div>
                    </div>
                     <div className="w-12 h-6 rounded-full bg-green-600/50 relative cursor-not-allowed">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white/50 rounded-full"></div>
                    </div>
                </div>

            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <div className="text-[10px] text-gray-600 font-mono">
                    SYS_VER: 4.1.2 // BUILD: ALPHA
                </div>
            </div>
        </GlassCard>
    </div>
  );
};

export default SettingsPanel;