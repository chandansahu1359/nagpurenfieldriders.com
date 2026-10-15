"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../cart/useCart";

export const CartIcon: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        totalItems > 0
          ? `Shopping cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`
          : "Shopping cart, empty"
      }
      className={`relative p-2 rounded-xl text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${className}`}
    >
      <ShoppingBag className="w-5 h-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-amber-500 text-zinc-950 text-[11px] font-black font-mono rounded-full flex items-center justify-center border-2 border-zinc-950 animate-in zoom-in-50 duration-200">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
};
