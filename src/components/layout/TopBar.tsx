import { MapPin, Clock, Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-espresso-950/90 backdrop-blur-md text-white text-xs h-9 flex items-center px-4 md:px-6 lg:px-8 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Left — Contact Info */}
        <div className="flex items-center gap-4">
          {/* Address — hidden on mobile */}
          <span className="hidden sm:flex items-center gap-1 text-chocolate-200">
            <MapPin size={12} className="text-champagne shrink-0" />
            <span>No 01 Main Street, Galle</span>
          </span>

          {/* Separator — hidden on mobile */}
          <span className="hidden sm:block text-espresso-700 select-none">|</span>

          {/* Hours — hidden on mobile */}
          <span className="hidden sm:flex items-center gap-1 text-chocolate-200">
            <Clock size={12} className="text-champagne shrink-0" />
            <span>Always Open</span>
          </span>

          {/* Separator — hidden on mobile */}
          <span className="hidden sm:block text-espresso-700 select-none">|</span>

          {/* Phone — always visible */}
          <a
            href="tel:+94766089763"
            className="flex items-center gap-1 text-chocolate-200 hover:text-champagne transition-colors duration-200"
          >
            <Phone size={12} className="text-champagne shrink-0" />
            <span>076 608 9763</span>
          </a>
        </div>

        {/* Right — Social Links */}
        <div className="flex items-center gap-3">
          <span className="text-espresso-400 hidden sm:block">Follow Us</span>
          <div className="flex items-center gap-2.5">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="text-chocolate-300 hover:text-champagne transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="text-chocolate-300 hover:text-champagne transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="#"
              aria-label="TikTok"
              className="text-chocolate-300 hover:text-champagne transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
