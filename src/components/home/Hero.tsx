"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Gift } from "lucide-react";

const floatingPieces = [
  { size: 18, top: "15%", left: "5%", delay: 0, duration: 6 },
  { size: 12, top: "35%", left: "8%", delay: 1.2, duration: 7 },
  { size: 22, top: "65%", left: "3%", delay: 0.5, duration: 5.5 },
  { size: 14, top: "80%", left: "12%", delay: 2, duration: 8 },
  { size: 10, top: "10%", right: "6%", delay: 0.8, duration: 6.5 },
  { size: 20, top: "50%", right: "4%", delay: 1.5, duration: 7.5 },
  { size: 16, top: "75%", right: "9%", delay: 0.3, duration: 5 },
];

const avatarUrls = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#1a0a00]"
      style={{ minHeight: "85vh" }}
    >
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 70% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating chocolate pieces */}
      {floatingPieces.map((piece, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-20 pointer-events-none"
          style={{
            width: piece.size,
            height: piece.size,
            top: piece.top,
            left: (piece as { left?: string }).left,
            right: (piece as { right?: string }).right,
            background:
              "radial-gradient(circle, #C9A84C 0%, #8B5E3C 60%, #3D1A00 100%)",
            animation: `float ${piece.duration}s ease-in-out infinite`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-18px) rotate(6deg); }
          66%       { transform: translateY(10px) rotate(-4deg); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
        {/* LEFT — 60% */}
        <motion.div
          className="w-full lg:w-[60%] z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          {/* Pre-heading pill */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Premium Imported Treats
            </span>
            <span className="w-8 h-px bg-[#C9A84C]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <span
              className="block text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Indulge in
            </span>
            <span
              className="block text-[#C9A84C] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sweet Happiness
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-gray-300 text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38 }}
          >
            Premium chocolates, imported treats, and perfect gift boxes for
            every occasion. Delivered fresh to your door across Sri Lanka.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.5 }}
          >
            <Link href="/shop" className="btn-primary flex items-center gap-2">
              <ShoppingBag size={18} />
              SHOP NOW
            </Link>
            <Link
              href="/gift-boxes/builder"
              className="btn-secondary flex items-center gap-2"
            >
              <Gift size={18} />
              BUILD YOUR GIFT BOX
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <div className="flex -space-x-2">
              {avatarUrls.map((url, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#1a0a00] overflow-hidden relative"
                  style={{ zIndex: avatarUrls.length - i }}
                >
                  <Image
                    src={url}
                    alt={`Customer ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
              ))}
            </div>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Join{" "}
              <span className="text-[#C9A84C] font-semibold">4,700+</span>{" "}
              happy customers in Galle &amp; beyond ❤️
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT — 40% */}
        <motion.div
          className="w-full lg:w-[40%] flex items-center justify-center relative z-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,168,76,0.22) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative w-full max-w-md aspect-[6/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=500&fit=crop"
              alt="Luxury chocolate gift box"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00]/40 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#1a0a00] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ✦ Premium Quality
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}