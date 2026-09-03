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
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <ScrollReveal direction="up" delay={0.05} distance={30}>
        <TrustBar />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} distance={40}>
        <CategorySection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} distance={45}>
        <CannedDrinks3DSection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} distance={40}>
        <FeaturedProducts />
      </ScrollReveal>

      <ScrollReveal direction="fade" delay={0.15}>
        <PromoBanner />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} distance={40}>
        <BestSellers />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15} distance={45}>
        <GiftBoxPromo />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} distance={35}>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} distance={35}>
        <InstagramSection />
      </ScrollReveal>

      <ScrollReveal direction="down" delay={0.1} distance={30}>
        <Newsletter />
      </ScrollReveal>
    </main>
  );
}
