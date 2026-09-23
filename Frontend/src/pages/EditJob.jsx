import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [employment, setEmployment] = useState("Full Time");
  const [status, setStatus] = useState("active");

  // GET SINGLE JOB
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

        const job = response.data.job;

        setTitle(job.title || "");
        setDescription(job.description || "");
        setCompany(job.company || "");
        setLocation(job.location || "");
        setSalary(job.salary || "");
        setSkills(job.skills?.join(", ") || "");
        setEmployment(job.employment || "Full Time");
        setStatus(job.status || "active");

      } catch (error) {
        console.log(
          "Job fetch failed:",
          error.response?.data?.message || error.message
        );

        alert(
          error.response?.data?.message ||
            "Failed to load job"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // UPDATE JOB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:8080/api/v1/job/${id}`,
        {
          title,
          description,
          company,
          location,
          salary,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          employment,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", response.data);

      alert("Job updated successfully!");

      navigate("/recruiter-dashboard");

    } catch (error) {
      console.log(
        "Update failed:",
        error.response?.data?.message || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update job"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading job...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Job
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update your job opportunity details.
          </p>
        </div>

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* COMPANY */}
          <div>
            <label className="block font-semibold mb-2">
              Company
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block font-semibold mb-2">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* SALARY */}
          <div>
            <label className="block font-semibold mb-2">
              Salary
            </label>

            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* SKILLS */}
          <div>
            <label className="block font-semibold mb-2">
              Skills
            </label>

            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, JavaScript, HTML, CSS"
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="text-sm text-gray-500 mt-2">
              Separate skills using commas.
            </p>
          </div>

          {/* EMPLOYMENT */}
          <div>
            <label className="block font-semibold mb-2">
              Employment Type
            </label>

            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="block font-semibold mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#020712] rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-3">

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter-dashboard")
              }
              className="flex-1 border border-gray-300 dark:border-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {submitting
                ? "Updating..."
                : "Update Job"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default EditJob;