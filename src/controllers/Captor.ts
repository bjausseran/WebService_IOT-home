import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, SensorType } from '@prisma/client'
import { ComposeResponse } from "src/modules/response";
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      // run inside `async` function
      const captors = await prisma.captor.findMany();
      res.json(ComposeResponse(res.statusCode.toString(), captors))
    }
     catch (error) {
      res.json( ComposeResponse(res.statusCode.toString(), undefined, new Error(JSON.stringify(error))));
     }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const captor = await prisma.captor.findUnique({
        where: {
          id: id,
        },
      }) as Record<string, any> | null;
      if(captor != null)
      res.json(ComposeResponse(res.statusCode.toString(), captor))
      else 
      {
        res.statusCode = 404;
        res.statusMessage = "Captor not found";
        let error = new Error("Captor not found");
        error.name = "Captor not found";
        error.message = "Captor not found";
        throw error;
      }
      //res.json(ComposeResponse("404", undefined, new Error("Captor not found")));
    } catch (error) {
      res.json( ComposeResponse(res.statusCode.toString(), undefined, new Error(JSON.stringify(error))));
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


  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateCaptor = await prisma.captor.update({
        where: {
          id: req.params.id,
        },
        data: {
            type: req.body.type,
            designation: req.body.designation,
            rawValue_int: req.body.rawValue_int,
            rawValue_bool: req.body.rawValue_bool
        }
      });
      res.json({ message: "patch captor", updateCaptor});
      return;
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteCaptor = await prisma.captor.delete({
      where: {
        id: req.params.id,
      },
    })
      res.json({ message: "delete captor" });
      return;
    } catch (error) {
      next(error);
    }
  }
};
