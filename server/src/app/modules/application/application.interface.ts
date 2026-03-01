
export type TApplication = {
    jobId: string;
    applicantName: string;
    applicantEmail: string;
    resumeLink: string;
    coverLetter?: string;
    status?: "PENDING" | "ACCEPTED" | "REJECTED";
}
