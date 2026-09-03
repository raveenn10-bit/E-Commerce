"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 bg-[#FAF6EF]/50 dark:bg-white/[0.02] transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Handpicked
            </p>
            <h2
              className="section-heading dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[#C9A84C] text-sm font-medium hover:underline flex items-center gap-1 shrink-0 mb-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            View All Products →
          </Link>
        </div>

        {/* Scrollable row */}
        <div
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featured.map((product) => (
            <div
              key={product.id}
              className="min-w-[240px] sm:min-w-[260px] max-w-[280px] snap-start shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}