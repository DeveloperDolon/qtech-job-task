import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/admin/JobForm";
import {
  jobTypeLabel,
  jobTypeColor,
  categoryLabel,
  formatDate,
} from "../utils/helper";
import type { Application, Job } from "../types";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useDeleteJobMutation, useGetJobsQuery } from "../store/api/jobApi";
import { useDeleteApplicationMutation, useGetAllApplicationsQuery } from "../store/api/applicationApi";
import { logout } from "../store/slice/authSlice";
import { ConfirmDialog, EmptyState, Modal, PageLoader } from "../components/shared";

type Tab = "jobs" | "applications";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("jobs");
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [deleteAppId, setDeleteAppId] = useState<string | null>(null);
  const [appSearch, setAppSearch] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: jobsData, isLoading: jobsLoading } = useGetJobsQuery({});
  const { data: appsData, isLoading: appsLoading } = useGetAllApplicationsQuery(
    { search: appSearch || undefined },
  );

  const [deleteJob, { isLoading: deletingJob }] = useDeleteJobMutation();
  const [deleteApp, { isLoading: deletingApp }] =
    useDeleteApplicationMutation();

  const jobs = jobsData?.data || [];
  const applications = appsData?.data || [];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-brand-dark font-epilogue">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="text-brand-gray text-sm hover:text-brand-dark transition-colors"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Jobs",
              value: jobs.length,
              icon: "💼",
              color: "text-primary",
            },
            {
              label: "Applications",
              value: applications.length,
              icon: "📝",
              color: "text-emerald-600",
            },
            {
              label: "Active Listings",
              value: jobs.length,
              icon: "✅",
              color: "text-blue-600",
            },
            {
              label: "This Month",
              value: jobs.filter(
                (j: Job) =>
                  new Date(j.createdAt) >
                  // eslint-disable-next-line react-hooks/purity
                  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              ).length,
              icon: "📈",
              color: "text-amber-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 border border-brand-lightgray"
            >
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className={`text-2xl font-bold ${stat.color} font-epilogue`}>
                {stat.value}
              </p>
              <p className="text-brand-gray text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex bg-white border border-brand-lightgray rounded-xl p-1 gap-1">
            {(["jobs", "applications"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "text-brand-gray hover:text-brand-dark"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "jobs" && (
            <button
              onClick={() => setAddJobOpen(true)}
              className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              <span>+</span> Post New Job
            </button>
          )}

          {activeTab === "applications" && (
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray"
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
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                placeholder="Search applicants..."
                className="border border-brand-lightgray rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary w-56"
              />
            </div>
          )}
        </div>

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="bg-white rounded-2xl border border-brand-lightgray overflow-hidden">
            {jobsLoading ? (
              <PageLoader />
            ) : jobs.length === 0 ? (
              <EmptyState
                title="No jobs posted yet"
                description="Post your first job to get started."
                icon="💼"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-brand-gray px-6 py-4">
                        Job
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden md:table-cell">
                        Category
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden sm:table-cell">
                        Type
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden lg:table-cell">
                        Salary
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden lg:table-cell">
                        Posted
                      </th>
                      <th className="text-right text-xs font-semibold text-brand-gray px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {jobs.map((job: Job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-brand-bg/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {job.logo ? (
                              <img
                                src={`${job.logo}`}
                                alt={job.company}
                                className="w-9 h-9 rounded-lg object-cover border border-gray-100"
                              />
                            ) : (
                              <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                                {job.company.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-brand-dark">
                                {job.title}
                              </p>
                              <p className="text-xs text-brand-gray">
                                {job.company} • {job.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-xs text-brand-gray">
                            {categoryLabel[job.category]}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${jobTypeColor[job.jobType]}`}
                          >
                            {jobTypeLabel[job.jobType]}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <span className="text-sm text-brand-dark font-medium">
                            ${job.salary.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <span className="text-xs text-brand-gray">
                            {formatDate(job.createdAt)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/jobs/${job.id}`)}
                              className="text-xs text-primary hover:underline font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => setDeleteJobId(job.id)}
                              className="text-xs text-red-500 hover:underline font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-2xl border border-brand-lightgray overflow-hidden">
            {appsLoading ? (
              <PageLoader />
            ) : applications.length === 0 ? (
              <EmptyState
                title="No applications yet"
                description="Applications will appear here when candidates apply."
                icon="📝"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-brand-gray px-6 py-4">
                        Applicant
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden md:table-cell">
                        Job Applied
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden lg:table-cell">
                        Cover Letter
                      </th>
                      <th className="text-left text-xs font-semibold text-brand-gray px-4 py-4 hidden sm:table-cell">
                        Applied
                      </th>
                      <th className="text-right text-xs font-semibold text-brand-gray px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {applications.map((app: Application) => (
                      <tr
                        key={app.id}
                        className="hover:bg-brand-bg/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-brand-dark">
                              {app.applicantName}
                            </p>
                            <p className="text-xs text-brand-gray">
                              {app.applicantEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-xs text-brand-gray">
                            {app.jobId}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <p className="text-xs text-brand-gray truncate max-w-xs">
                            {app.coverLetter || (
                              <span className="italic">No cover letter</span>
                            )}
                          </p>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <span className="text-xs text-brand-gray">
                            {formatDate(app.createdAt as string)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setDeleteAppId(app.id as string)}
                            className="text-xs text-red-500 hover:underline font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      <Modal
        isOpen={addJobOpen}
        onClose={() => setAddJobOpen(false)}
        title="Post a New Job"
      >
        <JobForm
          onSuccess={() => setAddJobOpen(false)}
          onCancel={() => setAddJobOpen(false)}
        />
      </Modal>

      {/* Delete Job Confirm */}
      <ConfirmDialog
        isOpen={!!deleteJobId}
        onClose={() => setDeleteJobId(null)}
        onConfirm={async () => {
          if (deleteJobId) {
            await deleteJob(deleteJobId);
            setDeleteJobId(null);
          }
        }}
        title="Delete Job"
        message="Are you sure you want to delete this job? This action cannot be undone."
        isLoading={deletingJob}
      />

      {/* Delete Application Confirm */}
      <ConfirmDialog
        isOpen={!!deleteAppId}
        onClose={() => setDeleteAppId(null)}
        onConfirm={async () => {
          if (deleteAppId) {
            await deleteApp(deleteAppId);
            setDeleteAppId(null);
          }
        }}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        isLoading={deletingApp}
      />
    </div>
  );
};

export default AdminPage;
