import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ServiceCard from "./../../components/services/ServiceCard.jsx";

const Services = () => {
  const { services } = useAuth();

  const [serviceData, setServiceData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await services();
      if (!result.success) {
        throw new Error(result.error || "Unable to load services.");
      }
      setServiceData(result.data || []);
    } catch (err) {
      setServiceData([]);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }, [services]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="py-16 min-h-screen bg-gradient-to-tr from-white via-purple-50 to-blue-50">
      {/* Hero/Intro */}
      <section className="max-w-3xl mx-auto text-center px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-5">
          Our Services
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Discover all the ways we can help your business succeed. From
          development and hosting to world-class support and consulting, we have
          you covered!
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-6">
        {loading && (
          <div className="col-span-full text-center text-purple-700">
            Loading services...
          </div>
        )}

        {!loading && error && (
          <div className="col-span-full text-center text-red-500">{error}</div>
        )}

        {!loading &&
          !error &&
          serviceData.map((svc) => (
            <ServiceCard
              key={svc._id || svc.id || svc.title}
              title={svc.title}
              description={svc.description}
              icon={svc.icon}
            />
          ))}
      </section>

      {/* Call to Action */}
      <section className="max-w-2xl mx-auto mt-16 text-center px-6">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-2">
            Ready to take the next step?
          </h3>
          <p className="mb-5">
            Contact us today for a free consultation or to learn more about how
            our services can empower your business.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-lg bg-white text-purple-700 font-semibold shadow hover:bg-purple-100 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
