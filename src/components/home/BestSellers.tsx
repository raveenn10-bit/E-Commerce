"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { getBestSellers, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/data";

function BestSellerCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col items-center gap-2 snap-start shrink-0 w-[150px] sm:w-[165px]">
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-xl bg-gray-50" style={{ height: "150px" }}>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="165px"
          />
        </Link>
        {product.discount && (
          <div className="absolute top-2 left-2">
            <span className="badge-discount">-{product.discount}%</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="w-full text-center px-1">
        <Link href={`/product/${product.slug}`}>
          <p
            className="text-[#1a0a00] font-semibold text-xs leading-snug line-clamp-2 hover:text-[#C9A84C] transition-colors mb-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {product.name}
          </p>
        </Link>
        <p
          className="text-[#1a0a00] font-bold text-sm mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatPrice(product.price)}
        </p>
        <button
          onClick={() => addItem(product, 1)}
          className="w-full flex items-center justify-center gap-1 bg-[#1a0a00] hover:bg-[#C9A84C] text-white text-[10px] font-semibold py-1.5 px-2 rounded-lg transition-colors duration-200"
          style={{ fontFamily: "Inter, sans-serif" }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={11} />
          ADD
        </button>
      </div>
    </div>
  );
}

export default function BestSellers() {
  const bestSellers = getBestSellers();

  return (
    <section className="py-16 bg-[#FAF6EF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Top Picks
            </p>
            <h2
              className="section-heading"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Best Selling Products
            </h2>
          </div>
          <Link
            href="/shop?filter=bestseller"
            className="text-[#C9A84C] text-sm font-medium hover:underline flex items-center gap-1 shrink-0 mb-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            View All →
          </Link>
        </div>

        {/* Scrollable row */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bestSellers.map((product) => (
            <BestSellerCard key={product.id} product={product} />
          ))}
        </div>

        {/* Scroll hint dots */}
        <div className="flex justify-center mt-4 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === 0 ? "w-5 bg-[#C9A84C]" : "w-1.5 bg-[#C9A84C]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}