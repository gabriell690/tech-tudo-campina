import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AuthNavbar() {
  return (
    <header
      className="
      border-b
      border-white/10
      backdrop-blur-md
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        h-20
        flex
        items-center
        justify-between
        "
      >
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div>
            <h1
              className="
              text-3xl
              font-black
              text-white
              "
            >
              TECHTUDO
            </h1>

            <p
              className="
              text-yellow-400
              text-sm
              font-medium
              "
            >
              CAMPINA
            </p>
          </div>
        </Link>

        <Link
          to="/"
          className="
          flex
          items-center
          gap-2
          px-5
          h-11
          rounded-xl
          border
          border-zinc-700
          text-zinc-300
          hover:border-blue-500
          hover:text-white
          transition
          "
        >
          <ArrowLeft size={18} />

          Voltar para Loja
        </Link>
      </div>
    </header>
  );
}