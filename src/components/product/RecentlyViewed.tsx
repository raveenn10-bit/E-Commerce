"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Trash2, ArrowRight } from "lucide-react";
import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import { products, Product } from "@/lib/data";
import Price from "@/components/ui/Price";

export default function RecentlyViewed() {
  const [items, setItems] = useState<Product[]>([]);
  const clearViewed = useRecentlyViewedStore((s) => s.clearViewed);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("apex-recently-viewed");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const resolved = ids
          .map((id) => products.find((p) => p.id === id))
          .filter((p): p is Product => Boolean(p));
        setItems(resolved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClear = () => {
    clearViewed();
    setItems([]);
  };

  if (items.length === 0) return null;

  return (
    <section className="py-10 bg-[#FAF6EF]/60 dark:bg-white/[0.02] border-t border-chocolate-100 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-champagne/15 text-champagne flex items-center justify-center">
              <Clock size={16} />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso-950 dark:text-white">
                Recently Viewed Products
              </h3>
              <p className="text-xs text-chocolate-500 dark:text-silver">
                Pick up right where you left off
              </p>
            </div>
          </div>

          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1 text-xs text-chocolate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Clear recently viewed history"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Clear History</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="group bg-white dark:bg-[#1D2C44] rounded-2xl p-3 border border-chocolate-100 dark:border-white/10 shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-ivory dark:bg-white/5 mb-2.5">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="text-[11px] text-chocolate-400 dark:text-silver uppercase tracking-wider font-semibold truncate">
                  {item.category}
                </p>
                <h4 className="text-xs font-bold text-espresso-950 dark:text-white line-clamp-1 group-hover:text-champagne transition-colors mt-0.5">
                  {item.name}
                </h4>
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-xs font-serif font-bold text-champagne">
                    <Price amount={item.price} />
                  </p>
                  <ArrowRight
                    size={13}
                    className="text-chocolate-400 group-hover:text-champagne group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
