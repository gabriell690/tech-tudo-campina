import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "JBL",
  "Dell",
  "Asus",
  "Lenovo",
  "Logitech",
];

export default function Brands() {
  return (
    <section className="py-24 bg-slate-950">
      <Container>
        <SectionTitle
  title="Marcas Parceiras"
  subtitle="Trabalhamos com as principais marcas do mercado de tecnologia."
  light
/>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mt-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="
                group
                bg-white/5
                backdrop-blur-sm
                border
                border-white/10
                rounded-3xl
                h-24
                flex
                items-center
                justify-center
                hover:bg-blue-500/10
                hover:border-blue-500/30
                transition-all
                duration-300
                cursor-pointer
              "
            >
              <span
                className="
                  text-slate-300
                  font-semibold
                  group-hover:text-white
                  transition
                "
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}