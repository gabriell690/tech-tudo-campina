export interface Product {
  id: string;

  name: string;

  slug: string;

  description: string;

  shortDescription?: string;

  price: number;

  oldPrice?: number;

  stock: number;

  category: string;

  brand: string;

  image: string;

  images?: string[];

  featured?: boolean;

  active?: boolean;

  rating?: number;

  createdAt?: string;

  updatedAt?: string;
}