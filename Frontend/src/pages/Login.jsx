
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user data
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Login successful!");

      navigate("/home");
    } catch (error) {
      console.log(
        "Login failed:",
        error.response?.data?.message || error.message
      );

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020712] text-white flex items-center justify-center px-4">

      <div className="w-full max-w-[520px] bg-[#111827] border border-[#263246] rounded-2xl p-7 shadow-2xl">

        {/* HEADING */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white">
            Welcome back
          </h1>

          <p className="text-[#8fa3c0] mt-2">
            Log in to continue to JobConnect.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-white mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111827] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#7184a1] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-white mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#111827] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#7184a1] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>

        </form>

        {/* DIVIDER */}
        <div className="border-t border-[#263246] my-6"></div>

        {/* DEMO ACCOUNTS */}
        <div>
          <p className="text-sm text-[#8fa3c0] mb-3">
            Demo accounts (password: demo123)
          </p>

          <div className="flex gap-3 flex-wrap">

            <button
              type="button"
              onClick={() =>
                setEmail("student@example.com")
              }
              className="bg-[#1e293b] hover:bg-[#263449] text-[#cbd5e1] px-4 py-2 rounded-full text-sm"
            >
              Student
            </button>

            <button
              type="button"
              onClick={() =>
                setEmail("recruiter@example.com")
              }
              className="bg-[#1e293b] hover:bg-[#263449] text-[#cbd5e1] px-4 py-2 rounded-full text-sm"
            >
              Recruiter
            </button>

            <button
              type="button"
              onClick={() =>
                setEmail("admin@example.com")
              }
              className="bg-[#1e293b] hover:bg-[#263449] text-[#cbd5e1] px-4 py-2 rounded-full text-sm"
            >
              Admin
            </button>

          </div>
        </div>

        {/* REGISTER */}
        <p className="text-center text-[#8fa3c0] mt-7">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;


