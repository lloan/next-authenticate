import db from '../../../lib/db';
import {Request, Response} from '../../..';

export default async (req: Request, res: Response): Promise<void> => {
  const {user = false, token = false} = req.body;
  console.log(user, token);

  if (user && token) {
    db.confirmEmail(user, token)
        .then((result: any) => {
          console.log("result ", result);

          if (result && result === 'active') {
            res.status(200);
            res.send({
              status: true,
              message: "Account already activate.",
            });
          } else if (result && result.serverStatus === 2) {
            res.status(200);
            res.send({
              status: true,
              message: "Account has been activated.",
            });
          }
        }).catch((error: Error) => {
          res.status(503); // forbidden
          res.send({
            status: false,
            message: error.message,
          });

          return;
        });
  } else {
    res.status(503);
    res.send({
      status: false,
      message: "Invalid input provided.",
    });
  }
};
