
import { useEffect, useState } from "react";

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";

import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [productsCount, setProductsCount] =
    useState(0);

  const [activeProducts, setActiveProducts] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  const [stockTotal, setStockTotal] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const {
        count: products,
      } = await supabase
        .from("products")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        count: active,
      } = await supabase
        .from("products")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("active", true);

      const {
        count: orders,
      } = await supabase
        .from("orders")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        data: stockData,
      } = await supabase
        .from("products")
        .select("stock");

      const totalStock =
        stockData?.reduce(
          (acc, item) =>
            acc + (item.stock || 0),
          0
        ) || 0;

      setProductsCount(
        products || 0
      );

      setActiveProducts(
        active || 0
      );

      setOrdersCount(
        orders || 0
      );

      setStockTotal(
        totalStock
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title:
        "Produtos",
      value:
        productsCount,
      icon:
        Package,
    },
    {
      title:
        "Produtos Ativos",
      value:
        activeProducts,
      icon:
        Package,
    },
    {
      title:
        "Pedidos",
      value:
        ordersCount,
      icon:
        ShoppingCart,
    },
    {
      title:
        "Estoque Total",
      value:
        stockTotal,
      icon:
        Users,
    },
  ];

   if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 flex items-center justify-center min-h-screen">
          <p className="text-xl">
            Carregando dashboard...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Visão geral da loja.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                  border
                  border-slate-200
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">
                      {card.title}
                    </p>

                    <h3 className="text-4xl font-bold mt-3">
                      {card.value}
                    </h3>
                  </div>

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      size={28}
                      className="text-blue-600"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="
            mt-10
            bg-white
            rounded-3xl
            p-8
            border
            border-slate-200
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            Resumo
          </h2>

          <p className="text-slate-600">
            O painel já está conectado ao Supabase.
            Os indicadores são carregados em tempo real.
          </p>
        </div>
      </main>
    </div>
  );
}
