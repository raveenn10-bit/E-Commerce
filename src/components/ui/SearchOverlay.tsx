"use client";
import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/ui";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";

const trendingSearches = [
  "Ferrero Rocher",
  "Buldak Ramen",
  "Gift Box",
  "Lindt",
  "Korean Snacks",
];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  useEffect(() => {
    const stored = localStorage.getItem("sm-recent-searches");
    if (stored) setRecentSearches(JSON.parse(stored));
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
    <div className="fixed inset-0 z-[150] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso-950/80 backdrop-blur-sm"
        onClick={closeSearch}
      />

      {/* Search Panel */}
      <div className="relative bg-ivory shadow-luxury-lg max-h-[80vh] flex flex-col m-4 md:m-8 lg:mx-auto lg:max-w-2xl rounded-2xl overflow-hidden animate-fade-up">
        {/* Input */}
        <div className="flex items-center gap-3 p-4 border-b border-chocolate-100">
          <Search size={20} className="text-champagne flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Search for chocolates, ramen, drinks..."
            className="flex-1 bg-transparent text-espresso-950 placeholder:text-chocolate-400 outline-none text-base"
          />
          <button onClick={closeSearch} className="p-1 hover:text-champagne transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 p-4">
          {results.length > 0 ? (
            <div>
              <p className="text-xs text-chocolate-500 uppercase tracking-widest mb-3 font-semibold">
                Products
              </p>
              <div className="space-y-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => { handleSearch(query); }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-chocolate-50 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-espresso-950 truncate">{product.name}</p>
                      <p className="text-xs text-chocolate-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-semibold text-champagne flex-shrink-0">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.length > 1 ? (
            <div className="text-center py-8">
              <Search size={40} className="mx-auto text-chocolate-200 mb-3" />
              <p className="text-chocolate-500">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-chocolate-400 mt-1">Try searching for a different product</p>
            </div>
          ) : (
            <div className="space-y-5">
              {recentSearches.length > 0 && (
                <div>
                  <p className="text-xs text-chocolate-500 uppercase tracking-widest mb-3 font-semibold flex items-center gap-2">
                    <Clock size={12} /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setQuery(s); }}
                        className="px-3 py-1.5 rounded-full bg-chocolate-50 text-chocolate-700 text-sm hover:bg-champagne/20 hover:text-espresso-950 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-chocolate-500 uppercase tracking-widest mb-3 font-semibold flex items-center gap-2">
                  <TrendingUp size={12} /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 rounded-full border border-chocolate-200 text-chocolate-700 text-sm hover:border-champagne hover:text-champagne transition-colors"
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
