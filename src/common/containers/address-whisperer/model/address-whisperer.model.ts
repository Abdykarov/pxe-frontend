export interface IMapyCzResponse {
    deletedFromBack: number;
    hasGeo: number;
    hasService: number;
    id: string;
    result: [IResultMapyCZResponse];
}

export interface IResultMapyCZResponse {
    category: string;
    highlight: [any];
    sentence: string;
    userData: IUserDataMapyCzResponse;
}

export interface IUserDataMapyCzResponse {
    bbox: [number];
    country: string;
    district: string;
    evidenceNumber: string;
    highlight: [number];
    highlightSecond: [any];
    houseNumber: string;
    iconType: string;
    id: number;
    img: string;
    importance: number;
    latitude: number;
    longitude: number;
    muniId: string;
    municipality: string;
    nuts: string;
    poiType: string;
    poiTypeId: number;
    popularity: number;
    premiseIds: [any];
    quarter: string;
    region: string;
    source: string;
    street: string;
    streetNumber: string;
    suggestFirstRow: string;
    suggestSecondRow: string;
    suggestThirdRow: string;
    ward: string;
    wikiId: string;
    zipCode: string;
}
