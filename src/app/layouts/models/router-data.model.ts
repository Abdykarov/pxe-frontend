export interface ISettings {
    isPublic: boolean;
    isSimpleFooter: boolean;
    isStatic: boolean;
    isSupplier?: boolean;
    loginType: LoginType;
    hideLeftNavigate?: boolean;
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

