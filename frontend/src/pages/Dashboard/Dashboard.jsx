import React from "react";

const dashboardSections = [
  {
    title: "Welcome Back!",
    desc: "Access your latest stats, manage projects, and reach your goals with ease. Your dashboard gives you insights and control all in one place.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeWidth="2" d="M8 12l2 2 4-4" />
      </svg>
    ),
    bg: "bg-gradient-to-tr from-indigo-600 to-purple-500 text-white",
  },
  {
    title: "Quick Stats",
    desc: "Overview of your performance for this month. Check your key metrics at a glance.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="12" width="4" height="8" rx="1" strokeWidth="2" />
        <rect x="10" y="8" width="4" height="12" rx="1" strokeWidth="2" />
        <rect x="16" y="4" width="4" height="16" rx="1" strokeWidth="2" />
      </svg>
    ),
    stats: [
      { label: "Tasks", value: 8 },
      { label: "Projects", value: 3 },
      { label: "Messages", value: 12 },
      { label: "Active Days", value: 21 },
    ],
    bg: "bg-white",
  },
  {
    title: "Recent Activity",
    desc: "Stay up to date with your most recent actions and notifications.",
    activities: [
      "Completed 'Deploy v2.1' on Project Alpha",
      "Messaged Olivia about UI review",
      "Added new teammates to Project Beta",
      "Marked 'Update Docs' as done",
    ],
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="2"
          d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
        />
      </svg>
    ),
    bg: "bg-gray-50",
  },
  {
    title: "Get Inspired!",
    desc: "“Success is the sum of small efforts, repeated day-in and day-out.” — Robert Collier",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeWidth="2" d="M12 2v20M2 12h20" />
      </svg>
    ),
    bg: "bg-gradient-to-tr from-orange-400 to-pink-400 text-white",
  },
];

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-slate-100 px-4 py-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          <span>D</span>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">Your personalized workspace</p>
        </div>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardSections.map((section, idx) => (
          <section
            key={idx}
            className={`rounded-xl shadow group transition hover:-translate-y-1 ${section.bg} p-6 min-h-[210px] flex flex-col justify-between`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-lg shadow-inner group-hover:scale-110 transition`}
              >
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 dark:text-slate-300 dark:group-hover:text-white">
                  {section.desc}
                </p>
              </div>
            </div>
            {/* Stats Section */}
            {section.stats && (
              <div className="flex mt-6 gap-4 flex-wrap">
                {section.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center bg-slate-200 rounded px-3 py-2 mr-2 mb-2 min-w-[70px]"
                  >
                    <span className="font-semibold text-xl text-indigo-600">
                      {stat.value}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* Activities Section */}
            {section.activities && (
              <ul className="list-disc ml-7 mt-4 space-y-1 text-slate-700 text-[15px]">
                {section.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {/* Unique Profile Quick View */}
        <section className="rounded-xl shadow bg-white border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[210px]">
          <div className="mb-3">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=user"
              alt="user avatar"
              className="w-16 h-16 rounded-full border-4 border-indigo-400 shadow"
            />
          </div>
          <h2 className="font-bold text-lg">Alex Morgan</h2>
          <p className="text-xs text-slate-500 mb-3">Product Designer</p>
          <button className="mt-auto px-4 py-1 bg-indigo-500 text-white rounded-full font-medium text-sm hover:bg-indigo-600 transition">
            View Profile
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
