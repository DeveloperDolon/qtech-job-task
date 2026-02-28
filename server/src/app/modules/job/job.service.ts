import prisma from "#config/prisma.js";
import type { TJob } from "./job.interface.js";

const createJob = async (data: TJob, uploadedFile: Express.Multer.File) => {
  const { title, description, company, category, location, jobType, tags, vacancy, workingTime, salary } = data;
  const storageUrl = `/uploads/${uploadedFile.filename}`;
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
      category,
      logo: storageUrl,
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
