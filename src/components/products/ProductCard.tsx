import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
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
          ((product.old_price -
            product.price) /
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
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Desconto */}
      {product.old_price && (
        <div
          className="
            absolute
            top-4
            left-4
            z-20
            rounded-full
            bg-red-500
            px-3
            py-1
            text-xs
            font-bold
            text-white
          "
        >
          -{discount}%
        </div>
      )}

      {/* Favorito */}
      <button
        className="
          absolute
          top-4
          right-4
          z-20
          w-10
          h-10
          rounded-full
          bg-white
          shadow-md
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
          transition
        "
      >
        <Heart size={18} />
      </button>

      {/* Imagem */}
      <div
        className="
          relative
          bg-slate-50
          overflow-hidden
        "
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="
            w-full
            h-80
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/10
            opacity-0
            group-hover:opacity-100
            transition
          "
        />

        <Link
          to={`/produto/${product.slug}`}
          className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            bg-white
            px-4
            py-2
            rounded-xl
            shadow-lg
            flex
            items-center
            gap-2
            text-sm
            font-medium
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          <Eye size={16} />
          Visualizar
        </Link>
      </div>

      {/* Conteúdo */}
      <div className="p-6">

        {/* Avaliação */}
        <div
          className="
            flex
            items-center
            gap-1
            text-yellow-500
          "
        >
          {[...Array(5)].map(
            (_, index) => (
              <Star
                key={index}
                size={14}
                fill="currentColor"
              />
            )
          )}

          <span
            className="
              ml-2
              text-xs
              text-slate-500
            "
          >
            5.0
          </span>
        </div>

        {/* Nome */}
        <h3
          className="
            mt-4
            font-semibold
            text-slate-900
            leading-relaxed
            min-h-15
          "
        >
          {product.name}
        </h3>

        {/* Marca */}
        <p
          className="
            text-sm
            text-slate-500
            mt-2
          "
        >
          {product.brand}
        </p>

        {/* Preços */}
        <div className="mt-5">
          {product.old_price && (
            <p
              className="
                text-slate-400
                line-through
                text-sm
              "
            >
              R$
              {" "}
              {Number(
                product.old_price
              ).toFixed(2)}
            </p>
          )}

          <p
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            R$
            {" "}
            {Number(
              product.price
            ).toFixed(2)}
          </p>

          <p
            className="
              text-sm
              text-green-600
              mt-1
            "
          >
            12x de R$
            {" "}
            {(
              Number(
                product.price
              ) / 12
            ).toFixed(2)}
          </p>
        </div>

        {/* Botões */}
        <div
          className="
            mt-6
            flex
            flex-col
            gap-3
          "
        >
          <button
            onClick={() =>
              addToCart(product)
            }
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-2xl
              py-3
              flex
              items-center
              justify-center
              gap-2
              font-medium
              transition
            "
          >
            <ShoppingCart
              size={18}
            />

            Adicionar ao Carrinho
          </button>

          <Link
            to={`/produto/${product.slug}`}
            className="
              w-full
              border
              border-slate-200
              rounded-2xl
              py-3
              text-center
              font-medium
              hover:bg-slate-50
              transition
            "
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
