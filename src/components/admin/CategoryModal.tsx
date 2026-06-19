import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryModal({
  open,
  onClose,
  onSuccess,
}: Props) {

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
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
        .from("categories")
        .insert({
          name,
          slug,
          icon,
          active: true,
        });

      if (error) throw error;

      setName("");
      setIcon("");

      onSuccess();
      onClose();

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao salvar categoria."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      px-4
    ">

      <div className="
        bg-white
        rounded-3xl
        p-8
        w-full
        max-w-md
      ">

        <h2 className="text-2xl font-bold mb-6">
          Nova Categoria
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nome da categoria"
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

          <input
            type="text"
            placeholder="Ícone (Headphones)"
            value={icon}
            onChange={(e) =>
              setIcon(e.target.value)
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
            "
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