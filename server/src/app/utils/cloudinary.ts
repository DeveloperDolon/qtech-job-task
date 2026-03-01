import config from "#config/index.js";
import { v2 as cloudinary } from "cloudinary";
// Path to your credentials file

if (!config.cloudinary.cloud_name || !config.cloudinary.api_key || !config.cloudinary.api_secret) {
  throw new Error("Cloudinary credentials are missing in environment variables");
}

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name as string,
  api_key: config.cloudinary.api_key as string,
  api_secret: config.cloudinary.api_secret as string,
});

export const uploadToCloudinary = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "job_portal/logos", // Organized folder name in Cloudinary
        resource_type: "auto", // Automatically detects if it's an image or PDF
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    // Write the buffer to the stream
    uploadStream.end(file.buffer);
  });
};
