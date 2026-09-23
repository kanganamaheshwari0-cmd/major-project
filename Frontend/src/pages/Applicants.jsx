import React, { useEffect, useState } from "react";
import axios from "axios";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/v1/application/applicants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Applicants:", response.data);

      setApplicants(response.data.applications || []);
    } catch (error) {
      console.log(
        "Applicants fetch failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // UPDATE APPLICATION STATUS
  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:8080/api/v1/application/${applicationId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status response:", response.data);

      // UI mein status immediately update
      setApplicants((prevApplicants) =>
        prevApplicants.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: status,
              }
            : application
        )
      );

    } catch (error) {
      console.log(
        "Status update failed:",
        error.response?.data?.message || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading applicants...
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
            Applicants
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage students who applied for your jobs.
          </p>
        </div>

        {/* NO APPLICANTS */}
        {applicants.length === 0 ? (
          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
            <p className="text-gray-600 dark:text-gray-400">
              No applicants yet.
            </p>
          </div>
        ) : (

          <div className="space-y-5">

            {applicants.map((application) => (

              <div
                key={application._id}
                className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
              >

                {/* STUDENT INFO */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <h2 className="text-xl font-bold">
                      {application.applicant?.fullName ||
                        "Student"}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {application.applicant?.email ||
                        "No email"}
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === "Shortlisted"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : application.status === "Rejected"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {application.status || "Applied"}
                  </span>

                </div>

                {/* LINE */}
                <div className="border-t border-gray-200 dark:border-gray-800 my-5"></div>

                {/* JOB INFO */}
                <div className="space-y-2">

                  <p>
                    <strong>Job:</strong>{" "}
                    {application.job?.title || "N/A"}
                  </p>

                  <p>
                    <strong>Company:</strong>{" "}
                    {application.job?.company || "N/A"}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {application.job?.location || "N/A"}
                  </p>

                  <p>
                    <strong>Salary:</strong>{" "}
                    ₹{application.job?.salary || "N/A"}
                  </p>

                  <p>
                    <strong>Employment:</strong>{" "}
                    {application.job?.employment || "N/A"}
                  </p>

                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-6">

                  {/* ACCEPT */}
                  <button
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "Shortlisted"
                      )
                    }
                    disabled={updatingId === application._id}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {updatingId === application._id
                      ? "Updating..."
                      : "Accept"}
                  </button>

                  {/* REJECT */}
                  <button
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "Rejected"
                      )
                    }
                    disabled={updatingId === application._id}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {updatingId === application._id
                      ? "Updating..."
                      : "Reject"}
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Applicants;