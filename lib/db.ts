import {Message} from "..";
import fetch from "isomorphic-unfetch";

const escape = require('sql-string-escape');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  pool: {min: 0, max: 7},
});

// User methods
db.getUser = function(user: string): object | boolean {
  return new Promise((resolve, reject) => {
    db.query(`SELECT last_login, confirmation, password FROM ${process.env.DBNAME}.user WHERE username = ${escape(user)}`,
        function(error: { sqlMessage: any }, results: string | any[]) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          // returns only the first user it finds - token, last_login date and password
          resolve(results.length !== 0 ? results[0] : false);
        });
  });
};

db.getUserByEmail = function(email: string): object | boolean {
  return new Promise((resolve, reject) => {
    db.query(`SELECT username, password_reset FROM ${process.env.DBNAME}.user WHERE email = ${escape(email)}`,
        function(error: { sqlMessage: any }, results: string | any[]) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          // returns only the first user it finds - assumes it will only have one to choose from
          resolve(results.length !== 0 ? results[0] : false);
        });
  });
};

db.userExists = function(user: string): Promise<object> {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id FROM ${process.env.DBNAME}.user WHERE username = ${escape(user)}`,
        function(error: { sqlMessage: any }, results: string | any[]) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          // returns only the first user it finds - only the ID
          resolve(results.length !== 0 ? results[0] : false);
        });
  });
};

db.createUser = function(user: string, pass: string, email: string, role: string): Promise<object> {
  return new Promise((resolve, reject) => {
    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(pass, salt);
    const token: string = bcrypt.genSaltSync(16); // will be used to confirm email - set to false after confirmation
    db.query(`INSERT INTO iesd_portal.user (username, password, email, role, confirmation) VALUES ('${user}', '${hash}', '${email}', '${role}', '${token}')`,
        function(error: { sqlMessage: any }, results: object) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          results !== undefined && results.hasOwnProperty('insertId') ?
              resolve(Object.assign(results, {token})) :
              reject(results);
        });
  });
};

db.createTable = function(tableName: string, query: any) {
  console.log(`\nAttempting to create ${tableName} table...`);

  return new Promise((resolve, reject) => {
    // checks if table exists in this database
    db.query(`SELECT * FROM ${process.env.DBNAME}.${tableName}`, function(error: any, results: any) {
      if (error) console.log('Error found: ', error.sqlMessage ? error.sqlMessage : error);

      // if table exists
      if (results === undefined) {
        console.log(`Creating ${tableName} table...`);

        // create the table using query passed in
        db.query(query, function(error: { sqlMessage: any }) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          resolve({
            status: true,
            message: `${tableName} table creation successful.`,
          } as Message);

          console.log(`${tableName} table creation completed!\n`);

          return true;
        });
      } else {
        resolve({
          status: false,
          message: `${tableName} table already exists.`,
        } as Message);

        return false;
      }
    });
  });
};

// Email methods
db.emailExists = function(email: string): Promise<object> {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id FROM ${process.env.DBNAME}.user WHERE email = ${escape(email)}`,
        function(error: { sqlMessage: any }, results: string | any[]) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          // returns only the first user it finds - only the ID
          resolve(results.length !== 0 ? results[0] : false);
        });
  });
};

db.emailConfirmed = function(user: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.query(`SELECT confirmation FROM ${process.env.DBNAME}.user WHERE username = ${escape(user)}`,
        function(error: { sqlMessage: any }, results: string | any[]) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          // check if confirmation is set to false or not (true == confirmed)
          resolve(results.length !== 0 ? results[0] === false : false);
        });
  });
};

db.confirmEmail = function(user: string, token: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Get current confirmation token from the DB for user in question
    db.query(`SELECT confirmation FROM ${process.env.DBNAME}.user WHERE username = ${escape(user)}`,
        function(error: any, results: any) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          // check if data was found
          if (results.length !== 0) {
            const {confirmation} = results[0]; // get confirmation token

            // if account is already active, let user know
            if (confirmation == 'active') {
              resolve(confirmation);
            } else if (confirmation === token) {
              // token matched - set token to active
              db.query(`UPDATE ${process.env.DBNAME}.user SET confirmation = 'active' WHERE username = ${escape(user)}`,
                  function(error: any, results: any) {
                    if (error) reject(error.sqlMessage ? error.sqlMessage : error);

                    // return results - we assume this will work.
                    resolve(results);
                  });
            } else {
              reject(Error("Token is not valid, account not activated."));
            }
          } else {
            reject(Error("The data is invalid."));
          }
        });
  });
};

db.initiatePasswordReset = function(user: string, email: string): Promise<boolean> {
  const token: string = bcrypt.genSaltSync(16); // generates a token for password_token column.

  return new Promise((resolve, reject) => {
    db.query(`UPDATE ${process.env.DBNAME}.user SET password_reset = 1, password_token = '${token}' WHERE username = ${escape(user)}`,
        function(error: any, results: any) {
          if (error) reject(error.sqlMessage ? error.sqlMessage : error);

          const data = {
            action: 'reset',
            data: {
              token,
            },
            username: user,
            email,
          };

          fetch(`${process.env.HOST}api/mail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              });

          // return results - we assume this will work.
          resolve(results);
        });
  });
};
export default db;
