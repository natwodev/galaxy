import React from 'react';

interface TechBadgeProps {
  label: string;
  color?: string;
  animate?: boolean;
}

const TechBadge: React.FC<TechBadgeProps> = ({ label, color = 'cyan', animate = false }) => {
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-900/40 border-cyan-500/30 text-cyan-300',
    green: 'bg-green-900/40 border-green-500/30 text-green-300',
    red: 'bg-red-900/40 border-red-500/30 text-red-300',
    purple: 'bg-purple-900/40 border-purple-500/30 text-purple-300',
  };

  const style = colorMap[color] || colorMap['cyan'];
  const animClass = animate ? 'animate-pulse' : '';

  return (
    <span className={`px-2 py-1 border text-[10px] rounded uppercase font-mono tracking-wider ${style} ${animClass}`}>
      {label}
    </span>
  );
};

export default TechBadge;