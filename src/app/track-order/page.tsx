"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/data";

interface TrackingEvent {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

interface MockOrder {
  id: string;
  phone: string;
  customerName: string;
  date: string;
  status: "Confirmed" | "Processing" | "Out for Delivery" | "Delivered";
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  deliveryAddress: string;
  paymentMethod: string;
  items: {
    name: string;
    image: string;
    qty: number;
    price: number;
  }[];
  events: TrackingEvent[];
}

const MOCK_ORDERS: Record<string, MockOrder> = {
  "SM-48291": {
    id: "SM-48291",
    phone: "0766089763",
    customerName: "Kasun Perera",
    date: "Sep 02, 2026",
    status: "Out for Delivery",
    estimatedDelivery: "Today by 6:00 PM",
    carrier: "Sweet Moon Express Courier — Galle",
    trackingNumber: "TRK-GL-89210",
    deliveryAddress: "No. 45, Wakwella Road, Galle, Southern Province",
    paymentMethod: "Cash on Delivery (COD)",
    items: [
      {
        name: "Ferrero Rocher T24",
        image: "/products/korean-ramen/buldak-spicy.jpg",
        qty: 1,
        price: 6950,
      },
      {
        name: "Coca-Cola Vanilla Zero Sugar 325ml",
        image: "/hero/slide-1-coca-cola.png",
        qty: 2,
        price: 650,
      },
    ],
    events: [
      {
        title: "Order Placed & Confirmed",
        description: "Your order has been verified and registered at Sweet Moon.",
        date: "Sep 02, 2026 • 10:30 AM",
        completed: true,
      },
      {
        title: "Packed with Luxury Ribbon",
        description: "Handpicked fresh from Galle Boutique with signature wrapping.",
        date: "Sep 02, 2026 • 02:15 PM",
        completed: true,
      },
      {
        title: "Out for Delivery",
        description: "Rider is en route to your delivery address in Galle.",
        date: "Today • 11:00 AM",
        completed: true,
        current: true,
      },
      {
        title: "Delivered to Doorstep",
        description: "Package received and payment completed.",
        date: "Expected today by 6:00 PM",
        completed: false,
      },
    ],
  },
  "SM-78210": {
    id: "SM-78210",
    phone: "0771234567",
    customerName: "Dilani Silva",
    date: "Sep 03, 2026",
    status: "Processing",
    estimatedDelivery: "Tomorrow, Sep 04",
    carrier: "Pronto Island-wide Delivery",
    trackingNumber: "TRK-CM-33910",
    deliveryAddress: "No. 12/B, Havelock Road, Colombo 05",
    paymentMethod: "Bank Transfer (Confirmed)",
    items: [
      {
        name: "Sweet Moon Luxury Hamper",
        image: "/products/luxury-hamper-transparent.png",
        qty: 1,
        price: 8950,
      },
    ],
    events: [
      {
        title: "Order Placed & Confirmed",
        description: "Bank transfer payment slip approved.",
        date: "Sep 03, 2026 • 04:20 PM",
        completed: true,
      },
      {
        title: "Boutique Packaging in Progress",
        description: "Gift box being arranged with personalized card.",
        date: "Sep 03, 2026 • 06:00 PM",
        completed: true,
        current: true,
      },
      {
        title: "Dispatched to Islandwide Hub",
        description: "Handing over to courier for transit.",
        date: "Tomorrow Morning",
        completed: false,
      },
      {
        title: "Delivered",
        description: "Delivered to Colombo address.",
        date: "Expected Sep 04",
        completed: false,
      },
    ],
  },
};

export default function TrackOrderPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<MockOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = searchInput.trim().toUpperCase().replace("#", "");
    setHasSearched(true);

    if (MOCK_ORDERS[cleaned]) {
      setSearchedOrder(MOCK_ORDERS[cleaned]);
      return;
    }

    // Try search by phone
    const byPhone = Object.values(MOCK_ORDERS).find((o) =>
      o.phone.includes(searchInput.trim())
    );
    if (byPhone) {
      setSearchedOrder(byPhone);
      return;
    }

