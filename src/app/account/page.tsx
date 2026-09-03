"use client";

import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut, ChevronRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice } from "@/lib/data";

export default function AccountDashboardPage() {
  const { items } = useCartStore();
  const wishlistItems = useWishlistStore((s) => s.items);

  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-espresso-950">
              My Account
            </h1>
            <p className="text-xs text-chocolate-600 mt-1">
              Welcome back to your Sweet Moon customer portal
            </p>
          </div>
          <Link href="/shop" className="btn-primary text-xs py-2.5">
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="card-luxury p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-champagne/20 text-champagne flex items-center justify-center mx-auto text-2xl font-serif font-bold mb-3">
                SM
              </div>
              <h2 className="font-serif text-lg font-bold text-espresso-950">
                Sweet Moon VIP Customer
              </h2>
              <p className="text-xs text-chocolate-500">customer@sweetmoon.lk</p>
              <div className="mt-4 inline-block bg-champagne/10 text-champagne text-[11px] font-semibold px-3 py-1 rounded-full">
                Loyalty Member
              </div>
            </div>

            <nav className="card-luxury p-2 divide-y divide-chocolate-50">
              <Link
                href="/account"
                className="flex items-center justify-between p-3 text-sm font-semibold text-champagne hover:bg-chocolate-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-3">
                  <User size={18} /> Dashboard
                </span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center justify-between p-3 text-sm font-medium text-espresso-950 hover:text-champagne hover:bg-chocolate-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Package size={18} /> My Orders
                </span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/account/wishlist"
                className="flex items-center justify-between p-3 text-sm font-medium text-espresso-950 hover:text-champagne hover:bg-chocolate-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} /> Wishlist ({wishlistItems.length})
                </span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/account/profile"
                className="flex items-center justify-between p-3 text-sm font-medium text-espresso-950 hover:text-champagne hover:bg-chocolate-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-3">
                  <MapPin size={18} /> Profile &amp; Addresses
                </span>
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-between p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-3">
                  <LogOut size={18} /> Log Out
                </span>
              </Link>
            </nav>
          </aside>

          {/* Main Area */}
          <main className="lg:col-span-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card-luxury p-5 text-center">
                <p className="text-xs text-chocolate-500 mb-1">Total Orders</p>
                <p className="font-serif text-2xl font-bold text-espresso-950">3</p>
                <p className="text-[11px] text-green-600 font-medium mt-1">1 Active delivery</p>
              </div>
              <div className="card-luxury p-5 text-center">
                <p className="text-xs text-chocolate-500 mb-1">Wishlist Items</p>
                <p className="font-serif text-2xl font-bold text-espresso-950">{wishlistItems.length}</p>
                <Link href="/account/wishlist" className="text-[11px] text-champagne font-medium hover:underline mt-1 block">
                  View Wishlist &rarr;
                </Link>
              </div>
              <div className="card-luxury p-5 text-center">
                <p className="text-xs text-chocolate-500 mb-1">Cart Items</p>
                <p className="font-serif text-2xl font-bold text-espresso-950">{items.length}</p>
                <Link href="/cart" className="text-[11px] text-champagne font-medium hover:underline mt-1 block">
                  Go to Cart &rarr;
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-espresso-950">
                  Recent Orders
                </h3>
                <Link href="/account/orders" className="text-xs text-champagne font-semibold hover:underline">
                  View All &rarr;
                </Link>
              </div>

              <div className="divide-y divide-chocolate-100">
                <div className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-espresso-950">Order #SM-94821</p>
                    <p className="text-chocolate-400">Placed on Sep 2, 2026</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                    Processing
                  </span>
                  <div className="text-right">
                    <p className="font-bold text-espresso-950">{formatPrice(6950)}</p>
                    <Link href="/account/orders/SM-94821" className="text-champagne hover:underline">
                      Details
                    </Link>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-espresso-950">Order #SM-81204</p>
                    <p className="text-chocolate-400">Placed on Aug 18, 2026</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                    Delivered
                  </span>
                  <div className="text-right">
                    <p className="font-bold text-espresso-950">{formatPrice(3450)}</p>
                    <Link href="/account/orders/SM-81204" className="text-champagne hover:underline">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl border border-chocolate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-espresso-950 text-base">
                  Need a custom gift box designed?
                </h4>
                <p className="text-xs text-chocolate-600 mt-1">
                  Use our live 3D custom builder to craft personal hampers for any occasion.
                </p>
              </div>
              <Link href="/gift-boxes/builder" className="btn-primary text-xs shrink-0">
                Launch Box Builder
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
