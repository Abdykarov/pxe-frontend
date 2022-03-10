// Default variables for all not defined environments and for DEV

export const environment =
    typeof window !== 'undefined' ? (<any>window).angularDevstack.config : '';
