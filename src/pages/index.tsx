import Head from 'next/head';
import Link from 'next/link';
import { Mic2, Zap, Globe, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Landing Page principale d'AurisVoice
 * Composant serveur pour performance optimale
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>AurisVoice - AI Dubbing Premium | Traduction vocale professionnelle par IA</title>
        <meta 
          name="description" 
          content="Doublez vos vidéos et audios dans n'importe quelle langue avec des voix IA premium. Paiement par crédits, résultats professionnels instantanés." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="doublage IA, traduction vocale, voix artificielle, AI dubbing, traduction audio, voix premium" />
        <meta property="og:title" content="AurisVoice - AI Dubbing Premium" />
        <meta property="og:description" content="Doublez vos vidéos et audios dans n'importe quelle langue avec des voix IA premium." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 1️⃣ HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-50" />
              <Mic2 className="relative h-20 w-20 text-white" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              AurisVoice
            </span>
          </h1>

          <p className="text-2xl md:text-3xl font-light text-white/90 mb-4">
            Traduction vocale professionnelle par IA
          </p>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12">
            Doublez vos vidéos et audios dans n'importe quelle langue avec des voix IA premium. 
            Paiement par crédits, résultats professionnels instantanés.
          </p>

          {/* CTA Button */}
          <Link href="/create-dub">
            <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
              <span>Démarrer le Doublage (Gratuit ou Pro)</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* Floating Badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Propulsé par OpenAI & ElevenLabs</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2️⃣ POURQUOI AURISVOICE SECTION */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pourquoi AurisVoice ?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              La technologie vocale premium pour vos contenus audio et vidéo
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Qualité */}
            <div className="group relative p-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl hover:border-indigo-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mic2 className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  Qualité Premium
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  Voix naturelles et expressives grâce à l'IA de pointe. Chaque intonation, chaque émotion est préservée pour un résultat professionnel.
                </p>
              </div>
            </div>

            {/* Feature 2: Rapidité */}
            <div className="group relative p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ultra-Rapide
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  Génération instantanée de vos doublages. De l'upload à l'écoute en quelques secondes seulement, sans attente.
                </p>
              </div>
            </div>

            {/* Feature 3: Prix */}
            <div className="group relative p-8 bg-gradient-to-br from-pink-900/30 to-indigo-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl hover:border-pink-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  Prix Transparent
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  Paiement par crédits, sans abonnement. Payez uniquement ce que vous utilisez avec des tarifs clairs et compétitifs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ CTA FINALE */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.15),transparent_50%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 md:p-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Prêt à révolutionner
                <span className="block text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text">
                  vos vidéos ?
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Rejoignez les créateurs qui transforment leurs contenus avec AurisVoice
              </p>

              <Link href="/dashboard">
                <button className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                  <span>Tester AurisVoice</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>

              <p className="mt-8 text-sm text-gray-400">
                Aucune carte de crédit requise • Essai gratuit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ FOOTER */}
      <footer className="bg-black border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Mic2 className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">AurisVoice</span>
            </div>

            <div className="text-gray-400 text-sm text-center">
              © 2025 AurisVoice · Propulsé par Synrgy Labs
            </div>

            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
