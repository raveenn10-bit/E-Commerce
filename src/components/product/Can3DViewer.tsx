"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, RotateCw, ShoppingCart, Check } from "lucide-react";
import { Product, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import Price from "@/components/ui/Price";

interface Can3DViewerProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

export default function Can3DViewer({
  product,
  size = "md",
  interactive = true,
}: Can3DViewerProps) {
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current || isSpinning) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isSpinning) {
      setRotation({ x: 0, y: 0 });
    }
  };

  const trigger3DSpin = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSpinning(true);
    setRotation({ x: 0, y: 360 });
    setTimeout(() => {
      setIsSpinning(false);
      setRotation({ x: 0, y: 0 });
    }, 1200);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    addToast({
      type: "success",
      message: `Added ${product.name} to cart!`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group select-none flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-white to-[#FAF6EF] border border-chocolate-100 shadow-card hover:shadow-luxury transition-all duration-300 overflow-hidden"
      style={{
        perspective: "1000px",
      }}
    >
      {/* 3D Atmosphere Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(201,168,76,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Badges */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1">
        {product.discount && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            -{product.discount}%
          </span>
        )}
        <span className="bg-espresso-950 text-champagne text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Sparkles size={10} /> 3D CAN
        </span>
      </div>

      {/* 3D Spin Button */}
      <button
        onClick={trigger3DSpin}
        title="3D Spin View"
        className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md text-chocolate-600 hover:text-champagne hover:scale-110 flex items-center justify-center transition-all duration-200"
      >
        <RotateCw size={14} className={isSpinning ? "animate-spin" : ""} />
      </button>

      {/* 3D Can Container */}
      <div
        className="relative w-full aspect-[3/4] max-w-[220px] flex items-center justify-center my-2"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${
            isHovered ? 1.08 : 1
          })`,
          transition: isSpinning
            ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
            : isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s ease-out",
        }}
      >
        {/* Specular Light Reflection */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
            transform: "translateZ(30px)",
          }}
        />

        {/* Can Image */}
        <div className="relative w-full h-full drop-shadow-[0_15px_15px_rgba(0,0,0,0.18)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain filter transition-all duration-300"
            priority
          />
        </div>

        {/* 3D Floating Base Radial Shadow */}
        <div
          className="absolute -bottom-4 w-32 h-6 bg-chocolate-950/20 rounded-[100%] filter blur-[6px] pointer-events-none transition-all duration-300"
          style={{
            transform: `scale(${isHovered ? 1.2 : 0.9}) translateZ(-20px)`,
            opacity: isHovered ? 0.4 : 0.25,
          }}
        />
      </div>

      {/* Can Product Details */}
      <div className="w-full text-center mt-2 z-10">
        <p className="text-champagne text-[11px] font-semibold tracking-wider uppercase mb-1">
          {product.brand} &bull; {product.weight || "325ml"}
        </p>
        <h3 className="font-serif font-bold text-espresso-950 text-sm md:text-base leading-snug line-clamp-1 mb-1 group-hover:text-champagne transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-chocolate-500 line-clamp-1 mb-3">
          {product.shortDescription}
        </p>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-chocolate-100/70">
          <div className="text-left">
            <span className="font-bold text-espresso-950 text-base">
              <Price amount={product.price} />
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through block -mt-1">
                <Price amount={product.originalPrice} />
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? "bg-green-600 text-white"
                : "bg-espresso-950 hover:bg-champagne text-white hover:text-espresso-950"
            }`}
          >
            {added ? (
              <>
                <Check size={13} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={13} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
