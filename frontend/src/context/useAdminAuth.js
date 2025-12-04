import { useContext } from "react";
import { AuthContext } from "./authContext";

const useAdminAuth = () => {
  const { userData, loading } = useContext(AuthContext);

  // Allow both isAdmin (camelCase) and isadmin (lowercase) for admin check
  const isAdmin = userData?.isAdmin || userData?.isadmin;

  return {
    userData,
    loading,
    isAdmin: !!isAdmin,
  };
};

export default useAdminAuth;
