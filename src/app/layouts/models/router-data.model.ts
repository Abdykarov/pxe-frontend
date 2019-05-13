export interface ISettings {
    isPublic: boolean;
    isSimpleFooter: boolean;
    isSupplier?: boolean;
    loginType: LoginType;
    logoutType: LogoutType;
    signUpType: SignType;
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
