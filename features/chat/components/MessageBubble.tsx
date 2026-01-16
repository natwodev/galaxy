import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { Message } from '../../../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border
        ${isUser 
          ? 'bg-purple-900/30 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
          : 'bg-cyan-900/30 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'}
      `}>
        {isUser ? <User size={18} className="text-purple-300" /> : <Sparkles size={18} className="text-cyan-300" />}
      </div>
      
      <div className={`
        max-w-[85%] p-5 rounded-2xl text-sm md:text-base leading-relaxed relative overflow-hidden font-light tracking-wide
        ${isUser
          ? 'bg-gradient-to-br from-purple-900/80 to-indigo-900/80 text-white rounded-tr-none border border-purple-500/20'
          : 'bg-white/5 border border-white/10 text-gray-100 rounded-tl-none backdrop-blur-md shadow-lg'}
      `}>
         {!isUser && (
             <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50 rounded-tl-lg"></div>
         )}
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;