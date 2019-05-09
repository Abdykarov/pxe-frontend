export enum CommodityType {
    POWER = 'POWER',
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

export interface ISupplyPointGasAttributes {
    eic: string;
    annualConsumption: number;
}

export interface ISupplyPointPowerAttributes {
    ean: string;
    circuitBreakerId: string;
    distributionRateId: string;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
}

export interface ISupplyPoint {
    id: number;
    supplierId: number;
    name: string;
    region: string;
    address: IAddress;
    expirationDate: string;
    subjectType: string;
}

export interface ISupplyPointFormData {
    id: number;
    supplierId: number;
    name: string;
    commodityType?: string;
    region: string;
    address: IAddress;
    ean?: string;
    circuitBreakerId?: string;
    distributionRateId?: string;
    annualConsumptionNT?: number;
    annualConsumptionVT?: number;
    eic?: string;
    annualConsumption?: number;

}
