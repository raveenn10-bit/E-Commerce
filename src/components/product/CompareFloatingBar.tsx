"use client";

import { useCompareStore } from "@/store/compare";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompareFloatingBar() {
  const { items, removeItem, clear } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-xl bg-espresso-950/95 text-white backdrop-blur-xl rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20 flex items-center justify-between gap-3"
      >
        {/* Left info & avatars */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-champagne text-espresso-950 flex items-center justify-center font-bold shrink-0 shadow">
            <ArrowLeftRight size={17} />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold text-champagne uppercase tracking-wider">
              Product Compare
            </p>
            <p className="text-xs text-white/80">
              {items.length} of 4 items selected
            </p>
          </div>

          {/* Item Thumbnails */}
          <div className="flex items-center -space-x-2 overflow-hidden py-0.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative group w-9 h-9 rounded-xl bg-white p-0.5 ring-2 ring-espresso-950 shrink-0 overflow-hidden shadow"
                title={item.name}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-0.5"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from compare"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clear}
            className="text-[11px] text-chocolate-300 hover:text-white px-2 py-1 transition-colors"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="px-4 py-2 rounded-full bg-champagne hover:bg-champagne-light text-espresso-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow"
          >
            Compare <ArrowRight size={13} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
