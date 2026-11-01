import React, { useState } from 'react';
import { OutfitOption, OutfitPiece } from '../types/stylist';
import { Check, Copy, Tag, Compass, Sparkles } from 'lucide-react';

interface OutfitPieceListProps {
  outfit: OutfitOption;
}

export const OutfitPieceList: React.FC<OutfitPieceListProps> = ({ outfit }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyChecklist = () => {
    const text = `Atelier Noir Capsule · ${outfit.conceptName} (${outfit.occasion})\n\n` +
      outfit.pieces
        .map((p) => `• [${p.role}] ${p.name}\n  Color: ${p.color} | Material: ${p.material}\n  Stylist Tip: ${p.stylingTip}`)
        .join('\n\n') +
      `\n\nStylist Rationale: ${outfit.stylistRationale}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD7] rounded-lg p-6 sm:p-7 shadow-xs">
      {/* Header & Copy Button */}
      <div className="flex items-baseline justify-between border-b border-[#E5DFD7] pb-4 mb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#A27B5C] font-semibold block">
            Curation Checklist
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917]">
            Piece-by-Piece Styling Breakdown
          </h3>
        </div>

        <button
          onClick={handleCopyChecklist}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider text-[#1C1917] bg-[#FBF9F5] hover:bg-[#F3EFEA] border border-[#E5DFD7] rounded-sm transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#78716C]" />
              <span>Copy Checklist</span>
            </>
          )}
        </button>
      </div>

      {/* Ensemble Palette Swatches */}
      <div className="mb-6 p-3.5 bg-[#FBF9F5] rounded-md border border-[#E5DFD7]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold">
            Outfit Chromatic Harmony Spectrum
          </span>
          <span className="text-[10px] text-[#A27B5C] font-medium">
            Tonal Balancing
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {outfit.palette.map((swatch, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5DFD7] rounded-sm text-xs"
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="font-medium text-[#1C1917]">{swatch.name}</span>
              <span className="text-[10px] text-[#78716C] font-mono">({swatch.role})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Piece Items List */}
      <div className="divide-y divide-[#F3EFEA]">
        {outfit.pieces.map((piece, i) => {
          const isAnchor = piece.role.toLowerCase().includes('anchor');
          return (
            <div
              key={i}
              className={`py-4 first:pt-0 last:pb-0 transition-colors ${
                isAnchor ? 'bg-[#FBF9F5]/60 -mx-3 px-3 rounded-md' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold ${
                      isAnchor ? 'text-[#A27B5C]' : 'text-[#78716C]'
                    }`}
                  >
                    {piece.role}
                  </span>
                  {isAnchor && (
                    <span className="text-[9px] uppercase tracking-widest bg-[#1C1917] text-[#FFFFFF] px-1.5 py-0.2 rounded-xs font-medium">
                      Hero Piece
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#78716C]">
                  <span>{piece.color}</span>
                  <span aria-hidden="true">·</span>
                  <span>{piece.material}</span>
                </div>
              </div>

              <h4 className="font-serif text-base sm:text-lg font-medium text-[#1C1917]">
                {piece.name}
              </h4>

              <p className="mt-1 text-xs text-[#44403C] leading-relaxed flex items-start gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#A27B5C] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold text-[#1C1917]">Stylist Tip:</strong>{' '}
                  {piece.stylingTip}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
