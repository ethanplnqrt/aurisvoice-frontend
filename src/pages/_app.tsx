import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { ThemeProvider } from '@/components/ThemeProvider';
const Navbar = dynamic(() => import("@/components/Navbar").then(mod => ({ default: mod.Navbar })), { ssr: false });
import { Footer } from '@/components/Footer';
import { TransitionWrapper } from '@/components/TransitionWrapper';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';
import { InstallPrompt } from '@/components/InstallPrompt';
import { CapacitorDetector } from '@/components/CapacitorDetector';

if (typeof window !== "undefined") {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log("🔧 ENV CHECK → BACKEND URL =", backendUrl || "⚠️ NOT DEFINED");
  if (!backendUrl) {
    console.error("❌ NEXT_PUBLIC_BACKEND_URL is not defined! API calls will fail.");
  }
}

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up"}
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/dashboard"}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/dashboard"}
      {...pageProps}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-purple-950 to-black">

          <Navbar />

          <main className="flex-1 relative z-10">
            <AnimatePresence mode="wait" initial={false}>
              <TransitionWrapper key={router.pathname}>
                <Component {...pageProps} />
              </TransitionWrapper>
            </AnimatePresence>
          </main>

          <Footer />

          <ScrollToTop />
          <ServiceWorkerRegister />
          <InstallPrompt />
          <CapacitorDetector />

        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}
