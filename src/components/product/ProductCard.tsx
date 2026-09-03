"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { type Product, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";

interface ProductCardProps {
  product: Product;
  className?: string;
  compact?: boolean;
}

export default function ProductCard({ product, className = "", compact = false }: ProductCardProps) {
  const [heartBounce, setHeartBounce] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const addToast = useUIStore((s) => s.addToast);

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setHeartBounce(true);
      toggleItem(product);
      addToast({
        type: "info",
        message: inWishlist
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist ❤️`,
      });
      setTimeout(() => setHeartBounce(false), 600);
    },
    [toggleItem, addToast, inWishlist, product]
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product, 1);
      addToast({
        type: "success",
        message: `${product.name} added to cart 🛒`,
      });
    },
    [addItem, addToast, product]
  );

  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  }, []);

  // Render stars
  function Stars({ rating }: { rating: number }) {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={compact ? 10 : 12}
            className={
              star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  }

  const imageAspect = compact ? "aspect-[4/3]" : "aspect-square";
  const padding = compact ? "p-3" : "p-4";
  const isCannedDrink = product.categorySlug === "canned-drinks";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Link
          href={`/product/${product.slug}`}
          className={`group relative bg-white dark:bg-[#1D2C44] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 flex flex-col transition-all duration-300 hover:shadow-luxury h-full ${className}`}
        >
          {/* ── Image area ──────────────────────────────────────── */}
          <div className={`relative ${imageAspect} overflow-hidden ${isCannedDrink ? "bg-gradient-to-b from-white to-[#FAF6EF]" : "bg-ivory"}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`${
                isCannedDrink
                  ? "object-contain p-3 drop-shadow-[0_12px_14px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                  : "object-cover transition-transform duration-500 group-hover:scale-105"
              }`}
            />

          {/* ── Badges top-left ─────────────────────────────── */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
            {isCannedDrink && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-espresso-950 text-champagne shadow">
                3D CAN
              </span>
            )}
            {product.discount && (
              <span className="badge-discount text-xs font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="badge-new text-xs font-bold px-2 py-0.5 rounded-full bg-champagne text-espresso shadow">
                NEW
              </span>
            )}
            {product.isBestSeller && !product.isNew && (
              <span className="badge-bestseller text-xs font-bold px-2 py-0.5 rounded-full bg-espresso text-ivory shadow">
                BESTSELLER
              </span>
            )}
          </div>

          {/* ── Wishlist heart top-right ─────────────────────── */}
          <button
            onClick={handleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow transition-transform focus:outline-none ${
              heartBounce ? "animate-bounce" : ""
            } hover:scale-110`}
          >
            <Heart
              size={16}
              className={`transition-colors duration-200 ${
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          {/* ── Quick View overlay (slides up on hover) ──────── */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3 bg-gradient-to-t from-espresso/80 to-transparent z-10">
            <button
              onClick={handleQuickView}
              className="w-full flex items-center justify-center gap-2 bg-white/95 text-espresso font-semibold text-xs py-2 rounded-xl hover:bg-white transition-colors"
            >
              <Eye size={14} />
              Quick View
            </button>
          </div>
        </div>

        {/* ── Card body ───────────────────────────────────────── */}
        <div className={`${padding} flex flex-col gap-2 flex-1`}>
          {/* Category */}
          <span
            className={`text-champagne font-medium uppercase tracking-wider ${
              compact ? "text-[10px]" : "text-xs"
            }`}
          >
            {product.category}
          </span>

          {/* Product name */}
          <h3
            className={`font-semibold text-espresso leading-snug line-clamp-2 ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className={`text-gray-500 ${compact ? "text-[10px]" : "text-xs"}`}>
              {product.rating.toFixed(1)}{" "}
              <span className="text-gray-400">({product.reviewCount})</span>
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span
              className={`font-bold text-espresso ${compact ? "text-base" : "text-lg"}`}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className={`text-gray-400 line-through ${compact ? "text-xs" : "text-sm"}`}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          {!product.inStock ? (
            <button
              disabled
              className="w-full mt-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`btn-primary w-full mt-1 flex items-center justify-center gap-2 ${
                compact ? "py-2 text-xs" : "py-2.5 text-sm"
              } rounded-xl font-semibold transition-all duration-200 active:scale-95`}
            >
              <ShoppingCart size={compact ? 13 : 15} />
              Add to Cart
            </button>
          )}
        </div>
      </Link>
      </motion.div>

      {/* ── Quick View Modal (lazy-loaded inline to avoid circular deps) ── */}
      {quickViewOpen && (
        <QuickViewInline
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Inline quick-view trigger so ProductCard doesn't import QuickView
   (which itself imports ProductCard) — prevents circular deps.
   The real QuickView component is used on detail pages; this uses
   a dynamic import to keep bundles clean.
   ─────────────────────────────────────────────────────────────────*/
import dynamic from "next/dynamic";
const QuickView = dynamic(() => import("@/components/product/QuickView"), { ssr: false });

function QuickViewInline({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return <QuickView product={product} onClose={onClose} />;
}
