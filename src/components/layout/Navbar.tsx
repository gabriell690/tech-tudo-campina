import {
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Container from "../ui/Container";
import { useCart } from "../../context/CartContext";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const { cartCount } = useCart();

  const categories = [
    "Smartphones",
    "Notebooks",
    "Informática",
    "Games",
    "Fones",
    "Smartwatches",
    "Redes",
    "TV & Streaming",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">

      {/* Desktop */}
      <div className="hidden md:block bg-[#071A35] border-b border-blue-900">
        <Container>
          <div className="h-24 flex items-center gap-8">

            <Link
              to="/"
              className="shrink-0"
            >
              <img
                src={logo}
                alt="Tech Tudo Campina"
                className="h-40 w-auto"
              />
            </Link>

            <div className="flex-1 max-w-5xl mx-10">
              <div className="relative">

         <input
  type="text"
  placeholder="O que você está procurando?"
  className="
    w-full
    h-14
    rounded-2xl
    bg-slate-700
    border
    border-slate-700
    text-white
    placeholder:text-slate-300
    px-6
    pr-20
    outline-none
    focus:border-yellow-400
  "
/>
<button
  className="
    absolute
    right-0
    top-0
    h-14
    w-14
    bg-yellow-400
    hover:bg-yellow-500
    rounded-r-xl
    flex
    items-center
    justify-center
    text-slate-900
    transition
  "
>
  <Search size={24} />
</button>
              </div>
            </div>

            <div className="flex items-center gap-8">

              <Link
                to="/admin/login"
                className="
                  flex
                  items-center
                  gap-2
                  text-white
                "
              >
                <User size={20} />
                Login
              </Link>

              <Link
                to="/carrinho"
                className="
                  relative
                  text-white
                "
              >
                <ShoppingCart size={24} />

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    rounded-full
                    min-w-5
                    h-5
                    px-1
                    text-xs
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>

              </Link>

            </div>

          </div>
        </Container>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-[#071A35]">

        <div className="h-20 px-4 flex items-center justify-between">

          <button
            onClick={onMenuClick}
            className="text-white"
          >
            <Menu size={28} />
          </button>

          <Link to="/">
            <img
              src={logo}
              alt="TechTudo"
              className="h-40"
            />
          </Link>

          <Link
            to="/carrinho"
            className="
              relative
              text-white
            "
          >
            <ShoppingCart size={24} />

            <span
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                rounded-full
                min-w-5
                h-5
                px-1
                text-xs
                text-white
                flex
                items-center
                justify-center
              "
            >
              {cartCount}
            </span>

          </Link>

        </div>

        {/* Busca Mobile */}
        <div className="px-4 pb-4">

          <div className="relative">

            <input
              type="text"
              placeholder="O que você está procurando?"
              className="
                w-full
                h-14
                rounded-xl
                bg-slate-700
                text-white
                px-5
                pr-16
                outline-none
              "
            />

           <button
  className="
    absolute
    right-0
    top-0
    h-14
    w-14
    bg-yellow-400
    hover:bg-yellow-500
    rounded-r-xl
    flex
    items-center
    justify-center
    text-slate-900
    transition
  "
>
  <Search size={24} />
</button>

          </div>

        </div>

      </div>

      {/* Categorias Desktop */}
      <div className="hidden lg:block bg-white border-b">

        <Container>

          <nav className="flex items-center justify-center gap-10 h-10">

          {categories.map((category) => (
  <Link
    key={category}
    to={`/categoria/${encodeURIComponent(category)}`}
    className="
      text-sm
      font-medium
      text-slate-700
      hover:text-blue-600
      transition
    "
  >
    {category}
    
  </Link>
  
))}

          </nav>

        </Container>

      </div>

    </header>
  );
}