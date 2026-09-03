"use client";

import dynamic from "next/dynamic";

const MiniCart = dynamic(() => import("@/components/cart/MiniCart"), { ssr: false });
const SearchOverlay = dynamic(() => import("@/components/ui/SearchOverlay"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), { ssr: false });
const CompareFloatingBar = dynamic(() => import("@/components/product/CompareFloatingBar"), { ssr: false });
const MobileNav = dynamic(() => import("@/components/layout/MobileNav"), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <MiniCart />
      <SearchOverlay />
      <WhatsAppButton />
      <CompareFloatingBar />
      <MobileNav />
    </>
  );
}
