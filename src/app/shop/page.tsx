"use client";
import { useState, useMemo } from "react";
import { products, categories, formatPrice } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const priceRanges = [
  { label: "Under Rs. 500", min: 0, max: 500 },
  { label: "Rs. 500 – 2,000", min: 500, max: 2000 },
  { label: "Rs. 2,000 – 5,000", min: 2000, max: 5000 },
  { label: "Rs. 5,000+", min: 5000, max: Infinity },
];

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(12);
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ category: true, price: true, rating: true });

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
    setVisibleCount(12);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length > 0) result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (hasDiscount) result = result.filter((p) => !!p.discount);
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "bestselling": result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return result;
  }, [selectedCategories, selectedPriceRange, minRating, inStockOnly, hasDiscount, sortBy]);

  const clearFilters = () => {
    setSelectedCategories([]); setSelectedPriceRange(null); setMinRating(0);
    setInStockOnly(false); setHasDiscount(false); setSortBy("featured"); setVisibleCount(12);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedPriceRange !== null || minRating > 0 || inStockOnly || hasDiscount;

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <button onClick={() => setExpandedSections(p => ({...p, category: !p.category}))} className="flex items-center justify-between w-full text-sm font-semibold text-espresso-950 mb-3">
          Category {expandedSections.category ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                  className="w-4 h-4 rounded accent-champagne"
                />
                <span className="text-sm text-chocolate-600 group-hover:text-espresso-950 transition-colors">{cat.name}</span>
                <span className="text-xs text-chocolate-300 ml-auto">({cat.productCount})</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="h-px bg-chocolate-100" />
      {/* Price */}
      <div>
        <button onClick={() => setExpandedSections(p => ({...p, price: !p.price}))} className="flex items-center justify-between w-full text-sm font-semibold text-espresso-950 mb-3">
          Price {expandedSections.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range, i) => (
              <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === i}
                  onChange={() => { setSelectedPriceRange(i); setVisibleCount(12); }}
                  className="w-4 h-4 accent-champagne"
                />
                <span className="text-sm text-chocolate-600 group-hover:text-espresso-950">{range.label}</span>
              </label>
            ))}
            {selectedPriceRange !== null && (
              <button onClick={() => setSelectedPriceRange(null)} className="text-xs text-champagne hover:underline mt-1">Clear</button>
            )}
          </div>
        )}
      </div>
      <div className="h-px bg-chocolate-100" />
      {/* Availability */}
      <div>
        <p className="text-sm font-semibold text-espresso-950 mb-3">Availability</p>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 rounded accent-champagne" />
          <span className="text-sm text-chocolate-600">In Stock Only</span>
        </label>
      </div>
      <div className="h-px bg-chocolate-100" />
      {/* Discount */}
      <div>
        <p className="text-sm font-semibold text-espresso-950 mb-3">Discount</p>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={hasDiscount} onChange={(e) => setHasDiscount(e.target.checked)} className="w-4 h-4 rounded accent-champagne" />
          <span className="text-sm text-chocolate-600">On Sale</span>
        </label>
      </div>
      {hasActiveFilters && (
        <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium mt-2">
          <X size={12} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-ivory min-h-screen">
      {/* Page header */}
      <div className="bg-espresso-950 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1 text-xs text-chocolate-400 mb-3">
            <Link href="/" className="hover:text-champagne">Home</Link>
            <span>/</span>
            <span className="text-white">Shop</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">Our Products</h1>
          <p className="text-chocolate-300 mt-2 text-sm">Premium chocolates, Korean ramen, imported drinks & more</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-card sticky top-24">
              <h3 className="font-semibold text-espresso-950 mb-5 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-champagne" /> Filters
              </h3>
              <SidebarContent />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterOpen(true)}
                  className="md:hidden flex items-center gap-2 text-sm border border-chocolate-200 rounded-lg px-3 py-2 hover:border-champagne transition-colors"
                >
                  <SlidersHorizontal size={14} /> Filters
                  {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-champagne" />}
                </button>
                <p className="text-sm text-chocolate-500">
                  Showing <span className="font-semibold text-espresso-950">{Math.min(visibleCount, filtered.length)}</span> of{" "}
                  <span className="font-semibold text-espresso-950">{filtered.length}</span> products
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setVisibleCount(12); }}
                  className="text-sm border border-chocolate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-champagne bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="bestselling">Best Selling</option>
                </select>
                <div className="flex items-center border border-chocolate-200 rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-champagne text-white" : "hover:bg-chocolate-50"}`}><Grid3X3 size={16} /></button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-champagne text-white" : "hover:bg-chocolate-50"}`}><List size={16} /></button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-chocolate-400 text-lg mb-3">No products match your filters.</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                  {filtered.slice(0, visibleCount).map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                {visibleCount < filtered.length && (
                  <div className="text-center mt-10">
                    <button onClick={() => setVisibleCount((v) => v + 8)} className="btn-dark px-8">
                      Load More ({filtered.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <>
          <div className="fixed inset-0 bg-espresso-950/60 z-[80]" onClick={() => setFilterOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-[85] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-espresso-950">Filters</h3>
              <button onClick={() => setFilterOpen(false)}><X size={20} /></button>
            </div>
            <SidebarContent />
            <button onClick={() => setFilterOpen(false)} className="btn-primary w-full justify-center mt-6">Apply Filters</button>
          </div>
        </>
      )}
    </div>
  );
}
