"use server";

import { generateEmbedding } from "@/lib/gemini";
import { upsertVectors, getIndexStats } from "@/lib/pinecone";
import {
    chunkText,
    generateVectorId,
    extractTextFromFile
} from "@/lib/utils";

/**
 * Process and store document in Pinecone
 */
export async function processDocument(formData) {
    try {
        const file = formData.get("file");
        const category = formData.get("category");
        const description = formData.get("description") || "";

        if (!file) {
            return {
                success: false,
                error: "Aucun fichier fourni"
            };
        }

        // 1️⃣ Extract text
        const text = await extractTextFromFile(file);

        if (!text || text.trim().length === 0) {
            return {
                success: false,
                error: "Le fichier est vide ou le format n'est pas supporté"
            };
        }

        // 2️⃣ Chunk text
        const chunks = chunkText(text, 500);

        if (!chunks || chunks.length === 0) {
            console.error("[Chunking] No chunks generated", {
                fileName: file.name,
                textLength: text.length
            });

            return {
                success: false,
                error: "Impossible de découper le document en segments valides"
            };
        }

        // 3️⃣ Generate embeddings → vectors
        const vectors = [];

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            if (!chunk || chunk.trim().length === 0) {
                continue;
            }

            const embedding = await generateEmbedding(chunk);

            // Validate embedding
            if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
                console.warn(`[Embedding] Invalid embedding at chunk ${i}`);
                continue;
            }

            if (embedding.length !== 768) {
                console.warn(
                    `[Embedding] Unexpected dimension: ${embedding.length} (expected 768)`
                );
            }

            vectors.push({
                id: generateVectorId(`${category}_${file.name}_${i}`),
                values: embedding,
                metadata: {
                    text: chunk,
                    category,
                    fileName: file.name,
                    description,
                    chunkIndex: i,
                    totalChunks: chunks.length,
                    uploadedAt: new Date().toISOString()
                }
            });
        }

        // 4️⃣ Final safety check
        if (vectors.length === 0) {
            console.error("[VectorAction] No valid vectors generated", {
                fileName: file.name
            });

            return {
                success: false,
                error: "Aucun vecteur valide n'a été généré à partir du document"
            };
        }

        // 5️⃣ Upsert to Pinecone
        console.log(
            `[VectorAction] Upserting ${vectors.length} vectors into Pinecone`
        );

        await upsertVectors(vectors);

        return {
            success: true,
            message: `Document "${file.name}" traité avec succès`,
            chunksProcessed: vectors.length
        };

    } catch (error) {
        console.error("[VectorAction] Error processing document:", error);

        return {
            success: false,
            error: error.message || "Erreur lors du traitement du document"
        };
    }
}

/**
 * Get Pinecone index statistics
 */
export async function getVectorStats() {
    try {
        const stats = await getIndexStats();

        return {
            success: true,
            stats
        };
    } catch (error) {
        console.error("[VectorStats] Error:", error);

        return {
            success: false,
            error: error.message || "Erreur lors de la récupération des statistiques"
        };
    }
}

