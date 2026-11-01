import React from 'react';
import { SAMPLE_WARDROBE_ITEMS, SampleItem } from '../data/sampleItems';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface SampleArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SampleItem) => void;
  activeSampleId?: string;
}

export const SampleArchiveDrawer: React.FC<SampleArchiveDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSample,
  activeSampleId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#E5DFD7] shadow-xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E5DFD7] flex items-center justify-between bg-[#FBF9F5]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#A27B5C] font-semibold block">
                Archive Collection
              </span>
              <h2 className="font-serif text-xl font-normal text-[#1C1917]">
                Notoriously Tricky Garments
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-sm hover:bg-[#E5DFD7]/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of specimens */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            <p className="text-xs text-[#78716C] leading-relaxed">
              These pieces feature loud prints, saturated dyes, micro-patterns, or metallics that commonly sit unworn in closets. Select any specimen to test the 3-outfit flat-lay generation.
            </p>

            {SAMPLE_WARDROBE_ITEMS.map((sample) => {
              const isSelected = sample.id === activeSampleId;
              return (
                <div
                  key={sample.id}
                  onClick={() => {
                    onSelectSample(sample);
                    onClose();
                  }}
                  className={`border rounded-md p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#1C1917] bg-[#FBF9F5] shadow-xs'
                      : 'border-[#E5DFD7] bg-[#FFFFFF] hover:border-[#A27B5C]'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-sm overflow-hidden bg-[#FBF9F5] border border-[#E5DFD7] shrink-0">
                      <img
                        src={sample.imageUrl}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A27B5C]">
                          {sample.category}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest bg-[#1C1917]/80 text-[#FFFFFF] px-1.5 py-0.2 rounded-xs">
                          {sample.badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-[#1C1917] truncate">
                        {sample.name}
                      </h3>
                      <p className="text-[11px] text-[#78716C] line-clamp-2 mt-0.5">
                        {sample.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#F3EFEA] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      {sample.colorPalette.slice(0, 4).map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                    <span className="text-xs uppercase tracking-wider font-medium text-[#1C1917] flex items-center gap-1 hover:text-[#A27B5C]">
                      <span>Style Lookbook</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-[#E5DFD7] bg-[#FBF9F5] text-center">
            <span className="text-[11px] text-[#78716C]">
              You can also upload any custom photo from your own wardrobe.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
