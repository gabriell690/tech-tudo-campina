/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
} from "lucide-react";

import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabase";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  old_price: number | null;
  stock: number;
  category: string;
  brand: string;
  image_url: string;
  featured: boolean;
  active: boolean;
};

export default function AdminProducts() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  async function loadProducts() {
    try {
      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(
    id: string
  ) {
    const confirmDelete =
      window.confirm(
        "Deseja realmente excluir este produto?"
      );

    if (!confirmDelete) return;

    try {
      const { error } =
        await supabase
          .from("products")
          .delete()
          .eq("id", id);

      if (error) throw error;

      setProducts((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao excluir produto."
      );
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          product.brand
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [products, search]);

  const totalStock =
    products.reduce(
      (acc, item) =>
        acc + (item.stock || 0),
      0
    );

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
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-8
          "
        >
          <div>
            <h1 className="text-4xl font-bold">
              Produtos
            </h1>

            <p className="text-slate-500 mt-2">
              Gerencie todos os
              produtos da loja.
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-2xl
              flex
              items-center
              gap-2
              w-fit
              transition
            "
          >
            <Plus size={18} />
            Novo Produto
          </Link>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mb-8
          "
        >
          <div
            className="
              bg-white
              rounded-3xl
              p-6
            "
          >
            <p className="text-slate-500">
              Total Produtos
            </p>

            <h3 className="text-4xl font-bold mt-2">
              {products.length}
            </h3>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
            "
          >
            <p className="text-slate-500">
              Produtos Ativos
            </p>

            <h3
              className="
                text-4xl
                font-bold
                mt-2
                text-green-600
              "
            >
              {
                products.filter(
                  (item) =>
                    item.active
                ).length
              }
            </h3>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
            "
          >
            <p className="text-slate-500">
              Estoque Total
            </p>

            <h3
              className="
                text-4xl
                font-bold
                mt-2
                text-blue-600
              "
            >
              {totalStock}
            </h3>
          </div>
        </div>

        {/* Busca */}
        <div
          className="
            bg-white
            rounded-3xl
            p-5
            mb-8
          "
        >
          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                pl-12
                pr-4
                py-3
              "
            />
          </div>
        </div>

        {/* Tabela */}
        <div
          className="
            bg-white
            rounded-3xl
            overflow-hidden
          "
        >
          {loading ? (
            <div className="p-12 text-center">
              Carregando...
            </div>
          ) : filteredProducts.length ===
            0 ? (
            <div
              className="
                p-16
                flex
                flex-col
                items-center
                gap-4
              "
            >
              <Package
                size={48}
                className="text-slate-300"
              />

              <p className="text-slate-500">
                Nenhum produto
                encontrado.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-5 text-left">
                    Produto
                  </th>

                  <th className="p-5 text-left">
                    Categoria
                  </th>

                  <th className="p-5 text-left">
                    Marca
                  </th>

                  <th className="p-5 text-left">
                    Preço
                  </th>

                  <th className="p-5 text-left">
                    Estoque
                  </th>

                  <th className="p-5 text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => (
                    <tr
                      key={product.id}
                      className="border-t"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product.image_url
                            }
                            alt={
                              product.name
                            }
                            className="
                              w-16
                              h-16
                              rounded-xl
                              object-cover
                            "
                          />

                          <div>
                            <h4 className="font-medium">
                              {
                                product.name
                              }
                            </h4>
                          </div>
                        </div>
                      </td>

                      <td className="p-5">
                        {
                          product.category
                        }
                      </td>

                      <td className="p-5">
                        {product.brand}
                      </td>

                      <td className="p-5 font-medium">
                        R$
                        {" "}
                        {Number(
                          product.price
                        ).toFixed(2)}
                      </td>

                      <td className="p-5">
                        {product.stock}
                      </td>

                      <td className="p-5">
                        <div className="flex justify-center gap-4">
                          <button
                            className="
                              text-blue-600
                              hover:text-blue-800
                            "
                          >
                            <Pencil
                              size={18}
                            />
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(
                                product.id
                              )
                            }
                            className="
                              text-red-600
                              hover:text-red-800
                            "
                          >
                            <Trash2
                              size={18}
                            />
                          </button>
                        </div>
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
