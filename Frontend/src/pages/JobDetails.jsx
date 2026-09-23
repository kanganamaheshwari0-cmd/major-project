import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading job...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate("/student-dashboard")}
          className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white p-8 rounded-xl shadow">

          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            {job.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {job.description}
          </p>

          <div className="space-y-3">

            <p>
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong> ₹{job.salary}
            </p>

            <p>
              <strong>Employment:</strong> {job.employment}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {job.skills.join(", ")}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;