import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is not set in environment variables");
}

// Initialize Pinecone client
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const indexName = process.env.PINECONE_INDEX_NAME || 'casa-ramadan-2026';

/**
 * Get Pinecone index
 */
export async function getIndex() {
    try {
        console.log(`[Pinecone] Connecting to index: ${indexName}`);
        return pinecone.index(indexName);
    } catch (error) {
        console.error("Error getting Pinecone index details:", error);
        throw new Error(`Failed to connect to Pinecone index: ${indexName}. Error: ${error.message}`);
    }
}

/**
 * Upsert vectors to Pinecone
 */
export async function upsertVectors(vectors) {
    try {
        if (!vectors || vectors.length === 0) {
            console.warn("[Pinecone] Warning: Attempted to upsert an empty vectors array. Skipping.");
            return { success: true, count: 0 };
        }

        const index = await getIndex();
        console.log(`[Pinecone] Upserting ${vectors.length} vectors...`);

        // Log dimension of the first vector to help debug mismatch
        if (vectors.length > 0) {
            console.log(`[Pinecone] Vector dimension: ${vectors[0].values.length}`);
        }

        // IMPORTANT: For @pinecone-database/pinecone v7.0.0, 
        // the upsert method expects { records: [] }
        const result = await index.upsert({ records: vectors });
        console.log(`[Pinecone] Upsert successful:`, result);
        return { success: true, count: vectors.length };
    } catch (error) {
        console.error("Error upserting vectors to Pinecone:", error);
        // Provide more context in the error
        throw new Error(`Failed to store vectors in Pinecone: ${error.message}`);
    }
}

/**
 * Query similar vectors
 */
export async function querySimilarVectors(embedding, topK = 5, filter = {}) {
    try {
        const index = await getIndex();
        const queryResponse = await index.query({
            vector: embedding,
            topK,
            includeMetadata: true,
            filter: Object.keys(filter).length > 0 ? filter : undefined,
        });

        return queryResponse.matches || [];
    } catch (error) {
        console.error("Error querying vectors:", error);
        throw new Error("Failed to query Pinecone");
    }
}

/**
 * Delete vectors by ID
 */
export async function deleteVectors(ids) {
    try {
        const index = await getIndex();
        await index.deleteMany(ids);
        return { success: true, count: ids.length };
    } catch (error) {
        console.error("Error deleting vectors:", error);
        throw new Error("Failed to delete vectors from Pinecone");
    }
}

/**
 * Get index stats
 */
export async function getIndexStats() {
    try {
        const index = await getIndex();
        const stats = await index.describeIndexStats();
        return stats;
    } catch (error) {
        console.error("Error getting index stats:", error);
        throw new Error("Failed to get Pinecone stats");
    }
}
