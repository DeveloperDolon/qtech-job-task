import z from "zod";


const applicationSchema = z.object({
  body: z.object({
    jobId: z.string().min(1, "Job ID is required"),
    applicantName: z.string().min(1, "Applicant name is required"),
    applicantEmail: z.string().email("Invalid email format"),
    resume: z.instanceof(File).refine((file) => file instanceof File).optional(),
    coverLetter: z.string().optional(),
  }),
});

export const ApplicationValidation = {
  applicationSchema,
};
