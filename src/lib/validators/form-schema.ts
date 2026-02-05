import { z } from "zod";

/**
 * Chat message validation schema
 */
export const chatMessageSchema = z.object({
    message: z
        .string()
        .min(1, "Le message ne peut pas être vide")
        .max(1000, "Le message est trop long (max 1000 caractères)"),
});

/**
 * Document upload validation schema
 */
export const documentUploadSchema = z.object({
    file: z
        .any()
        .refine((file) => file instanceof File, {
            message: "Un fichier valide est requis",
        })
        .refine((file) => file.size <= 10 * 1024 * 1024, {
            message: "Le fichier ne doit pas dépasser 10 MB",
        })
        .refine(
            (file) =>
                ["application/pdf", "text/plain", "text/csv"].includes(file.type),
            {
                message: "Type de fichier non supporté (PDF, TXT, CSV uniquement)",
            }
        ),
    category: z.enum(["famille", "don", "inventaire", "autre"], {
        message: "Catégorie invalide",
    }),
    description: z.string().optional(),
});

/**
 * Family registration schema
 */
export const familyRegistrationSchema = z.object({
    familyName: z.string().min(2, "Le nom de famille est requis"),
    contactPerson: z.string().min(2, "Le nom du contact est requis"),
    phone: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide (10 chiffres)"),
    address: z.string().min(5, "L'adresse est requise"),
    quartier: z.string().min(2, "Le quartier est requis"),
    numberOfMembers: z.number().int().positive("Le nombre de membres doit être positif"),
    needsType: z.array(z.enum(["quffat", "iftar", "zakat", "autre"])),
    priority: z.enum(["haute", "moyenne", "basse"]),
    notes: z.string().optional(),
});

/**
 * Donation tracking schema
 */
export const donationSchema = z.object({
    donorName: z.string().min(2, "Le nom du donateur est requis"),
    donationType: z.enum(["zakat", "sadaqa", "quffat", "argent", "autre"]),
    amount: z.number().positive("Le montant doit être positif").optional(),
    items: z.string().optional(),
    date: z.date(),
    notes: z.string().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type DocumentUpload = z.infer<typeof documentUploadSchema>;
export type FamilyRegistration = z.infer<typeof familyRegistrationSchema>;
export type Donation = z.infer<typeof donationSchema>;
