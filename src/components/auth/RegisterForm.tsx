/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function RegisterForm() {

  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
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

    if (
      password !== confirmPassword
    ) {
      return alert(
        "As senhas não coincidem."
      );
    }

    try {

      setLoading(true);

      const {
        data,
        error,
      } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (error)
        throw error;

      if (data.user) {

        await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: fullName,
            email,
            phone,
            role: "customer",
          });

      }

      navigate("/");

    } catch (error: any) {

      alert(
        error.message
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
          Criar conta
        </h1>

        <p className="text-zinc-400 mt-3">
          Cadastre-se e acompanhe seus
          pedidos e favoritos.
        </p>

      </div>

      <form
        onSubmit={handleRegister}
        className="space-y-5"
      >

        <InputIcon
          icon={<User size={18}/>}
          placeholder="Nome completo"
          value={fullName}
          onChange={setFullName}
        />

        <InputIcon
          icon={<Mail size={18}/>}
          placeholder="Seu e-mail"
          value={email}
          onChange={setEmail}
        />

        <InputIcon
          icon={<Phone size={18}/>}
          placeholder="Telefone"
          value={phone}
          onChange={setPhone}
        />

        <InputIcon
          icon={<Lock size={18}/>}
          placeholder="Senha"
          value={password}
          type="password"
          onChange={setPassword}
        />

        <InputIcon
          icon={<Lock size={18}/>}
          placeholder="Confirmar senha"
          value={confirmPassword}
          type="password"
          onChange={setConfirmPassword}
        />

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
              Criando conta...
            </>
          ) : (
            "CRIAR CONTA"
          )}

        </button>

      </form>

    </div>

  );
}

function InputIcon({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: any) {

  return (

    <div className="relative">

      <div
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-zinc-500
      "
      >
        {icon}
      </div>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
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

  );

}