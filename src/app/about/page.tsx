import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Award, ShieldCheck, MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "About Us | Sweet Moon Galle",
  description: "Learn about Sweet Moon, Galle's premier destination for imported chocolates, Korean ramen, exotic snacks, and luxury gift boxes.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Header */}
      <section className="bg-espresso-950 py-16 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-champagne uppercase text-xs font-semibold tracking-[0.25em] mb-2">
            Our Story &amp; Passion
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            About Sweet Moon
          </h1>
          <p className="text-chocolate-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Galle&apos;s premier boutique for authentic imported chocolates, famous Korean ramen, global confectionery, and luxury bespoke gift hampers.
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&h=600&fit=crop"
              alt="Sweet Moon boutique interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="section-subheading">Crafting Joy in Galle</span>
            <h2 className="font-serif text-3xl font-bold text-espresso-950">
              Where Every Treat Tells a Sweet Story
            </h2>
            <p className="text-chocolate-800 text-sm md:text-base leading-relaxed">
              Located in the historic southern coastal city of Galle, Sweet Moon was born out of a profound passion for bringing the world&apos;s most beloved sweets, artisan chocolates, and culinary delights directly to Sri Lankan doorsteps.
            </p>
            <p className="text-chocolate-800 text-sm md:text-base leading-relaxed">
              Whether you crave authentic Swiss Lindt truffles, Italian Ferrero Rocher, viral spicy Korean Buldak ramen, or a customized luxury gift hamper for someone special, we curate every item with strict standards of authenticity and freshness.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/shop" className="btn-primary">
                Explore Products
              </Link>
              <Link href="/contact" className="btn-secondary">
                Visit Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars / Values */}
      <section className="bg-white py-16 border-y border-chocolate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-subheading">Our Commitment</span>
            <h2 className="font-serif text-3xl font-bold text-espresso-950 mt-1">
              Why Customers Love Us
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-ivory border border-chocolate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-champagne/10 text-champagne flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="font-serif font-bold text-espresso-950 mb-2">100% Original</h3>
              <p className="text-xs text-chocolate-700 leading-relaxed">
                Direct imports from trusted European, Japanese, and Korean brands with strict expiry guarantees.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-ivory border border-chocolate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-champagne/10 text-champagne flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="font-serif font-bold text-espresso-950 mb-2">Bespoke Gifting</h3>
              <p className="text-xs text-chocolate-700 leading-relaxed">
                Custom handcrafted gift boxes with personalized cards, ribbons, and presentation packaging.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-ivory border border-chocolate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-champagne/10 text-champagne flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif font-bold text-espresso-950 mb-2">Safe Delivery</h3>
              <p className="text-xs text-chocolate-700 leading-relaxed">
                Temperature-conscious protective packaging delivered swiftly islandwide across Sri Lanka.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-ivory border border-chocolate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-champagne/10 text-champagne flex items-center justify-center mx-auto mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-serif font-bold text-espresso-950 mb-2">Always Open</h3>
              <p className="text-xs text-chocolate-700 leading-relaxed">
                Ready to serve your sweet cravings online 24/7 with friendly WhatsApp assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Details & Google Maps Store Showcase */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <span className="section-subheading">Visit Our Boutiques</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 mt-1 mb-3">
          Find Us in Galle
        </h2>
        <p className="text-sm text-chocolate-600 max-w-xl mx-auto mb-10">
          Visit our flagship store on Main Street or our new branch in Dewata to experience luxury confectionery in person.
        </p>

        {/* 2 Store Locations Cards with Peach Champagne Accent Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
          {/* Main Branch */}
          <div className="bg-gradient-to-b from-[#DFF7FF]/40 to-[#FFD3B6]/40 p-7 rounded-3xl border border-[#FFD3B6] shadow-card space-y-4 hover:shadow-luxury transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-espresso-950 text-champagne rounded-full">
                Flagship Store
              </span>
              <span className="text-xs font-semibold text-espresso-950">Galle City</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-espresso-950">
              Sweet Moon — Main Street
            </h3>
            <div className="space-y-2.5 text-xs text-espresso-900">
              <div className="flex items-start gap-2.5">
                <MapPin className="text-champagne shrink-0 mt-0.5" size={16} />
                <span>No. 01 Main Street (New Street), Galle 80000, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="text-champagne shrink-0" size={16} />
                <span>9:00 AM – 9:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="text-champagne shrink-0" size={16} />
                <span>076 608 9763 / 077 690 3192</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Sweet+Moon+Chocolates+Galle+Sri+Lanka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-espresso-950 hover:text-champagne pt-2 transition-colors"
            >
              Get Google Maps Directions →
            </a>
          </div>

          {/* Dewata Branch */}
          <div className="bg-gradient-to-b from-[#FFD3B6]/40 to-[#DFF7FF]/40 p-7 rounded-3xl border border-[#DFF7FF] shadow-card space-y-4 hover:shadow-luxury transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-champagne text-espresso-950 rounded-full">
                New Branch
              </span>
              <span className="text-xs font-semibold text-espresso-950">Dewata</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-espresso-950">
              Sweet Moon — Dewata
            </h3>
            <div className="space-y-2.5 text-xs text-espresso-900">
              <div className="flex items-start gap-2.5">
                <MapPin className="text-champagne shrink-0 mt-0.5" size={16} />
                <span>No. 321/C, Matara Road, Dewata, Galle, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="text-champagne shrink-0" size={16} />
                <span>9:00 AM – 9:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="text-champagne shrink-0" size={16} />
                <span>076 608 9763</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Matara+Road+Dewata+Galle+Sri+Lanka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-espresso-950 hover:text-champagne pt-2 transition-colors"
            >
              Get Google Maps Directions →
            </a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full h-80 rounded-3xl overflow-hidden shadow-luxury border border-chocolate-200">
          <iframe
            title="Sweet Moon Galle Location"
            src="https://maps.google.com/maps?q=Main+Street+Galle+Sri+Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
