
import { GoogleGenAI, Type } from "@google/genai";
import { InventoryItem, Recipe } from "../types";

const API_KEY = process.env.API_KEY || "";

/**
 * RasoiOps AI Service Layer
 * Enhanced with professional error handling for Free Tier constraints.
 */
export class RasoiOpsAIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
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
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Image } },
            { text: "Extract food items, quantities, and categories. Return JSON array." }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                quantity: { type: Type.STRING },
                category: { type: Type.STRING }
              },
              required: ["name", "quantity", "category"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    });
  }

  async getRAGRecommendations(inventory: InventoryItem[], dietaryGoal: string): Promise<Recipe[]> {
    const inventoryContext = inventory
      .filter(i => i.status !== "Expired")
      .map(i => `${i.name} (${i.quantity})`)
      .join(", ");

    return this.fetchWithRetry(async () => {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Inventory: [${inventoryContext}]. Dietary Goal: ${dietaryGoal}. 
        Recommend 3 recipes using these ingredients to minimize waste. 
        Return JSON array with keys: title, ingredientsUsed, missingIngredients, instructions, sustainabilityScore.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                ingredientsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                sustainabilityScore: { type: Type.NUMBER }
              },
              required: ["title", "ingredientsUsed", "missingIngredients", "instructions", "sustainabilityScore"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    });
  }
}

export const aiService = new RasoiOpsAIService();
