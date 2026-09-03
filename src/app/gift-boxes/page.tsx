import { products, categories } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Image from "next/image";

const giftProducts = products.filter((p) => p.categorySlug === "gift-boxes");

export default function GiftBoxesPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <div className="relative bg-espresso-950 overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&h=600&fit=crop" alt="Gift boxes" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-champagne text-sm font-medium uppercase tracking-widest mb-3">🎁 Apex Moon</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">The Perfect Gift<br />for Every Occasion</h1>
          <p className="text-chocolate-300 text-lg max-w-2xl mx-auto mb-8">Handcrafted with love — premium chocolates, imported treats, and beautiful packaging that says it all.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gift-boxes/builder" className="btn-primary">🎨 Build Custom Gift Box</Link>
            <a href="#collections" className="btn-secondary">Browse Collections</a>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-10 border-b border-chocolate-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🎯", title: "Choose Products", desc: "Pick your favorite items" },
            { icon: "💌", title: "Add Personal Touch", desc: "Message, Flowers & More" },
            { icon: "🎀", title: "Beautiful Packaging", desc: "Premium wrapping" },
            { icon: "🚚", title: "Fast Delivery", desc: "Across Sri Lanka" },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <div className="text-3xl mb-2">{b.icon}</div>
              <p className="font-semibold text-espresso-950 text-sm">{b.title}</p>
              <p className="text-xs text-chocolate-400 mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom builder CTA */}
      <div className="bg-champagne/10 py-12 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-luxury">
            <Image src="https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=400&h=400&fit=crop" alt="Custom gift box" fill className="object-cover" />
          </div>
          <div>
            <p className="section-subheading mb-2">100% Personalised</p>
            <h2 className="font-serif text-3xl font-bold text-espresso-950 mb-3">Build Your Own Gift Box</h2>
            <p className="text-chocolate-500 text-sm mb-5">Choose exactly what goes inside — chocolates, ramen, snacks, drinks, teddies — with your personal message and packaging of choice.</p>
            <Link href="/gift-boxes/builder" className="btn-primary">Start Building →</Link>
          </div>
        </div>
      </div>

      {/* Ready-made gift boxes */}
      <div id="collections" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Ready-Made Gift Boxes</h2>
          <Link href="/shop/gift-boxes" className="text-champagne text-sm hover:underline">View All →</Link>
        </div>
        {giftProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {giftProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-chocolate-400 mb-4">Ready-made boxes coming soon!</p>
            <Link href="/gift-boxes/builder" className="btn-primary">Build a Custom Box Instead</Link>
          </div>
        )}
      </div>
    </div>
  );
}
