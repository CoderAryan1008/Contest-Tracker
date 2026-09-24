import { useAuth } from "../hooks/useAuth";
import GlitchVault from "@/components/ui/glitchvault";
import { Button } from "@/components/ui/button";

function Login() {
  const { login } = useAuth();

  function handleClick() {
    login();
  }

  return (
    <GlitchVault
      className="min-h-screen w-full bg-slate-950"
      glitchColor="#22d3ee"
      glitchRadius={140}
    >
      <main className="flex min-h-screen items-center justify-center px-6 py-10">
        <section className="w-full max-w-md rounded-2xl border border-cyan-300/20 bg-slate-950/85 p-8 text-center shadow-2xl shadow-cyan-950/40 backdrop-blur-md sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Contest Reminder
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome back
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-300">
            Sign in to keep your coding contests and reminders in one place.
          </p>
          <Button
            type="button"
            onClick={handleClick}
            className="mt-8 h-12 w-full bg-cyan-300 px-6 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200 focus-visible:ring-cyan-300 active:bg-cyan-400"
          >
            Continue with Google
          </Button>
          <p className="mt-4 text-xs text-slate-500">
            Secure authentication powered by Google
          </p>
        </section>
      </main>
    </GlitchVault>
  );
}
export default Login;
