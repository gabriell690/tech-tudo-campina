/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
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

export default function BannerGrid() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("active", true);

    if (!error) {
      setBanners(data || []);
    }
  }
  if (banners.length === 0) {
  return null;
}

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="space-y-6">

        {/* Banner principal */}
        {banners[0] && (
          <a href={banners[0].button_link}>
            <img
              src={banners[0].image_url}
              alt={banners[0].title}
              className="
                w-full
                rounded-3xl
                object-cover
                hover:scale-[1.01]
                transition
              "
            />
          </a>
        )}

        {/* Grade de banners */}
        <div className="grid md:grid-cols-2 gap-6">
          {banners.slice(1).map((banner) => (
            <a
              key={banner.id}
              href={banner.button_link}
              className="
                overflow-hidden
                rounded-3xl
                shadow-md
                hover:scale-[1.02]
                transition
              "
            >
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full object-cover"
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}