import {
  Menu,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

interface BottomNavProps {
  onMenuClick: () => void;
}

export default function BottomNav({
  onMenuClick,
}: BottomNavProps) {
  const { cartCount } = useCart();

  return (
    <div
      className="
md:hidden
fixed
bottom-0
left-0
right-0
h-20
bg-yellow-400
border-t
border-yellow-500
z-50
shadow-2xl
"
    >
      <div className="grid grid-cols-4 h-full">

        {/* Menu */}
        <button
          onClick={onMenuClick}
          className="
            flex
            flex-col
            items-center
            justify-center
            text-slate-700
            active:text-blue-600
          "
        >
          <Menu size={24} />
          <span className="text-xs mt-1">
            Menu
          </span>
        </button>

        {/* Conta */}
       <Link
  to="/minha-conta"
  className="
    flex
    flex-col
    items-center
    justify-center
    text-slate-700
    active:text-blue-600
  "
>
  <User size={24} />
  <span className="text-xs mt-1">
    Conta
  </span>
</Link>

        {/* Favoritos */}
        <button
          className="
            flex
            flex-col
            items-center
            justify-center
            text-slate-700
            active:text-blue-600
          "
        >
          <Heart size={24} />
          <span className="text-xs mt-1">
            Favoritos
          </span>
        </button>

        {/* Carrinho */}
        <Link
          to="/carrinho"
          className="
            relative
            flex
            flex-col
            items-center
            justify-center
            text-slate-700
            active:text-blue-600
          "
        >
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span
              className="
                absolute
                top-2
                right-7
                bg-red-500
                text-white
                text-xs
                rounded-full
                min-w-5
                h-5
                px-1
                flex
                items-center
                justify-center
              "
            >
              {cartCount}
            </span>
          )}

          <span className="text-xs mt-1">
            Carrinho
          </span>
        </Link>

      </div>
    </div>
  );
}