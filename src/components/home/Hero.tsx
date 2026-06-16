import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  Laptop,
  Headphones,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-linear-to-br
        from-slate-950
        via-blue-950
        to-slate-900
        pt-32
        pb-24
      "
    >
      {/* Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        {/* Lado esquerdo */}
        <div>
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-blue-500/30
              bg-blue-500/10
              text-blue-300
              text-sm
              mb-8
            "
          >
            ⚡ Tecnologia com os melhores preços
          </div>

          {/* Título */}
          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-white
              leading-tight
            "
          >
            Tecnologia para
            <br />
            o seu próximo
            <span className="block text-blue-500">
              nível.
            </span>
          </h1>

          {/* Texto */}
          <p
            className="
              mt-8
              text-lg
              text-slate-300
              leading-relaxed
              max-w-xl
            "
          >
            Smartphones, notebooks, acessórios,
            produtos gamer e muito mais.
            Tudo em um só lugar.
          </p>

          {/* Botões */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/produtos"
              className="
                inline-flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                transition-all
              "
            >
              Comprar Agora
              <ArrowRight size={20} />
            </a>

            <a
              href="/produtos"
              className="
                inline-flex
                items-center
                border
                border-blue-600
                text-blue-400
                hover:bg-blue-600/10
                px-8
                py-4
                rounded-xl
                font-semibold
                transition-all
              "
            >
              Ver Ofertas
            </a>
          </div>

          {/* Benefícios */}
          <div
            className="
              flex
              flex-wrap
              gap-8
              mt-12
              text-slate-300
            "
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>Compra Segura</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck size={18} />
              <span>Entrega Rápida</span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard size={18} />
              <span>Até 12x</span>
            </div>
          </div>
        </div>

        {/* Lado direito */}
        <div className="relative h-125 hidden lg:block">
          {/* Smartphone */}
          <div
            className="
              absolute
              top-0
              left-12
              w-64
              bg-white
              rounded-3xl
              p-4
              shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            <div
              className="
                h-48
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
              "
            >
              <Smartphone
                size={100}
                className="text-slate-700"
              />
            </div>

            <h3 className="font-bold text-slate-900 mt-4">
              Smartphones Premium
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Últimos lançamentos
            </p>
          </div>

          {/* Notebook */}
          <div
            className="
              absolute
              top-32
              right-0
              w-72
              bg-white
              rounded-3xl
              p-4
              shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            <div
              className="
                h-48
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
              "
            >
              <Laptop
                size={100}
                className="text-slate-700"
              />
            </div>

            <h3 className="font-bold text-slate-900 mt-4">
              Notebooks e Informática
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Performance profissional
            </p>
          </div>

          {/* Acessórios */}
          <div
            className="
              absolute
              bottom-0
              left-28
              w-56
              bg-white
              rounded-3xl
              p-4
              shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            <div
              className="
                h-36
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
              "
            >
              <Headphones
                size={80}
                className="text-slate-700"
              />
            </div>

            <h3 className="font-bold text-slate-900 mt-4">
              Acessórios
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Equipamentos de qualidade
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
