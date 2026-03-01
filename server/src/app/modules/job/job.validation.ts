import z from "zod";

const jobSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().min(1, "Location is required"),
    
    // 1. Use z.coerce.number() to handle strings coming from FormData
    salary: z.coerce.number().positive("Salary must be a positive number"),
    vacancy: z.coerce.number().int().positive("Vacancy must be a positive integer"),
    
    workingTime: z.string().min(1, "Working time is required"),
    jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"], {
      errorMap: () => ({ message: "Invalid job type" }),
    }),
    category: z.enum(["SOFTWARE_DEVELOPMENT", "DESIGN", "MARKETING", "SALES", "CUSTOMER_SUPPORT", "HUMAN_RESOURCES"], {
      errorMap: () => ({ message: "Invalid job category" }),
    }),

    tags: z.preprocess((val) => {
      if (typeof val === "string") return [val];
      return val;
    }, z.array(z.string())),

    // It is handled by req.file, not req.body.
  }),
});

export const JobValidation = {
  jobSchema,
};
