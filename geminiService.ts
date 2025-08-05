import { GoogleGenAI } from "@google/genai";
import type { FormData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (data: FormData): string => {
  return `
You are an emotionally intelligent AI Relationship Fixer. Your job is to help users repair their personal or professional relationships by generating a heartfelt message.

**Your Instructions:**
1.  Adopt a kind, warm, and emotionally expressive tone.
2.  Generate a heartfelt message tailored to the user’s specific situation provided below.
3.  The output MUST be simple HTML using only <p> tags for paragraphs. Do not include <html>, <body>, or <style> tags. The entire response should be just the message content within <p> tags. Each paragraph should be a new <p> tag.
4.  Do not add any extra commentary, titles, or explanations outside of the requested message.
5.  **Crucially, the entire response must be in the language specified by the user.**

**User's Situation:**
-   **Relationship with the person:** ${data.relationship}
-   **Their current mood:** ${data.mood}
-   **What I did wrong / The situation:** ${data.mistake}
-   **Type of message I want to send:** ${data.topic}
-   **Include Emojis:** ${data.useEmojis ? "Yes" : "No"}
-   **Language for Response:** ${data.language}

**Specific Content Rules:**
-   The entire message must be written in **${data.language}**.
-   If the message type is "Call Scheduler", you MUST include a gentle suggestion to talk, like "Can we talk tonight?" or "Let’s reconnect over a call soon." (translate this suggestion into the target language).
-   If emojis are requested ("Yes"), add appropriate emojis to match the tone (e.g., 😢, ❤️, 💔, 🤝, 🥺, 💐).
-   If the relationship is professional (e.g., Boss, Client, Colleague), the tone must be respectful and sincere, avoiding romantic or overly casual language.
-   If the mood is "silent" or "ignoring", the message should be calm, patient, and respectful. It should acknowledge their need for space while gently expressing a desire to resolve the issue.

Please generate the personalized message now based on these details, ensuring it is written in ${data.language}.
  `;
};

export const generateRelationshipMessageStream = async (data: FormData): Promise<AsyncGenerator<string>> => {
    const prompt = generatePrompt(data);
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    async function* stream() {
        for await (const chunk of response) {
            yield chunk.text;
        }
    }

    return stream();
};