import { supabase } from "../../lib/supabase";

export default function SocialLogin() {

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    });
  }

  async function handleGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github"
    });
  }

  return (
    <div className="space-y-3">

      <button
        onClick={handleGoogle}
        className="
        w-full
        border
        border-zinc-700
        bg-zinc-900
        hover:bg-zinc-800
        rounded-xl
        py-3
        text-white
        transition
      "
      >
        Continuar com Google
      </button>

      <button
        onClick={handleGithub}
        className="
        w-full
        border
        border-zinc-700
        bg-zinc-900
        hover:bg-zinc-800
        rounded-xl
        py-3
        text-white
        transition
      "
      >
        Continuar com Github
      </button>
      

    </div>
    
  );
}