import { NextFunction, Request, Response } from "express";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "get user" });
      return;
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "get id user" });
      return;
    } catch (error) {
      next(error);
    }
  },
  
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Post user" });
      return;
    } catch (error) {
      next(error);
    }
  },

  put: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "put user" });
      return;
    } catch (error) {
      next(error);
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "patch user" });
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "delete user" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
