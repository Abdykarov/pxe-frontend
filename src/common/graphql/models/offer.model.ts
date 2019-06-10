import { ICodelistItem } from './supply.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

export interface ISupplyPointOffer {
    id: number;
    supplier: ISupplier;
    commodityType: string;
    name: string;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryLength: number;
    permanentPaymentPrice: number;
    benefits: any;
    priceVT: number;
    priceNT: number;
    priceGas: number;
}

export interface IOffer {
    id: number;
    supplier: ISupplier;
    status: string;
    commodityType: string;
    name: string;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryTo: string;
    deliveryLength: number;
    distributionLocation: string;
    permanentPaymentPrice: number;
    subject: ICodelistItem;
    benefits: string;
    priceVT: number;
    priceNT: number;
    distributionRate: ICodelistItem;
    circuitBreaker: ICodelistItem;
    priceGas: number;
    annualConsumption: ICodelistItem;
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
