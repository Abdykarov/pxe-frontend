export interface ISettings {
    isPublic: boolean;
    isSimpleFooter: boolean;
    signInType: SignType;
    showLogin: boolean;
}

export enum SignType {
    NONE,
    NAVIGATE,
    SCROLL,
    STATIC,
}
