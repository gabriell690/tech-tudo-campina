/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextData {
  cartItems: CartItem[];

  cartCount: number;

  addToCart: (
    product: Product
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  increaseQuantity: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;

  clearCart: () => void;

  total: number;
}

const CartContext =
  createContext<CartContextData>(
    {} as CartContextData
  );

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  /* Carrega carrinho */
  useEffect(() => {
    const storedCart =
      localStorage.getItem(
        "techTudoCart"
      );

    if (storedCart) {
      try {
        setCartItems(
          JSON.parse(storedCart)
        );
      } catch {
        localStorage.removeItem(
          "techTudoCart"
        );
      }
    }
  }, []);

  /* Salva carrinho */
  useEffect(() => {
    localStorage.setItem(
      "techTudoCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  function addToCart(
    product: Product
  ) {
    setCartItems((prev) => {
      const existingProduct =
        prev.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(
    id: string
  ) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(
    id: string
  ) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  }

  function removeFromCart(
    id: string
  ) {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount =
    cartItems.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  const total =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        cartCount,

        total,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}
