import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage, FiCheck, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../context/useAuth";

function PasswordRule({ met, text }) {
  return (
    <li
      className={`flex items-center gap-1.5 text-xs ${met ? "text-green-600" : "text-slate-400"}`}
    >
      {met ? <FiCheck size={12} /> : <FiX size={12} />} {text}
    </li>
  );
}

export default function Register() {
  const { register, initGoogle } = useAuth();
  const navigate = useNavigate();

  const googleBtnRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [error, setError] = useState("");

  const rules = {
    length: form.password.length >= 6,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
  };
  const passwordValid = Object.values(rules).every(Boolean);

  useEffect(() => {
    const cleanup = initGoogle(
      () => {
        toast.success("Registered with Google!");
        navigate("/");
      },
      (err) => {
        toast.error(err.message || "Google registration failed");
      },
    );
    const t = setTimeout(() => setGoogleReady(true), 500);
    return () => {
      cleanup?.();
      clearTimeout(t);
    };
  }, [initGoogle, navigate]);

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
    if (!passwordValid) {
      setError("Please meet all password requirements.");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.photoURL, form.password);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StudyNook - Register</title>
      </Helmet>
      <div className="page-enter min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Join StudyNook to book and list study rooms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="form-label" htmlFor="name">
                  <FiUser className="inline mr-1" />
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
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
                <label className="form-label" htmlFor="photoURL">
                  <FiImage className="inline mr-1" />
                  Photo URL
                </label>
                <input
                  id="photoURL"
                  name="photoURL"
                  type="text"
                  required
                  placeholder="https://example.com/photo.jpg"
                  value={form.photoURL}
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
                {form.password && (
                  <ul className="mt-2 space-y-1 pl-1">
                    <PasswordRule
                      met={rules.length}
                      text="At least 6 characters"
                    />
                    <PasswordRule
                      met={rules.upper}
                      text="At least one uppercase letter"
                    />
                    <PasswordRule
                      met={rules.lower}
                      text="At least one lowercase letter"
                    />
                  </ul>
                )}
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !passwordValid}
                className="btn-primary w-full justify-center py-3 text-base mt-2"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

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

              <div className="absolute inset-0 pointer-events-none flex items-center justify-center gap-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-600 transition-colors duration-150">
                <FcGoogle size={20} />
                <span className="font-semibold text-slate-700 dark:text-slate-100 text-sm">
                  {googleReady ? "Continue with Google" : "Loading…"}
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
