"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Gift, Heart, Package, Truck } from "lucide-react";

const benefits = [
  { icon: Gift, label: "Choose Products" },
  { icon: Heart, label: "Add Personal Touch" },
  { icon: Package, label: "Beautiful Packaging" },
  { icon: Truck, label: "Fast Delivery" },
];

export default function GiftBoxPromo() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAF6EF] via-[#F5EEDF] to-[#FAF6EF] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT — 3D FLOATING LUXURY HAMPER WITH DEPTH EFFECT (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Ambient Radial Lighting Ring */}
            <div
              className="absolute w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] rounded-full pointer-events-none blur-[90px] opacity-40"
              style={{
                background: "radial-gradient(circle, #FFD3B6 0%, #C9A84C 50%, transparent 70%)",
              }}
            />

            {/* Transparent Floating Hamper */}
            <div className="relative w-[300px] sm:w-[420px] md:w-[480px] aspect-square flex items-center justify-center">
              <div className="relative w-full h-full animate-hamper-float">
                <Image
                  src="/products/luxury-hamper-transparent.png"
                  alt="Sweet Moon Luxury Custom Gift Hamper with Chocolates and Roses"
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
                  className="object-contain filter drop-shadow-[0_30px_35px_rgba(0,0,0,0.25)]"
                />
              </div>

              {/* 3D Oval Soft Shadow */}
              <div
                className="absolute -bottom-4 sm:-bottom-6 w-[240px] sm:w-[340px] h-[30px] sm:h-[40px] rounded-[100%] filter blur-[12px] sm:blur-[16px] pointer-events-none opacity-60 animate-hamper-shadow"
                style={{ background: "rgba(61,18,7,0.4)" }}
              />

              {/* Floating Custom Badge */}
              <div className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 bg-espresso-950 text-champagne border border-champagne/40 rounded-2xl px-4 py-3 shadow-luxury backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-widest text-chocolate-200">
                  100% Customisable
                </p>
                <p className="text-base sm:text-lg font-serif font-bold text-white">
                  Your Way ✦
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-champagne bg-espresso-950/5 border border-champagne/30 mb-3">
                <Sparkles size={13} /> Make It Extra Special
              </span>
              <h2 className="text-espresso-950 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4">
                BUILD YOUR <br className="hidden sm:inline" />
                <span className="text-champagne">CUSTOM GIFT BOX</span>
              </h2>
              <p className="text-chocolate-800 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                Create a one-of-a-kind gift box filled with the treats they love most. Choose from our premium selection of chocolates, snacks, and imported goodies — all beautifully packaged with a personal touch.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/gift-boxes/builder"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-champagne hover:bg-espresso-950 hover:text-champagne text-espresso-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-luxury hover:scale-105 active:scale-95"
              >
                Start Building <ArrowRight size={16} />
              </Link>
            </div>

            {/* 4 Benefit Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {benefits.map((b, i) => {
                const IconComponent = b.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm border border-chocolate-200/70 rounded-2xl p-3.5 text-center shadow-sm space-y-1.5 hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-champagne/15 text-champagne flex items-center justify-center mx-auto">
                      <IconComponent size={16} />
                    </div>
                    <p className="text-[11px] font-semibold text-espresso-950 leading-tight">
                      {b.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hamperFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.6deg);
          }
        }
        @keyframes hamperShadow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(0.88);
            opacity: 0.35;
          }
        }
        .animate-hamper-float {
          animation: hamperFloat 4.5s ease-in-out infinite;
        }
        .animate-hamper-shadow {
          animation: hamperShadow 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}