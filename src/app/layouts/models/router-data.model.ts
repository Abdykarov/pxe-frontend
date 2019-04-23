export interface ISettings {
    isPublic: boolean;
    isSimpleFooter: boolean;
    loginType: LoginType;
    logoutType: LogoutType;
    signInType: SignType;
}

export enum SignType {
    NONE,
    NAVIGATE,
    SCROLL,
    STATIC,
}

export enum LoginType {
    NONE,
    NAVIGATE,
    STATIC,
}


export enum LogoutType {
    NONE,
    NAVIGATE,
    STATIC,
}
