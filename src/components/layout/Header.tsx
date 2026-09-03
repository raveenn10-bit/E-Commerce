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
import TopBar from "@/components/layout/TopBar";
import MegaMenu from "@/components/layout/MegaMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Canned Drinks", href: "/canned-drinks" },
  { label: "Categories", href: "/shop", hasMegaMenu: true, menuType: "categories" as const },
  { label: "Gift Boxes", href: "/shop/gift-boxes", hasMegaMenu: true, menuType: "gift-boxes" as const },
  { label: "Offers", href: "/shop?filter=offers" },
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
    <div className="sticky top-0 z-40">
      {/* TopBar inside sticky container so it scrolls away */}
      <TopBar />

      {/* Main Header with Transparent Glassmorphism Effect */}
      <header
        className={`border-b transition-all duration-300 backdrop-blur-xl backdrop-saturate-150 ${
          scrolled
            ? "bg-white/85 dark:bg-[#141E30]/90 border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/65 dark:bg-[#141E30]/70 border-white/40 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
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
                  src="/logo.png"
                  alt="Apex Moon Logo"
                  fill
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

            {/* ── Desktop Navigation ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMegaMenu ? (
                  <div key={link.label} className="relative group">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "text-champagne"
                          : "text-espresso-950 hover:text-champagne"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="opacity-60" />
                    </Link>
                    <MegaMenu type={link.menuType} />
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      pathname === link.href
                        ? "text-champagne"
                        : "text-espresso-950 hover:text-champagne"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Action Icons ── */}
            <div className="flex items-center gap-1 sm:gap-2">
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
    </div>
  );
}
