export interface IShowModal {
    component: any;
    modalType?: string;
    instanceData?: {
        [key: string]: any;
    };
    [key: string]: any;
}

export interface ICloseModalData {
    confirmed: boolean;
    modalType: string;
    [key: string]: any;
}
