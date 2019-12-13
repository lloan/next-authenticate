import { Component } from "react";

export interface Request {
    body: {
        [property: string]: string
      }
    query: any;
}

export interface Response {
    send: (result: any | { message: string }) => void;
    status: (status: number) => void;
    setHeader: (header: string, value: string) => void;
}

export interface Redirects {
    [page: string]: {
        redirect: string | boolean
    }
}

export default class NextAuthenticate extends Component<NextAuthenticateProps> { }