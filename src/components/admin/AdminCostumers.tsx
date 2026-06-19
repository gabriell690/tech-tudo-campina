/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Mail,
  Shield,
} from "lucide-react";

import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabase";

interface Customer {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export default function AdminCustomers() {

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setCustomers(data || []);

  }

  const filteredCustomers =
    customers.filter(customer =>

      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      customer.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  return (

    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        {/* Topo */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Clientes
          </h1>

          <p className="text-slate-500 mt-2">
            Gerencie os clientes cadastrados.
          </p>

        </div>

        {/* Busca */}
        <div className="
        bg-white
        rounded-3xl
        shadow-sm
        p-5
        mb-8
        ">

          <div className="relative">

            <Search
              size={20}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
              w-full
              pl-12
              pr-4
              py-4
              border
              rounded-2xl
              "
            />

          </div>

        </div>

        {/* Lista */}
        <div className="space-y-4">

          {filteredCustomers.map(customer => (

            <div
              key={customer.id}
              className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-14
                  h-14
                  rounded-full
                  bg-yellow-400
                  text-[#071A35]
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Users size={22}/>
                </div>

                <div>

                  <h2 className="font-semibold text-lg">

                    {customer.name ||
                      "Sem nome"}

                  </h2>

                  <div className="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                  text-sm
                  ">

                    <Mail size={15}/>

                    {customer.email}

                  </div>

                </div>

              </div>

              <div
                className="
                flex
                items-center
                gap-2
                bg-blue-100
                text-blue-700
                px-4
                py-2
                rounded-2xl
                "
              >

                <Shield size={18}/>

                {customer.role}

              </div>

            </div>

          ))}

        </div>

      </div>

    </AdminLayout>

  );

}