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
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";
import TopBar from "@/components/layout/TopBar";
import MegaMenu from "@/components/layout/MegaMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
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
  const { openSearch, openMobileNav } = useUIStore();

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

      {/* Main Header */}
      <header
        className={`bg-ivory border-b border-chocolate-100 transition-all duration-300 ${
          scrolled ? "header-scrolled" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden shadow-luxury group-hover:scale-105 transition-transform bg-white shrink-0 border border-champagne/30">
                <Image
                  src="/logo.png"
                  alt="Sweet Moon Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-serif text-xl font-bold text-espresso-950 leading-none tracking-tight">
                  Sweet{" "}
                  <span className="text-champagne">Moon</span>
                </span>
                <p className="text-chocolate-500 text-[10px] tracking-widest uppercase leading-none mt-1 font-semibold">
                  Chocolates &amp; Nuts
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

            {/* ── Right Icons ── */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={openSearch}
                aria-label="Search products"
                className="p-2 rounded-lg text-espresso-950 hover:text-champagne hover:bg-chocolate-50 transition-all duration-200"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="relative p-2 rounded-lg text-espresso-950 hover:text-champagne hover:bg-chocolate-50 transition-all duration-200"
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
                className="hidden sm:flex p-2 rounded-lg text-espresso-950 hover:text-champagne hover:bg-chocolate-50 transition-all duration-200"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label={`Shopping cart (${cartItemCount} items)`}
                className="relative p-2 rounded-lg text-espresso-950 hover:text-champagne hover:bg-chocolate-50 transition-all duration-200"
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
                className="lg:hidden p-2 rounded-lg text-espresso-950 hover:text-champagne hover:bg-chocolate-50 transition-all duration-200 ml-1"
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
