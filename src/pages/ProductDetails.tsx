import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import ProductCard from "../components/products/ProductCard";

import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

import { useCart } from "../context/CartContext";
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
  image_url: string;
  image: string;
  featured: boolean;
  active: boolean;
};

export default function ProductDetails() {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [relatedProducts, setRelatedProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } =
          await supabase
            .from("products")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
          throw error;
        }

        setProduct(data);

        const {
          data: relatedData,
        } = await supabase
          .from("products")
          .select("*")
          .eq(
            "category",
            data.category
          )
          .neq("id", data.id)
          .limit(4);

        setRelatedProducts(
          relatedData || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-xl
        "
      >
        Carregando produto...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        <h1 className="text-3xl font-bold">
          Produto não encontrado
        </h1>
      </div>
    );
  }

  const savings =
    product.old_price
      ? product.old_price -
        product.price
      : 0;

  return (
    <>
      <section
        className="
          bg-slate-50
          min-h-screen
          pt-32
          pb-20
        "
      >
        <Container>

          {/* Breadcrumb */}
          <div
            className="
              mb-8
              text-sm
              text-slate-500
            "
          >
            Home / Produtos /
            {" "}
            {product.category}
          </div>

          <div
            className="
              grid
              lg:grid-cols-2
              gap-12
            "
          >
            {/* Imagem */}
            <div>
              <div
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  border
                  border-slate-200
                  shadow-sm
                "
              >
                <img
                  src={
                    product.image_url
                  }
                  alt={
                    product.name
                  }
                  className="
                    w-full
                    h-150
                    object-cover
                  "
                />
              </div>
            </div>

            {/* Conteúdo */}
            <div>

              <p
                className="
                  text-blue-600
                  font-semibold
                "
              >
                {product.brand}
              </p>

              <h1
                className="
                  text-4xl
                  lg:text-5xl
                  font-bold
                  text-slate-900
                  mt-3
                "
              >
                {product.name}
              </h1>

              {/* Avaliação */}
              <div
                className="
                  flex
                  items-center
                  gap-1
                  mt-5
                "
              >
                {[...Array(5)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={18}
                      fill="currentColor"
                      className="
                        text-yellow-500
                      "
                    />
                  )
                )}

                <span
                  className="
                    ml-2
                    text-slate-500
                  "
                >
                  5.0 avaliações
                </span>
              </div>

              {/* Economia */}
              {savings > 0 && (
                <div
                  className="
                    inline-flex
                    mt-6
                    rounded-full
                    bg-green-100
                    text-green-700
                    px-4
                    py-2
                    font-medium
                  "
                >
                  Economize R$
                  {" "}
                  {savings.toFixed(2)}
                </div>
              )}

              {/* Preço */}
              <div className="mt-8">

                {product.old_price && (
                  <p
                    className="
                      text-slate-400
                      line-through
                      text-2xl
                    "
                  >
                    R$
                    {" "}
                    {product.old_price.toFixed(
                      2
                    )}
                  </p>
                )}

                <p
                  className="
                    text-6xl
                    font-black
                    text-slate-900
                  "
                >
                  R$
                  {" "}
                  {product.price.toFixed(
                    2
                  )}
                </p>

                <p
                  className="
                    text-green-600
                    font-semibold
                    mt-2
                  "
                >
                  12x de R$
                  {" "}
                  {(
                    product.price /
                    12
                  ).toFixed(2)}
                </p>

                <p
                  className="
                    text-slate-500
                    text-sm
                  "
                >
                  ou desconto
                  especial no PIX
                </p>

              </div>

              {/* Estoque */}
              <div
                className="
                  mt-6
                  bg-green-50
                  border
                  border-green-200
                  rounded-2xl
                  p-4
                "
              >
                <p
                  className="
                    font-medium
                    text-green-700
                  "
                >
                  Em estoque
                </p>

                <p
                  className="
                    text-sm
                    text-green-600
                  "
                >
                  {product.stock}
                  {" "}
                  unidades disponíveis
                </p>
              </div>

              {/* Benefícios */}
              <div
                className="
                  mt-8
                  bg-white
                  rounded-3xl
                  border
                  border-slate-200
                  p-6
                  space-y-4
                "
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} />
                  Produto Original
                </div>

                <div className="flex items-center gap-3">
                  <Truck size={20} />
                  Entrega Rápida
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard size={20} />
                  Parcelamento em até 12x
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} />
                  Compra 100% Segura
                </div>
              </div>

              {/* Botões */}
              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-4
                  mt-8
                "
              >
                <button
                  onClick={() =>
                    addToCart(
                      product
                    )
                  }
                  className="
                    h-14
                    rounded-2xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >
                  <ShoppingCart
                    size={20}
                  />

                  Adicionar ao
                  Carrinho
                </button>

                <a
                  href={`https://wa.me/5583999999999?text=Olá, tenho interesse no produto ${product.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    h-14
                    rounded-2xl
                    border
                    border-green-500
                    text-green-600
                    font-semibold
                    flex
                    items-center
                    justify-center
                    hover:bg-green-50
                    transition
                  "
                >
                  Comprar no
                  WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* Descrição */}
          <div
            className="
              mt-20
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Sobre este produto
            </h2>

            <p
              className="
                text-slate-600
                leading-8
              "
            >
              {
                product.description
              }
            </p>
          </div>

          {/* Especificações */}
          <div
            className="
              mt-8
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Especificações
            </h2>

            <div
              className="
                grid
                md:grid-cols-2
                gap-6
              "
            >
              <div>
                <strong>
                  Marca:
                </strong>
                {" "}
                {product.brand}
              </div>

              <div>
                <strong>
                  Categoria:
                </strong>
                {" "}
                {product.category}
              </div>

              <div>
                <strong>
                  Estoque:
                </strong>
                {" "}
                {product.stock}
              </div>

              <div>
                <strong>
                  Disponibilidade:
                </strong>
                {" "}
                Em estoque
              </div>
            </div>
          </div>

          {/* Relacionados */}
          {relatedProducts.length >
            0 && (
            <div className="mt-20">

              <h2
                className="
                  text-3xl
                  font-bold
                  mb-8
                "
              >
                Produtos
                Relacionados
              </h2>

              <div
                className="
                  grid
                  sm:grid-cols-2
                  xl:grid-cols-4
                  gap-8
                "
              >
                {relatedProducts.map(
                  (
                    related
                  ) => (
                    <ProductCard
                      key={
                        related.id
                      }
                      product={
                        related
                      }
                    />
                  )
                )}
              </div>

            </div>
          )}

        </Container>
      </section>

      <Footer />
    </>
  );
}
