import Link from "next/link";
import { products } from "@/lib/data";
import Can3DViewer from "@/components/product/Can3DViewer";
import { Sparkles, GlassWater, ShieldCheck, Flame } from "lucide-react";

export const metadata = {
  title: "3D Canned Drinks Collection | Apex Moon Galle",
  description: "Experience our exotic imported sodas, fruit juices, and rare canned beverages in stunning interactive 3D view.",
};

export default function CannedDrinksPage() {
  const cannedDrinks = products.filter((p) => p.categorySlug === "canned-drinks");

  return (
    <div className="bg-ivory min-h-screen">
      {/* 3D Hero Banner */}
      <section className="bg-espresso-950 text-white py-16 md:py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(201,168,76,0.4) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(214,105,28,0.3) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={14} /> Interactive 3D Showcase
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white">
            Exotic <span className="text-champagne">Canned Drinks</span>
          </h1>

          <p className="text-chocolate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Hover, tilt, and spin our exclusive collection of rare imported sodas, sparkling fruit juices, and viral beverages imported directly to Galle.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-chocolate-300">
              <GlassWater size={16} className="text-champagne" /> 100% Chilled &amp; Fresh
            </div>
            <span className="text-chocolate-600">&bull;</span>
            <div className="flex items-center gap-2 text-xs text-chocolate-300">
              <Flame size={16} className="text-orange-400" /> Viral Flavors
            </div>
            <span className="text-chocolate-600">&bull;</span>
            <div className="flex items-center gap-2 text-xs text-chocolate-300">
              <ShieldCheck size={16} className="text-green-400" /> Direct Imports
            </div>
          </div>
        </div>
      </section>

      {/* 3D Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="section-heading">Interactive 3D Can Showcase</h2>
            <p className="text-xs text-chocolate-600 mt-1">
              Move your cursor over any can to inspect 3D perspective and click spin to rotate 360&deg;
            </p>
          </div>
          <Link href="/shop" className="btn-secondary text-xs">
            Browse All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cannedDrinks.map((can) => (
            <Link key={can.id} href={`/product/${can.slug}`} className="block">
              <Can3DViewer product={can} interactive={true} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
