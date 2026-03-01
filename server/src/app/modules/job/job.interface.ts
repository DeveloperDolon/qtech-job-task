enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERN = "INTERN",
}

enum JobCategory {
  SOFTWARE_DEVELOPMENT = "SOFTWARE_DEVELOPMENT",
  DESIGN = "DESIGN",
  MARKETING = "MARKETING",
  SALES = "SALES",
  CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
  HUMAN_RESOURCES = "HUMAN_RESOURCES",
}

export type TJob = {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  logo: File;
  jobType: JobType;
  tags: string[];
  vacancy: number;
  workingTime: string;
  category: JobCategory;
};
