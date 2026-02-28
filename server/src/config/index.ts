import dotend from "dotenv";
import path from "path";

dotend.config({ path: path.join((process.cwd(), ".env")) });

export default {
  DB_URL: process.env.DATABASE_URL ?? "",
  node_env: process.env.NODE_ENV ?? "development",
  port: process.env.PORT ?? 5000,
  salt_round: process.env.SALT_ROUND,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    expires_in: process.env.EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
