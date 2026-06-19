import type { Category } from "../../types/category";

interface Props {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  onAddSubcategory: () => void;
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  onAddSubcategory,
}: Props) {

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-sm
      p-6
      "
    >

      <h2 className="text-xl font-bold">
        {category.name}
      </h2>

      <p className="text-sm text-slate-400 mt-1">
        {category.slug}
      </p>

      <div className="mt-5 space-y-2">

        {category.subcategories.map((sub) => (

          <div
            key={sub.id}
            className="
            text-slate-500
            text-sm
            "
          >
            • {sub.name}
          </div>

        ))}

      </div>

      <button
        onClick={onAddSubcategory}
        className="
        mt-6
        text-orange-500
        font-medium
        "
      >
        + Nova Subcategoria
      </button>

      <div className="flex gap-3 mt-6">

        <button
          onClick={onEdit}
          className="
          flex-1
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2
          rounded-xl
          "
        >
          Editar
        </button>

        <button
          onClick={onDelete}
          className="
          flex-1
          bg-red-500
          hover:bg-red-600
          text-white
          py-2
          rounded-xl
          "
        >
          Excluir
        </button>

      </div>

    </div>

  );

}