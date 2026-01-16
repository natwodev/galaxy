import React from 'react';
import { useSound } from '../../contexts/SoundContext';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'purple' | 'green';
  glow?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'cyan',
  glow = true,
  onClick,
  onMouseEnter,
  ...props 
}) => {
  const { playHover, playClick } = useSound();

  const colors = {
    cyan: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30',
    purple: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30',
    green: 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30',
  };

  const shadowClass = glow ? 'shadow-lg' : '';

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHover();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  }

  return (
    <button 
      className={`
        px-6 py-2 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-105
        ${colors[variant]} 
        ${shadowClass} 
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;