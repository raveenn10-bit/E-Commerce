"use client";
import { useParams, useRouter } from "next/navigation";
import { products, categories, formatPrice } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.category as string;
  const category = categories.find((c) => c.slug === slug);
  const matchingProduct = products.find((p) => p.slug === slug);

  // Auto redirect if a user visited /shop/[product-slug] instead of /product/[slug]
  useEffect(() => {
    if (!category && matchingProduct) {
      router.replace(`/product/${matchingProduct.slug}`);
    }
  }, [category, matchingProduct, router]);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.categorySlug === slug),
    [slug]
  );

  if (!category) {
    if (matchingProduct) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-4 bg-[#FAF6EF]">
          <div className="w-10 h-10 border-3 border-champagne border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-espresso-950">
            Taking you to {matchingProduct.name}...
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center px-4 py-16 bg-[#FAF6EF]">
        <div className="w-16 h-16 rounded-full bg-champagne/15 text-champagne flex items-center justify-center">
          <Sparkles size={28} />
        </div>
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950">
            Category Not Found
          </h1>
          <p className="text-sm text-chocolate-700 mt-2 max-w-md mx-auto">
            The category you are looking for doesn&apos;t exist or has moved. Explore all our sweet treats below!
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link href="/shop" className="btn-primary py-3 px-6 text-sm">
            Browse All Products
          </Link>
          <Link href="/shop/gift-boxes" className="btn-secondary py-3 px-6 text-sm">
            View Gift Boxes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-espresso-950 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1 text-xs text-chocolate-400 mb-3">
            <Link href="/" className="hover:text-champagne">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-champagne">
              Shop
            </Link>
            <ChevronRight size={12} />
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
            {category.name}
          </h1>
          <p className="text-chocolate-300 mt-2 text-sm">
            {category.description}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-chocolate-400 text-lg mb-4">
              No products in this category yet.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-chocolate-500 mb-6">
              {categoryProducts.length} products found
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
