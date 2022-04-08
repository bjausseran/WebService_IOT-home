import { NextFunction, Request, Response } from "express";
import xss, { escapeHtml } from "xss";


export var xssCheck = function (req: Request, res: Response, next: NextFunction) {
    console.log("xssCheck");

    for (const key of Object.keys(req.body)) {
        req.body[key] = escapeHtml(req.body[key]);
    }
    
    for (const key of Object.keys(req.query)) {
        req.query[key] = xss(req.query[key] as string);
    }
    
    for (const key of Object.keys(req.params)) {
        req.params[key] = xss(req.params[key] as string);
    }
    
    for (const key of Object.keys(req.headers)) {
        req.headers[key] = xss(req.headers[key] as string);
    }
    next();
  };