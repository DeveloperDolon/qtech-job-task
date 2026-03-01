import type { TApplication } from "./application.interface.js";
import prisma from "#config/prisma.js";
import type { Prisma } from "#generated/prisma/index.js";

const createApplication = async (payload: TApplication) => {
  const { jobId, applicantName, applicantEmail, coverLetter, resumeLink } = payload;

  const application = await prisma.application.create({
    data: {
      jobId,
      applicantName,
      applicantEmail,
      resumeLink: resumeLink ?? null,
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
  const whereCondition: Prisma.ApplicationWhereInput = payload.search
  ? {
      OR: [
        {
          applicantName: {
            contains: payload.search,
            mode: "insensitive",
          },
        },
        {
          applicantEmail: {
            contains: payload.search,
            mode: "insensitive",
          },
        },
      ],
    }
  : {};

  const applications = await prisma.application.findMany({
    where: whereCondition,
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
