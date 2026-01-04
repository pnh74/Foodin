import { GoogleGenAI } from "@google/genai";
import { MOCK_RESTAURANTS } from "../constants";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'demo_key' });

export const generateRestaurantRecommendations = async (query: string) => {
  // In a real app, this would perform RAG. Here we simulate it by providing context.
  // We check if API key is real, otherwise we simulate a response for the UI demo.
  
  if (!process.env.API_KEY) {
     // Simulation for UI demonstration without valid key
     return new Promise<{text: string}>((resolve) => {
        setTimeout(() => {
           resolve({
              text: `Based on your request for "${query}", here are my top picks! \n\nI recommend **${MOCK_RESTAURANTS[0].name}** because it perfectly matches the vibe you're looking for.`
           });
        }, 1500);
     });
  }

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
    return { text: "Sorry, I'm having trouble connecting to the food universe right now! 🍜" };
  }
};
