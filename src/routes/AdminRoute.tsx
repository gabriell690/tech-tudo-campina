import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAILS = [
  "techtudocampina@gmail.com",
];

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } =
    useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (
    !session ||
    !ADMIN_EMAILS.includes(
      session.user.email ?? ""
    )
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <>{children}</>;
}