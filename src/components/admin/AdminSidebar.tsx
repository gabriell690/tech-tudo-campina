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

import { useAuth } from "../../hooks/useAuth";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {

  const navigate = useNavigate();

  const {
    signOut,
    user,
    profile,
  } = useAuth();

  async function handleLogout() {

    await signOut();

    navigate("/");
  }

  const adminName =
    profile?.name ||
    user?.email ||
    "Administrador";

  const adminEmail =
    user?.email || "";

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
        ? "bg-orange-500 text-white"
        : "text-zinc-300 hover:bg-zinc-800"
    }
  `;

  return (
    <>
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
        bg-zinc-950
        border-r
        border-zinc-800
        text-white
        flex
        flex-col
        z-50
        transition-transform
        duration-300

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
          border-zinc-800
          flex
          justify-between
          items-center
        "
        >
          <div>
            <h2 className="font-bold text-lg">
              TechTudo Campina
            </h2>

            <p className="text-xs text-zinc-500">
              Painel Administrativo
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
          border-zinc-800
        "
        >
          <div
            className="
            w-12
            h-12
            rounded-full
            bg-orange-500
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

          <h3 className="mt-3 font-semibold">
            {adminName}
          </h3>

          <p className="text-sm text-zinc-500 break-all">
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

          <div className="space-y-2">

            <p className="px-4 text-xs uppercase text-zinc-500">
              Visão Geral
            </p>

            <NavLink
              end
              to="/admin"
              className={linkClass}
            >
              <LayoutDashboard size={20}/>
              Dashboard
            </NavLink>

          </div>

          <div className="space-y-2">

            <p className="px-4 text-xs uppercase text-zinc-500">
              Catálogo
            </p>

            <NavLink
              to="/admin/products"
              className={linkClass}
            >
              <Package size={20}/>
              Produtos
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={linkClass}
            >
              <Tags size={20}/>
              Categorias
            </NavLink>

            <NavLink
              to="/admin/banners"
              className={linkClass}
            >
              <Image size={20}/>
              Banners
            </NavLink>

          </div>

          <div className="space-y-2">

            <p className="px-4 text-xs uppercase text-zinc-500">
              Vendas
            </p>

            <NavLink
              to="/admin/orders"
              className={linkClass}
            >
              <ShoppingCart size={20}/>
              Pedidos
            </NavLink>

            <NavLink
              to="/admin/customers"
              className={linkClass}
            >
              <Users size={20}/>
              Clientes
            </NavLink>

          </div>

          <div className="space-y-2">

            <p className="px-4 text-xs uppercase text-zinc-500">
              Sistema
            </p>

            <NavLink
              to="/admin/settings"
              className={linkClass}
            >
              <Settings size={20}/>
              Configurações
            </NavLink>

          </div>

        </nav>

        {/* Footer */}
        <div
          className="
          p-4
          border-t
          border-zinc-800
        "
        >
          <button
            onClick={handleLogout}
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
            <LogOut size={20}/>
            Sair
          </button>
        </div>

      </aside>
    </>
  );
}