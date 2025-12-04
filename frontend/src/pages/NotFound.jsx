import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl px-8 py-12 flex flex-col items-center max-w-md w-full">
        <svg
          className="w-24 h-24 text-purple-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="#a78bfa"
            strokeWidth="4"
            fill="#f5f3ff"
          />
          <text
            x="24"
            y="32"
            textAnchor="middle"
            fontSize="20"
            fill="#a78bfa"
            fontWeight="bold"
          >
            404
          </text>
        </svg>
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4 text-center drop-shadow">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-base mb-8 text-center">
          Sorry, the page you're looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg shadow transition hover:from-purple-700 hover:to-pink-600"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
};
