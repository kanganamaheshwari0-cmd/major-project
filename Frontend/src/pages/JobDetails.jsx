import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applied, setApplied] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // FETCH JOB DETAILS
  // =========================

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8080/api/v1/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Job Details:", response.data);

        setJob(response.data.job);
      } catch (error) {
        console.log(
          "Job fetch failed:",
          error.response?.data?.message || error.message
        );

        setError(
          error.response?.data?.message || "Job not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // =========================
  // APPLY FOR JOB
  // =========================

  const handleApply = async () => {
    try {
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8080/api/v1/application/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Application response:",
        response.data
      );

      setApplied(true);

      setMessage("Job applied successfully!");

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Application failed"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading job...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error && !job) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">

          <p className="text-red-500 text-xl mb-5">
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/student-dashboard")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            ← Back to Jobs
          </button>

        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8">

      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}

        <button
          onClick={() =>
            navigate("/student-dashboard")
          }
          className="mb-6 px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition"
        >
          ← Back to Jobs
        </button>

        {/* JOB CARD */}

        <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">

          {/* HEADER */}

          <div className="flex items-start justify-between gap-5 mb-6">

            <div>

              <h1 className="text-3xl font-bold">
                {job.title}
              </h1>

              <p className="text-blue-600 dark:text-blue-400 text-lg mt-2">
                {job.company}
              </p>

            </div>

            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
              {job.employment}
            </span>

          </div>

          {/* DESCRIPTION */}

          <div className="mb-8">

            <h2 className="text-xl font-semibold mb-3">
              Job Description
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              {job.description}
            </p>

          </div>

          {/* JOB INFORMATION */}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">

            <h2 className="text-xl font-semibold mb-5">
              Job Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {/* COMPANY */}

              <div className="bg-white dark:bg-[#020712] p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Company
                </p>

                <p className="font-semibold mt-1">
                  {job.company}
                </p>
              </div>

              {/* LOCATION */}

              <div className="bg-white dark:bg-[#020712] p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="font-semibold mt-1">
                  📍 {job.location}
                </p>
              </div>

              {/* SALARY */}

              <div className="bg-white dark:bg-[#020712] p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Salary
                </p>

                <p className="font-semibold mt-1">
                  ₹{job.salary}
                </p>
              </div>

              {/* EMPLOYMENT */}

              <div className="bg-white dark:bg-[#020712] p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Employment Type
                </p>

                <p className="font-semibold mt-1">
                  {job.employment}
                </p>
              </div>

              {/* STATUS */}

              <div className="bg-white dark:bg-[#020712] p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="font-semibold mt-1">
                  {job.status}
                </p>
              </div>

            </div>

          </div>

          {/* SKILLS */}

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">

            <h2 className="text-xl font-semibold mb-4">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {job.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* SUCCESS MESSAGE */}

          {message && (
            <div className="mt-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              {message}
            </div>
          )}

          {/* ERROR MESSAGE */}

          {error && (
            <div className="mt-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* APPLY BUTTON */}

          <button
            onClick={handleApply}
            disabled={applied}
            className={`w-full mt-8 py-4 rounded-xl font-semibold text-white text-lg transition ${
              applied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {applied
              ? "✓ Applied"
              : "Apply Now"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;