"use client";

import { useCurrencyStore, formatWithCurrency, CURRENCIES, CurrencyCode } from "@/store/currency";
import { useEffect, useState } from "react";

interface PriceProps {
  amount: number;
  className?: string;
}

export default function Price({ amount, className = "" }: PriceProps) {
  const currentCurrency = useCurrencyStore((s) => s.currentCurrency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("apex-currency") as CurrencyCode;
      if (saved && saved in CURRENCIES) {
        setCurrency(saved);
      }
    } catch {
      // ignore
    }
  }, [setCurrency]);

  if (!mounted) {
    return <span className={className}>{formatWithCurrency(amount, "LKR")}</span>;
  }

  return <span className={className}>{formatWithCurrency(amount, currentCurrency)}</span>;
}
