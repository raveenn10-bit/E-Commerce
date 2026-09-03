import Link from "next/link";
import Image from "next/image";

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const instagramImages = [
  {
    src: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop",
    alt: "Premium chocolates flat lay",
  },
  {
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
    alt: "Luxury gift box close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=400&fit=crop",
    alt: "Korean ramen selection",
  },
  {
    src: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=400&fit=crop",
    alt: "Lindt chocolate truffles",
  },
  {
    src: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=400&h=400&fit=crop",
    alt: "Gorgeous gift hamper",
  },
  {
    src: "https://images.unsplash.com/photo-1582820703795-b5e344c2f0c3?w=400&h=400&fit=crop",
    alt: "Colorful candy treats",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-16 bg-[#FAF6EF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <p
            className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Connect With Us
          </p>
          <h2
            className="section-heading text-[#1a0a00]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            @SWEETMOON
          </h2>
          <p
            className="text-gray-500 text-sm mt-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Follow Our Sweet Journey
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {instagramImages.map((img, i) => (
            <Link
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group block"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-[#1a0a00]/0 group-hover:bg-[#1a0a00]/60 transition-all duration-300 flex items-center justify-center">
                <InstagramIcon
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark inline-flex items-center gap-2"
          >
            <InstagramIcon size={16} />
            FOLLOW ON INSTAGRAM
          </Link>
        </div>
      </div>
    </section>
  );
}