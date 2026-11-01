export interface SampleItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  badge: string;
  imageUrl: string;
  description: string;
  colorPalette: { hex: string; name: string; role: string }[];
  silhouette: string;
  fabricTexture: string;
  patternType: string;
  stylingChallenges: string[];
  goldenRule: string;
  presetOutfits: {
    id: 'casual' | 'business' | 'night-out';
    occasion: string;
    conceptName: string;
    stylistRationale: string;
    palette: { hex: string; name: string; role: string }[];
    pieces: {
      role: string;
      name: string;
      color: string;
      material: string;
      stylingTip: string;
    }[];
    flatlayPrompt: string;
    fallbackFlatlaySvg?: string;
  }[];
}

// Inline high-fidelity SVG representations for instantaneous testing without network stalls
const SVG_FLORAL_SKIRT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="skirtBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FBF9F5" />
      <stop offset="100%" stop-color="#EFE9DE" />
    </radialGradient>
    <linearGradient id="silkShine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="25%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#B45309" />
      <stop offset="75%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#451A03" flood-opacity="0.18"/>
    </filter>
    <pattern id="botanical" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="14" fill="#1E293B" opacity="0.85"/>
      <circle cx="20" cy="20" r="6" fill="#FDE68A"/>
      <path d="M 20 6 Q 32 20 20 34 Q 8 20 20 6 Z" fill="#451A03" opacity="0.6"/>
      <circle cx="60" cy="60" r="10" fill="#991B1B" opacity="0.8"/>
      <path d="M 50 50 Q 60 70 70 50 Z" fill="#FBBF24" opacity="0.7"/>
      <circle cx="60" cy="15" r="4" fill="#047857"/>
    </pattern>
  </defs>
  <rect width="600" height="600" fill="url(#skirtBg)"/>
  <!-- Flat-lay Studio Lighting Glow -->
  <circle cx="300" cy="300" r="260" fill="#FFFFFF" opacity="0.5"/>
  <!-- The Garment: A-Line Floral Silk Skirt -->
  <g filter="url(#softShadow)">
    <!-- Waistband -->
    <path d="M 220 130 C 260 135, 340 135, 380 130 L 382 155 C 340 162, 260 162, 218 155 Z" fill="#451A03"/>
    <!-- Skirt Body with Silk Folds -->
    <path d="M 220 145 C 190 260, 140 400, 110 490 C 230 525, 370 525, 490 490 C 460 400, 410 260, 380 145 C 330 155, 270 155, 220 145 Z" fill="url(#silkShine)"/>
    <path d="M 220 145 C 190 260, 140 400, 110 490 C 230 525, 370 525, 490 490 C 460 400, 410 260, 380 145 C 330 155, 270 155, 220 145 Z" fill="url(#botanical)" opacity="0.88"/>
    <!-- Fluid Drape Highlights -->
    <path d="M 260 155 Q 230 320 210 505" stroke="#FEF3C7" stroke-width="3" stroke-linecap="round" opacity="0.4" fill="none"/>
    <path d="M 340 155 Q 370 320 390 505" stroke="#FEF3C7" stroke-width="3" stroke-linecap="round" opacity="0.4" fill="none"/>
    <path d="M 300 155 Q 300 330 300 515" stroke="#1E293B" stroke-width="4" stroke-linecap="round" opacity="0.3" fill="none"/>
  </g>
  <text x="300" y="565" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" fill="#78716C" letter-spacing="2">ARCHIVE SPECIMEN · 01</text>
</svg>
`)}`;

const SVG_COBALT_BLAZER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="blazerBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FBF9F5" />
      <stop offset="100%" stop-color="#E8ECEF" />
    </radialGradient>
    <linearGradient id="cobaltLeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="50%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#172554" />
    </linearGradient>
    <filter id="softShadow2" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0F172A" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#blazerBg)"/>
  <circle cx="300" cy="300" r="260" fill="#FFFFFF" opacity="0.6"/>
  <!-- Oversized Cobalt Leather Blazer -->
  <g filter="url(#softShadow2)">
    <!-- Shoulders & Torso -->
    <path d="M 170 180 L 250 140 L 350 140 L 430 180 L 460 360 L 400 375 L 390 490 L 210 490 L 200 375 L 140 360 Z" fill="url(#cobaltLeather)"/>
    <!-- Collar & Lapels -->
    <path d="M 250 140 L 230 250 L 290 320 L 300 140 Z" fill="#1E40AF"/>
    <path d="M 350 140 L 370 250 L 310 320 L 300 140 Z" fill="#1D4ED8"/>
    <!-- Breast & Flap Pockets -->
    <rect x="330" y="360" width="60" height="10" rx="3" fill="#1E3A8A"/>
    <rect x="210" y="360" width="60" height="10" rx="3" fill="#1E3A8A"/>
    <rect x="220" y="240" width="45" height="6" rx="2" fill="#1E3A8A"/>
    <!-- Horn Buttons -->
    <circle cx="295" cy="350" r="7" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
    <circle cx="295" cy="405" r="7" fill="#0F172A" stroke="#38BDF8" stroke-width="1"/>
    <!-- Leather Highlight Sheen -->
    <path d="M 180 190 L 235 155" stroke="#60A5FA" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    <path d="M 420 190 L 365 155" stroke="#60A5FA" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  </g>
  <text x="300" y="565" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" fill="#78716C" letter-spacing="2">ARCHIVE SPECIMEN · 02</text>
