"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { useCart } from "../cart/useCart";

interface PurchaseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseRequestModal: React.FC<PurchaseRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { items, total, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validation checks
    if (!fullName.trim() || fullName.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setErrorMessage("Email confirmation does not match.");
      return;
    }

    const cleanedMobile = mobile.trim();
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      setErrorMessage("Please provide a valid 10-digit Indian mobile number (e.g. 9876543210).");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        confirmEmail: confirmEmail.trim(),
        mobile: cleanedMobile,
        notes: notes.trim(),
        cartItems: items,
      };

      const response = await fetch("/api/v1/merchandise/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to submit purchase request.");
      }

      setReferenceId(data.referenceId);
      clearCart();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setReferenceId(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close purchase request dialog"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {referenceId ? (
          // Success State
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
                REQUEST RECORDED
              </span>
              <h3 id="purchase-modal-title" className="text-2xl font-black uppercase text-white tracking-wide">
                PURCHASE INQUIRY RECEIVED
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 font-mono text-left space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>REFERENCE ID:</span>
                <span className="text-amber-400 font-bold">{referenceId}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>CONTACT:</span>
                <span className="text-white truncate max-w-[200px]">{email}</span>
              </div>
            </div>

            <div className="text-xs text-zinc-400 leading-relaxed space-y-2 text-left bg-zinc-900/40 p-4 rounded-xl border border-zinc-850">
              <p className="font-bold text-zinc-200 uppercase font-mono text-[11px]">
                WHAT HAPPENS NEXT:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Our team verifies inventory availability for your selection.</li>
                <li>We will reach out directly with confirmation and payment instructions.</li>
                <li>Delivery address will be requested once payment is finalized.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              DONE
            </button>
          </div>
        ) : (
          // Request Form
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
                DIRECT INQUIRY
              </span>
              <h3 id="purchase-modal-title" className="text-2xl font-black uppercase text-white tracking-wide">
                REQUEST FOR PURCHASE
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Provide your contact details. The NER team will review availability and share instructions.
              </p>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rider@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Confirm Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="rider@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Mobile Number (10 digits) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Notes or Sizing Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific questions regarding fit or rollout pickup..."
                  className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Cart snapshot notice */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-400">Total Items: {items.length}</span>
              <span className="text-amber-400 font-bold">
                Value: ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING REQUEST...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT PURCHASE REQUEST</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
