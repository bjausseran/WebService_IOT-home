import express, { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, SensorType } from '@prisma/client'
import { ComposeResponse } from "@/modules/response";
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      let captors = null;
      const type = req.query.type;
      if(type != null)
      {
        captors = await prisma.captor.findMany(
        {
          where: {
            type: type as SensorType
          }
        })
        
      }
      else captors = await prisma.captor.findMany();
      res.json(ComposeResponse(res.statusCode.toString(), captors!));
    }
     catch (error) {
      next(error)
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
      if(captor != null) res.json(ComposeResponse(res.statusCode.toString(), captor))
      else next(); 
    } catch (error) {
      next(error);
  }
},

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      let captor: Prisma.CaptorCreateInput;

      captor = {
        type: req.body.type,
        designation: req.body.designation,
        rawValue_int: req.body.rawValue_int,
        rawValue_bool: req.body.rawValue_bool
      }
      const createCaptor = await prisma.captor.create({ data: captor })
      res.json(ComposeResponse(res.statusCode.toString(), createCaptor));
    } catch (error) {
      next(error)
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
      res.json(ComposeResponse(res.statusCode.toString(), updateCaptor))
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
    res.json(ComposeResponse(res.statusCode.toString(), deleteCaptor));
    } catch (error) {
      next(error);
    }
  }
};