</svg>
`)}`;

const SVG_HOUNDSTOOTH_PANTS = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="pantsBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FBF9F5" />
      <stop offset="100%" stop-color="#E8ECE7" />
    </radialGradient>
    <pattern id="houndstooth" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="#F7FEE7"/>
      <polygon points="0,0 12,0 0,12" fill="#064E3B"/>
      <polygon points="12,12 24,12 12,24" fill="#064E3B"/>
      <rect x="12" y="0" width="6" height="6" fill="#064E3B"/>
      <rect x="0" y="12" width="6" height="6" fill="#064E3B"/>
    </pattern>
    <filter id="softShadow3" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#064E3B" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#pantsBg)"/>
  <circle cx="300" cy="300" r="260" fill="#FFFFFF" opacity="0.6"/>
  <!-- High-Waisted Wide Leg Houndstooth Pants -->
  <g filter="url(#softShadow3)">
    <!-- Waistband -->
    <rect x="220" y="120" width="160" height="24" rx="4" fill="#064E3B"/>
    <!-- Trouser Legs -->
    <path d="M 220 144 L 200 480 L 275 480 L 296 280 L 304 280 L 325 480 L 400 480 L 380 144 Z" fill="url(#houndstooth)"/>
    <!-- Front Pressed Creases -->
    <line x1="242" y1="170" x2="238" y2="480" stroke="#064E3B" stroke-width="2" opacity="0.7"/>
    <line x1="358" y1="170" x2="362" y2="480" stroke="#064E3B" stroke-width="2" opacity="0.7"/>
    <!-- Horn Waist Button -->
    <circle cx="300" cy="132" r="6" fill="#FDE047" stroke="#064E3B" stroke-width="1"/>
  </g>
  <text x="300" y="565" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" fill="#78716C" letter-spacing="2">ARCHIVE SPECIMEN · 03</text>
</svg>
`)}`;

const SVG_METALLIC_SKIRT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bronzeBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FBF9F5" />
      <stop offset="100%" stop-color="#EFE8E1" />
    </radialGradient>
    <linearGradient id="bronzeMetallic" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="15%" stop-color="#B45309"/>
      <stop offset="30%" stop-color="#FDE68A"/>
      <stop offset="45%" stop-color="#92400E"/>
      <stop offset="60%" stop-color="#F59E0B"/>
      <stop offset="75%" stop-color="#FEF3C7"/>
      <stop offset="90%" stop-color="#B45309"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
    <filter id="softShadow4" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#78350F" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bronzeBg)"/>
  <circle cx="300" cy="300" r="260" fill="#FFFFFF" opacity="0.6"/>
  <!-- Liquid Metallic Pleated Accordion Skirt -->
  <g filter="url(#softShadow4)">
    <rect x="230" y="130" width="140" height="20" rx="3" fill="#78350F"/>
    <path d="M 230 150 L 130 490 C 240 515, 360 515, 470 490 L 370 150 Z" fill="url(#bronzeMetallic)"/>
    <!-- Knife Pleat Shadow Lines -->
    <path d="M 245 150 L 170 493 M 260 150 L 205 496 M 275 150 L 245 500 M 290 150 L 285 502 M 305 150 L 320 502 M 320 150 L 355 500 M 335 150 L 395 496 M 350 150 L 430 493" stroke="#451A03" stroke-width="1.5" opacity="0.5"/>
    <!-- Gleam Accents -->
    <line x1="280" y1="150" x2="260" y2="495" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>
    <line x1="330" y1="150" x2="340" y2="495" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>
  </g>
  <text x="300" y="565" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" fill="#78716C" letter-spacing="2">ARCHIVE SPECIMEN · 04</text>
</svg>
`)}`;

