import React, { Suspense } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { CartProvider } from "@/features/merchandise/cart/CartProvider";
import { CartDrawer } from "@/features/merchandise/components/CartDrawer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-zinc-950 focus:font-bold focus:rounded-xl focus:shadow-xl focus:outline-none font-mono text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      <Suspense fallback={<div className="h-20 bg-black" />}>
        <Header />
      </Suspense>

      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>

      <Footer />

      <CartDrawer />
    </CartProvider>
  );
}
