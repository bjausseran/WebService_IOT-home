import { NextFunction, Request, Response } from "express";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "get captor" });
      return;
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "get id captor" });
      return;
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Post captor" });
      return;
    } catch (error) {
      next(error);
    }
  },

  put: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "put captor" });
      return;
    } catch (error) {
      next(error);
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "patch captor" });
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "delete captor" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
