import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import Head from 'next/head';
import { DubbingForm } from '@/components/DubbingForm';

export default function CreateDubPage() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
        <div className="text-white text-lg">Chargement...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      <Head>
        <title>Créer un doublage - AurisVoice</title>
        <meta name="description" content="Créez un doublage IA pour votre fichier audio ou vidéo" />
      </Head>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🎙️ Créer un doublage
        </h1>
        <DubbingForm
          onSuccess={(audioUrl) => {
            console.log('Doublage généré:', audioUrl);
          }}
          onError={(error) => {
            console.error('Erreur:', error);
          }}
        />
      </div>
    </>
  );
}

