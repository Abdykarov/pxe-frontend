import { ISecuredLayout } from './securedLayout';

export interface ILocalStore {
    counter: ICounter;
    visibility: IVisibility;
    ui: IUi;
}

export interface ICounter {
    counter: {
        current: number;
        __typename: string;
    };
}

export interface IVisibility {
    current: number;
    __typename: string;
}

export interface IUi {
    securedLayout: ISecuredLayout;
    showOverlay: boolean;
    __typename: string;
}

