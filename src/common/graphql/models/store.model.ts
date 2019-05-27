import { ISecuredLayout } from './secured-layout.model';

export interface ILocalStore {
    counter: ICounter;
    visibility: IVisibility;
    ui: IStoreUi;
}

export interface ICounter {
    counter: {
        current: number;
        __typename: string;
    };
}

export interface IVisibility {
    visiblity: {
        current: number;
        __typename: string;
    };
}

export interface IStoreUi {
    securedLayout: ISecuredLayout;
    showOverlay: boolean;
    __typename: string;
}
