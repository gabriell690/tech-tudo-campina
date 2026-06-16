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
  ArrowRight,
} from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const categories = [
  {
    title: "Smartphones",
    count: 128,
    icon: Smartphone,
  },
  {
    title: "Notebooks",
    count: 74,
    icon: Laptop,
  },
  {
    title: "Fones",
    count: 95,
    icon: Headphones,
  },
  {
    title: "Games",
    count: 53,
    icon: Gamepad2,
  },
  {
    title: "Smartwatches",
    count: 67,
    icon: Watch,
  },
  {
    title: "Informática",
    count: 112,
    icon: Monitor,
  },
  {
    title: "Redes",
    count: 41,
    icon: Wifi,
  },
  {
    title: "Segurança",
    count: 38,
    icon: Shield,
  },
  {
    title: "TV & Streaming",
    count: 59,
    icon: Tv,
  },
  {
    title: "Acessórios",
    count: 184,
    icon: Headphones,
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-linear-to-b from-white to-slate-50">
      <Container>
        <SectionTitle
          title="Explore por categoria"
          subtitle="Encontre rapidamente os produtos ideais para seu setup, trabalho ou entretenimento."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-500
                  hover:shadow-2xl
                  cursor-pointer
                "
              >
                {/* Glow */}
                <div
                  className="
                    absolute
                    -top-10
                    -right-10
                    w-28
                    h-28
                    rounded-full
                    bg-blue-500/10
                    blur-2xl
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                />

                {/* Ícone */}
                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-linear-to-br
                    from-blue-500
                    to-blue-700
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    mb-6
                  "
                >
                  <Icon size={30} />
                </div>

                {/* Conteúdo */}
                <h3 className="font-bold text-lg text-slate-900">
                  {category.title}
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  {category.count} produtos
                </p>

                {/* Link */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-5
                    text-blue-600
                    font-medium
                    text-sm
                  "
                >
                  Ver categoria

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}