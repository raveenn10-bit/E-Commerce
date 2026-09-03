"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/data";

export default function MiniCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal, getTotalItems } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const subtotal = getSubtotal();
  const delivery = getDeliveryFee();
  const freeDeliveryThreshold = 5000;
  const progressPct = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const remaining = freeDeliveryThreshold - subtotal;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-espresso-950/60 backdrop-blur-sm z-[90] transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-ivory z-[95] flex flex-col shadow-luxury-lg transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-chocolate-100 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-champagne" />
            <h2 className="font-serif font-bold text-espresso-950 text-lg">Your Cart</h2>
            {getTotalItems() > 0 && (
              <span className="bg-champagne text-espresso-950 text-xs font-bold rounded-full px-2 py-0.5">
                {getTotalItems()}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-chocolate-50 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag size={56} className="text-chocolate-200" />
            <h3 className="font-serif text-xl font-semibold text-espresso-950">Your cart is empty</h3>
            <p className="text-chocolate-400 text-sm">Add some sweet treats to get started!</p>
            <Link href="/shop" onClick={closeCart} className="btn-primary mt-2">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free delivery progress */}
            <div className="px-5 py-3 bg-chocolate-50 border-b border-chocolate-100">
              {remaining > 0 ? (
                <p className="text-xs text-chocolate-600 mb-1.5">
                  Add <span className="font-semibold text-champagne">{formatPrice(remaining)}</span> more for free delivery!
                </p>
              ) : (
                <p className="text-xs text-green-700 font-semibold mb-1.5">🎉 You qualify for FREE delivery!</p>
              )}
              <div className="h-1.5 bg-chocolate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-champagne rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start gap-3 px-5 py-4 border-b border-chocolate-50 hover:bg-white transition-colors">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-chocolate-50">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-espresso-950 leading-snug line-clamp-2">{item.product.name}</h4>
                    <p className="text-xs text-chocolate-400 mt-0.5">{item.product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-chocolate-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-chocolate-50 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-chocolate-50 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-espresso-950">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 hover:text-red-500 text-chocolate-300 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-chocolate-100 bg-white p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-chocolate-500">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-chocolate-500">Delivery</span>
                <span className={delivery === 0 ? "text-green-600 font-semibold" : "font-semibold"}>
                  {delivery === 0 ? "FREE" : formatPrice(delivery)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-chocolate-100 pt-3">
                <span>Total</span>
                <span className="text-champagne">{formatPrice(getTotal())}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full justify-center text-center block"
              >
                CHECKOUT
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block text-center text-sm text-chocolate-500 hover:text-champagne transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
