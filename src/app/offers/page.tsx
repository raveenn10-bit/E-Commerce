import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { Tag, Sparkles } from "lucide-react";

export const metadata = {
  title: "Special Offers & Deals | Sweet Moon Galle",
  description: "Exclusive discounts and limited-time deals on premium chocolates, gift sets, and imported snacks in Sri Lanka.",
};

export default function OffersPage() {
  const discountProducts = products.filter((p) => (p.discount || 0) > 0);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Header */}
      <section className="bg-espresso-950 py-16 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-semibold uppercase tracking-wider mb-4">
            <Tag size={14} /> Limited Time Promotions
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Special Offers &amp; Discounts
          </h1>
          <p className="text-chocolate-200 text-sm md:text-base max-w-xl mx-auto">
            Save up to 25% on authentic imported treats, luxury chocolate packs, and special bundle offers.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">All Discounted Items</h2>
            <p className="text-xs text-chocolate-500 mt-1">
              Showing {discountProducts.length} items on sale
            </p>
          </div>
          <Link href="/shop" className="text-champagne font-semibold text-xs hover:underline flex items-center gap-1">
            Browse All Products &rarr;
          </Link>
        </div>

        {discountProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {discountProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl p-8 border border-chocolate-100">
            <Sparkles size={48} className="text-champagne mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-espresso-950 mb-2">
              New Offers Coming Soon!
            </h3>
            <p className="text-sm text-chocolate-600 mb-6">
              Check back soon for seasonal sale discounts and special festival hampers.
            </p>
            <Link href="/shop" className="btn-primary">
              Shop Regular Collection
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
