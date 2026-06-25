import ProductSection from "../components/home/ProductSection";
import Brands from "../components/home/Brands";
import Benefits from "../components/home/Benefits";
import Footer from "../components/layout/Footer";
import PromoBanner from "../components/home/PromoBanner";
import TrustSection from "../components/home/TrustSection";
import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ProductSection
    title="Produtos em Destaque"
    subtitle="Os produtos mais procurados."
    featured
/>

<ProductSection
    title="Espaço Gamer"
    subtitle="Monte seu setup gamer."
    category="Espaço Gamer"
/>

<ProductSection
    title="Periféricos"
    subtitle="Mouse, teclado, headset e muito mais."
    category="Periféricos"
/>



      <PromoBanner />

      <Brands />

      <Categories />

      <Benefits />

      <TrustSection />

      <Footer />
    </>
  );
}