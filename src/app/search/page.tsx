"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { Search as SearchIcon } from "lucide-react";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="bg-ivory min-h-screen">
      <section className="bg-espresso-950 py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            Search Results
          </h1>
          {query ? (
            <p className="text-chocolate-200 text-sm">
              Showing results for <span className="text-champagne font-semibold">&ldquo;{query}&rdquo;</span>
            </p>
          ) : (
            <p className="text-chocolate-200 text-sm">Type a search query to discover products</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {results.length > 0 ? (
          <div>
            <p className="text-xs text-chocolate-500 mb-6">
              Found {results.length} matching {results.length === 1 ? "product" : "products"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl p-8 border border-chocolate-100 max-w-xl mx-auto">
            <SearchIcon size={48} className="text-chocolate-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-2">
              No products found
            </h2>
            <p className="text-xs text-chocolate-600 mb-6 leading-relaxed">
              We couldn&apos;t find any items matching &ldquo;{query}&rdquo;. Try checking your spelling or searching for chocolates, ramen, or gift boxes.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center p-8 text-chocolate-500">
          Loading search results...
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
