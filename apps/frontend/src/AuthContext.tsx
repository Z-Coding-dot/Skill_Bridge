import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { getCurrentUser, type AuthUser, logout as logoutRequest } from "@/api/auth.api";

type User = AuthUser;

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "skillbridge_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const hydrateUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUser));
        }
      } catch (error) {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
          console.error("Unable to restore auth session", error);
        }
        if (isMounted) {
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    hydrateUser();
    return () => { isMounted = false; };
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Unable to log out cleanly", error);
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
