import { useContext } from "react";
import { AuthContext } from "../auth.context";
//humme yaahan simply saare system ko isse jo bhi possible data hain ya unhe change karne ki shamta deeni hain

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context; // { user, setUser, loader, setloader, login, logout }
};