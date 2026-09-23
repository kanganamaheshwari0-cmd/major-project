
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav
      className={`w-full h-20 border-b flex items-center justify-between px-7 transition-colors duration-300 ${
        darkMode
          ? "bg-[#020617] border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* LEFT SIDE */}
      <Link to="/home" className="flex items-center gap-3">
        {/* LOGO */}
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            JC
          </span>
        </div>

        {/* BRAND */}
        <span className="text-blue-500 text-2xl font-bold">
          JobConnect
        </span>
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* THEME BUTTON */}
        <button
          type="button"
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition ${
            darkMode
              ? "bg-[#1e293b] hover:bg-[#334155]"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {isLoggedIn ? (
          <>
            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}
            <Link
              to="/login"
              className={`px-5 py-3 border rounded-xl font-semibold transition ${
                darkMode
                  ? "border-gray-700 text-white hover:bg-[#111827]"
                  : "border-gray-300 text-gray-800 hover:bg-gray-100"
              }`}
            >
              Log In
            </Link>

            {/* SIGN UP */}
            <Link
              to="/register"
              className="px-5 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

