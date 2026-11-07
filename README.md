# Atelier Noir: Virtual Stylist & Outfit Generator

An AI-powered luxury editorial wardrobe stylist that solves the *"I don't know what to wear with this"* dilemma. Upload a photo of a single difficult-to-match statement garment (such as an intricate patterned skirt, bold leather blazer, or micro-houndstooth trousers), and Atelier Noir will analyze its chromatic DNA and silhouette, then generate 3 complete, balanced outfit options (**Casual Weekend**, **Business & Office**, and **Night Out & Cocktails**) visualized as clean, magazine-quality flat-lay layouts.

---

## 💖 Atelier Noir: Virtual Stylist & Outfit Generator

Atelier Noir: Virtual Stylist & Outfit Generator is an open-source project built with passion and dedication. Want to support the continued development of this project? You can!

**Sponsor this project by making a donation via PayPal:**

<div align="center">

### ☕ [Donate via PayPal](https://paypal.me/luciferamorgenster)

📧 **PayPal:** `luciferamorgenster@gmail.com`

</div>

Every donation, big or small, helps keep Ivory Tower BBS alive, fund new features, and support ongoing development. Thank you for your generosity! 🙏

---

## Key Features

- **Multimodal Garment DNA Analysis**:
  - Automatically identifies garment category, silhouette, fabric drape, and pattern complexity using `gemini-3.8-flash`.
  - Extracts the exact color spectrum with hex codes, color theory roles (*Dominant Ground*, *Secondary Motif*, *Vibrant Accent*), and click-to-copy utility.
  - Pinpoints specific styling challenges and provides an editorial *"Stylist's Golden Rule"*.

- **Three Complete Occasion Capsules**:
  - **Casual Weekend**: Effortless everyday elevation (e.g., slouchy cashmere knits, retro leather trainers, soft shoulder totes).
  - **Business & Office**: Architectural tailoring and polished authority (e.g., double-breasted blazers, poplin shirts, kitten heels).
  - **Night Out & Cocktails**: Sleek, sensual evening drama (e.g., backless bodysuits, stiletto slingbacks, molten gold jewelry).

- **Clean Flat-Lay Visualizations**:
  - Top-down editorial flat-lay compositions showcasing the coordinated garments, footwear, and accessories.
  - Render photorealistic flat-lay photographs with soft natural studio daylight.

- **Interactive Prompt Studio (`gemini-nano-banana-2.1`)**:
  - Restyle or edit any flat-lay using natural language text prompts (e.g., *"Swap footwear for cream loafers"*, *"Add gold sculptural earrings"*).
  - Quick-start prompt chips for instant experimentation.

- **Sample Archive Gallery**:
  - Includes 4 pre-loaded famously tricky specimens ready for immediate 1-click styling:
    1. *Vintage Saffron & Paisley Silk Midi Skirt* (High-contrast floral print on fluid silk)
    2. *Electric Cobalt Oversized Leather Blazer* (High-saturation bold tailoring)
    3. *Emerald & Cream Houndstooth Wide Trousers* (Optical geometric micro-weave)
    4. *Liquid Bronze Metallic Pleated Accordion Skirt* (Luminescent metallic foil lamé)

- **Itemized Fashion Checklist**:
  - Categorized breakdown by piece role, fabric, color, and specific *"How to Wear It"* stylist tips.
  - 1-click copy for shopping, packing, or wardrobe planning.

---

## Tech Stack

- **Frontend**:
  - React 19
  - Tailwind CSS v4 (`@tailwindcss/vite`)
  - Motion / Framer Motion
  - Lucide React (Icons)
  - Typography: *Cormorant Garamond* (Editorial Serif) & *Plus Jakarta Sans* (Body)
- **Backend**:
  - Node.js & Express
  - `@google/genai` TypeScript SDK
  - Vite dev server middleware
- **AI Models**:
  - `gemini-3.8-flash`: Multimodal garment vision analysis, color extraction, and structured outfit formulation.
  - `gemini-nano-banana-2.1`: High-resolution flat-lay fashion image generation and prompt-based edits (with automatic fallback to `gemini-3.1-flash-lite-image`).

---

## Architecture & Server Endpoints

```
Client (React 19)
  │
  ├── POST /api/analyze-garment ──► gemini-3.8-flash (Extracts DNA & 3 outfits in JSON)
  ├── POST /api/generate-flatlay ──► gemini-nano-banana-2.1 (Renders flat-lay photo)
  └── POST /api/edit-flatlay ────► gemini-nano-banana-2.1 (Edits flat-lay with text prompt)
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (Node 22 recommended)
- A Gemini API Key (configured automatically in Google AI Studio or set via `.env`)

### Installation

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables in `.env` (refer to `.env.example`):
   ```bash
   GEMINI_API_KEY="your-gemini-api-key"
   ```

### Running Locally

Start the fullstack development server (Express with Vite middleware):
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Build the client assets:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

---

## Usage Guide

1. **Select or Upload a Garment**:
   - Choose one of the 4 specimens from the **Tricky Sample Pieces** gallery, or
   - Click **Browse Device** or **Take Photo** to upload your own challenging wardrobe piece.
2. **Review Garment DNA**:
   - Inspect the extracted color spectrum, silhouette analysis, and the stylist's golden rule.
3. **Explore the 3 Occasions**:
   - Switch between **Casual Weekend**, **Business & Office**, and **Night Out & Cocktails**.
   - Read the stylist's proportion and color balancing rationale.
   - Review the complete itemized piece checklist.
4. **Visualize & Edit Flat-Lays**:
   - View the composition on the flat-lay canvas.
   - Click **Render Photorealistic Flat-Lay** to generate an AI studio photograph.
   - Use the **Prompt Studio** to modify specific pieces or aesthetics using natural language.
   - Click the image or the expand icon to view full resolution or download.

---

<div align="center">

### 💖 Support Atelier Noir: Virtual Stylist & Outfit Generator

This project is open-source and built with love.\
Help keep the project alive and fund its continued development!

**[☕ Donate via PayPal — luciferamorgenster@gmail.com](https://paypal.me/luciferamorgenster)**

Thank you for your support! 🙏

</div>
