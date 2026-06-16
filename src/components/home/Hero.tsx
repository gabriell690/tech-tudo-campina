/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";

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

export default function Hero() {
  const [banner, setBanner] =
    useState<Banner | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBanner();
  }, []);

  async function loadBanner() {
    try {
      const { data } =
        await supabase
          .from("banners")
          .select("*")
          .eq("active", true)
          .limit(1)
          .single();

      if (data) {
        setBanner(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section
        className="
          h-175
          flex
          items-center
          justify-center
          bg-slate-100
        "
      >
        <p>Carregando banner...</p>
      </section>
    );
  }

  if (!banner) {
    return (
      <section
        className="
          h-175
          flex
          items-center
          justify-center
          bg-slate-100
        "
      >
        <p>Nenhum banner ativo.</p>
      </section>
    );
  }

  return (
    <section
      className="
        relative
        min-h-175
        flex
        items-center
        overflow-hidden
      "
    >
      {/* Imagem */}
      <div
        className="
          absolute
          inset-0
        "
      >
        <img
          src={banner.image_url}
          alt={banner.title}
          className="
            w-full
            h-full
            object-cover
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/60
          "
        />
      </div>

      {/* Conteúdo */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          w-full
        "
      >
        <div
          className="
            max-w-3xl
          "
        >
          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-white
              leading-tight
            "
          >
            {banner.title}
          </h1>

          <p
            className="
              text-lg
              md:text-xl
              text-slate-200
              mt-6
              leading-relaxed
            "
          >
            {banner.subtitle}
          </p>

          {banner.button_text && (
            <a
              href={banner.button_link}
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >
              {banner.button_text}

              <ArrowRight size={20} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

