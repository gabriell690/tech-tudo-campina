import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Register from "../components/admin/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import AdminLogin from "../components/admin/Login";
import Dashboard from "../components/admin/Dashboard";
import AdminProducts from "../components/admin/Products";
import ProductForm from "../components/admin/ProductForm";
import AdminRoute from "./AdminRoute";
import AdminOrders from "../components/admin/AdminOrders";
import AdminSettings from "../components/admin/AdminSettings";
import AdminBanners from "../components/admin/AdminBanners";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Loja */}
        <Route element={<MainLayout />}>
         
          <Route
            path="/"
            element={<Home />}
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
        </Route>

        {/* Administração */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
      <Route
  path="/admin"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>

   <Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>

       <Route
  path="/admin/products/new"
  element={
    <AdminRoute>
      <ProductForm />
    </AdminRoute>
  }
/>
<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>
<Route
  path="/admin/settings"
  element={
    <AdminRoute>
      <AdminSettings />
    </AdminRoute>
  }
/>
<Route
  path="/admin/banners"
  element={
    <AdminRoute>
      <AdminBanners />
    </AdminRoute>
  }
/>
<Route
  path="/admin/register"
  element={<Register />}
/>

      </Routes>
    </BrowserRouter>
  );
}