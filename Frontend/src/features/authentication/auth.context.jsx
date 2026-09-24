import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./auth.context";
import {
  getMe,
  login as loginApi,
  logout as logoutApi,
} from "./services/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loaderTimeout = window.setTimeout(() => {
      if (isMounted) {
        setUser(null);
        setloader(false);
      }
    }, 12000);

    async function getAndsetUser() {
      try {
        const data = await getMe(); // already the plain user object, or null
        if (isMounted) {
          setUser(data);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setloader(false);
        }
        window.clearTimeout(loaderTimeout);
      }
    }
    getAndsetUser();

    return () => {
      isMounted = false;
      window.clearTimeout(loaderTimeout);
    };
  }, []);

  const login = () => {
    toast.success("Redirecting to Google sign in...");
    loginApi(); // browser redirect — nothing to await, nothing to set here
  };

  const logout = async () => {
    try {
      await toast.promise(logoutApi(), {
        loading: "Signing out...",
        success: "Signed out successfully.",
        error: "Sign out failed. Please try again.",
      });
    } catch {
      // swallow — clear local state regardless, see finally below
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loader, setloader, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
