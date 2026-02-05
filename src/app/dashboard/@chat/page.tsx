"use client";

import { useState, useRef, useEffect } from "react";
import { useSadaqa } from "@/components/context/sadaqa-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getChatResponse } from "@/actions/chat-action";

export default function ChatPage() {
    const { messages, addMessage, isAIThinking, setIsAIThinking } = useSadaqa();
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user" as const,
            content: input,
            timestamp: new Date(),
        };

        addMessage(userMessage);
        setInput("");
        setIsAIThinking(true);

        try {
            const result = await getChatResponse(input);

            if (result.success) {
                const aiMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant" as const,
                    content: result.response,
                    timestamp: new Date(),
                };
                addMessage(aiMessage);
            } else {
                const errorMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant" as const,
                    content: `Erreur: ${result.error}`,
                    timestamp: new Date(),
                };
                addMessage(errorMessage);
            }
        } catch (error) {
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant" as const,
                content: "Désolé, une erreur s'est produite.",
                timestamp: new Date(),
            };
            addMessage(errorMessage);
        } finally {
            setIsAIThinking(false);
        }
    };

    return (
        <Card className="h-full flex flex-col glass border-emerald/20 shadow-xl">
            <CardHeader className="border-b border-border/40">
                <CardTitle className="flex items-center gap-2 text-night-blue dark:text-sand-light">
                    <Sparkles className="h-5 w-5 text-emerald" />
                    Assistant Sadaqa
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Sparkles className="h-12 w-12 mx-auto mb-4 text-emerald opacity-50" />
                                <p className="text-lg font-medium">Bienvenue sur Aura-Sadaqa</p>
                                <p className="text-sm mt-2">
                                    Posez vos questions sur les familles, les dons ou les distributions
                                </p>
                            </div>
                        )}

                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user"
                                                ? "bg-emerald text-white"
                                                : "bg-card border border-border/40"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        <p className="text-xs mt-1 opacity-70">
                                            {message.timestamp.toLocaleTimeString("fr-MA", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* AI Thinking Indicator */}
                        {isAIThinking && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="bg-card border border-border/40 rounded-lg px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-emerald rounded-full animate-[sadaqa-pulse_1s_ease-in-out_infinite]" />
                                            <span className="w-2 h-2 bg-emerald rounded-full animate-[sadaqa-pulse_1s_ease-in-out_0.2s_infinite]" />
                                            <span className="w-2 h-2 bg-emerald rounded-full animate-[sadaqa-pulse_1s_ease-in-out_0.4s_infinite]" />
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            L&apos;assistant réfléchit...
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-border/40">
                    <div className="flex gap-2">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Posez votre question..."
                            className="resize-none"
                            rows={2}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            disabled={isAIThinking}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="bg-emerald hover:bg-emerald-dark text-white h-auto"
                            disabled={!input.trim() || isAIThinking}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
