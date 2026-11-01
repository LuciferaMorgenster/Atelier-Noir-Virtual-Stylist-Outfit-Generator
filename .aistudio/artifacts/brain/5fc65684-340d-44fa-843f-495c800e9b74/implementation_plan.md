# Atelier Noir: Virtual Stylist & Outfit Generator

A high-editorial styling assistant solving the "I don't know what to wear with this" dilemma by analyzing difficult wardrobe anchor pieces, extracting chromatic and stylistic DNA, and generating 3 complete, balanced flat-lay outfits (Casual, Business, Night Out) with visual flat-lay compositions, color swatches, itemized piece breakdowns, and expert stylist rationale.

### User Review & Critical Decisions

> [!IMPORTANT]
> Key design and scope choices were confirmed during Phase 1 clarification:
> - **Aesthetic Direction**: High-fashion editorial lookbook with warm neutral tones (linen cream, deep espresso, warm ivory, brushed gold accents) and refined serif/sans typography pairing (`Cormorant Garamond` & `Plus Jakarta Sans`).
> - **Input Flexibility**: Full dual-path wardrobe ingestion—users can upload their own garment photo, snap via camera, or instantly pick from a curated gallery of notoriously tricky pieces (e.g., Bold Marigold Floral Midi Skirt, Cobalt Oversized Leather Blazer, Emerald Houndstooth Culottes, Metallic Pleated Maxi).
> - **Outfit Deliverable**: Each of the 3 outfits (Casual, Business, Night Out) delivers a cohesive flat-lay visual presentation, harmonious color palette swatches with chromatic roles, complete piece-by-piece fashion checklist, and expert stylist rationale explaining *why* the combination works.
> - **Image Generation Engine**: Uses server-side `@google/genai` with `gemini-3.8-flash` for multimodal analysis and outfit curation, paired with `gemini-nano-banana-2.1` / `gemini-3.1-flash-lite-image` for flat-lay image generation and custom prompt-based image edits.

---

### 1. Overview & Core Concept

- **What It Does**: The user provides a photo of a single "orphan" or difficult wardrobe piece (e.g. an intricate patterned skirt, statement jacket, or vibrant trousers). The stylist analyzes the garment's silhouette, primary/accent colors, textures, and formality. It then builds three tailored outfits (Casual, Business, and Night Out) pairing the anchor piece with complementary garments, shoes, bags, and accessories, visualized in a clean flat-lay layout.
- **Target Audience / Persona**: Fashion-conscious individuals with statement wardrobe pieces sitting unworn in their closets, seeking clear, visual, and wearable styling formulas without guesswork.
- **Key Value**: Eliminates closet paralysis by transforming a single challenging garment into 3 versatile, ready-to-wear ensembles with clear visual flat-lays and actionable pairing guides.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Garment Ingestion (Zero-State)**:
   - Editorial hero section with clean upload dropzone (drag & drop or click to upload).
   - "Sample Archive" drawer: Quick-select sample items (Floral Silk Skirt, Neon Lime Tweed Jacket, Metallic Pleated Skirt, Leopard Slip Dress) for instant 1-click styling demonstration.
2. **AI Vision & Chromatic DNA Analysis**:
   - Live scanning state highlighting extracted attributes: Garment silhouette, fabric drape/texture, primary base tones, accent pigments, and pattern complexity.
   - Interactive color palette cards displaying hex values and color theory roles (Dominant, Bridge, High-Contrast Accent).
3. **The Triptych Capsule (Casual · Business · Night Out)**:
   - Tabbed or side-by-side editorial lookbook grid featuring the 3 distinct occasion outfits.
   - For each outfit:
     - **Clean Flat-Lay Visual**: High-resolution flat-lay composition showing all coordinated garments and accessories styled on an off-white stone/linen surface.
     - **Chromatic Harmony Swatches**: The color theory palette connecting the anchor piece to complementary items.
     - **Piece Breakdown**: Categorized list of complementary pieces (Tops/Bottoms/Layering, Footwear, Handbag, Jewelry, Statement Accessories).
     - **Stylist Rationale**: 2-3 sentences explaining silhouette balancing, contrast anchoring, and texture play.
4. **Interactive Flat-Lay Studio & Prompt Editing**:
   - Ability to tweak or prompt edits to any flat-lay outfit (e.g., "Swap the black leather mules for cream loafers", "Add gold minimalist jewelry") using `gemini-nano-banana-2.1`.
   - Export & Lookbook Save: Download flat-lay card or copy shopping piece list.

#### Visual Identity & Theme
- **Aesthetic Direction**: Editorial luxury lookbook inspired by *The Gentlewoman*, *Kinfolk*, and high-end atelier portfolios. Soft, tactile, and restrained.
- **Color Palette & Mood**:
  - Background Canvas: Warm Alabaster (`#FBF9F5`) and Crisp Milk (`#FFFFFF`).
  - Structural Surfaces: Soft Cashmere (`#F3EFEA`) with hairline borders in Stone Ochre (`#E5DFD7`).
  - Typography: Espresso Noir (`#1C1917`) for headlines, Charcoal Taupe (`#44403C`) for body prose, Muted Stone (`#78716C`) for metadata.
  - Accent Tone: Subtle Warm Cognac / Brushed Gold (`#A27B5C` / `#C5A880`) for active states and highlights.
- **Typography & Hierarchy**:
  - Display / Headings: `Cormorant Garamond` (classic serif, weights 500 & 600) for lookbook titles and occasion names.
  - Body & UI Controls: `Plus Jakarta Sans` (refined modern sans, weights 400, 500, 600) for readable descriptions, piece listings, and buttons.
  - Metadata: Clean unboxed typography with typographic separators (`·`), strict zero-pill discipline for tags and statuses.
