import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Brands from "../components/home/Brands";
import Benefits from "../components/home/Benefits";
import Footer from "../components/layout/Footer";
import PromoBanner from "../components/home/PromoBanner";
import TrustSection from "../components/home/TrustSection";
import HeroSection from "../components/home/HeroSection";

export default function Home() {
  return (
 <>
  
 <HeroSection />
  
  <Categories />

  <FeaturedProducts />

  <Brands />

  <PromoBanner />

  <Benefits />

  <TrustSection />

  <Footer />
</>
  );
}