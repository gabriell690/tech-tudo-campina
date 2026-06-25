/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import ProductCard from "../products/ProductCard";
import ProductCarousel from "../ui/ProductCarousel";

import { supabase } from "../../lib/supabase";
import type { Product } from "../../types/product";

type ProductSectionProps = {
  title: string;
  subtitle?: string;
  category?: string;
  featured?: boolean;
};

export default function ProductSection({
  title,
  subtitle,
  category,
  featured = false,
}: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category, featured]);

  async function loadProducts() {
    setLoading(true);

    let query = supabase
      .from("products")
      .select("*")
      .eq("active", true);

    if (featured) {
      query = query.eq("featured", true);
    }

    if (category) {
      query = query.eq("category", category);
    }

    const { data } = await query.limit(12);

    setProducts(data || []);

    setLoading(false);
  }

  if (loading) {
  return null;
}

  return (
    <section className="py-8">

      <Container>

        <div className="flex items-end justify-between mb-7">

          <div>

            <h2
  className="
    text-2xl
    md:text-3xl
    font-semibold
    text-slate-800
    tracking-tight
  "
>
  {title}
</h2>

            {subtitle && (

              <p className="text-slate-500 mt-2">

                {subtitle}

              </p>

            )}

          </div>

          <Link
            to="/produtos"
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-orange-500
              font-medium
            "
          >
            Ver todos →

          </Link>

        </div>
{products.length === 0 ? (

    <div className="py-10 text-center text-slate-400">

        Nenhum produto encontrado nesta categoria.

    </div>

) : (

    <ProductCarousel>

        ...

    </ProductCarousel>

)}
        <ProductCarousel>

          {products.map((product) => (

            <div
              key={product.id}
              className="
                flex-[0_0_48%]
                md:flex-[0_0_31%]
                xl:flex-[0_0_22%]
                2xl:flex-[0_0_19%]
              "
            >
              <ProductCard product={product} />

            </div>

          ))}

        </ProductCarousel>

      </Container>

    </section>
  );
}