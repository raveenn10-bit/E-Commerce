"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import ProductCard from "@/components/product/ProductCard";
import { Heart, ShoppingBag, ChevronLeft } from "lucide-react";

export default function AccountWishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link
              href="/account"
              className="text-xs text-chocolate-500 hover:text-champagne inline-flex items-center gap-1 mb-2"
            >
              <ChevronLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="font-serif text-3xl font-bold text-espresso-950 flex items-center gap-3">
              My Wishlist
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-champagne text-espresso-950 font-semibold">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              Clear All Wishlist
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card-luxury p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-champagne/10 text-champagne flex items-center justify-center mx-auto">
              <Heart size={32} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-espresso-950">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-chocolate-600 leading-relaxed">
              Explore our luxury collection of imported chocolates, gift boxes, and treats, and save your favorites here.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={16} /> Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
