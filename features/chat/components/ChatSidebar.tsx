import React from 'react';
import { Terminal, Cpu } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import { useLanguage } from '../../../contexts/LanguageContext';

const ChatSidebar: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <GlassCard className="hidden lg:flex w-64 rounded-2xl flex-col overflow-hidden h-full">
         <div className="p-4 bg-white/5 border-b border-white/5">
            <h3 className="text-cyan-400 font-mono-tech text-sm font-bold flex items-center gap-2">
                <Terminal size={14} /> {t('chat_sidebar_title')}
            </h3>
         </div>
         <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="text-xs text-gray-500 font-mono">
                <p className="mb-2">> INITIALIZING CHAT MODULE...</p>
                <p className="mb-2">> ENCRYPTION: AES-256-GCM</p>
                <p className="mb-2">> CONNECTED TO: GEMINI-3-FLASH</p>
                <p className="mb-2 text-green-400">> LINK ESTABLISHED</p>
            </div>
            
            <div className="mt-8">
                <h4 className="text-xs text-purple-400 font-bold uppercase mb-2 flex items-center gap-2"><Cpu size={12}/> Active Context</h4>
                <div className="p-2 bg-purple-900/20 border border-purple-500/20 rounded text-[10px] text-purple-200">
                    {t('chat_context_mode')}: {language === 'en' ? 'Sci-Fi Assistant' : 'Trợ lý Viễn tưởng'}<br/>
                    {t('chat_context_lang')}: {language.toUpperCase()}<br/>
                    Knowledge: Universal
                </div>
            </div>
         </div>
    </GlassCard>
  );
};

export default ChatSidebar;