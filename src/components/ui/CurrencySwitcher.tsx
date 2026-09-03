"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrencyStore, CURRENCIES, CurrencyCode } from "@/store/currency";
import { ChevronDown, Globe } from "lucide-react";

interface CurrencySwitcherProps {
  compact?: boolean;
}

export default function CurrencySwitcher({ compact = false }: CurrencySwitcherProps) {
  const { currentCurrency, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = CURRENCIES[currentCurrency] || CURRENCIES.LKR;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 hover:border-champagne bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all ${
          open ? "ring-1 ring-champagne border-champagne" : ""
        }`}
        title="Switch Currency"
      >
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 text-champagne ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-espresso-950 border border-white/15 shadow-2xl z-50 overflow-hidden py-1.5 backdrop-blur-xl animate-fade-up">
          <div className="px-3 py-1.5 border-b border-white/10 text-[10px] uppercase font-bold tracking-widest text-champagne flex items-center gap-1">
            <Globe size={11} /> Select Currency
          </div>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const item = CURRENCIES[code];
            const isSelected = item.code === currentCurrency;
            return (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                  isSelected
                    ? "bg-champagne text-espresso-950 font-bold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.code}</span>
                </span>
                <span className="text-[11px] opacity-75 font-mono">{item.symbol}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
