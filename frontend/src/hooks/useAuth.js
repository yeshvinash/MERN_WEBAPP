import { useContext } from "react";
import { AuthContext } from "../context/authContext";

/**
 * Custom hook for accessing authentication context.
 * Usage: const { user, login, logout, loading } = useAuth();
 */
const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
// const useAuth = () => useContext(AuthContext);

export default useAuth;
