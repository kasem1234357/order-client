// hooks/useAuth.ts
import { useEffect, useState } from "react";

interface User {
  id: string | number;
  name: string;
  email: string;
  [key: string]: any;
}

interface UseAuthOptions {
  loginEndpoint?: string;
  registerEndpoint?: string;
  profileEndpoint?: string;
  storageType?: "localStorage" | "sessionStorage";
  tokenKey?: string;
}

interface UseAuthResult {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, any>) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  isAuthenticated: boolean;
}

const DEFAULT_OPTIONS: UseAuthOptions = {
  loginEndpoint: "/api/login",
  registerEndpoint: "/api/register",
  profileEndpoint: "/api/profile",
  storageType: "localStorage",
  tokenKey: "auth_token",
};

export function useAuth(customOptions: UseAuthOptions = {}): UseAuthResult {
  const options = { ...DEFAULT_OPTIONS, ...customOptions };
  const storage = options.storageType === "localStorage" ? localStorage : sessionStorage;

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(storage.getItem(options.tokenKey!) || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token;

  const saveToken = (token: string) => {
    storage.setItem(options.tokenKey!, token);
    setToken(token);
  };

  const clearAuth = () => {
    storage.removeItem(options.tokenKey!);
    setToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(options.loginEndpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials.");
      }

      const data = await response.json();
      saveToken(data.token);
      await fetchProfile();
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(options.registerEndpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      const data = await response.json();
      saveToken(data.token);
      await fetchProfile();
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(options.profileEndpoint!, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile.");
      }

      const profile = await response.json();
      setUser(profile);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
  };

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token]);

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    isAuthenticated,
  };
}
