import express, { NextFunction, Request, Response } from "express";
import { ComposeResponse } from "src/modules/response";
import { UserUpdateShema } from "@/types/user";
import { Database } from "src/modules/database";
import { Authentificator } from "src/modules/authentificator";
import * as argon2 from "argon2";

//const prisma = new PrismaClient();
const modelName = "user";
const db = new Database();
const auth = new Authentificator();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // run inside `async` function
      const users = await db.get(modelName);
      delete users["password"];
      res.json(ComposeResponse(res.statusCode.toString(), users))
    }
     catch (error) {
      next(error)
    }
  },

  log: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const password = req.body.password;
      const username = req.body.username;
      const email = req.body.email;

      let tokenOrUndefined = await auth.login(password, email, username);

       if (tokenOrUndefined !== undefined) {
        
        res.json(ComposeResponse(res.statusCode.toString(), {message: "success", id: tokenOrUndefined}));

       } else {
         next();
       }
    } catch (error) {
      next(error);
    }

  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await db.getById(modelName, id);
      console.log("get by id user")
      if(user != null) 
      {
        delete user["password"];
        res.json(ComposeResponse(res.statusCode.toString(), user));
      }
      else next(); 
    } catch (error) {
      next(error);
    }
  },
  
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let email = req.body.email,
      username = req.body.username,
      password = req.body.password;

      let result = await auth.signin(password, email, username);
      
      res.json(ComposeResponse(res.statusCode.toString(), {message: "created", id: result.createUser.id, token: result.token}));
    } catch (error) {
      next(error)
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let email = req.body.email,
      username = req.body.username,
      password = req.body.password,
      id = req.params.id;

      let updateUser = await auth.updateUser(id, password, email, username)

      
      let resUser = {
        id: updateUser.id,
        email: updateUser.email,
        username: updateUser.username,
      }
      res.json(ComposeResponse(res.statusCode.toString(), resUser))
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteUser = await db.remove(modelName, req.params.id)
    res.json(ComposeResponse(res.statusCode.toString(), deleteUser));
    } catch (error) {
      next(error);
    }
  }
};
