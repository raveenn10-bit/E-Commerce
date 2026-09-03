import Link from "next/link";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-[#1a0a00] py-16 md:py-20">
      {/* Decorative golden stars */}
      <span className="absolute top-8 left-8 text-[#C9A84C] text-3xl opacity-30 select-none pointer-events-none">&#10022;</span>
      <span className="absolute top-16 left-24 text-[#C9A84C] text-lg opacity-20 select-none pointer-events-none">&#9733;</span>
      <span className="absolute bottom-10 left-16 text-[#C9A84C] text-2xl opacity-25 select-none pointer-events-none">&#10022;</span>
      <span className="absolute top-12 right-[38%] text-[#C9A84C] text-xl opacity-20 select-none pointer-events-none">&#10022;</span>
      <span className="absolute bottom-8 right-12 text-[#C9A84C] text-3xl opacity-30 select-none pointer-events-none">&#9733;</span>
      <span className="absolute top-6 right-8 text-[#C9A84C] text-lg opacity-20 select-none pointer-events-none">&#10022;</span>

      {/* Golden top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">

          {/* LEFT */}
          <div className="md:col-span-1 space-y-4">
            <span
              className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase border border-[#C9A84C]/40 px-3 py-1 rounded-full"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Special Offer
            </span>
            <h2
              className="text-white text-4xl sm:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gift Season
            </h2>
            <p
              className="text-[#C9A84C] text-2xl font-bold tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SPECIAL DISCOUNTS!
            </p>
            <p
              className="text-gray-400 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Up to 20% OFF on selected gift boxes and premium chocolates.
              Perfect for birthdays, anniversaries, and every celebration.
            </p>
            <Link href="/shop?filter=sale" className="btn-primary inline-flex items-center gap-2 mt-2">
              SHOP THE COLLECTION
            </Link>
          </div>

          {/* CENTER */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-56 sm:w-80 sm:h-64 rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.2) 0%, transparent 70%)" }}
              />
              <Image
                src="https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=500&h=400&fit=crop"
                alt="Gift hamper with chocolates"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 16rem, 20rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00]/30 to-transparent" />
            </div>
          </div>

          {/* RIGHT — Badge */}
          <div className="md:col-span-1 flex justify-center md:justify-end">
            <div className="relative">
              <div
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-[#C9A84C]/50 flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, #2a1200 0%, #1a0a00 100%)",
                  boxShadow: "0 0 40px rgba(201,168,76,0.15)",
                }}
              >
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#C9A84C]/30 flex flex-col items-center justify-center text-center px-2">
                  <span
                    className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    UP TO
                  </span>
                  <span
                    className="text-[#C9A84C] text-4xl sm:text-5xl font-black leading-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    20%
                  </span>
                  <span
                    className="text-white text-lg font-bold mt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    OFF
                  </span>
                  <span
                    className="text-gray-400 text-[10px] tracking-widest uppercase mt-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Selected Items
                  </span>
                </div>
              </div>
              <div
                className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#C9A84C]"
                style={{ boxShadow: "0 0 8px #C9A84C" }}
              />
              <div className="absolute bottom-3 left-1 w-2 h-2 rounded-full bg-[#C9A84C] opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Golden bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)" }}
      />
    </section>
  );
}