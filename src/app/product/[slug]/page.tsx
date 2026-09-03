"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";
import { formatPrice, products, getRelatedProducts, getProductBySlug } from "@/lib/data";
import { useParams } from "next/navigation";
import ImageGallery from "@/components/product/ImageGallery";
import ProductCard from "@/components/product/ProductCard";
import { Star, Truck, ShieldCheck, HeadphonesIcon, BadgeCheck, Minus, Plus, Heart, ChevronRight } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addToast } = useUIStore();

  useEffect(() => { setQuantity(1); }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-serif text-3xl font-bold text-espresso-950">Product Not Found</h1>
        <p className="text-chocolate-500">This product doesn&apos;t exist or has been removed.</p>
        <Link href="/shop" className="btn-primary">Browse All Products</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    addToast({ type: "success", message: `${product.name} added to cart! 🛒` });
  };

  const handleWishlist = () => {
    toggleItem(product);
    addToast({ type: inWishlist ? "info" : "success", message: inWishlist ? "Removed from wishlist" : "Added to wishlist ❤️" });
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating));

  const whatsappMsg = encodeURIComponent(
    `Hi Sweet Moon! 🍫\n\nI would like to order:\n\nProduct: ${product.name}\nPrice: ${formatPrice(product.price)}\nQuantity: ${quantity}\n\nPlease confirm availability and delivery.\n\nThank you!`
  );

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-chocolate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-chocolate-400">
            <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-champagne transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <Link href={`/shop/${product.categorySlug}`} className="hover:text-champagne transition-colors">{product.category}</Link>
            <ChevronRight size={12} />
            <span className="text-espresso-950 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT — Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* RIGHT — Info */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="inline-block bg-champagne/10 text-champagne text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-espresso-950 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {stars.map((filled, i) => (
                    <Star key={i} size={16} className={filled ? "fill-champagne text-champagne" : "text-chocolate-200"} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-espresso-950">{product.rating}</span>
                <span className="text-xs text-chocolate-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-espresso-950">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-chocolate-300 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className={`flex items-center gap-2 text-sm mb-4 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-medium">{product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}</span>
              </div>

              <p className="text-chocolate-600 leading-relaxed text-sm mb-6">{product.shortDescription}</p>

              {product.origin && (
                <div className="flex gap-4 text-xs text-chocolate-400 mb-6">
                  {product.weight && <span>Weight: <b className="text-espresso-950">{product.weight}</b></span>}
                  <span>Origin: <b className="text-espresso-950">{product.origin}</b></span>
                </div>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-espresso-950 w-20">Quantity</span>
                <div className="flex items-center border border-chocolate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 hover:bg-chocolate-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-semibold text-espresso-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-2.5 hover:bg-chocolate-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className={`flex items-center gap-2 justify-center px-5 py-3 rounded-full border-2 font-semibold text-sm transition-all duration-200 ${
                    inWishlist
                      ? "border-blush bg-blush/10 text-red-500"
                      : "border-chocolate-200 text-espresso-950 hover:border-champagne hover:text-champagne"
                  }`}
                >
                  <Heart size={16} className={inWishlist ? "fill-red-500" : ""} />
                  {inWishlist ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

              {/* WhatsApp Order */}
              <a
                href={`https://wa.me/94766089763?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-full border-2 border-green-500 text-green-600 font-semibold text-sm hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { icon: BadgeCheck, label: "Original Product" },
                { icon: Truck, label: "Fast Delivery" },
                { icon: ShieldCheck, label: "Secure Payment" },
                { icon: HeadphonesIcon, label: "Easy Support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-chocolate-500">
                  <Icon size={14} className="text-champagne flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-chocolate-100">
          <div className="flex gap-0 border-b border-chocolate-100 overflow-x-auto no-scrollbar">
            {["description", "info", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-champagne text-champagne"
                    : "border-transparent text-chocolate-500 hover:text-espresso-950"
                }`}
              >
                {tab === "description" ? "Description" : tab === "info" ? "Additional Info" : "Reviews"}
              </button>
            ))}
          </div>
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-sm max-w-3xl text-chocolate-600 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === "info" && (
              <table className="text-sm text-chocolate-600 max-w-sm">
                <tbody className="divide-y divide-chocolate-100">
                  {product.sku && <tr><td className="py-2 pr-8 font-medium text-espresso-950 w-32">SKU</td><td>{product.sku}</td></tr>}
                  {product.weight && <tr><td className="py-2 pr-8 font-medium text-espresso-950">Weight</td><td>{product.weight}</td></tr>}
                  {product.origin && <tr><td className="py-2 pr-8 font-medium text-espresso-950">Origin</td><td>{product.origin}</td></tr>}
                  <tr><td className="py-2 pr-8 font-medium text-espresso-950">Category</td><td>{product.category}</td></tr>
                  <tr><td className="py-2 pr-8 font-medium text-espresso-950">Brand</td><td>{product.brand}</td></tr>
                </tbody>
              </table>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-2xl">
                {[
                  { name: "Amali P.", rating: 5, comment: "Absolutely delicious! Arrived perfectly packaged and tasted amazing. Will order again!" },
                  { name: "Ravindu J.", rating: 5, comment: "Great quality and fast delivery. Exactly as described. Love Sweet Moon!" },
                  { name: "Dilini F.", rating: 4, comment: "Very good product. Packaging was neat. Would recommend to everyone." },
                ].map((review, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-bold flex-shrink-0 text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-espresso-950">{review.name}</span>
                        <div className="flex">{Array.from({length:5},(_,i)=><Star key={i} size={12} className={i<review.rating?"fill-champagne text-champagne":"text-chocolate-200"}/>)}</div>
                      </div>
                      <p className="text-sm text-chocolate-600">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="section-heading mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
