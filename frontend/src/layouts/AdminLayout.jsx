import React from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const { userData, loading } = useAuth();
  const location = useLocation();

  // Show loading state until auth is determined
  if (loading) {
    return <h1>loading....</h1>;
  }

  // User is not logged in or profile not loaded: redirect to login with state for post-login redirect
  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow both `isAdmin` (camelCase) and `isadmin` (lowercase) for admin check
  const isAdmin = userData.isAdmin || userData.isadmin;

  // Not an admin user – redirect to home
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Authenticated admin user: render admin layout
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-800 text-white py-4 shadow">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <nav className="space-x-4">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/contacts"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Contacts
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
