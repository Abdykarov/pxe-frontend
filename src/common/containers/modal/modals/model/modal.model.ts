export interface IShowModal {
    component: any;
    modalType?: string;
    instanceData?: {
        showClose?: boolean,
        showConfirm?: boolean,
        titleClose?: string,
        titleConfirm?: string,
        size?: string,
        [key: string]: any;
    };
    withoutScroll?: boolean;
    [key: string]: any;
}

export interface ICloseModalData {
    confirmed: boolean;
    modalType: string;
    [key: string]: any;
}
