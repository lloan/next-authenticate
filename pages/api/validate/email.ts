import db from '../../../lib/db';
import {Response, Request} from '../../../index';

export default async (req: Request, res: Response) => {
  if (!req.body.email) {
    res.status(500);
    res.send({
      message: "Error with data provided.",
    });

    return false;
  }

  // Get credentials from JSON body
  const {email} = req.body;

  db.emailExists(email)
      .then((result: any) => {
        res.send(JSON.stringify(result));
        res.status(200);
      }).catch((error: any) => {
        res.send(JSON.stringify(error));
        res.status(500);
      });
};
