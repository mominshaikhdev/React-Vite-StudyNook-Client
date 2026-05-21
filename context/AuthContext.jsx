import { createContext, useEffect, useRef, useState, useCallback } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SESSION_KEY = "sn_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleCallbackRef = useRef(null);
  const gisInitializedRef = useRef(false);

  useEffect(() => {
    if (!localStorage.getItem(SESSION_KEY)) {
      setTimeout(() => setLoading(false), 0);
      return;
    }
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem(SESSION_KEY, "1");
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, photoURL, password) => {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      photoURL,
      password,
    });
    return res.data;
  };

  const initGoogle = useCallback((onSuccess, onError) => {
    if (!GOOGLE_CLIENT_ID) {
      onError(new Error("Google Client ID is not configured."));
      return () => {};
    }

    googleCallbackRef.current = { onSuccess, onError };

    const doInit = () => {
      if (!window.google?.accounts?.id) return false;

      if (!gisInitializedRef.current) {
        gisInitializedRef.current = true;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            const cb = googleCallbackRef.current;
            if (!cb) return;
            try {
              const res = await api.post("/api/auth/google", {
                credential: response.credential,
              });
              localStorage.setItem(SESSION_KEY, "1");
              setUser(res.data.user);
              cb.onSuccess(res.data);
            } catch (err) {
              cb.onError(err);
            }
          },
          ux_mode: "popup",
          use_fedcm_for_prompt: false,
        });
      }
      return true;
    };

    if (!doInit()) {
      const interval = setInterval(() => {
        if (doInit()) clearInterval(interval);
      }, 100);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        onError(
          new Error(
            "Google Sign-In failed to load. Please refresh and try again.",
          ),
        );
      }, 10000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    return () => {};
  }, []);

  const triggerGoogleSignIn = useCallback(() => {
    if (!window.google?.accounts?.id) return;
    window.google.accounts.id.prompt();
  }, []);

  const logout = async () => {
    await api.post("/api/auth/logout");
    localStorage.removeItem(SESSION_KEY);

    googleCallbackRef.current = null;
    if (window.google?.accounts?.id)
      window.google.accounts.id.disableAutoSelect();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        initGoogle,
        triggerGoogleSignIn,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
