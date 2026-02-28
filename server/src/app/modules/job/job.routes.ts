import express from 'express';
import { JobController } from './job.controller.js';
import { uploadMiddleware } from '#app/helpers/upload.js';
import authGuard from '#app/middlewares/authGuard.js';

const router = express.Router();

router.post('/', authGuard(), uploadMiddleware.single('file'), JobController.createJob);

router.delete('/:id', authGuard(), JobController.deleteJob);

export const JobRoutes = router;