- **Interactive Feedback & Motion**:
  - Smooth tab transitions between outfits using `motion` (Framer Motion).
  - Shimmer pulse during AI vision analysis and flat-lay rendering.
  - Toast feedback for saved looks and copied checklists.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Engine Vision Analysis & Image Generation**
  - *Chosen Approach*: Use `gemini-3.8-flash` for rapid, multimodal garment understanding, structured JSON outfit schema generation, and stylist commentary, and invoke `gemini-nano-banana-2.1` / `gemini-3.1-flash-lite-image` for high-quality flat-lay visual generation and user text prompt edits.
  - *Why*: Multimodal text models provide structured, deterministic fashion styling logic and color theory, while dedicated image models provide photographic flat-lay compositions.
  - *Alternatives Considered*: Pure image-to-image without structured breakdown (fails to provide actionable item names and color swatches) vs. pure text checklist (lacks the vital visual flat-lay inspiration requested by the user).
- **Decision 2: Curated Tricky Garment Presets alongside Custom Upload**
  - *Chosen Approach*: Provide 4 pre-loaded high-resolution difficult wardrobe items with instant previews so users can test the full experience with zero friction immediately upon opening the app.
  - *Why*: Users often test apps before hunting for a photo in their gallery; sample pieces demonstrate immediate value and show the app's capability with complex patterns.
- **Decision 3: Server-Side API Architecture via Vite/Express Middleware**
  - *Chosen Approach*: Server proxy endpoints (`/api/analyze-garment`, `/api/generate-flatlay`, `/api/edit-flatlay`) keep `@google/genai` secure on the server side using `process.env.GEMINI_API_KEY` and `'User-Agent': 'aistudio-build'` in strict accordance with the `@google/genai` guidelines.

---

### 4. Technical Architecture & Data Strategy

#### System Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (React 19)                             │
│  ┌───────────────────────┐  ┌────────────────────────────────────────┐ │
│  │   Garment Ingestion   │  │           Editorial Lookbook           │ │
│  │ • File Upload / Drop  │  │ • Occasion Switcher (Casual/Work/Night)│ │
│  │ • Camera Snap         │  │ • Flat-Lay Visual Canvas               │ │
│  │ • Tricky Presets      │  │ • Chromatic Palette Swatches           │ │
│  └───────────┬───────────┘  │ • Complete Piece Checklist             │ │
│              │              │ • Stylist Rationale & Advice           │ │
│              │              │ • Interactive Flat-Lay Prompt Editor   │ │
│              ▼              └───────────────────▲────────────────────┘ │
│      Local State Store                          │                      │
│   (activeItem, outfits, activeTab, isGenerating)│                      │
└──────────────┬──────────────────────────────────┴──────────────────────┘
               │ HTTP POST (/api/analyze-garment, /api/generate-flatlay)
               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    SERVER (Express / Vite Middleware)                  │
│                                                                        │
│   POST /api/analyze-garment                                            │
│   ├── Calls @google/genai with 'gemini-3.8-flash'                      │
│   ├── Extracts item attributes, palette, & 3 outfit definitions        │
│   └── Returns structured JSON schema                                   │
│                                                                        │
│   POST /api/generate-flatlay & POST /api/edit-flatlay                  │
│   ├── Calls @google/genai with 'gemini-nano-banana-2.1'                │
│   ├── Applies flat-lay prompt with aspect ratio 1:1, imageSize 1K      │
│   └── Returns base64 flat-lay image data URL                           │
└────────────────────────────────────────────────────────────────────────┘
```

#### Data Model & State
```ts
interface GarmentAnalysis {
  name: string;
  category: 'skirt' | 'dress' | 'jacket' | 'top' | 'pants' | 'shoes' | 'accessory';
  silhouette: string;
  materialTexture: string;
  patternType: string;
  colorPalette: {
    hex: string;
    name: string;
    role: 'dominant' | 'secondary' | 'accent';
  }[];
  stylingChallenges: string[];
}

interface OutfitPiece {
  category: 'Anchor Piece' | 'Top' | 'Bottom' | 'Outerwear' | 'Footwear' | 'Bag' | 'Jewelry' | 'Accents';
  name: string;
  color: string;
  material: string;
  stylingTip: string;
}

interface OutfitOption {
  id: 'casual' | 'business' | 'night-out';
  occasion: string;
  tagline: string;
  rationale: string;
  palette: { hex: string; name: string; role: string }[];
  pieces: OutfitPiece[];
  flatlayPrompt: string;
  flatlayImageUrl?: string;
  isGeneratingImage?: boolean;
}
```

#### Interactive Component & State Mapping
- **GarmentDropzone & PresetSelector**: Handles drag-and-drop, camera uploads, or sample selection; converts to base64 and triggers `/api/analyze-garment`.
- **PaletteStrip & DnaCard**: Interactive color swatch bar showing detected colors and garment attributes.
- **OccasionTabBar**: Seamless navigation between Casual, Business, and Night Out capsules with animated underline.
- **FlatLayCanvas**: Displays the generated flat-lay image with zoom view, loading skeleton, and fallback high-fidelity composition.
- **PieceList**: Detailed item list grouped by clothing layer, footwear, and accessories with subtle typography.
- **PromptEditorModal / Bar**: Allows custom user prompt revisions (e.g., "Change the jacket to camel wool") targeting the active outfit.
