import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategorySection from "@/components/home/CategorySection";
import CannedDrinks3DSection from "@/components/home/CannedDrinks3DSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import BestSellers from "@/components/home/BestSellers";
import GiftBoxPromo from "@/components/home/GiftBoxPromo";
import Testimonials from "@/components/home/Testimonials";
import InstagramSection from "@/components/home/InstagramSection";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategorySection />
      <CannedDrinks3DSection />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <GiftBoxPromo />
      <Testimonials />
      <InstagramSection />
      <Newsletter />
    </>
  );
}
