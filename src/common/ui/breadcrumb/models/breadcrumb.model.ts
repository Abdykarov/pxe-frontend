export interface IBreadcrumbItems extends Array<IBreadcrumbItem> {}

export interface IBreadcrumbItem {
    label: string;
    url?: string;
    hasTemplate?: boolean;
    overlayEnabled?: boolean;
    dropdownAction?: Function;
}
