import express, { NextFunction, Request, Response } from "express";

import { Prisma, PrismaClient } from '@prisma/client'
var jwt = require('jsonwebtoken');
var fs = require('fs');
const prisma = new PrismaClient();

export var CheckAuth = function (req: Request, res: Response, next: NextFunction) {
    console.log("So i'm suppose to check if dude is log right now ? aight");
    if (req.cookies.auth_token != null) 
    {
      var privateKey = fs.readFileSync(process.env.PRIVATEKEY_LOCATION);
      var decoded = jwt.verify(req.cookies.auth_token, privateKey);

      const user = prisma.user.findFirst({
        where: {
          email: decoded.email,
          password: decoded.password
        },
      }) as Record<string, any> | null;

      if(user!= null) next();
      else throw(Error("Wrong token"));
    }
    else throw(Error("Not token register, please log in"));

    
  };