import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Star,
  Minus,
  Plus,
} from "lucide-react";

import { useState } from "react";

import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] =
    useState(1);

  return (
    <div className="space-y-8">

      {/* Marca */}
      <div>

        <p
          className="
          uppercase
          tracking-wider
          text-xs
          font-bold
          text-slate-400
        "
        >
          {product.brand}
        </p>

        {/* Nome */}
        <h1
          className="
          mt-3
          text-2xl
          md:text-4xl
          font-bold
          text-slate-900
          leading-tight
        "
        >
          {product.name}
        </h1>

        {/* Avaliação */}
        <div
          className="
          mt-4
          flex
          items-center
          gap-1
        "
        >
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              fill="currentColor"
              className="text-yellow-400"
            />
          ))}

          <span
            className="
            ml-2
            text-sm
            text-slate-500
          "
          >
            5.0
          </span>
        </div>

      </div>

      {/* Preços */}
      <div>

        {product.old_price && (
          <p
            className="
            text-lg
            text-slate-400
            line-through
          "
          >
            R$ {Number(product.old_price).toFixed(2)}
          </p>
        )}

        <h2
          className="
          text-4xl
          md:text-5xl
          font-black
          text-slate-900
        "
        >
          R$ {Number(product.price).toFixed(2)}
        </h2>

        <p
          className="
          mt-2
          text-green-600
          font-semibold
        "
        >
          12x de R$
          {" "}
          {(product.price / 12).toFixed(2)}
          {" "}
          sem juros
        </p>

      </div>

      {/* Quantidade */}
      <div>

        <p className="font-semibold mb-3">
          Quantidade
        </p>

        <div
          className="
          flex
          items-center
          gap-4
        "
        >

          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
            className="
            w-12
            h-12
            rounded-2xl
            border
            flex
            items-center
            justify-center
          "
          >
            <Minus size={18} />
          </button>

          <span className="font-bold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
            className="
            w-12
            h-12
            rounded-2xl
            border
            flex
            items-center
            justify-center
          "
          >
            <Plus size={18} />
          </button>

        </div>

      </div>

      {/* Botões */}
      <div className="space-y-4">

        <button
          className="
          w-full
          h-14
          rounded-3xl
          bg-green-600
          hover:bg-green-700
          text-white
          font-semibold
          transition
        "
        >
          Comprar Agora
        </button>

        <button
          onClick={() =>
            addToCart(product)
          }
          className="
          w-full
          h-14
          rounded-3xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-3
          transition
        "
        >
          <ShoppingCart size={20} />

          Adicionar ao Carrinho
        </button>

      </div>

      {/* Benefícios */}
      <div
        className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        space-y-5
      "
      >

        <div className="flex gap-4">
          <Truck className="text-blue-600" />
          <div>
            <h3 className="font-semibold">
              Entrega rápida
            </h3>

            <p className="text-sm text-slate-500">
              Enviamos para todo o Brasil.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <ShieldCheck className="text-green-600" />

          <div>
            <h3 className="font-semibold">
              Garantia
            </h3>

            <p className="text-sm text-slate-500">
              Produto com garantia e suporte.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <BadgeCheck className="text-purple-600" />

          <div>
            <h3 className="font-semibold">
              Produto original
            </h3>

            <p className="text-sm text-slate-500">
              Procedência garantida.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}