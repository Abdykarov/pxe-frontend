export enum CommodityType {
    ELECTRICITY = 'ELECTRICITY',
    GAS = 'GAS',
}

export interface IAddress {
    street: String;
    orientationNumber: string;
    descriptiveNumber: string;
    city: String;
    postCode: String;
}

export interface ICodelistMap {
    codelistType: string;
    codelistItems: [ICodelistItem];
}

export interface ICodelistItem {
    type: string;
    code: string;
    description: string;
    help: string;
}

interface ISupplier {
    id: number;
    name: string;
    vatNumber: string;
    logoPath: string;
    suplierSampleDocuments: ISupplierSampleDocument;
}

export interface ISupplierSampleDocument {
    type: string;
    url: string;
}

export interface ISupplyPoint {
    id: number;
    commodityType: CommodityType;
    supplier: ISupplier;
    ean: string;
    address: IAddress;
    distributionRate: ICodelistItem;
    circuitBreaker: ICodelistItem;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
    expirationDate: String;
}

