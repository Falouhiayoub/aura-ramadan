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
            console.error("[VectorAction] No file provided in formData");
            return {
                success: false,
                error: "Aucun fichier fourni"
            };
        }

        console.log(`[VectorAction] Processing file: ${file.name}, category: ${category}`);

        // 1️⃣ Extract text
        const text = await extractTextFromFile(file);

        if (!text || text.trim().length === 0) {
            console.error(`[VectorAction] Text extraction failed or returned empty for: ${file.name}`);
            return {
                success: false,
                error: "Le fichier est vide ou le format n'est pas supporté"
            };
        }

        console.log(`[VectorAction] Extracted ${text.length} characters of text`);

        // 2️⃣ Chunk text
        const chunks = chunkText(text, 500);

        if (!chunks || chunks.length === 0) {
            console.error("[VectorAction] No chunks generated", {
                fileName: file.name,
                textLength: text.length
            });

            return {
                success: false,
                error: "Impossible de découper le document en segments valides"
            };
        }

        console.log(`[VectorAction] Generated ${chunks.length} chunks`);

        // 3️⃣ Generate embeddings → vectors
        const vectors = [];

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            if (!chunk || chunk.trim().length === 0) {
                console.log(`[VectorAction] Skipping empty chunk at index ${i}`);
                continue;
            }

            try {
                console.log(`[VectorAction] Generating embedding for chunk ${i + 1}/${chunks.length}...`);
                const embedding = await generateEmbedding(chunk);

                // Validate embedding
                if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
                    console.warn(`[VectorAction] Invalid embedding at chunk ${i}`);
                    continue;
                }

                if (embedding.length !== 768) {
                    console.warn(
                        `[VectorAction] Unexpected dimension: ${embedding.length} (expected 768)`
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
            } catch (embedError) {
                console.error(`[VectorAction] Error generating embedding for chunk ${i}:`, embedError);
                // Continue to next chunk instead of failing entire document
            }
        }

        // 4️⃣ Final safety check
        console.log(`[VectorAction] Total valid vectors generated: ${vectors.length}`);

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

