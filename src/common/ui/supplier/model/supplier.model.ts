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
    width: number;
}

export enum TypeCommodity {
    GAS,
    POWER,
    BOTH,
}
