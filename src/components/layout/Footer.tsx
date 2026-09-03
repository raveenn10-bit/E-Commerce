"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Phone, Clock, Send, CheckCircle2, Heart, Sparkles } from "lucide-react";
import { categories } from "@/lib/data";
import { useUIStore } from "@/store/ui";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Live Order Tracking", href: "/track-order", badge: "Live" },
  { label: "Canned Drinks 3D", href: "/canned-drinks" },
  { label: "Gift Box Builder", href: "/gift-boxes/builder" },
  { label: "Special Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const addToast = useUIStore((s) => s.addToast);
  const currentYear = new Date().getFullYear();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      addToast({ type: "error", message: "Please fill in all fields." });
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      addToast({
        type: "success",
        message: "Thank you! Your message has been sent to Apex Moon.",
      });
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 600);
  };

  return (
    <footer className="relative bg-[#FAF6EF] text-ivory overflow-hidden pt-12">
      {/* ── TOP ORGANIC FLUID WAVE SILHOUETTE (INSPIRED BY REFERENCE) ── */}
      <div className="relative w-full overflow-hidden leading-none z-10 -mb-1">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block preserve-3d"
          style={{ transform: "scale(1.01)" }}
        >
          <path
            d="M0,80 C180,160 320,20 540,110 C740,190 920,40 1140,130 C1280,180 1380,100 1440,70 L1440,220 L0,220 Z"
            fill="#160714"
          />
          <path
            d="M0,110 C220,180 400,60 620,130 C820,195 1020,80 1260,150 C1360,180 1410,140 1440,120 L1440,220 L0,220 Z"
            fill="#120510"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* ── MAIN DEEP DARK FOOTER BODY ── */}
      <div className="relative bg-[#120510] z-20 pb-12 pt-4 px-4 sm:px-6 lg:px-8">
        {/* Floating Ambient Sparkles & Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-champagne blur-[1px] animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-white blur-[0.5px] animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-pink-300 blur-[1px] animate-pulse" />
          <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 rounded-full bg-champagne blur-[0.5px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {/* ── UPPER SECTION: CONTACT FORM & SILHOUETTE BRANDING (EXACT REFERENCE DESIGN) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4 border-b border-white/10 pb-14">
            {/* LEFT: Centered Large Logo, Brand & Floating Socials (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center relative space-y-6 text-center items-center">
              {/* Centered Large Logo Above Apex Moon */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-luxury bg-white shrink-0 p-1.5 border-2 border-champagne mb-3 hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/harsh-apex-logo.png"
                    alt="Apex Moon Official Logo"
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-contain p-1"
                    priority
                  />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  Apex <span className="text-champagne">Moon</span>
                </h2>
                <p className="text-champagne-light text-xs tracking-[0.2em] uppercase mt-1 font-bold">
                  Premium Chocolates &amp; Treats
                </p>

                <p className="text-chocolate-200/80 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
                  Sri Lanka&apos;s luxury boutique for imported chocolates, Korean spicy noodles, exotic beverages, and bespoke gift hampers.
                </p>
              </div>

              {/* Floating Social Icons */}
              <div className="w-full">
                <span className="text-[11px] uppercase font-bold tracking-widest text-chocolate-300 block mb-3 text-center">
                  Connect With Us
                </span>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-champagne hover:text-espresso-950 text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/sweetmoon.sl"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-champagne hover:text-espresso-950 text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/94770663154"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 hover:text-white text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="#"
                    aria-label="TikTok"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-champagne hover:text-espresso-950 text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: Direct "Contact Us" Form (7 cols) */}
            <div className="lg:col-span-7 bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Contact Us
              </h3>
              <p className="text-xs sm:text-sm text-chocolate-300 mb-6">
                Have a question about custom gift hampers or island-wide delivery? Send us a quick note.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-chocolate-200 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-chocolate-200 uppercase tracking-wider mb-1.5">
                      Your Mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kasun@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-chocolate-200 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your gift box idea or order inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-7 py-3 rounded-full bg-white hover:bg-champagne text-espresso-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    {isSending ? (
                      "Sending..."
                    ) : sent ? (
                      <>
                        <CheckCircle2 size={16} className="text-green-600" /> Sent Successfully!
                      </>
                    ) : (
                      <>
                        Send Message <Send size={14} />
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-chocolate-400 hidden sm:inline">
                    Direct WhatsApp: 077 066 3154
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* ── LOWER SECTION: 4 QUICK COLUMNS (NAV, CATEGORIES, BOUTIQUE, INFO) ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Quick Links
              </h4>
              <ul className="space-y-2 text-chocolate-300">
                {quickLinks.slice(0, 6).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:text-champagne transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-champagne text-espresso-950 uppercase tracking-wider animate-pulse">
                          {l.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Categories */}
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Categories
              </h4>
              <ul className="space-y-2 text-chocolate-300">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <Link href={`/shop/${c.slug}`} className="hover:text-champagne transition-colors">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colombo Main Boutique */}
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Main Boutique
              </h4>
              <p className="text-chocolate-300 leading-relaxed">
                No. 88 Moonlit Boulevard,<br />
                Colombo 03, Sri Lanka
              </p>
              <p className="text-chocolate-400 mt-2">
                Walk-in: 9:00 AM – 9:00 PM Daily
              </p>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Customer Care
              </h4>
              <p className="text-chocolate-300">📞 077 066 3154</p>
              <p className="text-chocolate-300 mt-1">💬 WhatsApp: 077 066 3154</p>
              <p className="text-chocolate-300 mt-1">🚚 Island-wide Secure Delivery</p>
            </div>
          </div>

          {/* ── BOTTOM COPYRIGHT & LEGAL BAR ── */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-chocolate-400">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <p>
                Copyright © Apex Moon {currentYear}. All Rights Reserved.
              </p>
              <span className="hidden sm:inline text-white/20">|</span>
              <p className="text-chocolate-300 font-medium">
                Crafted by <span className="text-white font-bold tracking-wide">Harsh Apex Digital Solutions</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/policies/privacy" className="hover:text-champagne transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/policies/terms" className="hover:text-champagne transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/policies/delivery" className="hover:text-champagne transition-colors">
                Delivery Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
