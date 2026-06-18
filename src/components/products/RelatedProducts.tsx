/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import { supabase } from "../../lib/supabase";

import type { Product } from "../../types/product";

interface RelatedProductsProps {
  category: string;
}

export default function RelatedProducts({
  category,
}: RelatedProductsProps) {

  const [products, setProducts] =
    useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, [category]);

  async function loadProducts() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .eq("category", category)
      .limit(4);

    setProducts(data || []);
  }

  return (
    <section className="mt-20">

      <h2
        className="
        text-3xl
        font-bold
        mb-10
      "
      >
        Produtos Relacionados
      </h2>

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-6
      "
      >

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}