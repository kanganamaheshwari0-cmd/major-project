
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    about: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  // ===============================
  // GET PROFILE
  // ===============================
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data.user;

      setUser(userData);

      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        about: userData.about || "",
        skills: userData.skills
          ? userData.skills.join(", ")
          : "",
        github: userData.github || "",
        linkedin: userData.linkedin || "",
        portfolio: userData.portfolio || "",
      });

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
    } catch (error) {
      console.log(
        "Profile fetch failed:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // LOAD PROFILE
  // ===============================
  useEffect(() => {
    fetchProfile();
  }, []);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // UPDATE PROFILE
  // ===============================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        about: formData.about,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
      };

      const response = await axios.patch(
        "http://localhost:8080/api/v1/auth/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setSuccess("Profile updated successfully!");

      setEditMode(false);

    } catch (error) {
      console.log(
        "Profile update failed:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================
  if (error && !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">
          {error}
        </p>

        <button
          onClick={fetchProfile}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8 transition-colors duration-300">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your account information.
            </p>
          </div>

          {!editMode && (
            <button
              onClick={() => {
                setSuccess("");
                setError("");
                setEditMode(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Edit Profile
            </button>
          )}

        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mb-5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl p-4">
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && user && (
          <div className="mb-5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* PROFILE CARD */}
        <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-8">

          {/* PROFILE TOP */}
          <div className="flex items-center gap-5 mb-8">

            {/* PROFILE ICON */}
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">

              <span className="text-3xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>

            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name || "User"}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {user?.email || "No email"}
              </p>
            </div>

          </div>

          {!editMode ? (

            /* ===============================
               VIEW MODE
            =============================== */

            <div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* NAME */}
                <div className="bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    {user?.name || "N/A"}
                  </p>

                </div>

                {/* EMAIL */}
                <div className="bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Email
                  </p>

                  <p className="font-semibold break-all">
                    {user?.email || "N/A"}
                  </p>

                </div>

                {/* ROLE */}
                <div className="bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Role
                  </p>

                  <p className="font-semibold text-blue-600 dark:text-blue-500">
                    {user?.role || "student"}
                  </p>

                </div>

                {/* PHONE */}
                <div className="bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {user?.phone || "Not added"}
                  </p>

                </div>

                {/* ABOUT */}
                <div className="md:col-span-2 bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    About
                  </p>

                  <p className="font-semibold">
                    {user?.about || "Not added"}
                  </p>

                </div>

                {/* SKILLS */}
                <div className="md:col-span-2 bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Skills
                  </p>

                  {user?.skills?.length > 0 ? (

                    <div className="flex flex-wrap gap-2">

                      {user.skills.map((skill, index) => (

                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  ) : (
                    <p className="font-semibold">
                      Not added
                    </p>
                  )}

                </div>

                {/* GITHUB */}
                <div className="bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    GitHub
                  </p>

                  <p className="font-semibold break-all">
                    {user?.github || "Not added"}
                  </p>

                </div>

                {/* LINKEDIN */}
                <div className="bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    LinkedIn
                  </p>

                  <p className="font-semibold break-all">
                    {user?.linkedin || "Not added"}
                  </p>

                </div>

                {/* PORTFOLIO */}
                <div className="md:col-span-2 bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Portfolio
                  </p>

                  <p className="font-semibold break-all">
                    {user?.portfolio || "Not added"}
                  </p>

                </div>

                {/* STATUS */}
                <div className="md:col-span-2 bg-white dark:bg-[#020712] border border-gray-200 dark:border-gray-700 rounded-xl p-5">

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Account Status
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user?.isBlocked
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    }`}
                  >
                    {user?.isBlocked
                      ? "Blocked"
                      : "Active"}
                  </span>

                </div>

              </div>

            </div>

          ) : (

            /* ===============================
               EDIT MODE
            =============================== */

            <form
              onSubmit={handleUpdate}
              className="space-y-6"
            >

              {/* NAME */}
              <div>
                <label className="block mb-2 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block mb-2 font-semibold">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ABOUT */}
              <div>
                <label className="block mb-2 font-semibold">
                  About
                </label>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell something about yourself..."
                />
              </div>

              {/* SKILLS */}
              <div>
                <label className="block mb-2 font-semibold">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, JavaScript"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Enter skills separated by commas.
                </p>
              </div>

              {/* GITHUB */}
              <div>
                <label className="block mb-2 font-semibold">
                  GitHub
                </label>

                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="GitHub profile URL"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LINKEDIN */}
              <div>
                <label className="block mb-2 font-semibold">
                  LinkedIn
                </label>

                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PORTFOLIO */}
              <div>
                <label className="block mb-2 font-semibold">
                  Portfolio
                </label>

                <input
                  type="text"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="Portfolio URL"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-3">

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;

