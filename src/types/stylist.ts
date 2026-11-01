export interface ColorSwatch {
  hex: string;
  name: string;
  role: string;
}

export interface GarmentAnalysis {
  name: string;
  category: string;
  silhouette: string;
  fabricTexture: string;
  vibe: string;
  patternType: string;
  stylingChallenges: string[];
  goldenRule: string;
  colorPalette: ColorSwatch[];
}

export interface OutfitPiece {
  role: string;
  name: string;
  color: string;
  material: string;
  stylingTip: string;
}

export interface OutfitOption {
  id: 'casual' | 'business' | 'night-out';
  occasion: string;
  conceptName: string;
  stylistRationale: string;
  palette: ColorSwatch[];
  pieces: OutfitPiece[];
  flatlayPrompt: string;
  flatlayImageUrl?: string;
  isGeneratingImage?: boolean;
}

export interface StylistResult {
  itemAnalysis: GarmentAnalysis;
  outfits: OutfitOption[];
}
