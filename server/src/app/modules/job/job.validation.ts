import z from "zod";

const jobSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().min(1, "Location is required"),
    salary: z.number().positive("Salary must be a positive number"),
    logo: z.instanceof(File).refine((file) => file instanceof File, "Logo must be a file"),
    jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"], "Invalid job type"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    vacancy: z.number().int().positive("Vacancy must be a positive integer"),
    workingTime: z.string().min(1, "Working time is required"),
    category: z.enum(["SOFTWARE_DEVELOPMENT", "DESIGN", "MARKETING", "SALES", "CUSTOMER_SUPPORT", "HUMAN_RESOURCES"], "Invalid job category"),
  }),
});

export const JobValidation = {
  jobSchema,
};
