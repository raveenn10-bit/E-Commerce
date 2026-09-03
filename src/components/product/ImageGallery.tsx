"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const safeImages = images.length > 0 ? images : ["/placeholder-product.jpg"];
  const mainImage = safeImages[selectedIndex] ?? safeImages[0];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  const isTransparentCan = mainImage.includes("canned-drinks");

  return (
    <div className="flex flex-col gap-4">
      {/* ── Main image ───────────────────────────────────────── */}
      <div
        className={`relative w-full aspect-square rounded-2xl overflow-hidden ${
          isTransparentCan ? "bg-gradient-to-b from-white to-[#FAF6EF]" : "bg-ivory"
        } border border-gray-100 shadow-sm cursor-zoom-in select-none`}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={mainImage}
          alt={`${productName} — view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${
            isTransparentCan
              ? "object-contain p-6 drop-shadow-[0_20px_25px_rgba(0,0,0,0.22)]"
              : "object-cover"
          } transition-transform duration-200 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={
            isZoomed
              ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
              : { transformOrigin: "center center" }
          }
        />

        {/* Zoom hint icon — hides when zoomed */}
        {!isZoomed && (
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow pointer-events-none">
            <ZoomIn size={16} className="text-espresso/60" />
          </div>
        )}

        {/* Image counter pill */}
        {safeImages.length > 1 && (
          <div className="absolute top-3 right-3 bg-espresso/70 text-white text-xs font-medium px-2 py-1 rounded-full pointer-events-none">
            {selectedIndex + 1} / {safeImages.length}
          </div>
        )}
      </div>

      {/* ── Thumbnails ───────────────────────────────────────── */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {safeImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                idx === selectedIndex
                  ? "border-champagne shadow-md scale-105"
                  : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className={`${
                  src.includes("canned-drinks") ? "object-contain p-1.5 bg-gradient-to-b from-white to-[#FAF6EF]" : "object-cover"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
