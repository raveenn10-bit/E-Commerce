"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice } from "@/lib/data";
import { ChevronRight, CreditCard, Banknote, Smartphone, MapPin, Shield } from "lucide-react";

const sriLankaDistricts = ["Galle","Colombo","Kandy","Matara","Hambantota","Kalutara","Gampaha","Ratnapura","Kegalle","Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Monaragala","Nuwara Eliya","Trincomalee","Batticaloa","Ampara","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu"];

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const { addToast } = useUIStore();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "", phone: "", whatsapp: "", email: "",
    address1: "", address2: "", city: "", district: "Galle", postalCode: "", notes: "",
    delivery: "standard", payment: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = form.delivery === "pickup" ? 0 : form.delivery === "express" ? 650 : 350;
  const subtotal = getSubtotal();
  const total = subtotal + deliveryFee;

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName) e.fullName = "Name is required";
    if (!form.phone) e.phone = "Phone is required";
    if (!form.email || !form.email.includes("@")) e.email = "Valid email is required";
    if (!form.address1) e.address1 = "Address is required";
    if (!form.city) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { addToast({ type: "error", message: "Please fill all required fields." }); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push("/order-success");
  };

  const inputClass = (field: string) =>
    `input-luxury ${errors[field] ? "border-red-400 focus:ring-red-300" : ""}`;

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-espresso-950 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1 text-xs text-chocolate-400 mb-2">
            <Link href="/cart" className="hover:text-champagne">Cart</Link>
            <ChevronRight size={12} />
            <span className="text-white">Checkout</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-lg font-bold text-espresso-950 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-champagne text-espresso-950 flex items-center justify-center text-xs font-bold">1</span>
                  Contact Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Full Name *</label>
                    <input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputClass("fullName")} placeholder="Your full name" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Phone Number *</label>
                    <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass("phone")} placeholder="07X XXX XXXX" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">WhatsApp Number</label>
                    <input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className="input-luxury" placeholder="Same as phone or different" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Email Address *</label>
                    <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} placeholder="you@example.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-lg font-bold text-espresso-950 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-champagne text-espresso-950 flex items-center justify-center text-xs font-bold">2</span>
                  Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Address Line 1 *</label>
                    <input value={form.address1} onChange={(e) => set("address1", e.target.value)} className={inputClass("address1")} placeholder="Street address" />
                    {errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Address Line 2</label>
                    <input value={form.address2} onChange={(e) => set("address2", e.target.value)} className="input-luxury" placeholder="Apartment, suite, etc." />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">City *</label>
                    <input value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass("city")} placeholder="City" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">District *</label>
                    <select value={form.district} onChange={(e) => set("district", e.target.value)} className="input-luxury">
                      {sriLankaDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Postal Code</label>
                    <input value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} className="input-luxury" placeholder="e.g. 80000" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-espresso-950 mb-1.5 block">Order Notes</label>
                    <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} className="input-luxury min-h-[80px] resize-none" placeholder="Special instructions for your order..." />
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-lg font-bold text-espresso-950 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-champagne text-espresso-950 flex items-center justify-center text-xs font-bold">3</span>
                  Delivery Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "standard", label: "Standard Delivery", desc: "3–5 business days", price: "Rs. 350", icon: "🚚" },
                    { id: "express", label: "Express Delivery", desc: "1–2 business days", price: "Rs. 650", icon: "⚡" },
                    { id: "pickup", label: "Galle Pickup", desc: "No. 88 Moonlit Boulevard, Colombo 03", price: "FREE", icon: "📍" },
                  ].map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.delivery === opt.id ? "border-champagne bg-champagne/5" : "border-chocolate-100 hover:border-chocolate-200"}`}>
                      <input type="radio" name="delivery" value={opt.id} checked={form.delivery === opt.id} onChange={(e) => set("delivery", e.target.value)} className="sr-only" />
                      <span className="text-xl">{opt.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-espresso-950">{opt.label}</p>
                        <p className="text-xs text-chocolate-400">{opt.desc}</p>
                      </div>
                      <span className={`font-bold text-sm ${opt.price === "FREE" ? "text-green-600" : "text-espresso-950"}`}>{opt.price}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.delivery === opt.id ? "border-champagne" : "border-chocolate-300"}`}>
                        {form.delivery === opt.id && <div className="w-2 h-2 rounded-full bg-champagne" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-serif text-lg font-bold text-espresso-950 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-champagne text-espresso-950 flex items-center justify-center text-xs font-bold">4</span>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: <Banknote size={20} className="text-green-600" /> },
                    { id: "bank", label: "Bank Transfer", desc: "Commercial Bank — A/C: 8008012345", icon: <CreditCard size={20} className="text-blue-600" /> },
                    { id: "card", label: "Card Payment", desc: "Powered by PayHere — Coming Soon", icon: <Smartphone size={20} className="text-purple-600" />, disabled: true },
                  ].map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${opt.disabled ? "opacity-50 cursor-not-allowed" : ""} ${form.payment === opt.id ? "border-champagne bg-champagne/5" : "border-chocolate-100 hover:border-chocolate-200"}`}>
                      <input type="radio" name="payment" value={opt.id} checked={form.payment === opt.id} onChange={(e) => !opt.disabled && set("payment", e.target.value)} disabled={opt.disabled} className="sr-only" />
                      {opt.icon}
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-espresso-950">{opt.label}</p>
                        <p className="text-xs text-chocolate-400">{opt.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.payment === opt.id ? "border-champagne" : "border-chocolate-300"}`}>
                        {form.payment === opt.id && <div className="w-2 h-2 rounded-full bg-champagne" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <h2 className="font-serif text-lg font-bold text-espresso-950 mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-chocolate-50">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-espresso-950 text-white rounded-full text-[10px] flex items-center justify-center font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-espresso-950 truncate">{item.product.name}</p>
                      </div>
                      <p className="text-xs font-semibold text-espresso-950 flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-chocolate-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-chocolate-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-chocolate-500">Delivery</span><span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span></div>
                  <div className="flex justify-between font-bold text-base border-t border-chocolate-100 pt-2">
                    <span>Total</span>
                    <span className="text-champagne">{formatPrice(total)}</span>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-5 disabled:opacity-70">
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-chocolate-400">
                  <Shield size={12} className="text-green-500" /> Secure & Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
