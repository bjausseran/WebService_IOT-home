import { NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { xssCheck } from "src/middlewares/xss";

// Routers
import indexRouter from "@/routes/Index";
import userRouter from "@/routes/User";
import captorRouter from "@/routes/Captor";
import actuatorRouter from "@/routes/Actuator";

import { ComposeResponse } from "src/modules/response";
import { exit } from "process";

const app = express();
const noDeletionStr = "Record to delete does not exist.";
const invalidValueStr = "Got invalid value";
const noUpdateStr = "Record to update not found.";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(xssCheck);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/captor", captorRouter);
app.use("/actuator", actuatorRouter);

// catch 404
app.use(function (req: Request, res: Response, next: NextFunction) {
  // handle it how it pleases you
  res.statusCode = 404;
  res.json( ComposeResponse(res.statusCode.toString(), undefined, new Error("Object not found")));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  if(err.message.includes(noDeletionStr)) err = new Error(noDeletionStr);
  else if(err.message.includes(invalidValueStr)) err = new Error(invalidValueStr);
  else if(err.message.includes(noUpdateStr)) err = new Error(noUpdateStr);

  res.json(ComposeResponse(res.statusCode.toString(), undefined, err));
});

export default app;
