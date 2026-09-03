// ProductSkeleton.tsx — shimmer loading placeholder matching ProductCard layout
const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      {/* Image placeholder */}
      <div className={`aspect-square bg-gray-200 w-full ${shimmer}`} />

      {/* Content area */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Category label */}
        <div className={`h-3 w-20 rounded-full bg-gray-200 ${shimmer}`} />

        {/* Product name — 2 lines */}
        <div className="flex flex-col gap-2">
          <div className={`h-4 w-full rounded-full bg-gray-200 ${shimmer}`} />
          <div className={`h-4 w-3/4 rounded-full bg-gray-200 ${shimmer}`} />
        </div>

        {/* Star rating row */}
        <div className="flex items-center gap-2">
          <div className={`h-3 w-24 rounded-full bg-gray-200 ${shimmer}`} />
          <div className={`h-3 w-12 rounded-full bg-gray-200 ${shimmer}`} />
        </div>

        {/* Price row */}
        <div className="flex items-center gap-3 mt-auto">
          <div className={`h-5 w-24 rounded-full bg-gray-200 ${shimmer}`} />
          <div className={`h-4 w-16 rounded-full bg-gray-200 ${shimmer}`} />
        </div>

        {/* Add to Cart button */}
        <div className={`h-10 w-full rounded-xl bg-gray-200 mt-1 ${shimmer}`} />
      </div>
    </div>
  );
}
