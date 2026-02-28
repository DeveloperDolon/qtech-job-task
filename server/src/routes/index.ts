import express from "express";
import { JobRoutes } from "#app/modules/job/job.routes.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: router,
  },
  {
    path: "/jobs",
    route: JobRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
