import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: "Aura-Link | Ramadan & Charity Platform",
    description: "Aura-Link - Plateforme premium pour la charité et les actions caritatives pendant le Ramadan.",
    keywords: ["Ramadan", "Sadaqa", "Zakat", "Casablanca", "Charité", "Association"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
