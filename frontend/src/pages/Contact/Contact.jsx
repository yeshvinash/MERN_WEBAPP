import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, userData, fetchUserData, contact } = useAuth();
  const isAuthenticated = Boolean(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (!userData) {
      fetchUserData();
      return;
    }

    setForm((prev) => ({
      ...prev,
      name: userData?.name || "",
      email: userData?.email || "",
    }));
  }, [isAuthenticated, userData, fetchUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("Please log in before contacting us.");
      return;
    }

    if (!form.name || !form.email || !form.message) {
      toast.error("All fields are required.");
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await contact(form);

      if (!result.success) {
        toast.error(result?.extraDetails);
        // toast.error(result?.error?.message);
        throw new Error(result.error || "Unable to submit message.");
      }
      // toast.error(result.data.error || result.data.message);
      setSubmitted(true);
      setForm({
        name: userData?.name || "",
        email: userData?.email || "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-blue-100 py-16 px-4">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 md:p-14 max-w-lg w-full text-center space-y-6">
          <h1 className="text-3xl font-extrabold text-purple-700 drop-shadow">
            Contact Us
          </h1>
          <p className="text-gray-600">
            Please log in to send us a message. This helps us respond to you
            faster and keep spam away.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-2 text-white font-semibold shadow hover:bg-purple-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-blue-100 py-16 px-4">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 md:p-14 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-3 text-center drop-shadow">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Have a question or feedback? Fill out the form and our team will get
          back to you soon.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block font-semibold text-gray-700 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition bg-white/90"
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block font-semibold text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition bg-white/90"
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block font-semibold text-gray-700 mb-1"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition bg-white/90 resize-none"
              id="message"
              name="message"
              rows={4}
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-red-500 font-medium text-sm mt-2">{error}</p>
          )}
          {submitted && (
            <p className="text-green-600 font-semibold text-center animate-pulse mb-2">
              Thank you for reaching out! We will be in touch soon.
            </p>
          )}
          <button
            type="submit"
            className={`w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg shadow transition hover:shadow-xl hover:from-purple-700 hover:to-pink-600 disabled:opacity-50`}
            disabled={loading || submitted}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
