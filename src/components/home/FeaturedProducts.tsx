"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { getFeaturedProducts, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import type { Product } from "@/lib/data";

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) =>
    s.items.some((i) => i.id === product.id)
  );

  return (
    <div className="card-luxury group flex flex-col min-w-[220px] sm:min-w-[240px] snap-start shrink-0 w-[220px] sm:w-[240px]">
      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="240px"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="badge-new">New</span>
          )}
          {product.isBestSeller && (
            <span className="badge-bestseller">Best Seller</span>
          )}
          {product.discount && (
            <span className="badge-discount">-{product.discount}%</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 shadow transition-colors duration-200 ${
            isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-1">
        <p
          className="text-[#C9A84C] text-xs mb-0.5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3
            className="text-[#1a0a00] font-semibold text-sm leading-snug mb-2 line-clamp-2 hover:text-[#C9A84C] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(product.rating)
                    ? "text-[#C9A84C]"
                    : "text-gray-200"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-400 text-xs">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span
            className="text-[#1a0a00] font-bold text-base"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addItem(product, 1)}
          className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={13} />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 bg-white">
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
              className="section-heading"
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
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}