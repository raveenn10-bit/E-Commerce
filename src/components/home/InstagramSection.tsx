"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const instagramFeed = [
  {
    src: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&h=500&fit=crop",
    alt: "Ferrero Rocher & Italian Gold Chocolates",
    tag: "@sweetmoon.sl",
  },
  {
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop",
    alt: "Luxury Velvet Ribbon Gift Box",
    tag: "#GalleBoutique",
  },
  {
    src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&h=500&fit=crop",
    alt: "Korean Spicy Buldak Selection",
    tag: "#KoreanRamen",
  },
  {
    src: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=500&fit=crop",
    alt: "Imported Milk Chocolate Truffles",
    tag: "#ChocolateLovers",
  },
  {
    src: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=500&h=500&fit=crop",
    alt: "Celebration Hampers in Galle",
    tag: "#GiftSeason",
  },
  {
    src: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500&h=500&fit=crop",
    alt: "Gummy Bears & Fruit Candies",
    tag: "#ImportedSweets",
  },
  {
    src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop",
    alt: "Galaxy Smooth Milk Delicacies",
    tag: "#SweetMoments",
  },
  {
    src: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&h=500&fit=crop",
    alt: "Artisan Chocolate Bars & Nuts",
    tag: "#SweetMoonGalle",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-16 md:py-20 bg-[#FAF6EF] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-[#C9A84C] bg-white border border-[#C9A84C]/30 uppercase mb-3 shadow-sm">
          <Sparkles size={13} /> Follow Our Sweet Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-950">
          @SWEETMOON.SL
        </h2>
        <p className="text-sm text-chocolate-700 mt-2 max-w-md mx-auto">
          Tag us on Instagram with your sweet moments to get featured on our wall!
        </p>
      </div>

      {/* ── CONTINUOUS AUTO-SCROLLING MARQUEE (DESKTOP & MOBILE) ── */}
      <div className="relative w-full overflow-hidden group">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF6EF] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF6EF] to-transparent z-10 pointer-events-none" />

        {/* Seamless Infinite Marquee Track */}
        <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
          {[...instagramFeed, ...instagramFeed].map((item, index) => (
            <div
              key={index}
              className="relative w-[200px] sm:w-[250px] md:w-[280px] aspect-square mx-2.5 sm:mx-3.5 rounded-3xl overflow-hidden shadow-card group/card shrink-0 border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-luxury"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 280px"
                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
              />

              {/* Instagram Hover Overlay */}
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.alt}
                className="absolute inset-0 bg-espresso-950/70 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center backdrop-blur-xs"
              >
                <div className="w-12 h-12 rounded-full bg-champagne text-espresso-950 flex items-center justify-center mb-2 transform scale-75 group-hover/card:scale-100 transition-transform duration-300 shadow-lg">
                  <InstagramIcon size={22} />
                </div>
                <span className="text-xs font-bold text-white tracking-wider">
                  {item.tag}
                </span>
                <span className="text-[11px] text-chocolate-200 mt-1 line-clamp-1">
                  {item.alt}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram Button CTA */}
      <div className="text-center mt-10">
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-espresso-950 hover:bg-champagne hover:text-espresso-950 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-luxury hover:scale-105 active:scale-95"
        >
          <InstagramIcon size={16} /> Follow on Instagram
        </Link>
      </div>

      {/* Marquee Keyframes */}
      <style jsx global>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 30s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-infinite-scroll {
            animation-duration: 22s;
          }
        }
      `}</style>
    </section>
  );
}