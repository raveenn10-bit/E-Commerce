"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { type Product, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [heartBounce, setHeartBounce] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const addToast = useUIStore((s) => s.addToast);

  const inWishlist = product ? isInWishlist(product.id) : false;

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedImageIndex(0);
  }, [product?.id]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
    addToast({
      type: "success",
      message: `${quantity}× ${product.name} added to cart 🛒`,
    });
    onClose();
  }, [product, quantity, addItem, addToast, onClose]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    setHeartBounce(true);
    toggleItem(product);
    addToast({
      type: "info",
      message: inWishlist
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist ❤️`,
    });
    setTimeout(() => setHeartBounce(false), 600);
  }, [product, toggleItem, addToast, inWishlist]);

  const handleWhatsApp = useCallback(() => {
    if (!product) return;
    const text = encodeURIComponent(
      `Hi Sweet Moon! 🍫\nI'd like to order:\n• ${product.name} (x${quantity})\nPrice: ${formatPrice(product.price * quantity)}\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/94XXXXXXXXX?text=${text}`, "_blank");
  }, [product, quantity]);

  const images = product?.images ?? [];
  const mainImage = images[selectedImageIndex] ?? product?.image ?? "";
  const hasPrev = selectedImageIndex > 0;
  const hasNext = selectedImageIndex < images.length - 1;

  function Stars({ rating }: { rating: number }) {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* ── Backdrop ─────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-espresso/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* ── Modal card ───────────────────────────────────── */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal
            aria-label={`Quick view: ${product.name}`}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-espresso transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* ── Left: Image Gallery ───────────────────── */}
                <div className="relative bg-ivory rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                  {/* Main image */}
                  <div className="relative aspect-square w-full">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />

                    {/* Discount badge */}
                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        -{product.discount}%
                      </span>
                    )}

                    {/* Prev / Next arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex((i) => Math.max(0, i - 1))}
                          disabled={!hasPrev}
                          aria-label="Previous image"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow disabled:opacity-30 transition"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((i) => Math.min(images.length - 1, i + 1))
                          }
                          disabled={!hasNext}
                          aria-label="Next image"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow disabled:opacity-30 transition"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex gap-2 p-3 justify-center overflow-x-auto">
                      {images.map((src, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          aria-label={`Image ${idx + 1}`}
                          className={`relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === selectedImageIndex
                              ? "border-champagne scale-105 shadow"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Right: Product info ───────────────────── */}
                <div className="p-6 md:p-7 flex flex-col gap-4">
                  {/* Category */}
                  <span className="text-champagne font-semibold text-xs uppercase tracking-widest">
                    {product.category}
                  </span>

                  {/* Name */}
                  <h2 className="font-playfair text-2xl font-bold text-espresso leading-snug">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Stars rating={product.rating} />
                    <span className="text-xs text-gray-500">
                      {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-espresso">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-sm font-semibold text-green-600">
                        Save {product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Short description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                    {product.origin && (
                      <span>
                        🌍 <strong className="text-espresso">Origin:</strong> {product.origin}
                      </span>
                    )}
                    {product.weight && (
                      <span>
                        ⚖️ <strong className="text-espresso">Weight:</strong> {product.weight}
                      </span>
                    )}
                    <span>
                      📦 <strong className="text-espresso">SKU:</strong> {product.sku}
                    </span>
                  </div>

                  {/* Stock badge */}
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      In Stock — {product.stockCount} available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full w-fit">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Out of Stock
                    </span>
                  )}

                  {/* Quantity selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-espresso">Qty:</span>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 flex items-center justify-center text-espresso hover:bg-gray-100 transition-colors disabled:opacity-40"
                        disabled={quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-espresso tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.min(q + 1, product.stockCount))
                        }
                        aria-label="Increase quantity"
                        className="w-9 h-9 flex items-center justify-center text-espresso hover:bg-gray-100 transition-colors disabled:opacity-40"
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-400">
                      = {formatPrice(product.price * quantity)}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3 mt-auto pt-2">
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>

                    <div className="flex gap-3">
                      {/* WhatsApp order */}
                      <button
                        onClick={handleWhatsApp}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-3 rounded-xl transition-all active:scale-95"
                      >
                        <MessageCircle size={15} />
                        WhatsApp Order
                      </button>

                      {/* Wishlist */}
                      <button
                        onClick={handleWishlist}
                        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        className={`w-12 flex items-center justify-center rounded-xl border-2 transition-all active:scale-95 ${
                          heartBounce ? "animate-bounce" : ""
                        } ${
                          inWishlist
                            ? "border-red-300 bg-red-50 text-red-500"
                            : "border-gray-200 bg-gray-50 text-gray-400 hover:border-red-300 hover:text-red-400"
                        }`}
                      >
                        <Heart
                          size={18}
                          className={inWishlist ? "fill-red-500" : ""}
                        />
                      </button>
                    </div>

                    {/* View full page link */}
                    <a
                      href={`/product/${product.slug}`}
                      className="flex items-center justify-center gap-1.5 text-xs text-champagne hover:text-champagne/80 font-medium transition-colors"
                      onClick={onClose}
                    >
                      <ExternalLink size={12} />
                      View full product page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
