"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../cart/useCart";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";
import { PurchaseRequestModal } from "./PurchaseRequestModal";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart } = useCart();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isPurchaseModalOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPurchaseModalOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your Merchandise Cart"
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Backdrop */}
        <div
          onClick={closeCart}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        />

        {/* Drawer Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white">
                    MERCHANDISE CART
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {items.length === 0
                      ? "Empty"
                      : `${items.length} item type${items.length === 1 ? "" : "s"}`}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart drawer"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                // Empty State
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wide">
                      YOUR CART IS EMPTY
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
                      Official NER merchandise selections will appear here when available.
                    </p>
                  </div>
                  <Link
                    href="/merchandise/"
                    onClick={closeCart}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold uppercase text-amber-400 hover:bg-zinc-800 transition-colors"
                  >
                    VIEW MERCHANDISE
                  </Link>
                </div>
              ) : (
                // Items List
                items.map((item) => (
                  <CartItemRow
                    key={`${item.productId}-${item.size || "none"}-${item.variant || "none"}`}
                    item={item}
                  />
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md space-y-4">
                <CartSummary />

                <button
                  type="button"
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <span>REQUEST FOR PURCHASE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Request Modal */}
      <PurchaseRequestModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </>
  );
};
