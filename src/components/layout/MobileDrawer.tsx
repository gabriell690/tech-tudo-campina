import {
  X,
  User,
  ShoppingBag,
  Heart,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Monitor,
  Tv,
  Wifi,
  Watch
} from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  open,
  onClose,
}: MobileDrawerProps) {

  const categories = [
    {
      name: "Smartphones",
      icon: Smartphone,
    },
    {
      name: "Notebooks",
      icon: Laptop,
    },
    {
      name: "Informática",
      icon: Monitor,
    },
    {
      name: "Games",
      icon: Gamepad2,
    },
    {
      name: "Fones",
      icon: Headphones,
    },
    {
      name: "Smartwatches",
      icon: Watch,
    },
    {
      name: "Redes",
      icon: Wifi,
    },
    {
      name: "TV & Streaming",
      icon: Tv,
    },
  ];

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
          bg-white
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
        <div className="p-5 border-b">

          <Link
            to="/admin/login"
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

        </div>

        {/* Pedidos */}
        <div className="p-5 border-b">

          <Link
            to="/pedidos"
            onClick={onClose}
            className="flex items-center gap-4"
          >
            <ShoppingBag size={22} />

            <span>Meus Pedidos</span>

          </Link>

        </div>

        {/* Favoritos */}
        <div className="p-5 border-b">

          <Link
            to="/favoritos"
            onClick={onClose}
            className="flex items-center gap-4"
          >
            <Heart size={22} />

            <span>Favoritos</span>

          </Link>

        </div>

        {/* Categorias */}
        <div className="p-5">

          <h2 className="font-bold text-lg mb-5">
            Categorias
          </h2>

          <div className="space-y-5">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to={`/categoria/${category.name}`}
                  onClick={onClose}
                  className="
                    flex
                    items-center
                    gap-4
                    text-slate-700
                    hover:text-blue-600
                  "
                >
                  <Icon size={22} />

                  {category.name}
                </Link>
              );
            })}

          </div>

        </div>

      </aside>
    </>
  );
}