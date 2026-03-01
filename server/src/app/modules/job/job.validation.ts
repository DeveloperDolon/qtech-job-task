import z from "zod";

// 1. Define as const for perfect Tuple matching
const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"] as const;
const CATEGORIES = [
  "SOFTWARE_DEVELOPMENT",
  "DESIGN",
  "MARKETING",
  "SALES",
  "CUSTOMER_SUPPORT",
  "HUMAN_RESOURCES",
] as const;

const jobSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().min(1, "Location is required"),

    // 2. Use 'message' instead of 'invalid_type_error' as per your TS error
    salary: z.coerce
      .number({ message: "Salary must be a number" })
      .positive("Salary must be a positive number"),

    vacancy: z.coerce
      .number({ message: "Vacancy must be a number" })
      .int("Vacancy must be an integer")
      .positive("Vacancy must be a positive number"),

    workingTime: z.string().min(1, "Working time is required"),

    // 3. Use 'message' instead of 'errorMap' as per your TS error
    jobType: z.enum(JOB_TYPES, { 
      message: "Invalid job type" 
    }),

    category: z.enum(CATEGORIES, { 
      message: "Invalid job category" 
    }),

    tags: z.preprocess((val) => {
      if (typeof val === "string") {
        try {
          // Handles cases where frontend sends stringified JSON arrays
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) ? parsed : [val];
        } catch {
          // Handles cases where it's just a single string
          return [val];
        }
      }
      return val;
    }, z.array(z.string()).min(1, "At least one tag is required")),
  }),
});

export const JobValidation = {
  jobSchema,
};