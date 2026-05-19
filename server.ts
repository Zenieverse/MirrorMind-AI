import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Proxy for Gemini and AI Analysis
  app.post("/api/analyze-look", async (req, res) => {
    const { image, mood } = req.body;
    
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `
        Analyze this user profile for the "${mood}" aesthetic.
        User wants a total identity transformation.
        Provide:
        1. Skin analysis summary.
        2. Beauty points to enhance.
        3. A "Future You" projection.
        4. Color palette recommendation hex codes.
        
        Return JSON format.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      
      const text = response.text || "{}";
      const cleanedJson = text.replace(/```json|```/g, "").trim();
      res.json(JSON.parse(cleanedJson));
    } catch (error) {
      console.error(error);
      // Fallback data for demo mode
      res.json({
        summary: "Balanced undertones with slight dehydration in the T-zone.",
        beautyPoints: ["Defined jawline", "Expressive eyes", "Radiant complexion potential"],
        futureYou: "A polished, luminous version of yourself with high-contrast features.",
        palette: ["#1a1a1a", "#7c3aed", "#ec4899"]
      });
    }
  });

  // Perfect Corp API Mock/Proxy (Would require actual API keys in .env)
  app.post("/api/perfect-corp/skin-analysis", async (req, res) => {
    // This is where you would call the REAL Perfect Corp API
    // https://console.perfectcorp.com/
    
    // For demo/hackathon purposes, we provide realistic data
    setTimeout(() => {
      res.json({
        age: 26,
        scores: {
          spots: 85,
          wrinkles: 92,
          texture: 78,
          dark_circles: 65,
          redness: 88,
          oiliness: 72,
          moisture: 60
        },
        heatmap_url: null, // Would be provided by API
        overall_score: 82
      });
    }, 1500);
  });

  // AI Fashion Image Generation Prompt Helper
  app.post("/api/generate-fashion-prompt", async (req, res) => {
    const { mood, features } = req.body;
    
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Generate a high-end fashion editorial prompt for an AI image generator. 
      Subject: A person with ${features}. 
      Style: ${mood}. 
      Vibe: Cinematic, luxury, photorealistic, 8k, futuristic.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      res.json({ prompt: response.text || "Cinematic luxury portrait, high fashion, professional lighting." });
    } catch (e) {
      res.json({ prompt: "Cinematic luxury portrait, high fashion, professional lighting." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
