export interface IMapCoverageSource {
    consumption: number;
    places: number;
}

export interface IMapCoverageSourceGas extends IMapCoverageSource {
    stackCapacity: number;
}

export interface IMapCoverageSourcePower extends IMapCoverageSource {
    temelinPerformance: number;
}

export interface IMapCoverageConfig {
    gas: IMapCoverageSourceGas;
    power: IMapCoverageSourcePower;
}
