/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/ui/Container";

import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import ProductDescription from "../components/products/ProductDescription";
import RelatedProducts from "../components/products/RelatedProducts";

import { supabase } from "../lib/supabase";

import type { Product } from "../types/product";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  async function loadProduct() {
    setLoading(true);

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    setProduct(data);

    setLoading(false);
  }

  if (loading) {
    return (
      <section className="pt-32 pb-20">
        <Container>
          Carregando produto...
        </Container>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-32 pb-20">
        <Container>
          Produto não encontrado.
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen pt-28 pb-16">

      <Container>

        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
          "
        >

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>

        <ProductDescription product={product} />

        <RelatedProducts category={product.category} />

      </Container>

    </section>
  );
}