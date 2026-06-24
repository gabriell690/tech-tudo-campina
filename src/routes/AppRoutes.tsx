import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

import CategoryPage from "../components/home/CategoryPage";

import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import SubcategoryPage from "../pages/SubcategoryPage";
import Dashboard from "../components/admin/Dashboard";
import AdminProducts from "../components/admin/Products";
import ProductForm from "../components/admin/ProductForm";
import AdminOrders from "../components/admin/AdminOrders";
import AdminSettings from "../components/admin/AdminSettings";
import AdminBanners from "../components/admin/AdminBanners";
import AdminCategories from "../components/admin/AdminCategories";

import MinhaConta from "../pages/MinhaConta";
import MeusPedidos from "../pages/MeusPedidos";
import Favoritos from "../pages/Favoritos";
import AdminCustomers from "../components/admin/AdminCostumers";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Layout da Loja */}
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
  path="/categoria/:category"
  element={<CategoryPage />}
/>

<Route
  path="/categoria/:categorySlug/:subcategorySlug"
  element={<SubcategoryPage />}
/>

          <Route
            path="/produto/:slug"
            element={<ProductDetails />}
          />

          <Route
            path="/carrinho"
            element={<Cart />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Área do cliente */}
          <Route
            path="/minha-conta"
            element={
              <ProtectedRoute>
                <MinhaConta />
              </ProtectedRoute>
            }
          />

          <Route
            path="/meus-pedidos"
            element={
              <ProtectedRoute>
                <MeusPedidos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* Área Administrativa */}

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
  path="/admin/customers"
  element={<AdminCustomers />}
/>

        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <AdminCategories />
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

      </Routes>

    </BrowserRouter>
  );
}