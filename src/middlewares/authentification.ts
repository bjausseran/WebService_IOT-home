import express, { NextFunction, Request, Response } from "express";
import { ComposeResponse } from "src/modules/response";


export var CheckAuth = function (req: Request, res: Response, next: NextFunction) {
    console.log("So i'm suppose to check if dude is log right now ? aight");
    if (req.cookies.auth_token != null) next();
    else throw(Error("Not token register, please log in"));

    
  };