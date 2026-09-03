"use client";

import { create } from "zustand";

export type CurrencyCode = "LKR" | "USD" | "EUR" | "GBP" | "AED" | "AUD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // 1 LKR in foreign currency
  flag: string;
  prefix: boolean;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  LKR: { code: "LKR", symbol: "Rs. ", name: "Sri Lankan Rupee", rate: 1, flag: "🇱🇰", prefix: true },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 0.0033, flag: "🇺🇸", prefix: true },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rate: 0.0031, flag: "🇪🇺", prefix: true },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rate: 0.0026, flag: "🇬🇧", prefix: true },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", rate: 0.0121, flag: "🇦🇪", prefix: true },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 0.0051, flag: "🇦🇺", prefix: true },
};

export function formatWithCurrency(amountInLkr: number, currency: CurrencyCode): string {
  const conf = CURRENCIES[currency] || CURRENCIES.LKR;
  const converted = amountInLkr * conf.rate;

  if (currency === "LKR") {
    return `Rs. ${Math.round(amountInLkr).toLocaleString("en-LK")}`;
  }

  return `${conf.symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface CurrencyStore {
  currentCurrency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInLkr: number) => string;
}

const getInitialCurrency = (): CurrencyCode => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("apex-currency") as CurrencyCode;
      if (saved && saved in CURRENCIES) {
        return saved;
      }
    } catch {
      // ignore
    }
  }
  return "LKR";
};

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currentCurrency: getInitialCurrency(),
  setCurrency: (code: CurrencyCode) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("apex-currency", code);
      } catch {
        // ignore
      }
    }
    set({ currentCurrency: code });
  },
  formatPrice: (amountInLkr: number) => {
    return formatWithCurrency(amountInLkr, get().currentCurrency);
  },
}));
