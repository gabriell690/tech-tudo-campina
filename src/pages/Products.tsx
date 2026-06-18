/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";

import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";

import ProductsToolbar from "../components/products/ProductsToolbar";
import FiltersSidebar from "../components/products/FiltersSidebar";
import MobileFiltersDrawer from "../components/products/MobileFiltersDrawer";
import ProductsGrid from "../components/products/ProductsGrid";

import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";


export default function Products() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [selectedBrand, setSelectedBrand] =
    useState("");

  const [sortBy, setSortBy] =
    useState("recent");

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  async function loadProducts() {
    setLoading(true);

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true);

    setProducts(data || []);

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (p) => p.category
        )
      ),
    ];
  }, [products]);

  const brands = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (p) => p.brand
        )
      ),
    ];
  }, [products]);

 const filteredProducts = useMemo(() => {

  let result = [...products];

  // Busca
  if (search) {
    result = result.filter((product) => {

      const text = `
        ${product.name}
        ${product.description}
        ${product.brand}
        ${product.category}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });
  }

  // Categoria
  if (selectedCategory) {
    result = result.filter(
      (product) =>
        product.category === selectedCategory
    );
  }

  // Marca
  if (selectedBrand) {
    result = result.filter(
      (product) =>
        product.brand === selectedBrand
    );
  }

  // Ordenação
  switch (sortBy) {

    case "priceAsc":
      result.sort(
        (a, b) =>
          a.price - b.price
      );
      break;

    case "priceDesc":
      result.sort(
        (a, b) =>
          b.price - a.price
      );
      break;

    case "az":
      result.sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );
      break;

    default:
      break;
  }

  return result;

}, [
  products,
  search,
  selectedCategory,
  selectedBrand,
  sortBy,
]);

  return (
    <section className="bg-slate-50 min-h-screen pt-32 pb-12">

      <Container>

        <SectionTitle
          title="Todos os Produtos"
          subtitle="Encontre smartphones, notebooks e acessórios."
        />

        <ProductsToolbar
          total={filteredProducts.length}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          openFilters={() =>
            setMobileFiltersOpen(true)
          }
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-8">

          <FiltersSidebar
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            setSelectedCategory={setSelectedCategory}
            setSelectedBrand={setSelectedBrand}
          />

          <ProductsGrid
            loading={loading}
            products={filteredProducts}
          />

        </div>

        <MobileFiltersDrawer
          open={mobileFiltersOpen}
          onClose={() =>
            setMobileFiltersOpen(false)
          }
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          setSelectedCategory={setSelectedCategory}
          setSelectedBrand={setSelectedBrand}
        />

      </Container>

    </section>
  );
}