"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Ordering & Delivery",
    q: "How fast do you deliver across Sri Lanka?",
    a: "Within Galle city limits, we provide same-day or 24-hour delivery! For other regions across Sri Lanka (Colombo, Kandy, Matara, etc.), standard courier delivery takes 2 to 4 business days. Express delivery takes 1 to 2 business days.",
  },
  {
    category: "Ordering & Delivery",
    q: "What are your delivery fees?",
    a: "Standard islandwide delivery is Rs. 350. Orders above Rs. 5,000 enjoy 100% FREE delivery! Express delivery is Rs. 650, and in-person store pickup at No. 88 Moonlit Boulevard, Colombo 03 is completely free.",
  },
  {
    category: "Ordering & Delivery",
    q: "Can I place an order directly through WhatsApp?",
    a: "Yes! Click any 'Order via WhatsApp' button across our store or message us directly at 077 066 3154. Our team will verify your item list, payment option, and confirm your delivery immediately.",
  },
  {
    category: "Products & Authenticity",
    q: "Are all chocolates and snacks authentic originals?",
    a: "Absolutely 100%. We directly import all chocolates (Ferrero Rocher, Lindt, Kinder, Nutella, Galaxy), Korean Buldak ramen, Japanese snacks, and canned beverages with verifiable expiration dates and genuine manufacturer seals.",
  },
  {
    category: "Products & Authenticity",
    q: "How do you protect chocolates from melting during transit?",
    a: "We use insulated foil packaging, protective bubble cushioning, and temperature-conscious dispatch logistics to ensure your chocolates arrive in perfect, pristine condition even in tropical weather.",
  },
  {
    category: "Custom Gift Boxes",
    q: "How does the Custom Gift Box Builder work?",
    a: "Use our interactive Gift Box Builder at /gift-boxes/builder! Step 1: Pick your box size. Step 2: Choose from our entire catalog of treats. Step 3: Select your luxury wrapping and ribbon colors. Step 4: Add cards, plushies, or flowers. Step 5: Write your custom greeting message!",
  },
  {
    category: "Custom Gift Boxes",
    q: "Can you deliver a surprise gift box directly to the recipient?",
    a: "Yes! Simply provide the recipient's shipping address and contact number during checkout. We will attach your custom greeting card and will not include billing invoice prices inside the gift box.",
  },
  {
    category: "Payments & Returns",
    q: "What payment methods do you accept?",
    a: "We accept Cash on Delivery (COD) islandwide, direct Bank Transfer (Commercial Bank / Sampath Bank), and online WhatsApp instant confirmations.",
  },
  {
    category: "Payments & Returns",
    q: "What is your refund or replacement policy?",
    a: "If an item arrives damaged or incorrect, contact us on WhatsApp with a photo within 48 hours of delivery and we will immediately provide a free replacement or full refund.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = ["All", "Ordering & Delivery", "Products & Authenticity", "Custom Gift Boxes", "Payments & Returns"];

  const filteredFaqs = selectedCat === "All" ? faqs : faqs.filter((f) => f.category === selectedCat);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="bg-espresso-950 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-champagne uppercase text-xs font-semibold tracking-[0.25em] mb-2">
            Help &amp; Answers
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-chocolate-200 text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about shopping, gift customization, and delivery with Apex Moon.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? "bg-champagne text-espresso-950 shadow-sm"
                  : "bg-white text-chocolate-700 hover:bg-chocolate-50 border border-chocolate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-chocolate-100 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-espresso-950 text-sm md:text-base hover:text-champagne transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-champagne shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-chocolate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-champagne" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-chocolate-800 leading-relaxed border-t border-chocolate-50 bg-ivory/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-12 p-8 rounded-2xl bg-espresso-950 text-white text-center space-y-4 shadow-luxury">
          <h2 className="font-serif text-2xl font-bold text-champagne">
            Still Have Questions?
          </h2>
          <p className="text-chocolate-200 text-xs md:text-sm max-w-md mx-auto">
            Can&apos;t find what you are looking for? Chat with our sweet team in Galle directly on WhatsApp!
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="https://wa.me/94770663154?text=Hi%20Sweet%20Moon!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Support
            </a>
            <Link href="/contact" className="btn-secondary">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
