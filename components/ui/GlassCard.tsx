'use client';

import { ReactNode, MouseEventHandler } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        backdrop-blur-xl 
        bg-white/10 
        rounded-2xl 
        border border-white/20 
        shadow-2xl 
        p-6
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}