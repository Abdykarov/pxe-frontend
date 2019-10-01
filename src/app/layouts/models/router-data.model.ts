export interface ISettings {
    isPublic: boolean;
    isPublicEmptyPage?: boolean;
    isLandingPage: boolean;
    isSimpleFooter: boolean;
    isStatic: boolean;
    isSupplier?: boolean;
    loginType: LoginType;
    hideLeftNavigation?: boolean;
    hideHamburger?: boolean;
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
    RELOAD,
}

