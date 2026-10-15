"use client";

import React from "react";
import { Compass } from "lucide-react";
import { EnquiryType } from "../schemas/contact.schema";
import { ENQUIRY_OPTIONS } from "../schemas/contact.validation";

interface EnquiryTypeSelectorProps {
  value: EnquiryType;
  onChange: (type: EnquiryType) => void;
  disabled?: boolean;
}

export const EnquiryTypeSelector: React.FC<EnquiryTypeSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const currentEnquiry = ENQUIRY_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className="space-y-2">
      <label
        htmlFor="enquiryType"
        className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center justify-between"
      >
        <span className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          Enquiry Type <span className="text-amber-500">*</span>
        </span>
      </label>

      <select
        id="enquiryType"
        name="enquiryType"
        value={value}
        onChange={(e) => onChange(e.target.value as EnquiryType)}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {ENQUIRY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900 py-1">
            {opt.label} — {opt.description}
          </option>
        ))}
      </select>

      {currentEnquiry && (
        <p className="text-[11px] text-zinc-400 pl-1">
          {currentEnquiry.description}
        </p>
      )}
    </div>
  );
};
