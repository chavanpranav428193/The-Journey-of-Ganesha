import React from 'react';
import { GaneshaExpression } from '../types';

interface CharacterProps {
  expression?: GaneshaExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAura?: boolean;
}

export const Character: React.FC<CharacterProps> = ({
  expression = 'welcoming',
  size = 'md',
  className = '',
  showAura = true
}) => {
  const sizeMap = {
    sm: 'w-24 h-28',
    md: 'w-36 h-44',
    lg: 'w-52 h-60',
    xl: 'w-64 h-72'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
    >
      {/* Sacred Golden Prabhavali / Divine Halo Aura */}
      {showAura && (
        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-tr from-amber-500/25 via-yellow-400/35 to-orange-500/25 blur-xl animate-pulse pointer-events-none" />
      )}

      {/* Main 3D Ganesha Character Image Asset */}
      <img
        src="/assets/ganesha-logo.png"
        alt="Lord Ganesha"
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(245,158,11,0.4)] transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes('ganesha-logo.png')) {
            target.src = '/image.png';
          }
        }}
      />

      {/* Expression Overlay (Subtle serene glow for meditation or joyful sparkle) */}
      {expression === 'meditating' && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-300/20 blur-md pointer-events-none animate-ping" />
      )}
      {expression === 'joyful' && (
        <div className="absolute -top-2 right-4 text-xl animate-bounce pointer-events-none select-none">
          ✨
        </div>
      )}
    </div>
  );
};
