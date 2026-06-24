 
import { useState } from "react";

import AdminLayout from "../layout/AdminLayout";
import CategoryCard from "../../components/admin/CategoryCard";
import CategoryModal from "../../components/admin/CategoryModal";
import SubcategoryModal from "../../components/admin/SubcategoryModal";
import { supabase } from "../../lib/supabase";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types/category";

export default function AdminCategories() {

  const { categories } = useCategories();

  const [openCategoryModal, setOpenCategoryModal] =
    useState(false);

  const [openSubcategoryModal, setOpenSubcategoryModal] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

    const [editingCategory, setEditingCategory] =
  useState<Category | null>(null);
  
  return (

      <AdminLayout>
<main
  className="
  flex-1
  bg-slate-100
  min-h-screen
  overflow-x-hidden
  p-4
  md:p-8
  "
>
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Topo */}
          <div
            className="
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-5
            "
          >

            <div>

             <h1 className="text-3xl md:text-4xl font-bold">
                Categorias
              </h1>

              <p className="text-slate-500 mt-2">
                Gerencie categorias e subcategorias da loja.
              </p>

            </div>

            <button
              onClick={() =>
                setOpenCategoryModal(true)
              }
              className="
w-full
md:w-auto
bg-orange-500
hover:bg-orange-600
text-white
px-6
py-3
rounded-2xl
font-medium
"
            >
              Nova Categoria
            </button>

          </div>

          {/* Cards */}
          <div
            className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            "
          >

            {categories.map((category) => (

              <CategoryCard
                key={category.id}
                category={category}

               onEdit={() => {
  setEditingCategory(category);
  setOpenCategoryModal(true);
}}

onDelete={async () => {

  const confirmDelete = confirm(
    `Deseja excluir ${category.name}?`
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", category.id);

  if (error) {
    alert(error.message);
    return;
  }

  window.location.reload();
}}

                onAddSubcategory={() => {

                  setSelectedCategory(category);

                  setOpenSubcategoryModal(true);

                }}
              />

            ))}

          </div>

        </div>

      </main>

     <CategoryModal
  open={openCategoryModal}
  category={editingCategory}
  onClose={() => {
    setOpenCategoryModal(false);
    setEditingCategory(null);
  }}
  onSuccess={() =>
    window.location.reload()
  }
/>

      {selectedCategory && (

        <SubcategoryModal
          open={openSubcategoryModal}
          categoryId={selectedCategory.id}
          onClose={() =>
            setOpenSubcategoryModal(false)
          }
          onSuccess={() =>
            window.location.reload()
          }
        />

      )}

   
    </AdminLayout>

  );

}