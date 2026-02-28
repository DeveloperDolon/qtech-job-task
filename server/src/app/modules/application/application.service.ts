import type { TApplication } from "./application.interface.js";
import prisma from "#config/prisma.js";

const createApplication = async (payload: TApplication, resume: Express.Multer.File) => {
  const { jobId, applicantName, applicantEmail, coverLetter } = payload;
  const storageUrl = `/uploads/${resume.filename}`;

  const application = await prisma.application.create({
    data: {
      jobId,
      applicantName,
      applicantEmail,
      resumeLink: storageUrl,
      coverLetter: coverLetter || null,
    },
  });

  return application;
};

const getApplicationsByJobId = async (jobId: string) => {
  const applications = await prisma.application.findMany({
    where: { jobId },
  });
  return applications;
};

const getAllApplications = async (payload: { search: string }) => {
  const applications = await prisma.application.findMany({
    where: {
      OR: [
        { applicantName: { contains: payload.search, mode: "insensitive" } },
        { applicantEmail: { contains: payload.search, mode: "insensitive" } },
      ],
    },
  });
  return applications;
};

const deleteApplication = async (id: string) => {
  const application = await prisma.application.delete({
    where: { id },
  });
  return application;
};

export const ApplicationService = {
  createApplication,
  getApplicationsByJobId,
  getAllApplications,
  deleteApplication,
};
