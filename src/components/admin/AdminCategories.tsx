/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Tags,
  Power,
  PowerOff,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import { supabase } from "../../lib/supabase";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  banner_url: string;
  sort_order: number;
  active: boolean;
}

export default function AdminCategories() {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", {
        ascending: true,
      });

    if (!error) {
      setCategories(data || []);
    }

    setLoading(false);
  }

  async function createCategory() {
    if (!form.name || !form.slug) {
      alert("Preencha nome e slug.");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .insert({
        ...form,
        active: true,
      });

    if (error) {
      console.error(error);
      alert("Erro ao criar categoria.");
      return;
    }

    setForm({
      name: "",
      slug: "",
      icon: "",
    });

    loadCategories();
  }

  async function deleteCategory(id: string) {
    await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    loadCategories();
  }

  async function toggleCategory(category: Category) {
    await supabase
      .from("categories")
      .update({
        active: !category.active,
      })
      .eq("id", category.id);

    loadCategories();
  }

  return (
    <div className="flex">

     

      <main
        className="
          flex-1
          min-h-screen
          bg-slate-100
          p-8
        "
      >
        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Categorias
          </h1>

          <p className="text-slate-500 mt-2">
            Gerencie as categorias da loja.
          </p>

        </div>

        {/* Formulário */}
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-8
            mb-8
          "
        >
          <h2 className="text-xl font-semibold mb-6">
            Nova Categoria
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Nome"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

            <input
              type="text"
              placeholder="Slug"
              value={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

            <input
              type="text"
              placeholder="Ícone"
              value={form.icon}
              onChange={(e) =>
                setForm({
                  ...form,
                  icon: e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

          </div>

          <button
            onClick={createCategory}
            className="
              mt-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-4
              rounded-2xl
              flex
              items-center
              gap-2
            "
          >
            <Plus size={20} />
            Criar Categoria
          </button>
        </div>

        {/* Lista */}
        <div className="grid gap-6">

          {loading ? (
            <div>Carregando...</div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-slate-200
                  p-6
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="flex items-center gap-4">

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
                    <Tags
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {category.name}
                    </h3>

                    <p className="text-slate-500">
                      /{category.slug}
                    </p>

                    <p
                      className={`
                        text-sm mt-1
                        ${
                          category.active
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      `}
                    >
                      {category.active
                        ? "Ativa"
                        : "Inativa"}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      toggleCategory(category)
                    }
                    className="
                      px-4
                      py-3
                      rounded-2xl
                      bg-blue-600
                      text-white
                    "
                  >
                    {category.active ? (
                      <PowerOff size={18} />
                    ) : (
                      <Power size={18} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      deleteCategory(category.id)
                    }
                    className="
                      px-4
                      py-3
                      rounded-2xl
                      bg-red-500
                      text-white
                    "
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  );
}