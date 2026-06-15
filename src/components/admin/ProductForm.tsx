/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";

import { saveProduct } from "../../services/productStorage";

export default function ProductForm() {
const navigate =
useNavigate();

const [name, setName] =
useState("");

const [brand, setBrand] =
useState("");

const [category, setCategory] =
useState("Smartphones");

const [stock, setStock] =
useState("");

const [price, setPrice] =
useState("");

const [image, setImage] =
useState("");

const [description, setDescription] =
useState("");

function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

const product = {
  id: crypto.randomUUID(),

  slug: name
    .toLowerCase()
    .replaceAll(" ", "-"),

  name,

  description,

  category,

  brand,

  stock: Number(stock),

  price: Number(price),

  image,

  active: true,

  featured: false,
};

saveProduct(product as any);

navigate(
  "/admin/products"
);

}

return ( <div className="flex"> <AdminSidebar />

  <main className="flex-1 bg-slate-100 min-h-screen p-8">
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold">
        Novo Produto
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="
          bg-white
          rounded-3xl
          p-8
          mt-8
        "
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="border rounded-2xl p-3"
          />

          <input
            placeholder="Marca"
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
            className="border rounded-2xl p-3"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="border rounded-2xl p-3"
          >
            <option>
              Smartphones
            </option>

            <option>
              Notebooks
            </option>

            <option>
              Games
            </option>

            <option>
              Acessórios
            </option>
          </select>

          <input
            placeholder="Estoque"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            className="border rounded-2xl p-3"
          />

          <input
            placeholder="Preço"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="border rounded-2xl p-3"
          />

          <input
            placeholder="Imagem URL"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            className="border rounded-2xl p-3"
          />
        </div>

        <textarea
          placeholder="Descrição"
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="
            mt-6
            border
            rounded-2xl
            p-3
            w-full
          "
          rows={6}
        />

        <button
          type="submit"
          className="
            mt-8
            bg-blue-600
            text-white
            px-8
            py-3
            rounded-2xl
          "
        >
          Salvar Produto
        </button>
      </form>
    </div>
  </main>
</div>

);
}
