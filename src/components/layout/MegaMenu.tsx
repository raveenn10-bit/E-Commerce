"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { categories } from "@/lib/data";

interface MegaMenuProps {
  type: "categories" | "gift-boxes";
}

const giftBoxOptions = [
  {
    name: "Classic Gift Box",
    slug: "sweet-moon-classic-gift-box",
    description: "Curated premium chocolates — perfect for birthdays & celebrations",
    price: "From Rs. 4,500",
    badge: "Bestseller",
    icon: "🎁",
    color: "from-champagne/10 to-transparent",
  },
  {
    name: "Luxury Hamper",
    slug: "sweet-moon-luxury-hamper",
    description: "Ultimate luxury hamper with premium treats in gold packaging",
    price: "From Rs. 8,950",
    badge: "New",
    icon: "✨",
    color: "from-blush/20 to-transparent",
  },
  {
    name: "Korean Lover Box",
    slug: "sweet-moon-korean-lover-box",
    description: "For the K-food enthusiast — ramen, snacks & Korean treats",
    price: "From Rs. 3,950",
    badge: "Popular",
    icon: "🍜",
    color: "from-red-50 to-transparent",
  },
  {
    name: "Custom Gift Box",
    slug: "gift-boxes",
    description: "Build your own box — personalise with your favourite items",
    price: "Custom Price",
    badge: "Customize",
    icon: "🎨",
    color: "from-purple-50 to-transparent",
  },
];

export default function MegaMenu({ type }: MegaMenuProps) {
  if (type === "categories") {
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white shadow-luxury-lg rounded-2xl border border-chocolate-100 z-50 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 translate-y-2 transition-all duration-300 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-chocolate-100">
          <div>
            <p className="section-subheading mb-0.5">Browse By</p>
            <h3 className="font-serif text-xl font-bold text-espresso-950">
              All Categories
            </h3>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-champagne hover:text-champagne-dark text-sm font-medium transition-colors"
          >
            View All Products
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3×2 Category Grid */}
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-ivory border border-transparent hover:border-champagne/30 transition-all duration-200"
            >
              {/* Category Image */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-card group-hover:shadow-card-hover transition-shadow">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="56px"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40`}
                />
              </div>
              {/* Info */}
              <div className="min-w-0">
                <p className="font-semibold text-espresso-950 text-sm group-hover:text-champagne-dark transition-colors truncate">
                  {cat.name}
                </p>
                <p className="text-xs text-chocolate-400 mt-0.5">
                  {cat.productCount} products
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Banner */}
        <div className="mt-4 pt-4 border-t border-chocolate-100 flex items-center justify-between bg-gradient-to-r from-espresso-950 to-chocolate-800 rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-champagne fill-champagne" />
            <span className="text-white text-xs font-medium">
              Free delivery on orders above Rs. 5,000
            </span>
          </div>
          <Link href="/shop" className="btn-primary py-1.5 px-4 text-xs">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  // Gift Boxes menu
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-2xl bg-white shadow-luxury-lg rounded-2xl border border-chocolate-100 z-50 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 translate-y-2 transition-all duration-300 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-chocolate-100">
        <div>
          <p className="section-subheading mb-0.5">Sweet Surprises</p>
          <h3 className="font-serif text-xl font-bold text-espresso-950">
            Gift Boxes & Hampers
          </h3>
        </div>
        <Link
          href="/shop/gift-boxes"
          className="flex items-center gap-1.5 text-champagne hover:text-champagne-dark text-sm font-medium transition-colors"
        >
          All Gift Boxes
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Gift Box Options — 2×2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {giftBoxOptions.map((box) => (
          <Link
            key={box.slug}
            href={`/shop/${box.slug}`}
            className={`group relative p-4 rounded-xl border border-champagne/20 bg-gradient-to-br ${box.color} hover:border-champagne/50 hover:shadow-luxury transition-all duration-200`}
          >
            {/* Badge */}
            <span className="absolute top-3 right-3 text-xs font-semibold text-champagne-dark bg-champagne/10 px-2 py-0.5 rounded-full border border-champagne/20">
              {box.badge}
            </span>

            <div className="text-2xl mb-2">{box.icon}</div>
            <h4 className="font-serif font-bold text-espresso-950 text-sm group-hover:text-champagne-dark transition-colors mb-1">
              {box.name}
            </h4>
            <p className="text-xs text-chocolate-500 leading-relaxed mb-2">
              {box.description}
            </p>
            <p className="text-xs font-semibold text-champagne">{box.price}</p>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-4 pt-3 border-t border-chocolate-100 flex items-center gap-2 text-xs text-chocolate-400">
        <Sparkles size={13} className="text-champagne shrink-0" />
        <span>
          All gift boxes include complimentary ribbon wrapping & a greeting card
        </span>
      </div>
    </div>
  );
}
