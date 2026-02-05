"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ChatError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <Card className="h-full flex flex-col glass border-destructive/20">
            <CardHeader className="border-b border-border/40">
                <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <h2 className="font-semibold">Erreur de chargement</h2>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
                <p className="text-muted-foreground mb-4 text-center">
                    Une erreur s'est produite lors du chargement du chat.
                </p>
                <Button onClick={reset} variant="outline">
                    Réessayer
                </Button>
            </CardContent>
        </Card>
    );
}
