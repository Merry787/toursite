import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Кыргызстан',
  fallbackTitle,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#065F46] via-[#0B8457] to-[#044030] text-white p-6 ${className}`}
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full object-cover" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M0,220 L120,90 L220,180 L320,60 L400,200 L400,300 L0,300 Z" fill="#ffffff" />
            <path d="M50,260 L180,140 L280,220 L380,120 L400,260 L400,300 L0,300 Z" fill="#ffffff" opacity="0.6" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-2 text-[#FFD700]">
            <Mountain className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-stone-100 max-w-[200px] line-clamp-2">
            {fallbackTitle || alt}
          </span>
          <span className="text-[11px] text-stone-300 mt-1">Тянь-Шань · Кыргызстан</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <Mountain className="w-6 h-6 text-stone-400 opacity-50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
