import 'dotenv/config';
import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// High payload limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize GoogleGenAI client on server
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', hasApiKey: Boolean(apiKey) });
});

// Multimodal Garment Analysis + 3 Outfit Generation
app.post('/api/analyze-garment', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', garmentHint } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: 'Missing imageBase64 in request body' });
      return;
    }

    // Strip data URL header if present
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const systemInstruction = `You are a world-class luxury editorial personal stylist at a high-fashion atelier (like Net-a-Porter, The Row, and Harper's Bazaar).
The user is providing an image of a single "orphan" or tricky wardrobe piece that they struggle to style (e.g., patterned skirt, bold blazer, metallic pants).

Your goal:
1. Conduct deep chromatic and structural DNA analysis of the garment:
   - Identify exact garment name and category.
   - Describe silhouette, drape, fabric texture, and pattern complexity.
   - Extract exact hex color codes for dominant ground color, secondary pattern colors, and vivid accent accents.
   - Explain why this piece can be tricky to style and the "Golden Rule" to make it look effortlessly chic.
2. Build THREE complete, distinct, realistic flat-lay outfit ensembles featuring this EXACT item as the anchor:
   - Casual (Elevated everyday, weekend coffee, relaxed yet intentional)
   - Business (Sharp professional, creative office, tailored, commanding)
   - Night Out (Cocktail party, dinner date, sleek, glamorous)
3. For each outfit:
   - Provide a distinctive concept name (e.g. "Parisian Off-Duty", "Architectural Minimalist", "Velvet & Champagne")
   - Stylist rationale: 2-3 sentences explaining silhouette balancing, color anchoring, and texture mixing.
   - Chromatic harmony palette: 3-5 hex colors for the full ensemble.
   - Complete piece-by-piece fashion checklist: The anchor piece, tops/bottoms/outerwear layers, footwear, bag, jewelry, and accent pieces.
   - Precise flatlayPrompt: An exhaustive prompt for generating a top-down editorial flat-lay photo on a clean cream/limestone linen surface with natural diffused soft daylight.`;

    const promptText = `Analyze this garment image${garmentHint ? ` (User note: ${garmentHint})` : ''} and generate the complete 3-capsule styling guide (Casual, Business, Night Out).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemAnalysis: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                silhouette: { type: Type.STRING },
                fabricTexture: { type: Type.STRING },
                vibe: { type: Type.STRING },
                patternType: { type: Type.STRING },
                stylingChallenges: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                goldenRule: { type: Type.STRING },
                colorPalette: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      hex: { type: Type.STRING },
                      name: { type: Type.STRING },
                      role: { type: Type.STRING },
                    },
                    required: ['hex', 'name', 'role'],
                  },
                },
              },
              required: [
                'name',
                'category',
                'silhouette',
                'fabricTexture',
                'vibe',
                'patternType',
                'stylingChallenges',
                'goldenRule',
                'colorPalette',
              ],
            },
            outfits: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING }, // 'casual' | 'business' | 'night-out'
                  occasion: { type: Type.STRING },
                  conceptName: { type: Type.STRING },
                  stylistRationale: { type: Type.STRING },
                  palette: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        hex: { type: Type.STRING },
                        name: { type: Type.STRING },
                        role: { type: Type.STRING },
                      },
                      required: ['hex', 'name', 'role'],
                    },
                  },
                  pieces: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        role: { type: Type.STRING },
                        name: { type: Type.STRING },
                        color: { type: Type.STRING },
                        material: { type: Type.STRING },
                        stylingTip: { type: Type.STRING },
                      },
                      required: ['role', 'name', 'color', 'material', 'stylingTip'],
                    },
                  },
                  flatlayPrompt: { type: Type.STRING },
                },
                required: [
                  'id',
                  'occasion',
                  'conceptName',
                  'stylistRationale',
                  'palette',
                  'pieces',
                  'flatlayPrompt',
                ],
              },
            },
          },
          required: ['itemAnalysis', 'outfits'],
        },
      },
    });

    const text = response.text?.trim() || '{}';
    const parsedData = JSON.parse(text);
    res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/analyze-garment:', error);
    res.status(500).json({
      error: error.message || 'Failed to analyze garment',
      details: error.toString(),
    });
  }
});

// Generate flat-lay image using gemini-nano-banana-2.1 or gemini-3.1-flash-lite-image
app.post('/api/generate-flatlay', async (req: Request, res: Response) => {
  try {
    const { prompt, occasion, garmentBase64, garmentMime = 'image/jpeg' } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Missing prompt in request body' });
      return;
    }

    const enhancedPrompt = `High fashion editorial flat-lay photograph, top-down bird's-eye view. ${prompt}. All wardrobe items and accessories arranged neatly with artistic breathing room on an off-white textured limestone linen background, soft diffused natural daylight, hyper-detailed fabric textures, no human models, clean composition, luxury magazine lookbook quality.`;

    const parts: any[] = [];
    if (garmentBase64) {
      const cleanGarment = garmentBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
      parts.push({
        inlineData: {
          data: cleanGarment,
          mimeType: garmentMime,
        },
      });
      parts.push({
        text: `Incorporate the exact garment shown in the reference image into this complete outfit flat-lay: ${enhancedPrompt}`,
      });
    } else {
      parts.push({
        text: enhancedPrompt,
      });
    }

    let imageResultUrl: string | null = null;

    // Try primary model gemini-nano-banana-2.1
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: {
          parts,
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
            imageSize: '1K',
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          imageResultUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (nanoError: any) {
      console.warn('gemini-nano-banana-2.1 generation failed, falling back to gemini-3.1-flash-lite-image:', nanoError.message);
      
      // Fallback to gemini-3.1-flash-lite-image
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts,
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      for (const part of fallbackResponse.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          imageResultUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageResultUrl) {
      res.status(500).json({ error: 'No image data returned from image generation model' });
      return;
    }

    res.json({ imageUrl: imageResultUrl, occasion });
  } catch (error: any) {
    console.error('Error in /api/generate-flatlay:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate flat-lay image',
    });
  }
});

// Edit flat-lay image with user prompt using gemini-nano-banana-2.1
app.post('/api/edit-flatlay', async (req: Request, res: Response) => {
  try {
    const { originalImageBase64, editPrompt, occasion } = req.body;

    if (!originalImageBase64 || !editPrompt) {
      res.status(400).json({ error: 'Missing originalImageBase64 or editPrompt in request body' });
      return;
    }

    const cleanBase64 = originalImageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const parts: any[] = [
      {
        inlineData: {
          data: cleanBase64,
          mimeType: 'image/png',
        },
      },
      {
        text: `Edit this top-down flat-lay fashion photograph according to this request: "${editPrompt}". Keep the overall clean top-down flat-lay aesthetic on neutral linen background with soft natural lighting.`,
      },
    ];

    let editedImageUrl: string | null = null;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: {
          parts,
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
            imageSize: '1K',
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          editedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (nanoError: any) {
      console.warn('gemini-nano-banana-2.1 edit failed, falling back to gemini-3.1-flash-lite-image:', nanoError.message);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts,
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      for (const part of fallbackResponse.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          editedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!editedImageUrl) {
      res.status(500).json({ error: 'No image was returned from the edit model.' });
      return;
    }

    res.json({ imageUrl: editedImageUrl, occasion });
  } catch (error: any) {
    console.error('Error in /api/edit-flatlay:', error);
    res.status(500).json({
      error: error.message || 'Failed to edit flat-lay image',
    });
  }
});

// Vite middleware in dev or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Stylist Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
