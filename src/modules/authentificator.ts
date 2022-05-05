import { EventEmitter } from "stream";
import { IDatabase, Filter, CreateData, UpdateData } from "../interface/IDatabase";
import argon2 from "argon2";
import { Captor,  SensorType, ActuatorType, Prisma, PrismaClient } from '@prisma/client'
import { ReadVResult } from "fs";
import { IAuthentificator } from "../interface/IAuthentificator";

import path from "path";
var jwt = require('jsonwebtoken');
import fs from "fs";
import { Database } from "../../src/modules/database";
import { UserUpdateShema } from "@/types/user";

const db = new Database();

export class Authentificator implements IAuthentificator {
    public async login(password: string, email?: string, username?: string)
    {
        let token = undefined;
        const user = await db.getUser(username,email) as Record<string, any> | null;

      if (await argon2.verify(user?.password, password)) {
                
        let privateKey = fs.readFileSync(path.resolve(__dirname, process.env.PRIVATEKEY_LOCATION!), "utf-8");
        token = jwt.sign({ email: user?.email, username: user?.username, password: user?.password}, privateKey, { algorithm: process.env.ALGORITHM});
      }
        
        return token;
    };

    public async signin(password: string, email: string, username: string)
    {
      let hashedPassword = (await argon2.hash(password)).toString();
      let user = {
        email: email,
        username: username,
        password: hashedPassword
      }
      const createUser = UserUpdateShema.parse(await db.post("user", user))
             
      var privateKey = fs.readFileSync(path.resolve(__dirname, process.env.PRIVATEKEY_LOCATION!), "utf-8");      
      var token = jwt.sign(
        {
          id: createUser.id, 
          email: createUser.email, 
          username: createUser.username,
          password: "Eh beh non !"
        }, 
        privateKey, 
        { 
          algorithm: process.env.ALGORITHM
        });

        return { createUser, token}
    }

    public async updateUser(id: string, password?: string, email?: string, username?: string)
    {
        let hashedPassword = (await argon2.hash(password as string)).toString();
        const updateUser = UserUpdateShema.parse(await db.patch("user", {
          where: {
            id: id,
          },
          data: {
              email: email,
              username: username,
              password: hashedPassword
          }
        })); 
        return updateUser;
    }
}





