import db from "../../lib/db";
import {Request} from "../../src/interfaces/RequestInterface";
import {Response} from "../../src/interfaces/ResponseInterface";
import {error} from "next/dist/build/output/log";
const root = require("app-root-path");
const fs = require("fs");

interface Model {
    [property: string]: any;
}

type Message = Model

// Setup database tables if they don't exist.
export default async (req: Request, res: Response) => {
  const {secret} = req.query; // secret key from user requesting setup

  // check if secret given matches one in this environment
  if (secret !== undefined && process.env.SECRET === secret) {
    console.log('here so far');
    // Promise based
    new Promise((resolve, reject) => {
      const models: Model = {}; // temporary store for all models

      // Iterate through file directory and find models
      fs.readdirSync(root + "/models") // directory to read
          .forEach((file: string) => { // iterate through each file in that directory
            const fileName = file.replace(".ts", ""); // remove .js
            console.log(fileName);
            const model = require("./../../models/" + fileName); // import the model
            models[fileName] = model.default; // add model to temp. store for later use
          });

      // if models found, resolve, reject if nothing found
      models.length === 0 ? reject(error) : resolve(models);
    })
        .then((models: any) => {
          const messages: Message = {}; // temporary message store

          console.log('inside promise', models);
          // iterate through all models found
          for (const model in models) {
          // model should have a main function with same name to trigger its creation
            if (models.hasOwnProperty(model)) {
              console.log('in iteration - typeof model', typeof models[model]);
              messages[model] = models[model](db); // save result to the message store
            }
          }

          res.status(200); // send a positive status
          res.send(messages); // send all messages as an object in response
        })
        .catch((error) => {
          res.status(400); // send negative status
          res.send(error); // send error found in response
        });
  } else {
    // secret did not match, let user know they're not authorized to run setup
    res.status(400);
    res.send({
      message: "not authorized to run setup...",
    });
  }
};
