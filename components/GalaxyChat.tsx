import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Terminal, Cpu, Save } from 'lucide-react';
import { Message } from '../types';
import { generateGalaxyContent } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const GalaxyChat: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Initialize with correct language welcome
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: t('chat_welcome'),
      timestamp: new Date()
    }
  ]);
  
  // Reset welcome message if language changes and it's the only message
  useEffect(() => {
     if (messages.length === 1 && messages[0].role === 'model') {
         setMessages([{
             role: 'model',
             text: t('chat_welcome'),
             timestamp: new Date()
         }])
     }
  }, [language, t]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Pass the current language to the service
    const responseText = await generateGalaxyContent(input, language);

    const botMessage: Message = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] pt-20 pb-4 px-4 max-w-7xl mx-auto gap-4">
      
      {/* Sidebar - Context/Logs */}
      <div className="hidden lg:flex w-64 glass-panel rounded-2xl flex-col overflow-hidden border border-white/10">
         <div className="p-4 bg-white/5 border-b border-white/5">
            <h3 className="text-cyan-400 font-mono-tech text-sm font-bold flex items-center gap-2">
                <Terminal size={14} /> MISSION LOGS
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
                    Mode: {language === 'en' ? 'Sci-Fi Assistant' : 'Trợ lý Viễn tưởng'}<br/>
                    Lang: {language.toUpperCase()}<br/>
                    Knowledge: Universal
                </div>
            </div>
         </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 glass-panel-heavy rounded-2xl border border-white/10 flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] sci-fi-border">
        
        {/* Header */}
        <div className="bg-black/40 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 rounded-full blur animate-pulse"></div>
                <div className="relative p-2 rounded-full bg-black border border-cyan-500/50">
                    <Bot size={20} className="text-cyan-300" />
                </div>
            </div>
            <div>
              <h3 className="text-white font-mono-tech tracking-wide font-bold">{t('chat_header')}</h3>
              <p className="text-[10px] text-cyan-500/70 font-mono flex items-center gap-1 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {t('chat_online')}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
             <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400"><Save size={18}/></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} group`}
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border
                ${msg.role === 'user' 
                  ? 'bg-purple-900/30 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                  : 'bg-cyan-900/30 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'}
              `}>
                {msg.role === 'user' ? <User size={18} className="text-purple-300" /> : <Sparkles size={18} className="text-cyan-300" />}
              </div>
              
              <div className={`
                max-w-[85%] p-5 rounded-2xl text-sm md:text-base leading-relaxed relative overflow-hidden font-light tracking-wide
                ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-purple-900/80 to-indigo-900/80 text-white rounded-tr-none border border-purple-500/20'
                  : 'bg-white/5 border border-white/10 text-gray-100 rounded-tl-none backdrop-blur-md shadow-lg'}
              `}>
                 {/* Decorative corner accent for bot messages */}
                 {msg.role === 'model' && (
                     <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50 rounded-tl-lg"></div>
                 )}
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-cyan-300 animate-spin-slow" />
               </div>
               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-none w-32">
                 <div className="flex gap-1.5 items-center justify-center h-full">
                   <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                   <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                   <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/5 z-20">
          <div className="relative flex items-center gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('chat_input_placeholder')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all focus:ring-1 focus:ring-cyan-500/50 font-mono-tech"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 group"
            >
              <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div className="text-center mt-3 flex justify-center gap-4 text-[10px] text-gray-600 uppercase font-mono tracking-widest">
            <span>{t('chat_secure')}</span>
            <span>::</span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GalaxyChat;