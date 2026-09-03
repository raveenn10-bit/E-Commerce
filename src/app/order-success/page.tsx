"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Truck, Phone } from "lucide-react";

export default function OrderSuccessPage() {
  const [orderId] = useState(() => `SM-${Math.floor(10000 + Math.random() * 90000)}`);
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const whatsappMsg = encodeURIComponent(`Hi Sweet Moon! 🍫\n\nI just placed an order with ID: ${orderId}\n\nCould you please confirm the details and expected delivery time? Thank you!`);

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated checkmark */}
        <div className={`w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 transition-all duration-700 ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
          <CheckCircle size={48} className="text-green-500" />
        </div>

        <h1 className={`font-serif text-3xl md:text-4xl font-bold text-espresso-950 mb-3 transition-all duration-700 delay-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Order Placed Successfully!
        </h1>
        <p className={`text-champagne font-semibold text-lg mb-2 transition-all duration-700 delay-300 ${show ? "opacity-100" : "opacity-0"}`}>
          {orderId}
        </p>
        <p className={`text-chocolate-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto transition-all duration-700 delay-400 ${show ? "opacity-100" : "opacity-0"}`}>
          Thank you for your order! We will contact you via WhatsApp to confirm delivery details and estimated arrival time.
        </p>

        <div className={`grid grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-500 ${show ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white rounded-2xl p-4 shadow-card text-center">
            <Package size={24} className="text-champagne mx-auto mb-2" />
            <p className="text-xs font-semibold text-espresso-950">Order Status</p>
            <p className="text-xs text-chocolate-400 mt-0.5">Pending</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card text-center">
            <Truck size={24} className="text-champagne mx-auto mb-2" />
            <p className="text-xs font-semibold text-espresso-950">Delivery</p>
            <p className="text-xs text-chocolate-400 mt-0.5">3–5 days</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card text-center">
            <Phone size={24} className="text-champagne mx-auto mb-2" />
            <p className="text-xs font-semibold text-espresso-950">Support</p>
            <p className="text-xs text-chocolate-400 mt-0.5">076 608 9763</p>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-600 ${show ? "opacity-100" : "opacity-0"}`}>
          <a href={`https://wa.me/94766089763?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center py-3 px-6 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors">
            Track on WhatsApp
          </a>
          <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
