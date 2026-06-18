/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ProductCard from "../products/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .eq("category", category);

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    loadProducts();
  }, [category]);

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-10">
        {category}
      </h1>

      {loading ? (
        <div className="text-center py-20">
          Carregando produtos...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}