export const SAMPLE_WARDROBE_ITEMS: SampleItem[] = [
  {
    id: 'saffron-floral-skirt',
    name: 'Vintage Saffron & Paisley Silk Midi Skirt',
    subtitle: 'Maximalist botanical print on fluid golden silk twill',
    category: 'Midi Skirt',
    badge: 'Challenging Pattern',
    imageUrl: SVG_FLORAL_SKIRT,
    description: 'A striking multi-chromatic skirt with warm marigold grounds, deep navy botanical vines, and hints of burnt terracotta. Often left unworn because the loud print intimidates everyday pairings.',
    silhouette: 'High-waisted fluid A-line midi with gentle drape',
    fabricTexture: 'Lustrous lightweight 100% silk twill with matte movement',
    patternType: 'Intricate botanical paisley and floral arabesque',
    stylingChallenges: [
      'High chromatic density causes clash with patterned or textured tops',
      'Warm saffron undertones can look garish if paired with bright primaries',
      'Fluid silk silhouette requires deliberate proportion counterbalancing',
    ],
    goldenRule: 'Anchor the skirt as the sole hero piece. Anchor the rest of the outfit in tactile neutrals (creams, warm camel, espresso) pulled directly from the deepest accents in the print.',
    colorPalette: [
      { hex: '#D97706', name: 'Golden Saffron', role: 'Dominant Ground' },
      { hex: '#1E293B', name: 'Midnight Slate', role: 'Secondary Motif' },
      { hex: '#991B1B', name: 'Burnt Terracotta', role: 'Vivid Accent' },
      { hex: '#FEF3C7', name: 'Warm Parchment', role: 'Bridge Highlight' },
      { hex: '#047857', name: 'Verdant Forest', role: 'Subtle Botanical' },
    ],
    presetOutfits: [
      {
        id: 'casual',
        occasion: 'Casual Weekend',
        conceptName: 'Effortless Rive Gauche Sunday',
        stylistRationale: 'Softens the formal sheen of silk by contrasting with an oversized chunky ribbed cashmere knit and clean cream leather retro sneakers. The oatmeal knit keeps the focus comfortably on the skirt pattern while keeping the vibe relaxed.',
        palette: [
          { hex: '#F5F5F0', name: 'Oatmeal Milk', role: 'Base Canvas' },
          { hex: '#D97706', name: 'Saffron Silk', role: 'Anchor Piece' },
          { hex: '#A27B5C', name: 'Cognac Leather', role: 'Warm Grounding' },
          { hex: '#FFFFFF', name: 'Pure Chalk', role: 'Crisp Footwear' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Vintage Saffron Silk Midi Skirt', color: 'Saffron & Midnight', material: 'Silk Twill', stylingTip: 'Let it drape freely; waistline is casually framed by a front-tuck' },
          { role: 'Top / Knitwear', name: 'Slouchy Ribbed Cashmere Crewneck', color: 'Oatmeal Melange', material: 'Chunky 4-ply Cashmere', stylingTip: 'Gentle French tuck in the front to define waist without squeezing' },
          { role: 'Footwear', name: 'Minimalist Low-Profile Leather Sneakers', color: 'Off-White & Biscuit', material: 'Buttery Nappa Leather', stylingTip: 'No-show socks to expose a clean sliver of ankle' },
          { role: 'Handbag', name: 'Slouchy Leather Shoulder Tote', color: 'Warm Cognac', material: 'Pebbled Calfskin', stylingTip: 'Adds warm tonal grounding that echoes the marigold undertone' },
          { role: 'Jewelry & Accent', name: 'Chunky 14k Gold C-Hoops & Tortoise Sunglasses', color: 'Polished Gold', material: 'Recycled 14k Gold / Acetate', stylingTip: 'Understated jewelry keeps the top half relaxed' },
        ],
        flatlayPrompt: 'Top-down editorial flat-lay photo on warm textured cream linen: Saffron yellow floral printed silk midi skirt neatly spread, paired with an oversized slouchy oatmeal cashmere crewneck sweater, minimalist clean white leather court sneakers, a soft slouchy cognac brown leather tote bag, pair of round tortoise shell sunglasses, and gold hoop earrings. Arranged with artful breathing room, high fashion magazine styling, soft natural morning window light.',
      },
      {
        id: 'business',
        occasion: 'Business & Office',
        conceptName: 'Architectural Executive Polish',
        stylistRationale: 'Balances the fluid romantic skirt with razor-sharp corporate tailoring. A structured double-breasted midnight blazer and crisp poplin shirt pick up the deep navy undertones in the skirt, commanding authority without stifling personality.',
        palette: [
          { hex: '#0F172A', name: 'Deep Midnight', role: 'Structural Tailoring' },
          { hex: '#FFFFFF', name: 'Crisp Cotton White', role: 'Clean Contrast' },
          { hex: '#D97706', name: 'Saffron Accent', role: 'Anchor Hero' },
          { hex: '#1C1917', name: 'Polished Espresso', role: 'Leather Trim' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Vintage Saffron Silk Midi Skirt', color: 'Saffron & Midnight', material: 'Silk Twill', stylingTip: 'The midi length fits professional dress codes flawlessly' },
          { role: 'Tailored Layer', name: 'Oversized Double-Breasted Wool Blazer', color: 'Midnight Navy', material: 'Italian Tropical Wool', stylingTip: 'Wear unbuttoned or draped over shoulders for modern boardroom ease' },
          { role: 'Top', name: 'Sharp Point-Collar Cotton Poplin Shirt', color: 'Optical White', material: 'Crisp 100% Egyptian Cotton', stylingTip: 'Fully buttoned with collar popped slightly or top two undone' },
          { role: 'Footwear', name: 'Sculptural Pointed-Toe Kitten Heel Mules', color: 'Espresso Box Leather', material: 'Calfskin', stylingTip: 'Elongates the silhouette while remaining comfortable all day' },
          { role: 'Handbag & Watch', name: 'Structured Trapeze Briefcase & Tank Watch', color: 'Black & Gold', material: 'Smooth Box Calf / Croc Strap', stylingTip: 'Adds geometric discipline to counterbalance the fluid botanical print' },
        ],
        flatlayPrompt: 'Overhead editorial flat-lay fashion layout on smooth pale travertine stone: Saffron paisley silk midi skirt arranged with a tailored double-breasted midnight navy wool blazer, crisp white poplin button-down shirt, dark espresso pointed-toe kitten heel mules, a sleek structured black leather handbag with gold hardware, and a classic rectangular vintage gold watch. Clean aesthetic, soft studio shadows.',
      },
      {
        id: 'night-out',
        occasion: 'Night Out & Cocktails',
        conceptName: 'Golden Hour Alchemy',
        stylistRationale: 'Maximizes the dramatic glamour of silk by pairing it with tactile black ribbed knitwear, barely-there strappy heels, and brushed gold statement jewelry. The dark top draws the eye upward while letting the skirt flare with nighttime radiance.',
        palette: [
          { hex: '#171717', name: 'Obsidian Black', role: 'Dramatic Frame' },
          { hex: '#D97706', name: 'Luminous Saffron', role: 'Hero Glow' },
          { hex: '#C5A880', name: 'Brushed 18k Gold', role: 'Reflective Accent' },
          { hex: '#991B1B', name: 'Deep Crimson', role: 'Lip Highlight' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Vintage Saffron Silk Midi Skirt', color: 'Saffron & Midnight', material: 'Silk Twill', stylingTip: 'Catches the candle and dim ambient light with natural luster' },
          { role: 'Top', name: 'Asymmetrical Cutout Fine Knit Bodysuit', color: 'Pitch Black', material: 'Seamless Viscose-Elastane', stylingTip: 'Sleek body-skimming silhouette provides high-contrast tension' },
          { role: 'Footwear', name: 'Delicate Strappy Stiletto Heeled Sandals', color: 'Metallic Antique Gold', material: 'Liquid Specchio Leather', stylingTip: 'Minimal straps let the skirt hem take center stage' },
          { role: 'Handbag', name: 'Puff Cloud Leather Frame Clutch', color: 'Jet Black', material: 'Supple Nappa Leather', stylingTip: 'Tucked effortlessly under arm' },
          { role: 'Jewelry', name: 'Hammered Brass Collar Necklace & Bold Ring', color: 'Molten Gold', material: 'Hand-cast Brass', stylingTip: 'Reflects the warm marigold notes of the skirt' },
        ],
        flatlayPrompt: 'Top-down luxury lookbook flat-lay on dark slate linen: Saffron yellow botanical print silk skirt centered with a sleek black asymmetrical knit bodysuit, metallic gold strappy high-heel sandals, a pillowy black leather clutch bag, sculptural molten gold collar necklace, and a deep crimson lipstick tube. Moody high-end editorial lighting, crisp shadows.',
      },
    ],
  },
  {
    id: 'cobalt-leather-blazer',
    name: 'Electric Cobalt Oversized Leather Blazer',
    subtitle: 'Saturated high-voltage blue with masculine boxy tailoring',
    category: 'Statement Blazer',
    badge: 'High Saturation',
    imageUrl: SVG_COBALT_BLAZER,
    description: 'An audacious statement jacket in intense lapis cobalt blue leather. A dream runway piece that often sits in the closet because people fear looking like an 80s caricature or power-suit cliché.',
    silhouette: 'Oversized boxy double-breasted with padded shoulders',
    fabricTexture: 'Semi-gloss glazed lambskin with rich leather grain',
    patternType: 'Solid electric monochrome',
    stylingChallenges: [
      'Overpowers any pastel or medium-tone clothing placed near it',
      'Boxy masculine structure can overwhelm petite or softer silhouettes',
      'Can feel costume-like without disciplined neutral anchoring',
    ],
    goldenRule: 'Treat the electric cobalt as the single shock of color. Anchor with deep washed charcoal denim, rich chocolate brown leather, or pure optic white to make the blue feel intentional and contemporary.',
    colorPalette: [
      { hex: '#1D4ED8', name: 'Electric Cobalt', role: 'Dominant Statement' },
      { hex: '#334155', name: 'Washed Charcoal', role: 'Muted Counterpart' },
      { hex: '#451A03', name: 'Dark Chocolate', role: 'Warm Contrast' },
      { hex: '#FFFFFF', name: 'Optic White', role: 'Clean Canvas' },
      { hex: '#94A3B8', name: 'Silver Hardware', role: 'Cool Tone Metal' },
    ],
    presetOutfits: [
      {
        id: 'casual',
        occasion: 'Casual Weekend',
        conceptName: 'SoHo Off-Duty Model',
        stylistRationale: 'Dresses down the high-voltage leather with vintage straight-leg washed charcoal jeans and a shrunken white baby-tee. Suede caramel loafers add an unexpected warm texture that softens the leather sheen.',
        palette: [
          { hex: '#1D4ED8', name: 'Cobalt Blazer', role: 'Statement Anchor' },
          { hex: '#FFFFFF', name: 'Bright White', role: 'Core Base' },
          { hex: '#475569', name: 'Faded Denim Slate', role: 'Casual Ground' },
          { hex: '#78350F', name: 'Caramel Suede', role: 'Texture Play' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Electric Cobalt Oversized Leather Blazer', color: 'Electric Cobalt', material: 'Glazed Lambskin', stylingTip: 'Push sleeves up slightly to forearm for casual attitude' },
          { role: 'Top', name: 'Heavyweight Ribbed Cotton Baby Tee', color: 'Optic White', material: 'Organic Cotton', stylingTip: 'Cropped just at the high-rise jean waistband' },
          { role: 'Bottom', name: 'High-Rise Straight Leg Vintage Denim', color: 'Faded Charcoal Grey', material: '100% Rigid Denim', stylingTip: 'Raw frayed hem resting right over the loafers' },
          { role: 'Footwear', name: 'Lug-Sole Penny Loafers', color: 'Caramel Brown Suede', material: 'Italian Suede', stylingTip: 'Grounds the modern blue with classic heritage texture' },
          { role: 'Accessories', name: 'Woven Leather Bucket Bag & Silver Hoops', color: 'Dark Chocolate & Silver', material: 'Woven Calfskin / Sterling Silver', stylingTip: 'Keeps accessories quiet so the blue stays the focal point' },
        ],
        flatlayPrompt: 'Editorial flat-lay top-down view on light sandstone: Electric cobalt blue leather oversized blazer laid flat with washed charcoal straight-leg jeans, a cropped white cotton t-shirt, caramel suede penny loafers, chocolate brown woven leather bag, and sleek silver hoop earrings. Clean minimalist lighting, magazine spread composition.',
      },
      {
        id: 'business',
        occasion: 'Business & Office',
        conceptName: 'Creative Director Monolith',
        stylistRationale: 'Turns the blazer into the pinnacle of creative power dressing by pairing with fluid cream pleated wide-leg trousers and a fine-gauge chocolate silk-cashmere mock neck. The warm brown and cream tame the cold intensity of the cobalt.',
        palette: [
          { hex: '#1D4ED8', name: 'Electric Cobalt', role: 'Authority Hero' },
          { hex: '#3E2723', name: 'Deep Espresso', role: 'Luxe Grounding' },
          { hex: '#F5F5F0', name: 'Cream Alabaster', role: 'Airy Sophistication' },
          { hex: '#D4AF37', name: 'Brushed Brass', role: 'Warm Accents' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Electric Cobalt Oversized Leather Blazer', color: 'Electric Cobalt', material: 'Glazed Lambskin', stylingTip: 'Buttons left open to showcase vertical column of cream trousers' },
          { role: 'Top', name: 'Fine-Gauge Silk-Cashmere Mockneck', color: 'Dark Espresso Brown', material: '70% Silk 30% Cashmere', stylingTip: 'Tucked cleanly into trousers' },
          { role: 'Bottom', name: 'Double-Pleated Wide-Leg Trousers', color: 'Warm Cream / Alabaster', material: 'Heavy Wool Crepe', stylingTip: 'Puddle hem skimming the floor for elongating elegance' },
          { role: 'Footwear', name: 'Square-Toe Block Heel Ankle Boots', color: 'Chocolate Calfskin', material: 'Polished Calfskin', stylingTip: 'Structured heel peeking under wide trouser hem' },
          { role: 'Handbag', name: 'Structured Envelope Tote & Leather Belt', color: 'Espresso Brown', material: 'Smooth Saddle Leather', stylingTip: 'Slim belt with brushed gold buckle unites the look' },
        ],
        flatlayPrompt: 'Top-down high fashion flat-lay on off-white plaster surface: Bold cobalt blue leather blazer surrounded by cream high-waisted pleated wide-leg trousers, dark espresso brown knit mock-neck top, chocolate leather square-toe ankle boots, structured brown leather tote bag, and a thin brown belt with a matte brass buckle. Studio lighting, luxury catalog aesthetic.',
      },
      {
        id: 'night-out',
        occasion: 'Night Out & Cocktails',
        conceptName: 'Midnight Viper Glamour',
        stylistRationale: 'Transforms the blazer into evening wear by pairing it over a fluid black satin slip dress with lace trim. Bare legs or sheer stockings with pointed stiletto slingbacks make the boxy blazer feel sensual and effortlessly cool.',
        palette: [
          { hex: '#1D4ED8', name: 'Cobalt Shock', role: 'Hero Glow' },
          { hex: '#0A0A0A', name: 'Nocturnal Onyx', role: 'Sensual Canvas' },
          { hex: '#E2E8F0', name: 'Liquid Platinum', role: 'Metallic Edge' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Electric Cobalt Oversized Leather Blazer', color: 'Electric Cobalt', material: 'Glazed Lambskin', stylingTip: 'Worn draped casually over shoulders like a cape' },
          { role: 'Dress', name: 'Bias-Cut Silk Satin Midi Slip Dress', color: 'Jet Black', material: '100% Heavy Silk Satin', stylingTip: 'Subtle side slit reveals leg movement against heavy blazer' },
          { role: 'Footwear', name: 'Pointed Slingback Pumps with Crystal Buckle', color: 'Black Satin & Crystal', material: 'Silk Satin / Glass Crystals', stylingTip: 'Sharp 85mm stiletto adds feminine needlepoint' },
          { role: 'Handbag', name: 'Mini Metallic Box Clutch', color: 'Silver Chrome', material: 'Mirror Metal', stylingTip: 'Chilly chrome reflects the electric blue' },
          { role: 'Jewelry', name: 'Cascading Tennis Chandelier Earrings', color: 'White Gold / Crystal', material: 'Lab Diamonds / White Gold', stylingTip: 'Frame the face and catch cocktail lounge illumination' },
        ],
        flatlayPrompt: 'Overhead flat-lay composition on dark charcoal velvet: Vivid electric cobalt leather blazer, black silk satin slip dress, crystal-embellished pointed black slingback heels, silver chrome mini box clutch, and glittering chandelier drop earrings. High contrast dramatic editorial lighting, Vogue lookbook style.',
      },
    ],
  },
  {
    id: 'houndstooth-wide-pants',
    name: 'Emerald & Cream Houndstooth Wide Trousers',
    subtitle: 'Heritage geometric weave with exaggerated high-rise drape',
    category: 'Statement Trousers',
    badge: 'Micro-Pattern',
    imageUrl: SVG_HOUNDSTOOTH_PANTS,
    description: 'Striking high-waisted wide-leg trousers woven in an intricate forest emerald and cream micro-houndstooth. Challenging because geometric micro-patterns can make bottoms look overwhelming.',
    silhouette: 'High-rise fitted waist with fluid dramatic wide legs',
    fabricTexture: 'Medium-weight structured wool blend with tactile twill weave',
    patternType: 'Bicolor optical houndstooth check',
    stylingChallenges: [
      'Micro-pattern vibrates optically if paired with fine stripes or checks',
      'High waist and wide leg require fitted or cropped tops to avoid losing body shape',
      'Emerald green tone requires deliberate neutral pairings to prevent looking festive',
    ],
    goldenRule: 'Treat the pattern as a rich texture rather than a color. Pair with solid monochrome knitwear, fitted ribbed tops, and minimalist leather to let the tailored drape shine.',
    colorPalette: [
      { hex: '#064E3B', name: 'Deep Emerald', role: 'Pattern Dark' },
      { hex: '#F7FEE7', name: 'Warm Cream', role: 'Pattern Light' },
      { hex: '#78350F', name: 'Burnished Tan', role: 'Warm Companion' },
      { hex: '#1C1917', name: 'Charcoal Black', role: 'Grounded Contrast' },
    ],
    presetOutfits: [
      {
        id: 'casual',
        occasion: 'Casual Weekend',
        conceptName: 'Tate Modern Saturday',
        stylistRationale: 'Softens the structured trousers with a fitted black ribbed long-sleeve tee, clean white sneakers, and an oversized cream shearling-lined denim jacket for an art-gallery chic weekend vibe.',
        palette: [
          { hex: '#064E3B', name: 'Emerald Wool', role: 'Statement Trousers' },
          { hex: '#18181B', name: 'Matte Black', role: 'Form-Fitting Top' },
          { hex: '#FFFFFF', name: 'Clean White', role: 'Footwear Refresh' },
          { hex: '#94A3B8', name: 'Washed Denim', role: 'Casual Layer' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Emerald Houndstooth Wide Trousers', color: 'Emerald & Cream', material: 'Wool Blend', stylingTip: 'High waist holds the eye while wide legs billow gracefully' },
          { role: 'Top', name: 'Fitted Fine-Ribbed Crewneck Long Sleeve', color: 'Pitch Black', material: 'Modal Cotton Rib', stylingTip: 'Tucked cleanly to balance trouser volume' },
          { role: 'Outerwear', name: 'Boxy Sherpa-Collar Trucker Jacket', color: 'Light Washed Indigo', material: 'Denim & Faux Shearling', stylingTip: 'Cropped waist hits right at the trouser waistband' },
          { role: 'Footwear', name: 'Chunky Leather Retro Trainers', color: 'Cloud White', material: 'Calf Leather & Suede', stylingTip: 'Lifts trousers so hem skims 1cm off ground' },
          { role: 'Handbag & Cap', name: 'Canvas Crossbody Pouch & Wool Baseball Cap', color: 'Forest Green & Ecru', material: 'Cotton Twill', stylingTip: 'Adds effortless downtown streetwear flair' },
        ],
        flatlayPrompt: 'Editorial flat-lay top-down on natural beige linen: Emerald green houndstooth wide-leg pants paired with a fitted black ribbed top, light denim jacket with shearling collar, white retro leather trainers, green wool baseball cap, and small canvas sling bag. Soft daylight, neat styling.',
      },
      {
        id: 'business',
        occasion: 'Business & Office',
        conceptName: 'Savile Row Modernist',
        stylistRationale: 'Elevates the trousers into supreme executive tailoring with a fine cream silk blouse, tailored camel hair trench coat, and burnished oxblood leather loafers with brass horsebit hardware.',
        palette: [
          { hex: '#064E3B', name: 'Houndstooth Emerald', role: 'Heritage Pattern' },
          { hex: '#FDFBF7', name: 'Raw Silk Cream', role: 'Gentle Sheen' },
          { hex: '#B45309', name: 'Camel Hair', role: 'Timeless Luxury' },
          { hex: '#450A0A', name: 'Deep Oxblood', role: 'Rich Leather' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Emerald Houndstooth Wide Trousers', color: 'Emerald & Cream', material: 'Wool Blend', stylingTip: 'Pressed front creases accentuate the architectural drape' },
          { role: 'Top', name: 'Fluid Silk Georgette Tie-Neck Blouse', color: 'Warm Ecru', material: 'Silk Georgette', stylingTip: 'Neck tie left loosely draped like a scarf' },
          { role: 'Outerwear', name: 'Structured Double-Breasted Trench Coat', color: 'Classic Camel', material: 'Waterproof Gabardine', stylingTip: 'Draped open over shoulders' },
          { role: 'Footwear', name: 'Horsebit Leather Loafers', color: 'Deep Oxblood / Cordovan', material: 'Burnished Calfskin', stylingTip: 'Adds classic Savile Row heritage weight' },
          { role: 'Handbag', name: 'Flap Lock Satchel Bag', color: 'Saddle Tan', material: 'Smooth Bridle Leather', stylingTip: 'Carried in hand by top handle' },
        ],
        flatlayPrompt: 'Top-down lookbook photograph on white limestone: Emerald green houndstooth wide trousers, ecru silk tie-neck blouse, classic camel trench coat, oxblood leather horsebit loafers, and a saddle tan structured leather satchel. Impeccably pressed and arranged, high fashion photography.',
      },
      {
        id: 'night-out',
        occasion: 'Night Out & Cocktails',
        conceptName: 'Cocktail Club Tuxedo',
        stylistRationale: 'Infuses masculine smoking-jacket energy by teaming these trousers with a backless black velvet halter top, patent leather pointed pumps, and emerald drop earrings that echo the green weave.',
        palette: [
          { hex: '#064E3B', name: 'Emerald Green', role: 'Pattern Star' },
          { hex: '#09090B', name: 'Black Velvet', role: 'Tactile Contrast' },
          { hex: '#D4AF37', name: 'Vintage Gold', role: 'Jewelry Gleam' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Emerald Houndstooth Wide Trousers', color: 'Emerald & Cream', material: 'Wool Blend', stylingTip: 'Wide legs dance with movement under bar lighting' },
          { role: 'Top', name: 'Sculpted Backless Velvet Halter Top', color: 'Midnight Onyx', material: 'Silk Rayon Velvet', stylingTip: 'Skin reveal balances the conservative houndstooth weave' },
          { role: 'Footwear', name: 'Patent Leather Pointed-Toe Pumps', color: 'Mirror Gloss Black', material: 'Patent Calfskin', stylingTip: 'Shining patent finish adds nighttime glamour' },
          { role: 'Handbag', name: 'Tortoiseshell Acrylic Box Clutch', color: 'Amber & Emerald Flecks', material: 'Hand-poured Resin', stylingTip: 'Artisan accessory that echoes botanical greens' },
          { role: 'Jewelry', name: 'Emerald Solitaire Pendant & Drop Earrings', color: 'Gold & Deep Green', material: '18k Gold Vermeil / Emerald', stylingTip: 'Subtle sparkle in dimmed restaurant ambiance' },
        ],
        flatlayPrompt: 'Overhead editorial flat-lay on dark grey silk: Emerald houndstooth wide-leg trousers laid out with a backless black velvet halter top, glossy black patent pointed pumps, amber tortoiseshell box clutch, and emerald gold drop earrings. Seductive dim evening lighting, sharp product reflections.',
      },
    ],
  },
  {
    id: 'metallic-bronze-skirt',
    name: 'Liquid Bronze Metallic Pleated Accordion Skirt',
    subtitle: 'Luminescent accordion pleats with warm molten copper sheen',
    category: 'Pleated Skirt',
    badge: 'Metallic Sheen',
    imageUrl: SVG_METALLIC_SKIRT,
    description: 'A dazzling midi skirt constructed of micro-pleated foil lamé in molten bronze and copper. Often deemed "too festive" or "too holiday" for everyday rotation.',
    silhouette: 'High-waisted knife-pleated midi with fluid accordion flare',
    fabricTexture: 'Luminescent micro-pleated metallic lamé with light reflection',
    patternType: 'Solid metallic micro-pleat',
    stylingChallenges: [
      'Reflects light dramatically, drawing 100% of visual weight',
      'Can easily look like holiday-party wear rather than high fashion',
      'Delicate synthetic foil requires care with textured knits and snagging zippers',
    ],
    goldenRule: 'De-glamourize the skirt for day by juxtaposing the high-shine foil with ultra-matte, heavy textures like brushed alpaca wool, coarse linen, or broken-in vintage leather.',
    colorPalette: [
      { hex: '#92400E', name: 'Molten Bronze', role: 'Metallic Glow' },
      { hex: '#292524', name: 'Warm Charcoal', role: 'Matte Ground' },
      { hex: '#FEF3C7', name: 'Vanilla Cream', role: 'Soft Highlight' },
      { hex: '#451A03', name: 'Deep Espresso', role: 'Anchor Leather' },
    ],
    presetOutfits: [
      {
        id: 'casual',
        occasion: 'Casual Weekend',
        conceptName: 'Matte & Molten Weekend',
        stylistRationale: 'Tames the intense metallic shimmer by sandwiching it between an ultra-matte oversized charcoal heather hoodie and cream suede Chelsea boots. The casual athletic fleece strips away any holiday stiffness.',
        palette: [
          { hex: '#92400E', name: 'Molten Bronze', role: 'Metallic Hero' },
          { hex: '#44403C', name: 'Matte Charcoal', role: 'Casual Muting' },
          { hex: '#F5F5F0', name: 'Raw Cream', role: 'Suede Balance' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Liquid Bronze Pleated Accordion Skirt', color: 'Molten Bronze', material: 'Pleated Metallic Lamé', stylingTip: 'Accordion pleats swing effortlessly with walking stride' },
          { role: 'Top', name: 'Oversized Washed Fleece Hoodie', color: 'Faded Charcoal Stone', material: 'Heavyweight French Terry', stylingTip: 'Loosely bunched over hips without tucking' },
          { role: 'Footwear', name: 'Lug-Sole Suede Chelsea Boots', color: 'Warm Sand / Cream', material: 'Waterproof Suede', stylingTip: 'Chunky lug soles anchor the delicate pleats' },
          { role: 'Handbag', name: 'Nylon Crescent Sling Bag', color: 'Matte Black', material: 'Recycled Ripstop Nylon', stylingTip: 'Worn across chest for hands-free mobility' },
          { role: 'Jewelry', name: 'Minimalist Matte Silver Ear Cuffs', color: 'Matte Silver', material: 'Sterling Silver', stylingTip: 'Subtle mixed metals give modern casual attitude' },
        ],
        flatlayPrompt: 'Top-down editorial flat-lay on off-white textured plaster: Molten bronze metallic pleated midi skirt, washed charcoal oversized cotton hoodie, cream suede Chelsea boots with black lug soles, matte black nylon crescent bag, and silver ear cuffs. Casual high-fashion styling, soft daylight.',
      },
      {
        id: 'business',
        occasion: 'Business & Office',
        conceptName: 'Architectural Cashmere Polish',
        stylistRationale: 'Turns the skirt into high-concept gallery chic with a sharply structured cream double-faced wool blazer, a fine black merino turtleneck, and tall espresso leather boots disappearing under the hem.',
        palette: [
          { hex: '#92400E', name: 'Bronze Metallic', role: 'Luxe Texture' },
          { hex: '#FDFBF7', name: 'Double-Faced Cream', role: 'Tailored Balance' },
          { hex: '#1C1917', name: 'Espresso Leather', role: 'Structured Frame' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Liquid Bronze Pleated Accordion Skirt', color: 'Molten Bronze', material: 'Pleated Metallic Lamé', stylingTip: 'Creates a striking metallic panel between coat and boots' },
          { role: 'Top', name: 'Extra-Fine Merino Wool Turtleneck', color: 'Onyx Black', material: '100% Merino Wool', stylingTip: 'Snug fit highlights neckline and shoulders' },
          { role: 'Outerwear', name: 'Collarless Wrap Blazer in Double Wool', color: 'Warm Ivory', material: 'Double-Faced Wool', stylingTip: 'Belted at waist to create an hourglass peplum effect over pleats' },
          { role: 'Footwear', name: 'Knee-High Stiff Leather Riding Boots', color: 'Dark Espresso', material: 'Box Calfskin', stylingTip: 'Tops of boots hide beneath the skirt for unbroken lines' },
          { role: 'Handbag', name: 'Structured Trapezoid Leather Bag', color: 'Cognac Saddle Leather', material: 'Italian Calfskin', stylingTip: 'Polished gold hardware harmonizes with bronze' },
        ],
        flatlayPrompt: 'Overhead fashion layout on neutral limestone: Bronze pleated metallic skirt, ivory collarless belted wool blazer, fine black turtleneck sweater, knee-high dark espresso leather boots, and a cognac structured leather handbag. Crisp architectural arrangement, studio softbox lighting.',
      },
      {
        id: 'night-out',
        occasion: 'Night Out & Cocktails',
        conceptName: 'Studio 54 Liquid Metal',
        stylistRationale: 'Embraces pure disco-era glamour by leaning into liquid textures. An open-back chocolate silk halter neck and strappy metallic bronze heels make this look magnetic under evening spotlight.',
        palette: [
          { hex: '#92400E', name: 'Bronze Gold', role: 'Liquid Shimmer' },
          { hex: '#3E2723', name: 'Rich Chocolate', role: 'Silky Warmth' },
          { hex: '#C5A880', name: 'Champagne Metal', role: 'Golden Reflective' },
        ],
        pieces: [
          { role: 'Anchor Piece', name: 'Liquid Bronze Pleated Accordion Skirt', color: 'Molten Bronze', material: 'Pleated Metallic Lamé', stylingTip: 'Glitters and cascades with every step' },
          { role: 'Top', name: 'Draped Cowl-Neck Silk Halter Top', color: 'Chocolate Brown', material: 'Silk Charmeuse', stylingTip: 'Tucked cleanly into skirt with low open back' },
          { role: 'Footwear', name: 'Ankle-Wrap Stiletto Sandals', color: 'Metallic Bronze', material: 'Mirrored Lambskin', stylingTip: 'Thin straps cross around ankle bones' },
          { role: 'Handbag', name: 'Slouchy Metallic Mesh Pouch Clutch', color: 'Champagne Gold', material: 'Metal Mesh Fabric', stylingTip: 'Liquid texture echoes the skirt pleats' },
          { role: 'Jewelry', name: 'Sculptural Molten Bangle & Statement Ring', color: 'Hand-carved Bronze', material: 'Heavy Bronze Alloy', stylingTip: 'Bold organic arm candy' },
        ],
        flatlayPrompt: 'Top-down luxury editorial flat-lay on black marble: Shimmering bronze metallic pleated skirt, chocolate brown draped silk cowl-neck halter top, metallic bronze strappy stiletto heels, champagne gold mesh pouch clutch, and sculptural molten bronze cuffs. Dramatic moody party illumination, glossy reflections.',
      },
    ],
  },
];
