import ProductCard from "../components/products/ProductCard";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";

import { products } from "../data/products";

export default function Products() {
return ( <section className="py-16 bg-slate-50 min-h-screen"> <Container> <SectionTitle
       title="Todos os Produtos"
       subtitle="Explore nosso catálogo completo."
     />

```
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* Sidebar */}
      <aside
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-6
          h-fit
        "
      >
        <h3 className="font-bold text-lg mb-5">
          Filtros
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">
              Categorias
            </h4>

            <div className="space-y-2">
              <label className="flex gap-2">
                <input type="checkbox" />
                Smartphones
              </label>

              <label className="flex gap-2">
                <input type="checkbox" />
                Notebooks
              </label>

              <label className="flex gap-2">
                <input type="checkbox" />
                Games
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">
              Marcas
            </h4>

            <div className="space-y-2">
              <label className="flex gap-2">
                <input type="checkbox" />
                Apple
              </label>

              <label className="flex gap-2">
                <input type="checkbox" />
                Samsung
              </label>

              <label className="flex gap-2">
                <input type="checkbox" />
                Asus
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Produtos */}
      <div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  </Container>
</section>
);
}
