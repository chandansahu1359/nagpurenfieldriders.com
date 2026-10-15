"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types";
import { useCart } from "../cart/useCart";

export const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 items-center justify-between">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-white truncate uppercase tracking-wide">
            {item.name}
          </h4>
          <button
            type="button"
            onClick={() => removeItem(item.productId, item.size, item.variant)}
            aria-label={`Remove ${item.name} from cart`}
            className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          {item.size && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              SIZE: {item.size}
            </span>
          )}
          {item.variant && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              {item.variant}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.size,
                  item.variant,
                  item.quantity - 1
                )
              }
              aria-label="Decrease quantity"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-mono font-bold text-white px-2">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.size,
                  item.variant,
                  item.quantity + 1
                )
              }
              aria-label="Increase quantity"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-sm font-mono font-bold text-amber-400">
            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
};
