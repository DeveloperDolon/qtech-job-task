import { uploadToCloudinary } from "#app/utils/cloudinary.js";
import prisma from "#config/prisma.js";
import type { TJob } from "./job.interface.js";

const createJob = async (data: TJob, uploadedFile: Express.Multer.File) => {
  const { title, description, company, category, location, jobType, tags, vacancy, workingTime, salary } = data;

  let logoUrl = "";

  if (uploadedFile) {
    const uploadResult = await uploadToCloudinary(uploadedFile);
    logoUrl = uploadResult.secure_url;
  }

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
      logo: logoUrl, // Now saving the Cloudinary URL (https://...)
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

const getAllJobs = async (filtering: { search: string; category?: string; jobType?: string }) => {
  const { search, category, jobType } = filtering;
  const where: any = {};
  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (category) {
    where.category = category;
  }
  if (jobType) {
    where.jobType = jobType;
  }
  const jobs = await prisma.job.findMany({
    where,
  });
  return jobs;
};

const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: { id },
  });
  return job;
};

export const JobService = {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
};
