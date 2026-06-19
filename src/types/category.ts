export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  subcategories: Subcategory[];
}