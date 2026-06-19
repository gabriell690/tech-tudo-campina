import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface Props {
  open: boolean;
  categoryId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubcategoryModal({
  open,
  categoryId,
  onClose,
  onSuccess,
}: Props) {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const slug = name
        .toLowerCase()
        .trim()
        .replaceAll(" ", "-");

      const { error } = await supabase
        .from("subcategories")
        .insert({
          name,
          slug,
          category_id: categoryId,
        });

      if (error) throw error;

      setName("");

      onSuccess();
      onClose();

    } catch (error) {

      console.error(error);
      alert("Erro ao salvar.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-3xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold mb-6">
          Nova Subcategoria
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nome da Subcategoria"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
            w-full
            border
            rounded-2xl
            p-4
            "
            required
          />

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="
              flex-1
              border
              rounded-2xl
              py-3
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              flex-1
              bg-orange-500
              hover:bg-orange-600
              text-white
              rounded-2xl
              py-3
              "
            >
              {loading
                ? "Salvando..."
                : "Salvar"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}