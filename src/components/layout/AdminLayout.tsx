import { useState } from "react";
import { Menu } from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <div className="bg-slate-100 min-h-screen flex">

      <AdminSidebar
        mobileOpen={mobileMenu}
        onClose={() =>
          setMobileMenu(false)
        }
      />

      <div className="flex-1">

        <header
          className="
            lg:hidden
            fixed
            top-0
            left-0
            right-0
            h-16
            bg-white
            border-b
            border-slate-200
            flex
            items-center
            px-4
            z-30
          "
        >
          <button
            onClick={() =>
              setMobileMenu(true)
            }
          >
            <Menu size={24} />
          </button>

          <h1
            className="
              ml-4
              font-bold
            "
          >
            Painel Admin
          </h1>
        </header>

        <main
          className="
            p-4
            lg:p-8
            pt-20
            lg:pt-8
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
}