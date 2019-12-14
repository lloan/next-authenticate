import db from '../../../lib/db';
import { Request, Response } from '../../..';

export default async (req: Request, res: Response): Promise<void> => {
  const {user, token} = req.body;
  
  return db.confirmEmail(user,token)
      .then((result: any) => {
          if (result && result.serverStatus === 2) {
            res.writeHead(302, { Location: `/confirmation?user=${user}` })
          } else {
            res.writeHead(302, { Location: `/forbidden`})
          }
      }).catch((error: string) => {
        res.send(JSON.stringify(error));
      });
};
