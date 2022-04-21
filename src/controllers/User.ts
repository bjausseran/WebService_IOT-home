import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { Prisma, PrismaClient } from '@prisma/client'
import { ComposeResponse } from "src/modules/response";
import { UserUpdateShema } from "@/types/user";
import * as argon2 from "argon2";
import path from "path";
var jwt = require('jsonwebtoken');
import fs from "fs";
var app = express();

const prisma = new PrismaClient();

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // run inside `async` function
      const users = await prisma.user.findMany(
        {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      );  
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
      const user = await prisma.user.findFirst({
        where: {
          username: username,
          email: email
        },
      }) as Record<string, any> | null;

       if (await argon2.verify(user?.password, password)) {
                
        var privateKey = fs.readFileSync(path.resolve(__dirname, process.env.PRIVATEKEY_LOCATION!), "utf-8");
        var token = jwt.sign({ email: user?.email, username: user?.username, password: user?.password}, privateKey, { algorithm: process.env.ALGORITHM});
        
        app.use(cookieParser());
        res.cookie("auth_token", token);
        
        res.json(ComposeResponse(res.statusCode.toString(), {message: "sucess", id: token}));

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
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          username: true
        }
      }) as Record<string, any> | null;
      if(user != null) res.json(ComposeResponse(res.statusCode.toString(), user))
      else next(); 
    } catch (error) {
      next(error);
    }
  },
  
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let hashedPassword = (await argon2.hash(req.body.password)).toString();
      let user: Prisma.UserCreateInput      
      user = {
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      }
      const createUser = UserUpdateShema.parse(await prisma.user.create({ data: user }))
             
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
      
      app.use(cookieParser());
      res.cookie("auth_token", token);

      res.json(ComposeResponse(res.statusCode.toString(), {message: "created", id: createUser.id, token: token}));
    } catch (error) {
      next(error)
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let hashedPassword = (await argon2.hash(req.body.password)).toString();
      const updateUser = UserUpdateShema.parse(await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        }
      }));
      
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
      const deleteUser = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    })
    res.json(ComposeResponse(res.statusCode.toString(), deleteUser));
    } catch (error) {
      next(error);
    }
  }
};
