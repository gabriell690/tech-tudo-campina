/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { supabase } from "../lib/supabase";

export default function SubcategoryPage() {

  const {
    categorySlug,
    subcategorySlug,
  } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {

    async function loadProducts() {

      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            name,
            slug
          ),
          subcategories (
            name,
            slug
          )
        `)
        .eq(
          "subcategories.slug",
          subcategorySlug
        );

      if (!error && data) {

        setProducts(data);

        if (data.length > 0) {

          setTitle(
            data[0].subcategories.name
          );

        }

      }

    }

    loadProducts();

  }, [categorySlug, subcategorySlug]);

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">

        {title}

      </h1>

      <div className="grid md:grid-cols-4 gap-8">

        {products.map(product => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>

  );

}