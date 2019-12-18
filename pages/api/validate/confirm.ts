import db from '../../../lib/db';
import {Request, Response} from '../../..';

export default async (req: Request, res: Response): Promise<void> => {
  const {user, token} = req.body;

  // TODO: use a page that does an API call instead of direct API call via browser as it doesn't work.
  db.confirmEmail(user, String(token))
      .then((result: any) => {
        if (result && result.serverStatus === 2) {
          res.writeHead(302, {Location: `/confirmation?user=${user}`});
        } else {
          res.writeHead(302, {Location: `/forbidden`});
        }
      }).catch((error: string) => {
        res.send(JSON.stringify(error));
      });
};
