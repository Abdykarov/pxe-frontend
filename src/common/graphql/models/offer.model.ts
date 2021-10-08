import { ICodelistItem } from './supply.model';
import { ISupplier } from 'src/common/graphql/models/supply.model';
import { IQuestion } from 'src/app/services/model/faq.model';

export interface ISupplyPointImportPrices {
    importPricePerKwPowerVT: number;
    importPricePerKwPowerNT: number;
    importPricePerKwGas: number;
    importPriceTotalPerYear: number;
    importPermanentMonthlyPay: number;
}

export interface ISupplyPointOffers {
    offers: IOffer[];
    pastOffer: IOffer;
    supplyPointImportPrices: ISupplyPointImportPrices;
}

export interface IOffer {
    id: string;
    supplier?: ISupplier;
    status?: string;
    commodityType: string;
    name: string;
    validFrom: string;
    validTo: string;
    deliveryFrom?: string;
    deliveryTo?: string;
    deliveryLength: number;
    permanentPaymentPrice?: number;
    subject: ICodelistItem;
    benefits?: string | string[] | IBenefit[];
    distributionLocation?: string;
    priceVT?: number;
    priceNT?: number;
    distributionRate?: ICodelistItem;
    circuitBreaker?: ICodelistItem;
    priceGas?: number;
    annualConsumption?: ICodelistItem;
    priceVTWithVAT?: number;
    priceNTWithVAT?: number;
    priceGasWithVAT?: number;
    accountingRegulatedPrice?: number;
    consumptionPriceNT?: number;
    consumptionPriceVT?: number;
    consumptionPriceGas?: number;
    distributionPriceByCapacity?: number;
    distributionPriceByConsumptionNT?: number;
    distributionPriceByConsumptionVT?: number;
    distributionPriceByConsumptionGas?: number;
    energyTaxRegulatedPrice?: number;
    marketOrganizerRegulatedPrice?: number;
    monthlyConsumptionFee?: number;
    renewableEnergyRegulatedPrice?: number;
    systemServicesRegulatedPrice?: number;
    totalPrice?: number;
    unit?: string;
    marked?: boolean;
    isLastUpdated?: boolean;
    greenEnergy: boolean;
    question?: IQuestion;
    isOwnOffer?: boolean;
    totalPriceIncludeAnnualConsumption?: number;
    __typename?: string;
}

export interface IOfferImport {
    benefit1: string;
    urlBenefit1: string;
    benefit2: string;
    urlBenefit2: string;
    benefit3: string;
    urlBenefit3: string;
    benefit4: string;
    urlBenefit4: string;
    name: string;
    supplierId: number;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryTo: string;
    deliveryLength: number;
    distributionLocation: string;
    permanentPaymentPrice: number;
    subjectTypeId: string;
    greenEnergy: boolean;
    powerAttributes: IOfferInputPowerAttributes;
    gasAttributes: IOfferInputGasAttributes;
}

export interface IOfferInput {
    name: string;
    supplierId: number;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryTo: string;
    deliveryLength: number;
    distributionLocation: string;
    permanentPaymentPrice: number;
    subjectTypeId: string;
    benefits: string;
    greenEnergy: boolean;
    powerAttributes: IOfferInputPowerAttributes;
    gasAttributes: IOfferInputGasAttributes;
}

export interface IOfferInputPowerAttributes {
    priceVT: number;
    priceNT: number;
    distributionRateId: string;
    circuitBreakerId: string;
}

export interface IOfferInputGasAttributes {
    priceGas: number;
    annualConsumptionId: string;
}

export enum IOfferStatus {
    DELETED = 'DELETED',
    ACTIVE = 'ACTIVE',
}

export interface IBenefit {
    name: string;
    url: string;
}
