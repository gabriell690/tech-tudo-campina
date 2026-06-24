/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { supabase } from "../../lib/supabase";

export default function ProductForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

 const [categoryId, setCategoryId] =
  useState("");
const [subcategoryId, setSubcategoryId] =
  useState("");
const { categories } = useCategories();

  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

 const [imageFiles, setImageFiles] =
  useState<File[]>([]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

    const imageUrls: string[] = [];

for (const file of imageFiles) {

  const fileName =
    `${Date.now()}-${Math.random()}-${file.name}`;

  const {
    error: uploadError
  } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (uploadError)
    throw uploadError;

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(fileName);

  imageUrls.push(data.publicUrl);
}

      const slug = name
        .toLowerCase()
        .trim()
        .replaceAll(" ", "-");

      const { error } =
        await supabase
          .from("products")
          .insert({
            name,
            slug,
            description,

            price: Number(price),

            old_price: oldPrice
              ? Number(oldPrice)
              : null,

            stock: Number(stock),

            category_id: categoryId,
subcategory_id: subcategoryId,
            brand,

           image_url: imageUrls[0],
images: imageUrls,

            featured,
            active,
          });

      if (error) {
        throw error;
      }

      alert(
        "Produto cadastrado com sucesso!"
      );

      navigate("/admin/products");
    } catch (error: any) {
  console.error(error);

  alert(error.message);
} finally {
      setLoading(false);
    }
  }
const selectedCategory =
  categories.find(
    category => category.id === categoryId
  );

const subcategories =
  selectedCategory?.subcategories ?? [];

  return (
    <div className="flex">
      <AdminSidebar />

      <main
        className="
          flex-1
          bg-slate-100
          min-h-screen
          p-8
        "
      >
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold">
            Novo Produto
          </h1>

          <form
            onSubmit={handleSubmit}
            className="
              bg-white
              rounded-3xl
              p-8
              mt-8
              shadow-sm
            "
          >
            <div
              className="
                grid
                md:grid-cols-2
                gap-6
              "
            >
              <input
                placeholder="Nome do Produto"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                  border
                  rounded-2xl
                  p-3
                "
                required
              />

              <input
                placeholder="Marca"
                value={brand}
                onChange={(e) =>
                  setBrand(
                    e.target.value
                  )
                }
                className="
                  border
                  rounded-2xl
                  p-3
                "
                required
              />

              <select
  value={categoryId}
  onChange={(e) => {
    setCategoryId(e.target.value);
    setSubcategoryId("");
  }}
  className="border rounded-2xl p-3"
>

  <option value="">
    Selecione uma categoria
  </option>

  {categories.map(category => (

    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>

  ))}

</select>
<select
  value={subcategoryId}
  onChange={(e) =>
    setSubcategoryId(
      e.target.value
    )
  }
  className="border rounded-2xl p-3"
>

  <option value="">
    Selecione uma subcategoria
  </option>

  {subcategories.map(sub => (

    <option
      key={sub.id}
      value={sub.id}
    >
      {sub.name}
    </option>

  ))}

</select>

              <input
                type="number"
                placeholder="Estoque"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
                className="
                  border
                  rounded-2xl
                  p-3
                "
                required
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                className="
                  border
                  rounded-2xl
                  p-3
                "
                required
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço Antigo"
                value={oldPrice}
                onChange={(e) =>
                  setOldPrice(
                    e.target.value
                  )
                }
                className="
                  border
                  rounded-2xl
                  p-3
                "
              />

              <div className="md:col-span-2">
                <label
                  className="
                    block
                    mb-2
                    font-medium
                  "
                >
                  Imagem do Produto
                </label>

               <input
  type="file"
  multiple
  accept="
    image/png,
    image/jpeg,
    image/jpg,
    image/webp
  "
  onChange={(e) =>
    setImageFiles(
      Array.from(e.target.files || []).slice(0, 5)
    )
  }
  className="
    border
    rounded-2xl
    p-3
    w-full
  "
  required
/>
              </div>
            </div>

            <textarea
              placeholder="Descrição do Produto"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                mt-6
                border
                rounded-2xl
                p-4
                w-full
              "
              rows={6}
              required
            />

            <div
              className="
                mt-6
                flex
                gap-8
              "
            >
              <label
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) =>
                    setFeatured(
                      e.target.checked
                    )
                  }
                />

                Destaque
              </label>

              <label
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) =>
                    setActive(
                      e.target.checked
                    )
                  }
                />

                Ativo
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                mt-8
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-3
                rounded-2xl
                font-medium
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Salvando..."
                : "Salvar Produto"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
