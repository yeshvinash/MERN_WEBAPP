import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  About,
  Home,
  NotFound,
  Services,
  Contact,
  Login,
  Logout,
  Register,
} from "./pages";
import Header from "./components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AdminLayout from "./layouts/AdminLayout";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import AdminContacts from "./pages/AdminContacts/AdminContacts";
import AdminUserUpdate from "./pages/AdminUserUpdate/AdminUserUpdate";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="users"
              element={
                <AdminProtectedRoute>
                  <AdminUsers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="users/update/:id"
              element={
                <AdminProtectedRoute>
                  <AdminUserUpdate />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <AdminProtectedRoute>
                  <AdminContacts />
                </AdminProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
