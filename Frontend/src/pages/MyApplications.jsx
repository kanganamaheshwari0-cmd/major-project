import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
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

      console.log("My Applications:", response.data);

      setApplications(response.data.applications || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track the jobs you have applied for.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* NO APPLICATIONS */}
        {applications.length === 0 ? (

          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl">
            <p className="text-gray-600 dark:text-gray-400">
              You haven't applied for any jobs yet.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {applications.map((application) => {

              const job = application.job;

              return (
                <div
                  key={application._id}
                  className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl hover:border-blue-500 transition"
                >

                  {/* JOB TITLE */}
                  <div className="flex items-start justify-between gap-4 mb-4">

                    <div>
                      <h2 className="text-xl font-bold">
                        {job?.title}
                      </h2>

                      <p className="text-blue-600 dark:text-blue-500 mt-1">
                        {job?.company}
                      </p>
                    </div>

                    {/* STATUS */}
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full">
                      {application.status}
                    </span>

                  </div>

                  {/* JOB DESCRIPTION */}
                  <p className="text-gray-600 dark:text-gray-400 mb-5">
                    {job?.description}
                  </p>

                  {/* DETAILS */}
                  <div className="space-y-3 text-sm">

                    <p>
                      📍 <strong>Location:</strong>{" "}
                      {job?.location}
                    </p>

                    <p>
                      💰 <strong>Salary:</strong>{" "}
                      ₹{job?.salary}
                    </p>

                    <p>
                      💼 <strong>Employment:</strong>{" "}
                      {job?.employment}
                    </p>

                    <p>
                      🛠️ <strong>Skills:</strong>{" "}
                      {job?.skills?.join(", ")}
                    </p>

                  </div>

                  {/* APPLIED DATE */}
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4">

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Applied on:{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>
    </div>
  );
};

export default MyApplications;