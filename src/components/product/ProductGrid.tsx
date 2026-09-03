import { type Product } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  loading = false,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  /* ── Loading state — 8 skeleton cards ───────────────────── */
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  /* ── Empty state ─────────────────────────────────────────── */
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-champagne/20 flex items-center justify-center">
          <PackageOpen size={36} className="text-champagne" />
        </div>
        <p className="text-espresso/70 font-medium text-lg max-w-sm">{emptyMessage}</p>
        <p className="text-gray-400 text-sm">
          Try adjusting your filters or browse our full collection.
        </p>
      </div>
    );
  }

  /* ── Product grid ────────────────────────────────────────── */
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
