import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface ProductsToolbarProps {
  total: number;
  search: string;
  setSearch: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  openFilters: () => void;
}

export default function ProductsToolbar({
  total,
  search,
  setSearch,
  sortBy,
  setSortBy,
  openFilters,
}: ProductsToolbarProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-5
        mt-8
        space-y-5
      "
    >
      {/* Busca */}
      <div className="relative">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="O que você está procurando?"
          className="
            w-full
            border
            border-slate-200
            rounded-2xl
            h-12
            pl-12
            pr-4
            outline-none
            focus:border-blue-500
          "
        />

      </div>

      {/* Barra inferior */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        "
      >

        <div className="text-slate-600">
          {total} produtos encontrados
        </div>

        <div className="flex gap-3">

          {/* Mobile */}
          <button
            onClick={openFilters}
            className="
              lg:hidden
              flex
              items-center
              gap-2
              px-4
              py-3
              rounded-2xl
              border
              border-slate-200
            "
          >
            <SlidersHorizontal size={18} />
            Filtros
          </button>

          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="
              border
              border-slate-200
              rounded-2xl
              px-4
              py-3
              outline-none
            "
          >
            <option value="recent">
              Mais recentes
            </option>

            <option value="priceAsc">
              Menor preço
            </option>

            <option value="priceDesc">
              Maior preço
            </option>

            <option value="az">
              Nome A-Z
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}