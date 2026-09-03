"use client";

import { create } from "zustand";
import { Product } from "@/lib/data";

interface CompareStore {
  items: Product[];
  addItem: (product: Product) => boolean;
  removeItem: (id: string) => void;
  clear: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],
  addItem: (product: Product) => {
    const current = get().items;
    if (current.some((p) => p.id === product.id)) {
      return false;
    }
    if (current.length >= 4) {
      return false; // Max 4 items
    }
    const updated = [...current, product];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("apex-compare", JSON.stringify(updated.map((p) => p.id)));
      } catch {
        // ignore
      }
    }
    set({ items: updated });
    return true;
  },
  removeItem: (id: string) => {
    const updated = get().items.filter((p) => p.id !== id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("apex-compare", JSON.stringify(updated.map((p) => p.id)));
      } catch {
        // ignore
      }
    }
    set({ items: updated });
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("apex-compare");
    }
    set({ items: [] });
  },
  isInCompare: (id: string) => {
    return get().items.some((p) => p.id === id);
  },
}));
