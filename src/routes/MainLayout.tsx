import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import MobileDrawer from "../components/layout/MobileDrawer";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Menu lateral compartilhado */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Navbar */}
      <Navbar
        onMenuClick={() => setMobileOpen(true)}
      />

      {/* Conteúdo */}
      <main
        className="
          pt-40
          md:pt-36
          pb-24
          min-h-screen
          bg-slate-50
        "
      >
        <Outlet />
      </main>

      {/* Navegação inferior mobile */}
      <BottomNav
        onMenuClick={() => setMobileOpen(true)}
      />
    </>
  );
}