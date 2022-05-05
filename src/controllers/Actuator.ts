import { NextFunction, Request, Response } from "express";
import { ComposeResponse } from "src/modules/response";
import { Database, ActuatorType } from "src/modules/database";
import { ActuatorUpdateSchema } from "@/types/actuator";
import { CreateData } from "@/interface/IDatabase";
import { debug } from "console";
const modelName = "actuator";
const db = new Database();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {  
      let actuators = null;
      const type = req.query.type;
      if(type != null)
      {
        actuators = await db.get(modelName, {
            type: type as ActuatorType
          })
      }
      
      else actuators = await db.get(modelName);
      

      res.json(ComposeResponse(res.statusCode.toString(), actuators))
    }
     catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const actuator = await db.getById(modelName, id);
      if(actuator != null) res.json(ComposeResponse(res.statusCode.toString(), actuator))
      else next(); 
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let actuator: CreateData
      
      actuator = {
        type: req.body.type,
        designation: req.body.designation,
        state: req.body.state
      }
      var unparsedActuator = await db.post(modelName, actuator)

      const createActuator = ActuatorUpdateSchema.parse(unparsedActuator)
      res.json(ComposeResponse(res.statusCode.toString(), {message: "created", id: createActuator.id}));
    } catch (error) {
      next(error)
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let unparsedActuator = await db.patch(modelName,{
        where: {
          id: req.params.id,
        },
        data: {
            type: req.body.type,
            designation: req.body.designation,
            state: req.body.state
        }
      })


      const updateActuator = ActuatorUpdateSchema.parse(unparsedActuator);
      res.json(ComposeResponse(res.statusCode.toString(), updateActuator))
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedActuator = await db.remove( modelName, req.params.id);

    res.json(ComposeResponse(res.statusCode.toString(), deletedActuator));
    } catch (error) {
      next(error);
    }
  }
};
