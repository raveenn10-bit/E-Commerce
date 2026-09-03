"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const VISIBLE = 3;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 350);

      // Smooth scroll the mobile container
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.offsetWidth * 0.85;
        scrollRef.current.scrollTo({
          left: index * itemWidth,
          behavior: "smooth",
        });
      }
    },
    [isTransitioning]
  );

  const prev = useCallback(() => {
    goTo(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  }, [currentIndex, goTo]);

  const next = useCallback(() => {
    goTo(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goTo]);

  // Auto-rotate every 6 seconds on desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Build a circular window of 3 testimonials for desktop view
  const visibleTestimonials = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (currentIndex + i) % testimonials.length;
    return testimonials[idx];
  });

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#141E30] transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p
            className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Reviews
          </p>
          <h2
            className="section-heading text-[#1a0a00] dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        {/* Carousel / Horizontal Scroll */}
        <div className="relative">
          {/* Prev button (hidden on mobile, visible on sm+) */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#1D2C44] border border-[#C9A84C]/30 hover:bg-[#C9A84C] hover:text-white text-[#1a0a00] dark:text-white shadow-md items-center justify-center transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* MOBILE: Left-to-Right Horizontal Swipeable Cards */}
          <div
            ref={scrollRef}
            className="flex sm:hidden overflow-x-auto pb-4 pt-1 snap-x snap-mandatory gap-4 scrollbar-hide -mx-4 px-4"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[84vw] max-w-[340px] shrink-0 snap-center card-luxury bg-white dark:bg-[#1D2C44] p-6 rounded-3xl border border-chocolate-100 dark:border-white/10 flex flex-col justify-between shadow-luxury"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={15}
                        className={
                          si < testimonial.rating
                            ? "fill-[#C9A84C] text-[#C9A84C]"
                            : "text-gray-200 dark:text-gray-600"
                        }
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-gray-700 dark:text-silver text-sm leading-relaxed italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &ldquo;{testimonial.comment}&rdquo;
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100 dark:border-white/10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[#C9A84C]/30">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[#1a0a00] dark:text-white font-bold text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-[#C9A84C] text-xs font-medium"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {testimonial.location} · {testimonial.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: 3-Card Carousel Grid */}
          <div
            className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden"
            style={{ transition: "opacity 0.35s ease", opacity: isTransitioning ? 0.5 : 1 }}
          >
            {visibleTestimonials.map((testimonial, i) => (
              <div
                key={`${testimonial.id}-${currentIndex}-${i}`}
                className="card-luxury bg-white dark:bg-[#1D2C44] p-6 rounded-3xl border border-chocolate-100 dark:border-white/10 flex flex-col gap-4 shadow-luxury"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      size={16}
                      className={
                        si < testimonial.rating
                          ? "fill-[#C9A84C] text-[#C9A84C]"
                          : "text-gray-200 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-gray-700 dark:text-silver text-sm leading-relaxed italic flex-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;{testimonial.comment}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-white/10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[#C9A84C]/30">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[#1a0a00] dark:text-white font-bold text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-[#C9A84C] text-xs font-medium"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {testimonial.location} · {testimonial.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next button (hidden on mobile, visible on sm+) */}
          <button
            onClick={next}
            className="hidden sm:flex absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#1D2C44] border border-[#C9A84C]/30 hover:bg-[#C9A84C] hover:text-white text-[#1a0a00] dark:text-white shadow-md items-center justify-center transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-[#C9A84C]"
                  : "w-2 bg-[#C9A84C]/30 hover:bg-[#C9A84C]/60"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}