    setSearchedOrder(null);
  };

  const loadSample = (id: string) => {
    setSearchInput(id);
    setSearchedOrder(MOCK_ORDERS[id]);
    setHasSearched(true);
  };

  const getSubtotal = (items: MockOrder["items"]) =>
    items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF6EF] dark:bg-[#141E30] transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-champagne bg-white dark:bg-white/10 border border-champagne/30 uppercase shadow-sm">
            <Package size={13} /> Live Order Tracking
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-950 dark:text-white">
            Track Your <span className="text-champagne">Sweet Order</span>
          </h1>
          <p className="text-sm text-chocolate-700 dark:text-silver max-w-md mx-auto">
            Enter your Order ID (e.g. <span className="font-semibold text-champagne">SM-48291</span>) or Phone Number to check real-time delivery status.
          </p>
        </div>

        {/* Search Box Card */}
        <div className="bg-white dark:bg-[#1D2C44] rounded-3xl p-6 sm:p-8 shadow-luxury border border-chocolate-100 dark:border-white/10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-400 dark:text-silver"
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. SM-48291) or Phone Number..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF6EF] dark:bg-white/[0.07] border border-chocolate-200 dark:border-white/15 text-espresso-950 dark:text-white placeholder-chocolate-400 dark:placeholder-white/40 focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-espresso-950 hover:bg-champagne hover:text-espresso-950 dark:bg-white dark:hover:bg-champagne text-white dark:text-espresso-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Track Order <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Demo Samples */}
          <div className="mt-4 pt-4 border-t border-chocolate-100 dark:border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-chocolate-500 dark:text-silver font-medium">
              Try sample orders:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => loadSample("SM-48291")}
                className="px-2.5 py-1 rounded-lg bg-champagne/10 hover:bg-champagne/20 text-champagne font-semibold transition-colors"
              >
                #SM-48291 (Out for Delivery)
              </button>
              <button
                onClick={() => loadSample("SM-78210")}
                className="px-2.5 py-1 rounded-lg bg-champagne/10 hover:bg-champagne/20 text-champagne font-semibold transition-colors"
              >
                #SM-78210 (Processing)
              </button>
            </div>
          </div>
        </div>

        {/* Result Area */}
        {hasSearched && (
          searchedOrder ? (
            <div className="space-y-6 animate-fade-up">
              {/* Status Header Banner */}
              <div className="bg-espresso-950 text-white rounded-3xl p-6 sm:p-8 shadow-luxury relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                        Order #{searchedOrder.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                        {searchedOrder.status}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Estimated: {searchedOrder.estimatedDelivery}
                    </h2>
                    <p className="text-xs text-chocolate-300 mt-1">
                      Recipient: {searchedOrder.customerName} • {searchedOrder.carrier}
                    </p>
                  </div>

                  {/* WhatsApp Help CTA */}
                  <a
                    href={`https://wa.me/94766089763?text=${encodeURIComponent(
                      `Hi Sweet Moon, I am inquiring about my order #${searchedOrder.id} for ${searchedOrder.customerName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider transition-all self-start sm:self-center shadow-md"
                  >
                    <MessageCircle size={15} /> WhatsApp Support
                  </a>
                </div>
              </div>

              {/* Progress Stepper Timeline */}
              <div className="bg-white dark:bg-[#1D2C44] rounded-3xl p-6 sm:p-8 shadow-sm border border-chocolate-100 dark:border-white/10">
                <h3 className="font-serif text-lg font-bold text-espresso-950 dark:text-white mb-6">
                  Delivery Progress
                </h3>
                <div className="relative space-y-8 pl-8 sm:pl-10 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-chocolate-200 dark:before:bg-white/10">
                  {searchedOrder.events.map((event, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-8 sm:-left-10 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#1D2C44] ${
                          event.completed
                            ? "bg-champagne text-espresso-950"
                            : "bg-gray-200 dark:bg-white/20 text-gray-500"
                        }`}
                      >
                        {event.completed ? (
                          <CheckCircle2 size={14} className="stroke-[3]" />
                        ) : (
                          <Clock size={12} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm font-bold ${
                              event.current
                                ? "text-champagne font-extrabold"
                                : "text-espresso-950 dark:text-white"
                            }`}
                          >
                            {event.title}
                          </h4>
                          {event.current && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-champagne/15 text-champagne animate-pulse">
                              Current Status
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-chocolate-600 dark:text-silver mt-0.5">
                          {event.description}
                        </p>
                        <span className="text-[11px] text-chocolate-400 dark:text-white/40 mt-1 block">
                          {event.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items & Details Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Items (7 cols) */}
                <div className="md:col-span-7 bg-white dark:bg-[#1D2C44] rounded-3xl p-6 shadow-sm border border-chocolate-100 dark:border-white/10">
                  <h3 className="font-serif text-base font-bold text-espresso-950 dark:text-white mb-4">
                    Items in this Package
                  </h3>
                  <div className="divide-y divide-chocolate-100 dark:divide-white/10">
                    {searchedOrder.items.map((item, i) => (
                      <div key={i} className="py-3 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-ivory dark:bg-white/5 overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-espresso-950 dark:text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-chocolate-500 dark:text-silver">
                            Qty: {item.qty} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-champagne">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment (5 cols) */}
                <div className="md:col-span-5 bg-white dark:bg-[#1D2C44] rounded-3xl p-6 shadow-sm border border-chocolate-100 dark:border-white/10 space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                      <MapPin size={13} className="text-champagne" /> Delivery Address
                    </h4>
                    <p className="text-chocolate-700 dark:text-silver leading-relaxed">
                      {searchedOrder.deliveryAddress}
                    </p>
                  </div>

                  <div className="border-t border-chocolate-100 dark:border-white/10 pt-3">
                    <h4 className="font-bold text-espresso-950 dark:text-white uppercase tracking-wider text-[11px] mb-1">
                      Payment Method
                    </h4>
                    <p className="text-chocolate-700 dark:text-silver">
                      {searchedOrder.paymentMethod}
                    </p>
                  </div>

                  <div className="border-t border-chocolate-100 dark:border-white/10 pt-3 flex justify-between items-center text-sm font-bold">
                    <span className="text-espresso-950 dark:text-white">Total Value:</span>
                    <span className="text-champagne font-serif text-base">
                      {formatPrice(getSubtotal(searchedOrder.items))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1D2C44] rounded-3xl p-10 text-center shadow-sm border border-chocolate-100 dark:border-white/10 space-y-3 animate-fade-up">
              <AlertCircle size={40} className="mx-auto text-amber-500" />
              <h3 className="font-serif text-xl font-bold text-espresso-950 dark:text-white">
                No Order Found
              </h3>
              <p className="text-xs sm:text-sm text-chocolate-600 dark:text-silver max-w-sm mx-auto">
                We couldn&apos;t find any order matching &ldquo;{searchInput}&rdquo;. Please verify your Order ID or chat with us on WhatsApp.
              </p>
              <a
                href="https://wa.me/94766089763"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider transition-all mt-2"
              >
                Inquire on WhatsApp <MessageCircle size={14} />
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
