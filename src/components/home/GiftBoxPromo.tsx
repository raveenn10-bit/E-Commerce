"use client";

import Link from "next/link";
import Image from "next/image";

const benefits = [
  { icon: "🎁", label: "Choose Products" },
  { icon: "💌", label: "Add Personal Touch" },
  { icon: "🎀", label: "Beautiful Packaging" },
  { icon: "🚚", label: "Fast Delivery" },
];

export default function GiftBoxPromo() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#FAF6EF] to-[#F2E8D0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Image */}
          <div className="relative">
            {/* Decorative background circle */}
            <div
              className="absolute -top-6 -left-6 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)" }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[5/4]">
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=400&fit=crop"
                alt="Custom gift box with chocolates and treats"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00]/20 to-transparent" />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 bg-[#C9A84C] text-[#1a0a00] rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                100% Customisable
              </p>
              <p className="text-lg font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Way ✦
              </p>
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="space-y-6">
            <div>
              <p
                className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Make It Extra Special
              </p>
              <h2
                className="text-[#1a0a00] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                BUILD YOUR<br />
                <span className="text-[#C9A84C]">CUSTOM</span> GIFT BOX
              </h2>
              <p
                className="text-gray-600 text-base leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Create a one-of-a-kind gift box filled with the treats they love most.
                Choose from our premium selection of chocolates, snacks, and imported
                goodies — all beautifully packaged with a personal touch.
              </p>
            </div>

            {/* CTA */}
            <div>
              <Link
                href="/gift-boxes/builder"
                className="btn-primary inline-flex items-center gap-2 text-base"
              >
                🎁 START BUILDING
              </Link>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex flex-col items-center text-center gap-2 p-3 bg-white/60 rounded-2xl border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-colors duration-200"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <p
                    className="text-[#1a0a00] text-xs font-semibold leading-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}