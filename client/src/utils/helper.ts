import type { JobType, JobCategory } from "../types";

export const formatSalary = (salary: number): string => {
  if (salary >= 1000) {
    return `$${(salary / 1000).toFixed(0)}k`;
  }
  return `$${salary}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

export const jobTypeLabel: Record<JobType, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERN: "Internship",
};

export const jobTypeColor: Record<JobType, string> = {
  FULL_TIME: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  PART_TIME: "bg-amber-50 text-amber-600 border border-amber-200",
  CONTRACT: "bg-blue-50 text-blue-600 border border-blue-200",
  INTERN: "bg-purple-50 text-purple-600 border border-purple-200",
};

export const categoryLabel: Record<JobCategory, string> = {
  SOFTWARE_DEVELOPMENT: "Technology",
  DESIGN: "Design",
  MARKETING: "Marketing",
  SALES: "Sales",
  CUSTOMER_SUPPORT: "Customer Support",
  HUMAN_RESOURCES: "Human Resources",
};

export const categoryOptions: { value: JobCategory; label: string }[] = [
  { value: "SOFTWARE_DEVELOPMENT", label: "Technology" },
  { value: "DESIGN", label: "Design" },
  { value: "MARKETING", label: "Marketing" },
  { value: "SALES", label: "Sales" },
  { value: "CUSTOMER_SUPPORT", label: "Customer Support" },
  { value: "HUMAN_RESOURCES", label: "Human Resources" },
];

export const jobTypeOptions: { value: JobType; label: string }[] = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERN", label: "Internship" },
];
