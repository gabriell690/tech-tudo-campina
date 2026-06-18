import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB",
    description: "Smartphone Apple iPhone 15 Pro Max 256GB.",
    price: 6999.9,
    stock: 10,
    category: "Smartphones",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    featured: true,
    active: true,
    rating: 5,
    old_price: undefined,
    image_url: undefined
  },

  {
    id: "2",
    slug: "notebook-gamer-rtx",
    name: "Notebook Gamer RTX",
    description: "Notebook gamer de alta performance.",
    price: 4999.9,
    stock: 7,
    category: "Notebooks",
    brand: "Asus",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    featured: true,
    active: true,
    rating: 5,
    old_price: undefined,
    image_url: undefined
  },
];