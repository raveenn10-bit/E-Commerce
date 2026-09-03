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
import { BreathingText } from "@/components/ui/breathing-text";
import Price from "@/components/ui/Price";

interface HeroSlide {
  id: string;
  slug: string;
  headline: string;
  subheadline: string;
  tagline: string;
  image: string;
  accentColor: string;
  accentBadge: string;
  shadowColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    slug: "coca-cola-vanilla-zero-sugar-325ml",
    headline: "Crisp Sparkling\nRefreshment",
    subheadline:
      "Authentic imported Coca-Cola served ice-cold. Crisp effervescence, signature rich taste, and revitalizing fizz perfect for every sweet celebration.",
    tagline: "Ice Cold Refreshment",
    image: "/hero/slide-1-coca-cola.png",
    accentColor: "#dc2626",
    accentBadge: "Classic Reserve",
    shadowColor: "rgba(220,38,38,0.35)",
  },
  {
    id: "slide-2",
    slug: "fanta-strawberry-soda-250ml",
    headline: "Fizzy Wild Cherry\nRush",
    subheadline:
      "Sweet, effervescent, and bursting with vibrant wild cherry flavor. A rare imported 100% natural flavor Fanta edition perfect for fruity refreshment.",
    tagline: "Imported Sparkling Soda",
    image: "/hero/slide-2-fanta.png",
    accentColor: "#db2777",
    accentBadge: "Wild Cherry Edition",
    shadowColor: "rgba(219,39,119,0.35)",
  },
  {
    id: "slide-3",
    slug: "buldak-ramen-5-pack-spicy",
    headline: "Intense Korean\nHeat",
    subheadline:
      "The world-famous Samyang 3X Spicy Hot Chicken Flavor Ramen. Thick chewy noodles tossed in rich, fiery Korean chili sauce for true spice lovers.",
    tagline: "Viral Spicy Selection",
    image: "/hero/slide-3-buldak.png",
    accentColor: "#ea580c",
    accentBadge: "Extreme 3X Spicy",
    shadowColor: "rgba(234,88,12,0.35)",
  },
  {
    id: "slide-4",
    slug: "apex-moon-luxury-hamper",
    headline: "Handcrafted Gift\nHampers",
    subheadline:
      "The pinnacle of gifting in Galle. An opulent bespoke collection of luxury imported chocolates, Ferrero, Nutella, roses, and savory gourmet treats.",
    tagline: "Custom Boutique Gifting",
    image: "/hero/slide-4-hamper.png",
    accentColor: "#e11d48",
    accentBadge: "Luxury Collection",
    shadowColor: "rgba(225,29,72,0.35)",
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
      className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white via-[#FAF6EF] to-white select-none transition-colors duration-700"
    >
      {/* Background Luxury Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-all duration-1000"
          style={{ background: currentSlide.shadowColor }}
        />
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full blur-[120px] bg-champagne/10 pointer-events-none" />
      </div>

      {/* ── MAIN 2-COLUMN LUXURY SHOWCASE CONTAINER ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ── LEFT COLUMN: EDITORIAL HEADLINE, PRICING & CTAs (5-6 cols) ── */}
          <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center space-y-4 sm:space-y-5">
            {/* Tagline Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-sm transition-all duration-500"
                style={{
                  color: currentSlide.accentColor,
                  borderColor: `${currentSlide.accentColor}35`,
                  backgroundColor: `${currentSlide.accentColor}12`,
                }}
              >
                <Sparkles size={13} /> {currentSlide.tagline}
              </span>
              {currentProduct && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-espresso-700 font-medium bg-espresso-50 px-2.5 py-1 rounded-full border border-espresso-100">
                  <Star size={12} className="text-amber-500" fill="currentColor" />
                  {currentProduct.rating} ({currentProduct.reviewCount})
                </span>
              )}
            </div>

            {/* Headline with BreathingText */}
            <h1
              key={`headline-${currentIndex}`}
              className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-espresso-950 tracking-tight leading-[1.1] animate-hero-text"
            >
              <BreathingText
                label={currentSlide.headline}
                staggerDuration={0.025}
                staggerFrom="first"
                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -6"
                transition={{
                  duration: 0.75,
                  ease: "easeInOut",
                }}
              />
            </h1>

            {/* Subcopy */}
            <p
              key={`copy-${currentIndex}`}
              className="text-chocolate-800 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 animate-hero-text"
            >
              {currentSlide.subheadline}
            </p>

            {/* Price Pill & Specifications */}
            {currentProduct && (
              <div
                key={`price-${currentIndex}`}
                className="flex items-center justify-center lg:justify-start gap-4 pt-1 animate-hero-text"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-bold text-2xl sm:text-3xl tracking-tight"
                    style={{ color: currentSlide.accentColor }}
                  >
                    <Price amount={currentProduct.price} />
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-sm sm:text-base text-chocolate-400 line-through">
                      <Price amount={currentProduct.originalPrice} />
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-espresso-600 bg-white px-3 py-1 rounded-full border border-chocolate-200 shadow-sm">
                  {currentProduct.weight || "Standard"}
                </span>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={handleAddToCart}
                aria-label={`Add ${currentProduct?.name} to cart`}
                className={`px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-luxury hover:scale-105 active:scale-95 flex items-center gap-2 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "text-white hover:opacity-95"
                }`}
                style={{
                  backgroundColor: addedToCart ? undefined : currentSlide.accentColor,
                }}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Add to Cart
                  </>
                )}
              </button>

              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-espresso-950 bg-white border border-chocolate-200 hover:border-espresso-950 hover:bg-espresso-50 transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                Explore Shop <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* ── RIGHT/CENTER COLUMN: 20% LARGER PRODUCT IMAGE (6-7 cols) ── */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 relative py-4 sm:py-8">
            <div className="relative w-[280px] sm:w-[380px] md:w-[460px] lg:w-[540px] aspect-square flex items-center justify-center">
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
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 460px, 560px"
                    className="object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>

              {/* Separate Soft Blurred Oval Shadow Beneath Product */}
              <div
                className="absolute -bottom-3 sm:-bottom-6 w-[220px] sm:w-[320px] md:w-[380px] h-[25px] sm:h-[40px] rounded-[100%] filter blur-[12px] sm:blur-[16px] pointer-events-none transition-all duration-500 animate-shadow-pulse"
                style={{
                  background: currentSlide.shadowColor,
                  opacity: 0.75,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── LOWER NAVIGATION BAR (CLEAN LIGHT AESTHETIC) ── */}
      <div className="relative z-20 border-t border-chocolate-100 bg-white/70 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Slide Numbers & Progress Indicators */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm font-bold text-espresso-950 tracking-widest">
              0{currentIndex + 1}
            </span>
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx, idx > currentIndex ? "next" : "prev")}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-espresso-950"
                      : "w-2.5 bg-chocolate-200 hover:bg-chocolate-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-chocolate-500">
              / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Next Product Interactive Teaser */}
          <div
            onClick={handleNext}
            className="hidden md:flex items-center gap-3 bg-espresso-50 hover:bg-espresso-100 border border-espresso-200/60 rounded-full py-1.5 px-4 cursor-pointer transition-all duration-300 group"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-espresso-700 group-hover:text-espresso-950 transition-colors">
              Next
            </span>
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white border border-chocolate-200">
              <Image
                src={nextSlide.image}
                alt={nextSlide.headline}
                fill
                sizes="24px"
                className="object-contain p-0.5 group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs font-serif font-bold text-espresso-950 max-w-[130px] truncate">
              {nextSlide.headline.split(" ")[0]} {nextSlide.headline.split(" ")[1]}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-chocolate-200 bg-white hover:bg-espresso-950 hover:text-white text-espresso-950 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-chocolate-200 bg-white hover:bg-espresso-950 hover:text-white text-espresso-950 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Global CSS */}
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
            transform: translateY(-10px) rotate(0.6deg);
          }
        }

        @keyframes shadowPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(0.85);
            opacity: 0.45;
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