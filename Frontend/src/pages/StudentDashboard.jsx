import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH ADMIN DASHBOARD DATA
  // =========================

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Admin Dashboard:", response.data);

      setStats(response.data.stats);
    } catch (error) {
      console.log(
        "Admin dashboard fetch failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white transition-colors duration-300">

      <div className="flex">

        {/* =========================
            SIDEBAR
        ========================= */}

        <aside className="w-64 min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#0b1220] border-r border-gray-200 dark:border-gray-800 p-5">

          {/* ADMIN PROFILE */}

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">

            <div className="w-11 h-11 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white">
              A
            </div>

            <div>
              <p className="font-semibold">
                Kangana
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </p>
            </div>

          </div>

          {/* MENU */}

          <div className="space-y-2">

            {/* DASHBOARD */}

            <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 bg-purple-600 text-white px-4 py-3 rounded-lg"
            >
              <span>▣</span>
              Dashboard
            </Link>

            {/* USERS */}

            <Link
              to="/admin/users"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>👥</span>
              Users
            </Link>

            {/* JOBS */}

            <Link
              to="/jobs"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>💼</span>
              Jobs
            </Link>

            {/* APPLICATIONS */}

            <Link
              to="/admin/applications"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>▤</span>
              Applications
            </Link>

          </div>

        </aside>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="flex-1 p-8">

          {/* HEADER */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Admin Dashboard 👋
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and monitor your JobConnect platform.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* =========================
              STAT CARDS
          ========================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

            {/* TOTAL USERS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <p className="text-gray-600 dark:text-gray-400">
                Total Users
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalUsers}
              </h2>

            </div>

            {/* TOTAL STUDENTS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <p className="text-gray-600 dark:text-gray-400">
                Total Students
              </p>

              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-500 mt-2">
                {stats.totalStudents}
              </h2>

            </div>

            {/* TOTAL RECRUITERS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <p className="text-gray-600 dark:text-gray-400">
                Total Recruiters
              </p>

              <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-500 mt-2">
                {stats.totalRecruiters}
              </h2>

            </div>

            {/* TOTAL JOBS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <p className="text-gray-600 dark:text-gray-400">
                Total Jobs
              </p>

              <h2 className="text-3xl font-bold text-green-600 dark:text-green-500 mt-2">
                {stats.totalJobs}
              </h2>

            </div>

            {/* TOTAL APPLICATIONS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <p className="text-gray-600 dark:text-gray-400">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-500 mt-2">
                {stats.totalApplications}
              </h2>

            </div>

          </div>

          {/* =========================
              OVERVIEW
          ========================= */}

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              Platform Overview
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* USERS OVERVIEW */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <h3 className="text-xl font-bold mb-5">
                Users
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Students
                  </span>

                  <span className="font-semibold">
                    {stats.totalStudents}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Recruiters
                  </span>

                  <span className="font-semibold">
                    {stats.totalRecruiters}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">

                  <span className="font-semibold">
                    Total Users
                  </span>

                  <span className="font-bold">
                    {stats.totalUsers}
                  </span>

                </div>

              </div>

            </div>

            {/* JOB OVERVIEW */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6">

              <h3 className="text-xl font-bold mb-5">
                Jobs & Applications
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-600 dark:text-gray-400">
                    Total Jobs
                  </span>

                  <span className="font-semibold">
                    {stats.totalJobs}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-600 dark:text-gray-400">
                    Total Applications
                  </span>

                  <span className="font-semibold">
                    {stats.totalApplications}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;