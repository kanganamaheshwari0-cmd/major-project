
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ===============================
  // FETCH ALL JOBS
  // ===============================

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

      console.log("Admin Jobs:", response.data);

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.log(
        "Jobs fetch failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE JOB
  // ===============================

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:8080/api/v1/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete job:", response.data);

      setMessage(response.data.message);

      fetchJobs();
    } catch (error) {
      console.log(
        "Job delete failed:",
        error.response?.data?.message || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  // ===============================
  // LOAD JOBS
  // ===============================

  useEffect(() => {
    fetchJobs();
  }, []);

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading jobs...
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
            Manage Jobs
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage all jobs posted on JobConnect.
          </p>
        </div>

        {/* SUCCESS */}

        {message && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* JOB LIST */}

        {jobs.length === 0 ? (
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-8">
            <p className="text-gray-500 dark:text-gray-400">
              No jobs found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6"
              >

                {/* JOB HEADER */}

                <div className="flex justify-between items-start mb-4">

                  <div>
                    <h2 className="text-xl font-bold">
                      {job.title}
                    </h2>

                    <p className="text-blue-600 dark:text-blue-500 mt-1">
                      {job.company}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>

                </div>

                {/* DESCRIPTION */}

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {job.description}
                </p>

                {/* DETAILS */}

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

                  <p>
                    💼 {job.employment}
                  </p>

                  {job.createdBy && (
                    <p>
                      👤 Posted by:{" "}
                      {job.createdBy.name}
                    </p>
                  )}

                </div>

                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDelete(job._id)
                  }
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Delete Job
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminJobs;

