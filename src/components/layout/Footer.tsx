import {
MessageCircle,
Mail,
MapPin,
Phone,
} from "lucide-react";

import Container from "../ui/Container";

export default function Footer() {
return ( <footer className="bg-slate-950 text-white border-t border-slate-800"> <Container> <div className="py-20">
{/* Topo */} <div className="grid lg:grid-cols-5 gap-12">
{/* Empresa */} <div className="lg:col-span-2"> <div className="flex items-center gap-4"> <div
               className="
                 w-14
                 h-14
                 rounded-2xl
                 bg-gradient-to-br
                 from-blue-500
                 via-blue-600
                 to-blue-700
                 flex
                 items-center
                 justify-center
                 font-bold
                 text-xl
               "
             >
TT </div>

```
            <div>
              <h2 className="text-2xl font-bold">
                Tech Tudo Campina
              </h2>

              <p className="text-slate-400">
                Tecnologia Premium
              </p>
            </div>
          </div>

          <p className="mt-6 text-slate-400 leading-relaxed max-w-md">
            Smartphones, notebooks, acessórios,
            produtos gamer e tecnologia em geral
            com os melhores preços e atendimento
            especializado.
          </p>

          <div className="flex gap-3 mt-8">
           

            <button className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-blue-500 transition">
              <MessageCircle size={18} />
            </button>
          </div>
        </div>

        {/* Institucional */}
        <div>
          <h3 className="font-semibold text-lg mb-5">
            Institucional
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <button>Sobre Nós</button>
            </li>

            <li>
              <button>Contato</button>
            </li>

            <li>
              <button>Política de Privacidade</button>
            </li>

            <li>
              <button>Termos de Uso</button>
            </li>
          </ul>
        </div>

        {/* Categorias */}
        <div>
          <h3 className="font-semibold text-lg mb-5">
            Categorias
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>Smartphones</li>
            <li>Notebooks</li>
            <li>Games</li>
            <li>Smartwatches</li>
            <li>Acessórios</li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="font-semibold text-lg mb-5">
            Contato
          </h3>

          <div className="space-y-4 text-slate-400">
            <div className="flex gap-3">
              <MapPin size={18} />
              <span>
                Campina Grande - PB
              </span>
            </div>

            <div className="flex gap-3">
              <Phone size={18} />
              <span>
                (83) 99999-9999
              </span>
            </div>

            <div className="flex gap-3">
              <Mail size={18} />
              <span>
                contato@techtudo.com.br
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Linha */}
      <div className="h-px bg-slate-800 my-12" />

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © 2026 Tech Tudo Campina.
          Todos os direitos reservados.
        </p>

        <div className="flex gap-6 text-sm text-slate-500">
          <span>Pix</span>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Elo</span>
        </div>
      </div>
    </div>
  </Container>
</footer>
);
}
