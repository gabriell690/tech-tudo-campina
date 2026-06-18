import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  X,
  Image,
  Tags,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {
  const navigate =
    useNavigate();

  const { logout, session } =
    useAuth();

  async function handleLogout() {
    await logout();

    navigate(
      "/admin/login"
    );
  }

  const adminName =
    session?.user?.user_metadata
      ?.name || "Administrador";

  const adminEmail =
    session?.user?.email ||
    "";

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-2xl
      transition
      font-medium
      ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }
    `;

  return (
    <>
      {/* Overlay Mobile */}
      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/60
            z-40
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-slate-950
          text-white
          border-r
          border-slate-800
          z-50
          transition-transform
          duration-300
          flex
          flex-col

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
        `}
      >
        {/* Header */}
        <div
          className="
            p-6
            border-b
            border-slate-800
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                font-bold
                text-lg
              "
            >
              Tech Tudo Campina
            </h2>

            <p
              className="
                text-xs
                text-slate-400
              "
            >
              Painel de Controle
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* Usuário */}
        <div
          className="
            p-6
            border-b
            border-slate-800
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-full
              bg-blue-600
              flex
              items-center
              justify-center
              font-bold
            "
          >
            {adminName
              .charAt(0)
              .toUpperCase()}
          </div>

          <h3
            className="
              mt-3
              font-semibold
            "
          >
            {adminName}
          </h3>

          <p
            className="
              text-sm
              text-slate-400
              break-all
            "
          >
            {adminEmail}
          </p>
        </div>

        {/* Menu */}
       <nav
  className="
    flex-1
    p-4
    space-y-6
    overflow-y-auto
  "
>

  {/* Dashboard */}
  <div className="space-y-2">

    <p className="px-4 text-xs uppercase text-slate-500">
      Visão Geral
    </p>

    <NavLink
      to="/admin"
      end
      className={linkClass}
      onClick={onClose}
    >
      <LayoutDashboard size={20} />
      Dashboard
    </NavLink>

  </div>

  {/* Catálogo */}
  <div className="space-y-2">

    <p className="px-4 text-xs uppercase text-slate-500">
      Catálogo
    </p>

    <NavLink
      to="/admin/products"
      className={linkClass}
      onClick={onClose}
    >
      <Package size={20} />
      Produtos
    </NavLink>

    <NavLink
      to="/admin/categories"
      className={linkClass}
      onClick={onClose}
    >
      <Tags size={20} />
      Categorias
    </NavLink>

    <NavLink
      to="/admin/banners"
      className={linkClass}
      onClick={onClose}
    >
      <Image size={20} />
      Banners
    </NavLink>

  </div>

  {/* Vendas */}
  <div className="space-y-2">

    <p className="px-4 text-xs uppercase text-slate-500">
      Vendas
    </p>

    <NavLink
      to="/admin/orders"
      className={linkClass}
      onClick={onClose}
    >
      <ShoppingCart size={20} />
      Pedidos
    </NavLink>

    <button
      className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-2xl
        text-slate-300
        hover:bg-slate-800
        transition
      "
    >
      <Users size={20} />
      Clientes
    </button>

  </div>

  {/* Sistema */}
  <div className="space-y-2">

    <p className="px-4 text-xs uppercase text-slate-500">
      Sistema
    </p>

    <NavLink
      to="/admin/settings"
      className={linkClass}
      onClick={onClose}
    >
      <Settings size={20} />
      Configurações
    </NavLink>

  </div>

</nav>
        {/* Footer */}
        <div
          className="
            p-4
            border-t
            border-slate-800
          "
        >
          <button
            onClick={
              handleLogout
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-red-400
              hover:bg-red-500/10
              transition
            "
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}