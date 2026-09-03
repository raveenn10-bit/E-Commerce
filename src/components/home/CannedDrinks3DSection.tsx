"use client";

import Link from "next/link";
import { products } from "@/lib/data";
import Can3DViewer from "@/components/product/Can3DViewer";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CannedDrinks3DSection() {
  const cannedDrinks = products
    .filter((p) => p.categorySlug === "canned-drinks")
    .slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#FAF6EF] via-white to-[#FAF6EF] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-champagne/20 text-espresso-950 font-semibold text-xs tracking-wider uppercase mb-2">
              <Sparkles size={12} className="text-champagne-dark" /> 3D Interactive Showcase
            </div>
            <h2 className="section-heading">CANNED DRINKS COLLECTION</h2>
            <p className="text-xs sm:text-sm text-chocolate-600 max-w-xl mt-1">
              Hover and tilt to explore our rare imported sodas, fruit infusions, and viral beverages in real-time 3D view.
            </p>
          </div>

          <Link
            href="/canned-drinks"
            className="inline-flex items-center gap-2 text-espresso-950 font-bold text-sm hover:text-champagne transition-colors"
          >
            Explore All 3D Cans <ArrowRight size={16} />
          </Link>
        </div>

        {/* 3D Cans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cannedDrinks.map((can) => (
            <Link key={can.id} href={`/product/${can.slug}`} className="block">
              <Can3DViewer product={can} interactive={true} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
