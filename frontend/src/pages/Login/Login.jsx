import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // show error messages
  const [loading, setLoading] = useState(false); // loading state
  const [password, setPassword] = useState(true); // toggle the eyeicon
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fake validation
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      setMessage("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await login(form);
      console.log(`response from login`, response);
      if (response.success) {
        toast.success("Login successful!");
        // alert("Login successful!");
        setMessage("Login successful!");
        setForm({ email: "", password: "" });

        // Optional: redirect to login after 2s
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(response?.extraDetails);
        toast.error(response?.error?.message);
        response?.extraDetails.length
          ? toast.error(response?.extraDetails)
          : toast.error(response?.error);

        setMessage(response?.error || "Login failed. Try again.");
      }
    } catch (error) {
      setMessage("Network/server error. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = (e) => {
    console.log(e);
    setPassword(!password);
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Welcome Back
        </h1>
        {message && (
          <p
            className={`text-center ${
              message === "Login successful!"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
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
            disabled={loading}
            autoComplete="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className=" flex flex-col gap-2">
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
              disabled={loading}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="px-4  py-2 pe-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute top-1/2 -translate-y-1/2 right-1"
            >
              {password ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
        >
          Login
        </button>
        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
