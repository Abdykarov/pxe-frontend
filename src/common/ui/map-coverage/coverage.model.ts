export interface ISource {
    consumption: number;
    notification: number;
    places: number;
    suppliers: Supplier[];
}

export interface Supplier {
    logo: string;
    title: string;
    url: string;
}

export interface IConfig {
    gas: ISource;
    power: ISource;
}



