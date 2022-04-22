import { NextFunction, Request, Response } from "express";
import { ComposeResponse } from "@/modules/response";

import { Prisma, PrismaClient } from '@prisma/client'
import path from "path";
const prisma = new PrismaClient();
//let jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
import fs from "fs"
import { string } from "zod";

export var CheckAuth = async function (req: Request, res: Response, next: NextFunction) {
    console.log("So i'm suppose to check if dude is log right now ? aight");

    let decoded: any;

    if (req.headers.authorization && req.headers.authorization!.indexOf('Bearer ') !== -1) 
    {
      let privatekey  = fs.readFileSync(path.resolve(__dirname, process.env.PRIVATEKEY_LOCATION!), {encoding: "utf-8"});

      let head = req.headers.authorization?.substring(req.headers.authorization!.indexOf('Bearer ') + 7);
      console.log(head);

      try
      {
       decoded = jwt.verify(
         head,
         privatekey, 
         { algorithms: [process.env.ALGORITHM as jwt.Algorithm] }
         );
      }
      catch
      {
        res.json( ComposeResponse("500", undefined, new Error("Wrong token")));
        return;
      }
      

        const user = await prisma.user.findFirst({
          where: {
            email: decoded.email,
            password: decoded.password
          },
        }) as Record<string, any> | null;
      

      if(user!= null) next();
      else res.json( ComposeResponse("500", undefined, new Error("Wrong token")));
    }
    else res.json( ComposeResponse("500", undefined,new Error("No token register, please log in")));

    
  };