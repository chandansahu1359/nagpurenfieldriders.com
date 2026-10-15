"use client";

import React from "react";
import { Info } from "lucide-react";
import { useCart } from "../cart/useCart";

export const CartSummary: React.FC = () => {
  const { totalItems, subtotal, total } = useCart();

  return (
    <div className="space-y-4 pt-4 border-t border-zinc-800">
      <div className="space-y-2 text-xs font-mono">
        <div className="flex justify-between text-zinc-400">
          <span>SELECTED ITEMS</span>
          <span className="text-white">{totalItems}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>ESTIMATED VALUE</span>
          <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
          <span>REQUEST TOTAL</span>
          <span className="text-amber-400">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 leading-relaxed font-mono">
        <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
        <p>
          Submitting a request logs your selection for availability verification.
          No payment is charged on the website.
        </p>
      </div>
    </div>
  );
};
