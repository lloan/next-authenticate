export interface Response {
    send: (result: any | { message: string }) => void;
    status: (status: number) => void;
}
