/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import ProductCard from "../components/products/ProductCard";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";

import { supabase } from "../lib/supabase";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  old_price: number | null;
  stock: number;
  category: string;
  brand: string;
  image: string;
  image_url: string;
  featured: boolean;
  active: boolean;
};

export default function Products() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadProducts() {
    try {
      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .eq("active", true)
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section
      className="
        bg-slate-50
        min-h-screen
        pt-32
        pb-12
      "
    >
      <Container>

        <SectionTitle
          title="Todos os Produtos"
          subtitle="
            Encontre smartphones,
            notebooks, acessórios
            e muito mais.
          "
        />

        <div
          className="
            grid
            lg:grid-cols-[280px_1fr]
            gap-8
            mt-10
          "
        >
          {/* Sidebar */}
          <aside
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-6
              h-fit
              sticky
              top-52
            "
          >
            <h3
              className="
                font-bold
                text-lg
                mb-6
              "
            >
              Filtros
            </h3>

            <div className="space-y-8">

              <div>
                <h4
                  className="
                    font-semibold
                    mb-4
                  "
                >
                  Categorias
                </h4>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Smartphones
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Notebooks
                  </label>

                  <label className="flex items-center gap-2">
                    Informática
                  </label>

                  <label className="flex items-center gap-2">
                    Games
                  </label>
                </div>
              </div>

              <div>
                <h4
                  className="
                    font-semibold
                    mb-4
                  "
                >
                  Marcas
                </h4>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    Apple
                  </label>

                  <label className="flex items-center gap-2">
                    Samsung
                  </label>

                  <label className="flex items-center gap-2">
                    Asus
                  </label>

                  <label className="flex items-center gap-2">
                    Logitech
                  </label>
                </div>
              </div>

            </div>
          </aside>

          {/* Produtos */}
          <div>

            <div
              className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                p-4
                mb-8
                flex
                flex-col
                md:flex-row
                justify-between
                items-center
                gap-4
              "
            >
              <span className="text-slate-600">
                {products.length}
                {" "}
                produtos encontrados
              </span>

              <select
                className="
                  border
                  border-slate-200
                  rounded-xl
                  px-4
                  py-2
                "
              >
                <option>
                  Mais recentes
                </option>

                <option>
                  Menor preço
                </option>

                <option>
                  Maior preço
                </option>
              </select>
            </div>

            {loading ? (
              <div
                className="
                  bg-white
                  rounded-3xl
                  p-12
                  text-center
                "
              >
                Carregando produtos...
              </div>
            ) : products.length === 0 ? (
              <div
                className="
                  bg-white
                  rounded-3xl
                  p-12
                  text-center
                "
              >
                Nenhum produto
                cadastrado.
              </div>
            ) : (
              <div
                className="
                  grid
                  sm:grid-cols-2
                  xl:grid-cols-3
                  gap-8
                "
              >
                {products.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}
              </div>
            )}

          </div>
        </div>

      </Container>
    </section>
  );
}
