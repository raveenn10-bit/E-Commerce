"use client";
import { useParams } from "next/navigation";
import { products, categories, formatPrice } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = useMemo(() => products.filter((p) => p.categorySlug === slug), [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-serif text-3xl font-bold text-espresso-950">Category Not Found</h1>
        <Link href="/shop" className="btn-primary">Browse All Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-espresso-950 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1 text-xs text-chocolate-400 mb-3">
            <Link href="/" className="hover:text-champagne">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-champagne">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
          <p className="text-chocolate-300 mt-2 text-sm">{category.description}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-chocolate-400 text-lg mb-4">No products in this category yet.</p>
            <Link href="/shop" className="btn-primary">Browse All Products</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-chocolate-500 mb-6">{categoryProducts.length} products found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
