import LoginForm from "../components/auth/LoginForm";
import AuthBanner from "../components/auth/AuthBanner";
import AuthFooter from "../components/auth/AuthFooter";

export default function Login() {
  return (
  <>
  <section
    className="
    min-h-screen
    bg-linear-to-br
    from-slate-950
    via-blue-950
    to-slate-900
    flex
    items-center
    justify-center
    px-6
    py-16
    "
  >
  
    <div
      className="
      w-full
      max-w-6xl
      grid
      lg:grid-cols-2
      gap-8
      "
    >
      <LoginForm />

      <AuthBanner />
    </div>
  </section>

  <AuthFooter />
</>
  );
}