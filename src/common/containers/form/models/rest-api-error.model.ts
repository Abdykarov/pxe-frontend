export interface IRestAPIError {
    headers: any;
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    name: string;
    message: string;
    error: {
        errorCode?: string;
        message?: string;
    };
}
