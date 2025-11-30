"use client";

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  // --- Hooks toujours en haut, jamais conditionnels ---
  const [credits, setCredits] = useState<number | null>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);

  // Charger les crédits une fois l'utilisateur chargé
  useEffect(() => {
    if (!isLoaded) return;
    if (!user || !user.id) return;

    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "https://aurisvoice.onrender.com";

    async function fetchCredits() {
      if (!user || !user.id) return;

      try {
        setLoadingCredits(true);

        const res = await fetch(`${baseUrl}/api/credits`, {
          headers: {
            "x-user-email": user.primaryEmailAddress?.emailAddress.toLowerCase() || "",
          },
        });

        const data = await res.json();

        if (!data.ok) {
          setCredits(0);
        } else {
          setCredits(data.credits || 0);
        }
      } catch (error) {
        console.error("Failed to fetch credits", error);
        setCredits(0);
      } finally {
        setLoadingCredits(false);
      }
    }

    fetchCredits();
  }, [isLoaded, user]);
  

  // Redirection si pas connecté (pas un hook)
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // --- État intermédiaire (pas d'early return avant les hooks) ---
  if (!isLoaded) {
    return (
      <div className="text-white p-10 text-center text-xl">
        Chargement de votre tableau de bord...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="text-white p-10 text-center text-xl">
        Redirection vers la connexion...
      </div>
    );
  }

  // --- FIN : rendu final ---
  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Bienvenue, {user.firstName || "Utilisateur"} 👋
      </h1>

      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl mb-2 font-semibold">Vos crédits</h2>

        {loadingCredits ? (
          <p className="text-gray-400">Chargement des crédits...</p>
        ) : (
          <p className="text-2xl font-bold text-purple-400">
            {credits !== null ? credits : 0} crédits restants
          </p>
        )}
          </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <button
          onClick={() => router.push("/create-dub")}
          className="bg-indigo-600 hover:bg-indigo-700 transition p-6 rounded-xl text-left"
        >
          🎙️ Créer un doublage
        </button>

        <button
          onClick={() => router.push("/history")}
          className="bg-purple-600 hover:bg-purple-700 transition p-6 rounded-xl text-left"
        >
          📚 Historique
        </button>

        <button
          onClick={() => router.push("/credits")}
          className="bg-pink-600 hover:bg-pink-700 transition p-6 rounded-xl text-left"
        >
          💳 Acheter des crédits
                  </button>
      </div>
    </div>
  );
}
