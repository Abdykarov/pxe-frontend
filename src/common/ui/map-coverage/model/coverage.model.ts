export interface IMapCoverageSource {
    actualOffers: number;
    actualSupplyPoints: number;
}

export interface IMapCoverageConfig {
    gas: IMapCoverageSource;
    power: IMapCoverageSource;
}
