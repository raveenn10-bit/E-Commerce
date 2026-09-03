"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice, products } from "@/lib/data";
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, ChevronRight } from "lucide-react";

const COUPONS: Record<string, number> = {
  SWEET10: 10, WELCOME20: 20, GALLE50: 5, GIFT15: 15,
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const { addToast } = useUIStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);

  const subtotal = getSubtotal();
  const delivery = getDeliveryFee();
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.percent) / 100) : 0;
  const total = subtotal + delivery - discount;

  const applyCoupon = () => {
    const pct = COUPONS[couponCode.toUpperCase()];
    if (pct) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), percent: pct });
      addToast({ type: "success", message: `Coupon applied! ${pct}% discount 🎉` });
    } else {
      addToast({ type: "error", message: "Invalid coupon code. Try: SWEET10 or WELCOME20" });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center gap-5 text-center px-4 py-20">
        <ShoppingBag size={72} className="text-chocolate-200" />
        <h1 className="font-serif text-3xl font-bold text-espresso-950">Your cart is empty</h1>
        <p className="text-chocolate-400 max-w-sm">Looks like you haven&apos;t added anything yet. Explore our premium selection!</p>
        <Link href="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  const freeShippingRemaining = Math.max(0, 5000 - subtotal);

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-espresso-950 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1 text-xs text-chocolate-400 mb-2">
            <Link href="/" className="hover:text-champagne">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white">Shopping Cart</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {freeShippingRemaining > 0 && (
          <div className="bg-champagne/10 border border-champagne/30 rounded-xl p-3 mb-6 text-sm text-espresso-950">
            Add <span className="font-bold text-champagne">{formatPrice(freeShippingRemaining)}</span> more to get <span className="font-bold">FREE delivery</span>!
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-card">
                <Link href={`/product/${item.product.slug}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-chocolate-50">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <Link href={`/product/${item.product.slug}`} className="font-semibold text-espresso-950 text-sm hover:text-champagne transition-colors line-clamp-2">{item.product.name}</Link>
                    <button onClick={() => removeItem(item.product.id)} className="text-chocolate-300 hover:text-red-500 transition-colors flex-shrink-0 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-chocolate-400 mt-0.5">{item.product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-chocolate-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-chocolate-50 transition-colors"><Minus size={12} /></button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-chocolate-50 transition-colors"><Plus size={12} /></button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-espresso-950">{formatPrice(item.product.price * item.quantity)}</p>
                      <p className="text-xs text-chocolate-400">{formatPrice(item.product.price)} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <p className="text-sm font-semibold text-espresso-950 mb-3 flex items-center gap-2"><Tag size={14} className="text-champagne" /> Coupon Code</p>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
                  <span className="text-green-700 font-semibold text-sm">{appliedCoupon.code} — {appliedCoupon.percent}% OFF applied!</span>
                  <button onClick={() => setAppliedCoupon(null)} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="input-luxury flex-1"
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button onClick={applyCoupon} className="btn-dark px-4 whitespace-nowrap">Apply</button>
                </div>
              )}
              <p className="text-xs text-chocolate-400 mt-2">Try: SWEET10, WELCOME20, GIFT15</p>
            </div>

            <Link href="/shop" className="text-sm text-champagne hover:underline flex items-center gap-1 mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-espresso-950 mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-chocolate-500">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-chocolate-500">Delivery</span><span className={delivery === 0 ? "text-green-600 font-medium" : "font-medium"}>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-chocolate-100 pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-champagne text-lg">{formatPrice(total)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full justify-center mt-5 text-center block">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <a href={`https://wa.me/94766089763?text=${encodeURIComponent("Hi Sweet Moon! I'd like to place an order via WhatsApp.")}`} target="_blank" rel="noopener noreferrer" className="block text-center text-sm text-green-600 hover:underline mt-3">
                💬 Order via WhatsApp
              </a>
              <div className="mt-5 pt-4 border-t border-chocolate-100">
                <p className="text-xs text-chocolate-400 text-center">🔒 Secure checkout. Your data is protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
