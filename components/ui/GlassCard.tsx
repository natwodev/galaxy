import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'heavy';
  border?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  variant = 'light',
  border = true,
  ...props
}) => {
  const baseClass = variant === 'heavy' ? 'glass-panel-heavy' : 'glass-panel';
  const borderClass = border ? 'sci-fi-border' : '';
  
  return (
    <div className={`${baseClass} rounded-xl ${borderClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;