import React from 'react';
import { Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenSampleArchive: () => void;
  hasActiveGarment: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenSampleArchive,
  hasActiveGarment,
}) => {
  return (
    <header className="border-b border-[#E5DFD7] bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-baseline gap-4 cursor-pointer" onClick={onReset}>
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-semibold text-[#1C1917] uppercase">
            Atelier Noir
          </span>
          <span className="hidden md:inline-block text-xs uppercase tracking-widest text-[#78716C] font-medium">
            Virtual Stylist & Flat-Lay Studio
          </span>
        </div>

        {/* Quiet Meta & Controls */}
        <div className="flex items-center gap-3 sm:gap-6 text-sm text-[#78716C]">
          <div className="hidden lg:flex items-center gap-2 text-xs font-normal">
            <span>Color Theory</span>
            <span aria-hidden="true">·</span>
            <span>Silhouette Balance</span>
            <span aria-hidden="true">·</span>
            <span>Flat-Lay Visualization</span>
          </div>

          <button
            onClick={onOpenSampleArchive}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide uppercase text-[#1C1917] bg-[#F3EFEA] hover:bg-[#EAE4DC] border border-[#E5DFD7] rounded-sm transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A27B5C]" />
            <span>Sample Pieces</span>
          </button>

          {hasActiveGarment && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide uppercase text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFEA] border border-transparent hover:border-[#E5DFD7] rounded-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Style New Piece</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
