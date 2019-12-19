import db from '../../../lib/db';
import {Request, Response} from '../../..';

export default async (req: Request, res: Response) => {
  // Get credentials from JSON body
  const {username} = req.body;


  db.userExists(username)
      .then((result: any) => {
        res.send(JSON.stringify(result));
      }).catch((error: any) => {
        res.send(JSON.stringify(error));
      });
};
