"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";
import MegaMenu from "@/components/layout/MegaMenu";
import CurrencySwitcher from "@/components/ui/CurrencySwitcher";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Canned Drinks",
    href: "/canned-drinks",
    badge: "3D",
    badgeColor: "bg-champagne/20 text-champagne-dark dark:text-champagne border-champagne/40",
  },
  { label: "Categories", href: "/shop", hasMegaMenu: true, menuType: "categories" as const },
  { label: "Gift Boxes", href: "/shop/gift-boxes", hasMegaMenu: true, menuType: "gift-boxes" as const },
  {
    label: "Offers",
    href: "/shop?filter=offers",
    badge: "HOT",
    badgeColor: "bg-red-500 text-white border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const cartItemCount = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { openSearch, openMobileNav, theme, toggleTheme, setTheme } = useUIStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("sweet-moon-theme");
    if (savedTheme === "dark") {
      setTheme("dark");
    }
  }, [setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 backdrop-blur-xl backdrop-saturate-150 ${
        scrolled
          ? "bg-white/80 dark:bg-[#141E30]/85 border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white/55 dark:bg-[#141E30]/60 border-white/30 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group py-1"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-luxury group-hover:scale-105 transition-transform bg-white shrink-0 border-2 border-champagne p-0.5">
                <Image
                  src="/harsh-apex-logo.png"
                  alt="Apex Moon Logo"
                  fill
                  sizes="(max-width: 768px) 56px, 64px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-serif text-2xl font-bold text-espresso-950 dark:text-white leading-none tracking-tight">
                  Apex{" "}
                  <span className="text-champagne">Moon</span>
                </span>
                <p className="text-chocolate-600 dark:text-silver text-[11px] tracking-widest uppercase leading-none mt-1 font-bold">
                  Chocolates &amp; Treats
                </p>
              </div>
            </Link>

            {/* ── Unique Floating Island Navigation ── */}
            <nav className="hidden lg:flex items-center gap-1 bg-espresso-950/[0.03] dark:bg-white/[0.05] p-1.5 rounded-full border border-espresso-950/[0.07] dark:border-white/10 backdrop-blur-md shadow-inner">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                const linkContent = (
                  <span className="relative flex items-center gap-1.5 z-10">
                    <span className="tracking-[0.02em]">{link.label}</span>
                    {link.badge && (
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border leading-none shrink-0 ${link.badgeColor}`}
                      >
                        {link.badge}
                      </span>
                    )}
                    {link.hasMegaMenu && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 group-hover:rotate-180 ${
                          isActive ? "text-champagne stroke-[2.5]" : "opacity-60"
                        }`}
                      />
                    )}
                  </span>
                );

                return link.hasMegaMenu ? (
                  <div key={link.label} className="relative group">
                    <Link
                      href={link.href}
                      className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap flex items-center ${
                        isActive
                          ? "bg-white dark:bg-[#1D2C44] text-champagne shadow-[0_2px_12px_rgba(201,168,76,0.18)] ring-1 ring-champagne/40"
                          : "text-espresso-900/90 dark:text-silver hover:text-espresso-950 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                      }`}
                    >
                      {linkContent}
                    </Link>
                    <MegaMenu type={link.menuType} />
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap flex items-center ${
                      isActive
                        ? "bg-white dark:bg-[#1D2C44] text-champagne shadow-[0_2px_12px_rgba(201,168,76,0.18)] ring-1 ring-champagne/40"
                        : "text-espresso-900/90 dark:text-silver hover:text-espresso-950 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10"
                    }`}
                  >
                    {linkContent}
                  </Link>
                );
              })}
            </nav>

            {/* ── Action Icons ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Currency Switcher */}
              <div className="mr-0.5">
                <CurrencySwitcher />
              </div>

              {/* Theme Toggle (Navy Mirage & Light Silver Dark Mode) */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="p-2 rounded-lg text-espresso-950 dark:text-silver hover:text-champagne dark:hover:text-white hover:bg-chocolate-50 dark:hover:bg-white/10 transition-all duration-200"
                title={`Switch to ${theme === "dark" ? "Light Ivory" : "Navy Mirage Dark"} Mode`}
              >
                {theme === "dark" ? (
                  <Sun size={19} className="text-amber-300 animate-spin-slow" />
                ) : (
                  <Moon size={19} className="text-navyMirage-900" />
                )}
              </button>

              {/* Search */}
              <button
                onClick={openSearch}
                aria-label="Search products"
                className="p-2 rounded-lg text-espresso-950 dark:text-silver hover:text-champagne dark:hover:text-white hover:bg-chocolate-50 dark:hover:bg-white/10 transition-all duration-200"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="relative p-2 rounded-lg text-espresso-950 dark:text-silver hover:text-champagne dark:hover:text-white hover:bg-chocolate-50 dark:hover:bg-white/10 transition-all duration-200"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-blush text-espresso-950 text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                aria-label="My account"
                className="hidden sm:flex p-2 rounded-lg text-espresso-950 dark:text-silver hover:text-champagne dark:hover:text-white hover:bg-chocolate-50 dark:hover:bg-white/10 transition-all duration-200"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label={`Shopping cart (${cartItemCount} items)`}
                className="relative p-2 rounded-lg text-espresso-950 dark:text-silver hover:text-champagne dark:hover:text-white hover:bg-chocolate-50 dark:hover:bg-white/10 transition-all duration-200"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={openMobileNav}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 rounded-lg text-espresso-950 dark:text-silver hover:text-champagne dark:hover:text-white hover:bg-chocolate-50 dark:hover:bg-white/10 transition-all duration-200 ml-1"
              >
                <Menu size={22} />
              </button>
            </div>
        </div>
      </div>
    </header>
  );
}
