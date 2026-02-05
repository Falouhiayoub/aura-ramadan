"use client";

import { useState } from "react";
import { useSadaqa } from "@/components/context/sadaqa-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Users, TrendingUp, Database } from "lucide-react";
import { processDocument, getVectorStats } from "@/actions/vector-action";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ExplorerPage() {
    const { isProcessingDocument, setIsProcessingDocument, totalDocuments, setTotalDocuments } = useSadaqa();
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const result = await getVectorStats();
        if (result.success) {
            setStats(result.stats);
            setTotalDocuments(result.stats?.totalRecordCount || 0);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessingDocument(true);
        setUploadStatus("Traitement en cours...");

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("category", "famille");
            formData.append("description", "Document uploadé depuis l'explorateur");

            const result = await processDocument(formData);

            if (result.success) {
                setUploadStatus(`✓ ${result.message}`);
                await loadStats();
            } else {
                setUploadStatus(`✗ ${result.error}`);
            }
        } catch (error) {
            setUploadStatus("✗ Erreur lors de l'upload");
        } finally {
            setIsProcessingDocument(false);
            setTimeout(() => setUploadStatus(""), 5000);
        }
    };

    return (
        <Card className="h-full flex flex-col glass border-lantern-gold/20 shadow-xl">
            <CardHeader className="border-b border-border/40">
                <CardTitle className="flex items-center gap-2 text-night-blue dark:text-sand-light">
                    <Database className="h-5 w-5 text-lantern-gold" />
                    Explorateur de Données
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-4">
                <Tabs defaultValue="upload" className="h-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="upload">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                        </TabsTrigger>
                        <TabsTrigger value="families">
                            <Users className="h-4 w-4 mr-2" />
                            Familles
                        </TabsTrigger>
                        <TabsTrigger value="stats">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Statistiques
                        </TabsTrigger>
                    </TabsList>

                    {/* Upload Tab */}
                    <TabsContent value="upload" className="space-y-4">
                        <div className="border-2 border-dashed border-border/40 rounded-lg p-8 text-center hover:border-emerald/50 transition-colors">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">Télécharger un document</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                PDF, TXT ou CSV (max 10 MB)
                            </p>
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".pdf,.txt,.csv"
                                onChange={handleFileUpload}
                                disabled={isProcessingDocument}
                            />
                            <Button
                                onClick={() => document.getElementById("file-upload")?.click()}
                                disabled={isProcessingDocument}
                                className="bg-emerald hover:bg-emerald-dark text-white"
                            >
                                {isProcessingDocument ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Traitement...
                                    </span>
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Choisir un fichier
                                    </>
                                )}
                            </Button>

                            {uploadStatus && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-card border border-border/40 rounded-lg"
                                >
                                    <p className="text-sm">{uploadStatus}</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-card border border-border/40 rounded-lg">
                                <p className="text-sm text-muted-foreground">Documents</p>
                                <p className="text-2xl font-bold text-emerald">{totalDocuments}</p>
                            </div>
                            <div className="p-4 bg-card border border-border/40 rounded-lg">
                                <p className="text-sm text-muted-foreground">Vecteurs</p>
                                <p className="text-2xl font-bold text-lantern-gold">
                                    {stats?.totalRecordCount || 0}
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Families Tab */}
                    <TabsContent value="families" className="space-y-4">
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 bg-card border border-border/40 rounded-lg hover:border-emerald/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-semibold">Famille {i}</h4>
                                            <p className="text-sm text-muted-foreground">Quartier Hay Mohammadi</p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge variant="secondary">Quffat</Badge>
                                                <Badge variant="outline">Priorité Haute</Badge>
                                            </div>
                                        </div>
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center py-4">
                            Uploadez des documents pour voir les familles enregistrées
                        </p>
                    </TabsContent>

                    {/* Stats Tab */}
                    <TabsContent value="stats" className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-6 bg-gradient-to-br from-emerald/10 to-emerald/5 border border-emerald/20 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Vecteurs</p>
                                        <p className="text-3xl font-bold text-emerald mt-1">
                                            {stats?.totalRecordCount || 0}
                                        </p>
                                    </div>
                                    <Database className="h-12 w-12 text-emerald/30" />
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-lantern-gold/10 to-lantern-gold/5 border border-lantern-gold/20 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dimensions</p>
                                        <p className="text-3xl font-bold text-lantern-gold mt-1">
                                            {stats?.dimension || 768}
                                        </p>
                                    </div>
                                    <TrendingUp className="h-12 w-12 text-lantern-gold/30" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
