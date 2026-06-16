/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../products/ProductCard";

import { supabase } from "../../lib/supabase";

import type { Product } from "../../types/product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

   async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .eq("featured", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error(
        "Erro ao carregar produtos destacados:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);


  if (loading) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="Produtos em Destaque"
            subtitle="Carregando produtos..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-96
                  rounded-2xl
                  bg-slate-100
                  animate-pulse
                "
              />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="Produtos em Destaque"
            subtitle="Nenhum produto destacado encontrado."
          />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          title="Produtos em Destaque"
          subtitle="Os produtos mais procurados da Tech Tudo Campina."
        />

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
