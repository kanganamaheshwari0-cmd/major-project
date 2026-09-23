import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          fullName,
          email,
          password,
          role,
        }
      );

      console.log("Register response:", response.data);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.log(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-gray-900 dark:text-white flex items-center justify-center px-6 py-12 transition-colors duration-300">

      {/* Register Card */}
      <div className="w-full max-w-xl bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl transition-colors duration-300">

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join JobConnect as a student or recruiter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ROLE */}
          <div>
            <label className="block font-semibold mb-2">
              I am a
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors duration-300"
            >
              <option value="student">
                Student / Job Seeker
              </option>

              <option value="recruiter">
                Recruiter
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          {/* FULL NAME */}
          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 transition-colors duration-300"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 transition-colors duration-300"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 transition-colors duration-300"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 transition-colors duration-300"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-500 ml-1 hover:text-blue-700 dark:hover:text-blue-400 hover:underline"
          >
            Log in
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;