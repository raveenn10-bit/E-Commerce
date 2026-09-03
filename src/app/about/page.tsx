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

      {/* Location Details */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="section-subheading">Visit Our Boutique</span>
        <h2 className="font-serif text-3xl font-bold text-espresso-950 mt-1 mb-6">
          Find Us in Galle
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-card border border-chocolate-100 flex flex-col md:flex-row justify-around gap-6 text-left">
          <div className="flex items-start gap-3">
            <MapPin className="text-champagne shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-espresso-950 text-sm">Store Address</p>
              <p className="text-xs text-chocolate-600 mt-0.5">No 01 Main Street (New Street)</p>
              <p className="text-xs text-chocolate-600">Galle 80000, Sri Lanka</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-champagne shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-espresso-950 text-sm">Business Hours</p>
              <p className="text-xs text-chocolate-600 mt-0.5">Store: 9:00 AM – 9:00 PM</p>
              <p className="text-xs text-chocolate-600">Online &amp; Delivery: Always Open</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-champagne shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-espresso-950 text-sm">Direct Contact</p>
              <p className="text-xs text-chocolate-600 mt-0.5">076 608 9763 / 077 690 3192</p>
              <p className="text-xs text-champagne font-medium">WhatsApp Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
