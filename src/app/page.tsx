"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Moon,
    Heart,
    HandHeart,
    Users,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    FileText,
    TrendingUp,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-sm border-b border-[#D4AF37]/20">
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Moon className="h-8 w-8 text-[#D4AF37]" />
                            <span className="text-xl font-bold font-[var(--font-playfair)]">Aura-Link</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#welcome" className="hover:text-[#D4AF37] transition-colors">Accueil</a>
                            <a href="#mission" className="hover:text-[#D4AF37] transition-colors">Mission</a>
                            <a href="#how-it-works" className="hover:text-[#D4AF37] transition-colors">Fonctionnement</a>
                            <Button asChild className="bg-gradient-to-r from-[#D4AF37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#D4AF37] text-black font-semibold rounded-2xl px-6">
                                <Link href="/dashboard">
                                    Commencer
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full min-h-screen flex items-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/50 z-[1]" />

                <div className="container mx-auto px-4 md:px-8 py-20 relative z-10">
                    <div className="grid grid-cols-1 gap-12 items-center max-w-4xl mx-auto">
                        {/* Title and Description */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
                                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                                <span className="text-sm text-[#D4AF37]">رمضان مبارك • Ramadan Moubarak</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-playfair)] leading-tight">
                                <span className="block">Aura-Link</span>
                                <span className="block text-[#D4AF37] mt-2">أورا-لينك</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-lg">
                                Connecter les cœurs généreux avec ceux qui en ont besoin.
                                Une plateforme moderne pour la charité et la solidarité pendant le Ramadan.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r from-[#D4AF37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#D4AF37] text-black font-semibold rounded-2xl px-8 py-6 text-lg transition-all hover:scale-105"
                                >
                                    <Link href="/dashboard">
                                        Découvrir
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-2xl px-8 py-6 text-lg"
                                >
                                    En savoir plus
                                </Button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section id="welcome" className="py-20 md:py-32 bg-[#0a0a0a]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Portrait Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20">
                                <div className="relative w-full aspect-[3/4]">
                                    <Image
                                        src="/image1.png"
                                        alt="Moon through archway"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Welcome Text and Icon Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-playfair)] mb-4">
                                    Welcome to Aura-Link
                                </h2>
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Une plateforme dédiée à la charité et à la solidarité,
                                    facilitant les dons et les actions caritatives pendant le mois sacré du Ramadan.
                                </p>
                            </div>

                            {/* Icon Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Heart, title: "Zakat", desc: "Don obligatoire" },
                                    { icon: HandHeart, title: "Sadaqa", desc: "Aumône volontaire" },
                                    { icon: Users, title: "Iftar", desc: "Repas collectifs" },
                                    { icon: TrendingUp, title: "Impact", desc: "Suivi des dons" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="p-6 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
                                    >
                                        <item.icon className="h-8 w-8 text-[#D4AF37] mb-3" />
                                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section id="mission" className="py-20 md:py-32 bg-[#0a0a0a]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Mission Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 order-2 lg:order-1"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-playfair)]">
                                Notre Mission
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Connecter les donateurs avec les bénéficiaires de manière transparente et efficace.
                                Nous croyons en la puissance de la technologie pour amplifier l&apos;impact des actions caritatives.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Transparence totale dans les dons",
                                    "Impact mesurable et suivi en temps réel",
                                    "Facilité d'utilisation pour tous",
                                    "Sécurité et confiance garanties"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="h-6 w-6 text-[#D4AF37] flex-shrink-0" />
                                        <span className="text-gray-300">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-[#D4AF37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#D4AF37] text-black font-semibold rounded-2xl px-8 py-6 text-lg mt-6 transition-all hover:scale-105"
                            >
                                <Link href="/dashboard">
                                    Action
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Right: Atmospheric Photo */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative order-1 lg:order-2"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20">
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src="/image2.png"
                                        alt="People sharing food"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 md:py-32 bg-[#0a0a0a]">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-playfair)] mb-4">
                            Comment ça fonctionne
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Un processus simple en trois étapes pour faire la différence
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                number: "01",
                                icon: FileText,
                                title: "Créer un compte",
                                description: "Inscrivez-vous en quelques minutes et accédez à la plateforme"
                            },
                            {
                                number: "02",
                                icon: Heart,
                                title: "Faire un don",
                                description: "Choisissez votre cause et effectuez votre don de manière sécurisée"
                            },
                            {
                                number: "03",
                                icon: TrendingUp,
                                title: "Suivre l'impact",
                                description: "Visualisez l'impact réel de votre contribution en temps réel"
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="relative"
                            >
                                <div className="p-8 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm hover:bg-[#D4AF37]/10 transition-all h-full">
                                    {/* Numbered Gold Circle */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#b8941f] flex items-center justify-center text-black font-bold text-xl">
                                            {step.number}
                                        </div>
                                        <step.icon className="h-8 w-8 text-[#D4AF37]" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-[var(--font-playfair)] mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-16 bg-[#0a0a0a] border-t border-[#D4AF37]/20">
                {/* Islamic Geometric Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
                        <defs>
                            <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
                                <circle cx="50" cy="50" r="20" fill="none" stroke="#D4AF37" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Moon className="h-6 w-6 text-[#D4AF37]" />
                                <span className="text-xl font-bold font-[var(--font-playfair)]">Aura-Link</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Connecter les cœurs généreux avec ceux qui en ont besoin.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-[#D4AF37]">Navigation</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#welcome" className="hover:text-[#D4AF37] transition-colors">Accueil</a></li>
                                <li><a href="#mission" className="hover:text-[#D4AF37] transition-colors">Mission</a></li>
                                <li><a href="#how-it-works" className="hover:text-[#D4AF37] transition-colors">Fonctionnement</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-[#D4AF37]">Ressources</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Confidentialité</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-[#D4AF37]">Contact</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    <span>Casablanca, Maroc</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-[#D4AF37]/20 pt-8 text-center text-sm text-gray-400">
                        <p>© 2026 Aura-Link. Tous droits réservés. Ramadan Moubarak.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
