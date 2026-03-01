import z from "zod";

const applicationSchema = z.object({
  body: z.object({
    jobId: z.string().min(1, "Job ID is required"),
    applicantName: z.string().min(1, "Applicant name is required"),
    applicantEmail: z.string().email("Invalid email format"),
    coverLetter: z.string().optional(),
    resumeLink: z.string().min(1, "Resume is required"),
  }),
});

export const ApplicationValidation = {
  applicationSchema,
};
