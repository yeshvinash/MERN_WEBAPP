import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return (
    <div>
      <h1 className="">Logging out...</h1>
    </div>
  );
};

export default Logout;
