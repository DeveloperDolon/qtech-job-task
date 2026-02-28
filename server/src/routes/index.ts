import express from "express";
import { JobRoutes } from "#app/modules/job/job.routes.js";
import { ApplicationRoutes } from "#app/modules/application/application.routes.js";
import { AuthRoutes } from "#app/modules/auth/auth.routes.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/jobs",
    route: JobRoutes,
  },
  {
    path: "/applications",
    route: ApplicationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
