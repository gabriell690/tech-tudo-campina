import { useState } from "react";
import { Menu } from "lucide-react";

import AdminSidebar from "../admin/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (

    <div className="h-screen flex bg-slate-100">

      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div
        className="
          flex
          flex-col
          flex-1
          lg:ml-10
          overflow-hidden
        "
      >

        {/* Topbar Mobile */}

        <header
          className="
            lg:hidden
            fixed
            top-0
            left-0
            right-0
            h-16
            bg-[#071A35]
            border-b
            border-blue-900
            z-50
            flex
            items-center
            px-5
          "
        >

          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="text-white"
          >

            <Menu size={26} />

          </button>

          <h1
            className="
              ml-4
              text-white
              font-bold
              text-lg
            "
          >

            TechTudo Admin

          </h1>

        </header>

        {/* Conteúdo */}

        <main
          className="
            flex-1
            overflow-y-auto
            pt-20
            lg:pt-8
            px-6
            pb-8
          "
        >

          {children}

        </main>

      </div>

    </div>

  );

}