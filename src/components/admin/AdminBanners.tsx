
import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import AdminLayout from "../layout/AdminLayout";

import { supabase } from "../../lib/supabase";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
  active: boolean;
}

export default function AdminBanners() {
  const [banners, setBanners] =
    useState<Banner[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      subtitle: "",
      image_url: "",
      button_text: "",
      button_link: "",
    });

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    const { data } =
      await supabase
        .from("banners")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setBanners(data || []);
    setLoading(false);
  }

  async function uploadImage(
    file: File
  ) {
    try {
      setUploading(true);

      const fileName =
        `${Date.now()}-${file.name}`;

      const { error } =
        await supabase.storage
          .from("banners")
          .upload(
            fileName,
            file
          );

      if (error) throw error;

      const {
        data,
      } = supabase.storage
        .from("banners")
        .getPublicUrl(
          fileName
        );

      setForm((prev) => ({
        ...prev,
        image_url:
          data.publicUrl,
      }));
    } catch (error) {
      console.error(error);
      alert(
        "Erro ao enviar imagem."
      );
    } finally {
      setUploading(false);
    }
  }

  async function createBanner() {
    const { error } =
      await supabase
        .from("banners")
        .insert({
          ...form,
          active: true,
        });

    if (error) {
      alert(
        "Erro ao criar banner."
      );
      return;
    }

    setForm({
      title: "",
      subtitle: "",
      image_url: "",
      button_text: "",
      button_link: "",
    });

    loadBanners();
  }

  async function deleteBanner(
    id: string
  ) {
    await supabase
      .from("banners")
      .delete()
      .eq("id", id);

    loadBanners();
  }

  async function toggleBanner(
    banner: Banner
  ) {
    await supabase
      .from("banners")
      .update({
        active:
          !banner.active,
      })
      .eq("id", banner.id);

    loadBanners();
  }

  return (
       <AdminLayout>

      <main
        className="
          flex-1
          bg-slate-100
          min-h-screen
          p-8
        "
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Banners
          </h1>

          <p className="text-slate-500 mt-2">
            Gerencie os banners da home.
          </p>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-slate-200
            mb-8
          "
        >
          <h2 className="text-xl font-semibold mb-6">
            Novo Banner
          </h2>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Título"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

            <input
              type="text"
              placeholder="Subtítulo"
              value={form.subtitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  subtitle:
                    e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

            <input
              type="text"
              placeholder="Texto do botão"
              value={
                form.button_text
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  button_text:
                    e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

            <input
              type="text"
              placeholder="Link do botão"
              value={
                form.button_link
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  button_link:
                    e.target.value,
                })
              }
              className="
                border
                rounded-2xl
                px-4
                py-3
              "
            />

            <label
              className="
                border-2
                border-dashed
                rounded-2xl
                p-6
                text-center
                cursor-pointer
              "
            >
              <ImageIcon
                className="
                  mx-auto
                  mb-3
                "
              />

              {uploading
                ? "Enviando..."
                : "Selecionar imagem"}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target
                      .files?.[0];

                  if (file) {
                    uploadImage(
                      file
                    );
                  }
                }}
              />
            </label>

            <button
              onClick={
                createBanner
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-4
                rounded-2xl
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Plus size={20} />
              Criar Banner
            </button>

          </div>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <div>
              Carregando...
            </div>
          ) : (
            banners.map(
              (banner) => (
                <div
                  key={banner.id}
                  className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-slate-200
                  "
                >
                  <img
                    src={
                      banner.image_url
                    }
                    alt={
                      banner.title
                    }
                    className="
                      w-full
                      h-64
                      object-cover
                    "
                  />

                  <div className="p-6">
                    <h3 className="text-2xl font-bold">
                      {banner.title}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      {
                        banner.subtitle
                      }
                    </p>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() =>
                          toggleBanner(
                            banner
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-blue-600
                          text-white
                        "
                      >
                        {banner.active
                          ? "Desativar"
                          : "Ativar"}
                      </button>

                      <button
                        onClick={() =>
                          deleteBanner(
                            banner.id
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-red-500
                          text-white
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <Trash2
                          size={18}
                        />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </main>
     </AdminLayout>
  );
}
