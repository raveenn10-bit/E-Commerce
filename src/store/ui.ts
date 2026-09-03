"use client";
import { create } from "zustand";

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

interface UIStore {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  theme: "light" | "dark";
  toasts: Toast[];
  openSearch: () => void;
  closeSearch: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  searchOpen: false,
  mobileNavOpen: false,
  theme: "light",
  toasts: [],

  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),

  toggleTheme: () => {
    const current = get().theme;
    const next = current === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("sweet-moon-theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    set({ theme: next });
  },

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sweet-moon-theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    set({ theme });
  },

  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    setTimeout(() => {
      get().removeToast(id);
    }, toast.duration ?? 3500);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
