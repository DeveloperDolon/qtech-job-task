import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLoader, Modal } from "../components/shared";
import ApplyForm from "../components/applications/ApplyForm";
import { jobTypeLabel, jobTypeColor, categoryLabel, formatDate } from "../utils/helper";
import { useGetJobByIdQuery } from "../store/api/jobApi";

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applyOpen, setApplyOpen] = useState(false);

  const { data, isLoading, error } = useGetJobByIdQuery(id || "");
  const job = data?.data;

  if (isLoading) return <PageLoader />;
  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-brand-dark mb-2">Job not found</h2>
          <button onClick={() => navigate("/jobs")} className="text-primary font-semibold hover:underline text-sm">
            ← Back to jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate("/jobs")} className="text-brand-gray hover:text-primary transition-colors">
              Find Jobs
            </button>
            <span className="text-brand-lightgray">/</span>
            <span className="text-brand-dark font-medium">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl p-6 border border-brand-lightgray">
              <div className="flex items-start gap-4 mb-6">
                {job.logo ? (
                  <img
                    src={`http://localhost:5000${job.logo}`}
                    alt={job.company}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                  />
                ) : (
                  <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center text-primary font-bold text-2xl border border-primary-100">
                    {job.company.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-bold text-brand-dark font-epilogue">
                        {job.title}
                      </h1>
                      <p className="text-brand-gray text-sm mt-1">{job.company} • {job.location}</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 ${jobTypeColor[job.jobType]}`}>
                      {jobTypeLabel[job.jobType]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setApplyOpen(true)}
                className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-colors"
              >
                Apply Now →
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-brand-lightgray">
              <h2 className="text-lg font-bold text-brand-dark font-epilogue mb-4">Job Description</h2>
              <div className="text-brand-gray text-sm leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Job Overview */}
            <div className="bg-white rounded-2xl p-6 border border-brand-lightgray">
              <h3 className="font-bold text-brand-dark font-epilogue mb-5">Job Overview</h3>
              <div className="space-y-4">
                {[
                  { label: "Job Category", value: categoryLabel[job.category], icon: "🏷️" },
                  { label: "Job Type", value: jobTypeLabel[job.jobType], icon: "⏰" },
                  { label: "Location", value: job.location, icon: "📍" },
                  { label: "Salary", value: `$${job.salary.toLocaleString()}/year`, icon: "💰" },
                  { label: "Vacancy", value: `${job.vacancy} positions`, icon: "👥" },
                  { label: "Working Time", value: job.workingTime, icon: "🕐" },
                  { label: "Posted", value: formatDate(job.createdAt), icon: "📅" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs text-brand-gray">{item.label}</p>
                      <p className="text-sm font-medium text-brand-dark">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-brand-dark font-epilogue mb-2">Interested?</h3>
              <p className="text-brand-gray text-xs mb-4">Apply for this position now</p>
              <button
                onClick={() => setApplyOpen(true)}
                className="w-full bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
        title="Apply for this position"
      >
        <ApplyForm
          jobId={job.id}
          jobTitle={job.title}
          onSuccess={() => setApplyOpen(false)}
          onCancel={() => setApplyOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default JobDetailPage;
