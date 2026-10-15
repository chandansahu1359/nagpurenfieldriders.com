"use client";

import React from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ContactSuccessProps {
  onReset: () => void;
}

export const ContactSuccess: React.FC<ContactSuccessProps> = ({ onReset }) => {
  return (
    <div className="relative rounded-2xl bg-zinc-900/90 border border-amber-500/40 p-8 sm:p-12 text-center backdrop-blur-md shadow-2xl shadow-black/80 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          TRANSMISSION RECEIVED
        </span>
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
          MESSAGE SENT
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Thanks for reaching out to Nagpur Enfield Riders. Your dispatch has
          been logged into our community road desk. We will review your message
          and respond soon.
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Send Another Dispatch
        </Button>
      </div>
    </div>
  );
};
