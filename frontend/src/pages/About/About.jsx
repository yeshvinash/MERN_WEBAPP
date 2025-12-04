import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// Core values and team info
const coreValues = [
  {
    title: "Innovation",
    description:
      "We leverage the latest technology to create solutions that keep you ahead.",
  },
  {
    title: "Customer Focus",
    description:
      "Your goals drive every decision. We listen, adapt, and deliver for you.",
  },
  {
    title: "Integrity",
    description:
      "We believe in openness and honesty in all our interactions and processes.",
  },
];

const teamMembers = [
  {
    name: "Priya Sharma",
    position: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Lee",
    position: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Sophia Turner",
    position: "Customer Success",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const About = () => {
  const { userData, fetchUserData, loading } = useAuth();

  // On initial mount, fetch user data if not present yet
  useEffect(() => {
    // It's important not to call fetchUserData repeatedly:
    // Only call if NOT loading and no userData is present
    if (!userData && !loading) {
      fetchUserData();
    }
    // We only want to call on mount, or if loading flips to false, so that fetchUserData is only called once.
    // eslint-disable-next-line
  }, [userData, loading, fetchUserData]);

  return (
    <main className="flex flex-col gap-16 py-12 bg-gradient-to-tr from-purple-50 via-white to-blue-50 min-h-screen">
      {/* Hero/About Intro */}
      <section className="px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4">
          About Us {userData && userData.name ? userData.name : ""}
        </h1>
        <span>{userData && userData?.isAdmin}</span>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Our mission is to empower everyone with simple, reliable solutions for
          everyday productivity and peace of mind.
        </p>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Team working"
          className="w-full max-w-2xl rounded-xl mx-auto shadow-lg"
        />
      </section>

      {/* Core Values */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-8 text-center">
          Our Core Values
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {coreValues.map((val) => (
            <div
              key={val.title}
              className="bg-white rounded-lg shadow hover:shadow-xl transition p-6 flex-1 text-center border-t-4 border-purple-400"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {val.title}
              </h3>
              <p className="text-gray-700">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-white rounded-xl shadow p-6 w-60 hover:shadow-lg transition"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-purple-200 mb-4"
              />
              <h4 className="text-lg font-bold text-purple-700 mb-1">
                {member.name}
              </h4>
              <span className="text-sm text-gray-600">{member.position}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-xl mx-auto text-center px-6">
        <div className="bg-purple-600 rounded-xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Join Our Journey</h3>
          <p className="mb-5 text-purple-100">
            We’re building something amazing—and would love for you to be part
            of it. Whether you’re a user, contributor, or enthusiast, your story
            matters to us!
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

export default About;
