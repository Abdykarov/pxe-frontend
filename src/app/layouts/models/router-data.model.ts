import { IUserTypes } from 'src/app/services/model/auth.model';

export interface ISettings {
    isPublic: boolean;
    isPublicEmptyPage?: boolean;
    isLandingPage: boolean;
    isSimpleFooter: boolean;
    isStatic: boolean;
    userType?: IUserTypes;
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

