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

import { supabase } from "../lib/supabase";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {

      setLoading(true);

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {

        await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: name,
            email,
            role: "customer",
          });

      }

      alert(
        "Conta criada com sucesso!"
      );

      navigate("/login");

    } catch (error: any) {

      alert(
        error.message ||
        "Erro ao criar conta."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <section
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
    >

      <div
        className="
        w-full
        max-w-lg
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-10
        shadow-2xl
      "
      >

        <div className="mb-8">

          <p className="text-yellow-400 text-sm font-semibold">
            TECHTUDO CAMPINA
          </p>

          <h1
            className="
            text-4xl
            font-bold
            text-white
            mt-2
          "
          >
            Criar conta
          </h1>

          <p className="text-zinc-400 mt-3">
            Cadastre-se para acompanhar
            pedidos, favoritos e ofertas
            exclusivas.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div className="relative">

            <User
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
            />

            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
              className="
              w-full
              h-14
              bg-zinc-800
              border
              border-zinc-700
              rounded-2xl
              pl-12
              pr-4
              text-white
              outline-none
              focus:border-blue-500
            "
            />

          </div>

          <div className="relative">

            <Mail
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
            />

            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              className="
              w-full
              h-14
              bg-zinc-800
              border
              border-zinc-700
              rounded-2xl
              pl-12
              pr-4
              text-white
              outline-none
              focus:border-blue-500
            "
            />

          </div>

          <div className="relative">

            <Lock
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="
              w-full
              h-14
              bg-zinc-800
              border
              border-zinc-700
              rounded-2xl
              pl-12
              pr-4
              text-white
              outline-none
              focus:border-blue-500
            "
            />

          </div>

          <div className="relative">

            <Lock
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
            />

            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
              className="
              w-full
              h-14
              bg-zinc-800
              border
              border-zinc-700
              rounded-2xl
              pl-12
              pr-4
              text-white
              outline-none
              focus:border-blue-500
            "
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            h-14
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
            flex
            items-center
            justify-center
            gap-2
          "
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Criando conta...
              </>
            ) : (
              "CRIAR CONTA"
            )}

          </button>

        </form>

        <div className="mt-8 text-center">

          <span className="text-zinc-400">
            Já possui uma conta?
          </span>

          <Link
            to="/login"
            className="
            ml-2
            text-yellow-400
            hover:text-yellow-300
            font-medium
          "
          >
            Entrar
          </Link>

        </div>

      </div>

    </section>

  );
}