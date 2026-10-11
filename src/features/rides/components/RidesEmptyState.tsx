import React from "react";
import { Compass, RotateCcw } from "lucide-react";

interface RidesEmptyStateProps {
  onReset: () => void;
  message?: string;
}

export const RidesEmptyState: React.FC<RidesEmptyStateProps> = ({
  onReset,
  message = "The road is quiet for now. No rides match your selected filter.",
}) => {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-inner">
        <Compass className="w-8 h-8 animate-[spin_20s_linear_infinite]" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">
        ZERO MILE DISPATCH
      </span>
      <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mb-3">
        The Road Is Quiet For Now
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
        {message} Check back soon or reset your filters to explore completed road archives.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
        Reset All Filters
      </button>
    </div>
  );
};
