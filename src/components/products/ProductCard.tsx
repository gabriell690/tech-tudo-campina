import {
Heart,
ShoppingCart,
Star,
Eye,
} from "lucide-react";

import type { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

type ProductCardProps = {
product: Product;
};

export default function ProductCard({
product,
}: ProductCardProps) {
const { addToCart } = useCart();

const {
name,
image,
price,
oldPrice,
} = product;

const discount =
oldPrice
? Math.round(
((oldPrice - price) / oldPrice) * 100
)
: 0;

return ( <div
   className="
     group
     relative
     overflow-hidden
     rounded-3xl
     border
     border-slate-200
     bg-white
     transition-all
     duration-300
     hover:-translate-y-2
     hover:shadow-2xl
   "
 >
{oldPrice && ( <div
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
-{discount}% </div>
)}

```
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

  <div className="relative bg-slate-50 overflow-hidden">
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="
        w-full
        h-72
        object-cover
        group-hover:scale-105
        transition-transform
        duration-500
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

    <button
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
    </button>
  </div>

  <div className="p-6">
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={14}
          fill="currentColor"
        />
      ))}

      <span className="ml-2 text-xs text-slate-500">
        5.0
      </span>
    </div>

    <h3 className="mt-4 font-semibold text-slate-900 leading-relaxed min-h-14">
      {name}
    </h3>

    <div className="mt-5">
      {oldPrice && (
        <p className="text-slate-400 line-through text-sm">
          R$ {oldPrice.toFixed(2)}
        </p>
      )}

      <p className="text-3xl font-bold text-slate-900">
        R$ {price.toFixed(2)}
      </p>

      <p className="text-sm text-green-600 mt-1">
        até 12x sem juros
      </p>
    </div>

    <button
      onClick={() => addToCart(product)}
      className="
        mt-6
        w-full
        bg-gradient-to-r
        from-blue-600
        to-blue-700
        hover:from-blue-700
        hover:to-blue-800
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
      <ShoppingCart size={18} />
      Comprar Agora
    </button>
  </div>
</div>

);
}
