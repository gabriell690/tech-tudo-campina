import {
  Heart,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {

  const discount =
    product.old_price
      ? Math.round(
          ((product.old_price - product.price) /
            product.old_price) *
            100
        )
      : 0;

  return (
    <Link
      to={`/produto/${product.slug}`}
      className="
      group
      block
      bg-white
      rounded-2xl
      border
      border-slate-200
      overflow-hidden
      transition-all
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
      "
    >

      {/* Imagem */}
      <div
        className="
        relative
        bg-white
        aspect-square
        p-6
        flex
        items-center
        justify-center
        "
      >

        {discount > 0 && (
          <div
            className="
            absolute
            top-3
            left-3
            bg-green-600
            text-white
            text-xs
            font-bold
            px-2
            py-1
            rounded-md
            "
          >
            -{discount}%
          </div>
        )}

        <button
          className="
          absolute
          top-3
          right-3
          w-8
          h-8
          rounded-full
          bg-white
          shadow
          flex
          items-center
          justify-center
          "
        >
          <Heart
            size={16}
            className="text-slate-500"
          />
        </button>

        <img
          src={
            product.image_url ||
            product.image
          }
          alt={product.name}
          className="
          w-full
          h-full
          object-contain
          transition
          duration-300
          group-hover:scale-105
          "
        />

      </div>

      {/* Conteúdo */}
      <div className="p-4">

        <div
          className="
          flex
          items-center
          gap-1
          text-orange-500
          text-xs
          mb-2
          "
        >
          <Star
            size={12}
            fill="currentColor"
          />

          <span className="font-medium">
            5.0
          </span>
        </div>

        <h3
          className="
          text-slate-800
          text-sm
          leading-5
          line-clamp-2
          min-h-10
          "
        >
          {product.name}
        </h3>

        {product.old_price && (
          <p
            className="
            mt-2
            text-sm
            text-slate-400
            line-through
            "
          >
            R$ {Number(product.old_price).toFixed(2)}
          </p>
        )}

        <h4
          className="
          text-3xl
          font-black
          text-slate-900
          mt-1
          "
        >
          R$ {Number(product.price).toFixed(2)}
        </h4>

        <p
          className="
          text-green-600
          text-sm
          font-medium
          mt-1
          "
        >
          12x de R$
          {" "}
          {(Number(product.price) / 12).toFixed(2)}
        </p>

      </div>

    </Link>
  );
}
