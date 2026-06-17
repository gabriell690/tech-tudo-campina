import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({
  children,
}: AdminRouteProps) {
  const { session, loading } = useAuth();

  const [isAdmin, setIsAdmin] =
    useState<boolean | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      if (!session?.user?.email) {
        setIsAdmin(false);
        return;
      }

      const { data, error } =
        await supabase
          .from("admins")
          .select("email")
          .eq(
            "email",
            session.user.email
          )
          .single();

      if (error || !data) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);
    }

    checkAdmin();
  }, [session]);

  if (loading || isAdmin === null) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Carregando...
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <>{children}</>;
}