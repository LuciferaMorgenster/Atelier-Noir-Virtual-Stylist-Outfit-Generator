import React from 'react';
import { OutfitOption } from '../types/stylist';
import { Quote, Sparkles } from 'lucide-react';

interface StylistRationaleCardProps {
  outfit: OutfitOption;
}

export const StylistRationaleCard: React.FC<StylistRationaleCardProps> = ({ outfit }) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD7] rounded-lg p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A27B5C] font-semibold mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Stylist Curation Rationale</span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917] mb-3">
        Why This Capsule Works
      </h3>

      <div className="relative pl-6 border-l-2 border-[#1C1917] my-3">
        <Quote className="w-4 h-4 text-[#C5A880] absolute -left-2 -top-2 bg-[#FFFFFF]" />
        <p className="font-serif text-base sm:text-lg text-[#1C1917] italic leading-relaxed">
          "{outfit.stylistRationale}"
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#E5DFD7] text-xs">
        <div className="p-3 bg-[#FBF9F5] rounded-sm border border-[#E5DFD7]">
          <span className="font-semibold uppercase tracking-wider text-[#1C1917] block mb-1">
            Proportion Balance
          </span>
          <p className="text-[#44403C] leading-relaxed">
            The silhouette pairs the anchor piece's volume and movement with deliberate structural counterpoints, creating effortless vertical lines.
          </p>
        </div>

        <div className="p-3 bg-[#FBF9F5] rounded-sm border border-[#E5DFD7]">
          <span className="font-semibold uppercase tracking-wider text-[#1C1917] block mb-1">
            Chromatic Anchoring
          </span>
          <p className="text-[#44403C] leading-relaxed">
            By borrowing the deepest undertone of the anchor garment for footwear and accessories, the outfit achieves harmony without visual clutter.
          </p>
        </div>
      </div>
    </div>
  );
};
