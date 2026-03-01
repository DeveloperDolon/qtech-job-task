import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../components/jobs/JobCard";
import { PageLoader, EmptyState } from "../components/shared";
import { categoryOptions, jobTypeOptions } from "../utils/helper";
import type { Job } from "../types";
import { useGetJobsQuery } from "../store/api/jobApi";

const JobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "");

  const { data, isLoading, isFetching } = useGetJobsQuery(
    {
      search: search || undefined,
      category: category || undefined,
      jobType: jobType || undefined,
    },
    { refetchOnMountOrArgChange: true },
  );

  const jobs = data?.data || [];

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (jobType) params.jobType = jobType;
    setSearchParams(params);
  }, [search, category, jobType, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategory("");
    setJobType("");
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <div className="bg-brand-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-epilogue mb-2">
            Find your <span className="text-primary">dream job</span>
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            {jobs.length > 0
              ? `${jobs.length} jobs available`
              : "Explore thousands of job opportunities"}
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl"
          >
            <div className="flex items-center gap-2 flex-1 px-4">
              <svg
                className="w-4 h-4 text-brand-gray flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Job title or keyword..."
                className="flex-1 outline-none text-sm text-brand-dark placeholder:text-brand-gray py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border border-brand-lightgray sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-brand-dark font-epilogue">
                  Filters
                </h2>
                {(category || jobType || search) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-brand-dark text-sm mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={category === ""}
                      onChange={() => setCategory("")}
                      className="text-primary accent-primary"
                    />
                    <span className="text-sm text-brand-gray">
                      All Categories
                    </span>
                  </label>
                  {categoryOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={opt.value}
                        checked={category === opt.value}
                        onChange={() => setCategory(opt.value)}
                        className="text-primary accent-primary"
                      />
                      <span className="text-sm text-brand-gray">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div>
                <h3 className="font-semibold text-brand-dark text-sm mb-3">
                  Job Type
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      value=""
                      checked={jobType === ""}
                      onChange={() => setJobType("")}
                      className="accent-primary"
                    />
                    <span className="text-sm text-brand-gray">All Types</span>
                  </label>
                  {jobTypeOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="jobType"
                        value={opt.value}
                        checked={jobType === opt.value}
                        onChange={() => setJobType(opt.value)}
                        className="accent-primary"
                      />
                      <span className="text-sm text-brand-gray">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-brand-gray text-sm">
                {isLoading || isFetching ? (
                  "Loading..."
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-brand-dark">
                      {jobs.length}
                    </span>{" "}
                    results
                    {search && (
                      <>
                        {" "}
                        for "
                        <span className="font-semibold text-brand-dark">
                          {search}
                        </span>
                        "
                      </>
                    )}
                  </>
                )}
              </p>
            </div>

            {isLoading || isFetching ? (
              <PageLoader />
            ) : jobs.length === 0 ? (
              <EmptyState
                title="No jobs found"
                description="Try adjusting your search or filters to find more jobs."
                icon="💼"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {jobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
