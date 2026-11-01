import React, { useState } from 'react';
import { OutfitOption, OutfitPiece } from '../types/stylist';
import {
  Sparkles,
  Maximize2,
  Download,
  Wand2,
  RefreshCw,
  X,
  Layers,
  Check,
  Palette,
  ExternalLink,
} from 'lucide-react';

interface FlatLayVisualizerProps {
  outfit: OutfitOption;
  anchorImage: string;
  onGenerateImage: (outfitId: string, customPrompt?: string) => Promise<void>;
  onEditImage: (outfitId: string, editPrompt: string) => Promise<void>;
  isGenerating: boolean;
}

export const FlatLayVisualizer: React.FC<FlatLayVisualizerProps> = ({
  outfit,
  anchorImage,
  onGenerateImage,
  onEditImage,
  isGenerating,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activePieceHover, setActivePieceHover] = useState<OutfitPiece | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const quickPrompts = [
    'Add delicate gold minimalist jewelry and watch',
    'Swap footwear for vintage cream leather loafers',
    'Add an oversized wool trench coat draped casually',
    'Arrange pieces on warm dark charcoal slate background',
  ];

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim() || isGenerating) return;
    await onEditImage(outfit.id, editPrompt.trim());
    setEditPrompt('');
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (!outfit.flatlayImageUrl) return;
    const a = document.createElement('a');
    a.href = outfit.flatlayImageUrl;
    a.download = `atelier-noir-${outfit.id}-flatlay.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD7] rounded-lg overflow-hidden shadow-xs">
      {/* Top Bar / Visual Title */}
      <div className="p-4 sm:p-5 border-b border-[#E5DFD7] bg-[#FBF9F5] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#A27B5C] font-semibold block">
            Flat-Lay Visual Composition
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1917]">
            {outfit.conceptName}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {outfit.flatlayImageUrl && (
            <>
              <button
                onClick={() => setIsZoomed(true)}
                className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFEA] border border-[#E5DFD7] rounded-sm transition-colors cursor-pointer"
                title="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFEA] border border-[#E5DFD7] rounded-sm transition-colors cursor-pointer"
                title="Download Flat-Lay Image"
              >
                <Download className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={() => onGenerateImage(outfit.id)}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[#1C1917] bg-[#FFFFFF] hover:bg-[#F3EFEA] border border-[#E5DFD7] rounded-sm transition-colors cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#A27B5C]" />
                <span>Rendering...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#A27B5C]" />
                <span>{outfit.flatlayImageUrl ? 'Regenerate Flat-Lay' : 'Render Flat-Lay Image'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Flat-Lay Canvas / Image Area */}
      <div className="relative aspect-square w-full bg-[#F3EFEA] flex items-center justify-center overflow-hidden select-none">
        {outfit.flatlayImageUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={outfit.flatlayImageUrl}
              alt={`${outfit.conceptName} flat-lay`}
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
              onClick={() => setIsZoomed(true)}
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-[#1C1917]/90 text-white text-xs px-3 py-1.5 rounded-sm backdrop-blur-xs flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                Click to inspect full resolution
              </span>
            </div>
          </div>
        ) : (
          /* Interactive Flat-Lay Layout Grid (Studio Composition) */
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-b from-[#FBF9F5] to-[#EFE9E0]">
            {/* Linen weave background watermark texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
                backgroundSize: '16px 16px',
              }}
            />

            {/* Flat-Lay Layout Arrangement */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              {/* Top Layer: Outerwear or Knitwear & Jewelry */}
              <div className="flex items-start justify-between gap-4">
                <div className="bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E5DFD7] p-3 rounded-md shadow-xs max-w-[200px]">
                  <span className="text-[9px] uppercase tracking-wider text-[#A27B5C] font-semibold block">
                    Top Layer
                  </span>
                  <p className="font-serif text-sm font-medium text-[#1C1917] leading-snug">
                    {outfit.pieces.find((p) => p.role.includes('Top') || p.role.includes('Knit'))?.name ||
                      outfit.pieces[1]?.name}
                  </p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">
                    {outfit.pieces.find((p) => p.role.includes('Top'))?.material || 'Complementary fiber'}
                  </p>
                </div>

                <div className="bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E5DFD7] p-2.5 rounded-md shadow-xs max-w-[170px] text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#A27B5C] font-semibold block">
                    Accents & Jewelry
                  </span>
                  <p className="font-serif text-xs font-medium text-[#1C1917] leading-snug">
                    {outfit.pieces.find((p) => p.role.includes('Jewelry'))?.name ||
                      outfit.pieces[4]?.name}
                  </p>
                </div>
              </div>

              {/* Center Stage: The Anchor Garment Specimen */}
              <div className="flex flex-col items-center justify-center my-auto py-2">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-[#FFFFFF] rounded-md border border-[#E5DFD7] shadow-md p-2 flex items-center justify-center group">
                  <img
                    src={anchorImage}
                    alt="Anchor Garment"
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 bg-[#1C1917] text-white text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-xs shadow-xs font-medium">
                    Anchor Piece
                  </div>
                </div>
              </div>

              {/* Bottom Layer: Footwear & Bag */}
              <div className="flex items-end justify-between gap-4">
                <div className="bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E5DFD7] p-3 rounded-md shadow-xs max-w-[190px]">
                  <span className="text-[9px] uppercase tracking-wider text-[#A27B5C] font-semibold block">
                    Footwear Pairing
                  </span>
                  <p className="font-serif text-xs font-medium text-[#1C1917] leading-snug">
                    {outfit.pieces.find((p) => p.role.includes('Footwear') || p.role.includes('Shoe'))?.name ||
                      'Tailored Footwear'}
                  </p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">
                    {outfit.pieces.find((p) => p.role.includes('Footwear'))?.color}
                  </p>
                </div>

                <div className="bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E5DFD7] p-3 rounded-md shadow-xs max-w-[190px] text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#A27B5C] font-semibold block">
                    Handbag / Leather
                  </span>
                  <p className="font-serif text-xs font-medium text-[#1C1917] leading-snug">
                    {outfit.pieces.find((p) => p.role.includes('Bag') || p.role.includes('Tote') || p.role.includes('Clutch'))?.name ||
                      'Structured Bag'}
                  </p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">
                    {outfit.pieces.find((p) => p.role.includes('Bag'))?.material}
                  </p>
                </div>
              </div>
            </div>

            {/* Prompt CTA Overlay */}
            <div className="absolute inset-x-4 bottom-4 z-20 flex justify-center">
              <button
                onClick={() => onGenerateImage(outfit.id)}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-[#1C1917]/95 hover:bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium rounded-sm shadow-md backdrop-blur-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#C5A880]" />
                    <span>Styling Flat-Lay with Gemini Nano Banana...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span>Render Photorealistic Flat-Lay (Nano Banana 2.1)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner overlay during active generation */}
        {isGenerating && (
          <div className="absolute inset-0 bg-[#FBF9F5]/85 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#1C1917] border-t-transparent animate-spin mb-4" />
            <span className="font-serif text-lg text-[#1C1917] font-medium">
              Generating Editorial Flat-Lay...
            </span>
            <p className="text-xs text-[#78716C] max-w-xs mt-1">
              Composing balanced top-down garments, natural light, and accessories with gemini-nano-banana-2.1
            </p>
          </div>
        )}
      </div>

      {/* Interactive AI Prompt Edit Bar */}
      <div className="p-4 sm:p-5 border-t border-[#E5DFD7] bg-[#FBF9F5]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5 text-[#A27B5C]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
              Prompt Studio · Create & Edit with gemini-nano-banana-2.1
            </span>
          </div>
          <span className="text-[10px] text-[#78716C]">
            Custom text instructions
          </span>
        </div>

        <form onSubmit={handleEditSubmit} className="flex gap-2">
          <input
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="e.g., 'Swap the bag for an ivory leather crossbody' or 'Add gold sculptural jewelry'..."
            className="flex-1 text-xs sm:text-sm p-2.5 bg-[#FFFFFF] border border-[#E5DFD7] rounded-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#A27B5C] transition-colors"
          />
          <button
            type="submit"
            disabled={!editPrompt.trim() || isGenerating}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer shrink-0 ${
              !editPrompt.trim() || isGenerating
                ? 'bg-[#E5DFD7] text-[#A8A29E] cursor-not-allowed'
                : 'bg-[#1C1917] text-[#FFFFFF] hover:bg-[#2E2A27]'
            }`}
          >
            Apply Edit
          </button>
        </form>

        {/* Quick Prompt Ideas */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-[#78716C] uppercase tracking-wider mr-1">
            Try:
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setEditPrompt(qp)}
              className="text-[11px] text-[#44403C] hover:text-[#1C1917] bg-[#FFFFFF] hover:bg-[#F3EFEA] border border-[#E5DFD7] px-2 py-0.5 rounded-sm transition-colors cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && outfit.flatlayImageUrl && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1917]/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Download image"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsZoomed(false)}
              className="p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-4xl max-h-[85vh] overflow-hidden rounded-md border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={outfit.flatlayImageUrl}
              alt={`${outfit.conceptName} full resolution`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-4 text-center text-white/90">
            <p className="font-serif text-xl">{outfit.conceptName}</p>
            <p className="text-xs text-white/60 uppercase tracking-widest mt-0.5">
              {outfit.occasion} · Editorial Flat-Lay
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
