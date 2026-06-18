import { X } from "lucide-react";

interface MobileFiltersDrawerProps {
  open: boolean;
  onClose: () => void;

  categories: string[];
  brands: string[];

  selectedCategory: string;
  selectedBrand: string;

  setSelectedCategory: (value: string) => void;
  setSelectedBrand: (value: string) => void;
}

export default function MobileFiltersDrawer({
  open,
  onClose,

  categories,
  brands,

  selectedCategory,
  selectedBrand,

  setSelectedCategory,
  setSelectedBrand,
}: MobileFiltersDrawerProps) {
  return (
    <>
      {open && (
        <div
          className="
            fixed
            inset-0
            bg-black/60
            z-40
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-[85vw]
          max-w-95
          bg-white
          z-50
          transition-transform
          duration-300
          overflow-y-auto
          lg:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
          "
        >
          <h2 className="text-xl font-bold">
            Filtros
          </h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-10">

          {/* Categorias */}
          <div>

            <h3 className="font-semibold mb-4">
              Categorias
            </h3>

            <div className="space-y-3">

              <button
                onClick={() =>
                  setSelectedCategory("")
                }
                className={`
                  block
                  w-full
                  text-left
                  ${
                    selectedCategory === ""
                      ? "text-blue-600 font-bold"
                      : ""
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
                    w-full
                    text-left
                    ${
                      selectedCategory === category
                        ? "text-blue-600 font-bold"
                        : ""
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

            <h3 className="font-semibold mb-4">
              Marcas
            </h3>

            <div className="space-y-3">

              <button
                onClick={() =>
                  setSelectedBrand("")
                }
                className={`
                  block
                  w-full
                  text-left
                  ${
                    selectedBrand === ""
                      ? "text-blue-600 font-bold"
                      : ""
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
                    w-full
                    text-left
                    ${
                      selectedBrand === brand
                        ? "text-blue-600 font-bold"
                        : ""
                    }
                  `}
                >
                  {brand}
                </button>
              ))}

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              w-full
              bg-blue-600
              text-white
              py-4
              rounded-2xl
              font-semibold
            "
          >
            Aplicar filtros
          </button>

        </div>

      </aside>
    </>
  );
}