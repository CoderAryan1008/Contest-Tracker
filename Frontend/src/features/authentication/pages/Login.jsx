import { useAuth } from "../hooks/useAuth";
import GlitchVault from "@/components/ui/glitchvault";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <div className="mt-6 rounded-xl border border-cyan-300/10 bg-cyan-300/5 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              What Google sign-in enables
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              We use your name, email, and profile picture to create your
              account. With your permission, Contest Reminder can create and
              update contest events in Google Calendar. We never see your Google
              password.
            </p>
          </div>
          <Button
            type="button"
            onClick={handleClick}
            className="mt-8 h-12 w-full bg-cyan-300 px-6 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200 focus-visible:ring-cyan-300 active:bg-cyan-400"
          >
            Continue with Google
          </Button>
          <p className="mt-4 text-xs text-slate-500">
            Secure authentication powered by Google. You can revoke access from
            your Google Account at any time.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 border-t border-white/10 pt-5 text-xs text-slate-400">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-cyan-200 hover:underline"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-slate-600">
              |
            </span>
            <Link
              to="/terms-of-service"
              className="transition-colors hover:text-cyan-200 hover:underline"
            >
              Terms of Service
            </Link>
          </div>
          <p className="mt-3 text-[11px] leading-4 text-slate-600">
            Questions about your data? Contact anonyuser1008@gmail.com.
          </p>
        </section>
      </main>
    </GlitchVault>
  );
}
export default Login;
