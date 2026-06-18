export interface Product {
  id: string;

  name: string;

  slug: string;

  description: string;

  shortDescription?: string;

  price: number;

  old_price?: number | null;

  stock: number;

  category: string;

  brand: string;

  image: string;

  image_url?: string;

  images?: string[];

  featured?: boolean;

  active?: boolean;

  rating?: number;

  created_at?: string;

  updated_at?: string;
}