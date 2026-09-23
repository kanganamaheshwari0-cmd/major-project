import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState("");

  // FETCH JOBS
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

      console.log("Recruiter Jobs:", response.data);

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.log(
        "Jobs fetch failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // DELETE JOB
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(jobId);

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:8080/api/v1/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", response.data);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );

      alert("Job deleted successfully!");
    } catch (error) {
      console.log(
        "Delete failed:",
        error.response?.data?.message || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    } finally {
      setDeleteLoading("");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const activeJobs = jobs.filter(
    (job) => job.status === "active"
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your job postings and applicants.
            </p>
          </div>

          <button
            onClick={() => navigate("/post-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            + Post New Job
          </button>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          {/* TOTAL JOBS */}
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

            <p className="text-gray-500 dark:text-gray-400">
              Total Jobs
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {jobs.length}
            </h2>

          </div>

          {/* ACTIVE JOBS */}
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

            <p className="text-gray-500 dark:text-gray-400">
              Active Jobs
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {activeJobs.length}
            </h2>

          </div>

          {/* APPLICATIONS */}
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

            <p className="text-gray-500 dark:text-gray-400">
              Applications
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">
              0
            </h2>

          </div>

        </div>

        {/* JOB POSTINGS */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            My Job Postings
          </h2>

          {jobs.length === 0 ? (

            <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-8">

              <p className="text-gray-600 dark:text-gray-400">
                You haven't posted any jobs yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {jobs.map((job) => (

                <div
                  key={job._id}
                  className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
                >

                  {/* JOB HEADER */}
                  <div className="flex justify-between items-start gap-4">

                    <div>

                      <h3 className="text-xl font-bold">
                        {job.title}
                      </h3>

                      <p className="text-blue-600 dark:text-blue-500 mt-1">
                        {job.company}
                      </p>

                    </div>

                    {/* STATUS */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {job.status}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    {job.description}
                  </p>

                  {/* DETAILS */}
                  <div className="mt-5 space-y-2 text-sm">

                    <p>
                      📍 {job.location}
                    </p>

                    <p>
                      💰 ₹{job.salary}
                    </p>

                    <p>
                      💼 {job.employment}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-6">

                    {/* APPLICANTS */}
                    <button
                      onClick={() =>
                        navigate("/applicants")
                      }
                      className="flex-1 border border-gray-300 dark:border-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Applicants
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        navigate(`/edit-job/${job._id}`)
                      }
                      className="flex-1 border border-gray-300 dark:border-gray-700 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(job._id)
                      }
                      disabled={
                        deleteLoading === job._id
                      }
                      className="flex-1 border border-red-300 text-red-600 dark:border-red-900 py-2 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                    >
                      {deleteLoading === job._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default RecruiterDashboard;