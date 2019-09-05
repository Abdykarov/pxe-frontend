export interface ISettings {
    isPublic: boolean;
    isLandingPage: boolean;
    isSimpleFooter: boolean;
    isStatic: boolean;
    isSupplier?: boolean;
    loginType: LoginType;
    hideLeftNavigation?: boolean;
    signUpType: SignType;
    hideLogin?: boolean;
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
    RELOAD,
}

