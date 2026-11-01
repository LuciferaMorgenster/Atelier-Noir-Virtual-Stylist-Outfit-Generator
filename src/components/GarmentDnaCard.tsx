import React, { useState } from 'react';
import { GarmentAnalysis } from '../types/stylist';
import { Check, Copy, AlertCircle, Sparkles } from 'lucide-react';

interface GarmentDnaCardProps {
  analysis: GarmentAnalysis;
  garmentImage: string;
}

export const GarmentDnaCard: React.FC<GarmentDnaCardProps> = ({ analysis, garmentImage }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD7] rounded-lg p-6 sm:p-8 shadow-xs mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Garment Image Showcase */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-md overflow-hidden bg-[#FBF9F5] border border-[#E5DFD7] p-2 shadow-xs">
            <img
              src={garmentImage}
              alt={analysis.name}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 left-3 bg-[#1C1917]/85 backdrop-blur-xs text-[#FFFFFF] text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-xs font-medium">
              Anchor Specimen
            </div>
          </div>
          <p className="mt-3 text-xs uppercase tracking-widest text-[#78716C] font-mono">
            {analysis.category}
          </p>
        </div>

        {/* Chromatic & Structural DNA */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A27B5C] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Garment Analysis & Chromatic DNA</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] mb-3">
              {analysis.name}
            </h2>

            {/* Specimen Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-[#E5DFD7] my-4 text-xs">
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider text-[10px] mb-0.5">
                  Silhouette
                </span>
                <span className="font-medium text-[#1C1917]">{analysis.silhouette}</span>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider text-[10px] mb-0.5">
                  Fabric & Drape
                </span>
                <span className="font-medium text-[#1C1917]">{analysis.fabricTexture}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[#78716C] block uppercase tracking-wider text-[10px] mb-0.5">
                  Pattern Matrix
                </span>
                <span className="font-medium text-[#1C1917]">{analysis.patternType}</span>
              </div>
            </div>

            {/* Extracted Color Palette Swatches */}
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-2">
                Extracted Color Spectrum (Click to copy hex)
              </span>
              <div className="flex flex-wrap gap-2">
                {analysis.colorPalette.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopyHex(color.hex)}
                    className="group flex items-center gap-2 px-2.5 py-1.5 bg-[#FBF9F5] hover:bg-[#F3EFEA] border border-[#E5DFD7] rounded-sm transition-all cursor-pointer text-left"
                    title={`Click to copy ${color.hex}`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-[#1C1917]">{color.name}</span>
                        {copiedHex === color.hex ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 text-[#A8A29E] opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#78716C] block font-mono">{color.hex} · {color.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stylist Golden Rule */}
            <div className="bg-[#FBF9F5] border-l-2 border-[#A27B5C] p-3 rounded-r-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#A27B5C] font-bold block mb-1">
                The Stylist's Golden Rule
              </span>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic font-serif">
                "{analysis.goldenRule}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
