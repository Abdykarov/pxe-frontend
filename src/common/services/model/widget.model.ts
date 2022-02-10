export interface IExternalResource {
    name: string;
    src: string;
}

export interface IExternalPromise {
    script: string;
    loaded: boolean;
    status: string;
}

export enum ExternalResourceType {
    'scripts' = 'scripts',
    'styles' = 'styles',
}
