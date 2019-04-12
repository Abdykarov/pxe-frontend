export interface IMapCoverageSource {
    consumption: number;
    places: number;
    suppliers: IMapCoverageSupplier[];
}

export interface IMapCoverageSourceGas extends IMapCoverageSource {
    stackCapacity: number;
}

export interface IMapCoverageSourcePower extends IMapCoverageSource {
    temelinPerformance: number;
}

export interface IMapCoverageSupplier {
    logoUrl: string;
    logoUrlHover: string;
    supplierUrl: string;
    size?: string;
    title: string;
    alt: string;
}

export interface IMapCoverageConfig {
    gas: IMapCoverageSourceGas;
    power: IMapCoverageSourcePower;
}
