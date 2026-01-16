import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Save } from 'lucide-react';
import { Message } from '../types';
import { generateGalaxyContent } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import MessageBubble from '../features/chat/components/MessageBubble';
import ChatSidebar from '../features/chat/components/ChatSidebar';
import GlassCard from './ui/GlassCard';

const GalaxyChat: React.FC = () => {
  const { t, language } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: t('chat_welcome'),
      timestamp: new Date()
    }
  ]);
  
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
      
      <ChatSidebar />

      {/* Main Chat Interface */}
      <GlassCard variant="heavy" border={true} className="flex-1 flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
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
            <MessageBubble key={idx} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-4">
               {/* Loading Animation Bubble */}
               <div className="w-10 h-10 rounded-xl bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
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

      </GlassCard>
    </div>
  );
};

export default GalaxyChat;