import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";

import { useCart } from "../context/CartContext";

import {
ShoppingBag,
Trash2,
ArrowLeft,
} from "lucide-react";

export default function Cart() {
const {
cartItems,
removeFromCart,
clearCart,
} = useCart();

const total = cartItems.reduce(
(acc, item) =>
acc +
item.price * item.quantity,
0
);

return (
<> <Navbar />

```
  <section className="min-h-screen bg-slate-50 py-16">
    <Container>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Meu Carrinho
          </h1>

          <p className="text-slate-500 mt-2">
            Revise seus produtos antes de finalizar a compra.
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="
              text-red-500
              hover:text-red-600
              font-medium
            "
          >
            Limpar Carrinho
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-16
            text-center
          "
        >
          <ShoppingBag
            size={70}
            className="mx-auto text-slate-300"
          />

          <h2 className="text-2xl font-bold mt-6">
            Seu carrinho está vazio
          </h2>

          <p className="text-slate-500 mt-3">
            Adicione alguns produtos para continuar.
          </p>

          <Link
            to="/produtos"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-2xl
              font-medium
              transition
            "
          >
            <ArrowLeft size={18} />
            Voltar às Compras
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Produtos */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-slate-200
                  p-5
                  flex
                  gap-5
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-28
                    h-28
                    rounded-2xl
                    object-cover
                  "
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-slate-500 text-sm mt-2">
                    Quantidade: {item.quantity}
                  </p>

                  <p className="text-blue-600 font-bold text-xl mt-3">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="
                    text-red-500
                    hover:text-red-600
                    self-start
                  "
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
              h-fit
              sticky
              top-32
            "
          >
            <h2 className="text-2xl font-bold">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mt-8">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Produtos
                </span>

                <span>
                  {cartItems.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Frete
                </span>

                <span className="text-green-600">
                  Grátis
                </span>
              </div>

              <div className="h-px bg-slate-200" />

              <div className="flex justify-between">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="
                mt-8
                w-full
                bg-linear-to-r
                from-blue-600
                to-blue-700
                hover:from-blue-700
                hover:to-blue-800
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >
              Finalizar Compra
            </button>

            <Link
              to="/produtos"
              className="
                block
                text-center
                mt-4
                text-slate-500
                hover:text-slate-700
              "
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      )}
    </Container>
  </section>

  <Footer />
</>

);
}
