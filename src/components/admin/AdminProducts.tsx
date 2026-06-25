/* eslint-disable react-hooks/set-state-in-effect */
 

import { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  Star,
  Boxes,
  CheckCircle,
} from "lucide-react";

import AdminLayout from "../layout/AdminLayout";

import { supabase } from "../../lib/supabase";

type Product = {
  id: string;

  name: string;

  slug: string;

  description?: string;

  brand: string;

  category: string | null;

  category_id: string | null;

  subcategory_id: string | null;

  price: number;

  old_price: number | null;

  stock: number;

  image_url: string;

  featured: boolean;

  active: boolean;

  created_at?: string;
};

export default function AdminProducts() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] =
    useState("");

  async function loadProducts() {

    setLoading(true);

    const { data, error } =
      await supabase

        .from("products")

        .select("*")

        .order("created_at", {
          ascending: false,
        });

    if (error) {

      console.error(error);

    } else {

      setProducts(data || []);

    }

    setLoading(false);

  }

  async function deleteProduct(
    id: string
  ) {

    const confirmDelete =
      window.confirm(
        "Deseja excluir este produto?"
      );

    if (!confirmDelete) return;

    const { error } =
      await supabase

        .from("products")

        .delete()

        .eq("id", id);

    if (error) {

      alert("Erro ao excluir.");

      return;

    }

    loadProducts();

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
            )

          ||

          product.brand
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          (product.category || "")
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

      );

    }, [products, search]);

  const stats = {

    total:

      products.length,

    active:

      products.filter(

        item => item.active

      ).length,

    featured:

      products.filter(

        item => item.featured

      ).length,

    stock:

      products.reduce(

        (acc, item) =>

          acc + item.stock,

        0

      ),

  };
  return (
  <AdminLayout>

  <div className="flex-1 min-h-screen bg-slate-100 p-8">

    {/* Cabeçalho */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">

          Produtos

        </h1>

        <p className="text-slate-500 mt-2">

          Gerencie todos os produtos cadastrados.

        </p>

      </div>

      <Link
        to="/admin/products/new"
        className="
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-6
          py-3
          rounded-xl
          flex
          items-center
          gap-2
          font-medium
          transition
          shadow-sm
        "
      >

        <Plus size={18} />

        Novo Produto

      </Link>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Produtos

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {stats.total}

            </h2>

          </div>

          <Package
            className="text-orange-500"
            size={34}
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Ativos

            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">

              {stats.active}

            </h2>

          </div>

          <CheckCircle
            className="text-green-600"
            size={34}
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Destaques

            </p>

            <h2 className="text-4xl font-bold text-amber-500 mt-2">

              {stats.featured}

            </h2>

          </div>

          <Star
            className="text-amber-500"
            size={34}
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Estoque

            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">

              {stats.stock}

            </h2>

          </div>

          <Boxes
            className="text-blue-600"
            size={34}
          />

        </div>

      </div>

    </div>

    {/* Busca */}

    <div className="bg-white rounded-2xl p-5 mt-8 shadow-sm">

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
          placeholder="Buscar por nome, marca ou categoria..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            pl-12
            pr-4
            py-3
            outline-none
            focus:border-orange-500
          "
        />

      </div>

    </div>
        {/* Tabela */}

    <div
      className="
        mt-8
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
      "
    >

      {loading ? (

        <div className="p-12 text-center">

          Carregando produtos...

        </div>

      ) : filteredProducts.length === 0 ? (

        <div
          className="
            flex
            flex-col
            items-center
            gap-4
            p-16
          "
        >

          <Package
            size={56}
            className="text-slate-300"
          />

          <p className="text-slate-500">

            Nenhum produto encontrado.

          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-sm text-slate-600">

                <th className="p-4 text-left">

                  Produto

                </th>

                <th className="p-4 text-left">

                  Categoria

                </th>

                <th className="p-4 text-left">

                  Marca

                </th>

                <th className="p-4 text-left">

                  Preço

                </th>

                <th className="p-4 text-center">

                  Estoque

                </th>

                <th className="p-4 text-center">

                  Status

                </th>

                <th className="p-4 text-center">

                  Destaque

                </th>

                <th className="p-4 text-center">

                  Ações

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="
                    border-t
                    hover:bg-slate-50
                    transition
                  "
                >

                  <td className="p-4">

                    <div className="flex items-center gap-4">

                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="
                          h-16
                          w-16
                          rounded-xl
                          border
                          object-cover
                        "
                      />

                      <div>

                        <h3 className="font-medium">

                          {product.name}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {product.slug}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">

                    {product.category || "-"}

                  </td>

                  <td className="p-4">

                    {product.brand}

                  </td>

                  <td className="p-4 font-semibold">

                    R$

                    {" "}

                    {Number(product.price).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}

                  </td>

                  <td className="text-center">

                    {product.stock}

                  </td>

                  <td className="text-center">

                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          product.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >

                      {product.active
                        ? "Ativo"
                        : "Inativo"}

                    </span>

                  </td>

                  <td className="text-center">

                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          product.featured
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >

                      {product.featured
                        ? "Sim"
                        : "Não"}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/products/edit/${product.id}`
                          )
                        }
                        className="
                          rounded-lg
                          p-2
                          text-blue-600
                          transition
                          hover:bg-blue-50
                        "
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="
                          rounded-lg
                          p-2
                          text-red-600
                          transition
                          hover:bg-red-50
                        "
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  </div>

</AdminLayout>

);
}