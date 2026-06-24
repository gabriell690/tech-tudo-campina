
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { supabase } from "../lib/supabase";

export default function SubcategoryPage() {
  const { subcategorySlug } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        // Busca a subcategoria pelo slug
        const {
          data: subcategory,
          error: subcategoryError,
        } = await supabase
          .from("subcategories")
          .select("id, name, slug")
          .eq("slug", subcategorySlug)
          .single();

        if (subcategoryError || !subcategory) {
          console.error(subcategoryError);
          setProducts([]);
          return;
        }

        setTitle(subcategory.name);

        // Busca os produtos da subcategoria
        const {
          data: productsData,
          error: productsError,
        } = await supabase
          .from("products")
          .select("*")
          .eq("subcategory_id", subcategory.id)
          .eq("active", true);

        if (productsError) {
          console.error(productsError);
          setProducts([]);
          return;
        }

        setProducts(productsData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (subcategorySlug) {
      loadProducts();
    }
  }, [subcategorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">
          Carregando produtos...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          <p className="text-slate-500 mt-2">
            {products.length} produto(s)
            encontrado(s)
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Nenhum produto encontrado
            </h2>

            <p className="text-slate-500 mt-3">
              Não existem produtos
              cadastrados nesta subcategoria.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
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
        )}
      </div>
    </section>
  );
}
