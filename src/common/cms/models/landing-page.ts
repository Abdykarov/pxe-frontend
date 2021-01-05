import { ICardData } from 'src/common/ui/card/models/data.model';
import { IReference } from 'src/common/containers/carousels-container/models/models';
import { ISeo } from './seo';

export interface IHelpSection {
    cards: ICardData[];
    title: string;
}

export interface ILandingPage {
    carouselReferences: IReference[];
    helpSection: IHelpSection;
    seo: ISeo;
}
