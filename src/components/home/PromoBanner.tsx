/* eslint-disable react-hooks/immutability */
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, BadgePercent } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Container from "../ui/Container";
import type { Product } from "../../types/product";

export default function PromoBanner() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadFeaturedProduct();
  }, []);

  async function loadFeaturedProduct() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("price", { ascending: false })
      .limit(1);

    if (data?.length) {
      setProduct(data[0]);
    }
  }

  if (!product) return null;

  const installment = (
    Number(product.price) / 12
  )
    .toFixed(2)
    .replace(".", ",");

  const discount =
    product.old_price && product.old_price > product.price
      ? Math.round(
          ((product.old_price - product.price) /
            product.old_price) *
            100
        )
      : 0;

  return (
    <section className="py-20 bg-white">
      <Container>
        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-linear-to-r
          from-slate-950
          via-slate-900
          to-yellow-950
          p-10
          lg:p-16
        "
        >
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500 px-5 py-2 text-yellow-400 font-medium">
                 Oferta da Semana
              </span>

              <h2 className="mt-8 text-5xl font-black text-white leading-tight">
                O melhor da
                <br />
                <span className="text-yellow-400">
                  CATEGORIA
                </span>
              </h2>

              <p className="mt-6 text-lg text-slate-300 max-w-xl">
                Selecionamos o produto premium da semana
                com o melhor custo-benefício da loja.
              </p>

              <div className="mt-10 flex flex-wrap gap-8 text-white">

                <div className="flex items-center gap-3">
                  <BadgePercent className="text-yellow-400" />
                  <span>Preço Especial</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-400" />
                  <span>Garantia</span>
                </div>

                <div className="flex items-center gap-3">
                  <Truck className="text-blue-400" />
                  <span>Entrega Nacional</span>
                </div>

              </div>

              <div className="mt-10 flex gap-4">

                <Link
                  to={`/produto/${product.slug}`}
                  className="
                    rounded-2xl
                    bg-yellow-400
                    px-8
                    py-4
                    font-semibold
                    text-white
                    hover:bg-yellow-400
                    transition
                  "
                >
                  Comprar Agora
                </Link>

                <Link
                  to={`/produto/${product.slug}`}
                  className="
                    rounded-2xl
                    border
                    border-white/20
                    px-8
                    py-4
                    text-white
                    hover:bg-white/10
                    transition
                    flex
                    items-center
                    gap-2
                  "
                >
                  Ver Produto

                  <ArrowRight size={18} />

                </Link>

              </div>

            </div>

            {/* Produto */}

            <div className="flex justify-center">

              <Link
                to={`/produto/${product.slug}`}
                className="
                  group
                  bg-white
                  rounded-3xl
                  shadow-2xl
                  p-7
                  w-full
                  max-w-md
                  transition
                  hover:scale-[1.02]
                "
              >

                {discount > 0 && (

                  <div className="absolute mt-4 ml-4 rounded-full bg-yellow-400 text-white px-4 py-2 font-bold">
                    -{discount}%
                  </div>

                )}

                <img
                  src={product.image_url || product.image}
                  alt={product.name}
                  className="
                    h-72
                    w-full
                    object-contain
                    transition
                    group-hover:scale-105
                  "
                />

                <h3 className="mt-6 text-2xl font-bold">
                  {product.name}
                </h3>

                <p className="mt-2 text-slate-500">
                  {product.short_description ??
                    "Produto em destaque da semana."}
                </p>

                <div className="mt-6">

                  {product.old_price && (

                    <p className="text-slate-400 line-through text-lg">
                      R$ {Number(product.old_price)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>

                  )}

                  <p className="text-4xl font-black text-yellow-400">
                    R$ {Number(product.price)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>

                  <p className="mt-2 text-slate-600">
                    em até
                    <strong> 12x de R$ {installment}</strong>
                    sem juros
                  </p>

                </div>

              </Link>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}