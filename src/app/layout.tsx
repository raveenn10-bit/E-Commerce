import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MobileNav from "@/components/layout/MobileNav";
import MiniCart from "@/components/cart/MiniCart";
import SearchOverlay from "@/components/ui/SearchOverlay";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ToastContainer from "@/components/ui/ToastContainer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apex Moon — Premium Chocolates & Gift Boxes in Galle",
    template: "%s | Apex Moon",
  },
  description:
    "Sri Lanka's premium chocolate shop in Galle. Imported chocolates, Korean ramen, exotic drinks, and customized gift boxes delivered islandwide.",
  keywords: ["chocolates", "gift boxes", "Korean ramen", "imported snacks", "Galle", "Sri Lanka"],
  openGraph: {
    title: "Apex Moon — Premium Chocolates & Gift Boxes",
    description: "Premium chocolates, imported treats, and perfect gift boxes for every occasion.",
    url: "https://apexmoon.lk",
    siteName: "Apex Moon",
    locale: "en_LK",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Apex Moon",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ivory text-espresso-950 antialiased overflow-x-hidden">
        <Header />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <MiniCart />
        <SearchOverlay />
        <WhatsAppButton />
        <ToastContainer />
        <MobileNav />
      </body>
    </html>
  );
}
