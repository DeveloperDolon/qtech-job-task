export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";

export type JobCategory =
  | "SOFTWARE_DEVELOPMENT"
  | "DESIGN"
  | "MARKETING"
  | "SALES"
  | "CUSTOMER_SUPPORT"
  | "HUMAN_RESOURCES";

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  logo?: string;
  jobType: JobType;
  tags: string[];
  vacancy: number;
  workingTime: string;
  category: JobCategory;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  resume?: string;
  coverLetter?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface JobsQuery {
  search?: string;
  category?: string;
  jobType?: string;
}

export interface ApplicationFormData {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  resume?: File;
  coverLetter?: string;
}
