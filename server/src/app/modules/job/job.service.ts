import prisma from "#config/prisma.js";
import type { TJob } from "./job.interface.js";

const createJob = async (data: TJob, uploadedFile: Express.Multer.File) => {
  const { title, description, company, location, jobType, tags, vacancy, workingTime, salary } = data;
  const job = await prisma.job.create({
    data: {
      title,
      description,
      company,
      location,
      jobType,
      tags,
      vacancy,
      workingTime,
      salary,
      logo: uploadedFile.path,
    },
  });
  return job;
};

const deleteJob = async (id: string) => {
  const job = await prisma.job.delete({
    where: { id },
  });
  return job;
};

export const JobService = {
  createJob,
  deleteJob,
};
