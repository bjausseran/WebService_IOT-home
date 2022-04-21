import express, { NextFunction, Request, Response } from "express";
import { Captor, Prisma, PrismaClient, SensorType } from '@prisma/client'
import { ComposeResponse } from "@/modules/response";
import { CaptorR, convert } from "@/modules/data_converter";
import {CaptorUpdateShema } from "../types/captor";
import { boolean } from "zod";
const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {      
      let captors: Captor[];
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

      let captorsR: CaptorR[] = [];

      for(let capt of captors)
      {
        var convertedCaptor = convert(capt);
        if(convertedCaptor instanceof String)
          res.json(ComposeResponse(res.statusCode.toString(), undefined, new Error(capt.id + " is a invalid captor type")))
        else 
          captorsR[captors.indexOf(capt)] = convertedCaptor as CaptorR;
      }

      res.json(ComposeResponse(res.statusCode.toString(), captorsR!));
    }
     catch (error) {
      next(error)
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      let captor = await prisma.captor.findUnique({
        where: {
          id: id,
        },
      }) as Record<string, any> | null;



      let captorR: CaptorR;

      if(captor != null) 
      {
        var convertedCaptor = convert(captor as Captor);
        if(convertedCaptor instanceof String)
          res.json(ComposeResponse(res.statusCode.toString(), undefined, new Error(captor.id + " is a invalid captor type")))
        else 
        {
          captorR = convertedCaptor as CaptorR;
          res.json(ComposeResponse(res.statusCode.toString(), captorR));
        }
      }
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
      let createCaptor = CaptorUpdateShema.parse(await prisma.captor.create({ data: captor })) as Captor

      
      let captorR: CaptorR;
      let convertedCaptor = convert(createCaptor as Captor);

      if(convertedCaptor instanceof String)
        res.json(ComposeResponse(res.statusCode.toString(), undefined, new Error(createCaptor.id + " is a invalid captor type")));
      else 
      {
        captorR = convertedCaptor as CaptorR;
        console.log("captorR.id ===== " + captorR.id);
        res.json(ComposeResponse(res.statusCode.toString(), {message: "created", id: captorR.id}));
      }

    } catch (error) {
      next(error);
    }
  },


  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let reqOption = {
        where: {
          id: req.params.id,
        },
        data: {
            type: req.body.type,
            designation: req.body.designation,
            rawValue_int: req.body.rawValue,
            rawValue_bool: req.body.rawValue
        }
      };

      if(typeof req.body.rawValue === 'boolean' || req.body.rawValue instanceof Boolean)
      {
        console.log("value is boolean " + req.body.rawValue);
        reqOption.data.rawValue_int = null;
      }
      else if(typeof req.body.rawValue === 'number' || req.body.rawValue instanceof Number)
      {
        console.log("value is number");
        reqOption.data.rawValue_bool = null;
      }

      let updateCaptor = CaptorUpdateShema.parse(await prisma.captor.update(reqOption));
      res.json(ComposeResponse(res.statusCode.toString(), req.body))
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
