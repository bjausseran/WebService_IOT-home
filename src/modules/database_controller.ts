import { NextFunction, Request, Response } from "express";
import { ActuatorType, Prisma, PrismaClient } from '@prisma/client'
import { ComposeResponse } from "../modules/response";
import { ActuatorUpdateSchema } from "@/types/actuator";
import { CaptorUpdateShema } from "@/types/captor";
import { UserUpdateShema } from "@/types/user";
import QueryString from "qs";
const prisma = new PrismaClient();

export const getActuators = (req: Request, res: Response, next: NextFunction) =>
{
  const type = req.query.type;
  console.log("GetActuator, type = " + type);
  get( "actuator", req, res, next, type);
}
export const getCaptors = (req: Request, res: Response, next: NextFunction) =>
{
  const type = req.query.type;
  get( "captor", req, res, next, type);
}
export const getUsers = (req: Request, res: Response, next: NextFunction) =>
{
  //const type = req.query.type;
  get("user", req, res, next);
}

const get = async (
  object: string, 
  req: Request, res: Response, next: NextFunction,
  type?: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined) =>
{
  try{
  let objects = undefined;
  // if(type != null)
  // {
    //   objects = await object.findMany(
    // {
    //   where: {
    //     type: type as ActuatorType
    //   }
    // });
  //}
  //else 
    console.log("Get actuator, type = " + type);
    let model = undefined;
    
    if(object === "actuator") model = prisma["actuator"];
    else if(object === "captor") model = prisma["captor"];
    else if(object === "user") model = prisma["user"];

    if(model === undefined) res.json(ComposeResponse(res.statusCode.toString(), objects))
    else{
      if(type != null)
      {
        console.log("Get, type = " + type);
        objects = await model.findMany(
        {
          where: {
            type: type as ActuatorType
          }
        });
      }
      else objects = await model.findMany();
      console.log("Get, type = " + type);
    //objects = await object.findMany();
  
  
  res.json(ComposeResponse(res.statusCode.toString(), objects))
    }
    
      
  }
  catch (error) {
    next(error);
  }
}



