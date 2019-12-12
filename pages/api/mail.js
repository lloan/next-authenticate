import ReactDOMServer from 'react-dom/server';
import confirmation from '../../email/confirmation';
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

const handleAction = (options) => {
  const {action, user} = options;

  // handle the action requested
  switch (action) {
    case "confirmation":
      return {
        subject: "Confirm your email.",
        html: ReactDOMServer.renderToStaticMarkup({
          user,
          url: process.env.HOST + "/confirm",
        }),
      };
    case "default":
      res.status(500);
      res.send("Error sending email");
      break;
  }
};

export default async (req, res) => {
  // set headers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Content-Type", "json/javascript");

  const {action = false, user = false, email = false} = req.body;

  const mailOptions= Object.assign({
    from: '"Administrator" <admin@iesd.com>',
    to: String(email),
  }, handleAction({action, user}));


  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send({
        message: "Email failed.",
      });
    }
    console.log("Info: ", info);
    res.send({
      message: "Email successfully sent.",
    });
  });
};
