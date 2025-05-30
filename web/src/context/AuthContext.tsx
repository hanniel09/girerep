"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

interface AuthContextType {
  user: string | null;
  token: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => { },
  logout: () => { },
  isAuthenticated: false,
});

const API = process.env.NEXT_PUBLIC_API_URL;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUser(storedUser);
    if (storedToken) {
      setToken(storedToken);
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setRole(payload.role);         
      } catch {
        setRole(null);
      }
    }
     if (storedRole) setRole(storedRole);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", username);
      localStorage.setItem("role", data.role);
      setUser(username);
      setToken(data.token);


      const payload = JSON.parse(atob(data.token.split(".")[1]));
      setRole(payload.role);

      router.push("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Erro ao fazzer login.");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setRole(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, isAuthenticated: !!user, isAdmin: role === "ADMIN" }}>
      {children}
    </AuthContext.Provider>
  );
}