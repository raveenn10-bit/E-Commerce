"use client";
import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/ui";
import { Search, X, TrendingUp, Clock, Package, ArrowRight } from "lucide-react";
import { products, categories, formatPrice } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/ui/Price";

const trendingSearches = [
  "Buldak Ramen",
  "Fanta Wild Cherry",
  "Gift Box",
  "Ferrero Rocher",
  "Coca-Cola",
  "Shin Ramyun",
];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim().toLowerCase();

  const matchingCategories = trimmed.length > 1
    ? categories.filter((c) => c.name.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const results = trimmed.length > 1
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed) ||
            p.category.toLowerCase().includes(trimmed) ||
            p.brand.toLowerCase().includes(trimmed) ||
            p.tags.some((t) => t.toLowerCase().includes(trimmed))
        )
        .slice(0, 7)
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    const stored = localStorage.getItem("sm-recent-searches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((r) => r !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("sm-recent-searches", JSON.stringify(updated));
    closeSearch();
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex flex-col justify-start pt-16 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso-950/80 dark:bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Search Panel (Navy Mirage & Light Silver Dark Theme ready) */}
      <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-[#141E30] text-espresso-950 dark:text-silver shadow-2xl rounded-3xl overflow-hidden border border-chocolate-100 dark:border-white/10 animate-fade-up max-h-[82vh] flex flex-col">
        {/* Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-chocolate-100 dark:border-white/10 bg-[#FAF6EF]/50 dark:bg-white/[0.03]">
          <Search size={22} className="text-champagne shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Search chocolates, Korean ramen, canned sodas, gift hampers..."
            className="flex-1 bg-transparent text-espresso-950 dark:text-white placeholder:text-chocolate-400 dark:placeholder-white/40 outline-none text-sm sm:text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-chocolate-400 hover:text-espresso-950 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-2 rounded-xl text-chocolate-500 dark:text-silver hover:bg-chocolate-100 dark:hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-wider"
          >
            Esc
          </button>
        </div>

        {/* Results / Suggestions Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4">
          {/* Live Matching Categories */}
          {matchingCategories.length > 0 && (
            <div>
              <p className="text-[11px] text-chocolate-400 dark:text-silver uppercase tracking-widest font-bold mb-2">
                Matching Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {matchingCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop/${cat.slug}`}
                    onClick={closeSearch}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne/15 text-champagne hover:bg-champagne hover:text-espresso-950 text-xs font-semibold transition-all border border-champagne/30"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75">({cat.productCount})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Live Matching Products */}
          {results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] text-chocolate-400 dark:text-silver uppercase tracking-widest font-bold">
                  Products ({results.length})
                </p>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => handleSearch(query)}
                  className="text-xs text-champagne hover:underline flex items-center gap-1 font-semibold"
                >
                  View all results <ArrowRight size={13} />
                </Link>
              </div>

              <div className="space-y-1.5">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => handleSearch(query)}
                    className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-chocolate-50 dark:hover:bg-white/[0.07] transition-all group border border-transparent hover:border-chocolate-100 dark:hover:border-white/10"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl bg-ivory dark:bg-white/5 overflow-hidden shrink-0 border border-chocolate-100 dark:border-white/10">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-espresso-950 dark:text-white truncate group-hover:text-champagne transition-colors">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-chocolate-500 dark:text-silver mt-0.5">
                        <span>{product.category}</span>
                        <span>•</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Price & Discount */}
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-champagne font-serif">
                        <Price amount={product.price} />
                      </p>
                      {product.originalPrice && (
                        <p className="text-[11px] text-chocolate-400 line-through">
                          <Price amount={product.originalPrice} />
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim().length > 1 ? (
            <div className="text-center py-10 space-y-2">
              <Search size={36} className="mx-auto text-chocolate-300 dark:text-silver/50" />
              <p className="text-sm font-semibold text-espresso-950 dark:text-white">
                No products found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-chocolate-500 dark:text-silver">
                Check your spelling or browse by category.
              </p>
            </div>
          ) : (
            <div className="space-y-6 pt-1">
              {/* Track Order Quick Shortcut */}
              <Link
                href="/track-order"
                onClick={closeSearch}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-espresso-950 to-chocolate-900 text-white hover:opacity-95 transition-all shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-champagne text-espresso-950 flex items-center justify-center font-bold">
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-champagne">
                      Need to track a delivery?
                    </p>
                    <p className="text-xs text-white/90">
                      Open Live Order Tracking with Order ID &rarr;
                    </p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-champagne" />
              </Link>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <p className="text-[11px] text-chocolate-400 dark:text-silver uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                    <Clock size={12} /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-full bg-chocolate-50 dark:bg-white/10 text-chocolate-700 dark:text-white text-xs font-medium hover:bg-champagne hover:text-espresso-950 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <p className="text-[11px] text-chocolate-400 dark:text-silver uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                  <TrendingUp size={12} /> Trending Right Now
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-3.5 py-1.5 rounded-full border border-chocolate-200 dark:border-white/15 text-chocolate-700 dark:text-silver text-xs font-medium hover:border-champagne hover:text-champagne transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
