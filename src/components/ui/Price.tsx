"use client";

import { useCurrencyStore, formatWithCurrency } from "@/store/currency";
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
    const saved = localStorage.getItem("apex-currency");
    if (saved && (saved in useCurrencyStore.getState())) {
      setCurrency(saved as any);
    }
  }, [setCurrency]);

  if (!mounted) {
    return <span className={className}>{formatWithCurrency(amount, "LKR")}</span>;
  }

  return <span className={className}>{formatWithCurrency(amount, currentCurrency)}</span>;
}
