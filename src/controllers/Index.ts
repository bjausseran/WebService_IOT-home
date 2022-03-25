import { NextFunction, Request, Response } from "express";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Hello world" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
