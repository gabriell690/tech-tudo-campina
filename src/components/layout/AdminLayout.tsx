import { useState } from "react";
import { Menu } from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {

  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (

    <div className="min-h-screen bg-slate-100">

      <AdminSidebar
        mobileOpen={mobileMenu}
        onClose={() =>
          setMobileMenu(false)
        }
      />

      {/* Header Mobile */}
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
        flex
        items-center
        px-5
        z-40
        "
      >

        <button
          onClick={() =>
            setMobileMenu(true)
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
          "
        >
          TechTudo Admin
        </h1>

      </header>

      {/* Conteúdo */}
      <main
        className="
        lg:ml-72
        min-h-screen
        pt-20
        lg:pt-8
        p-4
        md:p-8
        overflow-x-hidden
        "
      >

        {children}

      </main>

    </div>

  );

}