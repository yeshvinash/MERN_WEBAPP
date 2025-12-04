import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  HelpCircle,
  Square,
  UserCheck,
  Zap,
  LifeBuoy,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Fast & Reliable",
    desc: "Our platform offers lightning-fast speeds and world-class reliability, so you’ll never miss a beat.",
    icon: <Zap color="#9333ea" size={32} strokeWidth={2.4} />,
  },
  {
    title: "Easy to Use",
    desc: "Designed with user experience in mind. Set up and get started in minutes, even if you’re a beginner.",
    icon: <CheckCircle color="#9333ea" size={32} strokeWidth={2.4} />,
  },
  {
    title: "24/7 Support",
    desc: "Our expert team is always available to help with any issue, day or night.",
    icon: <LifeBuoy color="#9333ea" size={32} strokeWidth={2.4} />,
  },
];

const testimonials = [
  {
    name: "Alex Johnson",
    feedback: "Absolutely love this! Makes my workflow so much more efficient.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Maria Wilson",
    feedback: "The support team is fantastic – fixed my problem in minutes.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Sen",
    feedback: "Onboarding was super smooth. Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
];

const faqs = [
  {
    question: "Is this platform free to use?",
    answer:
      "Yes! We offer a generous free plan with all core features. Upgrade for more power.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team 24/7 via the Contact page or chat with us live.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use top-tier encryption and frequent security audits to protect all your data.",
  },
];

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 px-6 py-16 text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
        Welcome to Our Awesome Platform
      </h1>
      <p className="text-lg md:text-2xl mb-8 max-w-xl mx-auto">
        All-in-one solution to make your life productive, effortless, and
        secure. Join thousands of happy users today!
      </p>
      <Link
        to="/register"
        className="inline-block px-8 py-3 bg-white text-purple-700 font-semibold rounded-full shadow hover:bg-purple-50 transition mb-4"
      >
        Get Started
      </Link>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/10 rounded-lg p-6 shadow-lg w-64"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const handlePrev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const handleNext = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8 text-purple-700">
        What Our Users Say
      </h2>
      <div className="mx-auto bg-white shadow-lg rounded-xl p-8 max-w-xl flex flex-col items-center">
        <img
          src={testimonials[index].avatar}
          alt={testimonials[index].name}
          className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-purple-400"
        />
        <p className="italic text-lg mb-2">"{testimonials[index].feedback}"</p>
        <div className="font-semibold mb-4 text-purple-600">
          {testimonials[index].name}
        </div>
        <div className="flex justify-center gap-3">
          <button
            aria-label="Previous testimonial"
            onClick={handlePrev}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition"
          >
            &larr;
          </button>
          <button
            aria-label="Next testimonial"
            onClick={handleNext}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-purple-200 rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <button
              className="flex w-full justify-between items-center text-lg font-semibold text-purple-800 focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-body-${idx}`}
            >
              <span>{faq.question}</span>
              <span>{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div
                className="mt-2 text-gray-700"
                id={`faq-body-${idx}`}
                role="region"
                aria-live="polite"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 2200);
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
      <div className="max-w-xl mx-auto rounded-xl bg-white/80 shadow-md p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-5">
          Want the latest updates?
        </h2>
        <form
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full md:w-3/4 px-4 py-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            type="email"
            placeholder="Your email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="px-7 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            type="submit"
            disabled={submitted}
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        {submitted && (
          <p className="text-green-600 font-semibold mt-3 animate-bounce">
            Thanks for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}

const Home = () => {
  return (
    <main>
      <HeroSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </main>
  );
};

export default Home;
