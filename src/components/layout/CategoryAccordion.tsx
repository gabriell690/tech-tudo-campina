import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Category } from "../../types/category";

interface Props {
  category: Category;
  onClose: () => void;
}

export default function CategoryAccordion({
  category,
  onClose,
}: Props) {

  const [open, setOpen] = useState(false);

  return (
    <div>

      <button
        className="w-full flex items-center justify-between py-2"
        onClick={() => setOpen(!open)}
      >

        <span className="font-medium">
          {category.name}
        </span>

        {category.subcategories.length > 0 && (
          <ChevronDown
            size={18}
            className={`transition duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}

      </button>

      {open && (

        <div className="ml-6 mt-3 flex flex-col gap-3">

          {category.subcategories.map((sub) => (

            <Link
              key={sub.id}
              to={`/categoria/${category.slug}/${sub.slug}`}
              onClick={onClose}
              className="
                text-sm
                text-slate-500
                hover:text-orange-500
              "
            >
              {sub.name}
            </Link>

          ))}

        </div>

      )}

    </div>
  );
}