import ReactDOMServer from 'react-dom/server';
import confirmationEmail from './../../email/templates/main/confirmationEmail';
import {Request, Response} from '../..';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const handleAction = (options: { action: string; username: string; data?: any }) => {
  const {action, username, data} = options;

  // handle the action requested
  switch (action) {
    case "confirm":
      return {
        subject: "Confirm your email.",
        html: ReactDOMServer.renderToStaticMarkup(confirmationEmail( {
          username,
          url: (process as any).env.HOST,
          token: data.token,
        })),
      };
  }
};

export default async (req: Request, res: Response): Promise<void> => {
  // set headers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Content-Type", "json/javascript");

  const {action, username, email, data} = req.body;

  if (!action || !username || !email) {
    res.status(400);
    res.send({
      state: false,
      message: "Invalid input",
    });
    return;
  }

  const mailOptions= Object.assign({
    from: '"Administrator" <admin@iesd.com>',
    to: String(email),
  }, handleAction({action, username, data}));


  transporter.sendMail(mailOptions, (err: any, info: string) => {
    if (err) {
      res.send({
        state: false,
        message: "Email failed.",
      });
    }

    console.log("Info: ", info);
    res.send({
      state: true,
      message: "Email successfully sent.",
    });
  });
};
