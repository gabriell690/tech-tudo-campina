import { useState } from "react";

import {
Menu,
Search,
ShoppingCart,
User,
X,
} from "lucide-react";

import logo from "../../assets/logo.png";
import Container from "../ui/Container";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";


export default function Navbar() {
const [mobileOpen, setMobileOpen] = useState(false);

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
<>
{mobileOpen && (
<div
className="fixed inset-0 bg-black/60 z-90 lg:hidden"
onClick={() => setMobileOpen(false)}
/>
)}

  <aside
    className={`
      fixed
      top-0
      left-0
      h-screen
      w-[320px]
      bg-slate-950
      z-100
      transition-transform
      duration-300
      lg:hidden
      ${
        mobileOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }
    `}
  >
    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
      <div>
        <h2 className="text-white font-bold text-lg">
          Tech Tudo Campina
        </h2>

        <p className="text-slate-400 text-sm">
          Tecnologia Premium
        </p>
      </div>

      <button
        className="text-white"
        onClick={() => setMobileOpen(false)}
      >
        <X />
      </button>
    </div>

    <div className="p-6">
      <nav className="space-y-5">
        {categories.map((category) => (
          <button
            key={category}
            className="
              block
              text-slate-300
              hover:text-blue-400
              transition
            "
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="mt-10 pt-6 border-t border-slate-800">
        <button className="flex items-center gap-3 text-slate-300">
          <User size={20} />
          Minha Conta
        </button>

       <Link
  to="/carrinho"
  className="
    relative
    text-slate-600
    hover:text-blue-600
    transition
  "
>
  <ShoppingCart size={24} />

  <span
    className="
      absolute
      -top-2
      -right-2
      min-w-5
      h-5
      px-1
      rounded-full
      bg-red-500
      text-white
      text-xs
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
  </aside>

 <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">
  {/* Barra Superior */}
  <div className="bg-[#071A35] border-b border-blue-900">
  
  </div>

  {/* Navbar Principal */}
  <div className="bg-[#071A35] border-b border-blue-900">
    <Container>
      <div className="h-24 flex items-center gap-6">

        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </button>

        <Link
          to="/"
          className="flex items-center shrink-0"
        >
          <img
            src={logo}
            alt="Tech Tudo Campina"
            className="h-40 w-auto"
          />
        </Link>

        <div className="hidden md:flex flex-1 max-w-3xl mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Busque smartphones, notebooks, acessórios..."
              className="
                w-full
                h-14
                rounded-2xl
                bg-white
                border
                border-slate-200
                px-6
                pr-16
                text-slate-900
                outline-none
                focus:border-blue-500
              "
            />

            <button
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                w-10
                h-10
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                flex
                items-center
                justify-center
              "
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">

          <Link
            to="/admin/login"
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-white
              hover:text-yellow-400
              transition
            "
          >
            <User size={20} />
            <span>Login</span>
          </Link>

          <Link
            to="/carrinho"
            className="
              relative
              text-white
              hover:text-yellow-400
              transition
            "
          >
            <ShoppingCart size={24} />

            <span
              className="
                absolute
                -top-2
                -right-2
                min-w-5
                h-5
                px-1
                rounded-full
                bg-red-500
                text-white
                text-xs
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

  {/* Categorias */}
  <div className="bg-white border-b border-slate-200">
    <Container>
      <nav
        className="
          hidden
          lg:flex
          items-center
          justify-center
          gap-10
          h-10
        "
      >
        {categories.map((category) => (
          <button
            key={category}
            className="
              text-sm
              font-medium
              text-slate-700
              hover:text-blue-600
              transition
            "
          >
            {category}
          </button>
        ))}
      </nav>
    </Container>
  </div>
</header>
</>
);
}
