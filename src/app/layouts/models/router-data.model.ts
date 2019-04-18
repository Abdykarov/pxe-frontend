export interface ISettings {
    isPublic: boolean;
    isSimpleFooter: boolean;
    loginType: LoginType;
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
