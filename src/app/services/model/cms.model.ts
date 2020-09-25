export interface IRefreshTokenJwtResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

export interface ICmsJwtPayload {
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
    client_id: string;
    scope: Array<string>;
}
