/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import {
  ShoppingCart,
} from "lucide-react";

import AdminLayout from "../layout/AdminLayout";

import { supabase } from "../../lib/supabase";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  status: string;
  created_at: string;
}

export default function AdminOrders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const { data } =
        await supabase
          .from("orders")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setOrders(data || []);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);

    loadOrders();
  }

 return (
  <AdminLayout>

    <div
        className="
          flex-1
          bg-slate-100
          min-h-screen
          p-8
        "
      >
        <div className="mb-8">
          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Pedidos
          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Gerencie os pedidos
            da loja.
          </p>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            border
            border-slate-200
          "
        >
          {loading ? (
            <div className="p-10">
              Carregando...
            </div>
          ) : orders.length === 0 ? (
            <div
              className="
                p-16
                text-center
              "
            >
              <ShoppingCart
                size={60}
                className="
                  mx-auto
                  text-slate-300
                "
              />

              <h3
                className="
                  text-xl
                  font-semibold
                  mt-4
                "
              >
                Nenhum pedido
              </h3>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr
                  className="
                    border-b
                    bg-slate-50
                  "
                >
                  <th className="p-4 text-left">
                    Cliente
                  </th>

                  <th className="p-4 text-left">
                    Telefone
                  </th>

                  <th className="p-4 text-left">
                    Total
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map(
                  (order) => (
                    <tr
                      key={order.id}
                      className="border-b"
                    >
                      <td className="p-4">
                        {
                          order.customer_name
                        }
                      </td>

                      <td className="p-4">
                        {
                          order.customer_phone
                        }
                      </td>

                      <td className="p-4">
                        R$ {Number(
                          order.total
                        ).toFixed(2)}
                      </td>

                      <td className="p-4">
                        <select
                          value={
                            order.status
                          }
                          onChange={(
                            e
                          ) =>
                            updateStatus(
                              order.id,
                              e.target
                                .value
                            )
                          }
                          className="
                            border
                            rounded-xl
                            px-3
                            py-2
                          "
                        >
                          <option value="novo">
                            Novo
                          </option>

                          <option value="em_atendimento">
                            Em atendimento
                          </option>

                          <option value="aguardando_pagamento">
                            Aguardando pagamento
                          </option>

                          <option value="concluido">
                            Concluído
                          </option>

                          <option value="cancelado">
                            Cancelado
                          </option>
                        </select>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

</AdminLayout>
  );
}