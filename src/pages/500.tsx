import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Erreur serveur - AurisVoice</title>
        <meta name="description" content="Une erreur serveur s'est produite" />
        {/* PWA Essential Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0220" />
        <link rel="icon" href="/icons/icon-192x192.png" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">500</h1>
          <p className="text-white/60 text-lg">Erreur serveur</p>
        </div>
      </div>
    </>
  );
}

