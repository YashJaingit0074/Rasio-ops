
import { GoogleGenerativeAI } from "@google/generative-ai";
import { InventoryItem, Recipe } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

/**
 * RasoiOps AI Service Layer
 * Enhanced with professional error handling for Free Tier constraints.
 */
export class RasoiOpsAIService {
  private ai: GoogleGenerativeAI;

  constructor() {
    this.ai = new GoogleGenerativeAI(API_KEY);
  }

  /**
   * Helper for exponential backoff to handle Free Tier Rate Limits (429)
   */
  private async fetchWithRetry(fn: () => Promise<any>, retries = 3, delay = 2000): Promise<any> {
    try {
      return await fn();
    } catch (error: any) {
      if (error.message?.includes("429") && retries > 0) {
        console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        return this.fetchWithRetry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  async analyzeInventoryImage(base64Image: string): Promise<Partial<InventoryItem>[]> {
    return this.fetchWithRetry(async () => {
      const model = this.ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image
          }
        },
        `You are an expert food inventory analyzer. Your task is to identify ALL food items visible in this image.

CRITICAL INSTRUCTIONS:
1. Identify EVERY food item you can see (fruits, vegetables, grains, proteins, dairy, beverages, etc.)
2. Be specific - if you see bananas, list them as "bananas" not just "fruit"
3. Estimate quantities (count items or estimate weight/volume)
4. Categorize each item into one of: Fruits, Vegetables, Dairy, Grains, Protein, Beverages, Spices, Other
5. Look carefully at the entire image for items that might be partially hidden or in the background

Return ONLY a valid JSON array with this exact structure, no additional text:
[
  {
    "name": "item name (specific)",
    "quantity": "estimated quantity with unit (e.g., '3 pieces', '500g', '2 lbs')",
    "category": "category name"
  }
]

Examples:
- If you see bananas: {"name": "Bananas", "quantity": "3 pieces", "category": "Fruits"}
- If you see rice: {"name": "Rice", "quantity": "2 kg", "category": "Grains"}
- If you see eggs: {"name": "Eggs", "quantity": "12 pieces", "category": "Protein"}

Make sure to identify at least all clearly visible items.`
      ]);
      const response = await result.response;
      const text = response.text();
      console.log("Raw response:", text);
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to parse JSON:", jsonMatch[0]);
          return [];
        }
      }
      return [];
    });
  }

  async getRAGRecommendations(inventory: InventoryItem[], dietaryGoal: string): Promise<Recipe[]> {
    const inventoryContext = inventory
      .filter(i => i.status !== "Expired")
      .map(i => `${i.name} (${i.quantity})`)
      .join(", ");

    return this.fetchWithRetry(async () => {
      const model = this.ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Inventory: [${inventoryContext}]. Dietary Goal: ${dietaryGoal}. 
      Recommend 3 recipes using these ingredients to minimize waste. 
      Return a JSON array with objects having these fields:
      - title (string): recipe name
      - ingredientsUsed (array of strings): ingredients from inventory
      - missingIngredients (array of strings): additional ingredients needed
      - instructions (array of strings): cooking steps
      - sustainabilityScore (number): score from 0-100
      
      Return ONLY the JSON array, no additional text.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[.*\]/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    });
  }
}

export const aiService = new RasoiOpsAIService();
