import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Dashboard() {
return ( <div className="flex"> <AdminSidebar />

  <main className="flex-1 bg-slate-100 min-h-screen p-8">
    <h1 className="text-4xl font-bold">
      Dashboard
    </h1>

    <p className="text-slate-500 mt-2">
      Visão geral da loja.
    </p>

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-slate-500">
          Produtos
        </h3>

        <p className="text-4xl font-bold mt-2">
          124
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-slate-500">
          Pedidos
        </h3>

        <p className="text-4xl font-bold mt-2">
          86
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-slate-500">
          Clientes
        </h3>

        <p className="text-4xl font-bold mt-2">
          342
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6">
        <h3 className="text-slate-500">
          Faturamento
        </h3>

        <p className="text-4xl font-bold mt-2">
          R$ 18k
        </p>
      </div>
    </div>
  </main>
</div>

);
}
