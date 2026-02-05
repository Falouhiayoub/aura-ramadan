import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for Ramadan calendar
 */
export function formatRamadanDate(date) {
  return new Intl.DateTimeFormat('fr-MA', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(date);
}

/**
 * Chunk text for embeddings (max 500 words per chunk)
 */
export function chunkText(text: string, maxWords = 500): string[] {
  if (!text || typeof text !== 'string') return [];

  const words = text.split(/\s+/).filter(w => w.trim().length > 0);
  if (words.length === 0) return [];

  const chunks = [];
  for (let i = 0; i < words.length; i += maxWords) {
    const chunk = words.slice(i, i + maxWords).join(' ');
    if (chunk.trim().length > 0) {
      chunks.push(chunk);
    }
  }

  console.log(`[Utils] Generated ${chunks.length} chunks from ${words.length} words`);
  return chunks;
}

/**
 * Extract text from various file types
 */
export async function extractTextFromFile(file: File): Promise<string> {
  console.log(`[Utils] Extracting text from file: ${file.name} (${file.type})`);

  try {
    // Basic text file handling
    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const text = await file.text();
      return text;
    }

    // PDF handling (currently minimal as per requirements, but being more robust)
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // In a real scenario with proper libs: return await pdfParse(file);
      // For now, we attempt to read text, but warn about PDF limitations
      console.warn(`[Utils] PDF extraction is basic. Consider a dedicated PDF parser for production.`);
      const text = await file.text();
      return text;
    }

    // Fallback for other potential text-like formats
    const text = await file.text();
    return text;
  } catch (error) {
    console.error(`[Utils] Error extracting text from ${file.name}:`, error);
    throw new Error(`Failed to read file: ${file.name}`);
  }
}

/**
 * Generate unique ID for vectors
 */
export function generateVectorId(prefix = 'vec') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sleep utility for delays
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
