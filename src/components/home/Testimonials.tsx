"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const VISIBLE = 3;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 350);
    },
    [isTransitioning]
  );

  const prev = useCallback(() => {
    goTo(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  }, [currentIndex, goTo]);

  const next = useCallback(() => {
    goTo(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goTo]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Build a circular window of 3 testimonials
  const visibleTestimonials = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (currentIndex + i) % testimonials.length;
    return testimonials[idx];
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Reviews
          </p>
          <h2
            className="section-heading text-[#1a0a00]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={prev}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#C9A84C]/30 hover:bg-[#C9A84C] hover:text-white text-[#1a0a00] shadow-md flex items-center justify-center transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden"
            style={{ transition: "opacity 0.35s ease", opacity: isTransitioning ? 0.5 : 1 }}
          >
            {visibleTestimonials.map((testimonial, i) => (
              <div
                key={`${testimonial.id}-${currentIndex}-${i}`}
                className="card-luxury p-6 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <span
                      key={si}
                      className={`text-lg ${
                        si < testimonial.rating ? "text-[#C9A84C]" : "text-gray-200"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-gray-600 text-sm leading-relaxed italic flex-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;{testimonial.comment}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
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
                      className="text-[#1a0a00] font-bold text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-[#C9A84C] text-xs"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {testimonial.location} · {testimonial.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#C9A84C]/30 hover:bg-[#C9A84C] hover:text-white text-[#1a0a00] shadow-md flex items-center justify-center transition-colors duration-200"
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