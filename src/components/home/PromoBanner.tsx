import Container from "../ui/Container";
import Button from "../ui/Button";

export default function PromoBanner() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-slate-900
            px-8
            py-16
            lg:px-16
          "
        >
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-blue-500/30
                  bg-blue-500/10
                  px-4
                  py-2
                  text-sm
                  text-blue-300
                  mb-6
                "
              >
                ⚡ OFERTA DA SEMANA
              </span>

              <h2
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  text-white
                  leading-tight
                "
              >
                Até 15% OFF
                <br />
                em Smartphones Premium
              </h2>

              <p className="mt-6 text-slate-300 text-lg max-w-lg">
                Aproveite descontos exclusivos em smartphones,
                acessórios e produtos tecnológicos selecionados.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button>
                  Comprar Agora
                </Button>

                <Button variant="secondary">
                  Ver Produtos
                </Button>
              </div>
            </div>

            {/* Card Destaque */}
            <div className="flex justify-center">
              <div
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-2xl
                  w-full
                  max-w-sm
                "
              >
                <div
                  className="
                    h-56
                    rounded-2xl
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  📱
                </div>

                <h3 className="font-bold text-xl mt-5">
                  iPhone 16 Pro Max
                </h3>

                <p className="text-slate-500 mt-2">
                  Tecnologia de última geração
                </p>

                <div className="mt-5">
                  <p className="text-slate-400 line-through">
                    R$ 8.999,90
                  </p>

                  <p className="text-3xl font-bold text-blue-600">
                    R$ 7.649,90
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}