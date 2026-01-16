import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { NotificationItem } from '../types';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useSound } from './SoundContext';

interface NotificationContextType {
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { playTyping } = useSound(); // Use typing sound for incoming message feeling

  const addNotification = useCallback((title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, title, message, type }]);
    playTyping();

    // Auto dismiss
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, [playTyping]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 w-80 pointer-events-none">
        {notifications.map(notif => (
          <div 
            key={notif.id}
            className={`
              pointer-events-auto relative overflow-hidden backdrop-blur-xl border p-4 rounded-lg shadow-2xl animate-slide-in-right
              ${notif.type === 'info' ? 'bg-cyan-900/80 border-cyan-500/50' : ''}
              ${notif.type === 'success' ? 'bg-green-900/80 border-green-500/50' : ''}
              ${notif.type === 'warning' ? 'bg-yellow-900/80 border-yellow-500/50' : ''}
              ${notif.type === 'error' ? 'bg-red-900/80 border-red-500/50' : ''}
            `}
          >
             <div className="absolute top-0 left-0 w-1 h-full bg-white/20"></div>
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-1">
                   {notif.type === 'info' && <Info size={16} className="text-cyan-300" />}
                   {notif.type === 'success' && <CheckCircle size={16} className="text-green-300" />}
                   {notif.type === 'warning' && <AlertTriangle size={16} className="text-yellow-300" />}
                   {notif.type === 'error' && <XCircle size={16} className="text-red-300" />}
                   <span className="font-bold text-xs uppercase tracking-widest text-white">{notif.title}</span>
                </div>
                <button onClick={() => removeNotification(notif.id)} className="text-white/50 hover:text-white">
                  <X size={14} />
                </button>
             </div>
             <p className="text-sm text-gray-200 pl-6 font-light leading-snug">{notif.message}</p>
             
             {/* Scanline overlay for effect */}
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
          </div>
        ))}
      </div>

    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};