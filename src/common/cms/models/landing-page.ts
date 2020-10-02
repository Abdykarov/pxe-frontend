export interface IFilosofii {
    description: String;
    description2: String;
    signature: String;
    title: String;
}

export interface IHowItWorksColumn {
    description: string;
    title: string;
}

export interface IHowItWorks {
    title: string;
    columns: IHowItWorksColumn[];
}

export interface IIntroduction {
    appendix: string;
    buttonText: string;
    text: string;
    title: string;
}

export interface ILikeADog {
    buttonText: string;
    description: string;
    title: string;
}

export interface IMapCoverage {
    signature: string;
    suppliersText: string;
    title: string;
}

export interface ILandingPage {
    filosofii: IFilosofii;
    howItWorks: IHowItWorks;
    introduction: IIntroduction;
    likeADog: ILikeADog;
    mapCoverage: IMapCoverage;
}
