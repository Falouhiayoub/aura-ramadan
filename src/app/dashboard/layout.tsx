"use client";

import { SadaqaProvider } from "@/components/context/sadaqa-context";
import { Moon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    chat,
    explorer,
}: {
    chat: React.ReactNode;
    explorer: React.ReactNode;
}) {
    return (
        <SadaqaProvider>
            <div className="min-h-screen bg-black">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-transparent">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Moon className="h-8 w-8 text-emerald animate-[crescent-float_4s_ease-in-out_infinite]" />
                                <div className="absolute inset-0 animate-[lantern-glow_3s_ease-in-out_infinite]" />
                            </div>
                            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                                <div>
                                    <h1 className="text-2xl font-bold text-night-blue dark:text-sand-light">
                                        Aura-Sadaqa
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Assistant Ramadan • Casablanca 2026
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content - Parallel Routes */}
                <main className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                        {/* Chat Slot */}
                        <div className="flex flex-col h-full">
                            {chat}
                        </div>

                        {/* Explorer Slot */}
                        <div className="flex flex-col h-full">
                            {explorer}
                        </div>
                    </div>
                </main>
            </div>
        </SadaqaProvider>
    );
}
