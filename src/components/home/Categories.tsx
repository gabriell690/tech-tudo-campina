/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch,
  Monitor,
  Wifi,
  Shield,
  Tv,
  Package,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Category {
  name: string;
  count: number;
}

const icons: Record<string, any> = {
  Smartphones: Smartphone,
  Notebooks: Laptop,
  Fones: Headphones,
  Games: Gamepad2,
  Smartwatches: Watch,
  Informática: Monitor,
  Redes: Wifi,
  Segurança: Shield,
  "TV & Streaming": Tv,
  Acessórios: Package,
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("category")
      .eq("active", true);

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const grouped: Record<string, number> = {};

    data?.forEach((item) => {
      if (!item.category) return;

      grouped[item.category] = (grouped[item.category] || 0) + 1;
    });

    const result: Category[] = Object.entries(grouped).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    setCategories(result);
    setLoading(false);
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl font-bold text-slate-900">
          Explore por categoria
        </h2>

        <p className="text-gray-500 mt-2 mb-10">
          Encontre rapidamente os produtos ideais para seu setup, trabalho ou entretenimento.
        </p>

        {loading ? (
          <div className="text-gray-500">
            Carregando categorias...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {categories.map((category) => {
              const Icon = icons[category.name] || Package;

              return (
                <Link
                  key={category.name}
                  to={`/categoria/${encodeURIComponent(category.name)}`}
                  className="bg-white rounded-3xl border p-6 hover:shadow-xl transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6">
                    <Icon size={28} />
                  </div>

                  <h3 className="font-bold text-lg text-slate-900">
                    {category.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {category.count} produtos
                  </p>

                  <span className="text-blue-600 mt-6 inline-block font-medium">
                    Ver categoria →
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}