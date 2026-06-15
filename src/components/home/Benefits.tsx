import {
  Truck,
  ShieldCheck,
  CreditCard,
  Headset,
} from "lucide-react";

import Container from "../ui/Container";

const benefits = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description:
      "Receba seus produtos com agilidade e segurança.",
  },

  {
    icon: ShieldCheck,
    title: "Compra Segura",
    description:
      "Ambiente protegido para suas compras.",
  },

  {
    icon: CreditCard,
    title: "Parcelamento",
    description:
      "Até 12x nos principais cartões.",
  },

  {
    icon: Headset,
    title: "Suporte Especializado",
    description:
      "Equipe pronta para ajudar você.",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  bg-white
                  p-6
                  rounded-3xl
                  border
                  border-slate-200
                  hover:shadow-xl
                  transition
                "
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Icon size={28} />
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {benefit.title}
                </h3>

                <p className="text-slate-500 mt-2">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}