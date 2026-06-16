import { Link } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";

import { useCart } from "../context/CartContext";

import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  Plus,
  Minus,
  MessageCircle,
} from "lucide-react";

export default function Cart() {
  const {
    cartItems,
    total,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  function handleCheckout() {
    const productsText = cartItems
      .map(
        (item) =>
          `• ${item.name}
Quantidade: ${item.quantity}
Valor Unitário: R$ ${item.price.toFixed(2)}
Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n\n");

    const message = `
Olá! Gostaria de solicitar um orçamento.

${productsText}

--------------------------------

Total do Pedido: R$ ${total.toFixed(2)}

Aguardo atendimento.
`;

    const whatsappUrl = `https://wa.me/5583988333856?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
  }

  return (
    <>
      <section
        className="
          min-h-screen
          bg-slate-50
          pt-32
          pb-16
        "
      >
        <Container>

          {/* Cabeçalho */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              mb-10
            "
          >
            <div>
              <h1
                className="
                  text-4xl
                  font-bold
                  text-slate-900
                "
              >
                Meu Carrinho
              </h1>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                Revise seus produtos
                antes de finalizar
                o pedido.
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
                className="
                  mx-auto
                  text-slate-300
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                  mt-6
                "
              >
                Seu carrinho está vazio
              </h2>

              <p
                className="
                  text-slate-500
                  mt-3
                "
              >
                Adicione alguns
                produtos para
                continuar.
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
            <div
              className="
                grid
                lg:grid-cols-[1fr_380px]
                gap-8
              "
            >
              {/* Produtos */}
              <div className="space-y-5">

                {cartItems.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        p-5
                        flex
                        flex-col
                        md:flex-row
                        gap-5
                      "
                    >
                      <img
                        src={
                          item.image_url
                        }
                        alt={
                          item.name
                        }
                        className="
                          w-full
                          md:w-32
                          h-32
                          rounded-2xl
                          object-cover
                        "
                      />

                      <div className="flex-1">

                        <h3
                          className="
                            text-lg
                            font-semibold
                          "
                        >
                          {item.name}
                        </h3>

                        <p
                          className="
                            text-slate-500
                            text-sm
                            mt-2
                          "
                        >
                          {item.brand}
                        </p>

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            mt-4
                          "
                        >
                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-xl
                              border
                              border-slate-300
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Minus
                              size={16}
                            />
                          </button>

                          <span
                            className="
                              font-medium
                            "
                          >
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-xl
                              border
                              border-slate-300
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Plus
                              size={16}
                            />
                          </button>
                        </div>

                        <div className="mt-4">

                          <p
                            className="
                              text-blue-600
                              text-xl
                              font-bold
                            "
                          >
                            R$
                            {" "}
                            {item.price.toFixed(
                              2
                            )}
                          </p>

                          <p
                            className="
                              text-sm
                              text-slate-500
                              mt-1
                            "
                          >
                            Subtotal:
                            {" "}
                            R$
                            {" "}
                            {(
                              item.price *
                              item.quantity
                            ).toFixed(2)}
                          </p>

                        </div>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                        className="
                          text-red-500
                          hover:text-red-600
                          self-start
                        "
                      >
                        <Trash2
                          size={22}
                        />
                      </button>
                    </div>
                  )
                )}

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
                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Resumo do Pedido
                </h2>

                <div
                  className="
                    space-y-4
                    mt-8
                  "
                >
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
                    <span
                      className="
                        font-semibold
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        text-3xl
                        font-bold
                        text-blue-600
                      "
                    >
                      R$
                      {" "}
                      {total.toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>

                <button
                  onClick={
                    handleCheckout
                  }
                  className="
                    mt-8
                    w-full
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >
                  <MessageCircle
                    size={20}
                  />

                  Finalizar pelo WhatsApp
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
