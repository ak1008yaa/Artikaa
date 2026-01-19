import { GoogleGenerativeAI } from "@google/generative-ai";
import { Language } from "../types";

// Helper to ensure API key exists
const getClient = () => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenerativeAI({ apiKey });
};

export const chatWithAdvisor = async (
  message: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Please configure your API key to use the Curator assistant.";
  }
  
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    You are the "Artikaa Curator," but more than a salesperson, you are a philosopher of Intentional Living.
    
    Your Role:
    - Guide the user not just to buy, but to connect emotionally with Armenian heritage.
    - Speak with a calm, sophisticated, and poetic tone. Use words like "legacy," "craft," "soul," "time," and "acquisition."
    - Avoid aggressive sales tactics. Focus on the story of the object.
    
    Context:
    - We sell handcrafted items (tables, rings, coats) that are 1-of-1.
    - Base prices are in AMD (Drams), but we accept USD and Crypto.
    - Exchange Rate: 1 USD is approximately 400 AMD.
    - Focus on the cultural significance of Armenian craftsmanship (walnut wood, obsidian, gold).
    
    User Question: "${message}"

    Inventory Context:
    - 15 Heritage Tables (Walnut, Oak, Obsidian Inlay).
    - Gold Jewelry from Davtian.
    
    Answer the user in under 60 words. Be helpful but deep.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text() || "I am reflecting on the nature of your request. Please ask again.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Our concierge is currently attending to a private viewing. Please try again shortly.";
  }
};

export const generateProductContent = async (
  title: string,
  category: string,
  visualCues: string
): Promise<{ description: string; seoKeywords: string[] }> => {
  const client = getClient();
  if (!client) {
    return {
      description: "An exquisite physical masterpiece handcrafted by Armenian artisans, carrying the weight of tradition.",
      seoKeywords: ["luxury art", "handmade", "armenia", "heirloom"]
    };
  }
  
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Product: "${title}"
    Category: "${category}"
    Details: "${visualCues}"
    
    Task: Write a poetic and sophisticated description for a luxury object on Artikaa. Focus on the sensory experience and the emotional weight of the object.
    
    Output ONLY valid JSON (no markdown, no extra text):
    {
      "description": "2-3 sentences describing the soul of the item, not just its specs.",
      "seoKeywords": ["5-7 heritage-focused keywords"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    if (!text) throw new Error("No response from AI");
    
    // Parse JSON, handling potential markdown code blocks
    const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Product generation error:", error);
    return {
      description: "An exquisite physical masterpiece handcrafted by Armenian artisans, carrying the weight of tradition.",
      seoKeywords: ["luxury art", "handmade", "armenia", "heirloom"]
    };
  }
};

export const translateContent = async (
  text: string,
  targetLangs: Language[]
): Promise<Record<string, string>> => {
  const client = getClient();
  if (!client) {
    return {};
  }
  
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  const langsToTranslate = targetLangs.filter(l => l !== 'EN');
  
  if (langsToTranslate.length === 0) return {};

  const prompt = `
    Translate this poetic product description into ${langsToTranslate.join(', ')}. Maintain the sophisticated, emotional tone.
    Source Text: "${text}"
    
    Output ONLY valid JSON (no markdown):
    { "HY": "...", "RU": "...", "FA": "..." }
  `;

  try {
    const result = await model.generateContent(prompt);
    const resText = result.response.text();
    
    // Parse JSON, handling potential markdown code blocks
    const jsonStr = resText.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Translation error:", error);
    return {};
  }
};

export const generateSeoAudit = async (
  titles: string[]
): Promise<string[]> => {
  const client = getClient();
  if (!client) {
    return ["Focus on 'Heirloom' keywords.", "Highlight artisan names in titles."];
  }
  
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Analyze these product titles: ${titles.join(', ')}.
    Provide 4 specific SEO improvement suggestions for a luxury heritage site focusing on "Intentional Living".
    
    Output ONLY a valid JSON array of strings (no markdown):
    ["suggestion1", "suggestion2", "suggestion3", "suggestion4"]
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Parse JSON, handling potential markdown code blocks
    const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("SEO audit error:", error);
    return ["Focus on 'Heirloom' keywords.", "Highlight artisan names in titles."];
  }
};