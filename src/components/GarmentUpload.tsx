import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_WARDROBE_ITEMS, SampleItem } from '../data/sampleItems';

interface GarmentUploadProps {
  onAnalyze: (imageBase64: string, mimeType: string, hint?: string, sample?: SampleItem) => void;
  isLoading: boolean;
}

export const GarmentUpload: React.FC<GarmentUploadProps> = ({ onAnalyze, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [userHint, setUserHint] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [activeSample, setActiveSample] = useState<SampleItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }
    setMimeType(file.type);
    setActiveSample(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleItem) => {
    setActiveSample(sample);
    setSelectedImage(sample.imageUrl);
    setMimeType('image/svg+xml');
  };

  const handleSubmit = () => {
    if (!selectedImage) return;
    if (activeSample) {
      onAnalyze(selectedImage, mimeType, userHint, activeSample);
    } else {
      onAnalyze(selectedImage, mimeType, userHint);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Editorial Title Section */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A27B5C] mb-3">
          Solve The "I Have Nothing To Wear With This" Dilemma
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#1C1917] max-w-2xl mx-auto leading-tight">
          Give us one challenging piece. We’ll design 3 complete outfits.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#78716C] max-w-xl mx-auto font-light leading-relaxed">
          Upload a statement skirt, bold jacket, or tricky pattern. Atelier Noir analyzes its color theory, silhouette, and drape—then visualizes Casual, Business, and Night Out flat-lays.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-[#FFFFFF] border border-[#E5DFD7] rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dropzone / Preview */}
          <div className="md:col-span-7">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => !selectedImage && fileInputRef.current?.click()}
              className={`relative border-2 ${
                isDragging
                  ? 'border-[#A27B5C] bg-[#FBF9F5]'
                  : selectedImage
                  ? 'border-[#E5DFD7] bg-[#FBF9F5]'
                  : 'border-dashed border-[#D6CEC4] bg-[#FBF9F5] hover:border-[#A27B5C] hover:bg-[#F3EFEA]'
              } rounded-md p-6 sm:p-8 text-center transition-all cursor-pointer min-h-[320px] flex flex-col items-center justify-center`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileProcess(e.target.files[0])}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileProcess(e.target.files[0])}
              />

              {selectedImage ? (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-md overflow-hidden bg-[#FFFFFF] border border-[#E5DFD7] shadow-sm flex items-center justify-center p-2 mb-4">
                    <img
                      src={selectedImage}
                      alt="Uploaded wardrobe item"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {activeSample ? (
                    <div className="text-center mb-3">
                      <p className="font-serif text-lg font-medium text-[#1C1917]">
                        {activeSample.name}
                      </p>
                      <p className="text-xs text-[#78716C] mt-0.5">{activeSample.subtitle}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-[#78716C] mb-3">Custom item photo ready for styling</p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="text-xs px-3 py-1.5 bg-[#FFFFFF] border border-[#E5DFD7] text-[#1C1917] hover:bg-[#F3EFEA] rounded-sm transition-colors cursor-pointer"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setActiveSample(null);
                      }}
                      className="text-xs px-3 py-1.5 text-[#991B1B] hover:bg-[#FEE2E2] rounded-sm transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#F3EFEA] border border-[#E5DFD7] flex items-center justify-center mb-4 text-[#A27B5C]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#1C1917] mb-1">
                    Upload your wardrobe piece
                  </h3>
                  <p className="text-xs text-[#78716C] max-w-xs mb-4">
                    Drag and drop your garment photo here, or browse files (PNG, JPG, WEBP)
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 text-xs font-medium tracking-wide uppercase bg-[#1C1917] text-[#FFFFFF] hover:bg-[#2E2A27] rounded-sm transition-colors cursor-pointer"
                    >
                      Browse Device
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cameraInputRef.current?.click();
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wide text-[#1C1917] bg-[#FFFFFF] border border-[#E5DFD7] hover:bg-[#F3EFEA] rounded-sm transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#78716C]" />
                      <span>Take Photo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Styling Notes & Generation CTA */}
          <div className="md:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-2">
                  Styling Notes / Preferences (Optional)
                </label>
                <textarea
                  rows={3}
                  value={userHint}
                  onChange={(e) => setUserHint(e.target.value)}
                  placeholder="e.g., 'Prefer flats and low heels', 'Need layers for breezy spring weather', 'Keep it minimalist'..."
                  className="w-full text-xs sm:text-sm p-3 bg-[#FBF9F5] border border-[#E5DFD7] rounded-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#A27B5C] transition-colors resize-none"
                />
              </div>

              <div className="border-t border-[#E5DFD7] pt-4 mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C] block mb-2">
                  What Atelier Noir Delivers:
                </span>
                <ul className="space-y-2 text-xs text-[#44403C]">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A27B5C]" />
                    <span>Exact color theory palette & undertone mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A27B5C]" />
                    <span>3 Occasions: Casual Weekend, Business, Night Out</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A27B5C]" />
                    <span>Clean editorial flat-lay imagery for each ensemble</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A27B5C]" />
                    <span>Itemized piece checklist with shoes, bags & jewelry</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedImage || isLoading}
              className={`w-full py-3.5 px-6 rounded-sm font-medium text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                !selectedImage || isLoading
                  ? 'bg-[#E5DFD7] text-[#A8A29E] cursor-not-allowed'
                  : 'bg-[#1C1917] text-[#FFFFFF] hover:bg-[#2E2A27] shadow-sm'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin" />
                  <span>Consulting Atelier AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Analyze & Style Ensembles</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Tricky Items Gallery */}
      <div className="mt-12">
        <div className="flex items-baseline justify-between mb-4 border-b border-[#E5DFD7] pb-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917]">
              Or Try A Notoriously Tricky Sample Specimen
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Select one of our 4 archive garments to see how the stylist balances complex prints and bold silhouettes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_WARDROBE_ITEMS.map((sample) => {
            const isSelected = activeSample?.id === sample.id;
            return (
              <div
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`group border ${
                  isSelected
                    ? 'border-[#1C1917] ring-1 ring-[#1C1917] bg-[#FBF9F5]'
                    : 'border-[#E5DFD7] bg-[#FFFFFF] hover:border-[#A27B5C]'
                } rounded-md p-3 text-left transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#FBF9F5] border border-[#E5DFD7] mb-3">
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#1C1917]/80 text-[#FFFFFF] text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      {sample.badge}
                    </div>
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-[#1C1917] line-clamp-1">
                    {sample.name}
                  </h3>
                  <p className="text-[11px] text-[#78716C] line-clamp-2 mt-1 leading-relaxed">
                    {sample.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#F3EFEA] flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {sample.colorPalette.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name} (${c.role})`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A27B5C] font-semibold group-hover:underline">
                    {isSelected ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
