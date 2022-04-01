import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { ComposeResponse } from "src/modules/response";
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      // run inside `async` function
      const actuators = await prisma.actuator.findMany();
      res.json(ComposeResponse(res.statusCode.toString(), actuators))
    }
     catch (error) {
      res.json( ComposeResponse(res.statusCode.toString(), undefined, new Error(JSON.stringify(error))));
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
      const updateActuator = await prisma.actuator.update({
        where: {
          id: req.params.id,
        },
        data: {
            type: req.body.type,
            designation: req.body.designation,
            state: req.body.state
        }
      });
      res.json({ message: "patch actuator", updateActuator });
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteActuator = await prisma.actuator.delete({
      where: {
        id: req.params.id,
      },
    })
      res.json({ message: "delete actuator", deleteActuator });
      return;
    } catch (error) {
      next(error);
    }
  }
};
