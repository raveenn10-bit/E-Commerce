"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Package, Truck, CheckCircle, MapPin, Phone, MessageSquare } from "lucide-react";
import { formatPrice } from "@/lib/data";

export default function OrderDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "SM-94821";

  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            href="/account/orders"
            className="text-xs text-chocolate-500 hover:text-champagne inline-flex items-center gap-1 mb-2"
          >
            <ChevronLeft size={14} /> Back to Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="font-serif text-3xl font-bold text-espresso-950">
              Order #{id}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 self-start sm:self-auto">
              Status: Processing Delivery
            </span>
          </div>
          <p className="text-xs text-chocolate-500 mt-1">Placed on September 2, 2026</p>
        </div>

        {/* Timeline Tracker */}
        <div className="card-luxury p-6">
          <h2 className="font-serif text-base font-bold text-espresso-950 mb-6">
            Delivery Progress
          </h2>
          <div className="grid grid-cols-4 text-center relative">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto text-xs">
                ✓
              </div>
              <p className="text-xs font-semibold text-espresso-950">Confirmed</p>
              <p className="text-[10px] text-chocolate-400">Sep 2, 10:15 AM</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-champagne text-espresso-950 font-bold flex items-center justify-center mx-auto text-xs">
                2
              </div>
              <p className="text-xs font-semibold text-espresso-950">Packed</p>
              <p className="text-[10px] text-chocolate-400">Sep 2, 02:40 PM</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-chocolate-100 text-chocolate-500 flex items-center justify-center mx-auto text-xs">
                3
              </div>
              <p className="text-xs font-medium text-chocolate-500">In Transit</p>
              <p className="text-[10px] text-chocolate-400">Expected Tomorrow</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-chocolate-100 text-chocolate-500 flex items-center justify-center mx-auto text-xs">
                4
              </div>
              <p className="text-xs font-medium text-chocolate-500">Delivered</p>
              <p className="text-[10px] text-chocolate-400">Pending</p>
            </div>
          </div>
        </div>

        {/* Items & Summary */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 card-luxury p-6 space-y-4">
            <h2 className="font-serif text-base font-bold text-espresso-950">
              Items in this Order
            </h2>
            <div className="divide-y divide-chocolate-100">
              <div className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold text-espresso-950">Ferrero Rocher T24 Gold Box</p>
                  <p className="text-xs text-chocolate-400">Qty: 1 &bull; 300g Premium Italian Hazelnut</p>
                </div>
                <p className="font-bold text-espresso-950">{formatPrice(6950)}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-chocolate-100 space-y-2 text-xs">
              <div className="flex justify-between text-chocolate-600">
                <span>Subtotal</span>
                <span>{formatPrice(6950)}</span>
              </div>
              <div className="flex justify-between text-chocolate-600">
                <span>Islandwide Delivery</span>
                <span className="text-green-600 font-semibold">FREE (Order &gt; Rs. 5,000)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-espresso-950 pt-2 border-t border-chocolate-50">
                <span>Total Paid (Cash on Delivery)</span>
                <span className="text-champagne text-base">{formatPrice(6950)}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 card-luxury p-6 space-y-4">
            <h2 className="font-serif text-base font-bold text-espresso-950">
              Delivery Address
            </h2>
            <div className="text-xs text-chocolate-700 space-y-1">
              <p className="font-semibold text-espresso-950">Kasun Silva</p>
              <p>No 45 Wakwella Road</p>
              <p>Colombo 03, Southern Province</p>
              <p className="pt-1 text-chocolate-500">Phone: 077 456 7890</p>
            </div>

            <div className="pt-4 border-t border-chocolate-100">
              <a
                href={`https://wa.me/94770663154?text=${encodeURIComponent(`Hi Apex Moon! I have an inquiry regarding my order #${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-xs justify-center flex items-center gap-1.5"
              >
                <MessageSquare size={14} /> WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
