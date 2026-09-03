"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";

export default function CategorySection() {
  return (
    <section className="py-16 bg-[#FAF6EF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Browse
            </p>
            <h2
              className="section-heading"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[#C9A84C] text-sm font-medium hover:underline flex items-center gap-1 shrink-0 mb-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            View All Categories →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.slug === "canned-drinks" ? "/canned-drinks" : `/shop/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer block bg-espresso-950 shadow-sm hover:shadow-luxury transition-all duration-300"
            >
              <div
                className="relative overflow-hidden bg-espresso-900"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className={`${
                    cat.slug === "canned-drinks"
                      ? "object-contain p-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
                      : "object-cover transition-transform duration-500 group-hover:scale-105"
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00]/90 via-[#1a0a00]/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3
                    className="text-white font-bold text-sm sm:text-base leading-tight mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="text-[#C9A84C] text-xs"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {cat.productCount} products
                  </p>
                </div>

                {/* Hover lift shadow */}
                <div className="absolute inset-0 shadow-[inset_0_0_0_2px_rgba(201,168,76,0)] group-hover:shadow-[inset_0_0_0_2px_rgba(201,168,76,0.6)] transition-all duration-300 rounded-2xl" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}