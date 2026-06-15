import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
return ( <section
   className="
     min-h-screen
     bg-linear-to-br
     from-slate-950
     via-blue-950
     to-slate-900
     flex
     items-center
     justify-center
     p-6
   "
 > <div
     className="
       w-full
       max-w-md
       bg-white
       rounded-4xl
       p-8
       shadow-2xl
     "
   > <div className="text-center"> <div
         className="
           w-16
           h-16
           mx-auto
           rounded-2xl
           bg-linear-to-br
           from-blue-500
           to-blue-700
           flex
           items-center
           justify-center
           text-white
           font-bold
           text-2xl
         "
       >
TT </div>


      <h1 className="text-3xl font-bold mt-5">
        Painel Admin
      </h1>

      <p className="text-slate-500 mt-2">
        Entre para gerenciar sua loja.
      </p>
    </div>

    <form className="mt-8">
      <div className="mb-5">
        <label className="block mb-2 font-medium">
          E-mail
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="email"
            placeholder="admin@techtudo.com"
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              pl-11
              pr-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Senha
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="password"
            placeholder="********"
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              pl-11
              pr-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />
        </div>
      </div>

      <Link
        to="/admin"
        className="
          mt-8
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-4
          rounded-2xl
          font-medium
          flex
          justify-center
          transition
        "
      >
        Entrar
      </Link>
    </form>
  </div>
</section>

);
}
