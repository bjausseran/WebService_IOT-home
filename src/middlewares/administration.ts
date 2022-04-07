import { NextFunction, Request, Response } from "express";


export var CheckAdmin = function (req: Request, res: Response, next: NextFunction) {
    console.log("So i'm suppose to check if dude is admin right now ? aight");
    next();
  };