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

import { NavLink, useNavigate } from "react-router-dom";
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
    profile?.name || user?.email || "Administrador";

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
    transition-all
    font-medium
    ${
      isActive
        ? "bg-yellow-400 text-[#071A35]"
        : "text-slate-300 hover:bg-[#10294F]"
    }
  `;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
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
        bg-[#071A35]
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
        <div className="p-6 border-b border-blue-900 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              TechTudo Campina
            </h2>

            <p className="text-sm text-slate-400">
              Painel Administrativo
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={onClose}
          >
            <X />
          </button>

        </div>

        {/* Usuário */}
        <div className="p-6 border-b border-blue-900">

          <div className="
          w-14
          h-14
          rounded-full
          bg-yellow-400
          text-[#071A35]
          flex
          items-center
          justify-center
          text-xl
          font-bold
          ">
            {adminName.charAt(0).toUpperCase()}
          </div>

          <h3 className="mt-4 font-semibold">
            {adminName}
          </h3>

          <p className="text-sm text-slate-400 break-all">
            {adminEmail}
          </p>

        </div>

        {/* Menu */}
        <div className="
        flex-1
        overflow-y-auto
        p-4
        space-y-8
        ">

          <div>

            <p className="text-xs uppercase text-slate-500 px-4 mb-2">
              Visão Geral
            </p>

            <NavLink end to="/admin" className={linkClass}>
              <LayoutDashboard size={20}/>
              Dashboard
            </NavLink>

          </div>

          <div>

            <p className="text-xs uppercase text-slate-500 px-4 mb-2">
              Catálogo
            </p>

            <NavLink to="/admin/products" className={linkClass}>
              <Package size={20}/>
              Produtos
            </NavLink>

            <NavLink to="/admin/categories" className={linkClass}>
              <Tags size={20}/>
              Categorias
            </NavLink>

            <NavLink to="/admin/banners" className={linkClass}>
              <Image size={20}/>
              Banners
            </NavLink>

          </div>

          <div>

            <p className="text-xs uppercase text-slate-500 px-4 mb-2">
              Vendas
            </p>

            <NavLink to="/admin/orders" className={linkClass}>
              <ShoppingCart size={20}/>
              Pedidos
            </NavLink>

            <NavLink to="/admin/customers" className={linkClass}>
              <Users size={20}/>
              Clientes
            </NavLink>

          </div>

          <div>

            <p className="text-xs uppercase text-slate-500 px-4 mb-2">
              Sistema
            </p>

            <NavLink to="/admin/settings" className={linkClass}>
              <Settings size={20}/>
              Configurações
            </NavLink>

          </div>

        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-blue-900">

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
            text-red-300
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