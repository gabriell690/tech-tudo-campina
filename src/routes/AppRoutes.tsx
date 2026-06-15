import {
BrowserRouter,
Routes,
Route,
} from "react-router-dom";

import AdminLogin from "../components/admin/Login";
import Dashboard from "../components/admin/Dashboard";
import AdminProducts from "../components/admin/Products";
import ProductForm from "../components/admin/ProductForm";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";


export default function AppRoutes() {
return ( <BrowserRouter> <Routes>
<Route
path="/"
element={<Home />}
/>

<Route
  path="/admin/login"
  element={<AdminLogin />}
/>
<Route
  path="/admin"
  element={<Dashboard />}
/>
<Route
  path="/admin/products"
  element={<AdminProducts />}
/>
<Route
  path="/admin/products/new"
  element={<ProductForm />}
/>
    <Route
      path="/produtos"
      element={<Products />}
    />
    <Route
  path="/produto/:slug"
  element={<ProductDetails />}
/>
    <Route
      path="/carrinho"
      element={<Cart />}
    />
  </Routes>
</BrowserRouter>
);
}
