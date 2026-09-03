"use client";

import { create } from "zustand";
import { products, Product } from "@/lib/data";

interface RecentlyViewedStore {
  viewedIds: string[];
  addViewed: (id: string) => void;
  clearViewed: () => void;
  getViewedProducts: () => Product[];
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>((set, get) => ({
  viewedIds: [],
  addViewed: (id: string) => {
    if (!id) return;
    const current = get().viewedIds;
    const updated = [id, ...current.filter((x) => x !== id)].slice(0, 8);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("apex-recently-viewed", JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    set({ viewedIds: updated });
  },
  clearViewed: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("apex-recently-viewed");
    }
    set({ viewedIds: [] });
  },
  getViewedProducts: () => {
    const ids = get().viewedIds;
    return ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  },
}));
