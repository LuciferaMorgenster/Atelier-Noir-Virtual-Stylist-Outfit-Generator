/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GarmentUpload } from './components/GarmentUpload';
import { GarmentDnaCard } from './components/GarmentDnaCard';
import { OccasionTabs } from './components/OccasionTabs';
import { FlatLayVisualizer } from './components/FlatLayVisualizer';
import { OutfitPieceList } from './components/OutfitPieceList';
import { StylistRationaleCard } from './components/StylistRationaleCard';
import { SampleArchiveDrawer } from './components/SampleArchiveDrawer';
import { SAMPLE_WARDROBE_ITEMS, SampleItem } from './data/sampleItems';
import { GarmentAnalysis, OutfitOption, StylistResult } from './types/stylist';
import { Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [analysis, setAnalysis] = useState<GarmentAnalysis | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [outfits, setOutfits] = useState<OutfitOption[]>([]);
  const [activeOccasionId, setActiveOccasionId] = useState<string>('casual');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [activeSampleId, setActiveSampleId] = useState<string | undefined>(undefined);
  const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize with the first sample item (Saffron Floral Silk Skirt) so the app opens with rich editorial content immediately
  useEffect(() => {
    const defaultSample = SAMPLE_WARDROBE_ITEMS[0];
    loadSampleItem(defaultSample);
  }, []);

  const loadSampleItem = (sample: SampleItem) => {
    setActiveSampleId(sample.id);
    setGarmentImage(sample.imageUrl);
    setAnalysis({
      name: sample.name,
      category: sample.category,
      silhouette: sample.silhouette,
      fabricTexture: sample.fabricTexture,
      vibe: sample.subtitle,
      patternType: sample.patternType,
      stylingChallenges: sample.stylingChallenges,
      goldenRule: sample.goldenRule,
      colorPalette: sample.colorPalette,
    });

    setOutfits(sample.presetOutfits);
    setActiveOccasionId('casual');
    setErrorMessage(null);
  };

  const handleAnalyzeCustomGarment = async (
    imageBase64: string,
    mimeType: string,
    hint?: string,
    sample?: SampleItem
  ) => {
    if (sample) {
      loadSampleItem(sample);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setGarmentImage(imageBase64);
    setActiveSampleId(undefined);

    try {
      const response = await fetch('/api/analyze-garment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          garmentHint: hint,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: StylistResult = await response.json();
      setAnalysis(data.itemAnalysis);
      setOutfits(data.outfits);
      if (data.outfits.length > 0) {
        setActiveOccasionId(data.outfits[0].id);
      }
    } catch (err: any) {
      console.error('Failed to analyze garment:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the atelier stylist. Please verify server connectivity.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFlatlayImage = async (outfitId: string, customPrompt?: string) => {
    const targetOutfit = outfits.find((o) => o.id === outfitId);
    if (!targetOutfit) return;

    setIsGeneratingImage(true);
    setErrorMessage(null);

    try {
      const promptToUse = customPrompt || targetOutfit.flatlayPrompt;
      const response = await fetch('/api/generate-flatlay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          occasion: targetOutfit.occasion,
          garmentBase64: garmentImage || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Image generation failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.imageUrl) {
        setOutfits((prev) =>
          prev.map((o) => (o.id === outfitId ? { ...o, flatlayImageUrl: data.imageUrl } : o))
        );
      }
    } catch (err: any) {
      console.error('Flat-lay generation error:', err);
      setErrorMessage(
        err.message || 'Failed to generate flat-lay photograph. You can inspect the outfit pieces below or try again.'
      );
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleEditFlatlayImage = async (outfitId: string, editPrompt: string) => {
    const targetOutfit = outfits.find((o) => o.id === outfitId);
    if (!targetOutfit) return;

    setIsGeneratingImage(true);
    setErrorMessage(null);

    try {
      // If there's an existing image, send it for editing. Otherwise generate fresh with prompt.
      if (targetOutfit.flatlayImageUrl) {
        const response = await fetch('/api/edit-flatlay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originalImageBase64: targetOutfit.flatlayImageUrl,
            editPrompt,
            occasion: targetOutfit.occasion,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to apply image edit.');
        }

        const data = await response.json();
        if (data.imageUrl) {
          setOutfits((prev) =>
            prev.map((o) => (o.id === outfitId ? { ...o, flatlayImageUrl: data.imageUrl } : o))
          );
        }
      } else {
        // Generate with revised prompt
        const revisedPrompt = `${targetOutfit.flatlayPrompt}. Modification: ${editPrompt}`;
        await handleGenerateFlatlayImage(outfitId, revisedPrompt);
      }
    } catch (err: any) {
      console.error('Flat-lay edit error:', err);
      setErrorMessage(err.message || 'Image edit failed. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleResetToUpload = () => {
    setAnalysis(null);
    setGarmentImage(null);
    setOutfits([]);
    setActiveSampleId(undefined);
    setErrorMessage(null);
  };

  const currentOutfit = outfits.find((o) => o.id === activeOccasionId) || outfits[0];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#E5DFD7]">
      {/* Top Atelier Navigation */}
      <Header
        onReset={handleResetToUpload}
        onOpenSampleArchive={() => setIsSampleDrawerOpen(true)}
        hasActiveGarment={Boolean(analysis)}
      />

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] px-4 py-3 rounded-md text-xs sm:text-sm flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-medium text-xs uppercase tracking-wider text-[#991B1B] hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {!analysis || !garmentImage ? (
          /* Garment Upload & Sample Selection View */
          <GarmentUpload onAnalyze={handleAnalyzeCustomGarment} isLoading={isLoading} />
        ) : (
          /* Active Garment & 3-Outfit Lookbook View */
          <div>
            {/* Top Back/Breadcrumb bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DFD7]">
              <button
                onClick={handleResetToUpload}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Upload Another Wardrobe Item</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSampleDrawerOpen(true)}
                  className="text-xs uppercase tracking-wider text-[#A27B5C] hover:text-[#1C1917] font-medium"
                >
                  Switch Sample Piece
                </button>
              </div>
            </div>

            {/* Specimen DNA Analysis Card */}
            <GarmentDnaCard analysis={analysis} garmentImage={garmentImage} />

            {/* 3 Occasions Segmented Switcher */}
            <OccasionTabs
              outfits={outfits}
              activeId={activeOccasionId}
              onSelect={(id) => setActiveOccasionId(id)}
            />

            {/* Lookbook Layout: Flat-Lay Canvas on Left, Checklist & Rationale on Right */}
            {currentOutfit && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Flat-Lay Visualizer & Prompt Editor */}
                <div className="lg:col-span-6 lg:sticky lg:top-28">
                  <FlatLayVisualizer
                    outfit={currentOutfit}
                    anchorImage={garmentImage}
                    onGenerateImage={handleGenerateFlatlayImage}
                    onEditImage={handleEditFlatlayImage}
                    isGenerating={isGeneratingImage}
                  />
                </div>

                {/* Right Column: Piece Breakdown & Stylist Commentary */}
                <div className="lg:col-span-6 space-y-6">
                  <StylistRationaleCard outfit={currentOutfit} />
                  <OutfitPieceList outfit={currentOutfit} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Tricky Garments Drawer */}
      <SampleArchiveDrawer
        isOpen={isSampleDrawerOpen}
        onClose={() => setIsSampleDrawerOpen(false)}
        onSelectSample={loadSampleItem}
        activeSampleId={activeSampleId}
      />

      {/* Footer */}
      <footer className="border-t border-[#E5DFD7] bg-[#FBF9F5] py-8 text-center text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-base text-[#1C1917]">Atelier Noir · Haute Couture Wardrobe Intelligence</p>
          <div className="flex items-center gap-4 text-xs font-light">
            <span>Editorial Flat-Lays</span>
            <span aria-hidden="true">·</span>
            <span>gemini-3.8-flash</span>
            <span aria-hidden="true">·</span>
            <span>gemini-nano-banana-2.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
