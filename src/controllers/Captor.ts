import express, { NextFunction, Request, Response } from "express";

import { ComposeResponse } from "@/modules/response";
import { CaptorR, convert } from "@/modules/data_converter";
import { Database, Captor,  SensorType } from "src/modules/database";
import {CaptorUpdateShema } from "../types/captor";
import { boolean } from "zod";
import { CreateData } from "@/interface/IDatabase";
const modelName = "captor";
const db = new Database();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    
     try {      
       let captors: Captor[];
       const type = req.query.type;
       if(type != null)
       {
         captors = await db.get(modelName, {type: type as SensorType});
       }
       else captors = await db.get(modelName);
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
      let captor = await db.getById(modelName, id);



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
      let captor: CreateData;

      captor = {
        type: req.body.type,
        designation: req.body.designation,
        rawValue_int: req.body.rawValue_int,
        rawValue_bool: req.body.rawValue_bool
      }
      let createCaptor = CaptorUpdateShema.parse(await db.post(modelName, captor)) as Captor

      
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

      let updateCaptor = CaptorUpdateShema.parse(await db.patch(modelName, reqOption));
      res.json(ComposeResponse(res.statusCode.toString(), req.body))
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteCaptor = await db.remove(modelName, req.params.id);
    res.json(ComposeResponse(res.statusCode.toString(), deleteCaptor));
    } catch (error) {
      next(error);
    }
  }
};
