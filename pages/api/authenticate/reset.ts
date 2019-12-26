import db from '../../../lib/db';
import auth from '../../../lib/auth';
import client from '../../../lib/redis';
import {Response, Request, Message} from '../../..';

export default (req: Request, res: Response) => {
  // set headers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Content-Type", "json/javascript");

  // messages
  const invalid = {
    status: false,
    message: "request denied",
  } as Message;
  const valid = {
    status: true,
    message: "request submitted",
  } as Message;

  // Get credentials from JSON body
  const {email, token} = req.body;

  if (email) {
    db.getUserByEmail(escape(email))
        .then((user: any) => {
          if (token) {
            db.resetPassword(escape(email), escape(token))
                .then((data: any) => {
                  console.log(data);
                  res.send(data);
                });
          } else {
            db.initiatePasswordReset(escape(user.username), escape(email))
                .then((data: any) => {
                  res.send(data.serverStatus === 2 ? valid : invalid);
                });
          }
        });
  } else {
    res.send(invalid);
  }
};
