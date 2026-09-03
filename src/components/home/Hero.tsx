"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Check,
  Star,
} from "lucide-react";
import { getProductBySlug, formatPrice, Product } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";

interface HeroSlide {
  id: string;
  slug: string;
  headline: string;
  subheadline: string;
  tagline: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  accentBadge: string;
  shadowColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    slug: "ferrero-rocher-t24",
    headline: "Indulge in Golden Luxury",
    subheadline:
      "Whole roasted hazelnuts enveloped in velvety chocolate cream, enclosed in a crispy wafer shell with milk chocolate and chopped hazelnut pieces.",
    tagline: "Signature Italian Chocolates",
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&h=800&fit=crop",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% 40%, #2c1e0e 0%, #170e06 60%, #0d0702 100%)",
    accentColor: "#C9A84C",
    accentBadge: "Gold Reserve",
    shadowColor: "rgba(201,168,76,0.22)",
  },
  {
    id: "slide-2",
    slug: "coca-cola-vanilla-zero-sugar-325ml",
    headline: "Crisp Sparkling Vanilla",
    subheadline:
      "Authentic imported Coca-Cola Vanilla Zero Sugar. Smooth natural vanilla aroma delicately blended with crisp effervescent cola and zero sugar guilt.",
    tagline: "Imported Chilled Soda",
    image: "/hero/coca-cola.png",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% 40%, #30090c 0%, #1c0406 60%, #0d0102 100%)",
    accentColor: "#f87171",
    accentBadge: "Ice Cold Import",
    shadowColor: "rgba(239,68,68,0.22)",
  },
  {
    id: "slide-3",
    slug: "buldak-ramen-5-pack-spicy",
    headline: "Intense Korean Heat",
    subheadline:
      "The world-famous Samyang 3X Spicy Hot Chicken Flavor Ramen. Thick chewy noodles tossed in rich, fiery Korean chili sauce for true spice lovers.",
    tagline: "Viral Spicy Selection",
    image: "/hero/buldak-ramen.png",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% 40%, #2c0b02 0%, #1a0600 60%, #0b0200 100%)",
    accentColor: "#fb923c",
    accentBadge: "Extreme 3X Spicy",
    shadowColor: "rgba(249,115,22,0.22)",
  },
  {
    id: "slide-4",
    slug: "sweet-moon-luxury-hamper",
    headline: "Handcrafted Gift Hampers",
    subheadline:
      "The pinnacle of gifting in Galle. An opulent bespoke collection of luxury imported chocolates, Ferrero, Nutella, roses, and savory gourmet treats.",
    tagline: "Custom Boutique Gifting",
    image: "/hero/gift-box.png",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% 40%, #2b0d1e 0%, #180611 60%, #0a0107 100%)",
    accentColor: "#fb7185",
    accentBadge: "Luxury Collection",
    shadowColor: "rgba(244,63,94,0.22)",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const currentSlide = HERO_SLIDES[currentIndex];
  const nextSlide = HERO_SLIDES[(currentIndex + 1) % HERO_SLIDES.length];
  const currentProduct: Product | undefined = getProductBySlug(currentSlide.slug);

  const goToSlide = useCallback(
    (newIndex: number, dir: "next" | "prev") => {
      if (isTransitioning || newIndex === currentIndex) return;
      setIsTransitioning(true);
      setDirection(dir);
      setCurrentIndex(newIndex);
      setAddedToCart(false);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 750);
    },
    [isTransitioning, currentIndex]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
    goToSlide(nextIdx, "next");
  }, [currentIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToSlide(prevIdx, "prev");
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const handleAddToCart = () => {
    if (!currentProduct) return;
    addItem(currentProduct, 1);
    setAddedToCart(true);
    addToast({
      type: "success",
      message: `Added ${currentProduct.name} to your cart! 🛍️`,
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <section
      aria-label="Hero Product Showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[90vh] lg:min-h-[88vh] flex flex-col justify-between overflow-hidden transition-all duration-700 select-none"
      style={{
        background: currentSlide.bgGradient,
      }}
    >
      {/* Background Ambience & Lighting Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[100px] transition-colors duration-1000"
          style={{ background: currentSlide.shadowColor }}
        />
      </div>

      {/* ── MAIN 3-COLUMN SHOWCASE CONTAINER ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          {/* ── LEFT COLUMN: EDITORIAL HEADLINE & STORY (4 cols) ── */}
          <div className="lg:col-span-4 text-center lg:text-left order-1 flex flex-col justify-center space-y-3 sm:space-y-4">
            {/* Tagline Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase border backdrop-blur-md transition-all duration-500"
                style={{
                  color: currentSlide.accentColor,
                  borderColor: `${currentSlide.accentColor}40`,
                  backgroundColor: `${currentSlide.accentColor}15`,
                }}
              >
                <Sparkles size={12} /> {currentSlide.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1
              key={`headline-${currentIndex}`}
              className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight animate-hero-text"
            >
              {currentSlide.headline}
            </h1>

            {/* Subcopy */}
            <p
              key={`copy-${currentIndex}`}
              className="text-chocolate-200/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0 animate-hero-text line-clamp-2 sm:line-clamp-none"
            >
              {currentSlide.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <Link
                href="/shop"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-luxury hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{
                  backgroundColor: currentSlide.accentColor,
                  color: "#1a0a00",
                }}
              >
                Shop Now <ArrowRight size={14} />
              </Link>
              <Link
                href="/gift-boxes/builder"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Build Box
              </Link>
            </div>
          </div>

          {/* ── CENTER COLUMN: OVERSIZED PRODUCT & 3D OVAL SHADOW (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 relative py-2 sm:py-4">
            <div className="relative w-[210px] sm:w-[280px] md:w-[350px] lg:w-[420px] aspect-square flex items-center justify-center">
              {/* Product Image with Vertical Enter/Exit Animation */}
              <div
                key={`img-${currentIndex}`}
                className={`relative w-full h-full flex items-center justify-center ${
                  direction === "next"
                    ? "animate-slide-down"
                    : "animate-slide-up"
                }`}
              >
                <div className="relative w-full h-full animate-hero-float">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.headline}
                    fill
                    priority
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 350px, 440px"
                    className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>

              {/* Separate Soft Blurred Oval Shadow Beneath Product */}
              <div
                className="absolute -bottom-1 sm:-bottom-3 w-[150px] sm:w-[220px] md:w-[280px] h-[20px] sm:h-[32px] rounded-[100%] filter blur-[8px] sm:blur-[10px] pointer-events-none transition-all duration-500 animate-shadow-pulse"
                style={{
                  background: currentSlide.shadowColor,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN: PRODUCT SPECIFICATIONS & ADD TO CART (3 cols) ── */}
          <div className="lg:col-span-3 text-center lg:text-left order-3 flex flex-col justify-center space-y-3">
            {currentProduct && (
              <div
                key={`details-${currentIndex}`}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-white space-y-2.5 sm:space-y-3 shadow-luxury animate-hero-text max-w-sm mx-auto lg:max-w-none w-full"
              >
                {/* Brand & Category */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-chocolate-300 uppercase tracking-widest">
                    {currentProduct.brand}
                  </span>
                  <span
                    className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase"
                    style={{
                      backgroundColor: `${currentSlide.accentColor}25`,
                      color: currentSlide.accentColor,
                    }}
                  >
                    {currentSlide.accentBadge}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                  {currentProduct.name}
                </h3>

                {/* Ratings & Pack Size */}
                <div className="flex items-center justify-between text-xs text-chocolate-300">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={12} fill="currentColor" />
                    <span className="font-bold text-white text-xs">
                      {currentProduct.rating}
                    </span>
                    <span className="text-chocolate-400 text-[10px]">
                      ({currentProduct.reviewCount})
                    </span>
                  </div>
                  <span className="font-medium text-chocolate-200 text-xs">
                    {currentProduct.weight || "Standard Pack"}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline justify-center lg:justify-start gap-2 pt-0.5">
                  <span
                    className="font-bold text-xl sm:text-2xl tracking-tight"
                    style={{ color: currentSlide.accentColor }}
                  >
                    {formatPrice(currentProduct.price)}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-xs text-chocolate-400 line-through">
                      {formatPrice(currentProduct.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  aria-label={`Add ${currentProduct.name} to cart`}
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-white text-espresso-950 hover:bg-champagne hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={15} /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={15} /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── LOWER FOOTER NAVIGATION AREA ── */}
      <div className="relative z-20 border-t border-white/10 bg-black/25 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Slide Numbers & Progress Indicators */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm font-bold text-white tracking-widest">
              0{currentIndex + 1}
            </span>
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx, idx > currentIndex ? "next" : "prev")}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-champagne"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-chocolate-400">
              / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Next Product Interactive Teaser */}
          <div
            onClick={handleNext}
            className="hidden md:flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full py-1.5 px-3.5 cursor-pointer transition-all duration-300 group"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-chocolate-300 group-hover:text-champagne transition-colors">
              Next Showcase
            </span>
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-black/40 border border-white/20">
              <Image
                src={nextSlide.image}
                alt={nextSlide.headline}
                fill
                className="object-contain p-0.5 group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs font-serif font-bold text-white max-w-[120px] truncate">
              {nextSlide.headline.split(" ")[0]} {nextSlide.headline.split(" ")[1]}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              aria-label="Previous slide"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-champagne"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label="Next slide"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-champagne"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Global CSS for Layered Slide Animations & Floating Idle Physics */}
      <style jsx global>{`
        @keyframes slideDownIn {
          0% {
            opacity: 0;
            transform: translateY(-80px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUpIn {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.8deg);
          }
        }

        @keyframes shadowPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(0.88);
            opacity: 0.55;
          }
        }

        @keyframes heroTextFade {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDownIn 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .animate-slide-up {
          animation: slideUpIn 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .animate-hero-float {
          animation: heroFloat 5s ease-in-out infinite;
        }

        .animate-shadow-pulse {
          animation: shadowPulse 5s ease-in-out infinite;
        }

        .animate-hero-text {
          animation: heroTextFade 0.65s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-down,
          .animate-slide-up,
          .animate-hero-float,
          .animate-shadow-pulse,
          .animate-hero-text {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}