import { ICardData } from 'src/common/ui/card/models/data.model';
import { IReference } from 'src/common/ui/carousels/models/models';
import { ISeo } from './seo';

export interface IHelpSection {
    cards: ICardData[];
    title: string;
}

export interface IAboutUs {
    title: string;
    buttonText: string;
    chatText: string;
    bigText: string;
    description: string;
}

export interface IiWantToSeeTheBestOffers {
    buttonText: string;
    title: string;
}

export interface ISteps {
    title: string;
    description: string;
}

export interface IHowItWorksSection {
    title: string;
    description: string;
    buttonText: string;
    steps: ISteps[];
}

export interface IDiscount {
    title: string;
    description: string;
    discount: string;
}

export interface ICarouselDiscount {
    title: string;
    countingDescription: string;
    perex: string;
    description: string;
    prices: IDiscount[];
}

export interface IBestPricesInTheWorldSection {
    title: string;
    buttonText: string;
    carouselDiscount: ICarouselDiscount[];
}

export interface ILandingPage {
    carouselReferences: IReference[];
    helpSection: IHelpSection;
    howItWorksSection: IHowItWorksSection;
    bestPricesInTheWorldSection: IBestPricesInTheWorldSection;
    iWantToSeeTheBestOffers: IiWantToSeeTheBestOffers;
    aboutUs: IAboutUs;
    seo: ISeo;
    metaGoogleSiteVerification: string;
}
