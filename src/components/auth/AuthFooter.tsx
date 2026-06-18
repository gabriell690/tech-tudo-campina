import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <footer
      className="
      bg-zinc-950
      border-t
      border-zinc-800
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-14
        "
      >
        <div
          className="
          grid
          md:grid-cols-4
          gap-10
          "
        >

          {/* Logo */}
          <div>

            <h2
              className="
              text-3xl
              font-black
              text-white
              "
            >
              TECHTUDO
            </h2>

            <p
              className="
              text-yellow-400
              font-medium
              "
            >
              CAMPINA
            </p>

            <p
              className="
              mt-5
              text-zinc-500
              leading-relaxed
              "
            >
              Tecnologia, informática e os
              melhores equipamentos para
              gamers, profissionais e
              entusiastas.
            </p>

          </div>

          {/* Institucional */}
          <div>

            <h3
              className="
              text-white
              font-semibold
              mb-5
              "
            >
              Institucional
            </h3>

            <div className="space-y-3 text-zinc-400">

              <Link
                to="/"
                className="block hover:text-yellow-400"
              >
                Página Inicial
              </Link>

              <Link
                to="/produtos"
                className="block hover:text-yellow-400"
              >
                Produtos
              </Link>

              <Link
                to="/contato"
                className="block hover:text-yellow-400"
              >
                Contato
              </Link>

            </div>

          </div>

          {/* Ajuda */}
          <div>

            <h3
              className="
              text-white
              font-semibold
              mb-5
              "
            >
              Ajuda
            </h3>

            <div className="space-y-3 text-zinc-400">

              <Link
                to="/termos"
                className="block hover:text-yellow-400"
              >
                Termos de Uso
              </Link>

              <Link
                to="/privacidade"
                className="block hover:text-yellow-400"
              >
                Política de Privacidade
              </Link>

              <Link
                to="/trocas"
                className="block hover:text-yellow-400"
              >
                Trocas e Garantia
              </Link>

            </div>

          </div>

          {/* Contato */}
          <div>

            <h3
              className="
              text-white
              font-semibold
              mb-5
              "
            >
              Atendimento
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p>(83) 98833-3856</p>

              <p>techtudocampina@gmail.com</p>

              <p>Campina Grande - PB</p>

            </div>

          </div>

        </div>

        <div
          className="
          border-t
          border-zinc-800
          mt-100
          pt-8
          text-center
          text-zinc-500
          "
        >
          © 2026 TechTudo Campina • Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}