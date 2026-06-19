/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";

import {
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import AdminLayout from "../layout/AdminLayout";

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
      title: "Produtos",
      value: productsCount,
      icon: Package,
    },
    {
      title: "Ativos",
      value: activeProducts,
      icon: Package,
    },
    {
      title: "Pedidos",
      value: ordersCount,
      icon: ShoppingCart,
    },
    {
      title: "Estoque",
      value: stockTotal,
      icon: Users,
    },
  ];

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex items-center justify-center min-h-100">
          <p className="text-lg font-medium">
            Carregando dashboard...
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1
              className="
                text-2xl
                lg:text-4xl
                font-bold
                text-slate-900
              "
            >
              Dashboard
            </h1>

            <p
              className="
                text-slate-500
                mt-2
              "
            >
              Visão geral da loja.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-2
              xl:grid-cols-4
              gap-4
              lg:gap-6
            "
          >
            {cards.map((card) => {
              const Icon =
                card.icon;

              return (
                <div
                  key={card.title}
                  className="
                    bg-white
                    rounded-3xl
                    p-4
                    lg:p-6
                    shadow-sm
                    border
                    border-slate-200
                  "
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="
                          text-xs
                          lg:text-sm
                          text-slate-500
                        "
                      >
                        {card.title}
                      </p>

                      <h3
                        className="
                          text-2xl
                          lg:text-4xl
                          font-bold
                          mt-3
                        "
                      >
                        {card.value}
                      </h3>
                    </div>

                    <div
                      className="
                        w-10
                        h-10
                        lg:w-14
                        lg:h-14
                        rounded-2xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon
                        size={22}
                        className="
                          text-blue-600
                        "
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="
              mt-6
              lg:mt-10
              bg-white
              rounded-3xl
              p-5
              lg:p-8
              border
              border-slate-200
            "
          >
            <h2
              className="
                text-xl
                lg:text-2xl
                font-bold
                mb-4
              "
            >
              Resumo
            </h2>

            <p className="text-slate-600">
              O painel está conectado ao
              Supabase e os indicadores
              são carregados em tempo real.
            </p>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
