"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Clock,
  Home,
  ShoppingBag,
  Tag,
  Gift,
  Percent,
  Info,
  Mail,
} from "lucide-react";
import { useUIStore } from "@/store/ui";
import { categories } from "@/lib/data";
import CurrencySwitcher from "@/components/ui/CurrencySwitcher";

const topNavLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop All", href: "/shop", icon: ShoppingBag },
  { label: "Offers", href: "/shop?filter=offers", icon: Percent },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function MobileNav() {
  const { mobileNavOpen, closeMobileNav } = useUIStore();
  const pathname = usePathname();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [giftBoxesOpen, setGiftBoxesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  // Trap focus & prevent body scroll
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileNav();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeMobileNav]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileNav}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 z-50 h-full w-[310px] max-w-[90vw] bg-espresso-950 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-espresso-800">
          <Link
            href="/"
            onClick={closeMobileNav}
            className="flex items-center gap-2.5"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-luxury bg-white shrink-0">
              <Image
                src="/harsh-apex-logo.png"
                alt="Apex Moon Logo"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-ivory leading-none">
                Apex <span className="text-champagne">Moon</span>
              </p>
              <p className="text-espresso-400 text-[10px] tracking-widest uppercase leading-none mt-0.5">
                Chocolates &amp; Treats
              </p>
            </div>
          </Link>
          <button
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-espresso-400 hover:text-ivory hover:bg-espresso-800 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Nav Body */}
        <div className="flex-1 overflow-y-auto py-4 px-4 no-scrollbar">
          {/* Top nav links */}
          <ul className="space-y-1 mb-2">
            {topNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobileNav}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-champagne text-espresso-950"
                        : "text-ivory/80 hover:text-ivory hover:bg-espresso-800"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-espresso-950" : "text-champagne"} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="border-t border-espresso-800 my-3" />

          {/* Categories Accordion */}
          <div className="mb-1">
            <button
              onClick={() => setCategoriesOpen((p) => !p)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-ivory/80 hover:text-ivory hover:bg-espresso-800 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Tag size={18} className="text-champagne" />
                <span>Categories</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-champagne transition-transform duration-200 ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sub-items */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                categoriesOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="mt-1 ml-4 border-l border-espresso-700 pl-3 space-y-1">
                <li>
                  <Link
                    href="/shop"
                    onClick={closeMobileNav}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ivory/70 hover:text-champagne hover:bg-espresso-800 transition-all duration-200"
                  >
                    <span>All Products</span>
                    <ChevronRight size={14} className="opacity-50" />
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/shop/${cat.slug}`}
                      onClick={closeMobileNav}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ivory/70 hover:text-champagne hover:bg-espresso-800 transition-all duration-200"
                    >
                      <span>{cat.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-espresso-500">
                          {cat.productCount}
                        </span>
                        <ChevronRight size={14} className="opacity-50" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gift Boxes Accordion */}
          <div className="mb-1">
            <button
              onClick={() => setGiftBoxesOpen((p) => !p)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-ivory/80 hover:text-ivory hover:bg-espresso-800 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Gift size={18} className="text-champagne" />
                <span>Gift Boxes</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-champagne transition-transform duration-200 ${
                  giftBoxesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                giftBoxesOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="mt-1 ml-4 border-l border-espresso-700 pl-3 space-y-1">
                {[
                  { name: "All Gift Boxes", href: "/shop/gift-boxes" },
                  { name: "Classic Gift Box", href: "/product/apex-moon-classic-gift-box" },
                  { name: "Luxury Hamper", href: "/product/apex-moon-luxury-hamper" },
                  { name: "Korean Lover Box", href: "/shop/korean-ramen" },
                  { name: "Custom Gift Box", href: "/gift-boxes/builder" },
                ].map((box) => (
                  <li key={box.href + box.name}>
                    <Link
                      href={box.href}
                      onClick={closeMobileNav}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ivory/70 hover:text-champagne hover:bg-espresso-800 transition-all duration-200"
                    >
                      <span>{box.name}</span>
                      <ChevronRight size={14} className="opacity-50" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="border-t border-espresso-800 px-5 py-4 space-y-2.5">
          <p className="text-champagne text-xs font-semibold uppercase tracking-wider mb-3">
            Contact Us
          </p>
          <a
            href="https://maps.google.com?q=No+01+Colombo+03"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2.5 text-xs text-ivory/60 hover:text-ivory/90 transition-colors"
          >
            <MapPin size={14} className="text-champagne shrink-0 mt-0.5" />
            <span>No. 88 Moonlit Boulevard, Colombo 03, Sri Lanka</span>
          </a>
          <a
            href="tel:+94770663154"
            className="flex items-center gap-2.5 text-xs text-ivory/60 hover:text-ivory/90 transition-colors"
          >
            <Phone size={14} className="text-champagne shrink-0" />
            <span>077 066 3154</span>
          </a>
          <div className="flex items-center gap-2.5 text-xs text-ivory/60">
            <Clock size={14} className="text-champagne shrink-0" />
            <span>Always Open — 24/7</span>
          </div>

          {/* Currency Switcher in Mobile Drawer */}
          <div className="pt-2 border-t border-espresso-800/80 flex items-center justify-between">
            <span className="text-xs text-ivory/70 font-medium">Currency:</span>
            <CurrencySwitcher />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-espresso-800 flex items-center justify-center text-chocolate-300 hover:text-champagne hover:bg-espresso-700 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-espresso-800 flex items-center justify-center text-chocolate-300 hover:text-champagne hover:bg-espresso-700 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full bg-espresso-800 flex items-center justify-center text-chocolate-300 hover:text-champagne hover:bg-espresso-700 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>
            <a
              href="https://wa.me/94770663154"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-espresso-800 flex items-center justify-center text-chocolate-300 hover:text-green-400 hover:bg-espresso-700 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
