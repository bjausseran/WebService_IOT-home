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
      next(error);
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
      if(actuator != null) res.json(ComposeResponse(res.statusCode.toString(), actuator))
      else next(); 
    } catch (error) {
      next(error);
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
      const createActuator = await prisma.actuator.create({ data: actuator })
      res.json(ComposeResponse(res.statusCode.toString(), createActuator));
    } catch (error) {
      next(error)
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
      res.json(ComposeResponse(res.statusCode.toString(), updateActuator))
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
    res.json(ComposeResponse(res.statusCode.toString(), deleteActuator));
    } catch (error) {
      next(error);
    }
  }
};
