import { useAuth } from "../../hooks/useAuth";

export default function AccountOverview() {
  const {
    user,
    profile,
  } = useAuth();

  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-8
      shadow-sm
      "
    >

      <h1 className="text-3xl font-bold mb-8">
        Bem-vindo, {profile?.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Nome
          </p>

          <p className="font-semibold">
            {profile?.name || "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Email
          </p>

          <p className="font-semibold">
            {user?.email || "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Telefone
          </p>

          <p className="font-semibold">
            {profile?.phone || "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            CPF
          </p>

          <p className="font-semibold">
            {profile?.cpf || "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Data de nascimento
          </p>

          <p className="font-semibold">
            {profile?.birth_date || "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Tipo de conta
          </p>

          <p className="font-semibold capitalize">
            {profile?.role}
          </p>
        </div>

      </div>

    </div>
  );
}