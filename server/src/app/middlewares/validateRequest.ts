import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

const validateRequest = (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = await schema.parseAsync({
        body: req.body,
      });

      // 🔥 THIS IS THE IMPORTANT PART
      req.body = parsedData.body;

      next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
