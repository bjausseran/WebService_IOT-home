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
import { Mailer } from "@/modules/mailer";

import { ComposeResponse } from "src/modules/response";
import { exit, getMaxListeners } from "process";
import cors from "cors";
import EventEmitter from "events";

const app = express();
const noDeletionStr = "Record to delete does not exist.";
const invalidValueStr = "Got invalid value";
const noUpdateStr = "Record to update not found.";
const noField ="Lines with + are required, lines with ? are optional";
const noFieldAnswer ="Field email or password (probably)";
const UniqueConstraint ="Unique constraint failed on the fields";
const UniqueConstraintAnswer ="Unique constraint failed on the fields (email?)";
const userNotFound ="pchstr must be a non-empty string";
const userNotFoundAnswer ="pchstr must be a non-empty string";





// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(xssCheck);
app.use(cors());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/sensor", captorRouter);
app.use("/actuator", actuatorRouter);

let mailer = new Mailer();

mailer.on("sendStatus", (status: string) => {
  console.log("app, MailerStatusEvent : " + status);
  
})

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
   else if(err.message.includes(noField)) err = new Error(noFieldAnswer);
   else if(err.message.includes(UniqueConstraint)) err = new Error(UniqueConstraintAnswer);
   else if(err.message.includes(userNotFound)) err = new Error(userNotFoundAnswer);

   
  
  let emailData = {
    from: '"Sender Name" broderick.kshlerin31@ethereal.email',
    to: "broderick.kshlerin31@ethereal.email",
    subject: "Error detected",
    text: "ERROR : " + err.message,
    html: "<strong>ERROR : " + err.message + "</strong>"
  }
  mailer.emit("sendEmail", emailData);

  res.json(ComposeResponse(res.statusCode.toString(), undefined, err));
});

export default app;
