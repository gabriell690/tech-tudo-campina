import type { Product } from "../types/product";

const STORAGE_KEY =
"techTudoProducts";

export function getProducts() {
const stored =
localStorage.getItem(
STORAGE_KEY
);

if (!stored) {
return [];
}

return JSON.parse(stored);
}

export function saveProduct(
product: Product
) {
const products =
getProducts();

products.push(product);

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(products)
);
}
