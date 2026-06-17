/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";

import { Save } from "lucide-react";

import AdminLayout from "../layout/AdminLayout";

import { supabase } from "../../lib/supabase";

interface Settings {
  id: string;
  store_name: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  address: string;
}

export default function AdminSettings() {
  const [settings, setSettings] =
    useState<Settings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const { data } =
        await supabase
          .from("settings")
          .select("*")
          .limit(1)
          .single();

      if (data) {
        setSettings(data);
      }
    } catch {
      console.log(
        "Nenhuma configuração encontrada."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    if (!settings) return;

    try {
      setSaving(true);

      const { error } =
        await supabase
          .from("settings")
          .upsert(settings);

      if (error) {
        throw error;
      }

      alert(
        "Configurações salvas com sucesso!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao salvar configurações."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Carregando...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout>
        <button
          onClick={async () => {
            const {
              data,
              error,
            } = await supabase
              .from("settings")
              .insert({
                store_name:
                  "Tech Tudo Campina",
              })
              .select()
              .single();

            if (!error) {
              setSettings(data);
            }
          }}
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-2xl
          "
        >
          Criar Configurações
        </button>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1
          className="
            text-2xl
            lg:text-4xl
            font-bold
          "
        >
          Configurações
        </h1>

        <p
          className="
            text-slate-500
            mt-2
          "
        >
          Informações gerais da loja.
        </p>
      </div>

      <div
        className="
          bg-white
          rounded-3xl
          p-5
          lg:p-8
          border
          border-slate-200
          max-w-4xl
        "
      >
        <div className="grid gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Nome da Loja
            </label>

            <input
              type="text"
              value={
                settings.store_name || ""
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  store_name:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              WhatsApp
            </label>

            <input
              type="text"
              value={
                settings.whatsapp || ""
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  whatsapp:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={
                settings.email || ""
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Instagram
            </label>

            <input
              type="text"
              value={
                settings.instagram || ""
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  instagram:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Facebook
            </label>

            <input
              type="text"
              value={
                settings.facebook || ""
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  facebook:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Endereço
            </label>

            <textarea
              rows={4}
              value={
                settings.address || ""
              }
              onChange={(e) =>
                setSettings({
                  ...settings,
                  address:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
              "
            />
          </div>

          <button
            onClick={saveSettings}
            disabled={saving}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-4
              rounded-2xl
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            <Save size={20} />

            {saving
              ? "Salvando..."
              : "Salvar Configurações"}
          </button>

        </div>
      </div>
    </AdminLayout>
  );
}