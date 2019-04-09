export interface IMapCoverageSource {
    consumption: number;
    notification: number;
    places: number;
    suppliers: IMapCoverageSupplier[];
}

export interface IMapCoverageSupplier {
    logoUrl: string;
    supplierUrl: string;
    title: string;
}

export interface IMapCoverageConfig {
    gas: IMapCoverageSource;
    power: IMapCoverageSource;
}



