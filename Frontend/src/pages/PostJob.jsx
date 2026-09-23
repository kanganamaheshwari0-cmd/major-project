import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    employment: "Full Time",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/v1/job",
        {
          title: formData.title,
          description: formData.description,
          company: formData.company,
          location: formData.location,
          salary: Number(formData.salary),
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          employment: formData.employment,
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Job created:", response.data);

      alert("Job posted successfully!");

      navigate("/recruiter-dashboard");
    } catch (error) {
      console.log(
        "Job creation failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to create job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8 transition-colors duration-300">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Post New Job
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create a new job opportunity for students.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-7 space-y-5"
        >

          {/* TITLE */}
          <div>
            <label className="block font-semibold mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. React Developer"
              required
              className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job..."
              rows="5"
              required
              className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* COMPANY + LOCATION */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold mb-2">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Tech Solutions"
                required
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bhopal"
                required
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* SALARY */}
          <div>
            <label className="block font-semibold mb-2">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 800000"
              required
              className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* SKILLS */}
          <div>
            <label className="block font-semibold mb-2">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, JavaScript, HTML, CSS"
              required
              className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Separate skills using commas.
            </p>
          </div>

          {/* EMPLOYMENT + STATUS */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold mb-2">
                Employment Type
              </label>

              <select
                name="employment"
                value={formData.employment}
                onChange={handleChange}
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter-dashboard")
              }
              className="flex-1 border border-gray-300 dark:border-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default PostJob;