import EventEmitter from 'events';
import nodemailer from 'nodemailer';
import { IMailer, MailData } from '../../src/interface/IMailer';

let transporter: any;

export class Mailer extends EventEmitter implements IMailer
{
  constructor() {
    super();
    this.SetUpTransport();
    this.sendStatus();

    this.on("sendEmail", (maildData: MailData) => {
      this.sendEmail(maildData);
    });
    
  }
    public async sendEmail(mailData: MailData) {

      try{
        const info = await transporter.sendMail({
            from: mailData.from,
            to: mailData.to,
            subject: mailData.subject,
            text: mailData.text,
            html: mailData.html
            //headers: { 'x-myheader': 'test header' }
          });
        
          console.log("Message sent: %s", info.response);
      }
      catch(error: any)
      {
        throw(new Error(error));
      }


      
    }
    public SetUpTransport() {
      console.log("Mailer, Set Up Transport");
      

      try
      {
      const hostname = "smtp.ethereal.email";
      const username = "broderick.kshlerin31@ethereal.email";
      const password = "5KeJUuRG4ntnEXc8DV";

      transporter = nodemailer.createTransport({
        host: hostname,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: username,
          pass: password,
        },
        logger: true
      });
      }
      catch(error: any){
        throw(new Error(error));
      }
      
    }

  public async sendStatus()
  {
    while(true)
    {

      let mailer = this;
      let success: any;
      transporter.verify(function (error: Error, success: any) {
        if (error) {
          mailer.emit("sendStatus", ("500 : " + error.message as String));
        } else {
          mailer.emit("sendStatus", "200 : Ready to send mail");
        }
      });

      // console.log("Mailer, SendStatus Loop : " + transporter.statusCode);
      await sleep(2000);
    }
  }
}


function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

