/* eslint-disable react-hooks/immutability */
 

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Categories() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("categories")
          .select("id, name, slug")
          .eq("active", true)
          .order("name");

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 bg-slate-50">

      <div className="container mx-auto px-4">

        <div className="mb-10">

          <span
            className="
            text-blue-600
            font-semibold
            uppercase
            tracking-widest
            text-sm
            "
          >
            DEPARTAMENTOS
          </span>

          <h2
            className="
            text-4xl
            md:text-5xl
            font-black
            text-slate-900
            mt-2
            "
          >
            Explore a Loja
          </h2>

          <p
            className="
            text-slate-500
            mt-3
            "
          >
            Navegue pelas categorias disponíveis.
          </p>

        </div>

        {loading ? (

          <div className="text-slate-500">
            Carregando categorias...
          </div>

        ) : (

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
            "
          >

            {categories.map((category) => (

              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="
                group
                bg-white
                border
                border-slate-200
                rounded-3xl
                px-8
                py-7
                flex
                items-center
                justify-between
                transition-all
                duration-300
                hover:bg-[#071A35]
                hover:border-[#071A35]
                hover:shadow-xl
                "
              >

                <h3
                  className="
                  text-xl
                  font-bold
                  text-slate-900
                  group-hover:text-white
                  transition
                  "
                >
                  {category.name}
                </h3>

                <div
                  className="
                  w-11
                  h-11
                  rounded-full
                  bg-slate-100
                  flex
                  items-center
                  justify-center
                  group-hover:bg-yellow-400
                  transition
                  "
                >
                  <ChevronRight
                    size={18}
                    className="text-slate-900"
                  />
                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}
