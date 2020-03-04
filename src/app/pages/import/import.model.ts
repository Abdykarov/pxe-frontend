import {
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes,
} from 'src/common/graphql/models/offer.model';

export enum ImportProgressStep {
    APPROVAL = 'APPROVAL',
    UPLOAD = 'UPLOAD',
    REUPLOAD = 'REUPLOAD',
    COMPLETED = 'COMPLETED',
}

export interface IOfferImportInput {
    offerInput: IOfferInput;
    duplicity: boolean;
    violations: string[];
}

export interface IOfferCounts {
    numberOfDuplicateOffers: number;
    numberOfGasOffers: number;
    numberOfPowerOffers: number;
}
