"use server";

import { generateEmbedding, generateStreamingResponse } from "@/lib/gemini";
import { querySimilarVectors } from "@/lib/pinecone";

/**
 * Process chat message with RAG
 */
export async function processChatMessage(message) {
    try {
        if (!message || message.trim().length === 0) {
            return {
                success: false,
                error: "Le message ne peut pas être vide",
            };
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(message);

        // Search for similar vectors in Pinecone
        const similarVectors = await querySimilarVectors(queryEmbedding, 5);
        console.log(`[ChatAction] Found ${similarVectors.length} matching vectors in Pinecone`);

        // Extract context from similar vectors
        const context = similarVectors
            .map((match) => {
                const metadata = match.metadata;
                console.log(`[ChatAction] Match: [${metadata.category}] ${metadata.fileName} (Score: ${match.score})`);
                return `[${metadata.category}] ${metadata.text}`;
            })
            .join("\n\n");

        // Generate streaming response with context
        const stream = await generateStreamingResponse(message, context);

        return {
            success: true,
            stream,
            contextsUsed: similarVectors.length,
        };
    } catch (error) {
        console.error("Error processing chat message:", error);
        return {
            success: false,
            error: error.message || "Erreur lors du traitement du message",
        };
    }
}

/**
 * Get chat response as text (non-streaming)
 */
export async function getChatResponse(message) {
    try {
        if (!message || message.trim().length === 0) {
            return {
                success: false,
                error: "Le message ne peut pas être vide",
            };
        }

        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(message);

        // Search for similar vectors in Pinecone
        const similarVectors = await querySimilarVectors(queryEmbedding, 5);

        // Extract context from similar vectors
        const context = similarVectors
            .map((match) => {
                const metadata = match.metadata;
                return `[${metadata.category}] ${metadata.text}`;
            })
            .join("\n\n");

        // Import the non-streaming function
        const { generateResponse } = await import("@/lib/gemini");
        const response = await generateResponse(message, context);

        return {
            success: true,
            response,
            contextsUsed: similarVectors.length,
        };
    } catch (error) {
        console.error("Error getting chat response:", error);
        return {
            success: false,
            error: error.message || "Erreur lors de la génération de la réponse",
        };
    }
}
