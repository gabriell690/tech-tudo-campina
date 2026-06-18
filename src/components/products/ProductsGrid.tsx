import ProductCard from "./ProductCard";

import type { Product } from "../../types/product";

interface ProductsGridProps {
  loading: boolean;
  products: Product[];
}

export default function ProductsGrid({
  loading,
  products,
}: ProductsGridProps) {
  if (loading) {
    return (
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
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="
          bg-white
          rounded-3xl
          p-12
          text-center
        "
      >
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
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
  );
}