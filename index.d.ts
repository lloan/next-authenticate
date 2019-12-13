import { Component } from "react";

export interface Request {
    body: any;
    query: any;
}

export interface Response {
    send: (result: any | { message: string }) => void;
    status: (status: number) => void;
}

export default class NextAuthenticate extends Component<NextAuthenticateProps> { }