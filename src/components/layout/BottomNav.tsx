"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, Search, Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    type: "link" as const,
  },
  {
    label: "Categories",
    href: "/shop",
    icon: Grid2x2,
    type: "link" as const,
  },
  {
    label: "Search",
    href: null,
    icon: Search,
    type: "action" as const,
    action: "search" as const,
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
    type: "link" as const,
    badge: "wishlist",
  },
  {
    label: "Cart",
    href: null,
    icon: ShoppingCart,
    type: "action" as const,
    action: "cart" as const,
    badge: "cart",
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openSearch = useUIStore((s) => s.openSearch);
  const openCart = useCartStore((s) => s.openCart);

  const getBadgeCount = (badge?: string) => {
    if (badge === "cart") return cartCount;
    if (badge === "wishlist") return wishlistCount;
    return 0;
  };

  const handleAction = (action?: "search" | "cart") => {
    if (action === "search") openSearch();
    if (action === "cart") openCart();
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-chocolate-100 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] safe-bottom"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const badgeCount = getBadgeCount(item.badge);
          const isActive =
            item.href !== null &&
            (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));

          if (item.type === "action") {
            return (
              <button
                key={item.label}
                onClick={() => handleAction(item.action)}
                aria-label={item.label}
                className={`relative flex flex-col items-center gap-1 min-w-[56px] py-1 px-2 rounded-xl transition-all duration-200 ${
                  item.label === "Cart"
                    ? "text-espresso-950 hover:text-champagne"
                    : "text-chocolate-400 hover:text-champagne"
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={1.8} />
                  {badgeCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                      {badgeCount > 99 ? "99+" : badgeCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium leading-none">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              aria-label={item.label}
              className={`relative flex flex-col items-center gap-1 min-w-[56px] py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-champagne"
                  : "text-chocolate-400 hover:text-champagne"
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute -top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-champagne rounded-full" />
              )}

              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? "fill-champagne/10" : ""}
                />
                {item.badge && badgeCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 bg-blush text-espresso-950 text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium leading-none ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
