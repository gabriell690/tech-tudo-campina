
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
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
    <aside
      className="
        w-72
        min-h-screen
        bg-slate-950
        text-white
        flex
        flex-col
        border-r
        border-slate-800
      "
    >
      {/* Header */}
      <div
        className="
          p-6
          border-b
          border-slate-800
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
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
        </div>
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
          space-y-2
        "
      >
        <NavLink
          to="/admin"
          end
          className={
            linkClass
          }
        >
          <LayoutDashboard
            size={20}
          />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={
            linkClass
          }
        >
          <Package
            size={20}
          />
          Produtos
        </NavLink>

        <NavLink
          to="/admin/products/new"
          className={
            linkClass
          }
        >
          <PlusCircle
            size={20}
          />
          Novo Produto
        </NavLink>

        <NavLink
  to="/admin/orders"
  className={linkClass}
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
          <Users
            size={20}
          />
          Clientes
        </button>

<NavLink
  to="/admin/banners"
  className={linkClass}
>
  Banners
</NavLink>

    <NavLink
  to="/admin/settings"
  className={linkClass}
>
  <Settings size={20} />
  Configurações
</NavLink>
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
          <LogOut
            size={20}
          />
          Sair
        </button>
      </div>
    </aside>
  );
}
