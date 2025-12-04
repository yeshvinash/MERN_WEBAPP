import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();

  // Get register function and loading state from useAuth
  const { register, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage(""); // Clear previous messages on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all the details!");
      return;
    }
    setLocalLoading(true);
    setMessage("");
    try {
      const response = await register(form);
      console.log(`response from server`, response);
      console.log(`response.error`, response.error);
      // console.log(
      //   `response?.extraDetails.length`,
      //   response?.extraDetails.length
      // );
      // The register function from useAuth should return a result or throw on error
      // Optionally, you can handle the expected shape of response here; adapt as needed
      if (response && !response.error) {
        toast.success("Registration successful!");
        // alert("Registration successful!");
        setMessage("Registration successful!");
        setForm({
          name: "",
          email: "",
          password: "",
        });
        // Optional: redirect to login after 2s
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        response?.extraDetails.length
          ? toast.error(response?.extraDetails)
          : toast.error(response?.error);

        setMessage(response?.error || "Registration failed. Try again.");
      }
    } catch (error) {
      setMessage("Network/server error. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Prefer useAuth loading if available, but fall back to local in case
  const isLoading = loading || localLoading;

  return (
    <div className="py-10 min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Create Account
        </h1>
        {message && (
          <p
            className={`text-center ${
              message === "Registration successful!"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={isLoading}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={isLoading}
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="flex flex-col relative">
            <input
              type={password ? "password" : "text"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="px-4 py-2 pe-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={isLoading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setPassword(!password)}
              className="absolute top-1/2 -translate-y-1/2 right-1"
            >
              {password ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-4 bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
