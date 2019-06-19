export interface ISupplier {
    id?: number;
    logoUrl: string;
    logoUrlHover: string;
    supplierUrl: string;
    size?: string;
    title: string;
    alt: string;
    typeCommodity: TypeCommodity;
    name?: string;
}

export enum TypeCommodity {
    GAS,
    POWER,
    BOTH,
}
