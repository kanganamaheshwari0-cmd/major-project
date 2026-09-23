import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#020712] dark:text-white transition-colors duration-300">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">

        {/* Small Badge */}
        <div className="bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-500 px-5 py-2 rounded-full mb-8 transition-colors duration-300">
          Frontend demo — connected to backend
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
          Find your next role on
          <span className="block text-blue-600">
            JobConnect
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mt-6 transition-colors duration-300">
          A complete job & career platform for students, recruiters,
          and admins — search jobs, track applications, manage
          postings, and more.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">

          <button
            onClick={() => {
              window.location.href = "/jobs";
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold"
          >
            Get Started
          </button>

          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:border-blue-500 px-7 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Log In
          </button>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Student */}
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-7 transition-colors duration-300">

            <div className="text-3xl mb-5">
              🎓
            </div>

            <h2 className="text-xl font-bold mb-3">
              For Students
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              Search, filter, and apply to jobs.
              Track every application.
            </p>

          </div>

          {/* Recruiter */}
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-7 transition-colors duration-300">

            <div className="text-3xl mb-5">
              🏢
            </div>

            <h2 className="text-xl font-bold mb-3">
              For Recruiters
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              Post jobs and manage applicants
              from one dashboard.
            </p>

          </div>

          {/* Admin */}
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-7 transition-colors duration-300">

            <div className="text-3xl mb-5">
              🛡️
            </div>

            <h2 className="text-xl font-bold mb-3">
              For Admins
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              Oversee users, recruiters, jobs,
              and platform activity.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;