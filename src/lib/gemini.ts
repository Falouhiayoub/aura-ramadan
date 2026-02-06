import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Get Gemini Flash model for chat
 */
export function getChatModel() {
    return genAI.getGenerativeModel({
        model: "gemini-flash-latest",
        generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 2048,
        }
    });
}

/**
 * Get embedding model
 */
export function getEmbeddingModel() {
    return genAI.getGenerativeModel({
        model: "gemini-embedding-001"
    });
}

/**
 * Generate embeddings for text
 */
export async function generateEmbedding(text) {
    try {
        const model = getEmbeddingModel();
        // Use type casting because outputDimensionality is supported by the API 
        // but might not be present in the version of the SDK's TypeScript definitions.
        const result = await model.embedContent({
            content: { role: "user", parts: [{ text }] },
            outputDimensionality: 768,
        } as any);
        return result.embedding.values;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw new Error(`Failed to generate embedding: ${error.message || 'Unknown error'}`);
    }
}

/**
 * Generate streaming chat response
 */
export async function generateStreamingResponse(prompt, context = "") {
    try {
        console.log(`[Gemini] Generating streaming response...`);
        if (context) {
            console.log(`[Gemini] Context provided (${context.length} chars)`);
        }

        const model = getChatModel();

        const fullPrompt = context
            ? `Contexte (informations sur les familles et dons de Ramadan):\n${context}\n\nQuestion: ${prompt}\n\nRéponds en français de manière claire et utile pour l'association caritative.`
            : prompt;

        const result = await model.generateContentStream(fullPrompt);
        return result.stream;
    } catch (error) {
        console.error("[Gemini] Error generating streaming response:", error);
        // Provide more detail in the error if possible
        throw new Error(`Failed to generate response: ${error.message || 'Unknown error'}`);
    }
}

/**
 * Generate non-streaming response
 */
export async function generateResponse(prompt, context = "") {
    try {
        console.log(`[Gemini] Generating non-streaming response...`);
        const model = getChatModel();

        const fullPrompt = context
            ? `Contexte (informations sur les familles et dons de Ramadan):\n${context}\n\nQuestion: ${prompt}\n\nRéponds en français de manière claire et utile pour l'association caritative.`
            : prompt;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("[Gemini] Error generating response:", error);
        throw new Error(`Failed to generate response: ${error.message || 'Unknown error'}`);
    }
}
