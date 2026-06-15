import {
LayoutDashboard,
Package,
ShoppingCart,
Users,
Settings,
} from "lucide-react";

import { Link } from "react-router-dom";


export default function AdminSidebar() {
return ( <aside
   className="
     w-72
     bg-slate-950
     text-white
     min-h-screen
     p-6
   "
 > <div className="mb-10"> <h1 className="text-2xl font-bold">
Tech Tudo </h1>
    <p className="text-slate-400 text-sm">
      Painel Administrativo
    </p>
  </div>

  <nav className="space-y-2">
   <Link
  to="/admin"
  className="
    w-full
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    hover:bg-slate-800
    transition
  "
>
  <LayoutDashboard size={20} />
  Dashboard
</Link>

   <Link
  to="/admin/products"
  className="
    w-full
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    hover:bg-slate-800
    transition
  "
>
  <Package size={20} />
  Produtos
</Link>

    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
      <ShoppingCart size={20} />
      Pedidos
    </button>

    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
      <Users size={20} />
      Clientes
    </button>

    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
      <Settings size={20} />
      Configurações
    </button>
  </nav>
</aside>

);
}
