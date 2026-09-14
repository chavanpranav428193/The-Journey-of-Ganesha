import React from 'react';

interface GaneshaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  className?: string;
  showGlow?: boolean;
  animate?: boolean;
  alt?: string;
}

export const GaneshaLogo: React.FC<GaneshaLogoProps> = ({
  size = 'md',
  className = '',
  showGlow = true,
  animate = false,
  alt = 'Lord Ganesha Logo'
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    '2xl': 'w-56 h-56',
    custom: ''
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        sizeClasses[size]
      } ${className}`}
    >
      {/* Sacred Golden Ambient Glow */}
      {showGlow && (
        <div
          className={`absolute inset-0 -m-1.5 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-400/35 to-orange-500/30 blur-md pointer-events-none ${
            animate ? 'animate-pulse' : ''
          }`}
        />
      )}

      {/* High-Resolution 3D Baby Ganesha Image */}
      <img
        src="/assets/ganesha-logo.png"
        alt={alt}
        referrerPolicy="no-referrer"
        className={`relative z-10 w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)] transition-transform duration-300 ${
          animate ? 'animate-float' : 'hover:scale-105'
        }`}
        loading="eager"
        onError={(e) => {
          // Fallback if needed to SVG or /image.png
          const target = e.currentTarget;
          if (target.src.includes('ganesha-logo.png')) {
            target.src = '/image.png';
          }
        }}
      />
    </div>
  );
};
