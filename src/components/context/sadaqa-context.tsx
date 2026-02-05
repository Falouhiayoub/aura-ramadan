"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SadaqaContextType {
    // Active document/family
    activeDocument: string | null;
    setActiveDocument: (doc: string | null) => void;

    // Loading states
    isAIThinking: boolean;
    setIsAIThinking: (thinking: boolean) => void;

    isProcessingDocument: boolean;
    setIsProcessingDocument: (processing: boolean) => void;

    // Chat state
    messages: Message[];
    addMessage: (message: Message) => void;
    clearMessages: () => void;

    // Stats
    totalDocuments: number;
    setTotalDocuments: (count: number) => void;
}

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const SadaqaContext = createContext<SadaqaContextType | undefined>(undefined);

export function SadaqaProvider({ children }: { children: ReactNode }) {
    const [activeDocument, setActiveDocument] = useState<string | null>(null);
    const [isAIThinking, setIsAIThinking] = useState(false);
    const [isProcessingDocument, setIsProcessingDocument] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [totalDocuments, setTotalDocuments] = useState(0);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <SadaqaContext.Provider
            value={{
                activeDocument,
                setActiveDocument,
                isAIThinking,
                setIsAIThinking,
                isProcessingDocument,
                setIsProcessingDocument,
                messages,
                addMessage,
                clearMessages,
                totalDocuments,
                setTotalDocuments,
            }}
        >
            {children}
        </SadaqaContext.Provider>
    );
}

export function useSadaqa() {
    const context = useContext(SadaqaContext);
    if (context === undefined) {
        throw new Error("useSadaqa must be used within a SadaqaProvider");
    }
    return context;
}
