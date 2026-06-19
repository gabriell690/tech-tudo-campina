import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Category } from "../types/category";

export function useCategories() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadCategories() {

      const { data, error } = await supabase
        .from("categories")
        .select(`
          id,
          name,
          slug,
          icon,
          subcategories (
            id,
            name,
            slug
          )
        `)
        .eq("active", true)
        .order("sort_order");

      if (!error && data) {
        setCategories(data as unknown as Category[]);
      }

      setLoading(false);

    }

    loadCategories();

  }, []);

  return {
    categories,
    loading,
  };
}
export async function createCategory(
  name: string,
  slug: string
) {

  return await supabase
    .from("categories")
    .insert({
      name,
      slug,
      active: true
    });

}