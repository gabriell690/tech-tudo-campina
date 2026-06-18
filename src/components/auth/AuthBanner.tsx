import { Link } from "react-router-dom";

export default function AuthBanner() {
  return (
    <div
      className="
      hidden
      lg:flex
      flex-col
      justify-between
      rounded-3xl
      p-14
      text-white
      shadow-2xl

      bg-gradient-to-br
      from-blue-700
      via-blue-800
      to-slate-950
    "
    >

      <div>

        <div
          className="
          inline-flex
          px-4
          py-2
          rounded-full
          bg-yellow-400
          text-slate-900
          font-bold
          text-sm
        "
        >
          TECHTUDO CAMPINA
        </div>

        <h1
          className="
          mt-8
          text-5xl
          font-black
          leading-tight
        "
        >
          Tecnologia,
          <br />
          confiança e
          <br />
          desempenho.
        </h1>

        <p
          className="
          mt-8
          text-blue-100
          leading-relaxed
          max-w-md
        "
        >
          Faça login para acompanhar
          seus pedidos, favoritos e
          aproveitar ofertas exclusivas
          da TechTudo Campina.
        </p>

      </div>

      <div>

        <div
          className="
          h-px
          bg-blue-600
          mb-8
        "
        />

        <h2
          className="
          text-3xl
          font-bold
        "
        >
          Novo por aqui?
        </h2>

        <p
          className="
          mt-4
          text-blue-100
          leading-relaxed
        "
        >
          Crie sua conta gratuitamente
          e tenha acesso às melhores
          ofertas e acompanhamento dos
          seus pedidos.
        </p>

        <Link
          to="/register"
          className="
          mt-8
          inline-flex
          items-center
          justify-center
          px-10
          h-14
          rounded-2xl
          bg-yellow-400
          text-slate-900
          font-bold
          hover:bg-yellow-300
          transition
        "
        >
          CRIAR CONTA
        </Link>

      </div>

    </div>
  );
}