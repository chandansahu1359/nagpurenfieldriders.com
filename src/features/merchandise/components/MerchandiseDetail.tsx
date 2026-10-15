"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MerchandiseItem, MerchandiseSize } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "../cart/useCart";
import {
  MERCHANDISE_STATUS_LABELS,
  MERCHANDISE_SIZE_LABELS,
} from "@/constants/merchandise.constants";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const MerchandiseDetail: React.FC<{ item: MerchandiseItem }> = ({
  item,
}) => {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0].name : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  const handleAddToCart = () => {
    addItem(item.id, selectedSize, selectedVariant, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  return (
    <article className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background ambient road grid */}
      <div className="absolute inset-0 bg-road-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/merchandise/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO MERCHANDISE</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
              <Image
                src={
                  item.images[activeImageIndex] ||
                  "/images/gallery/tank-gloves-macro.jpg"
                }
                alt={item.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>

            {/* Thumbnail Strip */}
            {item.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? "border-amber-500 scale-105"
                        : "border-zinc-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${item.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Purchase Request Action (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  {item.category}
                </span>
                <Badge
                  variant={item.status === "in_stock" ? "amber" : "neutral"}
                  size="sm"
                >
                  {MERCHANDISE_STATUS_LABELS[item.status]}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                {item.name}
              </h1>

              <div className="mt-4 text-3xl font-black font-mono text-amber-400">
                ₹{item.price.toLocaleString("en-IN")}
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>

            {/* Size Selector */}
            {item.sizes && item.sizes.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  SELECT SIZE
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        selectedSize === size
                          ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20"
                          : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selector */}
            {item.variants && item.variants.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  SELECT EDITION / COLOR
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v.name)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        selectedVariant === v.name
                          ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20"
                          : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-4">
                <label className="text-xs font-mono uppercase text-zinc-400">
                  QUANTITY
                </label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={item.status === "out_of_stock"}
                className="w-full py-4 px-6 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-5 h-5 text-zinc-950" />
                    <span>ADDED TO GEAR CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>
            </div>

            {/* Highlights / Details */}
            {item.details && item.details.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">
                  SPECIFICATIONS & BUILD
                </span>
                <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
                  {item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
