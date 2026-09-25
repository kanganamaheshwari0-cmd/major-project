
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("Admin token:", token);

        if (!token) {
          setError("Admin token not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/v1/application/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("APPLICATION RESPONSE:", response.data);

        setApplications(response.data.applications || []);
      } catch (error) {
        console.log("APPLICATION ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);

        setError(
          error.response?.data?.message ||
            "Failed to fetch applications"
        );
      } finally {
        setLoading(false);
      }
    };

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
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage all job applications.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-8">
            <p className="text-gray-600 dark:text-gray-400">
              No applications found.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-6"
              >

                {/* JOB */}
                <div className="mb-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Job
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    {application.job?.title || "Job unavailable"}
                  </h2>

                  <p className="text-blue-600 dark:text-blue-500 mt-1">
                    {application.job?.company || "Company unavailable"}
                  </p>
                </div>

                {/* APPLICANT */}
                <div className="grid md:grid-cols-3 gap-4 mb-5">

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Applicant
                    </p>

                    <p className="font-semibold mt-1">
                      {application.applicant?.name ||
                        "Applicant unavailable"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>

                    <p className="mt-1">
                      {application.applicant?.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>

                    <p className="mt-1">
                      {application.applicant?.phone || "-"}
                    </p>
                  </div>

                </div>

                {/* JOB DETAILS */}
                <div className="grid md:grid-cols-3 gap-4 mb-5 text-sm">

                  <p>
                    📍 {application.job?.location || "-"}
                  </p>

                  <p>
                    💰 ₹{application.job?.salary || "-"}
                  </p>

                  <p>
                    💼 {application.job?.employment || "-"}
                  </p>

                </div>

                {/* STATUS */}
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-5">

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>

                    <span className="inline-block mt-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {application.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {application.createdAt
                      ? new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminApplications;



