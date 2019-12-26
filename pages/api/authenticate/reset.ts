import db from '../../../lib/db';
import auth from '../../../lib/auth';
import client from '../../../lib/redis';
import {Response, Request} from '../../..';

export default async (req: Request, res: Response) => {
  // set headers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Content-Type", "json/javascript");

  // messages
  const invalid = {
    state: false,
    message: "request denied",
  };
  const valid = {
    state: true,
    message: "request submitted",
  };

  // Get credentials from JSON body
  const {email} = req.body;

  if (email) {
    // get the user - initial check
    db.getUserByEmail(escape(email)).then((user: any) => {
      res.status(200);

      // if user is not found, return early
      if (!user) {
        res.send(invalid);
        return false;
      }

      console.log(user);
    });
  } else {
    res.send(invalid);
    return false;
  }
};
