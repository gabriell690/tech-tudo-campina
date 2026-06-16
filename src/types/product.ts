/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  old_price: any;
  image_url: string | undefined;
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