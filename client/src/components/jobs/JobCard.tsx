import React from "react";
import { useNavigate } from "react-router-dom";
import type { Job } from "../../types";
import { jobTypeLabel, jobTypeColor, formatDate } from "../../utils/helper";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-brand-lightgray rounded-xl p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {job.logo ? (
            <img
              src={`${job.logo}`}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-gray-100"
            />
          ) : (
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary font-bold text-lg border border-primary-100">
              {job.company.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-brand-dark text-sm group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-brand-gray text-xs mt-0.5">
              {job.company} • {job.location}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${jobTypeColor[job.jobType]}`}
        >
          {jobTypeLabel[job.jobType]}
        </span>
      </div>

      {/* Description */}
      <p className="text-brand-gray text-xs line-clamp-2 mb-4 leading-relaxed">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <span className="text-brand-gray text-xs">
          {formatDate(job.createdAt)}
        </span>
        <span className="text-primary font-semibold text-sm">
          ${job.salary.toLocaleString()}/yr
        </span>
      </div>
    </div>
  );
};

export default JobCard;
