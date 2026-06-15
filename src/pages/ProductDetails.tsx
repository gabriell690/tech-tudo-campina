import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import ProductCard from "../components/products/ProductCard";

import { ShoppingCart, Star } from "lucide-react";

import { products } from "../data/products";

export default function ProductDetails() {
const product = products[0];

const relatedProducts = products.slice(1);

return (
<> <Navbar />

```
  <section className="py-16 bg-slate-50 min-h-screen">
    <Container>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Imagem */}
        <div>
          <div
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              border
              border-slate-200
            "
          >
            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-125
                object-cover
              "
            />
          </div>
        </div>

        {/* Conteúdo */}
        <div>
          <p className="text-blue-600 font-medium">
            {product.brand}
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-1 mt-4 text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="currentColor"
              />
            ))}

            <span className="text-slate-500 ml-2">
              (5.0)
            </span>
          </div>

          <div className="mt-8">
            {product.oldPrice && (
              <p className="text-slate-400 line-through text-xl">
                R$ {product.oldPrice.toFixed(2)}
              </p>
            )}

            <p className="text-5xl font-bold text-slate-900">
              R$ {product.price.toFixed(2)}
            </p>

            <p className="text-green-600 mt-2">
              até 12x sem juros
            </p>
          </div>

          <div
            className="
              mt-8
              p-5
              rounded-2xl
              bg-white
              border
              border-slate-200
            "
          >
            <p>
              <strong>Estoque:</strong>{" "}
              {product.stock} unidades
            </p>

            <p className="mt-2">
              <strong>Categoria:</strong>{" "}
              {product.category}
            </p>

            <p className="mt-2">
              <strong>Marca:</strong>{" "}
              {product.brand}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-2xl
                flex
                items-center
                gap-2
                font-medium
              "
            >
              <ShoppingCart size={20} />
              Comprar Agora
            </button>

            <button
              className="
                border
                border-green-500
                text-green-600
                px-8
                py-4
                rounded-2xl
                font-medium
              "
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div
        className="
          mt-20
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-8
        "
      >
        <h2 className="text-2xl font-bold mb-4">
          Descrição
        </h2>

        <p className="text-slate-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Relacionados */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">
          Produtos Relacionados
        </h2>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </div>
    </Container>
  </section>

  <Footer />
</>
);
}
