import {Component} from "react";

export interface Request {
    body: {
        [property: string]: string;
      };
    query: any;
}

export interface Response {
    writeHead(statusCode: number, headers: { [properties: string]: string });
    send: (result: any | { message: string }) => void;
    status: (status: number) => void;
    setHeader: (header: string, value: string) => void;
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
