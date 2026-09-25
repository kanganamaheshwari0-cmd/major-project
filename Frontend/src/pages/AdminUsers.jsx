
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ===============================
  // FETCH ALL USERS
  // ===============================

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Users:", response.data);

      setUsers(response.data.users || []);
    } catch (error) {
      console.log(
        "Users fetch failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // BLOCK / UNBLOCK USER
  // ===============================

  const handleBlock = async (userId) => {
    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:8080/api/v1/admin/users/${userId}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Block response:", response.data);

      setMessage(response.data.message);

      fetchUsers();
    } catch (error) {
      console.log(
        "Block/unblock failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to block/unblock user"
      );
    }
  };

  // ===============================
  // DELETE USER
  // ===============================

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", response.data);

      setMessage(response.data.message);

      fetchUsers();
    } catch (error) {
      console.log(
        "Delete failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  // ===============================
  // LOAD USERS
  // ===============================

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Manage Users
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View, block, unblock or delete users.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* USERS */}

        {users.length === 0 ? (
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-8">
            <p className="text-gray-500 dark:text-gray-400">
              No users found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6"
              >

                {/* USER INFO */}

                <div className="mb-5">

                  <h2 className="text-xl font-bold">
                    {user.name}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {user.email}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Phone: {user.phone || "Not available"}
                  </p>

                </div>

                {/* ROLE + STATUS */}

                <div className="flex items-center gap-3 mb-5">

                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                    {user.role}
                  </span>

                  {user.isBlocked ? (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm">
                      Blocked
                    </span>
                  ) : (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  )}

                </div>

                {/* BUTTONS */}

                <div className="flex gap-3">

                  <button
                    onClick={() => handleBlock(user._id)}
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
                      user.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    {user.isBlocked
                      ? "Unblock"
                      : "Block"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminUsers;

