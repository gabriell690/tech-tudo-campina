/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BannerGrid from "./BannerGrid";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
  active: boolean;
}

export default function HomeHero() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    try {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .eq("active", true);

      if (error) {
        console.error(error);
      }

      setBanners(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

if (loading) {
  return null;
}

if (banners.length > 0) {
  return <BannerGrid />;
}

return null;
}