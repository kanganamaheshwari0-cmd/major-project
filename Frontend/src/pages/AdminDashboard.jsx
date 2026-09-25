
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // FETCH ADMIN DASHBOARD
  // ===============================

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
        "Admin dashboard failed:",
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

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white">

      <div className="flex min-h-screen">

        {/* ===============================
            SIDEBAR
        =============================== */}

        <aside className="w-64 bg-gray-50 dark:bg-[#0b1220] border-r border-gray-200 dark:border-gray-800 p-5">

          {/* LOGO */}

          <div className="mb-10">
            <h1 className="text-2xl font-bold text-blue-600">
              JobConnect
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Admin Panel
            </p>
          </div>

          {/* MENU */}

          <div className="space-y-2">

            {/* DASHBOARD */}

            <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg"
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
              Manage Users
            </Link>

            {/* JOBS */}

            <Link
              to="/admin/jobs"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>💼</span>
              Manage Jobs
            </Link>

            {/* APPLICATIONS */}

            <Link
              to="/admin/applications"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111827] px-4 py-3 rounded-lg transition"
            >
              <span>📄</span>
              Applications
            </Link>

          </div>

          {/* LOGOUT */}

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-3 rounded-lg transition"
            >
              <span>↪</span>
              Logout
            </button>

          </div>

        </aside>

        {/* ===============================
            MAIN CONTENT
        =============================== */}

        <main className="flex-1 p-8">

          {/* HEADER */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and monitor JobConnect.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* ===============================
              STATS
          =============================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* TOTAL USERS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

              <p className="text-gray-500 dark:text-gray-400">
                Total Users
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.totalUsers}
              </h2>

            </div>

            {/* STUDENTS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

              <p className="text-gray-500 dark:text-gray-400">
                Students
              </p>

              <h2 className="text-4xl font-bold mt-2 text-blue-600">
                {stats.totalStudents}
              </h2>

            </div>

            {/* RECRUITERS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

              <p className="text-gray-500 dark:text-gray-400">
                Recruiters
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-600">
                {stats.totalRecruiters}
              </h2>

            </div>

            {/* TOTAL JOBS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

              <p className="text-gray-500 dark:text-gray-400">
                Total Jobs
              </p>

              <h2 className="text-4xl font-bold mt-2 text-purple-600">
                {stats.totalJobs}
              </h2>

            </div>

            {/* TOTAL APPLICATIONS */}

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

              <p className="text-gray-500 dark:text-gray-400">
                Total Applications
              </p>

              <h2 className="text-4xl font-bold mt-2 text-orange-600">
                {stats.totalApplications}
              </h2>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;

