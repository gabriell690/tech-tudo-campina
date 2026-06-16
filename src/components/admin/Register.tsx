/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { supabase } from "../../lib/supabase";

export default function Register() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "As senhas não coincidem."
      );
      return;
    }

    try {
      setLoading(true);

      const {
        error,
      } = await supabase.auth.signUp({
        email,
        password,

        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw error;
      }

      alert(
        "Administrador criado com sucesso!"
      );

      navigate(
        "/admin/login"
      );
    } catch (error: any) {
      alert(
        error.message ||
          "Erro ao criar administrador."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        min-h-screen
       bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-slate-900
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
         rounded-[32px]
          p-8
          shadow-2xl
        "
      >
        <div className="text-center">

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-gradient-to-br
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
            TT
          </div>

          <h1
            className="
              text-3xl
              font-bold
              mt-5
            "
          >
            Criar Administrador
          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Cadastre um novo
            administrador para
            a loja.
          </p>

        </div>

        <form
          onSubmit={
            handleRegister
          }
          className="mt-8"
        >

          {/* Nome */}
          <div className="mb-5">

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Nome
            </label>

            <div className="relative">

              <User
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
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Administrador"
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
                required
              />

            </div>
          </div>

          {/* Email */}
          <div className="mb-5">

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
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
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
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
                required
              />

            </div>
          </div>

          {/* Senha */}
          <div className="mb-5">

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
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
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
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
                required
              />

            </div>
          </div>

          {/* Confirmar Senha */}
          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Confirmar Senha
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
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
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
                required
              />

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
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
              items-center
              gap-2
              transition
              disabled:opacity-50
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Criando...
              </>
            ) : (
              "Criar Administrador"
            )}
          </button>

          <Link
            to="/admin/login"
            className="
              block
              text-center
              mt-5
              text-blue-600
              hover:text-blue-700
              font-medium
            "
          >
            Já possui acesso?
            Entrar
          </Link>

        </form>
      </div>
    </section>
  );
}
