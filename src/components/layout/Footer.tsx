"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Phone, Clock, Send, ChevronRight } from "lucide-react";
import { categories } from "@/lib/data";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Gift Boxes", href: "/shop/gift-boxes" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-espresso-950 text-ivory">
      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* ── Column 1: Brand ── */}
          <div className="lg:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-luxury bg-white shrink-0">
                <Image
                  src="/logo.png"
                  alt="Sweet Moon Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-ivory leading-none">
                  Sweet <span className="text-champagne">Moon</span>
                </p>
                <p className="text-espresso-400 text-[10px] tracking-widest uppercase leading-none mt-0.5">
                  Chocolates &amp; Nuts
                </p>
              </div>
            </div>
            <p className="text-chocolate-300 text-sm leading-relaxed mb-5 max-w-xs">
              Galle's premier destination for imported chocolates, Korean
              treats, exotic drinks, and luxury gift boxes. Sweetening every
              moment since 2020.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-champagne flex items-center justify-center text-chocolate-300 hover:text-espresso-950 transition-all duration-200 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-champagne flex items-center justify-center text-chocolate-300 hover:text-espresso-950 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-champagne flex items-center justify-center text-chocolate-300 hover:text-espresso-950 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
              <a
                href="https://wa.me/94766089763"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-green-500 flex items-center justify-center text-chocolate-300 hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h4 className="font-serif font-bold text-champagne text-base mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-chocolate-300 hover:text-champagne transition-colors duration-200 group"
                  >
                    <ChevronRight
                      size={14}
                      className="text-espresso-600 group-hover:text-champagne transition-colors"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Categories ── */}
          <div>
            <h4 className="font-serif font-bold text-champagne text-base mb-5 tracking-wide">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className="flex items-center gap-1.5 text-sm text-chocolate-300 hover:text-champagne transition-colors duration-200 group"
                  >
                    <ChevronRight
                      size={14}
                      className="text-espresso-600 group-hover:text-champagne transition-colors"
                    />
                    {cat.name}
                    <span className="text-espresso-600 text-[10px] ml-auto">
                      {cat.productCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <h4 className="font-serif font-bold text-champagne text-base mb-5 tracking-wide">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={15}
                  className="text-champagne shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm text-chocolate-300 leading-relaxed">
                    No 01 Main Street
                    <br />
                    Galle, Sri Lanka
                  </p>
                  <a
                    href="https://maps.google.com?q=No+01+Main+Street+Galle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-champagne hover:text-champagne-light underline underline-offset-2 mt-1 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={15} className="text-champagne shrink-0" />
                <a
                  href="tel:+94766089763"
                  className="text-sm text-chocolate-300 hover:text-champagne transition-colors"
                >
                  076 608 9763
                </a>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-400 shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <a
                  href="https://wa.me/94766089763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-chocolate-300 hover:text-green-400 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={15} className="text-champagne shrink-0" />
                <span className="text-sm text-chocolate-300">
                  Always Open — 24/7
                </span>
              </div>
            </div>
          </div>

          {/* ── Column 5: Newsletter ── */}
          <div>
            <h4 className="font-serif font-bold text-champagne text-base mb-2 tracking-wide">
              Stay Sweet
            </h4>
            <p className="text-chocolate-400 text-sm mb-4 leading-relaxed">
              Subscribe for exclusive deals, new arrivals, and sweet
              surprises.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-espresso-800 border border-espresso-700 rounded-xl px-4 py-2.5 text-sm text-ivory placeholder:text-espresso-500 focus:outline-none focus:ring-2 focus:ring-champagne focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="w-full btn-primary justify-center py-2.5 rounded-xl"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-xs mt-2 text-center animate-fade-in">
                ✓ Thank you for subscribing!
              </p>
            )}

            {/* Accepted payments */}
            <div className="mt-5">
              <p className="text-espresso-500 text-xs mb-2">We Accept:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "COD", color: "bg-green-900 text-green-300 border-green-800" },
                  { label: "Bank Transfer", color: "bg-blue-900 text-blue-300 border-blue-800" },
                  { label: "Card", color: "bg-purple-900 text-purple-300 border-purple-800" },
                ].map((p) => (
                  <span
                    key={p.label}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${p.color} tracking-wide`}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-espresso-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-chocolate-500 text-xs text-center sm:text-left">
            © {currentYear} Sweet Moon. All rights reserved. Crafted with{" "}
            <span className="text-champagne">♥</span> in Galle, Sri Lanka.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-chocolate-500 hover:text-champagne text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-espresso-700 text-xs">|</span>
            <Link
              href="/terms"
              className="text-chocolate-500 hover:text-champagne text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
