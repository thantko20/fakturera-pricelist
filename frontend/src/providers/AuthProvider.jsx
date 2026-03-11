import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { api } from "../lib/axios";

const TOKEN_KEY = "access_token";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || null
  );
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!token) {
        setUser(null);
        setIsAuthenticating(false);
        return;
      }

      try {
        setIsAuthenticating(true);
        const response = await api.get("/auth/me");
        setUser(response.data?.user || null);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsAuthenticating(false);
      }
    };

    loadCurrentUser();
  }, [token]);

  const setAuthFromLogin = ({ accessToken }) => {
    if (accessToken) {
      localStorage.setItem(TOKEN_KEY, accessToken);
      setToken(accessToken);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      setAuthFromLogin,
      logout,
      isAuthenticating,
    }),
    [token, user, isAuthenticating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
