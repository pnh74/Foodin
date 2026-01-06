import { GoogleGenAI } from "@google/genai";
import { MOCK_RESTAURANTS } from "../constants";

// Initialize Gemini Client strictly using process.env.API_KEY
// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRestaurantRecommendations = async (query: string) => {
  const context = JSON.stringify(MOCK_RESTAURANTS.map(r => ({
      name: r.name,
      description: r.description,
      triKeyword: r.triKeyword,
      price: r.priceRange,
      trustScore: r.trustScore
  })));

  const prompt = `
    You are Foodin, a Vietnamese culinary assistant for Gen Z.
    User Query: "${query}"
    
    Available Restaurants Context:
    ${context}
    
    Task: Recommend 1-2 restaurants from the context that best fit the query. 
    Style: Friendly, enthusiastic, use emojis. Mention the "Tri-Keyword".
    Keep it under 100 words.
  `;

  try {
    // Fix: Use ai.models.generateContent directly with model name and prompt
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a compatible response object for the frontend
    return { text: "Sorry, I'm having trouble connecting to the food universe right now! 🍜" };
  }
};