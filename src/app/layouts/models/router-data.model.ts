export interface ISettings {
    isPublic: boolean;
    isSimpleFooter: boolean;
    isStatic: boolean;
    isSupplier?: boolean;
    loginType: LoginType;
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

