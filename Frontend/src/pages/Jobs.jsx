import React, { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all jobs
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

      setJobs(response.data.jobs || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch jobs"
      );
    }
  };

  // Fetch user's already applied jobs
  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/v1/application/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "My Applications:",
        response.data
      );

      const applications =
        response.data.applications || [];

      const jobIds = applications
        .filter((application) => application.job)
        .map((application) => application.job._id);

      setAppliedJobs(jobIds);
    } catch (error) {
      console.log(
        "Applications fetch failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Load jobs + applications
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchJobs(),
        fetchMyApplications(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // Apply for job
  const handleApply = async (jobId) => {
    try {
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8080/api/v1/application/${jobId}`,
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

      setMessage("Job applied successfully!");

      // Immediately update button
      setAppliedJobs((prev) => [
        ...prev,
        jobId,
      ]);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Application failed"
      );
    }
  };

  // Loading
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
            Find Jobs
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore available opportunities and find your next role.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* NO JOBS */}
        {jobs.length === 0 ? (

          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              No jobs available.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {jobs.map((job) => {

              const isApplied =
                appliedJobs.includes(job._id);

              return (
                <div
                  key={job._id}
                  className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl hover:border-blue-500 transition"
                >

                  {/* TITLE */}
                  <div className="flex items-start justify-between gap-4 mb-4">

                    <div>
                      <h2 className="text-xl font-bold">
                        {job.title}
                      </h2>

                      <p className="text-blue-600 dark:text-blue-500 mt-1">
                        {job.company}
                      </p>
                    </div>

                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full">
                      {job.employment}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 dark:text-gray-400 mb-5">
                    {job.description}
                  </p>

                  {/* DETAILS */}
                  <div className="space-y-3 text-sm">

                    <p>
                      📍 <strong>Location:</strong>{" "}
                      {job.location}
                    </p>

                    <p>
                      💰 <strong>Salary:</strong>{" "}
                      ₹{job.salary}
                    </p>

                    <p>
                      📌 <strong>Status:</strong>{" "}
                      {job.status}
                    </p>

                    <p>
                      🛠️ <strong>Skills:</strong>{" "}
                      {job.skills?.join(", ")}
                    </p>

                  </div>

                  {/* APPLY BUTTON */}
                  <button
                    onClick={() =>
                      handleApply(job._id)
                    }
                    disabled={isApplied}
                    className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition ${
                      isApplied
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isApplied
                      ? "Applied"
                      : "Apply Now"}
                  </button>

                </div>
              );
            })}

          </div>

        )}

      </div>
    </div>
  );
};

export default Jobs;