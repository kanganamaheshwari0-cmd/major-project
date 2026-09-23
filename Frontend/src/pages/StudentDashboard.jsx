import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/v1/job",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data.jobs);
    } catch (error) {
      console.log(
        "Jobs fetch failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // Fetch My Applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/v1/application/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppliedJobs(response.data.applications || []);
    } catch (error) {
      console.log(
        "Applications fetch failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Load Dashboard
  useEffect(() => {
    const loadDashboard = async () => {
      await Promise.all([
        fetchJobs(),
        fetchApplications(),
      ]);

      setLoading(false);
    };

    loadDashboard();
  }, []);

  // Apply for Job
  const handleApply = async (jobId) => {
    try {
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8080/api/v1/application/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Application:", response.data);

      setMessage("Job applied successfully!");

      fetchApplications();
    } catch (error) {
      console.log(
        "Application failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Application failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center transition-colors duration-300">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white transition-colors duration-300">

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-64 min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#0b1220] border-r border-gray-200 dark:border-gray-800 p-5 transition-colors duration-300">

          {/* Profile */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">

            <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
              K
            </div>

            <div>
              <p className="font-semibold">
                Kangana
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Student
              </p>
            </div>

          </div>

          {/* MENU */}
          <div className="space-y-2">

            <Link
              to="/student-dashboard"
              className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              <span>▣</span>
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>⌕</span>
              Find Jobs
            </Link>

            <Link
              to="/my-applications"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>▤</span>
              Applications
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>◯</span>
              Profile
            </Link>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">

          {/* HEADER */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Good Morning, Kangana! 👋
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here’s what's happening with your job search.
            </p>

          </div>

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6">
              {message}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

            {/* Available Jobs */}
            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">

              <p className="text-gray-600 dark:text-gray-400">
                Available Jobs
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {jobs.length}
              </h2>

            </div>

            {/* Applied Jobs */}
            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">

              <p className="text-gray-600 dark:text-gray-400">
                Applied Jobs
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {appliedJobs.length}
              </h2>

            </div>

            {/* Profile Status */}
            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">

              <p className="text-gray-600 dark:text-gray-400">
                Profile Status
              </p>

              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-500 mt-2">
                Active
              </h2>

            </div>

          </div>

          {/* RECOMMENDED JOBS */}
          <div>

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold">
                Recommended Jobs
              </h2>

              <Link
                to="/jobs"
                className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
              >
                View All
              </Link>

            </div>

            {jobs.length === 0 ? (

              <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-8">

                <p className="text-gray-600 dark:text-gray-400">
                  No available jobs.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-5">

                {jobs.slice(0, 4).map((job) => {

                  const isApplied = appliedJobs.some(
                    (application) =>
                      application.job?._id === job._id
                  );

                  return (
                    <div
                      key={job._id}
                      className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-600 transition-colors duration-300"
                    >

                      {/* Job Header */}
                      <div className="flex justify-between items-start mb-4">

                        <div>

                          <h3 className="text-xl font-bold">
                            {job.title}
                          </h3>

                          <p className="text-blue-600 dark:text-blue-500 mt-1">
                            {job.company}
                          </p>

                        </div>

                        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full">
                          {job.employment}
                        </span>

                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-5">
                        {job.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">

                        <p>
                          📍 {job.location}
                        </p>

                        <p>
                          💰 ₹{job.salary}
                        </p>

                        <p>
                          🛠️ {job.skills?.join(", ")}
                        </p>

                      </div>

                      {/* Apply */}
                      <button
                        onClick={() => handleApply(job._id)}
                        disabled={isApplied}
                        className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                          isApplied
                            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {isApplied
                          ? "Applied"
                          : "Apply Now"}
                      </button>

                    </div>
                  );
                })}

              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default StudentDashboard;