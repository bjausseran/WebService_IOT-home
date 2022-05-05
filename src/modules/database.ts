import { EventEmitter } from "stream";
import { IDatabase, Filter, CreateData, UpdateData } from "../interface/IDatabase";
import argon2 from "argon2";
import { Captor,  SensorType, ActuatorType, Prisma, PrismaClient } from '@prisma/client'
import { ReadVResult } from "fs";

const prisma = new PrismaClient()

const modelDictionary = {
    "user": prisma["user"],
    "captor": prisma["captor"],
    "actuator": prisma["actuator"]
  };

  var modelData: any;
  
export type { Captor };
export type { SensorType };
export type { ActuatorType };

export class Database implements IDatabase {
    hasher = argon2
    // constructor() {
    //     super()
    // }
    

    public getModel(modelName: string) : any
    {
        return modelDictionary[modelName as keyof typeof modelDictionary];
    }

    public get(model : string, filter?: Filter)
    {
        let modelData = this.getModel(model)
        console.log("get : " + model.toString());
        if(filter != null)
        {
            if(modelData != undefined)
            return modelData.findMany({
                    where: filter
            });
        }
        else
        {
            return modelData.findMany();
        }
    }
    public getById(model: string, id: string)
    {
        console.log("get by id : " + model.toString());
        let modelData = this.getModel(model)
        return modelData.findUnique({
            where: {
              id: id,
            },
          });
    }
    
    public async post(model: string, data : CreateData)
    {
        let modelData = this.getModel(model);
        return await modelData.create({ data: data});
    }

    public async patch(model : string, data : UpdateData)
    {
        let modelData = this.getModel(model);
        return await modelData.update(data);
    
    }
    public async remove(model : string, id : string)
    {
        let modelData = this.getModel(model);
        return await modelData.delete({
            where: {
              id: id,
            },
          });
    }
    async getUser(username: any, email: any ): Promise<Record<string, any> | PromiseLike<Record<string, any> | null> | null> {
        
        console.log("Database, getUser : param name = " + username);
        console.log("Database, getUser : param email = " + email);
        let result = await prisma.user.findMany({
            where: {
                 username: username,
                 email: email
            },
          });
        console.log("Database, getUser : result = " + result[0].email);
        console.log("Database, getUser : result = " + result[0].username);
        console.log("Database, getUser : result = " + result[0].password);
        return result[0];
      }
      
}





