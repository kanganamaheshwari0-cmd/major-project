import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // SEARCH
  // =========================

  const [searchTerm, setSearchTerm] = useState("");

  // Debounced Search
  const debouncedSearch = useDebounce(searchTerm, 500);

  // =========================
  // FILTERS
  // =========================

  const [locationFilter, setLocationFilter] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  // =========================
  // SORTING
  // =========================

  const [sortBy, setSortBy] = useState("");

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 4;

  // =========================
  // FETCH ALL JOBS
  // =========================

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

  // =========================
  // FETCH MY APPLICATIONS
  // =========================

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

      const applications =
        response.data.applications || [];

      const jobIds = applications
        .filter((application) => application.job)
        .map((application) => application.job._id);

      setAppliedJobs(jobIds);
    } catch (error) {
      console.log(
        "Applications fetch failed:",
        error.response?.data?.message ||
          error.message
      );
    }
  };

  // =========================
  // LOAD DATA
  // =========================

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

  // =========================
  // APPLY FOR JOB
  // =========================

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

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredJobs = jobs.filter((job) => {
    const search = debouncedSearch
      .toLowerCase()
      .trim();

    // Search by title
    const titleMatch =
      job.title
        ?.toLowerCase()
        .includes(search);

    // Search by company
    const companyMatch =
      job.company
        ?.toLowerCase()
        .includes(search);

    // Search by skills
    const skillMatch =
      job.skills?.some((skill) =>
        skill
          .toLowerCase()
          .includes(search)
      );

    const searchMatch =
      !search ||
      titleMatch ||
      companyMatch ||
      skillMatch;

    // Location filter
    const locationMatch =
      !locationFilter ||
      job.location
        ?.toLowerCase()
        .includes(
          locationFilter.toLowerCase()
        );

    // Employment filter
    const employmentMatch =
      !employmentFilter ||
      job.employment === employmentFilter;

    // Salary filter
    let salaryMatch = true;

    if (salaryFilter === "below-500000") {
      salaryMatch =
        Number(job.salary) < 500000;
    }

    if (salaryFilter === "500000-800000") {
      salaryMatch =
        Number(job.salary) >= 500000 &&
        Number(job.salary) <= 800000;
    }

    if (salaryFilter === "above-800000") {
      salaryMatch =
        Number(job.salary) > 800000;
    }

    return (
      searchMatch &&
      locationMatch &&
      employmentMatch &&
      salaryMatch
    );
  });

  // =========================
  // SORTING
  // =========================

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => {
      // Newest
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      // Oldest
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );
      }

      // Salary Low → High
      if (sortBy === "salary-low") {
        return (
          Number(a.salary) -
          Number(b.salary)
        );
      }

      // Salary High → Low
      if (sortBy === "salary-high") {
        return (
          Number(b.salary) -
          Number(a.salary)
        );
      }

      return 0;
    }
  );

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    sortedJobs.length / jobsPerPage
  );

  const startIndex =
    (currentPage - 1) * jobsPerPage;

  const endIndex =
    startIndex + jobsPerPage;

  const currentJobs = sortedJobs.slice(
    startIndex,
    endIndex
  );

  // =========================
  // CHANGE PAGE
  // =========================

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // RESET PAGE
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    locationFilter,
    employmentFilter,
    salaryFilter,
    sortBy,
  ]);

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setEmploymentFilter("");
    setSalaryFilter("");
    setSortBy("");
    setCurrentPage(1);
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading jobs...
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-white dark:bg-[#020712] text-gray-900 dark:text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Find Jobs
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore available opportunities and
            find your next role.
          </p>

        </div>

        {/* SEARCH */}

        <div className="mb-5">

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search by job title, company or skill..."
            className="w-full bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 rounded-xl px-5 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* SEARCH STATUS */}

          {searchTerm !== debouncedSearch && (
            <p className="text-sm text-gray-500 mt-2">
              Searching...
            </p>
          )}

        </div>

        {/* FILTERS + SORT */}

        <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* LOCATION */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Location
              </label>

              <input
                type="text"
                value={locationFilter}
                onChange={(e) =>
                  setLocationFilter(
                    e.target.value
                  )
                }
                placeholder="e.g. Bhopal"
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* JOB TYPE */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Job Type
              </label>

              <select
                value={employmentFilter}
                onChange={(e) =>
                  setEmploymentFilter(
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  All Job Types
                </option>

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

            {/* SALARY */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Salary
              </label>

              <select
                value={salaryFilter}
                onChange={(e) =>
                  setSalaryFilter(
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  All Salaries
                </option>

                <option value="below-500000">
                  Below ₹5 Lakh
                </option>

                <option value="500000-800000">
                  ₹5 - ₹8 Lakh
                </option>

                <option value="above-800000">
                  Above ₹8 Lakh
                </option>

              </select>

            </div>

            {/* SORT */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Sort By
              </label>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="w-full bg-white dark:bg-[#020712] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Default
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>

                <option value="salary-low">
                  Salary: Low → High
                </option>

                <option value="salary-high">
                  Salary: High → Low
                </option>

              </select>

            </div>

          </div>

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-semibold transition"
          >
            Clear Filters
          </button>

        </div>

        {/* SUCCESS */}

        {message && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* JOB COUNT */}

        <div className="mb-5">

          <p className="text-gray-600 dark:text-gray-400">

            Showing{" "}

            <strong className="text-gray-900 dark:text-white">
              {sortedJobs.length}
            </strong>{" "}

            jobs

          </p>

        </div>

        {/* NO JOBS */}

        {sortedJobs.length === 0 ? (

          <div className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 rounded-xl text-center">

            <p className="text-gray-600 dark:text-gray-400">
              No jobs found.
            </p>

            <button
              onClick={clearFilters}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <>

            {/* JOB CARDS */}

            <div className="grid md:grid-cols-2 gap-6">

              {currentJobs.map((job) => {

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

                    {/* VIEW DETAILS */}

                    <Link
                      to={`/job/${job._id}`}
                      className="block w-full mt-6 py-3 rounded-lg font-semibold text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    >
                      View Details
                    </Link>

                    {/* APPLY */}

                    <button
                      onClick={() =>
                        handleApply(job._id)
                      }
                      disabled={isApplied}
                      className={`w-full mt-3 py-3 rounded-lg font-semibold text-white transition ${
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

            {/* PAGINATION */}

            {totalPages > 1 && (

              <div className="flex items-center justify-center gap-2 mt-10">

                {/* PREVIOUS */}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Previous
                </button>

                {/* PAGE NUMBERS */}

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    onClick={() =>
                      handlePageChange(page)
                    }
                    className={`w-10 h-10 rounded-lg font-semibold ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {page}
                  </button>

                ))}

                {/* NEXT */}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Next
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
};

export default Jobs;