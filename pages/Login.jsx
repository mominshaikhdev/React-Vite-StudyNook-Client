import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../context/useAuth";

export default function Login() {
  const { login, initGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const googleBtnRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cleanup = initGoogle(
      () => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      },
      (err) => {
        toast.error(err.message || "Google login failed");
      },
    );
    const t = setTimeout(() => setGoogleReady(true), 500);
    return () => {
      cleanup?.();
      clearTimeout(t);
    };
  }, [initGoogle, navigate, from]);

  useEffect(() => {
    if (!googleReady || !googleBtnRef.current) return;
    if (!window.google?.accounts?.id) return;
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      type: "standard",
      size: "large",
      text: "continue_with",
      width: googleBtnRef.current.offsetWidth || 400,
    });
  }, [googleReady]);

  const handleChange = (e) => {
    setError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StudyNook - Login</title>
      </Helmet>
      <div className="page-enter min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Log in to access your study rooms and bookings.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="form-label" htmlFor="email">
                  <FiMail className="inline mr-1" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label" htmlFor="password">
                  <FiLock className="inline mr-1" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Default E-mail:</strong> example@example.com
                </p>
                <p>
                  <strong>Default Password:</strong> Example123
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base mt-2"
              >
                <FiLogIn /> {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-600" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-slate-800 px-3 text-xs text-slate-400 dark:text-slate-500">
                  or
                </span>
              </div>
            </div>

            <div className="relative w-full h-11 group cursor-pointer">
              <div
                ref={googleBtnRef}
                className="absolute inset-0 overflow-hidden rounded-lg"
              />

              <div className="absolute inset-0 pointer-events-none flex items-center justify-center gap-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-600 transition-colors duration-150">
                <FcGoogle size={18} className="shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-100 text-sm">
                  {googleReady ? "Continue with Google" : "Loading…"}
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
