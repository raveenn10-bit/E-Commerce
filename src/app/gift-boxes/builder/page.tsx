"use client";
import { useState } from "react";
import { products, categories, giftBoxSizes, giftBoxPackaging, giftBoxExtras, formatPrice, Product } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { Check, Plus, Minus, ShoppingBag, ChevronRight } from "lucide-react";

const steps = ["Box Size", "Products", "Packaging", "Extras", "Preview", "Done"];

export default function GiftBoxBuilderPage() {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState(giftBoxSizes[1]);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
  const [selectedPackaging, setSelectedPackaging] = useState(giftBoxPackaging[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const totalItems = Object.values(selectedProducts).reduce((s, q) => s + q, 0);
  const productsTotal = Object.entries(selectedProducts).reduce((s, [id, qty]) => {
    const p = products.find((p) => p.id === id);
    return s + (p ? p.price * qty : 0);
  }, 0);
  const extrasTotal = selectedExtras.reduce((s, id) => {
    const e = giftBoxExtras.find((e) => e.id === id);
    return s + (e ? e.price : 0);
  }, 0);
  const grandTotal = selectedSize.price + productsTotal + extrasTotal;

  const updateQty = (productId: string, delta: number) => {
    setSelectedProducts((prev) => {
      const curr = prev[productId] || 0;
      const next = curr + delta;
      if (next <= 0) { const { [productId]: _, ...rest } = prev; return rest; }
      if (totalItems - curr + next > selectedSize.maxItems) {
        addToast({ type: "warning", message: `This box holds max ${selectedSize.maxItems} items.` });
        return prev;
      }
      return { ...prev, [productId]: next };
    });
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  };

  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.categorySlug === activeCategory);

  const handleAddToCart = () => {
    const mockProduct: Product = {
      id: `gift-box-${Date.now()}`,
      slug: "custom-gift-box",
      name: `Custom ${selectedSize.name} Gift Box`,
      category: "Gift Boxes",
      categorySlug: "gift-boxes",
      brand: "Sweet Moon",
      price: grandTotal,
      rating: 5,
      reviewCount: 0,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop"],
      description: `Custom gift box with ${totalItems} items, ${selectedPackaging.name} packaging.`,
      shortDescription: `Custom ${selectedSize.name} with ${totalItems} items`,
      inStock: true,
      stockCount: 99,
      isNew: false,
      isBestSeller: false,
      isFeatured: false,
      tags: ["gift-box", "custom"],
      sku: `SM-CUSTOM-${Date.now()}`,
    };
    addItem(mockProduct);
    setAdded(true);
    addToast({ type: "success", message: "Custom gift box added to cart! 🎁" });
    setStep(6);
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-espresso-950 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-champagne text-sm font-medium uppercase tracking-widest mb-2">Make It Extra Special</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">Build Your Custom Gift Box</h1>
          <p className="text-chocolate-300 mt-2 text-sm">Choose your favorite items and create a personalized gift box for any occasion.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-chocolate-100 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const n = i + 1;
              const active = step === n;
              const done = step > n;
              return (
                <div key={s} className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-green-500 text-white" : active ? "bg-champagne text-espresso-950" : "bg-chocolate-100 text-chocolate-400"}`}>
                    {done ? <Check size={12} /> : n}
                  </div>
                  <span className={`text-xs hidden sm:block font-medium ${active ? "text-champagne" : done ? "text-green-600" : "text-chocolate-400"}`}>{s}</span>
                  {i < steps.length - 1 && <ChevronRight size={12} className="text-chocolate-300 hidden sm:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Step 1: Size */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-6">Choose Your Box Size</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {giftBoxSizes.map((size) => (
                <button key={size.id} onClick={() => setSelectedSize(size)}
                  className={`p-5 rounded-2xl border-2 text-center transition-all ${selectedSize.id === size.id ? "border-champagne bg-champagne/5 shadow-luxury" : "border-chocolate-200 bg-white hover:border-chocolate-300"}`}>
                  <span className="text-3xl mb-3 block">{size.icon}</span>
                  <p className="font-bold text-espresso-950 mb-1">{size.name}</p>
                  <p className="text-xs text-chocolate-400 mb-2">{size.description}</p>
                  <p className="text-champagne font-bold">{formatPrice(size.price)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Products */}
        {step === 2 && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-espresso-950">Choose Products</h2>
              <div className="text-sm text-chocolate-500 bg-white px-3 py-1.5 rounded-full border border-chocolate-200">
                {totalItems}/{selectedSize.maxItems} items
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-5">
              {[{ slug: "all", name: "All" }, ...categories].map((c) => (
                <button key={c.slug} onClick={() => setActiveCategory(c.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === c.slug ? "bg-champagne text-espresso-950" : "bg-white border border-chocolate-200 text-chocolate-600 hover:border-champagne"}`}>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((p) => {
                const qty = selectedProducts[p.id] || 0;
                return (
                  <div key={p.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="relative h-32">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="200px" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium text-espresso-950 line-clamp-2 mb-1">{p.name}</p>
                      <p className="text-xs text-champagne font-semibold mb-2">{formatPrice(p.price)}</p>
                      <div className="flex items-center justify-between">
                        {qty === 0 ? (
                          <button onClick={() => updateQty(p.id, 1)} className="w-full flex items-center justify-center gap-1 py-1.5 bg-espresso-950 text-white rounded-lg text-xs font-medium hover:bg-chocolate-800 transition-colors">
                            <Plus size={12} /> Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 w-full justify-center border border-chocolate-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQty(p.id, -1)} className="px-3 py-1.5 hover:bg-chocolate-50"><Minus size={12} /></button>
                            <span className="font-bold text-sm w-6 text-center">{qty}</span>
                            <button onClick={() => updateQty(p.id, 1)} className="px-3 py-1.5 hover:bg-chocolate-50"><Plus size={12} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Packaging */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-6">Choose Packaging</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {giftBoxPackaging.map((pkg) => (
                <button key={pkg.id} onClick={() => setSelectedPackaging(pkg)}
                  className={`p-5 rounded-2xl border-2 text-center transition-all ${selectedPackaging.id === pkg.id ? "border-champagne bg-champagne/5 shadow-luxury" : "border-chocolate-200 bg-white hover:border-chocolate-300"}`}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 shadow-md" style={{ backgroundColor: pkg.color }} />
                  <p className="font-bold text-espresso-950 mb-1">{pkg.name}</p>
                  <p className="text-xs text-chocolate-400">{pkg.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Extras */}
        {step === 4 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-6">Add Personal Extras</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {giftBoxExtras.map((extra) => {
                const selected = selectedExtras.includes(extra.id);
                return (
                  <button key={extra.id} onClick={() => toggleExtra(extra.id)}
                    className={`p-5 rounded-2xl border-2 text-center transition-all ${selected ? "border-champagne bg-champagne/5 shadow-luxury" : "border-chocolate-200 bg-white hover:border-chocolate-300"}`}>
                    {selected && <Check size={16} className="text-champagne absolute top-3 right-3" />}
                    <span className="text-3xl mb-3 block">{extra.icon}</span>
                    <p className="font-bold text-espresso-950 mb-1">{extra.name}</p>
                    <p className="text-champagne font-semibold text-sm">{formatPrice(extra.price)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Preview */}
        {step === 5 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-6">Preview Your Gift Box</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
                <div className="flex justify-between text-sm"><span className="text-chocolate-500 font-medium">Box Size</span><span className="font-bold">{selectedSize.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-chocolate-500 font-medium">Packaging</span><span className="font-bold">{selectedPackaging.name}</span></div>
                <div className="border-t border-chocolate-100 pt-4">
                  <p className="text-sm font-medium text-chocolate-500 mb-3">Selected Products ({totalItems} items)</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {Object.entries(selectedProducts).map(([id, qty]) => {
                      const p = products.find((p) => p.id === id);
                      return p ? (
                        <div key={id} className="flex justify-between text-xs">
                          <span className="text-espresso-950">{p.name} × {qty}</span>
                          <span className="font-semibold">{formatPrice(p.price * qty)}</span>
                        </div>
                      ) : null;
                    })}
                    {totalItems === 0 && <p className="text-xs text-chocolate-400">No products added</p>}
                  </div>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="border-t border-chocolate-100 pt-4">
                    <p className="text-sm font-medium text-chocolate-500 mb-2">Extras</p>
                    {selectedExtras.map((id) => {
                      const e = giftBoxExtras.find((e) => e.id === id);
                      return e ? <div key={id} className="flex justify-between text-xs mb-1"><span>{e.icon} {e.name}</span><span>{formatPrice(e.price)}</span></div> : null;
                    })}
                  </div>
                )}
                <div className="border-t border-chocolate-100 pt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-chocolate-500">Box</span><span>{formatPrice(selectedSize.price)}</span></div>
                  <div className="flex justify-between"><span className="text-chocolate-500">Products</span><span>{formatPrice(productsTotal)}</span></div>
                  <div className="flex justify-between"><span className="text-chocolate-500">Extras</span><span>{formatPrice(extrasTotal)}</span></div>
                  <div className="flex justify-between font-bold text-base border-t border-chocolate-100 pt-2"><span>Total</span><span className="text-champagne">{formatPrice(grandTotal)}</span></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-56 rounded-2xl overflow-hidden shadow-card">
                  <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop" alt="Gift box preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 to-transparent flex items-end p-4">
                    <p className="text-white font-serif text-lg font-bold">{selectedSize.name} · {selectedPackaging.name}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-espresso-950 mb-2 block">Personal Message (Optional)</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a heartfelt message..." className="input-luxury resize-none min-h-[100px]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Done */}
        {step === 6 && (
          <div className="text-center py-12 animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <ShoppingBag size={36} className="text-green-600" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-espresso-950 mb-3">Added to Cart! 🎁</h2>
            <p className="text-chocolate-500 mb-8">Your custom gift box has been added to your cart. Ready to checkout?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
              <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 6 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-chocolate-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">← Back</button>
            ) : <div />}
            {step < 5 ? (
              <button onClick={() => setStep(step + 1)} className="btn-primary">Next →</button>
            ) : (
              <button onClick={handleAddToCart} className="btn-primary">🎁 Add Gift Box to Cart</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
