/* eslint-disable no-empty-pattern */
import {
  X,
  User,
  ShoppingBag,
  Heart,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { useCategories } from "../../hooks/useCategories";
import CategoryAccordion from "./CategoryAccordion";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  open,
  onClose,
}: MobileDrawerProps) {

  
const navigate = useNavigate();

const [] = useState<string | null>(null);

const { categories } = useCategories();

const {
  user,
  profile,
  signOut,
} = useAuth();

const firstName =
  profile?.name?.split(" ")[0] ||
  user?.email?.split("@")[0] ||
  "Usuário";

async function handleLogout() {
  await signOut();
  onClose();
  navigate("/");
}


  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={onClose}
        />
      )}

     <aside
  className={`
    fixed
    top-0
    left-0
    h-screen
    w-82.5
    bg-[#071A35]
    text-white
    z-999
    transition-transform
    duration-300
    overflow-y-auto
    pb-28
    ${open ? "translate-x-0" : "-translate-x-full"}
`}
>

        {/* Topo */}
        <div className="bg-[#071A35] p-3 flex items-center justify-between">

          <div>
          <img
  src={logo}
  className="h-40"
/>
          </div>

          <button
            className="text-white"
            onClick={onClose}
          >
            <X />
          </button>

        </div>

      {/* Conta */}
<div className="
p-5
border-b
border-blue-900
">

  {user ? (

    <div className="space-y-4">

      <Link
        to="/minha-conta"
        onClick={onClose}
        className="
        flex
        items-center
        justify-between
      "
      >

        <div className="flex items-center gap-4">

          <User size={22} />

          <div>

            <h3 className="font-semibold">
              {firstName}
            </h3>

            <p className="text-sm text-slate-300">
              Minha Conta
            </p>

          </div>

        </div>

        <ChevronRight size={18} />

      </Link>

      <Link
        to="/meus-pedidos"
        onClick={onClose}
        className="
        flex
        items-center
        gap-4
      "
      >
        <ShoppingBag size={22} />

        <span>
          Meus Pedidos
        </span>

      </Link>

      <Link
        to="/favoritos"
        onClick={onClose}
        className="
        flex
        items-center
        gap-4
      "
      >
        <Heart size={22} />

        <span>
          Favoritos
        </span>

      </Link>

      {
        profile?.role === "admin" && (

          <Link
            to="/admin"
            onClick={onClose}
            className="
            flex
            items-center
            gap-4
            text-yellow-400
          "
          >
            <LayoutDashboard size={22} />

            Painel Administrativo

          </Link>

        )
      }

      <button
        onClick={handleLogout}
        className="
        flex
        items-center
        gap-4
        text-red-500
      "
      >
        <LogOut size={22} />

        Sair

      </button>

    </div>

  ) : (

    <Link
      to="/login"
      onClick={onClose}
      className="flex items-center gap-4"
    >

      <User size={22} />

      <div>

        <h3 className="font-semibold">
          Minha Conta
        </h3>

        <p className="text-sm text-slate-500">
          Entrar ou cadastrar
        </p>

      </div>

    </Link>

  )}

</div>

   {/* Categorias */}
<div className="
p-5
border-t
border-blue-900
">

 <h2 className="
font-bold
text-xl
mb-5
text-yellow-400
">
    Categorias
  </h2>

  <div className="space-y-3">

  {categories.map((category) => (

    <CategoryAccordion
      key={category.id}
      category={category}
      onClose={onClose}
    />

  ))}

</div>

</div>


      </aside>
    </>
  );
}