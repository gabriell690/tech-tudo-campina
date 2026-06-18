import {
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";


import {
  ChevronDown,
  Package,
  Heart,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/logo.png";
import Container from "../ui/Container";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {

  const [userMenuOpen, setUserMenuOpen] = useState(false);


  const {
    user,
    profile,
    signOut,
  } = useAuth();
  
const firstName =
  profile?.name?.split(" ")[0] ||
  user?.email?.split("@")[0] ||
  "Usuário";

  const navigate = useNavigate();

  const { cartCount } = useCart();

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

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

            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="TechTudo Campina"
                className="h-40 w-auto"
              />
            </Link>

            {/* Busca */}
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
                "
                >
                  <Search size={24} />
                </button>

              </div>

            </div>

            {/* Usuário */}
            <div className="flex items-center gap-8">

              {
user ? (

<div className="relative">

  <button
    onClick={() =>
      setUserMenuOpen(!userMenuOpen)
    }
    className="
    flex
    items-center
    gap-3
    text-white
    hover:text-yellow-400
    transition
  "
  >

    <User size={20}/>

    <div className="text-left">

      <p className="text-xs text-slate-300">
        Olá,
      </p>

      <p className="font-semibold">
        {firstName}
      </p>

    </div>

    <ChevronDown size={18}/>

  </button>

  {
    userMenuOpen && (

      <div
        className="
        absolute
        top-full
        right-0
        mt-4
        w-64
        bg-white
        rounded-2xl
        shadow-2xl
        p-4
        z-50
      "
      >

        <Link
          to="/minha-conta"
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-slate-100
        "
        >
          <User size={18}/>
          Minha Conta
        </Link>

        <Link
          to="/meus-pedidos"
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-slate-100
        "
        >
          <Package size={18}/>
          Meus Pedidos
        </Link>

        <Link
          to="/favoritos"
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-slate-100
        "
        >
          <Heart size={18}/>
          Favoritos
        </Link>

        {
          profile?.role === "admin" && (

            <Link
              to="/admin"
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              text-yellow-600
              hover:bg-yellow-50
            "
            >
              <LayoutDashboard size={18}/>
              Painel Administrativo
            </Link>

          )
        }

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          text-red-500
          hover:bg-red-50
          w-full
        "
        >
          <LogOut size={18}/>
          Sair
        </button>

      </div>

    )
  }

</div>

) : (

<Link
  to="/login"
  className="
  flex
  items-center
  gap-2
  text-white
"
>

  <User size={20}/>

  <div>

    <p className="text-xs text-slate-300">
      Olá,
    </p>

    <p className="font-semibold">
      Entrar
    </p>

  </div>

</Link>

)
}

              {/* Carrinho */}
              <Link
                to="/carrinho"
                className="relative text-white"
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
            className="relative text-white"
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
              rounded-r-xl
              flex
              items-center
              justify-center
              text-slate-900
            "
            >
              <Search size={24} />
            </button>

          </div>

        </div>

      </div>

      {/* Categorias */}
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