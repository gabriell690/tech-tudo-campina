import Container from "../ui/Container";
import Button from "../ui/Button";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-175 py-20">
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-8">
              ⚡ Tecnologia com os melhores preços
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Tecnologia para o
              <span className="text-blue-400"> seu próximo nível.</span>
            </h1>

            <p className="text-slate-300 text-lg mt-8 max-w-xl leading-relaxed">
              Smartphones, notebooks, acessórios, produtos gamer
              e muito mais. Tudo em um só lugar.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/produtos">
  <Button>
    Comprar Agora
  </Button>
</Link>

              <Button variant="secondary">
                Ver Ofertas
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <div className="flex items-center gap-3 text-slate-300">
                <ShieldCheck size={22} />
                <span className="text-sm">Compra Segura</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Truck size={22} />
                <span className="text-sm">Entrega Rápida</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <CreditCard size={22} />
                <span className="text-sm">Até 12x</span>
              </div>
            </div>
          </div>

          {/* Produtos Flutuantes */}
          <div className="relative h-137.5 hidden lg:block">
            {/* Card 1 */}
            <div className="absolute top-0 left-0 bg-white rounded-3xl p-5 shadow-2xl w-64">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                alt="Smartphone"
                className="rounded-2xl h-44 w-full object-cover"
              />

              <h3 className="font-bold mt-4">
                Smartphones Premium
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Últimos lançamentos
              </p>
            </div>

            {/* Card 2 */}
            <div className="absolute top-40 right-0 bg-white rounded-3xl p-5 shadow-2xl w-72">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                alt="Notebook"
                className="rounded-2xl h-44 w-full object-cover"
              />

              <h3 className="font-bold mt-4">
                Notebooks e Informática
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Performance profissional
              </p>
            </div>

            {/* Card 3 */}
            <div className="absolute bottom-0 left-16 bg-white rounded-3xl p-5 shadow-2xl w-64">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b"
                alt="Headset Gamer"
                className="rounded-2xl h-44 w-full object-cover"
              />

              <h3 className="font-bold mt-4">
                Setup Gamer
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Equipamentos de alta qualidade
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}