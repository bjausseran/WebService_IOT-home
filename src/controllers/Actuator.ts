import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      // run inside `async` function
      const actuators = await prisma.actuator.findMany();
      res.json(actuators)
    }
     catch (error) {
       res.json({ error})
     }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const actuator = await prisma.actuator.findUnique({
        where: {
          id: id,
        },
      });
      res.json(actuator);
    } catch (error) {
      res.json(error)
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let actuator: Prisma.ActuatorCreateInput
      actuator = {
        type: req.body.type,
        designation: req.body.designation,
        state: req.body.state
      }
      const createCaptor = await prisma.actuator.create({ data: actuator })
      res.json({ message: "Captor created succesfully" , createCaptor})
    } catch (error) {
      res.json({error: error})
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "patch actuator" });
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "delete actuator" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
