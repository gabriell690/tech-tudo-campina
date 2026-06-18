import { useState } from "react";
import type { Product } from "../../types/product";

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {

  const [tab, setTab] =
    useState("description");

  return (
    <section className="mt-16">

      <div
        className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        overflow-hidden
      "
      >

        {/* Tabs */}
        <div
          className="
          flex
          border-b
          border-slate-200
        "
        >

          <button
            onClick={() =>
              setTab("description")
            }
            className={`
              px-6
              py-5
              font-semibold
              ${
                tab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }
            `}
          >
            Descrição
          </button>

          <button
            onClick={() =>
              setTab("specs")
            }
            className={`
              px-6
              py-5
              font-semibold
              ${
                tab === "specs"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }
            `}
          >
            Especificações
          </button>

          <button
            onClick={() =>
              setTab("reviews")
            }
            className={`
              px-6
              py-5
              font-semibold
              ${
                tab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }
            `}
          >
            Avaliações
          </button>

        </div>

        <div className="p-8">

          {tab === "description" && (
            <div className="text-slate-600 leading-8">
              {product.description}
            </div>
          )}

          {tab === "specs" && (
            <div className="text-slate-600 leading-8">
              Em breve.
            </div>
          )}

          {tab === "reviews" && (
            <div className="text-slate-600 leading-8">
              ⭐⭐⭐⭐⭐ 5.0
            </div>
          )}

        </div>

      </div>

    </section>
  );
}