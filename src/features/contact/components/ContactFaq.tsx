"use client";

import React, { useState } from "react";
import { CONTACT_FAQS_LIST, FaqItem } from "../data/contactFaq.data";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export const ContactFaq: React.FC = () => {
  // Allow toggling items, default the first item to open
  const [openId, setOpenId] = useState<string | null>("what-is-ner");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="pt-24 sm:pt-32 pb-16 sm:pb-24 border-t border-zinc-850 relative overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Heading & Context (4 cols on lg) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>COMMON INQUIRIES</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                FREQUENTLY <br />
                ASKED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  QUESTIONS
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal pt-1">
                Have a question before reaching out? Here are some of the things
                people commonly want to know about NER.
              </p>
            </div>

            {/* Quick helper tip card */}
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold uppercase tracking-wider text-[11px] font-mono">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>Didn&apos;t find your answer?</span>
              </div>
              <p className="leading-relaxed">
                Use the dispatch form above to write directly to our road team.
                We welcome inquiries from fellow riders and enthusiasts.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Accordion FAQ List (8 cols on lg) */}
          <div className="lg:col-span-8 divide-y divide-zinc-850/80 border-y border-zinc-850/80">
            {CONTACT_FAQS_LIST.map((faq: FaqItem, index: number) => {
              const isOpen = openId === faq.id;
              const buttonId = `faq-btn-${faq.id}`;
              const contentId = `faq-content-${faq.id}`;
              const itemNumber = (index + 1).toString().padStart(2, "0");

              return (
                <div key={faq.id} className="group transition-colors">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggleItem(faq.id)}
                      className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] rounded-lg"
                    >
                      <div className="flex items-start gap-3.5 sm:gap-4 pr-2">
                        <span className="text-xs font-mono font-medium text-amber-500/80 pt-1 shrink-0">
                          {itemNumber}.
                        </span>
                        <span
                          className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${isOpen
                            ? "text-amber-400"
                            : "text-zinc-100 group-hover:text-amber-300"
                            }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border transition-all duration-300 ${isOpen
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-400 rotate-180"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-200"
                          }`}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </button>
                  </h3>

                  {/* Smooth height transition grid container */}
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100 mb-6"
                      : "grid-rows-[0fr] opacity-0 mb-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-7 sm:pl-8 pr-4">
                        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
