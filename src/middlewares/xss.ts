import { NextFunction, Request, Response } from "express";
import xss, { escapeHtml } from "xss";


export var xssCheck = function (req: Request, res: Response, next: NextFunction) {
    console.log("xssCheck");

    for (const key of Object.keys(req.body)) {
        {
            if(typeof req.body[key] === 'string' || req.body[key] instanceof String)
            {
                req.body[key] = escapeHtml(req.body[key]);
            }
        }
    }
    next();
  };