interface ISupplier {
    id: number;
    name: string;
    vatNumber: string;
    suplierSampleDocuments: ISupplierSampleDocument;
}

interface ISupplierSampleDocument {
    type: string;
    url: string;
}

enum CommodityType {
    ELECTRICITY,
    GAS,
}

export interface IEntities {
    suppliers: [ISupplier];
    supplyPoint: [ISupplyPoint];
}

interface IAddress {
    street: String;
    orientationNumber: number;
    descriptiveNumber: number;
    city: String;
    postCode: String;
}

interface ICodelistItem {
    type: string;
    code: string;
    description: string;
    help: string;
}

interface ISupplyPoint {
    id: number;
    commodityType: CommodityType;
    supplier: ISupplier;
    ean: string;
    address: IAddress;
    distributionRate: ICodelistItem;
    circuitBreaker: ICodelistItem;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
    expirationDate: Date;
}
