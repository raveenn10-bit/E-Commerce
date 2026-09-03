"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrencyStore, CURRENCIES, CurrencyCode } from "@/store/currency";
import { ChevronDown, Globe, Check } from "lucide-react";

interface CurrencySwitcherProps {
  compact?: boolean;
}

export default function CurrencySwitcher({ compact = false }: CurrencySwitcherProps) {
  const { currentCurrency, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selected = mounted ? (CURRENCIES[currentCurrency] || CURRENCIES.LKR) : CURRENCIES.LKR;

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
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm ${
          open
            ? "bg-champagne/15 text-champagne ring-2 ring-champagne border-champagne"
            : "bg-espresso-950/5 dark:bg-white/10 hover:bg-espresso-950/10 dark:hover:bg-white/15 text-espresso-950 dark:text-white border border-chocolate-200/80 dark:border-white/15"
        }`}
        title="Switch Display Currency"
        aria-label="Switch Display Currency"
      >
        <span className="text-sm leading-none drop-shadow-sm">{selected.flag}</span>
        <span className="tracking-wide uppercase font-mono">{selected.code}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-champagne" : "text-chocolate-400 dark:text-silver"
          }`}
        />
      </button>

      {/* Luxury Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 dark:bg-[#141E30]/95 backdrop-blur-2xl border border-chocolate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 overflow-hidden py-2 animate-fade-up">
          {/* Header */}
          <div className="px-3.5 py-2 border-b border-chocolate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-chocolate-600 dark:text-silver">
            <span className="flex items-center gap-1.5">
              <Globe size={13} className="text-champagne" /> Currency
            </span>
            <span className="text-[10px] text-chocolate-400 dark:text-silver/60">Live Rates</span>
          </div>

          {/* Currency List */}
          <div className="p-1 space-y-0.5">
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left ${
                    isSelected
                      ? "bg-champagne text-espresso-950 font-bold shadow-sm"
                      : "text-espresso-950 dark:text-white hover:bg-chocolate-50 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <span className="flex flex-col">
                      <span className="font-bold tracking-wide">{item.code}</span>
                      <span className={`text-[10px] ${isSelected ? "text-espresso-900/80" : "text-chocolate-400 dark:text-silver"}`}>
                        {item.name}
                      </span>
                    </span>
                  </span>

                  <span className="flex items-center gap-1.5 font-mono">
                    <span className="text-xs font-semibold">{item.symbol}</span>
                    {isSelected && <Check size={14} className="stroke-[2.5]" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
