import Link from "next/link";
import { getNewArrivals } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "New Arrivals | Apex Moon Galle",
  description: "Check out the newest imported chocolates, ramen, and trending snacks freshly stocked at Apex Moon Galle.",
};

export default function NewArrivalsPage() {
  const newProducts = getNewArrivals();

  return (
    <div className="bg-ivory min-h-screen">
      <section className="bg-espresso-950 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Freshly Stocked
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            New Arrivals
          </h1>
          <p className="text-chocolate-200 text-sm md:text-base max-w-xl mx-auto">
            Explore the latest international confectionery, exotic soft drinks, and trending snack arrivals.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Latest Additions</h2>
            <p className="text-xs text-chocolate-500 mt-1">
              Showing {newProducts.length} newly added products
            </p>
          </div>
          <Link href="/shop" className="text-champagne font-semibold text-xs hover:underline">
            All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
