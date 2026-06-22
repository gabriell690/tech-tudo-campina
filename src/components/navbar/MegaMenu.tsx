import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

export default function MegaMenu() {

  const { categories } = useCategories();

  return (

    <div
      className="
      absolute
      left-0
      top-full
      w-full
      bg-white
      shadow-2xl
      rounded-b-3xl
      p-8
      grid
      grid-cols-4
      gap-8
      z-50
      "
    >

      {categories.map(category => (

        <div key={category.id}>

          <h3 className="
          font-bold
          text-lg
          mb-4
          ">
            {category.name}
          </h3>

          <div className="
          flex
          flex-col
          gap-3
          ">

            {category.subcategories.map(sub => (

              <Link
                key={sub.id}
                to={`/categoria/${category.slug}/${sub.slug}`}
                className="
                text-slate-500
                hover:text-orange-500
                "
              >
                {sub.name}
              </Link>

            ))}

          </div>

        </div>

      ))}

    </div>

  );

}