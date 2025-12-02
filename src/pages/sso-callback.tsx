import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SSOCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after successful OAuth
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
      <div className="text-center">
        <AuthenticateWithRedirectCallback />
        <div className="mt-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white mt-4">Connexion en cours...</p>
        </div>
      </div>
    </div>
  );
}

