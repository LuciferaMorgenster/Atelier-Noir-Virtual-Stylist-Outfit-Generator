import React from 'react';
import { OutfitOption } from '../types/stylist';
import { Sun, Briefcase, Moon } from 'lucide-react';

interface OccasionTabsProps {
  outfits: OutfitOption[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const OccasionTabs: React.FC<OccasionTabsProps> = ({ outfits, activeId, onSelect }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'casual':
        return <Sun className="w-4 h-4" />;
      case 'business':
        return <Briefcase className="w-4 h-4" />;
      case 'night-out':
      case 'night_out':
        return <Moon className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E5DFD7] pb-3">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A27B5C]">
            The 3-Capsule Lookbook
          </span>
          <h2 className="font-serif text-2xl font-normal text-[#1C1917]">
            Select Occasion Curation
          </h2>
        </div>

        {/* Segmented Control Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F3EFEA] border border-[#E5DFD7] rounded-md self-stretch sm:self-auto overflow-x-auto">
          {outfits.map((outfit) => {
            const isActive = outfit.id === activeId;
            return (
              <button
                key={outfit.id}
                onClick={() => onSelect(outfit.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1C1917] text-[#FFFFFF] shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE4DC]'
                }`}
              >
                <span className={isActive ? 'text-[#C5A880]' : 'text-[#78716C]'}>
                  {getIcon(outfit.id)}
                </span>
                <span>{outfit.occasion}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
