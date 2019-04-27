export interface ISupplier {
    logoUrl: string;
    logoUrlHover: string;
    supplierUrl: string;
    size?: string;
    title: string;
    alt: string;
    typeCommodity: TypeCommodity;
}

export enum TypeCommodity {
    GAS,
    POWER,
    BOTH,
}
