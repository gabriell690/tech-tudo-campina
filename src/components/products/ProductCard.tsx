import { Heart, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const discount =
    product.old_price && product.old_price > product.price
      ? Math.round(
          ((product.old_price - product.price) /
            product.old_price) *
            100
        )
      : 0;

  const installment = (
    Number(product.price) / 10
  ).toFixed(2);

  const rating = product.rating ?? 5;

  return (
    <Link
      to={`/produto/${product.slug}`}
      className="
        group
        block
        h-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-300
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between px-4 pt-4">

        <div className="flex items-center gap-1 text-amber-500">

          <Star
            size={14}
            fill="currentColor"
          />

          <span className="text-sm font-medium">
            {rating.toFixed(1)}
          </span>

        </div>

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-slate-100
            transition
            hover:bg-red-50
          "
        >
          <Heart
            size={17}
            className="text-slate-500"
          />
        </button>

      </div>

      {/* Imagem */}

      <div
        className="
          relative
          flex
          h-48 lg:h-52
          items-center
          justify-center
          px-5
          py-4
        "
      >

        {discount > 0 && (

          <span
            className="
              absolute
              left-4
              top-3
              rounded-lg
              bg-green-600
              px-2
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            -{discount}%
          </span>

        )}

        <img
          src={
            product.image_url ||
            product.image
          }
          alt={product.name}
          className="
            h-full
            w-full
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

      </div>

      {/* Conteúdo */}

      <div className="px-4 pb-5">

        <div
          className="
            mb-3
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-green-50
            px-3
            py-1
            text-xs
            font-medium
            text-green-700
          "
        >
          <Truck size={13} />
          Entrega Rápida
        </div>

        <p
          className="
            text-xs
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {product.brand}
        </p>

        <h3
          className="
            mt-2
            line-clamp-2
            min-h-13
            text-[15px]
            font-medium
            leading-6
            text-slate-700
          "
        >
          {product.name}
        </h3>

        {product.old_price && (
          <p
            className="
              mt-3
              text-sm
              text-slate-400
              line-through
            "
          >
            R$ {Number(product.old_price).toFixed(2)}
          </p>
        )}

        <div className="mt-1 flex items-end gap-2">

          <span
            className="
              text-2xl
              font-semibold
              text-slate-900
            "
          >
            R$ {Number(product.price).toFixed(2)}
          </span>

          {discount > 0 && (
            <span
              className="
                rounded
                bg-green-100
                px-2
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >
              -{discount}%
            </span>
          )}

        </div>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          ou <strong>10x</strong> de
          {" "}
          <strong>
            R$ {installment}
          </strong>
          {" "}
          sem juros
        </p>
      </div>
    </Link>
  );
}