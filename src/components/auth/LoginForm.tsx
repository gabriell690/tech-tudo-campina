/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { supabase } from "../../lib/supabase";

export default function LoginForm() {

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      await signIn(
        email,
        password
      );
const { data: userData } =
  await supabase.auth.getUser();

if (userData.user) {

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .single();

  if (profile?.role === "admin") {

    navigate("/admin");

  } else {

    navigate("/");

  }

}
      navigate("/");

    } catch (error: any) {

      alert(
        error.message ||
          "Erro ao realizar login."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-3xl
      p-10
      shadow-2xl
    "
    >

      <div className="mb-8">

        <p className="text-yellow-400 text-sm font-medium">
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
          Acesse sua conta
        </h1>

        <p className="text-zinc-400 mt-3">
          Entre para continuar comprando
          e acompanhar seus pedidos.
        </p>

      </div>

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

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
            placeholder="Sua senha"
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

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="
            text-sm
            text-zinc-400
            hover:text-yellow-400
            transition
          "
          >
            Esqueceu sua senha?
          </Link>

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
          justify-center
          items-center
          gap-2
        "
        >

          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Entrando...
            </>
          ) : (
            "ENTRAR"
          )}

        </button>

      </form>

      <div
        className="
        flex
        items-center
        gap-4
        my-8
      "
      >

        <div className="flex-1 h-px bg-zinc-800"/>

        <span className="text-zinc-500 text-sm">
          ou continue com
        </span>

        <div className="flex-1 h-px bg-zinc-800"/>

      </div>

      <SocialLogin />
      <div className="mt-8 lg:hidden">

  <div className="border-t border-zinc-800 pt-8">

    <h3
      className="
      text-center
      text-white
      font-semibold
      text-xl
    "
    >
      Novo por aqui?
    </h3>

    <p
      className="
      text-center
      text-zinc-400
      mt-3
      mb-6
    "
    >
      Crie sua conta gratuitamente
      e aproveite todas as vantagens
      da TechTudo Campina.
    </p>

    <Link
      to="/register"
      className="
      h-14
      rounded-2xl
      bg-yellow-400
      hover:bg-yellow-300
      text-slate-900
      font-bold
      flex
      items-center
      justify-center
      transition
    "
    >
      CRIAR CONTA
    </Link>

  </div>

</div>

    </div>

  );
}