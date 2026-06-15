/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import {
createContext,
useContext,
useState,
useEffect,
type ReactNode,
} from "react";

import type { Product } from "../types/product";

interface CartItem extends Product {
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
}

const CartContext =
createContext<CartContextData>(
{} as CartContextData
);

export function CartProvider({
children,
}: {
children: ReactNode;
}) {
const [cartItems, setCartItems] =
useState<CartItem[]>([]);

useEffect(() => {
const storedCart =
localStorage.getItem(
"techTudoCart"
);

if (storedCart) {
  setCartItems(
    JSON.parse(storedCart)
  );
}


}, []);

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
const existing =
prev.find(
(item) =>
item.id === product.id
);

  if (existing) {
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
(total, item) =>
total + item.quantity,
0
);

return (
<CartContext.Provider
value={{
cartItems,
cartCount,
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
