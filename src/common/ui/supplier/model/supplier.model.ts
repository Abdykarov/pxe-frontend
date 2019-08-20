export interface ISupplierLogo {
    id?: number;
    logoUrl: string;
    logoUrlHover: string;
    supplierUrl: string;
    size?: string;
    title: string;
    alt: string;
    typeCommodity: TypeCommodity;
    name?: string;
    width?: string;
}

export enum TypeCommodity {
    GAS,
    POWER,
    BOTH,
}
