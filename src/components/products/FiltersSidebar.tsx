interface FiltersSidebarProps {
  categories: string[];
  brands: string[];

  selectedCategory: string;
  selectedBrand: string;

  setSelectedCategory: (value: string) => void;
  setSelectedBrand: (value: string) => void;
}

export default function FiltersSidebar({
  categories,
  brands,

  selectedCategory,
  selectedBrand,

  setSelectedCategory,
  setSelectedBrand,
}: FiltersSidebarProps) {
  return (
    <aside
      className="
        hidden
        lg:block
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        h-fit
        sticky
        top-40
      "
    >
      <h2
        className="
          text-xl
          font-bold
          mb-8
        "
      >
        Filtros
      </h2>

      {/* Categorias */}
      <div className="mb-10">

        <h3
          className="
            font-semibold
            mb-4
          "
        >
          Categorias
        </h3>

        <div className="space-y-3">

          <button
            onClick={() =>
              setSelectedCategory("")
            }
            className={`
              block
              text-left
              w-full
              transition
              ${
                selectedCategory === ""
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600"
              }
            `}
          >
            Todas
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                block
                text-left
                w-full
                transition
                ${
                  selectedCategory === category
                    ? "text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-blue-600"
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>

      </div>

      {/* Marcas */}
      <div>

        <h3
          className="
            font-semibold
            mb-4
          "
        >
          Marcas
        </h3>

        <div className="space-y-3">

          <button
            onClick={() =>
              setSelectedBrand("")
            }
            className={`
              block
              text-left
              w-full
              transition
              ${
                selectedBrand === ""
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600"
              }
            `}
          >
            Todas
          </button>

          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() =>
                setSelectedBrand(brand)
              }
              className={`
                block
                text-left
                w-full
                transition
                ${
                  selectedBrand === brand
                    ? "text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-blue-600"
                }
              `}
            >
              {brand}
            </button>
          ))}

        </div>

      </div>

    </aside>
  );
}