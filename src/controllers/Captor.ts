import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, SensorType } from '@prisma/client'
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      // run inside `async` function
      const captors = await prisma.captor.findMany();
      res.json(captors)
    }
     catch (error) {
       res.json({ error})
     }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const captor = await prisma.captor.findUnique({
        where: {
          id: id,
        },
      });
      res.json(captor);
    } catch (error) {
      res.json(error)
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let captor: Prisma.CaptorCreateInput

      captor = {
        type: req.body.type,
        designation: req.body.designation,
        rawValue_int: req.body.rawValue_int,
        rawValue_bool: req.body.rawValue_bool
      }
      const createCaptor = await prisma.captor.create({ data: captor })
      res.json({ message: "Captor created succesfully" , createCaptor})
    } catch (error) {
      res.json({error: error})
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
