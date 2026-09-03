"use client";

import { useCompareStore } from "@/store/compare";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { products, Product } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  ShoppingCart,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Plus,
  ArrowRight,
} from "lucide-react";
import Price from "@/components/ui/Price";

export default function ComparePage() {
  const { items, removeItem, clear, addItem } = useCompareStore();
  const addCartItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const handleAddToCart = (product: Product) => {
    addCartItem(product, 1);
    addToast({
      type: "success",
      message: `${product.name} added to cart! 🛒`,
    });
  };

  const addSample = (p1Id: string, p2Id: string) => {
    const p1 = products.find((p) => p.id === p1Id);
    const p2 = products.find((p) => p.id === p2Id);
    if (p1) addItem(p1);
    if (p2) addItem(p2);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] dark:bg-[#141E30] transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-chocolate-200 dark:border-white/10 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-champagne bg-white dark:bg-white/10 border border-champagne/30 uppercase shadow-sm mb-2">
              <ArrowLeftRight size={13} /> Side-by-Side Analysis
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 dark:text-white">
              Product <span className="text-champagne">Comparison</span>
            </h1>
            <p className="text-xs sm:text-sm text-chocolate-700 dark:text-silver mt-1">
              Compare taste, origins, pack weight, and prices to make the sweetest choice.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clear}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-white/10 text-chocolate-600 dark:text-silver hover:text-red-500 text-xs font-semibold transition-colors border border-chocolate-200 dark:border-white/10 self-start sm:self-center"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {/* Comparison Table / Grid */}
        {items.length === 0 ? (
          <div className="bg-white dark:bg-[#1D2C44] rounded-3xl p-10 sm:p-14 text-center shadow-luxury border border-chocolate-100 dark:border-white/10 space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-champagne/15 text-champagne flex items-center justify-center mx-auto">
              <ArrowLeftRight size={28} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-espresso-950 dark:text-white">
              Your Comparison List is Empty
            </h2>
            <p className="text-xs sm:text-sm text-chocolate-600 dark:text-silver leading-relaxed">
              Add up to 4 chocolates, spicy Korean noodles, or exotic beverages to view their ingredients, origins, and prices side-by-side.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/shop" className="btn-primary py-2.5 px-6 text-xs w-full sm:w-auto">
                Explore All Products
              </Link>
              <button
                onClick={() => addSample("1", "2")}
                className="btn-secondary py-2.5 px-6 text-xs w-full sm:w-auto"
              >
                Compare Ferrero vs Lindt
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1D2C44] rounded-3xl shadow-luxury border border-chocolate-100 dark:border-white/10 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm">
              <tbody>
                {/* 1. Product Image & Title */}
                <tr className="border-b border-chocolate-100 dark:border-white/10">
                  <td className="p-4 sm:p-6 w-48 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Product
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6 align-top">
                      <div className="space-y-3">
                        <div className="relative aspect-square w-full max-w-[180px] mx-auto rounded-2xl overflow-hidden bg-ivory dark:bg-white/5 border border-chocolate-100 dark:border-white/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-chocolate-400 dark:text-silver uppercase font-bold tracking-widest">
                            {item.brand}
                          </p>
                          <h3 className="font-bold text-espresso-950 dark:text-white line-clamp-2 text-sm mt-0.5">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-full text-center text-[11px] text-red-500 hover:underline flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </td>
                  ))}
                  {/* Fill empty comparison slots if < 4 */}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} className="p-4 sm:p-6 align-middle text-center opacity-40">
                      <Link
                        href="/shop"
                        className="border-2 border-dashed border-chocolate-300 dark:border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:opacity-100 transition-opacity"
                      >
                        <Plus size={20} className="text-champagne" />
                        <span className="text-xs font-semibold">Add Item</span>
                      </Link>
                    </td>
                  ))}
                </tr>

                {/* 2. Price */}
                <tr className="border-b border-chocolate-100 dark:border-white/10">
                  <td className="p-4 sm:p-6 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Price
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6">
                      <div className="font-serif text-lg font-bold text-champagne">
                        <Price amount={item.price} />
                      </div>
                      {item.originalPrice && (
                        <p className="text-xs text-chocolate-400 line-through">
                          <Price amount={item.originalPrice} />
                        </p>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} />
                  ))}
                </tr>

                {/* 3. Category */}
                <tr className="border-b border-chocolate-100 dark:border-white/10">
                  <td className="p-4 sm:p-6 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Category
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6 text-chocolate-700 dark:text-silver font-medium">
                      {item.category}
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} />
                  ))}
                </tr>

                {/* 4. Origin & Weight */}
                <tr className="border-b border-chocolate-100 dark:border-white/10">
                  <td className="p-4 sm:p-6 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Origin & Weight
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6 text-chocolate-700 dark:text-silver">
                      <p className="font-semibold">{item.origin || "Imported"}</p>
                      <p className="text-xs text-chocolate-400">{item.weight || "Standard Pack"}</p>
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} />
                  ))}
                </tr>

                {/* 5. Rating */}
                <tr className="border-b border-chocolate-100 dark:border-white/10">
                  <td className="p-4 sm:p-6 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Rating
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6">
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="font-bold text-espresso-950 dark:text-white">
                          {item.rating}
                        </span>
                        <span className="text-xs text-chocolate-400">
                          ({item.reviewCount} reviews)
                        </span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} />
                  ))}
                </tr>

                {/* 6. Availability */}
                <tr className="border-b border-chocolate-100 dark:border-white/10">
                  <td className="p-4 sm:p-6 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Stock Status
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6">
                      {item.inStock ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-xs">
                          <CheckCircle2 size={14} /> In Stock ({item.stockCount} left)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-500 font-semibold text-xs">
                          <XCircle size={14} /> Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} />
                  ))}
                </tr>

                {/* 7. Action CTA */}
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] bg-[#FAF6EF]/40 dark:bg-white/[0.02]">
                    Purchase
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 sm:p-6">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                        className="w-full py-2.5 px-4 rounded-xl bg-espresso-950 hover:bg-champagne hover:text-espresso-950 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={i} />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
