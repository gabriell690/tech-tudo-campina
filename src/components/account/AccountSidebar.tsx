import {
  User,
  Package,
  Heart,
  MapPin,
  Shield,
  LogOut,
} from "lucide-react";

export default function AccountSidebar() {
  return (
    <aside className="bg-white rounded-2xl p-6 shadow-sm">

      <h2 className="font-bold text-xl mb-8">
        Minha Conta
      </h2>

      <nav
className="
flex
overflow-x-auto
gap-3
pb-2

lg:block
lg:space-y-6
"
>

        <button
className="
flex
items-center
gap-2
shrink-0

px-4
py-3

rounded-xl
bg-slate-100

lg:bg-transparent
"
>
          <User size={20}/>
          Dados Pessoais
        </button>

       <button
className="
flex
items-center
gap-2
shrink-0

px-4
py-3

rounded-xl
bg-slate-100

lg:bg-transparent
"
>
          <Package size={20}/>
          Meus Pedidos
        </button>

       <button
className="
flex
items-center
gap-2
shrink-0

px-4
py-3

rounded-xl
bg-slate-100

lg:bg-transparent
"
>
          <Heart size={20}/>
          Favoritos
        </button>

      <button
className="
flex
items-center
gap-2
shrink-0

px-4
py-3

rounded-xl
bg-slate-100

lg:bg-transparent
"
>
          <MapPin size={20}/>
          Endereços
        </button>
<button
className="
flex
items-center
gap-2
shrink-0

px-4
py-3

rounded-xl
bg-slate-100

lg:bg-transparent
"
>
          <Shield size={20}/>
          Segurança
        </button>

        <button className="flex items-center gap-3 text-red-500">
          <LogOut size={20}/>
          Sair
        </button>

      </nav>

    </aside>
  );
}