import {Component} from "react";

export interface Request {
    body: {
        [property: string]: string;
      };
    query: any; // TODO: find a better type.
    cookies: any; // TODO: find a better
}

export interface Response {
    writeHead(statusCode: number, headers: { [properties: string]: string });
    send: (result: any | { message: string }) => void;
    status: (status: number) => void;
    setHeader: (header: string, value: string | Array) => void;
}

export interface Redirects {
    [page: string]: {
        redirect: string | boolean;
    };
}

export interface Notification extends UIkit.Notify {
    notification: Function;
  }

export default class NextAuthenticate extends Component<NextAuthenticateProps> { }
