import { Navigate } from "react-router-dom";
import useAdminAuth from "../context/useAdminAuth";
import { useEffect } from "react";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      return <Navigate to="/" />;
    }
  }, [isAdmin, loading]);
  return loading ? <div>Loading...</div> : isAdmin ? children : null;
}
