import { NextFunction, Request, Response } from "express";
import { ComposeResponse } from "@/modules/response";

import { Prisma, PrismaClient } from '@prisma/client'
import path from "path";
const prisma = new PrismaClient();
let jwt = require('jsonwebtoken');
import fs from "fs"

export var CheckAuth = async function (req: Request, res: Response, next: NextFunction) {
    console.log("So i'm suppose to check if dude is log right now ? aight");
    if (req.cookies.auth_token != null && req.cookies.auth_token != "" && req.cookies.auth_token != undefined) 
    {
      let privatekey  = fs.readFileSync(path.resolve(__dirname, process.env.PRIVATEKEY_LOCATION!), {encoding: "utf-8"});

    console.log("________________________________________________________");
    console.log("token :");
    console.log("________________________________________________________");
    console.log(req.cookies.auth_token);
    console.log("________________________________________________________");
    console.log("public key :");
    console.log("________________________________________________________");
    console.log(privatekey);
    console.log("________________________________________________________");

      let decoded = jwt.verify(
        req.cookies.auth_token,
        privatekey, 
        { algorithms: [process.env.ALGORITHM] }
        );

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