import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const discount =
    product.old_price
      ? Math.round(
          ((product.old_price - product.price) /
            product.old_price) *
            100
        )
      : 0;

  return (
   <article
  className="
    group
    relative
    overflow-hidden
    rounded-[28px]
    bg-white
    border
    border-slate-200
    shadow-sm
    transition-all
    duration-300
    hover:shadow-2xl
    hover:-translate-y-1

    max-w-[320px]
    min-h-[560px]
  "
>
      {/* Desconto */}
      {product.old_price && (
        <div
          className="
          absolute
          top-3
          left-3
          z-20
          bg-red-500
          text-white
          text-xs
          font-bold
          px-3
          py-1
          rounded-full
        "
        >
          -{discount}%
        </div>
      )}

      {/* Favorito */}
      <button
        className="
        absolute
        top-3
        right-3
        z-20
        w-9
        h-9
        rounded-full
        bg-white
        shadow-md
        flex
        items-center
        justify-center
        transition
        hover:bg-red-50
      "
      >
        <Heart
          size={18}
          className="text-slate-500"
        />
      </button>

      {/* Imagem */}
      <Link
        to={`/produto/${product.slug}`}
        className="
          block
          bg-slate-50
        "
      >
     <img
  src={product.image_url || product.image}
  alt={product.name}
  loading="lazy"
  className="
    w-full
    h-72
    md:h-80
    object-cover
    transition-transform
    duration-500
    group-hover:scale-105
  "
/>
      </Link>

      {/* Conteúdo */}
      <div className="p-4 md:p-5">

        {/* Marca */}
        <p
          className="
          uppercase
          tracking-wider
          text-[11px]
          font-bold
          text-slate-400
        "
        >
          {product.brand}
        </p>

        {/* Nome */}
       <Link
  to={`/produto/${product.slug}`}
  className="
    block
    bg-slate-50
    overflow-hidden
    rounded-t-[28px]
  "
>
          <h3
            className="
            mt-2
            text-sm
            md:text-base
            font-semibold
            text-slate-900
            leading-6
            line-clamp-2
            min-h-13
          "
          >
            {product.name}
          </h3>
        </Link>

        {/* Avaliação */}
        <div
          className="
          mt-3
          flex
          items-center
          gap-1
        "
        >
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={13}
              fill="currentColor"
              className="text-yellow-400"
            />
          ))}

          <span
            className="
            ml-1
            text-xs
            text-slate-500
          "
          >
            5.0
          </span>
        </div>

        {/* Preços */}
        <div className="mt-4">

          {product.old_price && (
            <p
              className="
              text-xs
              text-slate-400
              line-through
            "
            >
              R$ {Number(product.old_price).toFixed(2)}
            </p>
          )}

          <h4
            className="
            text-2xl
            md:text-3xl
            font-black
            text-slate-900
          "
          >
            R$ {Number(product.price).toFixed(2)}
          </h4>

          <p
            className="
            mt-1
            text-sm
            text-green-600
            font-semibold
          "
          >
            12x de R$
            {" "}
            {(Number(product.price) / 12).toFixed(2)}
            {" "}
            no cartão
          </p>

          <p
            className="
            mt-2
            text-xs
            text-blue-600
            font-semibold
          "
          >
            ✓ Entrega rápida
          </p>

        </div>

        {/* Botão */}
        <button
          onClick={() => addToCart(product)}
          className="
          mt-5
          w-full
          h-12
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
          <ShoppingCart size={18} />
          Adicionar
        </button>

      </div>
    </article>
  );
}